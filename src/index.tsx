import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { MATHEMATICS_TOPICS, getLessonContent } from './routes'
import { ENGLISH_TOPICS, getEnglishLessonContent } from './english-routes'

// Type definitions for Cloudflare bindings
type Bindings = {
  DB: D1Database;
  ENVIRONMENT: string;
  APP_NAME: string;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())
app.use(renderer)

// =============================================
// AUTO-MIGRATION — idempotent, runs on cold start
// =============================================
app.use('*', async (c, next) => {
  try {
    const db = (c.env as any)?.DB
    if (db) {
      await db.prepare(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )`
      ).run()
      await db.prepare(
        `CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL,
          created_at TEXT NOT NULL DEFAULT (datetime('now')),
          expires_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`
      ).run()
    }
  } catch (_) { /* tables already exist */ }
  return next()
})

// =============================================
// AUTH HELPERS
// =============================================

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder()
  const keyMat = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const salt = enc.encode('studybuddy-v1')
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, keyMat, 256)
  return btoa(String.fromCharCode(...new Uint8Array(bits)))
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return (await hashPassword(password)) === hash
}

function genSessionId(): string {
  const a = new Uint8Array(32); crypto.getRandomValues(a)
  return Array.from(a, b => b.toString(16).padStart(2, '0')).join('')
}

function sessionExpiry(): string {
  const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString()
}

// =============================================
// AUTH PAGES
// =============================================


// =============================================
// AUTH PAGE HTML
// =============================================
const signinPage: string = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\"/>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\n  <title>Sign In \u2014 Study Buddy</title>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"/>\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin/>\n  <link href=\"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap\" rel=\"stylesheet\"/>\n  <style>\n    :root{--midnight:#1A2034;--orange:#D47E3D;--copper:#8E452C;--ivory:#F2E9D9;--stone:#D0BFB0;--graphite:#5B5F63;--white:#fff;--font:'Montserrat',sans-serif;}\n    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}\n    body{font-family:var(--font);background:var(--ivory);color:var(--midnight);min-height:100vh;display:flex;flex-direction:column;}\n    a{text-decoration:none;color:inherit;}\n\n    /* NAV */\n    nav{background:var(--midnight);height:64px;display:flex;align-items:center;padding:0 32px;justify-content:space-between;}\n    .nav-logo{display:flex;align-items:center;gap:10px;}\n    .nav-logo svg{width:34px;height:34px;}\n    .nav-logo-text{font-size:1.05rem;font-weight:700;color:var(--white);}\n    .nav-logo-text span{color:var(--orange);}\n    .nav-back{color:var(--stone);font-size:0.8rem;font-weight:600;transition:color .2s;}\n    .nav-back:hover{color:var(--white);}\n\n    /* LAYOUT */\n    .page{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 24px;}\n    .card{background:var(--white);border-radius:24px;padding:48px 40px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(26,32,52,.10);}\n\n    /* LOGO TOP */\n    .card-logo{display:flex;flex-direction:column;align-items:center;margin-bottom:32px;}\n    .card-logo svg{width:56px;height:56px;margin-bottom:12px;}\n    .card-logo h1{font-size:1.5rem;color:var(--midnight);}\n    .card-logo h1 span{color:var(--orange);}\n    .card-logo p{font-size:0.85rem;color:var(--graphite);margin-top:4px;}\n\n    /* FORM */\n    .form-group{margin-bottom:20px;}\n    label{display:block;font-size:0.8rem;font-weight:700;color:var(--midnight);margin-bottom:8px;letter-spacing:.03em;}\n    input{width:100%;padding:13px 16px;border:2px solid rgba(26,32,52,.12);border-radius:12px;font-family:var(--font);font-size:0.9rem;color:var(--midnight);background:var(--white);transition:border-color .2s,box-shadow .2s;outline:none;}\n    input:focus{border-color:var(--orange);box-shadow:0 0 0 4px rgba(212,126,61,.12);}\n    input::placeholder{color:var(--stone);}\n\n    /* ERROR */\n    .error-box{display:none;background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.25);border-radius:10px;padding:12px 16px;font-size:0.82rem;color:#dc2626;margin-bottom:20px;}\n    .error-box.show{display:block;}\n\n    /* SUBMIT */\n    .btn-submit{width:100%;background:var(--orange);color:var(--white);font-family:var(--font);font-weight:700;font-size:1rem;padding:14px;border:none;border-radius:50px;cursor:pointer;transition:all .2s;margin-top:4px;}\n    .btn-submit:hover{background:var(--copper);transform:translateY(-1px);box-shadow:0 8px 24px rgba(212,126,61,.3);}\n    .btn-submit:disabled{opacity:.6;transform:none;cursor:not-allowed;}\n\n    /* DIVIDER */\n    .divider{display:flex;align-items:center;gap:12px;margin:24px 0;}\n    .divider::before,.divider::after{content:'';flex:1;height:1px;background:rgba(26,32,52,.1);}\n    .divider span{font-size:0.75rem;color:var(--stone);font-weight:600;}\n\n    /* FOOTER LINK */\n    .card-footer{text-align:center;margin-top:24px;font-size:0.82rem;color:var(--graphite);}\n    .card-footer a{color:var(--orange);font-weight:700;}\n    .card-footer a:hover{color:var(--copper);}\n\n    /* LOADING SPINNER */\n    .spinner{display:none;width:18px;height:18px;border:2px solid rgba(255,255,255,.4);border-top-color:var(--white);border-radius:50%;animation:spin .7s linear infinite;margin:0 auto;}\n    @keyframes spin{to{transform:rotate(360deg)}}\n\n    @media(max-width:480px){.card{padding:32px 24px;}}\n  </style>\n</head>\n<body>\n  <nav>\n    <a href=\"/\" class=\"nav-logo\">\n      <svg viewBox=\"0 0 40 40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#1A2034\"/><circle cx=\"20\" cy=\"16\" r=\"7\" fill=\"none\" stroke=\"#D47E3D\" stroke-width=\"2.5\"/><rect x=\"17\" y=\"22\" width=\"6\" height=\"4\" rx=\"1\" fill=\"#D47E3D\"/><rect x=\"18\" y=\"26\" width=\"4\" height=\"2.5\" rx=\".5\" fill=\"#D47E3D\"/><line x1=\"20\" y1=\"7\" x2=\"20\" y2=\"5\" stroke=\"#D47E3D\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"26.5\" y1=\"9.5\" x2=\"27.9\" y2=\"8.1\" stroke=\"#D47E3D\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"13.5\" y1=\"9.5\" x2=\"12.1\" y2=\"8.1\" stroke=\"#D47E3D\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>\n      <span class=\"nav-logo-text\">study <span>buddy</span></span>\n    </a>\n    <a href=\"/\" class=\"nav-back\">&#8592; Back to home</a>\n  </nav>\n\n  <div class=\"page\">\n    <div class=\"card\">\n      <div class=\"card-logo\">\n        <svg viewBox=\"0 0 56 56\" fill=\"none\"><circle cx=\"28\" cy=\"28\" r=\"28\" fill=\"#1A2034\"/><circle cx=\"28\" cy=\"22\" r=\"10\" fill=\"none\" stroke=\"#D47E3D\" stroke-width=\"3\"/><rect x=\"23\" y=\"31\" width=\"10\" height=\"6\" rx=\"2\" fill=\"#D47E3D\"/><rect x=\"25\" y=\"37\" width=\"6\" height=\"4\" rx=\"1\" fill=\"#D47E3D\"/><line x1=\"28\" y1=\"10\" x2=\"28\" y2=\"7\" stroke=\"#D47E3D\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"37\" y1=\"13\" x2=\"39\" y2=\"11\" stroke=\"#D47E3D\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"19\" y1=\"13\" x2=\"17\" y2=\"11\" stroke=\"#D47E3D\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>\n        <h1>study <span>buddy</span></h1>\n        <p>Sign in to continue learning</p>\n      </div>\n\n      <div class=\"error-box\" id=\"errorBox\"></div>\n\n      <form id=\"signinForm\">\n        <div class=\"form-group\">\n          <label for=\"email\">Email address</label>\n          <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"you@example.com\" required autocomplete=\"email\"/>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Your password\" required autocomplete=\"current-password\"/>\n        </div>\n        <button type=\"submit\" class=\"btn-submit\" id=\"submitBtn\">\n          <span id=\"btnText\">Sign In</span>\n          <div class=\"spinner\" id=\"spinner\"></div>\n        </button>\n      </form>\n\n      <div class=\"divider\"><span>OR</span></div>\n\n      <div class=\"card-footer\">\n        Don't have an account? <a href=\"/signup\">Create one free</a>\n      </div>\n    </div>\n  </div>\n\n  <script>\n    const form = document.getElementById('signinForm');\n    const errorBox = document.getElementById('errorBox');\n    const submitBtn = document.getElementById('submitBtn');\n    const btnText = document.getElementById('btnText');\n    const spinner = document.getElementById('spinner');\n\n    function setLoading(on) {\n      submitBtn.disabled = on;\n      btnText.style.display = on ? 'none' : 'inline';\n      spinner.style.display = on ? 'block' : 'none';\n    }\n\n    function showError(msg) {\n      errorBox.textContent = msg;\n      errorBox.classList.add('show');\n    }\n\n    form.addEventListener('submit', async (e) => {\n      e.preventDefault();\n      errorBox.classList.remove('show');\n      setLoading(true);\n      try {\n        const res = await fetch('/api/auth/signin', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({\n            email: document.getElementById('email').value.trim().toLowerCase(),\n            password: document.getElementById('password').value\n          })\n        });\n        const data = await res.json();\n        if (res.ok && data.success) {\n          window.location.href = '/dashboard';\n        } else {\n          showError(data.error || 'Invalid email or password.');\n        }\n      } catch (err) {\n        showError('Something went wrong. Please try again.');\n      } finally {\n        setLoading(false);\n      }\n    });\n  </script>\n</body>\n</html>\n"
const signupPage: string = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\"/>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\n  <title>Create Account \u2014 Study Buddy</title>\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"/>\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin/>\n  <link href=\"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap\" rel=\"stylesheet\"/>\n  <style>\n    :root{--midnight:#1A2034;--orange:#D47E3D;--copper:#8E452C;--ivory:#F2E9D9;--stone:#D0BFB0;--graphite:#5B5F63;--white:#fff;--font:'Montserrat',sans-serif;}\n    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}\n    body{font-family:var(--font);background:var(--ivory);color:var(--midnight);min-height:100vh;display:flex;flex-direction:column;}\n    a{text-decoration:none;color:inherit;}\n    nav{background:var(--midnight);height:64px;display:flex;align-items:center;padding:0 32px;justify-content:space-between;}\n    .nav-logo{display:flex;align-items:center;gap:10px;}\n    .nav-logo svg{width:34px;height:34px;}\n    .nav-logo-text{font-size:1.05rem;font-weight:700;color:var(--white);}\n    .nav-logo-text span{color:var(--orange);}\n    .nav-back{color:var(--stone);font-size:0.8rem;font-weight:600;transition:color .2s;}\n    .nav-back:hover{color:var(--white);}\n    .page{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 24px;}\n    .card{background:var(--white);border-radius:24px;padding:48px 40px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(26,32,52,.10);}\n    .card-logo{display:flex;flex-direction:column;align-items:center;margin-bottom:32px;}\n    .card-logo svg{width:56px;height:56px;margin-bottom:12px;}\n    .card-logo h1{font-size:1.5rem;color:var(--midnight);}\n    .card-logo h1 span{color:var(--orange);}\n    .card-logo p{font-size:0.85rem;color:var(--graphite);margin-top:4px;}\n    .form-group{margin-bottom:18px;}\n    label{display:block;font-size:0.8rem;font-weight:700;color:var(--midnight);margin-bottom:7px;letter-spacing:.03em;}\n    input{width:100%;padding:13px 16px;border:2px solid rgba(26,32,52,.12);border-radius:12px;font-family:var(--font);font-size:0.9rem;color:var(--midnight);background:var(--white);transition:border-color .2s,box-shadow .2s;outline:none;}\n    input:focus{border-color:var(--orange);box-shadow:0 0 0 4px rgba(212,126,61,.12);}\n    input::placeholder{color:var(--stone);}\n    input.invalid{border-color:#dc2626;}\n    .field-hint{font-size:0.72rem;color:var(--graphite);margin-top:5px;}\n    .field-hint.error{color:#dc2626;}\n    .error-box{display:none;background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.25);border-radius:10px;padding:12px 16px;font-size:0.82rem;color:#dc2626;margin-bottom:20px;}\n    .error-box.show{display:block;}\n    .success-box{display:none;background:rgba(22,163,74,.08);border:1px solid rgba(22,163,74,.25);border-radius:10px;padding:12px 16px;font-size:0.82rem;color:#16a34a;margin-bottom:20px;text-align:center;}\n    .success-box.show{display:block;}\n    .btn-submit{width:100%;background:var(--orange);color:var(--white);font-family:var(--font);font-weight:700;font-size:1rem;padding:14px;border:none;border-radius:50px;cursor:pointer;transition:all .2s;margin-top:4px;}\n    .btn-submit:hover{background:var(--copper);transform:translateY(-1px);box-shadow:0 8px 24px rgba(212,126,61,.3);}\n    .btn-submit:disabled{opacity:.6;transform:none;cursor:not-allowed;}\n    .password-strength{height:4px;border-radius:2px;margin-top:6px;background:rgba(26,32,52,.1);overflow:hidden;}\n    .password-strength-fill{height:100%;border-radius:2px;transition:width .3s,background .3s;width:0;}\n    .divider{display:flex;align-items:center;gap:12px;margin:24px 0;}\n    .divider::before,.divider::after{content:'';flex:1;height:1px;background:rgba(26,32,52,.1);}\n    .divider span{font-size:0.75rem;color:var(--stone);font-weight:600;}\n    .card-footer{text-align:center;margin-top:24px;font-size:0.82rem;color:var(--graphite);}\n    .card-footer a{color:var(--orange);font-weight:700;}\n    .card-footer a:hover{color:var(--copper);}\n    .spinner{display:none;width:18px;height:18px;border:2px solid rgba(255,255,255,.4);border-top-color:var(--white);border-radius:50%;animation:spin .7s linear infinite;margin:0 auto;}\n    @keyframes spin{to{transform:rotate(360deg)}}\n    .terms{font-size:0.75rem;color:var(--graphite);text-align:center;margin-top:16px;line-height:1.5;}\n    @media(max-width:480px){.card{padding:32px 24px;}}\n  </style>\n</head>\n<body>\n  <nav>\n    <a href=\"/\" class=\"nav-logo\">\n      <svg viewBox=\"0 0 40 40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#1A2034\"/><circle cx=\"20\" cy=\"16\" r=\"7\" fill=\"none\" stroke=\"#D47E3D\" stroke-width=\"2.5\"/><rect x=\"17\" y=\"22\" width=\"6\" height=\"4\" rx=\"1\" fill=\"#D47E3D\"/><rect x=\"18\" y=\"26\" width=\"4\" height=\"2.5\" rx=\".5\" fill=\"#D47E3D\"/><line x1=\"20\" y1=\"7\" x2=\"20\" y2=\"5\" stroke=\"#D47E3D\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"26.5\" y1=\"9.5\" x2=\"27.9\" y2=\"8.1\" stroke=\"#D47E3D\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"13.5\" y1=\"9.5\" x2=\"12.1\" y2=\"8.1\" stroke=\"#D47E3D\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>\n      <span class=\"nav-logo-text\">study <span>buddy</span></span>\n    </a>\n    <a href=\"/\" class=\"nav-back\">&#8592; Back to home</a>\n  </nav>\n\n  <div class=\"page\">\n    <div class=\"card\">\n      <div class=\"card-logo\">\n        <svg viewBox=\"0 0 56 56\" fill=\"none\"><circle cx=\"28\" cy=\"28\" r=\"28\" fill=\"#1A2034\"/><circle cx=\"28\" cy=\"22\" r=\"10\" fill=\"none\" stroke=\"#D47E3D\" stroke-width=\"3\"/><rect x=\"23\" y=\"31\" width=\"10\" height=\"6\" rx=\"2\" fill=\"#D47E3D\"/><rect x=\"25\" y=\"37\" width=\"6\" height=\"4\" rx=\"1\" fill=\"#D47E3D\"/><line x1=\"28\" y1=\"10\" x2=\"28\" y2=\"7\" stroke=\"#D47E3D\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"37\" y1=\"13\" x2=\"39\" y2=\"11\" stroke=\"#D47E3D\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"19\" y1=\"13\" x2=\"17\" y2=\"11\" stroke=\"#D47E3D\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>\n        <h1>study <span>buddy</span></h1>\n        <p>Create your free account</p>\n      </div>\n\n      <div class=\"error-box\" id=\"errorBox\"></div>\n      <div class=\"success-box\" id=\"successBox\">\ud83c\udf89 Account created! Redirecting you to the dashboard...</div>\n\n      <form id=\"signupForm\">\n        <div class=\"form-group\">\n          <label for=\"name\">Full name</label>\n          <input type=\"text\" id=\"name\" name=\"name\" placeholder=\"e.g. Julfe Phiri\" required autocomplete=\"name\"/>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"email\">Email address</label>\n          <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"you@example.com\" required autocomplete=\"email\"/>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"At least 8 characters\" required autocomplete=\"new-password\" minlength=\"8\"/>\n          <div class=\"password-strength\"><div class=\"password-strength-fill\" id=\"strengthFill\"></div></div>\n          <div class=\"field-hint\" id=\"strengthText\">Choose a strong password</div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"confirm\">Confirm password</label>\n          <input type=\"password\" id=\"confirm\" name=\"confirm\" placeholder=\"Repeat your password\" required autocomplete=\"new-password\"/>\n          <div class=\"field-hint\" id=\"confirmHint\"></div>\n        </div>\n        <button type=\"submit\" class=\"btn-submit\" id=\"submitBtn\">\n          <span id=\"btnText\">Create Account</span>\n          <div class=\"spinner\" id=\"spinner\"></div>\n        </button>\n        <p class=\"terms\">By creating an account you agree to our Terms of Service.</p>\n      </form>\n\n      <div class=\"divider\"><span>ALREADY HAVE AN ACCOUNT?</span></div>\n      <div class=\"card-footer\"><a href=\"/signin\">Sign in here</a></div>\n    </div>\n  </div>\n\n  <script>\n    const form = document.getElementById('signupForm');\n    const errorBox = document.getElementById('errorBox');\n    const successBox = document.getElementById('successBox');\n    const submitBtn = document.getElementById('submitBtn');\n    const btnText = document.getElementById('btnText');\n    const spinner = document.getElementById('spinner');\n    const passwordInput = document.getElementById('password');\n    const confirmInput = document.getElementById('confirm');\n    const strengthFill = document.getElementById('strengthFill');\n    const strengthText = document.getElementById('strengthText');\n    const confirmHint = document.getElementById('confirmHint');\n\n    function setLoading(on) {\n      submitBtn.disabled = on;\n      btnText.style.display = on ? 'none' : 'inline';\n      spinner.style.display = on ? 'block' : 'none';\n    }\n    function showError(msg) { errorBox.textContent = msg; errorBox.classList.add('show'); successBox.classList.remove('show'); }\n    function clearError() { errorBox.classList.remove('show'); }\n\n    // Password strength\n    passwordInput.addEventListener('input', () => {\n      const v = passwordInput.value;\n      let score = 0;\n      if (v.length >= 8) score++;\n      if (v.length >= 12) score++;\n      if (/[A-Z]/.test(v)) score++;\n      if (/[0-9]/.test(v)) score++;\n      if (/[^A-Za-z0-9]/.test(v)) score++;\n      const pct = (score / 5) * 100;\n      const colors = ['#dc2626','#f59e0b','#f59e0b','#16a34a','#16a34a','#16a34a'];\n      const labels = ['Too short','Weak','Fair','Good','Strong','Very strong'];\n      strengthFill.style.width = pct + '%';\n      strengthFill.style.background = colors[score] || '#16a34a';\n      strengthText.textContent = labels[score] || 'Very strong';\n      strengthText.className = 'field-hint' + (score < 2 ? ' error' : '');\n    });\n\n    // Confirm match\n    confirmInput.addEventListener('input', () => {\n      if (confirmInput.value && confirmInput.value !== passwordInput.value) {\n        confirmHint.textContent = 'Passwords do not match';\n        confirmHint.className = 'field-hint error';\n        confirmInput.classList.add('invalid');\n      } else {\n        confirmHint.textContent = confirmInput.value ? '\u2713 Passwords match' : '';\n        confirmHint.className = 'field-hint';\n        confirmInput.classList.remove('invalid');\n      }\n    });\n\n    form.addEventListener('submit', async (e) => {\n      e.preventDefault();\n      clearError();\n      if (passwordInput.value !== confirmInput.value) { showError('Passwords do not match.'); return; }\n      if (passwordInput.value.length < 8) { showError('Password must be at least 8 characters.'); return; }\n      setLoading(true);\n      try {\n        const res = await fetch('/api/auth/signup', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({\n            name: document.getElementById('name').value.trim(),\n            email: document.getElementById('email').value.trim().toLowerCase(),\n            password: passwordInput.value\n          })\n        });\n        const data = await res.json();\n        if (res.ok && data.success) {\n          successBox.classList.add('show');\n          setTimeout(() => window.location.href = '/dashboard', 1500);\n        } else {\n          showError(data.error || 'Could not create account. Please try again.');\n        }\n      } catch (err) {\n        showError('Something went wrong. Please try again.');\n      } finally {\n        setLoading(false);\n      }\n    });\n  </script>\n</body>\n</html>\n"


// Sign-up page
app.get('/signup', (c) => {
  return c.html(signupPage)
})

// Sign-in page
app.get('/signin', (c) => {
  return c.html(signinPage)
})

// API: Sign up
app.post('/api/auth/signup', async (c) => {
  try {
    const body = await c.req.json<{ name: string; email: string; password: string }>()
    const { name, email, password } = body
    if (!name || !email || !password)
      return c.json({ success: false, error: 'Name, email and password are required.' }, 400)
    if (password.length < 8)
      return c.json({ success: false, error: 'Password must be at least 8 characters.' }, 400)

    const db = (c.env as any).DB
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email.toLowerCase()).first()
    if (existing)
      return c.json({ success: false, error: 'An account with this email already exists.' }, 409)

    const hash = await hashPassword(password)
    const ins = await db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)').bind(name.trim(), email.toLowerCase(), hash).run()
    const userId = ins.meta.last_row_id
    const sid = genSessionId()
    await db.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)').bind(sid, userId, sessionExpiry()).run()

    const res = new Response(JSON.stringify({ success: true, user: { id: userId, name: name.trim(), email: email.toLowerCase() } }), {
      status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': `sb_session=${sid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000` }
    })
    return res
  } catch (err: any) {
    console.error('Signup error:', err)
    return c.json({ success: false, error: 'Something went wrong. Please try again.' }, 500)
  }
})

// API: Sign in
app.post('/api/auth/signin', async (c) => {
  try {
    const body = await c.req.json<{ email: string; password: string }>()
    const { email, password } = body
    if (!email || !password)
      return c.json({ success: false, error: 'Email and password are required.' }, 400)

    const db = (c.env as any).DB
    const user = await db.prepare('SELECT id, name, email, password_hash FROM users WHERE email = ?').bind(email.toLowerCase()).first<{ id: number; name: string; email: string; password_hash: string }>()
    if (!user || !(await verifyPassword(password, user.password_hash)))
      return c.json({ success: false, error: 'Invalid email or password.' }, 401)

    const sid = genSessionId()
    await db.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)').bind(sid, user.id, sessionExpiry()).run()

    return new Response(JSON.stringify({ success: true, user: { id: user.id, name: user.name, email: user.email } }), {
      status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': `sb_session=${sid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000` }
    })
  } catch (err: any) {
    console.error('Signin error:', err)
    return c.json({ success: false, error: 'Something went wrong. Please try again.' }, 500)
  }
})

// API: Sign out
app.post('/api/auth/signout', async (c) => {
  try {
    const cookie = c.req.header('Cookie') || ''
    const m = cookie.match(/sb_session=([a-f0-9]+)/)
    if (m) await (c.env as any).DB.prepare('DELETE FROM sessions WHERE id = ?').bind(m[1]).run()
  } catch (_) {}
  return new Response(JSON.stringify({ success: true }), {
    status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': 'sb_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0' }
  })
})

// API: Current user
app.get('/api/auth/me', async (c) => {
  try {
    const cookie = c.req.header('Cookie') || ''
    const m = cookie.match(/sb_session=([a-f0-9]+)/)
    if (!m) return c.json({ user: null })
    const row = await (c.env as any).DB.prepare(
      "SELECT s.user_id, u.name, u.email FROM sessions s JOIN users u ON s.user_id=u.id WHERE s.id=? AND s.expires_at > datetime('now')"
    ).bind(m[1]).first<{ user_id: number; name: string; email: string }>()
    if (!row) return c.json({ user: null })
    return c.json({ user: { id: row.user_id, name: row.name, email: row.email } })
  } catch (_) { return c.json({ user: null }) }
})

// Dashboard route for complete curriculum
app.get('/dashboard', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IGCSE Study Dashboard - Study Buddy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200 mb-6">
        <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="text-center">
                <div class="flex items-center justify-center space-x-3 mb-2">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-xl">SB</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900">IGCSE Study Dashboard</h1>
                </div>
                <p class="text-gray-600">Comprehensive IGCSE preparation with Mathematics and English modules</p>
            </div>
        </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 pb-8">
        <!-- Subject Selection Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Mathematics Module -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <i class="fas fa-calculator text-white text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-blue-800">IGCSE Mathematics</h2>
                        <p class="text-blue-600">Complete curriculum with interactive lessons and quizzes</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-700">21</div>
                        <div class="text-sm text-blue-600">Topics</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-700">210</div>
                        <div class="text-sm text-blue-600">Questions</div>
                    </div>
                </div>
                
                <div class="space-y-2 mb-6">
                    <div class="flex items-center text-sm text-blue-700">
                        <i class="fas fa-check-circle mr-2"></i>
                        Number, Algebra, Geometry, Statistics
                    </div>
                    <div class="flex items-center text-sm text-blue-700">
                        <i class="fas fa-check-circle mr-2"></i>
                        Enhanced quizzes with exam techniques
                    </div>
                    <div class="flex items-center text-sm text-blue-700">
                        <i class="fas fa-check-circle mr-2"></i>
                        Progressive difficulty levels
                    </div>
                </div>
                
                <div class="flex space-x-3">
                    <a href="/mathematics" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors">
                        Enter Mathematics
                    </a>
                    <a href="/quizzes" class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                        View Quizzes
                    </a>
                </div>
            </div>
            
            <!-- English Module -->
            <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                        <i class="fas fa-book-open text-white text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-red-800">Cambridge IGCSE English (0500)</h2>
                        <p class="text-red-600">First Language English with diagnostic assessment</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-red-700">19</div>
                        <div class="text-sm text-red-600">Topics</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-red-700">150</div>
                        <div class="text-sm text-red-600">Min Assessment</div>
                    </div>
                </div>
                
                <div class="space-y-2 mb-6">
                    <div class="flex items-center text-sm text-red-700">
                        <i class="fas fa-check-circle mr-2"></i>
                        Paper 1: Reading & Paper 2: Writing
                    </div>
                    <div class="flex items-center text-sm text-red-700">
                        <i class="fas fa-check-circle mr-2"></i>
                        Individual competency profiling
                    </div>
                    <div class="flex items-center text-sm text-red-700">
                        <i class="fas fa-check-circle mr-2"></i>
                        24-week personalized pathways
                    </div>
                </div>
                
                <div class="flex space-x-3">
                    <a href="/english" class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-red-700 transition-colors">
                        Enter English
                    </a>
                    <a href="/english/diagnostic" class="px-4 py-2 border border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                        Take Diagnostic
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Quick Access Features -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-clock text-purple-600 text-xl"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Timed Practice</h3>
                <p class="text-gray-600 text-sm mb-4">Examination-style quizzes with countdown timers and progress tracking</p>
                <a href="/quiz/algebra-enhanced" class="inline-flex items-center text-purple-600 font-medium hover:text-purple-700">
                    Try Enhanced Quiz <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
            
            <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-chart-line text-green-600 text-xl"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Progress Tracking</h3>
                <p class="text-gray-600 text-sm mb-4">Monitor your performance with detailed analytics and personalized recommendations</p>
                <a href="/mathematics" class="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    View Mathematics <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
            
            <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-graduation-cap text-blue-600 text-xl"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Exam Preparation</h3>
                <p class="text-gray-600 text-sm mb-4">Cambridge-aligned content with assessment objectives and mark schemes</p>
                <a href="/english/diagnostic" class="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                    Start Assessment <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
        
        <!-- Getting Started Guide -->
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-4">🚀 Ready to Begin Your IGCSE Journey?</h3>
                <p class="text-lg mb-6 opacity-90">Choose your learning path and start mastering IGCSE content with our interactive platform</p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="/mathematics" class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                        <i class="fas fa-calculator mr-2"></i>Mathematics Module
                    </a>
                    <a href="/english" class="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                        <i class="fas fa-book-open mr-2"></i>English Module
                    </a>
                </div>
                
                <div class="mt-6 text-sm opacity-80">
                    <p><i class="fas fa-lightbulb mr-1"></i> <strong>Tip:</strong> Start with the English diagnostic assessment to create your personalized 24-week study plan</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`)
})

// Test route for progression debugging
app.get('/test-progression', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Quiz Progression</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Quiz Progression Test</h1>
        <button onclick="simulateHighScore()" class="bg-blue-600 text-white px-4 py-2 rounded">Simulate 90% Score (Should Show Progression)</button>
        <button onclick="simulateLowScore()" class="bg-red-600 text-white px-4 py-2 rounded ml-2">Simulate 60% Score (No Progression)</button>
        <button onclick="resetTest()" class="bg-gray-600 text-white px-4 py-2 rounded ml-2">Reset</button>
        
        <div id="quiz-results" class="hidden mt-8 bg-white rounded-lg p-6 border border-gray-200">
            <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Quiz Complete! 🎉</h3>
                <div id="final-score" class="text-4xl font-bold text-blue-600 mb-4"></div>
                <p class="text-gray-600">Here are your results:</p>
            </div>
        </div>

        <!-- High score progression pathway (80%+) -->
        <div id="next-challenge" class="hidden mt-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white text-center shadow-lg">
            <h4 class="text-2xl font-bold mb-3">🚀 Ready for Next Challenge!</h4>
            <p class="text-lg mb-4">Outstanding performance! You've mastered Algebra Basics with 80%+ score.</p>
            <div class="text-sm opacity-90 mb-4">You've demonstrated strong algebraic understanding - time to tackle advanced concepts!</div>
            <button onclick="window.location.href='/topic/21'" class="bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">Continue to Mathematical Problem Solving →</button>
        </div>

        <!-- Review guidance for lower scores (<80%) -->
        <div id="review-guidance" class="hidden mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white text-center shadow-lg">
            <h4 class="text-2xl font-bold mb-3">📚 Time to Review & Strengthen!</h4>
            <p class="text-lg mb-4">You're making progress! Let's review the concepts you missed to build a stronger foundation.</p>
            
            <div class="bg-white bg-opacity-20 rounded-lg p-4 mb-4 text-left">
                <h5 class="font-semibold mb-2"><i class="fas fa-lightbulb mr-2"></i>What to do next:</h5>
                <ul class="text-sm space-y-1 list-disc list-inside">
                    <li>Review the explanations above for questions you got wrong</li>
                    <li>Practice similar problems to strengthen weak areas</li>
                    <li>Retake this quiz when you feel more confident</li>
                    <li>Continue with other lessons at your current level</li>
                </ul>
            </div>

            <div class="text-sm opacity-90 mb-4">
                <strong>Remember:</strong> Mathematical mastery takes practice. Each attempt makes you stronger! 💪
            </div>

            <div class="flex flex-wrap justify-center gap-3">
                <button onclick="window.location.href='/topic/1'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    <i class="fas fa-book mr-2"></i>Review Lesson
                </button>
                <button onclick="window.location.href='/topic/2'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    <i class="fas fa-arrow-right mr-2"></i>Fractions & Percentages
                </button>
                <button onclick="window.location.href='/dashboard'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    <i class="fas fa-home mr-2"></i>All Topics
                </button>
            </div>
        >
    </div>

    <script>
        function simulateHighScore() {
            console.log('Simulating high score (90%)...');
            const percentage = 90;
            const score = 9;
            
            // Show results
            const finalScoreElement = document.getElementById('final-score');
            const resultsElement = document.getElementById('quiz-results');
            
            if (finalScoreElement) {
                finalScoreElement.textContent = score + '/10 (' + percentage + '%)';
            }
            
            if (resultsElement) {
                resultsElement.classList.remove('hidden');
            }
            
            // Show next challenge if score >= 80%
            if (percentage >= 80) {
                console.log('High score achieved! Showing next challenge...');
                setTimeout(function() {
                    const nextChallenge = document.getElementById('next-challenge');
                    if (nextChallenge) {
                        console.log('Displaying next challenge section');
                        nextChallenge.classList.remove('hidden');
                        nextChallenge.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        console.error('Could not find next-challenge element');
                    }
                }, 800);
            }
        }

        function simulateLowScore() {
            console.log('Simulating low score (60%)...');
            const percentage = 60;
            const score = 6;
            
            // Show results
            const finalScoreElement = document.getElementById('final-score');
            const resultsElement = document.getElementById('quiz-results');
            const nextChallenge = document.getElementById('next-challenge');
            const reviewGuidance = document.getElementById('review-guidance');
            
            if (finalScoreElement) {
                finalScoreElement.textContent = score + '/10 (' + percentage + '%)';
            }
            
            if (resultsElement) {
                resultsElement.classList.remove('hidden');
            }
            
            // Hide next challenge and show review guidance
            if (nextChallenge) {
                nextChallenge.classList.add('hidden');
            }
            
            // Show review guidance for low scores
            setTimeout(function() {
                if (reviewGuidance) {
                    console.log('Displaying review guidance section');
                    reviewGuidance.classList.remove('hidden');
                    reviewGuidance.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    console.error('Could not find review-guidance element');
                }
            }, 800);
            
            console.log('Score below 80%, showing review guidance');
        }

        function resetTest() {
            const resultsElement = document.getElementById('quiz-results');
            const nextChallenge = document.getElementById('next-challenge');
            const reviewGuidance = document.getElementById('review-guidance');
            
            if (resultsElement) {
                resultsElement.classList.add('hidden');
            }
            
            if (nextChallenge) {
                nextChallenge.classList.add('hidden');
            }
            
            if (reviewGuidance) {
                reviewGuidance.classList.add('hidden');
            }
            
            console.log('Test reset');
        }
        
        // Statistics and Probability JavaScript Functions
        function checkStatsAnswer(questionNum, correctAnswer, explanation) {
            const select = document.getElementById('q' + questionNum + '_stats_answer');
            const feedback = document.getElementById('stats_feedback' + questionNum);
            
            if (!select || !feedback) return;
            
            const userAnswer = select.value.trim();
            
            if (userAnswer === correctAnswer) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please select an answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkStatsTextAnswer(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_stats_text');
            const feedback = document.getElementById('stats_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = input.value.trim().toLowerCase();
            
            let isCorrect = false;
            for (const correct of correctAnswers) {
                if (userAnswer.includes(correct.toLowerCase())) {
                    isCorrect = true;
                    break;
                }
            }
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter your answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Try again.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkStatsNumberAnswer(questionNum, correctAnswer, type, explanation) {
            const input = document.getElementById('q' + questionNum + '_' + type + '_answer') || document.getElementById('q' + questionNum + '_mean_answer') || document.getElementById('q' + questionNum + '_median_answer') || document.getElementById('q' + questionNum + '_mode_answer');
            const feedback = document.getElementById('stats_mean_feedback' + questionNum) || document.getElementById('dist_feedback' + questionNum) || document.getElementById('prob_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = parseFloat(input.value);
            
            if (isNaN(userAnswer)) {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter a valid number.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            const tolerance = 0.01; // Allow small rounding errors
            if (Math.abs(userAnswer - correctAnswer) < tolerance) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkProbAnswer(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_prob_answer') || document.getElementById('q' + questionNum + '_tree_answer');
            const feedback = document.getElementById('prob_feedback' + questionNum) || document.getElementById('tree_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = input.value.trim().toLowerCase().replace(/\s/g, '');
            
            let isCorrect = false;
            for (const correct of correctAnswers) {
                if (userAnswer === correct.toLowerCase().replace(/\s/g, '')) {
                    isCorrect = true;
                    break;
                }
            }
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter your answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkTreeAnswer(questionNum, correctAnswer, explanation) {
            const input = document.getElementById('q' + questionNum + '_tree_answer');
            const feedback = document.getElementById('tree_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = parseFloat(input.value);
            
            if (isNaN(userAnswer)) {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter a valid number.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            const tolerance = 0.01;
            if (Math.abs(userAnswer - correctAnswer) < tolerance) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkHypAnswer(questionNum, correctAnswer, explanation) {
            const select = document.getElementById('q' + questionNum + '_hyp_answer');
            const feedback = document.getElementById('hyp_feedback' + questionNum);
            
            if (!select || !feedback) return;
            
            const userAnswer = select.value.trim();
            
            if (userAnswer === correctAnswer) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please select an answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkHypTextAnswer(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_hyp_answer');
            const feedback = document.getElementById('hyp_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = input.value.trim().toLowerCase().replace(/\s/g, '');
            
            let isCorrect = false;
            for (const correct of correctAnswers) {
                if (userAnswer === correct.toLowerCase().replace(/\s/g, '')) {
                    isCorrect = true;
                    break;
                }
            }
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter your answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Try again.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
    </script>
</body>
</html>`);
})

export default app
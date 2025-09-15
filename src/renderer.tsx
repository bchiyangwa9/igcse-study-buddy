import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Study Buddy - O-Level Learning Platform</title>
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Study Buddy - Interactive O-Level learning platform with mobile-first design, comprehensive curriculum, and WhatsApp integration." />
        <meta name="keywords" content="O-Level, education, mobile learning, study platform, mathematics, english, science" />
        <meta name="author" content="Study Buddy Team" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Study Buddy - O-Level Learning Platform" />
        <meta property="og:description" content="Master your O-Level studies with interactive lessons, practice quizzes, and personalized learning paths." />
        <meta property="og:type" content="website" />
        
        {/* Mobile Optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E📚%3C/text%3E%3C/svg%3E" />
        
        {/* TailwindCSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: {
                      50: '#eff6ff',
                      100: '#dbeafe',
                      200: '#bfdbfe',
                      300: '#93c5fd',
                      400: '#60a5fa',
                      500: '#3b82f6',
                      600: '#2563eb',
                      700: '#1d4ed8',
                      800: '#1e40af',
                      900: '#1e3a8a'
                    }
                  },
                  animation: {
                    'fade-in': 'fadeIn 0.5s ease-in-out',
                    'slide-up': 'slideUp 0.6s ease-out',
                    'bounce-gentle': 'bounceGentle 2s infinite'
                  },
                  keyframes: {
                    fadeIn: {
                      '0%': { opacity: '0' },
                      '100%': { opacity: '1' }
                    },
                    slideUp: {
                      '0%': { transform: 'translateY(20px)', opacity: '0' },
                      '100%': { transform: 'translateY(0)', opacity: '1' }
                    },
                    bounceGentle: {
                      '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                      '40%': { transform: 'translateY(-10px)' },
                      '60%': { transform: 'translateY(-5px)' }
                    }
                  }
                }
              }
            }
          `
        }}></script>
      </head>
      <body className="bg-gray-50 font-sans antialiased">
        {children}
        
        {/* JavaScript Libraries */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js"></script>
        
        {/* Custom JavaScript */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})

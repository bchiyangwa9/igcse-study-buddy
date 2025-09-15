import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'

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

// Main dashboard route
app.get('/', async (c) => {
  return c.render(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SB</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Study Buddy</h1>
                <p className="text-sm text-gray-500">O-Level Learning Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Master Your O-Level Studies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive lessons, practice quizzes, and personalized learning paths for O-Level success. 
            Study anytime, anywhere with our mobile-first platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Learning Now
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              View Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile-First Learning</h3>
            <p className="text-gray-600">Access your studies on any device. Seamless experience across mobile, tablet, and desktop.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete O-Level Curriculum</h3>
            <p className="text-gray-600">Comprehensive coverage of Mathematics, English, Science, and more O-Level subjects.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Learning</h3>
            <p className="text-gray-600">AI-powered recommendations and adaptive learning paths tailored to your progress.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Detailed analytics and progress reports to keep you motivated and on track.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp Integration</h3>
            <p className="text-gray-600">Get study reminders, quick lessons, and support directly through WhatsApp.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gamification</h3>
            <p className="text-gray-600">Earn points, badges, and achievements to make learning fun and engaging.</p>
          </div>
        </div>

        {/* Subjects Preview */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Available Subjects</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="subjects-grid">
            {/* Subjects will be loaded dynamically */}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Excel in Your O-Levels?</h3>
          <p className="text-xl mb-6 opacity-90">Join thousands of students already using Study Buddy to achieve their academic goals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">SB</span>
                </div>
                <span className="text-xl font-bold">Study Buddy</span>
              </div>
              <p className="text-gray-400 mb-4">Empowering O-Level students with interactive learning experiences and comprehensive study resources.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Interactive Lessons</li>
                <li>Practice Quizzes</li>
                <li>Progress Tracking</li>
                <li>Mobile Learning</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Subjects</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Mathematics</li>
                <li>English Language</li>
                <li>Science</li>
                <li>History & Geography</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Study Buddy. All rights reserved. Built with ❤️ for O-Level students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
})

// API Routes

// Get all subjects
app.get('/api/subjects', async (c) => {
  const { env } = c
  
  try {
    const { results } = await env.DB.prepare(`
      SELECT id, code, name, description, icon, color, is_active 
      FROM subjects 
      WHERE is_active = 1 
      ORDER BY name
    `).all()
    
    return c.json({ success: true, subjects: results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch subjects' }, 500)
  }
})

// Get topics for a subject
app.get('/api/subjects/:subjectId/topics', async (c) => {
  const { env } = c
  const subjectId = c.req.param('subjectId')
  
  try {
    const { results } = await env.DB.prepare(`
      SELECT t.*, s.name as subject_name, s.code as subject_code
      FROM topics t
      JOIN subjects s ON t.subject_id = s.id
      WHERE t.subject_id = ? AND t.is_active = 1
      ORDER BY t.order_index, t.title
    `).bind(subjectId).all()
    
    return c.json({ success: true, topics: results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch topics' }, 500)
  }
})

// Get content for a topic
app.get('/api/topics/:topicId/content', async (c) => {
  const { env } = c
  const topicId = c.req.param('topicId')
  
  try {
    const { results } = await env.DB.prepare(`
      SELECT c.*, t.title as topic_title, s.name as subject_name
      FROM content c
      JOIN topics t ON c.topic_id = t.id
      JOIN subjects s ON t.subject_id = s.id
      WHERE c.topic_id = ? AND c.is_active = 1
      ORDER BY c.order_index, c.title
    `).bind(topicId).all()
    
    return c.json({ success: true, content: results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch content' }, 500)
  }
})

// Get user progress
app.get('/api/users/:userId/progress', async (c) => {
  const { env } = c
  const userId = c.req.param('userId')
  
  try {
    const { results } = await env.DB.prepare(`
      SELECT 
        up.*,
        c.title as content_title,
        c.content_type,
        t.title as topic_title,
        s.name as subject_name,
        s.code as subject_code
      FROM user_progress up
      JOIN content c ON up.content_id = c.id
      JOIN topics t ON c.topic_id = t.id
      JOIN subjects s ON t.subject_id = s.id
      WHERE up.user_id = ?
      ORDER BY up.last_accessed DESC
    `).bind(userId).all()
    
    return c.json({ success: true, progress: results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch user progress' }, 500)
  }
})

// Update user progress
app.post('/api/users/:userId/progress', async (c) => {
  const { env } = c
  const userId = c.req.param('userId')
  const { content_id, status, progress_percentage, time_spent } = await c.req.json()
  
  try {
    await env.DB.prepare(`
      INSERT OR REPLACE INTO user_progress 
      (user_id, content_id, status, progress_percentage, time_spent, last_accessed, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).bind(userId, content_id, status, progress_percentage, time_spent).run()
    
    return c.json({ success: true, message: 'Progress updated successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update progress' }, 500)
  }
})

// Submit quiz attempt
app.post('/api/quiz/submit', async (c) => {
  const { env } = c
  const { user_id, content_id, answers, time_taken } = await c.req.json()
  
  try {
    // Get quiz questions to calculate score
    const { results: questions } = await env.DB.prepare(`
      SELECT id, correct_answer, points
      FROM quiz_questions
      WHERE content_id = ? AND is_active = 1
    `).bind(content_id).all()
    
    let score = 0
    let total_points = 0
    
    questions.forEach(question => {
      total_points += question.points
      const userAnswer = answers[question.id]
      if (userAnswer === question.correct_answer) {
        score += question.points
      }
    })
    
    const percentage = total_points > 0 ? (score / total_points) * 100 : 0
    
    // Save quiz attempt
    const result = await env.DB.prepare(`
      INSERT INTO quiz_attempts 
      (user_id, content_id, score, total_points, percentage, time_taken, answers, is_completed, completed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
    `).bind(user_id, content_id, score, total_points, percentage, time_taken, JSON.stringify(answers)).run()
    
    return c.json({ 
      success: true, 
      quiz_attempt_id: result.meta.last_row_id,
      score, 
      total_points, 
      percentage 
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to submit quiz' }, 500)
  }
})

// Get quiz questions
app.get('/api/content/:contentId/quiz', async (c) => {
  const { env } = c
  const contentId = c.req.param('contentId')
  
  try {
    const { results } = await env.DB.prepare(`
      SELECT id, question_text, question_type, options, points, difficulty_level
      FROM quiz_questions
      WHERE content_id = ? AND is_active = 1
      ORDER BY id
    `).bind(contentId).all()
    
    return c.json({ success: true, questions: results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch quiz questions' }, 500)
  }
})

// Initialize database (development helper)
app.post('/api/init-db', async (c) => {
  const { env } = c
  
  try {
    // This would typically be done via migrations, but for development we can initialize here
    await env.DB.exec(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    return c.json({ success: true, message: 'Database initialized successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to initialize database' }, 500)
  }
})

export default app

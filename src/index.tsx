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
              <button onclick="app.showSignIn()" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
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
            <button onclick="window.location.href='/dashboard'" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
              Start Learning Now
            </button>
            <button onclick="app.showDemo()" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
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
            <button onclick="window.location.href='/dashboard'" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
              Get Started Free
            </button>
            <button onclick="app.showLearnMore()" className="border border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer">
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

// Learning Dashboard route
app.get('/dashboard', async (c) => {
  const { env } = c
  
  // Get subjects for the dashboard
  let subjects = []
  try {
    const { results } = await env.DB.prepare(`
      SELECT id, code, name, description, icon, color, is_active 
      FROM subjects 
      WHERE is_active = 1 
      ORDER BY name
    `).all()
    subjects = results || []
  } catch (error) {
    console.error('Failed to fetch subjects:', error)
  }

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
                <p className="text-sm text-gray-500">Learning Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onclick="window.location.href='/'" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium cursor-pointer">
                Home
              </button>
              <button onclick="app.showProfile()" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Your Learning Journey! 🚀</h2>
              <p className="text-gray-600 mt-2">Choose a subject below to start your O-Level studies</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600" id="total-progress">0%</div>
              <div className="text-sm text-gray-500">Overall Progress</div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Subjects Available</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600" id="completed-lessons">0</div>
              <div className="text-sm text-gray-600">Lessons Completed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600" id="quiz-score">0%</div>
              <div className="text-sm text-gray-600">Average Quiz Score</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600" id="study-time">0h</div>
              <div className="text-sm text-gray-600">Time Studied</div>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Subject</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="dashboard-subjects-grid">
            {subjects.map(subject => (
              <div key={subject.id} className="subject-card cursor-pointer" 
                   style={{"--subject-color": subject.color, "--subject-color-dark": subject.color}} 
                   onclick={`app.openSubject('${subject.id}', '${subject.name}')`}>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-transparent hover:border-blue-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{background: `linear-gradient(135deg, ${subject.color} 0%, ${subject.color}dd 100%)`}}>
                      {subject.icon}
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{backgroundColor: `${subject.color}20`, color: subject.color}}>
                      {subject.code}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{subject.name}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{subject.description || 'Comprehensive O-Level curriculum'}</p>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium text-gray-700" id={`progress-${subject.id}`}>0%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '0%', background: `linear-gradient(90deg, ${subject.color} 0%, ${subject.color}cc 100%)`}}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div id="recent-activity" className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📚</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Welcome to Study Buddy!</p>
                <p className="text-xs text-gray-500">Choose a subject above to start learning</p>
              </div>
              <span className="text-xs text-gray-400">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

// Subject detail route
app.get('/subject/:subjectId', async (c) => {
  const { env } = c
  const subjectId = c.req.param('subjectId')
  
  let subject = null
  let topics = []
  
  try {
    // Get subject details
    const subjectResult = await env.DB.prepare(`
      SELECT * FROM subjects WHERE id = ? AND is_active = 1
    `).bind(subjectId).first()
    
    if (!subjectResult) {
      return c.redirect('/dashboard')
    }
    
    subject = subjectResult
    
    // Get topics for this subject
    const topicsResult = await env.DB.prepare(`
      SELECT t.*, 
             COUNT(c.id) as content_count,
             COUNT(CASE WHEN c.content_type = 'quiz' THEN 1 END) as quiz_count
      FROM topics t
      LEFT JOIN content c ON t.id = c.topic_id AND c.is_active = 1
      WHERE t.subject_id = ? AND t.is_active = 1
      GROUP BY t.id
      ORDER BY t.order_index, t.title
    `).bind(subjectId).all()
    
    topics = topicsResult.results || []
  } catch (error) {
    console.error('Failed to fetch subject data:', error)
    return c.redirect('/dashboard')
  }

  return c.render(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <button onclick="window.location.href='/dashboard'" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                <span className="text-gray-600">←</span>
              </button>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{background: `linear-gradient(135deg, ${subject.color} 0%, ${subject.color}dd 100%)`}}>
                {subject.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
                <p className="text-sm text-gray-500">{subject.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onclick="window.location.href='/dashboard'" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium cursor-pointer">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Subject Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Overview */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Learning Path</h2>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{color: subject.color}}>0%</div>
              <div className="text-sm text-gray-500">Subject Progress</div>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{subject.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{topics.length}</div>
              <div className="text-sm text-gray-600">Topics</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{topics.reduce((sum, topic) => sum + (topic.content_count || 0), 0)}</div>
              <div className="text-sm text-gray-600">Lessons</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{topics.reduce((sum, topic) => sum + (topic.quiz_count || 0), 0)}</div>
              <div className="text-sm text-gray-600">Quizzes</div>
            </div>
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Topics</h3>
          {topics.map((topic, index) => {
            const getDifficultyStyle = (level) => {
              switch(level) {
                case 'beginner': return {backgroundColor: '#dbeafe', color: '#1d4ed8'}
                case 'intermediate': return {backgroundColor: '#fef3c7', color: '#d97706'}
                case 'advanced': return {backgroundColor: '#fecaca', color: '#dc2626'}
                default: return {backgroundColor: '#dbeafe', color: '#1d4ed8'}
              }
            }
            
            return (
              <div key={topic.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" 
                   onclick={`app.openTopic('${topic.id}', '${topic.title}')`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" 
                         style={{backgroundColor: subject.color}}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h4>
                      <p className="text-gray-600 mb-3">{topic.description || 'Learn the fundamentals and build your understanding step by step.'}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📚 {topic.content_count || 0} lessons</span>
                        {topic.quiz_count > 0 && <span>🧩 {topic.quiz_count} quizzes</span>}
                        <span>⏱️ {topic.estimated_duration || 30} min</span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium" 
                              style={getDifficultyStyle(topic.difficulty_level)}>
                          {topic.difficulty_level || 'beginner'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700 mb-1">0% Complete</div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="h-full bg-gradient-to-r rounded-full" 
                           style={{width: '0%', background: `linear-gradient(90deg, ${subject.color} 0%, ${subject.color}cc 100%)`}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {topics.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Coming Soon</h3>
            <p className="text-gray-600">We're preparing amazing content for this subject. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
})

export default app

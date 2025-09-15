-- Study Buddy Mobile Application Database Schema
-- Educational platform for O-Level students

-- Users table for student and teacher accounts
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student', -- student, teacher, admin
  grade_level TEXT, -- O-Level, A-Level, etc.
  subjects TEXT, -- JSON array of subjects
  whatsapp_number TEXT,
  profile_picture TEXT,
  is_active BOOLEAN DEFAULT 1,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Subjects table for O-Level curriculum
CREATE TABLE IF NOT EXISTS subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL, -- e.g., "MATH", "ENG", "SCI"
  name TEXT NOT NULL, -- e.g., "Mathematics", "English", "Science"
  description TEXT,
  icon TEXT, -- emoji or icon class
  color TEXT DEFAULT '#3B82F6',
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Topics within each subject
CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  difficulty_level TEXT DEFAULT 'beginner', -- beginner, intermediate, advanced
  estimated_duration INTEGER, -- in minutes
  prerequisites TEXT, -- JSON array of topic IDs
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Educational content (lessons, videos, documents)
CREATE TABLE IF NOT EXISTS content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL, -- lesson, video, document, quiz, exercise
  content_body TEXT, -- HTML content for lessons
  media_url TEXT, -- URL for videos, documents, etc.
  duration INTEGER, -- in minutes
  order_index INTEGER DEFAULT 0,
  difficulty_level TEXT DEFAULT 'beginner',
  tags TEXT, -- JSON array of tags
  is_premium BOOLEAN DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Quiz questions for assessments
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id INTEGER,
  topic_id INTEGER,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL, -- multiple_choice, true_false, short_answer, essay
  options TEXT, -- JSON array for multiple choice options
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  difficulty_level TEXT DEFAULT 'beginner',
  tags TEXT, -- JSON array of tags
  is_active BOOLEAN DEFAULT 1,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE,
  FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started', -- not_started, in_progress, completed
  progress_percentage INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- in minutes
  last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE,
  UNIQUE(user_id, content_id)
);

-- Quiz attempts and results
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content_id INTEGER NOT NULL,
  score INTEGER DEFAULT 0,
  total_points INTEGER NOT NULL,
  percentage REAL DEFAULT 0,
  time_taken INTEGER, -- in seconds
  answers TEXT, -- JSON array of answers
  is_completed BOOLEAN DEFAULT 0,
  attempt_number INTEGER DEFAULT 1,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

-- Study sessions for time tracking
CREATE TABLE IF NOT EXISTS study_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  subject_id INTEGER,
  topic_id INTEGER,
  content_id INTEGER,
  session_type TEXT DEFAULT 'study', -- study, quiz, practice, revision
  duration INTEGER DEFAULT 0, -- in seconds
  points_earned INTEGER DEFAULT 0,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ended_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id),
  FOREIGN KEY (topic_id) REFERENCES topics(id),
  FOREIGN KEY (content_id) REFERENCES content(id)
);

-- Notifications for WhatsApp integration
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL, -- reminder, achievement, new_content, quiz_result
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data TEXT, -- JSON data for additional info
  is_sent BOOLEAN DEFAULT 0,
  sent_via TEXT, -- app, whatsapp, email
  scheduled_for DATETIME,
  sent_at DATETIME,
  is_read BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User achievements and badges
CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL, -- streak, completion, score, time_spent
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  points INTEGER DEFAULT 0,
  badge_color TEXT DEFAULT '#FFD700',
  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- WhatsApp integration logs
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  phone_number TEXT NOT NULL,
  message_type TEXT NOT NULL, -- incoming, outgoing, template
  message_content TEXT NOT NULL,
  message_id TEXT, -- WhatsApp message ID
  status TEXT DEFAULT 'sent', -- sent, delivered, read, failed
  webhook_data TEXT, -- JSON data from WhatsApp webhook
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  delivered_at DATETIME,
  read_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_content_topic ON content(topic_id);
CREATE INDEX IF NOT EXISTS idx_content_type ON content(content_type);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_content ON user_progress(content_id);
CREATE INDEX IF NOT EXISTS idx_progress_status ON user_progress(status);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user ON study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_phone ON whatsapp_messages(phone_number);
CREATE INDEX IF NOT EXISTS idx_whatsapp_user ON whatsapp_messages(user_id);
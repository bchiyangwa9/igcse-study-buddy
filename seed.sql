-- Seed data for Study Buddy Mobile Application
-- Test data for development and demonstration

-- Insert sample subjects for O-Level curriculum
INSERT OR IGNORE INTO subjects (code, name, description, icon, color) VALUES 
  ('MATH', 'Mathematics', 'O-Level Mathematics covering Algebra, Geometry, and Statistics', '📊', '#3B82F6'),
  ('ENG', 'English Language', 'English Language skills including Reading, Writing, and Grammar', '📖', '#10B981'),
  ('SCI', 'Science', 'Integrated Science covering Biology, Chemistry, and Physics', '🔬', '#F59E0B'),
  ('HIST', 'History', 'World and Local History for O-Level students', '📜', '#8B5CF6'),
  ('GEOG', 'Geography', 'Physical and Human Geography studies', '🌍', '#06B6D4'),
  ('CHEM', 'Chemistry', 'O-Level Chemistry fundamentals', '⚗️', '#EF4444'),
  ('PHYS', 'Physics', 'O-Level Physics concepts and applications', '⚡', '#F97316'),
  ('BIO', 'Biology', 'O-Level Biology and Life Sciences', '🌱', '#22C55E');

-- Insert sample users (password is 'password123' hashed)
INSERT OR IGNORE INTO users (email, username, password_hash, full_name, role, grade_level, subjects, whatsapp_number) VALUES 
  ('alice.student@email.com', 'alice_s', '$2b$10$8K1p/a0dLPVXHkL8ZvQmeuN8F8JQBV8F9/6/3/4/5', 'Alice Johnson', 'student', 'O-Level', '["MATH", "ENG", "SCI"]', '+1234567890'),
  ('bob.teacher@email.com', 'bob_t', '$2b$10$8K1p/a0dLPVXHkL8ZvQmeuN8F8JQBV8F9/6/3/4/5', 'Bob Smith', 'teacher', 'O-Level', '["MATH", "PHYS"]', '+1234567891'),
  ('charlie.student@email.com', 'charlie_s', '$2b$10$8K1p/a0dLPVXHkL8ZvQmeuN8F8JQBV8F9/6/3/4/5', 'Charlie Brown', 'student', 'O-Level', '["ENG", "HIST", "GEOG"]', '+1234567892'),
  ('diana.admin@email.com', 'diana_a', '$2b$10$8K1p/a0dLPVXHkL8ZvQmeuN8F8JQBV8F9/6/3/4/5', 'Diana Prince', 'admin', 'Admin', '[]', '+1234567893');

-- Insert sample topics for Mathematics
INSERT OR IGNORE INTO topics (subject_id, title, description, order_index, difficulty_level, estimated_duration) VALUES 
  (1, 'Algebra Basics', 'Introduction to algebraic expressions and equations', 1, 'beginner', 45),
  (1, 'Linear Equations', 'Solving linear equations and inequalities', 2, 'beginner', 60),
  (1, 'Quadratic Equations', 'Understanding and solving quadratic equations', 3, 'intermediate', 75),
  (1, 'Geometry Fundamentals', 'Basic geometric shapes and properties', 4, 'beginner', 50),
  (1, 'Coordinate Geometry', 'Graphs, slopes, and coordinate systems', 5, 'intermediate', 65),
  (1, 'Statistics and Probability', 'Data analysis and probability calculations', 6, 'intermediate', 70);

-- Insert sample topics for English
INSERT OR IGNORE INTO topics (subject_id, title, description, order_index, difficulty_level, estimated_duration) VALUES 
  (2, 'Reading Comprehension', 'Improving reading skills and text analysis', 1, 'beginner', 40),
  (2, 'Essay Writing', 'Structure and techniques for effective essays', 2, 'intermediate', 60),
  (2, 'Grammar and Punctuation', 'Essential grammar rules and punctuation', 3, 'beginner', 45),
  (2, 'Vocabulary Building', 'Expanding vocabulary for O-Level exams', 4, 'beginner', 35),
  (2, 'Literature Analysis', 'Analyzing poems, stories, and plays', 5, 'advanced', 80);

-- Insert sample topics for Science
INSERT OR IGNORE INTO topics (subject_id, title, description, order_index, difficulty_level, estimated_duration) VALUES 
  (3, 'Scientific Method', 'Understanding scientific inquiry and experiments', 1, 'beginner', 40),
  (3, 'Matter and Energy', 'States of matter and energy transformations', 2, 'beginner', 55),
  (3, 'Cell Biology', 'Basic cell structure and functions', 3, 'intermediate', 60),
  (3, 'Chemical Reactions', 'Types of chemical reactions and equations', 4, 'intermediate', 65),
  (3, 'Forces and Motion', 'Physics concepts of force, motion, and energy', 5, 'intermediate', 70);

-- Insert sample content for Mathematics - Algebra Basics
INSERT OR IGNORE INTO content (topic_id, title, content_type, content_body, order_index, difficulty_level, tags, created_by) VALUES 
  (1, 'Introduction to Variables', 'lesson', 
   '<h2>What are Variables?</h2>
   <p>In algebra, a variable is a symbol (usually a letter) that represents an unknown number. The most common variables are x, y, and z.</p>
   <h3>Examples:</h3>
   <ul>
     <li>x + 5 = 12 (x represents the unknown number)</li>
     <li>2y = 16 (y is the variable we need to find)</li>
     <li>a + b = 10 (both a and b are variables)</li>
   </ul>
   <p><strong>Practice:</strong> Try to identify the variables in these expressions: 3m + 7, 5x - 2y, and 4a + 3b - c</p>', 
   1, 'beginner', '["variables", "algebra", "basics"]', 2),
   
  (1, 'Solving Simple Equations', 'lesson',
   '<h2>How to Solve Basic Equations</h2>
   <p>To solve an equation, we need to isolate the variable on one side.</p>
   <h3>Steps:</h3>
   <ol>
     <li>Identify the variable</li>
     <li>Use inverse operations to isolate the variable</li>
     <li>Check your answer by substituting back</li>
   </ol>
   <h3>Example:</h3>
   <p>Solve: x + 7 = 15</p>
   <p>Step 1: Subtract 7 from both sides</p>
   <p>x + 7 - 7 = 15 - 7</p>
   <p>x = 8</p>
   <p>Check: 8 + 7 = 15 ✓</p>',
   2, 'beginner', '["equations", "solving", "algebra"]', 2),

  (1, 'Algebra Quiz 1', 'quiz', 
   'Test your understanding of basic algebra concepts', 
   3, 'beginner', '["quiz", "algebra", "assessment"]', 2);

-- Insert quiz questions for Algebra Quiz
INSERT OR IGNORE INTO quiz_questions (content_id, topic_id, question_text, question_type, options, correct_answer, explanation, points) VALUES 
  (3, 1, 'What is a variable in algebra?', 'multiple_choice', 
   '["A number that never changes", "A symbol that represents an unknown number", "A mathematical operation", "A type of equation"]',
   'A symbol that represents an unknown number',
   'Variables are symbols (usually letters) that represent unknown or changing values in algebraic expressions.',
   1),
   
  (3, 1, 'Solve for x: x + 5 = 13', 'multiple_choice',
   '["6", "7", "8", "9"]',
   '8',
   'To solve x + 5 = 13, subtract 5 from both sides: x = 13 - 5 = 8',
   2),
   
  (3, 1, 'If y - 3 = 7, what is the value of y?', 'multiple_choice',
   '["4", "10", "11", "21"]',
   '10',
   'To solve y - 3 = 7, add 3 to both sides: y = 7 + 3 = 10',
   2);

-- Insert sample content for English - Reading Comprehension
INSERT OR IGNORE INTO content (topic_id, title, content_type, content_body, order_index, difficulty_level, tags, created_by) VALUES 
  (6, 'Active Reading Strategies', 'lesson',
   '<h2>How to Read Effectively</h2>
   <p>Active reading involves engaging with the text to improve comprehension and retention.</p>
   <h3>Key Strategies:</h3>
   <ul>
     <li><strong>Preview:</strong> Look at headings, subheadings, and images before reading</li>
     <li><strong>Question:</strong> Ask yourself what you expect to learn</li>
     <li><strong>Read:</strong> Read actively, looking for main ideas</li>
     <li><strong>Summarize:</strong> Summarize key points in your own words</li>
     <li><strong>Review:</strong> Go back and check your understanding</li>
   </ul>
   <h3>Practice Tips:</h3>
   <p>• Take notes while reading<br>
   • Highlight key information<br>
   • Ask questions about the content<br>
   • Connect new information to what you already know</p>',
   1, 'beginner', '["reading", "comprehension", "strategies"]', 2);

-- Insert sample user progress
INSERT OR IGNORE INTO user_progress (user_id, content_id, status, progress_percentage, time_spent, completed_at) VALUES 
  (1, 1, 'completed', 100, 25, datetime('now', '-2 days')),
  (1, 2, 'in_progress', 60, 15, NULL),
  (1, 4, 'completed', 100, 30, datetime('now', '-1 day')),
  (3, 1, 'completed', 100, 20, datetime('now', '-3 days')),
  (3, 2, 'not_started', 0, 0, NULL);

-- Insert sample quiz attempts
INSERT OR IGNORE INTO quiz_attempts (user_id, content_id, score, total_points, percentage, time_taken, is_completed, completed_at) VALUES 
  (1, 3, 4, 5, 80.0, 180, 1, datetime('now', '-2 days')),
  (3, 3, 5, 5, 100.0, 120, 1, datetime('now', '-1 day'));

-- Insert sample study sessions
INSERT OR IGNORE INTO study_sessions (user_id, subject_id, topic_id, content_id, session_type, duration, points_earned, ended_at) VALUES 
  (1, 1, 1, 1, 'study', 1500, 10, datetime('now', '-2 days')),
  (1, 1, 1, 2, 'study', 900, 5, datetime('now', '-1 day')),
  (1, 1, 1, 3, 'quiz', 300, 20, datetime('now', '-1 day')),
  (3, 2, 6, 4, 'study', 1800, 15, datetime('now', '-1 day'));

-- Insert sample achievements
INSERT OR IGNORE INTO achievements (user_id, type, title, description, icon, points, earned_at) VALUES 
  (1, 'completion', 'First Lesson Complete', 'Completed your first lesson!', '🎯', 10, datetime('now', '-2 days')),
  (1, 'streak', 'Three Day Streak', 'Studied for 3 consecutive days', '🔥', 25, datetime('now', '-1 day')),
  (3, 'score', 'Perfect Score', 'Got 100% on a quiz!', '⭐', 50, datetime('now', '-1 day'));

-- Insert sample notifications
INSERT OR IGNORE INTO notifications (user_id, type, title, message, is_sent, sent_via, sent_at) VALUES 
  (1, 'reminder', 'Daily Study Reminder', 'Time for your daily math practice!', 1, 'app', datetime('now', '-1 hour')),
  (1, 'achievement', 'New Badge Earned', 'Congratulations! You earned the Three Day Streak badge.', 1, 'app', datetime('now', '-1 day')),
  (3, 'new_content', 'New Lesson Available', 'A new English lesson has been added to your curriculum.', 0, NULL, NULL);
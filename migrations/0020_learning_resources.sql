-- Learning Resources Migration
-- Tables for managing infographics, videos, and study materials

-- Create resource_types table
CREATE TABLE IF NOT EXISTS resource_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default resource types
INSERT OR IGNORE INTO resource_types (id, name, description, icon) VALUES
(1, 'infographic_concept', 'Key Concepts Infographic', 'fa-brain'),
(2, 'infographic_formula', 'Formula Sheet Infographic', 'fa-calculator'),
(3, 'infographic_examples', 'Worked Examples Infographic', 'fa-lightbulb'),
(4, 'infographic_tips', 'Study Tips Infographic', 'fa-star'),
(5, 'video_introduction', 'Introduction Video', 'fa-play'),
(6, 'video_worked', 'Worked Examples Video', 'fa-play'),
(7, 'video_practice', 'Practice Problems Video', 'fa-play'),
(8, 'pdf_worksheet', 'Practice Worksheet PDF', 'fa-file-pdf'),
(9, 'pdf_notes', 'Study Notes PDF', 'fa-file-alt');

-- Create learning_resources table
CREATE TABLE IF NOT EXISTS learning_resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER NOT NULL,
    resource_type_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    
    -- For images stored in R2
    image_url TEXT,
    image_key TEXT,  -- R2 object key
    image_size INTEGER,  -- in bytes
    image_dimensions TEXT,  -- JSON: {"width": 800, "height": 600}
    
    -- For videos (YouTube, Vimeo, or R2)
    video_url TEXT,
    video_embed_code TEXT,
    video_duration INTEGER,  -- in seconds
    video_platform TEXT,  -- 'youtube', 'vimeo', 'r2', 'custom'
    
    -- For PDFs
    pdf_url TEXT,
    pdf_key TEXT,  -- R2 object key
    pdf_size INTEGER,
    pdf_pages INTEGER,
    
    -- Metadata
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    downloads_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    
    -- Tags and categorization
    tags TEXT,  -- JSON array
    difficulty_level TEXT,  -- 'beginner', 'intermediate', 'advanced'
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT,
    
    FOREIGN KEY (topic_id) REFERENCES topics(id),
    FOREIGN KEY (resource_type_id) REFERENCES resource_types(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_resources_topic ON learning_resources(topic_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON learning_resources(resource_type_id);
CREATE INDEX IF NOT EXISTS idx_resources_active ON learning_resources(is_active);

-- Create resource_views table for analytics
CREATE TABLE IF NOT EXISTS resource_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resource_id INTEGER NOT NULL,
    user_id INTEGER,
    viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    session_duration INTEGER,  -- in seconds
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (resource_id) REFERENCES learning_resources(id)
);

-- Create resource_downloads table for tracking
CREATE TABLE IF NOT EXISTS resource_downloads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resource_id INTEGER NOT NULL,
    user_id INTEGER,
    downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_id) REFERENCES learning_resources(id)
);

-- Create admin_logs table for CMS actions
CREATE TABLE IF NOT EXISTS admin_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_username TEXT NOT NULL,
    action TEXT NOT NULL,  -- 'create', 'update', 'delete', 'upload'
    resource_type TEXT NOT NULL,  -- 'infographic', 'video', 'pdf'
    resource_id INTEGER,
    details TEXT,  -- JSON with additional info
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

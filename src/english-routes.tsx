// Cambridge IGCSE First Language English (0500) Routes and Content

export const ENGLISH_TOPICS = [
  // DIAGNOSTIC ASSESSMENT
  { id: 0, title: 'Diagnostic Assessment', description: 'Comprehensive 150-minute evaluation to identify strengths and learning needs', order_index: 0, difficulty_level: 'assessment', estimated_duration: 150, category: 'Diagnostic', paper: 'Assessment' },

  // PAPER 1: READING (Weeks 1-12)
  { id: 1, title: 'Reading Comprehension Foundations', description: 'Understanding different text types and basic comprehension strategies', order_index: 1, difficulty_level: 'beginner', estimated_duration: 60, category: 'Reading', paper: 'Paper 1' },
  { id: 2, title: 'Explicit Information Extraction', description: 'Locating and selecting relevant explicit information from texts', order_index: 2, difficulty_level: 'beginner', estimated_duration: 60, category: 'Reading', paper: 'Paper 1' },
  { id: 3, title: 'Implicit Meaning and Inference', description: 'Understanding implied meanings and making logical inferences', order_index: 3, difficulty_level: 'intermediate', estimated_duration: 75, category: 'Reading', paper: 'Paper 1' },
  { id: 4, title: 'Language Analysis and Effects', description: 'Analyzing how writers use language for specific effects', order_index: 4, difficulty_level: 'intermediate', estimated_duration: 75, category: 'Reading', paper: 'Paper 1' },
  { id: 5, title: 'Structure and Organization', description: 'Understanding how texts are structured and organized', order_index: 5, difficulty_level: 'intermediate', estimated_duration: 60, category: 'Reading', paper: 'Paper 1' },
  { id: 6, title: 'Writer\'s Perspective and Bias', description: 'Identifying and analyzing writer\'s viewpoint and bias', order_index: 6, difficulty_level: 'advanced', estimated_duration: 75, category: 'Reading', paper: 'Paper 1' },
  { id: 7, title: 'Comparative Analysis', description: 'Comparing ideas, perspectives, and approaches across texts', order_index: 7, difficulty_level: 'advanced', estimated_duration: 90, category: 'Reading', paper: 'Paper 1' },
  { id: 8, title: 'Critical Evaluation', description: 'Evaluating effectiveness of arguments and presentation', order_index: 8, difficulty_level: 'advanced', estimated_duration: 90, category: 'Reading', paper: 'Paper 1' },

  // PAPER 2: WRITING (Weeks 13-24)
  { id: 9, title: 'Writing Foundations', description: 'Basic writing skills, sentence structure, and paragraph development', order_index: 9, difficulty_level: 'beginner', estimated_duration: 60, category: 'Writing', paper: 'Paper 2' },
  { id: 10, title: 'Descriptive Writing', description: 'Creating vivid, engaging descriptive texts and scenes', order_index: 10, difficulty_level: 'beginner', estimated_duration: 75, category: 'Writing', paper: 'Paper 2' },
  { id: 11, title: 'Narrative Writing', description: 'Crafting compelling stories with strong structure and character development', order_index: 11, difficulty_level: 'intermediate', estimated_duration: 90, category: 'Writing', paper: 'Paper 2' },
  { id: 12, title: 'Persuasive Writing', description: 'Building convincing arguments and persuasive techniques', order_index: 12, difficulty_level: 'intermediate', estimated_duration: 75, category: 'Writing', paper: 'Paper 2' },
  { id: 13, title: 'Informative Writing', description: 'Presenting information clearly and effectively', order_index: 13, difficulty_level: 'intermediate', estimated_duration: 75, category: 'Writing', paper: 'Paper 2' },
  { id: 14, title: 'Formal Letters and Reports', description: 'Professional correspondence and report writing skills', order_index: 14, difficulty_level: 'intermediate', estimated_duration: 75, category: 'Writing', paper: 'Paper 2' },
  { id: 15, title: 'Creative Writing Techniques', description: 'Advanced creative techniques, style, and voice development', order_index: 15, difficulty_level: 'advanced', estimated_duration: 90, category: 'Writing', paper: 'Paper 2' },
  { id: 16, title: 'Analytical and Critical Writing', description: 'Writing analytical responses and critical evaluations', order_index: 16, difficulty_level: 'advanced', estimated_duration: 90, category: 'Writing', paper: 'Paper 2' },

  // INTEGRATED SKILLS (Final Weeks)
  { id: 17, title: 'Exam Technique and Strategy', description: 'Time management, question analysis, and exam strategies', order_index: 17, difficulty_level: 'advanced', estimated_duration: 75, category: 'Exam Prep', paper: 'Both Papers' },
  { id: 18, title: 'Revision and Practice', description: 'Comprehensive revision with past papers and mock exams', order_index: 18, difficulty_level: 'advanced', estimated_duration: 120, category: 'Exam Prep', paper: 'Both Papers' }
];

export const ENGLISH_LESSON_CONTENT = {
  0: `<div class="space-y-6">
    <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
        <h3 class="text-xl font-bold text-red-800 mb-3">📋 Diagnostic Assessment</h3>
        <p class="text-gray-700 mb-4">This comprehensive 150-minute assessment will evaluate your current English language skills across reading and writing competencies to create your personalized learning pathway.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-red-600 mb-2">📖 Reading Assessment (75 minutes)</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Text comprehension and analysis</li>
                    <li>• Inference and implicit meaning</li>
                    <li>• Language analysis and effects</li>
                    <li>• Comparative reading skills</li>
                </ul>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-red-600 mb-2">✍️ Writing Assessment (75 minutes)</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                    <li>• Creative and descriptive writing</li>
                    <li>• Persuasive and informative writing</li>
                    <li>• Language accuracy and style</li>
                    <li>• Structure and organization</li>
                </ul>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg border border-red-200">
            <h4 class="font-bold text-red-600 mb-3">🎯 What You'll Learn About Yourself</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h5 class="font-semibold text-gray-700 mb-2">Strengths</h5>
                    <p class="text-sm text-gray-600">Identify your strongest competency areas to build confidence</p>
                </div>
                <div>
                    <h5 class="font-semibold text-gray-700 mb-2">Growth Areas</h5>
                    <p class="text-sm text-gray-600">Discover specific skills that need focused practice</p>
                </div>
                <div>
                    <h5 class="font-semibold text-gray-700 mb-2">Learning Path</h5>
                    <p class="text-sm text-gray-600">Get personalized recommendations for your 24-week journey</p>
                </div>
            </div>
        </div>

        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
            <p class="text-sm text-yellow-800"><strong>Note:</strong> This assessment is designed to identify your current skill level. Don't worry if some questions seem challenging - this helps us create the perfect learning plan for you!</p>
        </div>
    </div>
</div>`,

  1: `<div class="space-y-6">
    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📖 Reading Comprehension Foundations</h3>
        <p class="text-gray-700 mb-4">Master the fundamental skills needed for effective reading comprehension and text analysis in Cambridge IGCSE English.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Types of Texts</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                    <li><strong>Fiction:</strong> Novels, short stories, poetry</li>
                    <li><strong>Non-fiction:</strong> Articles, essays, reports</li>
                    <li><strong>Media texts:</strong> Newspapers, magazines, websites</li>
                    <li><strong>Transactional:</strong> Letters, speeches, reviews</li>
                </ul>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Reading Strategies</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                    <li><strong>Skimming:</strong> Quick overview for main ideas</li>
                    <li><strong>Scanning:</strong> Looking for specific information</li>
                    <li><strong>Close reading:</strong> Detailed analysis for deeper meaning</li>
                    <li><strong>Annotation:</strong> Making notes while reading</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-blue-200">
        <h3 class="text-lg font-bold text-blue-700 mb-4">🎯 Key Reading Skills</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-bold text-blue-600 mb-3">Understanding Purpose</h4>
                <div class="text-sm space-y-2">
                    <p><strong>Inform:</strong> Providing facts and information</p>
                    <p><strong>Persuade:</strong> Convincing readers of a viewpoint</p>
                    <p><strong>Entertain:</strong> Engaging through story or humor</p>
                    <p><strong>Explain:</strong> Making complex ideas clear</p>
                </div>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-bold text-blue-600 mb-3">Identifying Audience</h4>
                <div class="text-sm space-y-2">
                    <p><strong>General public:</strong> Accessible language</p>
                    <p><strong>Specialists:</strong> Technical vocabulary</p>
                    <p><strong>Young people:</strong> Informal, engaging tone</p>
                    <p><strong>Academic:</strong> Formal, scholarly approach</p>
                </div>
            </div>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-bold text-blue-600 mb-3">📝 Practice Activity</h4>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Read this opening paragraph and answer the questions:</strong></p>
                <div class="bg-gray-100 p-3 rounded italic text-sm">
                    "The morning mist clung to the ancient oak trees like ghostly fingers, reluctant to release their hold on the sleeping forest. Sarah pulled her coat tighter as she stepped onto the winding path, her footsteps muffled by the thick carpet of fallen leaves that rustled with each step."
                </div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 1:</strong> What type of text is this most likely from?</p>
                <select id="q1_reading_answer" class="border border-gray-300 rounded px-3 py-2">
                    <option value="">Select answer</option>
                    <option value="fiction">Fiction story</option>
                    <option value="newspaper">Newspaper article</option>
                    <option value="instruction">Instruction manual</option>
                    <option value="advertisement">Advertisement</option>
                </select>
                <button onclick="checkReadingAnswer(1, 'fiction', 'This is clearly a fiction text with descriptive language, setting a scene, and introducing a character (Sarah).')" 
                        class="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Check Answer</button>
                <div id="reading_feedback1" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 2:</strong> What mood does the writer create?</p>
                <select id="q2_reading_answer" class="border border-gray-300 rounded px-3 py-2">
                    <option value="">Select answer</option>
                    <option value="mysterious">Mysterious and atmospheric</option>
                    <option value="cheerful">Cheerful and bright</option>
                    <option value="angry">Angry and hostile</option>
                    <option value="boring">Plain and boring</option>
                </select>
                <button onclick="checkReadingAnswer(2, 'mysterious', 'The imagery of mist like ghostly fingers and the quiet, misty forest creates a mysterious, atmospheric mood.')" 
                        class="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Check Answer</button>
                <div id="reading_feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  9: `<div class="space-y-6">
    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">✍️ Writing Foundations</h3>
        <p class="text-gray-700 mb-4">Build strong fundamental writing skills essential for success in Cambridge IGCSE English Paper 2.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-green-600 mb-2">Sentence Structure</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                    <li><strong>Simple:</strong> One main clause</li>
                    <li><strong>Compound:</strong> Two clauses joined by connectives</li>
                    <li><strong>Complex:</strong> Main clause + subordinate clause</li>
                    <li><strong>Compound-complex:</strong> Multiple clauses</li>
                </ul>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-green-600 mb-2">Paragraph Development</h4>
                <ul class="text-sm text-gray-700 space-y-1">
                    <li><strong>Topic sentence:</strong> Main idea introduction</li>
                    <li><strong>Development:</strong> Explanation and evidence</li>
                    <li><strong>Examples:</strong> Supporting details</li>
                    <li><strong>Conclusion:</strong> Link to next paragraph</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-green-200">
        <h3 class="text-lg font-bold text-green-700 mb-4">📝 Writing Process</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-green-50 p-4 rounded text-center">
                <div class="text-2xl mb-2">📋</div>
                <h4 class="font-bold text-green-600 mb-2">Planning</h4>
                <p class="text-xs text-gray-600">Brainstorm ideas, organize thoughts, create structure</p>
            </div>
            <div class="bg-green-50 p-4 rounded text-center">
                <div class="text-2xl mb-2">✍️</div>
                <h4 class="font-bold text-green-600 mb-2">Drafting</h4>
                <p class="text-xs text-gray-600">Write first version, focus on getting ideas down</p>
            </div>
            <div class="bg-green-50 p-4 rounded text-center">
                <div class="text-2xl mb-2">🔍</div>
                <h4 class="font-bold text-green-600 mb-2">Revising</h4>
                <p class="text-xs text-gray-600">Improve content, structure, and clarity</p>
            </div>
            <div class="bg-green-50 p-4 rounded text-center">
                <div class="text-2xl mb-2">✅</div>
                <h4 class="font-bold text-green-600 mb-2">Editing</h4>
                <p class="text-xs text-gray-600">Check grammar, spelling, and punctuation</p>
            </div>
        </div>

        <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-bold text-green-600 mb-3">🎯 Practice Exercise</h4>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Task:</strong> Improve this basic paragraph by adding detail and better sentence structure:</p>
                <div class="bg-gray-100 p-3 rounded text-sm mb-3">
                    "The dog was big. It was brown. It ran in the park. Children liked it. It was friendly."
                </div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Your improved version:</strong></p>
                <textarea id="writing_practice" class="w-full border border-gray-300 rounded px-3 py-2 h-24" 
                         placeholder="Rewrite the paragraph with better sentences, descriptive language, and improved flow..."></textarea>
                <button onclick="checkWritingPractice()" 
                        class="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Get Feedback</button>
                <div id="writing_feedback" class="hidden mt-3"></div>
            </div>

            <div class="bg-white p-3 rounded border">
                <p class="text-sm text-gray-600"><strong>Tips:</strong> Use varied sentence structures, add descriptive adjectives, connect ideas with appropriate conjunctions, and create a clear flow of information.</p>
            </div>
        </div>
    </div>
</div>`
};

export function getEnglishLessonContent(topicId: number): string {
  return ENGLISH_LESSON_CONTENT[topicId] || '<div class="bg-blue-50 p-6 rounded-lg"><h3 class="text-xl font-bold text-blue-800 mb-3">📚 Lesson Coming Soon!</h3><p class="text-gray-700">We are preparing comprehensive interactive content for this English topic. Check back soon!</p></div>';
}
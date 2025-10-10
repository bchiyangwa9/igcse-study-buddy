-- Sample IGCSE Mathematics Topics and Content for Testing

-- Insert first 6 topics to test the system
INSERT OR REPLACE INTO topics (id, subject_id, title, description, order_index, difficulty_level, estimated_duration, prerequisites, is_active) VALUES 
(1, 1, 'Number Operations', 'Basic arithmetic operations, order of operations, and number properties', 1, 'beginner', 45, NULL, 1),
(2, 1, 'Fractions and Decimals', 'Working with fractions, decimals, and percentage conversions', 2, 'beginner', 50, '1', 1),
(3, 1, 'Percentages and Ratios', 'Percentage calculations, ratios, proportions, and scale factors', 3, 'intermediate', 55, '1,2', 1),
(4, 1, 'Powers and Roots', 'Indices, square roots, cube roots, and standard form notation', 4, 'intermediate', 40, '1,2', 1),
(5, 1, 'Number Systems', 'Integers, rational numbers, irrational numbers, and prime factorization', 5, 'intermediate', 45, '1,2,4', 1),
(6, 1, 'Algebraic Expressions', 'Variables, terms, coefficients, and simplifying expressions', 6, 'beginner', 50, '1', 1),
(7, 1, 'Linear Equations', 'Solving linear equations and inequalities in one variable', 7, 'intermediate', 55, '6', 1),
(8, 1, 'Simultaneous Equations', 'Solving pairs of linear equations using various methods', 8, 'intermediate', 60, '6,7', 1),
(9, 1, 'Quadratic Equations', 'Factoring, completing the square, and quadratic formula', 9, 'advanced', 65, '6,7', 1),
(10, 1, 'Functions and Graphs', 'Linear and quadratic functions, graphing, and transformations', 10, 'advanced', 70, '7,9', 1),
(11, 1, 'Basic Geometry', 'Points, lines, angles, and basic geometric properties', 11, 'beginner', 40, NULL, 1),
(12, 1, 'Triangles and Polygons', 'Triangle properties, congruence, similarity, and polygon properties', 12, 'intermediate', 55, '11', 1),
(13, 1, 'Circle Geometry', 'Circle properties, circumference, area, and circle theorems', 13, 'intermediate', 50, '11,12', 1),
(14, 1, 'Pythagoras and Trigonometry', 'Pythagorean theorem and basic trigonometric ratios', 14, 'advanced', 60, '11,12', 1),
(15, 1, 'Coordinate Geometry', 'Plotting points, distance formula, and equation of straight lines', 15, 'advanced', 55, '7,11', 1),
(16, 1, 'Data Collection and Display', 'Types of data, surveys, and data presentation methods', 16, 'beginner', 45, NULL, 1),
(17, 1, 'Statistical Measures', 'Mean, median, mode, range, and measures of spread', 17, 'intermediate', 50, '16', 1),
(18, 1, 'Graphs and Charts', 'Bar charts, histograms, pie charts, and scatter diagrams', 18, 'intermediate', 55, '16,17', 1),
(19, 1, 'Probability Basics', 'Basic probability concepts, events, and probability rules', 19, 'intermediate', 45, '2,3', 1),
(20, 1, 'Probability Trees', 'Tree diagrams and conditional probability', 20, 'advanced', 50, '19', 1),
(21, 1, 'Advanced Statistics', 'Correlation, regression, and statistical inference', 21, 'advanced', 60, '17,18,19', 1);

-- Insert sample lesson content for key topics
INSERT OR REPLACE INTO content (id, topic_id, content_type, title, content_body, order_index, is_active) VALUES 

-- TOPIC 2: Fractions and Decimals
(2, 2, 'lesson', 'Understanding Fractions and Decimals', '
<div class="space-y-6">
    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">🍕 What Are Fractions?</h3>
        <p class="text-gray-700 mb-4">A fraction represents a part of a whole. It has two parts:</p>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2">3</div>
                <div class="border-t-2 border-purple-600 mb-2"></div>
                <div class="text-3xl font-bold text-purple-600">4</div>
                <p class="text-sm mt-2"><strong>Numerator</strong> (top): parts we have</p>
                <p class="text-sm"><strong>Denominator</strong> (bottom): total parts</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold mb-2">Visual Example:</h4>
                <div class="grid grid-cols-4 gap-1">
                    <div class="w-8 h-8 bg-purple-400 rounded"></div>
                    <div class="w-8 h-8 bg-purple-400 rounded"></div>
                    <div class="w-8 h-8 bg-purple-400 rounded"></div>
                    <div class="w-8 h-8 bg-gray-200 rounded border"></div>
                </div>
                <p class="text-sm mt-2">3 out of 4 parts = 3/4</p>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📊 Converting Fractions to Decimals</h3>
        <p class="text-gray-700 mb-4">To convert a fraction to a decimal, divide the numerator by the denominator:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-center">1/2</h4>
                <p class="text-center">1 ÷ 2 = 0.5</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-center">1/4</h4>
                <p class="text-center">1 ÷ 4 = 0.25</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-center">3/4</h4>
                <p class="text-center">3 ÷ 4 = 0.75</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Practice Problems</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. What is 1/5 as a decimal?</p>
                <input type="text" id="q1_answer" placeholder="Enter your answer" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkDecimalAnswer(1, [''0.2'', ''0.20''], ''1 ÷ 5 = 0.2'')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>

            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Convert 0.75 to a fraction in its simplest form:</p>
                <div class="space-y-2">
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="a" class="mr-2">
                        <span>a) 75/100</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="b" class="mr-2">
                        <span>b) 3/4</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="c" class="mr-2">
                        <span>c) 7/5</span>
                    </label>
                </div>
                <button onclick="checkAnswer(2, ''b'', ''0.75 = 75/100, which simplifies to 3/4 by dividing both by 25'')" 
                        class="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>
', 1, 1),

-- TOPIC 3: Percentages and Ratios
(3, 3, 'lesson', 'Percentages and Ratios', '
<div class="space-y-6">
    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">📈 Understanding Percentages</h3>
        <p class="text-gray-700 mb-4">Percentage means "out of 100". The symbol % means ÷100.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-orange-600">25%</h4>
                <p class="text-sm">= 25/100 = 1/4 = 0.25</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-orange-600">50%</h4>
                <p class="text-sm">= 50/100 = 1/2 = 0.5</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-orange-600">75%</h4>
                <p class="text-sm">= 75/100 = 3/4 = 0.75</p>
            </div>
        </div>
    </div>

    <div class="bg-indigo-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-indigo-800 mb-3">⚖️ Understanding Ratios</h3>
        <p class="text-gray-700 mb-4">A ratio compares quantities. It shows the relationship between two or more amounts.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2">Example: Red to Blue marbles</h4>
            <div class="flex items-center space-x-2 mb-2">
                <div class="flex space-x-1">
                    <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <span>:</span>
                <div class="flex space-x-1">
                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
            </div>
            <p class="text-sm">Ratio of red to blue = 3:2</p>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Practice Questions</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. What is 30% of 80?</p>
                <div class="space-y-2">
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="a" class="mr-2">
                        <span>a) 20</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="b" class="mr-2">
                        <span>b) 24</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="c" class="mr-2">
                        <span>c) 30</span>
                    </label>
                </div>
                <button onclick="checkAnswer(1, ''b'', ''30% = 30/100 = 0.3, so 0.3 × 80 = 24'')" 
                        class="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>
', 1, 1);

-- Insert sample quiz questions
INSERT OR REPLACE INTO quiz_questions (topic_id, question_text, question_type, options, correct_answer, explanation, difficulty_level, points) VALUES
-- Fractions and Decimals Quiz
(2, 'Convert 3/4 to a decimal', 'multiple_choice', '["0.34", "0.75", "0.43", "1.33"]', 'B', '3 ÷ 4 = 0.75', 'beginner', 2),
(2, 'What is 0.6 as a fraction in simplest form?', 'multiple_choice', '["6/10", "3/5", "2/3", "1/6"]', 'B', '0.6 = 6/10 = 3/5 (dividing by 2)', 'beginner', 2),
(2, 'Calculate: 1/2 + 1/4', 'multiple_choice', '["2/6", "3/4", "1/6", "2/4"]', 'B', 'Common denominator: 2/4 + 1/4 = 3/4', 'intermediate', 3),
(2, 'Which decimal is equivalent to 7/8?', 'multiple_choice', '["0.78", "0.875", "0.87", "0.8"]', 'B', '7 ÷ 8 = 0.875', 'intermediate', 3),
(2, 'Simplify: 2/3 + 1/6', 'multiple_choice', '["3/9", "5/6", "1/2", "4/6"]', 'B', 'Common denominator: 4/6 + 1/6 = 5/6', 'intermediate', 3),

-- Percentages and Ratios Quiz  
(3, 'What is 25% of 200?', 'multiple_choice', '["25", "50", "75", "100"]', 'B', '25% = 1/4, so 200 ÷ 4 = 50', 'beginner', 2),
(3, 'Express the ratio 6:9 in its simplest form', 'multiple_choice', '["1:2", "2:3", "3:4", "6:9"]', 'B', 'Divide both by 3: 6÷3 : 9÷3 = 2:3', 'beginner', 2),
(3, 'A shirt costs £40. In a sale, it is reduced by 30%. What is the sale price?', 'multiple_choice', '["£12", "£28", "£30", "£37"]', 'B', '30% of £40 = £12, so sale price = £40 - £12 = £28', 'intermediate', 3),
(3, 'Divide £120 in the ratio 2:3', 'multiple_choice', '["£40:£80", "£48:£72", "£50:£70", "£60:£60"]', 'B', '2+3=5 parts. £120÷5=£24 per part. So 2×£24:3×£24 = £48:£72', 'intermediate', 3),
(3, 'Increase 80 by 15%', 'multiple_choice', '["88", "92", "95", "100"]', 'B', '15% of 80 = 12, so 80 + 12 = 92', 'intermediate', 3);
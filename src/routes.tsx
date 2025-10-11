// Separate routes file to avoid template string issues

export const MATHEMATICS_TOPICS = [
  // NUMBER TOPICS (1-5)
  { id: 1, title: 'Number Operations', description: 'Basic arithmetic operations, order of operations, and number properties', order_index: 1, difficulty_level: 'beginner', estimated_duration: 45, category: 'Number' },
  { id: 2, title: 'Fractions and Decimals', description: 'Working with fractions, decimals, and percentage conversions', order_index: 2, difficulty_level: 'beginner', estimated_duration: 50, category: 'Number' },
  { id: 3, title: 'Percentages and Ratios', description: 'Percentage calculations, ratios, proportions, and scale factors', order_index: 3, difficulty_level: 'intermediate', estimated_duration: 55, category: 'Number' },
  { id: 4, title: 'Powers and Roots', description: 'Indices, square roots, cube roots, and standard form notation', order_index: 4, difficulty_level: 'intermediate', estimated_duration: 40, category: 'Number' },
  { id: 5, title: 'Number Systems', description: 'Integers, rational numbers, irrational numbers, and prime factorization', order_index: 5, difficulty_level: 'intermediate', estimated_duration: 45, category: 'Number' },

  // ALGEBRA TOPICS (6-10)
  { id: 6, title: 'Algebraic Expressions', description: 'Variables, terms, coefficients, and simplifying expressions', order_index: 6, difficulty_level: 'beginner', estimated_duration: 50, category: 'Algebra' },
  { id: 7, title: 'Linear Equations', description: 'Solving linear equations and inequalities in one variable', order_index: 7, difficulty_level: 'intermediate', estimated_duration: 55, category: 'Algebra' },
  { id: 8, title: 'Simultaneous Equations', description: 'Solving pairs of linear equations using various methods', order_index: 8, difficulty_level: 'intermediate', estimated_duration: 60, category: 'Algebra' },
  { id: 9, title: 'Quadratic Equations', description: 'Factoring, completing the square, and quadratic formula', order_index: 9, difficulty_level: 'advanced', estimated_duration: 65, category: 'Algebra' },
  { id: 10, title: 'Functions and Graphs', description: 'Linear and quadratic functions, graphing, and transformations', order_index: 10, difficulty_level: 'advanced', estimated_duration: 70, category: 'Algebra' },

  // GEOMETRY TOPICS (11-15)
  { id: 11, title: 'Basic Geometry', description: 'Points, lines, angles, and basic geometric properties', order_index: 11, difficulty_level: 'beginner', estimated_duration: 40, category: 'Geometry' },
  { id: 12, title: 'Triangles and Polygons', description: 'Triangle properties, congruence, similarity, and polygon properties', order_index: 12, difficulty_level: 'intermediate', estimated_duration: 55, category: 'Geometry' },
  { id: 13, title: 'Circle Geometry', description: 'Circle properties, circumference, area, and circle theorems', order_index: 13, difficulty_level: 'intermediate', estimated_duration: 50, category: 'Geometry' },
  { id: 14, title: 'Pythagoras and Trigonometry', description: 'Pythagorean theorem and basic trigonometric ratios', order_index: 14, difficulty_level: 'advanced', estimated_duration: 60, category: 'Geometry' },
  { id: 15, title: 'Coordinate Geometry', description: 'Plotting points, distance formula, and equation of straight lines', order_index: 15, difficulty_level: 'advanced', estimated_duration: 55, category: 'Geometry' },

  // STATISTICS AND PROBABILITY TOPICS (16-21)
  { id: 16, title: 'Data Collection and Display', description: 'Types of data, surveys, and data presentation methods', order_index: 16, difficulty_level: 'beginner', estimated_duration: 45, category: 'Statistics' },
  { id: 17, title: 'Statistical Measures', description: 'Mean, median, mode, range, and measures of spread', order_index: 17, difficulty_level: 'intermediate', estimated_duration: 50, category: 'Statistics' },
  { id: 18, title: 'Graphs and Charts', description: 'Bar charts, histograms, pie charts, and scatter diagrams', order_index: 18, difficulty_level: 'intermediate', estimated_duration: 55, category: 'Statistics' },
  { id: 19, title: 'Probability Basics', description: 'Basic probability concepts, events, and probability rules', order_index: 19, difficulty_level: 'intermediate', estimated_duration: 45, category: 'Probability' },
  { id: 20, title: 'Probability Trees', description: 'Tree diagrams and conditional probability', order_index: 20, difficulty_level: 'advanced', estimated_duration: 50, category: 'Probability' },
  { id: 21, title: 'Advanced Statistics', description: 'Correlation, regression, and statistical inference', order_index: 21, difficulty_level: 'advanced', estimated_duration: 60, category: 'Statistics' }
];

export const LESSON_CONTENT = {
  1: `<div class="space-y-6">
    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">🔢 What Are Number Operations?</h3>
        <p class="text-gray-700 mb-4">Number operations are the basic mathematical processes we use to work with numbers. These include addition, subtraction, multiplication, and division.</p>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-green-600">Addition (+)</h4>
                <p class="text-sm">Combining numbers: 5 + 3 = 8</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600">Subtraction (-)</h4>
                <p class="text-sm">Taking away: 8 - 3 = 5</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600">Multiplication (×)</h4>
                <p class="text-sm">Repeated addition: 4 × 3 = 12</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-red-600">Division (÷)</h4>
                <p class="text-sm">Splitting equally: 12 ÷ 3 = 4</p>
            </div>
        </div>
    </div>

    <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-yellow-800 mb-3">📐 Order of Operations (BIDMAS)</h3>
        <p class="text-gray-700 mb-4">When we have multiple operations in one problem, we follow the BIDMAS rule:</p>
        
        <ol class="list-decimal list-inside space-y-2 mb-4">
            <li><strong>B</strong>rackets first</li>
            <li><strong>I</strong>ndices (powers)</li>
            <li><strong>D</strong>ivision and <strong>M</strong>ultiplication (left to right)</li>
            <li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
        </ol>
        
        <div class="bg-white p-4 rounded border">
            <p class="font-bold">Example: 2 + 3 × 4</p>
            <p class="text-sm text-gray-600">Step 1: 3 × 4 = 12 (multiplication first)</p>
            <p class="text-sm text-gray-600">Step 2: 2 + 12 = 14</p>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Test Your Understanding</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Calculate: 15 + 7 × 2</p>
                <div class="space-y-2">
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="a" class="mr-2">
                        <span>a) 44</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="b" class="mr-2">
                        <span>b) 29</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="c" class="mr-2">
                        <span>c) 22</span>
                    </label>
                </div>
                <button onclick="checkAnswer(1, 'b', 'First multiply: 7 × 2 = 14, then add: 15 + 14 = 29')" 
                        class="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  2: `<div class="space-y-6">
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
                <button onclick="checkDecimalAnswer(1, ['0.2', '0.20'], '1 ÷ 5 = 0.2')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  3: `<div class="space-y-6">
    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">⚖️ What Are Ratios?</h3>
        <p class="text-gray-700 mb-4">A ratio compares quantities and shows how much of one thing there is compared to another.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-orange-600 mb-2">Example: Red to Blue Balls</h4>
                <div class="flex items-center space-x-2 mb-2">
                    <div class="flex space-x-1">
                        <div class="w-6 h-6 bg-red-400 rounded-full"></div>
                        <div class="w-6 h-6 bg-red-400 rounded-full"></div>
                    </div>
                    <span>:</span>
                    <div class="flex space-x-1">
                        <div class="w-6 h-6 bg-blue-400 rounded-full"></div>
                        <div class="w-6 h-6 bg-blue-400 rounded-full"></div>
                        <div class="w-6 h-6 bg-blue-400 rounded-full"></div>
                    </div>
                </div>
                <p class="text-sm">Ratio = 2:3 (2 red for every 3 blue)</p>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-orange-600 mb-2">Simplifying Ratios</h4>
                <p class="text-sm mb-1">8:12 = 2:3 (÷ 4)</p>
                <p class="text-sm mb-1">15:25 = 3:5 (÷ 5)</p>
                <p class="text-sm">Always divide by the highest common factor</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">📈 Proportion and Scale</h3>
        <p class="text-gray-700 mb-4">Proportion tells us that two ratios are equal. Scale helps us make things bigger or smaller while keeping the same proportions.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2">Direct Proportion Example:</h4>
            <p class="text-sm">If 3 apples cost £2, how much do 6 apples cost?</p>
            <p class="text-sm text-green-600 font-medium">3 apples : £2 = 6 apples : £4</p>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">🎯 Test Your Knowledge</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Simplify the ratio 12:18</p>
                <div class="space-y-2">
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="a" class="mr-2">
                        <span>a) 2:3</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="b" class="mr-2">
                        <span>b) 3:4</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q1" value="c" class="mr-2">
                        <span>c) 4:6</span>
                    </label>
                </div>
                <button onclick="checkAnswer(1, 'a', 'Find the highest common factor of 12 and 18, which is 6. 12÷6 = 2, 18÷6 = 3, so 12:18 = 2:3')" 
                        class="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  4: `<div class="space-y-6">
    <div class="bg-indigo-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-indigo-800 mb-3">🔢 Powers and Indices</h3>
        <p class="text-gray-700 mb-4">A power (or index) tells us how many times to multiply a number by itself.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-indigo-600 mb-2">Understanding Powers</h4>
                <div class="space-y-2 text-sm">
                    <p><span class="font-bold">2³</span> = 2 × 2 × 2 = 8</p>
                    <p><span class="font-bold">5²</span> = 5 × 5 = 25</p>
                    <p><span class="font-bold">4¹</span> = 4</p>
                    <p><span class="font-bold">3⁰</span> = 1 (any number⁰ = 1)</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-indigo-600 mb-2">Laws of Indices</h4>
                <div class="space-y-2 text-sm">
                    <p><span class="font-bold">aᵐ × aⁿ</span> = aᵐ⁺ⁿ</p>
                    <p><span class="font-bold">aᵐ ÷ aⁿ</span> = aᵐ⁻ⁿ</p>
                    <p><span class="font-bold">(aᵐ)ⁿ</span> = aᵐˣⁿ</p>
                    <p><span class="font-bold">a⁻ⁿ</span> = 1/aⁿ</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">√ Square and Cube Roots</h3>
        <p class="text-gray-700 mb-4">Roots are the opposite of powers. They ask "what number, when raised to this power, gives us this result?"</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-purple-600 mb-2">Square Root</h4>
                <p class="text-2xl">√16 = 4</p>
                <p class="text-sm">Because 4² = 16</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-purple-600 mb-2">Cube Root</h4>
                <p class="text-2xl">∛27 = 3</p>
                <p class="text-sm">Because 3³ = 27</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-purple-600 mb-2">Perfect Squares</h4>
                <p class="text-sm">1, 4, 9, 16, 25, 36, 49, 64, 81, 100...</p>
            </div>
        </div>
    </div>

    <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-yellow-800 mb-3">🔬 Standard Form</h3>
        <p class="text-gray-700 mb-4">Standard form (scientific notation) is a way to write very large or very small numbers more easily.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2">Format: a × 10ⁿ</h4>
            <p class="text-sm mb-2">Where: 1 ≤ a < 10 and n is an integer</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="font-medium">Large Numbers:</p>
                    <p class="text-sm">45,000 = 4.5 × 10⁴</p>
                    <p class="text-sm">7,200,000 = 7.2 × 10⁶</p>
                </div>
                <div>
                    <p class="font-medium">Small Numbers:</p>
                    <p class="text-sm">0.0034 = 3.4 × 10⁻³</p>
                    <p class="text-sm">0.000056 = 5.6 × 10⁻⁵</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Calculate: 2⁴</p>
                <input type="number" id="q1_answer" placeholder="Enter your answer" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(1, 16, '2⁴ = 2 × 2 × 2 × 2 = 16')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Express 340,000 in standard form</p>
                <input type="text" id="q2_answer" placeholder="e.g. 3.4 x 10^5" 
                       class="border border-gray-300 rounded px-3 py-2 w-40">
                <button onclick="checkStandardForm(2, ['3.4 × 10^5', '3.4 x 10^5', '3.4*10^5'], 'Move decimal point 5 places left: 340,000 = 3.4 × 10⁵')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`
};

export function getLessonContent(topicId: number): string {
  return LESSON_CONTENT[topicId] || '<div class="bg-blue-50 p-6 rounded-lg"><h3 class="text-xl font-bold text-blue-800 mb-3">📚 Lesson Coming Soon!</h3><p class="text-gray-700">We are preparing comprehensive interactive content for this topic. Check back soon!</p></div>';
}
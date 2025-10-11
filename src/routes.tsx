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
</div>`,

  5: `<div class="space-y-6">
    <div class="bg-teal-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-teal-800 mb-3">🔢 What Are Number Sequences?</h3>
        <p class="text-gray-700 mb-4">A sequence is a set of numbers that follow a specific pattern or rule. Each number in the sequence is called a term.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-teal-600 mb-2">Example: 2, 5, 8, 11, 14, ...</h4>
            <p class="text-sm text-gray-600">This sequence increases by 3 each time (+3 pattern)</p>
            <div class="mt-2 text-xs text-teal-600">
                <span class="mr-4">Term 1: 2</span>
                <span class="mr-4">Term 2: 5</span>
                <span class="mr-4">Term 3: 8</span>
                <span class="mr-4">Term 4: 11</span>
                <span>Term 5: 14</span>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📈 Types of Sequences</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Arithmetic Sequences</h4>
                <p class="text-sm text-gray-700 mb-2">Same number added each time (common difference)</p>
                <div class="space-y-1 text-xs">
                    <p><strong>3, 7, 11, 15, 19...</strong> (+4)</p>
                    <p><strong>20, 17, 14, 11, 8...</strong> (-3)</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Geometric Sequences</h4>
                <p class="text-sm text-gray-700 mb-2">Same number multiplied each time (common ratio)</p>
                <div class="space-y-1 text-xs">
                    <p><strong>2, 6, 18, 54, 162...</strong> (×3)</p>
                    <p><strong>80, 40, 20, 10, 5...</strong> (×0.5)</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📊 Finding the nth Term</h3>
        <p class="text-gray-700 mb-4">The nth term formula lets us find any term in the sequence without listing all previous terms.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2">Arithmetic Sequence Formula</h4>
            <p class="text-lg font-mono text-center bg-gray-100 p-2 rounded mb-2">nth term = a + (n-1)d</p>
            <div class="text-sm text-gray-600">
                <p><strong>a</strong> = first term</p>
                <p><strong>d</strong> = common difference</p>
                <p><strong>n</strong> = position of term</p>
            </div>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Example: Find the 10th term of 5, 9, 13, 17...</h4>
            <div class="space-y-1 text-sm text-gray-700">
                <p>First term (a) = 5</p>
                <p>Common difference (d) = +4</p>
                <p>10th term = 5 + (10-1) × 4 = 5 + 36 = 41</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. What is the next term in the sequence: 3, 7, 11, 15, ?</p>
                <input type="number" id="q1_answer" placeholder="Enter your answer" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(1, 19, 'The common difference is +4, so 15 + 4 = 19')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Find the 8th term of the sequence: 2, 5, 8, 11...</p>
                <p class="text-sm text-gray-600 mb-2">Hint: Use nth term = a + (n-1)d</p>
                <input type="number" id="q2_answer" placeholder="Enter your answer" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(2, 23, 'a = 2, d = 3, so 8th term = 2 + (8-1) × 3 = 2 + 21 = 23')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">3. What type of sequence is: 1, 3, 9, 27, 81...?</p>
                <div class="space-y-2 mb-3">
                    <label class="flex items-center">
                        <input type="radio" name="q3" value="a" class="mr-2">
                        <span>a) Arithmetic (same difference)</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q3" value="b" class="mr-2">
                        <span>b) Geometric (same ratio)</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q3" value="c" class="mr-2">
                        <span>c) Neither</span>
                    </label>
                </div>
                <button onclick="checkAnswer(3, 'b', 'Each term is multiplied by 3: 1×3=3, 3×3=9, 9×3=27, so it is geometric')" 
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  6: `<div class="space-y-6">
    <div class="bg-emerald-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-emerald-800 mb-3">🔤 What Are Algebraic Expressions?</h3>
        <p class="text-gray-700 mb-4">Algebraic expressions use letters (variables) to represent unknown numbers. They're like mathematical sentences that describe relationships.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-emerald-600 mb-2">Key Terms</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Variable:</strong> Letter representing unknown (x, y, a)</p>
                    <p><strong>Coefficient:</strong> Number in front of variable (3x → 3)</p>
                    <p><strong>Constant:</strong> Number without variable (5, -7)</p>
                    <p><strong>Term:</strong> Part separated by + or - (3x, 2y, 5)</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-emerald-600 mb-2">Example Expression</h4>
                <p class="text-center text-lg font-mono bg-gray-100 p-2 rounded mb-2">3x + 2y - 5</p>
                <div class="text-xs space-y-1">
                    <p><span class="font-bold">3x:</span> coefficient 3, variable x</p>
                    <p><span class="font-bold">2y:</span> coefficient 2, variable y</p>
                    <p><span class="font-bold">-5:</span> constant term</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">🔄 Collecting Like Terms</h3>
        <p class="text-gray-700 mb-4">Like terms have exactly the same variables with the same powers. We can add or subtract like terms.</p>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold mb-2">Like Terms Examples</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="font-medium text-green-600">✓ Like Terms:</p>
                        <p>3x and 5x</p>
                        <p>2y² and -4y²</p>
                        <p>7 and -3 (constants)</p>
                    </div>
                    <div>
                        <p class="font-medium text-red-600">✗ Unlike Terms:</p>
                        <p>3x and 2y</p>
                        <p>x² and x</p>
                        <p>5xy and 3x</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold mb-2">Step-by-Step: Simplify 3x + 2y + 5x - y + 4</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Step 1:</strong> Group like terms</p>
                    <p class="ml-4 text-gray-600">(3x + 5x) + (2y - y) + 4</p>
                    <p><strong>Step 2:</strong> Combine coefficients</p>
                    <p class="ml-4 text-gray-600">8x + y + 4</p>
                    <p class="font-bold text-green-600">Answer: 8x + y + 4</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📏 Expanding Brackets</h3>
        <p class="text-gray-700 mb-4">When we expand brackets, we multiply everything inside the bracket by what's outside.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Single Brackets</h4>
                <div class="space-y-2 text-sm">
                    <p class="font-mono">3(x + 4) = 3x + 12</p>
                    <p class="font-mono">-2(3y - 5) = -6y + 10</p>
                    <p class="font-mono">x(2x + 3) = 2x² + 3x</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Factorizing (Reverse)</h4>
                <div class="space-y-2 text-sm">
                    <p class="font-mono">6x + 9 = 3(2x + 3)</p>
                    <p class="font-mono">x² + 5x = x(x + 5)</p>
                    <p class="font-mono">4y² - 8y = 4y(y - 2)</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">🔢 Substitution</h3>
        <p class="text-gray-700 mb-4">Substitution means replacing variables with specific numbers to find the value of an expression.</p>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Example: Find 3x + 2y when x = 4 and y = -1</h4>
            <div class="space-y-2 text-sm">
                <p><strong>Step 1:</strong> Substitute the values</p>
                <p class="ml-4">3(4) + 2(-1)</p>
                <p><strong>Step 2:</strong> Calculate</p>
                <p class="ml-4">12 + (-2) = 10</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Simplify: 5x + 3 + 2x - 1</p>
                <input type="text" id="q1_answer" placeholder="Enter simplified form" 
                       class="border border-gray-300 rounded px-3 py-2 w-40">
                <button onclick="checkAlgebraAnswer(1, ['7x + 2', '7x+2', '2 + 7x', '2+7x'], 'Collect like terms: (5x + 2x) + (3 - 1) = 7x + 2')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Expand: 3(x + 4)</p>
                <input type="text" id="q2_answer" placeholder="Enter expanded form" 
                       class="border border-gray-300 rounded px-3 py-2 w-40">
                <button onclick="checkAlgebraAnswer(2, ['3x + 12', '3x+12', '12 + 3x', '12+3x'], 'Multiply everything inside: 3 × x + 3 × 4 = 3x + 12')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">3. Find the value of 2x - y when x = 5 and y = 3</p>
                <input type="number" id="q3_answer" placeholder="Enter the value" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(3, 7, 'Substitute: 2(5) - 3 = 10 - 3 = 7')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  7: `<div class="space-y-6">
    <div class="bg-cyan-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-cyan-800 mb-3">⚖️ What Are Linear Equations?</h3>
        <p class="text-gray-700 mb-4">A linear equation is like a mathematical balance scale. Both sides must be equal, and we can solve for the unknown variable.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-cyan-600 mb-2">General Form</h4>
            <p class="text-center text-lg font-mono bg-gray-100 p-2 rounded">ax + b = c</p>
            <p class="text-sm text-gray-600 mt-2">Where a, b, and c are numbers, and x is the variable we need to find</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-mono text-lg">x + 3 = 7</p>
                <p class="text-xs text-gray-600">Simple equation</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-mono text-lg">2x - 5 = 9</p>
                <p class="text-xs text-gray-600">With coefficient</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-mono text-lg">3x + 4 = 2x + 7</p>
                <p class="text-xs text-gray-600">Variables on both sides</p>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">🔍 Solving Linear Equations</h3>
        <p class="text-gray-700 mb-4">The key rule: whatever you do to one side, you must do to the other side to keep it balanced!</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-3">Method: Solve x + 5 = 12</h4>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between items-center">
                    <span>x + 5 = 12</span>
                    <span class="text-gray-500">(original equation)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>x + 5 - 5 = 12 - 5</span>
                    <span class="text-gray-500">(subtract 5 from both sides)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-green-600">x = 7</span>
                    <span class="text-gray-500">(solution)</span>
                </div>
            </div>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-3">Method: Solve 3x - 4 = 14</h4>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between items-center">
                    <span>3x - 4 = 14</span>
                    <span class="text-gray-500">(original equation)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>3x - 4 + 4 = 14 + 4</span>
                    <span class="text-gray-500">(add 4 to both sides)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>3x = 18</span>
                    <span class="text-gray-500">(simplify)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>x = 6</span>
                    <span class="text-gray-500">(divide both sides by 3)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">🔄 Variables on Both Sides</h3>
        <p class="text-gray-700 mb-4">When variables appear on both sides, collect them on one side first.</p>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-3">Example: Solve 5x + 3 = 2x + 12</h4>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between items-center">
                    <span>5x + 3 = 2x + 12</span>
                    <span class="text-gray-500">(original)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>5x - 2x + 3 = 2x - 2x + 12</span>
                    <span class="text-gray-500">(subtract 2x from both sides)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>3x + 3 = 12</span>
                    <span class="text-gray-500">(simplify)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>3x = 9</span>
                    <span class="text-gray-500">(subtract 3 from both sides)</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-green-600">x = 3</span>
                    <span class="text-gray-500">(divide by 3)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-yellow-800 mb-3">✅ Checking Your Answer</h3>
        <p class="text-gray-700 mb-4">Always substitute your answer back into the original equation to check!</p>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Check: If x = 3 in 5x + 3 = 2x + 12</h4>
            <div class="text-sm space-y-1">
                <p><strong>Left side:</strong> 5(3) + 3 = 15 + 3 = 18</p>
                <p><strong>Right side:</strong> 2(3) + 12 = 6 + 12 = 18</p>
                <p class="font-bold text-green-600">✓ Both sides equal 18, so x = 3 is correct!</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Solve: x + 8 = 15</p>
                <input type="number" id="q1_answer" placeholder="x = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(1, 7, 'Subtract 8 from both sides: x = 15 - 8 = 7')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Solve: 2x - 3 = 11</p>
                <input type="number" id="q2_answer" placeholder="x = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(2, 7, 'Add 3: 2x = 14, then divide by 2: x = 7')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">3. Solve: 4x + 1 = 2x + 9</p>
                <input type="number" id="q3_answer" placeholder="x = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(3, 4, 'Subtract 2x: 2x + 1 = 9, subtract 1: 2x = 8, divide by 2: x = 4')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  8: `<div class="space-y-6">
    <div class="bg-rose-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-rose-800 mb-3">🔄 Simultaneous Equations</h3>
        <p class="text-gray-700 mb-4">Simultaneous equations are two equations with two unknowns that must be solved together to find unique values for both variables.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-rose-600 mb-2">Example System</h4>
            <div class="text-center space-y-1">
                <p class="font-mono text-lg">2x + y = 7</p>
                <p class="font-mono text-lg">x - y = 2</p>
            </div>
            <p class="text-sm text-gray-600 mt-2 text-center">Find values of x and y that satisfy both equations</p>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">➕ Elimination Method</h3>
        <p class="text-gray-700 mb-4">Add or subtract equations to eliminate one variable, then solve for the other.</p>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-3">Example: Solve 2x + y = 7 and x - y = 2</h4>
            <div class="space-y-2 text-sm">
                <p><strong>Step 1:</strong> Add the equations (to eliminate y)</p>
                <p class="ml-4 font-mono">(2x + y) + (x - y) = 7 + 2</p>
                <p class="ml-4 font-mono">3x = 9</p>
                <p class="ml-4 font-mono">x = 3</p>
                <p><strong>Step 2:</strong> Substitute x = 3 into first equation</p>
                <p class="ml-4 font-mono">2(3) + y = 7</p>
                <p class="ml-4 font-mono">6 + y = 7</p>
                <p class="ml-4 font-mono">y = 1</p>
                <p class="font-bold text-green-600">Solution: x = 3, y = 1</p>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">🔀 Substitution Method</h3>
        <p class="text-gray-700 mb-4">Solve one equation for one variable, then substitute into the other equation.</p>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-3">Example: Solve x + 2y = 8 and 3x - y = 5</h4>
            <div class="space-y-2 text-sm">
                <p><strong>Step 1:</strong> From first equation: x = 8 - 2y</p>
                <p><strong>Step 2:</strong> Substitute into second equation</p>
                <p class="ml-4 font-mono">3(8 - 2y) - y = 5</p>
                <p class="ml-4 font-mono">24 - 6y - y = 5</p>
                <p class="ml-4 font-mono">24 - 7y = 5</p>
                <p class="ml-4 font-mono">-7y = -19</p>
                <p class="ml-4 font-mono">y = 19/7</p>
                <p><strong>Step 3:</strong> Find x: x = 8 - 2(19/7) = 18/7</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Solve using elimination: x + y = 5 and x - y = 1</p>
                <div class="flex space-x-4 mb-3">
                    <input type="number" id="q1x_answer" placeholder="x = ?" 
                           class="border border-gray-300 rounded px-3 py-2 w-20">
                    <input type="number" id="q1y_answer" placeholder="y = ?" 
                           class="border border-gray-300 rounded px-3 py-2 w-20">
                </div>
                <button onclick="checkSimultaneousAnswer(1, 3, 2, 'Add equations: 2x = 6, so x = 3. Substitute: 3 + y = 5, so y = 2')" 
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  9: `<div class="space-y-6">
    <div class="bg-amber-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-amber-800 mb-3">📐 Quadratic Equations</h3>
        <p class="text-gray-700 mb-4">Quadratic equations have x² as the highest power. They often have two solutions and their graphs are parabolas.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-amber-600 mb-2">Standard Form</h4>
            <p class="text-center text-lg font-mono bg-gray-100 p-2 rounded">ax² + bx + c = 0</p>
            <p class="text-sm text-gray-600 mt-2 text-center">Where a ≠ 0, and a, b, c are constants</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-mono">x² - 4 = 0</p>
                <p class="text-xs text-gray-600">Simple quadratic</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-mono">x² + 5x + 6 = 0</p>
                <p class="text-xs text-gray-600">Factorable quadratic</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-mono">2x² - 3x - 1 = 0</p>
                <p class="text-xs text-gray-600">Use quadratic formula</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">✂️ Factoring Method</h3>
        <p class="text-gray-700 mb-4">When possible, factor the quadratic into two brackets and solve each factor = 0.</p>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-3">Example: Solve x² + 5x + 6 = 0</h4>
            <div class="space-y-2 text-sm">
                <p><strong>Step 1:</strong> Find two numbers that multiply to 6 and add to 5</p>
                <p class="ml-4">Numbers: 2 and 3 (2 × 3 = 6, 2 + 3 = 5)</p>
                <p><strong>Step 2:</strong> Write as factors</p>
                <p class="ml-4 font-mono">(x + 2)(x + 3) = 0</p>
                <p><strong>Step 3:</strong> Solve each factor</p>
                <p class="ml-4">x + 2 = 0 → x = -2</p>
                <p class="ml-4">x + 3 = 0 → x = -3</p>
                <p class="font-bold text-green-600">Solutions: x = -2 or x = -3</p>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">🧮 Quadratic Formula</h3>
        <p class="text-gray-700 mb-4">When factoring is difficult, use the quadratic formula to find solutions.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2 text-center">Quadratic Formula</h4>
            <p class="text-center text-lg font-mono bg-gray-100 p-3 rounded">x = (-b ± √(b² - 4ac)) / 2a</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Example: Solve x² - 3x - 4 = 0</h4>
            <div class="text-sm space-y-1">
                <p>a = 1, b = -3, c = -4</p>
                <p>x = (3 ± √(9 + 16)) / 2 = (3 ± √25) / 2 = (3 ± 5) / 2</p>
                <p>x = (3 + 5)/2 = 4 or x = (3 - 5)/2 = -1</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Solve by factoring: x² - 5x + 6 = 0</p>
                <div class="flex space-x-4 mb-3">
                    <input type="number" id="q1a_answer" placeholder="First solution" 
                           class="border border-gray-300 rounded px-3 py-2 w-28">
                    <input type="number" id="q1b_answer" placeholder="Second solution" 
                           class="border border-gray-300 rounded px-3 py-2 w-28">
                </div>
                <button onclick="checkQuadraticAnswer(1, [2, 3], 'Factor: (x-2)(x-3) = 0, so x = 2 or x = 3')" 
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  10: `<div class="space-y-6">
    <div class="bg-violet-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-violet-800 mb-3">📊 Functions and Graphs</h3>
        <p class="text-gray-700 mb-4">A function is a special relationship where each input (x) has exactly one output (y). We use function notation like f(x) to represent this.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-violet-600 mb-2">Function Notation</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>f(x) = 2x + 3</strong></p>
                    <p>f(1) = 2(1) + 3 = 5</p>
                    <p>f(0) = 2(0) + 3 = 3</p>
                    <p>f(-2) = 2(-2) + 3 = -1</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-violet-600 mb-2">Key Terms</h4>
                <div class="space-y-1 text-sm">
                    <p><strong>Domain:</strong> All possible x-values</p>
                    <p><strong>Range:</strong> All possible y-values</p>
                    <p><strong>Intercepts:</strong> Where graph crosses axes</p>
                    <p><strong>Gradient:</strong> Slope of the line</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📈 Linear Functions</h3>
        <p class="text-gray-700 mb-4">Linear functions create straight line graphs with constant gradient.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2">Linear Function Forms</h4>
            <div class="space-y-2 text-sm">
                <p><strong>Slope-intercept form:</strong> y = mx + c</p>
                <p class="ml-4">m = gradient, c = y-intercept</p>
                <p><strong>Example:</strong> y = 3x - 2</p>
                <p class="ml-4">Gradient = 3, y-intercept = -2</p>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Positive Gradient</h4>
                <p class="text-sm">y = 2x + 1</p>
                <p class="text-xs text-gray-600">Line slopes upward ↗</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Negative Gradient</h4>
                <p class="text-sm">y = -x + 3</p>
                <p class="text-xs text-gray-600">Line slopes downward ↘</p>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📉 Quadratic Functions</h3>
        <p class="text-gray-700 mb-4">Quadratic functions create parabola (curved) graphs.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2">Quadratic Function Form</h4>
            <p class="text-center font-mono text-lg bg-gray-100 p-2 rounded">f(x) = ax² + bx + c</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">a > 0 (Positive)</h4>
                <p class="text-sm">f(x) = x² + 2x - 3</p>
                <p class="text-xs text-gray-600">Parabola opens upward ∪</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">a < 0 (Negative)</h4>
                <p class="text-sm">f(x) = -x² + 4x + 1</p>
                <p class="text-xs text-gray-600">Parabola opens downward ∩</p>
            </div>
        </div>
    </div>

    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">🔄 Graph Transformations</h3>
        <p class="text-gray-700 mb-4">Functions can be transformed by shifting, stretching, or reflecting.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-orange-600 mb-2">Vertical Shifts</h4>
                <div class="text-sm space-y-1">
                    <p>f(x) + k → shift up by k units</p>
                    <p>f(x) - k → shift down by k units</p>
                </div>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-orange-600 mb-2">Horizontal Shifts</h4>
                <div class="text-sm space-y-1">
                    <p>f(x + k) → shift left by k units</p>
                    <p>f(x - k) → shift right by k units</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. If f(x) = 3x - 2, find f(4)</p>
                <input type="number" id="q1_answer" placeholder="f(4) = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(1, 10, 'Substitute x = 4: f(4) = 3(4) - 2 = 12 - 2 = 10')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. What is the gradient of the line y = -2x + 5?</p>
                <input type="number" id="q2_answer" placeholder="Gradient = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(2, -2, 'In y = mx + c form, the coefficient of x is the gradient: -2')" 
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
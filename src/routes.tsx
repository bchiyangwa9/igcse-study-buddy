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
</div>`,

  11: `<div class="space-y-6">
    <div class="bg-sky-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-sky-800 mb-3">📐 Basic Geometry</h3>
        <p class="text-gray-700 mb-4">Geometry is the study of shapes, angles, and their relationships. Understanding basic concepts helps us solve more complex problems.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-sky-600 mb-2">Point</h4>
                <div class="text-2xl mb-2">•</div>
                <p class="text-sm text-gray-600">Exact location, no size</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-sky-600 mb-2">Line</h4>
                <div class="text-2xl mb-2">———</div>
                <p class="text-sm text-gray-600">Extends infinitely both ways</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-sky-600 mb-2">Angle</h4>
                <div class="text-2xl mb-2">∠</div>
                <p class="text-sm text-gray-600">Space between two lines</p>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📏 Types of Angles</h3>
        <p class="text-gray-700 mb-4">Angles are measured in degrees (°). Different types have special properties and names.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="space-y-3">
                <div class="bg-white p-3 rounded border">
                    <h4 class="font-bold text-blue-600">Acute Angle</h4>
                    <p class="text-sm">Less than 90°</p>
                    <p class="text-xs text-gray-600">Example: 45°, 30°, 60°</p>
                </div>
                <div class="bg-white p-3 rounded border">
                    <h4 class="font-bold text-blue-600">Right Angle</h4>
                    <p class="text-sm">Exactly 90° (square corner)</p>
                    <p class="text-xs text-gray-600">Shown with small square □</p>
                </div>
            </div>
            <div class="space-y-3">
                <div class="bg-white p-3 rounded border">
                    <h4 class="font-bold text-blue-600">Obtuse Angle</h4>
                    <p class="text-sm">Between 90° and 180°</p>
                    <p class="text-xs text-gray-600">Example: 120°, 150°</p>
                </div>
                <div class="bg-white p-3 rounded border">
                    <h4 class="font-bold text-blue-600">Straight Angle</h4>
                    <p class="text-sm">Exactly 180° (straight line)</p>
                    <p class="text-xs text-gray-600">Forms a straight line</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">⚖️ Angle Relationships</h3>
        <p class="text-gray-700 mb-4">When lines intersect or are parallel, angles have special relationships that help us calculate unknown angles.</p>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-green-600 mb-2">Angles on a Straight Line</h4>
                <p class="text-sm mb-2">Angles on a straight line add up to 180°</p>
                <p class="text-xs text-gray-600 font-mono">a + b = 180°</p>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-green-600 mb-2">Angles Around a Point</h4>
                <p class="text-sm mb-2">Angles around a point add up to 360°</p>
                <p class="text-xs text-gray-600 font-mono">a + b + c + d = 360°</p>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-green-600 mb-2">Vertically Opposite Angles</h4>
                <p class="text-sm mb-2">When two lines cross, opposite angles are equal</p>
                <p class="text-xs text-gray-600 font-mono">a = c and b = d</p>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📊 Polygons</h3>
        <p class="text-gray-700 mb-4">A polygon is a closed shape made of straight sides. The number of sides determines the name and properties.</p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div class="bg-white p-3 rounded border text-center">
                <h4 class="font-bold text-purple-600">Triangle</h4>
                <p class="text-sm">3 sides</p>
                <p class="text-xs text-gray-600">Sum of angles: 180°</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <h4 class="font-bold text-purple-600">Quadrilateral</h4>
                <p class="text-sm">4 sides</p>
                <p class="text-xs text-gray-600">Sum of angles: 360°</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <h4 class="font-bold text-purple-600">Pentagon</h4>
                <p class="text-sm">5 sides</p>
                <p class="text-xs text-gray-600">Sum of angles: 540°</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <h4 class="font-bold text-purple-600">Hexagon</h4>
                <p class="text-sm">6 sides</p>
                <p class="text-xs text-gray-600">Sum of angles: 720°</p>
            </div>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Formula for Interior Angles</h4>
            <p class="text-center font-mono bg-gray-100 p-2 rounded mb-2">Sum = (n - 2) × 180°</p>
            <p class="text-sm text-gray-600">Where n = number of sides</p>
        </div>
    </div>

    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Two angles on a straight line are 65° and x°. Find x.</p>
                <input type="number" id="q1_answer" placeholder="x = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(1, 115, 'Angles on straight line = 180°, so x = 180° - 65° = 115°')" 
                        class="ml-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Find the sum of interior angles in a heptagon (7 sides).</p>
                <input type="number" id="q2_answer" placeholder="Sum = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkNumberAnswer(2, 900, 'Use formula: (n-2) × 180° = (7-2) × 180° = 5 × 180° = 900°')" 
                        class="ml-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">3. What type of angle is 125°?</p>
                <div class="space-y-2 mb-3">
                    <label class="flex items-center">
                        <input type="radio" name="q3" value="a" class="mr-2">
                        <span>a) Acute</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q3" value="b" class="mr-2">
                        <span>b) Right</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q3" value="c" class="mr-2">
                        <span>c) Obtuse</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q3" value="d" class="mr-2">
                        <span>d) Straight</span>
                    </label>
                </div>
                <button onclick="checkAnswer(3, 'c', '125° is between 90° and 180°, so it is obtuse')" 
                        class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Check Answer</button>
                <div id="feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  12: `<div class="space-y-6">
    <div class="bg-emerald-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-emerald-800 mb-3">△ Triangles and Polygons</h3>
        <p class="text-gray-700 mb-4">Triangles are fundamental shapes in geometry. Understanding their properties helps solve many geometric problems.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-emerald-600 mb-2">Scalene</h4>
                <p class="text-sm">All sides different lengths</p>
                <p class="text-xs text-gray-600">All angles different</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-emerald-600 mb-2">Isosceles</h4>
                <p class="text-sm">Two equal sides</p>
                <p class="text-xs text-gray-600">Two equal angles</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-emerald-600 mb-2">Equilateral</h4>
                <p class="text-sm">All sides equal</p>
                <p class="text-xs text-gray-600">All angles = 60°</p>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📐 Triangle Properties</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Angle Sum Property</h4>
                <p class="text-sm mb-2">The sum of angles in any triangle is always 180°</p>
                <p class="text-center font-mono bg-gray-100 p-2 rounded">a + b + c = 180°</p>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Exterior Angle Property</h4>
                <p class="text-sm mb-2">An exterior angle equals the sum of the two non-adjacent interior angles</p>
                <p class="text-center font-mono bg-gray-100 p-2 rounded">Exterior angle = a + b</p>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">≅ Congruence and Similarity</h3>
        <p class="text-gray-700 mb-4">Congruent shapes are identical in size and shape. Similar shapes have the same shape but different sizes.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Congruent Triangles (≅)</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>SSS:</strong> Three sides equal</p>
                    <p><strong>SAS:</strong> Side-Angle-Side equal</p>
                    <p><strong>ASA:</strong> Angle-Side-Angle equal</p>
                    <p><strong>RHS:</strong> Right angle, Hypotenuse, Side equal</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Similar Triangles (~)</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>AA:</strong> Two angles equal</p>
                    <p><strong>SSS:</strong> All sides in same ratio</p>
                    <p><strong>SAS:</strong> Two sides in ratio, included angle equal</p>
                    <p class="font-medium">Corresponding sides are in proportion</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-yellow-800 mb-3">⬜ Quadrilaterals</h3>
        <p class="text-gray-700 mb-4">Four-sided polygons with special properties depending on their shape.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
                <div class="bg-white p-3 rounded border">
                    <h4 class="font-bold text-yellow-600">Rectangle</h4>
                    <p class="text-sm">4 right angles, opposite sides equal and parallel</p>
                </div>
                <div class="bg-white p-3 rounded border">
                    <h4 class="font-bold text-yellow-600">Square</h4>
                    <p class="text-sm">4 right angles, all sides equal</p>
                </div>
            </div>
            <div class="space-y-3">
                <div class="bg-white p-3 rounded border">
                    <h4 class="font-bold text-yellow-600">Parallelogram</h4>
                    <p class="text-sm">Opposite sides parallel and equal</p>
                </div>
                <div class="bg-white p-3 rounded border">
                    <h4 class="font-bold text-yellow-600">Rhombus</h4>
                    <p class="text-sm">All sides equal, opposite sides parallel</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. In a triangle, two angles are 65° and 45°. Find the third angle.</p>
                <input type="number" id="q1_answer" placeholder="Third angle = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkNumberAnswer(1, 70, 'Sum of angles = 180°, so third angle = 180° - 65° - 45° = 70°')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. What type of triangle has all sides equal?</p>
                <div class="space-y-2 mb-3">
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="a" class="mr-2">
                        <span>a) Scalene</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="b" class="mr-2">
                        <span>b) Isosceles</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="c" class="mr-2">
                        <span>c) Equilateral</span>
                    </label>
                </div>
                <button onclick="checkAnswer(2, 'c', 'An equilateral triangle has all three sides equal and all angles equal to 60°')" 
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  13: `<div class="space-y-6">
    <div class="bg-cyan-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-cyan-800 mb-3">⭕ Circle Geometry</h3>
        <p class="text-gray-700 mb-4">Circles have unique properties and measurements. Understanding these helps solve problems involving circular shapes.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-cyan-600 mb-2">Circle Parts</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Radius (r):</strong> Distance from center to edge</p>
                    <p><strong>Diameter (d):</strong> Distance across center (d = 2r)</p>
                    <p><strong>Circumference:</strong> Distance around the circle</p>
                    <p><strong>Chord:</strong> Line segment across circle</p>
                    <p><strong>Arc:</strong> Part of circumference</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-cyan-600 mb-2">Key Formulas</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Circumference:</strong> C = 2πr or C = πd</p>
                    <p><strong>Area:</strong> A = πr²</p>
                    <p><strong>π ≈ 3.14159</strong> or <strong>22/7</strong></p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📏 Circle Calculations</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold mb-3">Example: Circle with radius 5 cm</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Diameter:</strong> d = 2 × 5 = 10 cm</p>
                    <p><strong>Circumference:</strong> C = 2π × 5 = 10π ≈ 31.4 cm</p>
                    <p><strong>Area:</strong> A = π × 5² = 25π ≈ 78.5 cm²</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">🎯 Circle Theorems</h3>
        <p class="text-gray-700 mb-4">Important rules that help solve circle problems in advanced geometry.</p>
        
        <div class="space-y-3">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-1">Angles in Semicircle</h4>
                <p class="text-sm">Any angle in a semicircle is 90°</p>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-1">Angles at Center and Circumference</h4>
                <p class="text-sm">Angle at center = 2 × angle at circumference (same arc)</p>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-1">Tangent-Radius Rule</h4>
                <p class="text-sm">Tangent is perpendicular to radius at point of contact</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Find the circumference of a circle with radius 7 cm. (Use π ≈ 22/7)</p>
                <input type="number" id="q1_answer" placeholder="C = ? cm" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkNumberAnswer(1, 44, 'C = 2πr = 2 × (22/7) × 7 = 44 cm')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Find the area of a circle with radius 3 cm. (Use π ≈ 3.14)</p>
                <input type="number" step="0.01" id="q2_answer" placeholder="A = ? cm²" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkNumberAnswer(2, 28.26, 'A = πr² = 3.14 × 3² = 3.14 × 9 = 28.26 cm²')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  14: `<div class="space-y-6">
    <div class="bg-red-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-red-800 mb-3">📐 Pythagoras and Trigonometry</h3>
        <p class="text-gray-700 mb-4">Pythagoras' theorem and trigonometry help us solve problems involving right-angled triangles.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-red-600 mb-2">Pythagorean Theorem</h4>
            <p class="text-center text-lg font-mono bg-gray-100 p-3 rounded">a² + b² = c²</p>
            <p class="text-sm text-gray-600 mt-2 text-center">Where c is the hypotenuse (longest side)</p>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">🔺 Using Pythagoras</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold mb-3">Example: Find the hypotenuse when a = 3, b = 4</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Step 1:</strong> c² = a² + b²</p>
                    <p><strong>Step 2:</strong> c² = 3² + 4² = 9 + 16 = 25</p>
                    <p><strong>Step 3:</strong> c = √25 = 5</p>
                    <p class="font-bold text-green-600">Answer: c = 5 units</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold mb-3">Example: Find side a when b = 5, c = 13</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Step 1:</strong> a² + b² = c²</p>
                    <p><strong>Step 2:</strong> a² + 5² = 13²</p>
                    <p><strong>Step 3:</strong> a² + 25 = 169</p>
                    <p><strong>Step 4:</strong> a² = 169 - 25 = 144</p>
                    <p><strong>Step 5:</strong> a = √144 = 12</p>
                    <p class="font-bold text-green-600">Answer: a = 12 units</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📊 Trigonometric Ratios</h3>
        <p class="text-gray-700 mb-4">SOH CAH TOA helps us remember the three main trigonometric ratios.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">SOH - Sine</h4>
                <p class="font-mono text-center bg-gray-100 p-2 rounded">sin θ = Opposite/Hypotenuse</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">CAH - Cosine</h4>
                <p class="font-mono text-center bg-gray-100 p-2 rounded">cos θ = Adjacent/Hypotenuse</p>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">TOA - Tangent</h4>
                <p class="font-mono text-center bg-gray-100 p-2 rounded">tan θ = Opposite/Adjacent</p>
            </div>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Common Angle Values</h4>
            <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse border border-gray-300">
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 p-2">Angle</th>
                        <th class="border border-gray-300 p-2">sin θ</th>
                        <th class="border border-gray-300 p-2">cos θ</th>
                        <th class="border border-gray-300 p-2">tan θ</th>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">30°</td>
                        <td class="border border-gray-300 p-2">1/2</td>
                        <td class="border border-gray-300 p-2">√3/2</td>
                        <td class="border border-gray-300 p-2">1/√3</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">45°</td>
                        <td class="border border-gray-300 p-2">1/√2</td>
                        <td class="border border-gray-300 p-2">1/√2</td>
                        <td class="border border-gray-300 p-2">1</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">60°</td>
                        <td class="border border-gray-300 p-2">√3/2</td>
                        <td class="border border-gray-300 p-2">1/2</td>
                        <td class="border border-gray-300 p-2">√3</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Find the hypotenuse of a right triangle with sides 6 cm and 8 cm.</p>
                <input type="number" id="q1_answer" placeholder="c = ? cm" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(1, 10, 'c² = 6² + 8² = 36 + 64 = 100, so c = √100 = 10 cm')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. What is tan 45°?</p>
                <input type="number" id="q2_answer" placeholder="tan 45° = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(2, 1, 'tan 45° = 1 (from the table of common angles)')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  15: `<div class="space-y-6">
    <div class="bg-indigo-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-indigo-800 mb-3">📈 Coordinate Geometry</h3>
        <p class="text-gray-700 mb-4">Coordinate geometry combines algebra and geometry using coordinates to solve problems about shapes and lines.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-indigo-600 mb-2">Coordinate System</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Origin:</strong> Point (0, 0)</p>
                    <p><strong>x-axis:</strong> Horizontal line</p>
                    <p><strong>y-axis:</strong> Vertical line</p>
                    <p><strong>Point:</strong> (x, y) coordinates</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-indigo-600 mb-2">Quadrants</h4>
                <div class="space-y-1 text-sm">
                    <p><strong>I:</strong> (+, +) top right</p>
                    <p><strong>II:</strong> (-, +) top left</p>
                    <p><strong>III:</strong> (-, -) bottom left</p>
                    <p><strong>IV:</strong> (+, -) bottom right</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📏 Distance Formula</h3>
        <p class="text-gray-700 mb-4">Find the distance between any two points using coordinates.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2">Distance Formula</h4>
            <p class="text-center text-lg font-mono bg-gray-100 p-3 rounded">d = √[(x₂-x₁)² + (y₂-y₁)²]</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-3">Example: Distance from A(1, 2) to B(4, 6)</h4>
            <div class="space-y-2 text-sm">
                <p><strong>Step 1:</strong> Identify coordinates: (x₁,y₁) = (1,2), (x₂,y₂) = (4,6)</p>
                <p><strong>Step 2:</strong> d = √[(4-1)² + (6-2)²]</p>
                <p><strong>Step 3:</strong> d = √[3² + 4²] = √[9 + 16] = √25</p>
                <p class="font-bold text-green-600">Answer: d = 5 units</p>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📊 Gradients and Lines</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Gradient Formula</h4>
                <p class="text-center font-mono bg-gray-100 p-2 rounded mb-2">m = (y₂-y₁)/(x₂-x₁)</p>
                <div class="text-sm space-y-1">
                    <p><strong>Positive gradient:</strong> Line slopes upward ↗</p>
                    <p><strong>Negative gradient:</strong> Line slopes downward ↘</p>
                    <p><strong>Zero gradient:</strong> Horizontal line →</p>
                    <p><strong>Undefined gradient:</strong> Vertical line ↑</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Equation of a Line</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Point-slope form:</strong> y - y₁ = m(x - x₁)</p>
                    <p><strong>Slope-intercept form:</strong> y = mx + c</p>
                    <p>Where m = gradient, c = y-intercept</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">📍 Midpoint Formula</h3>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-2">Midpoint Formula</h4>
            <p class="text-center font-mono bg-gray-100 p-2 rounded">Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Example: Midpoint of A(2, 3) and B(8, 7)</h4>
            <p class="text-sm">Midpoint = ((2+8)/2, (3+7)/2) = (5, 5)</p>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Find the distance between points (0, 0) and (3, 4).</p>
                <input type="number" id="q1_answer" placeholder="Distance = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkNumberAnswer(1, 5, 'd = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Find the gradient of the line through (1, 2) and (5, 10).</p>
                <input type="number" id="q2_answer" placeholder="Gradient = ?" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkNumberAnswer(2, 2, 'm = (10-2)/(5-1) = 8/4 = 2')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">3. Find the midpoint of (2, 6) and (8, 4). Enter as x,y</p>
                <input type="text" id="q3_answer" placeholder="e.g. 5,5" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkAlgebraAnswer(3, ['5,5', '5, 5', '(5,5)', '(5, 5)'], 'Midpoint = ((2+8)/2, (6+4)/2) = (5, 5)')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  11: `<div class="space-y-6">
    <div class="bg-emerald-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-emerald-800 mb-3">📐 Basic Geometry Concepts</h3>
        <p class="text-gray-700 mb-4">Geometry is the study of shapes, sizes, positions, and properties of objects in space. Let's start with the fundamental concepts.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-emerald-600 mb-2">Points, Lines & Angles</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Point:</strong> Exact location (no size) • A</p>
                    <p><strong>Line:</strong> Infinite straight path ↔</p>
                    <p><strong>Ray:</strong> Line with one endpoint →</p>
                    <p><strong>Angle:</strong> Formed by two rays with common endpoint</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-emerald-600 mb-2">Basic Shapes</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Triangle:</strong> 3 sides, 3 angles</p>
                    <p><strong>Quadrilateral:</strong> 4 sides, 4 angles</p>
                    <p><strong>Pentagon:</strong> 5 sides, 5 angles</p>
                    <p><strong>Circle:</strong> All points equidistant from center</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📊 Types of Angles</h3>
        <p class="text-gray-700 mb-4">Angles are measured in degrees (°). Different angle sizes have special names.</p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded border text-center">
                <div class="text-2xl mb-2">⌐</div>
                <h4 class="font-bold text-blue-600 text-sm">Acute Angle</h4>
                <p class="text-xs">Less than 90°</p>
                <p class="text-xs text-gray-500">Example: 45°</p>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <div class="text-2xl mb-2">⌐</div>
                <h4 class="font-bold text-blue-600 text-sm">Right Angle</h4>
                <p class="text-xs">Exactly 90°</p>
                <p class="text-xs text-gray-500">Square corner</p>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <div class="text-2xl mb-2">⌐</div>
                <h4 class="font-bold text-blue-600 text-sm">Obtuse Angle</h4>
                <p class="text-xs">90° to 180°</p>
                <p class="text-xs text-gray-500">Example: 120°</p>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <div class="text-2xl mb-2">—</div>
                <h4 class="font-bold text-blue-600 text-sm">Straight Angle</h4>
                <p class="text-xs">Exactly 180°</p>
                <p class="text-xs text-gray-500">Straight line</p>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📏 Parallel Lines and Transversals</h3>
        <p class="text-gray-700 mb-4">When a transversal (crossing line) intersects parallel lines, it creates several angle relationships.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-3">Angle Pairs</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Corresponding Angles:</strong> Same position, equal</p>
                    <p><strong>Alternate Interior:</strong> Inside, opposite sides, equal</p>
                    <p><strong>Alternate Exterior:</strong> Outside, opposite sides, equal</p>
                    <p><strong>Co-interior:</strong> Inside, same side, add to 180°</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-3">Key Facts</h4>
                <div class="space-y-2 text-sm">
                    <p>• Parallel lines never meet</p>
                    <p>• Corresponding angles are equal</p>
                    <p>• Alternate angles are equal</p>
                    <p>• Co-interior angles sum to 180°</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">🔺 Polygon Angle Rules</h3>
        <p class="text-gray-700 mb-4">Polygons have special rules for their interior and exterior angles.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-3">Interior Angle Formulas</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <p class="font-medium text-orange-600">Sum of Interior Angles:</p>
                    <p class="font-mono bg-gray-100 p-2 rounded">(n - 2) × 180°</p>
                    <p class="text-xs text-gray-600">where n = number of sides</p>
                </div>
                <div>
                    <p class="font-medium text-orange-600">Each Interior Angle (Regular):</p>
                    <p class="font-mono bg-gray-100 p-2 rounded">(n - 2) × 180° ÷ n</p>
                    <p class="text-xs text-gray-600">for regular polygons only</p>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-bold text-orange-600">Triangle</p>
                <p class="text-sm">Sum: 180°</p>
                <p class="text-xs text-gray-600">Each: 60°</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-bold text-orange-600">Square</p>
                <p class="text-sm">Sum: 360°</p>
                <p class="text-xs text-gray-600">Each: 90°</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-bold text-orange-600">Pentagon</p>
                <p class="text-sm">Sum: 540°</p>
                <p class="text-xs text-gray-600">Each: 108°</p>
            </div>
            <div class="bg-white p-3 rounded border text-center">
                <p class="font-bold text-orange-600">Hexagon</p>
                <p class="text-sm">Sum: 720°</p>
                <p class="text-xs text-gray-600">Each: 120°</p>
            </div>
        </div>
    </div>

    <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-yellow-800 mb-3">⭐ Exterior Angles</h3>
        <p class="text-gray-700 mb-4">Exterior angles are formed when extending one side of a polygon.</p>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Key Facts About Exterior Angles</h4>
            <div class="space-y-2 text-sm">
                <p>• The sum of exterior angles of any polygon = 360°</p>
                <p>• Each exterior angle of a regular n-sided polygon = 360° ÷ n</p>
                <p>• Interior angle + exterior angle = 180° (linear pair)</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. What is the sum of interior angles in a pentagon?</p>
                <p class="text-sm text-gray-600 mb-2">Hint: Use (n - 2) × 180° where n = 5</p>
                <input type="number" id="q1_answer" placeholder="Enter degrees" 
                       class="border border-gray-300 rounded px-3 py-2 w-28">
                <span class="text-sm">°</span>
                <button onclick="checkNumberAnswer(1, 540, 'Pentagon has 5 sides: (5-2) × 180° = 3 × 180° = 540°')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. In a regular octagon, what is each interior angle?</p>
                <p class="text-sm text-gray-600 mb-2">Hint: Find total sum, then divide by number of angles</p>
                <input type="number" id="q2_answer" placeholder="Enter degrees" 
                       class="border border-gray-300 rounded px-3 py-2 w-28">
                <span class="text-sm">°</span>
                <button onclick="checkNumberAnswer(2, 135, 'Octagon: (8-2) × 180° ÷ 8 = 1080° ÷ 8 = 135°')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">3. If two parallel lines are cut by a transversal and one angle is 70°, what is the corresponding angle?</p>
                <input type="number" id="q3_answer" placeholder="Enter degrees" 
                       class="border border-gray-300 rounded px-3 py-2 w-28">
                <span class="text-sm">°</span>
                <button onclick="checkNumberAnswer(3, 70, 'Corresponding angles are equal when lines are parallel, so the angle is also 70°')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  12: `<div class="space-y-6">
    <div class="bg-sky-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-sky-800 mb-3">🔺 Triangle Properties</h3>
        <p class="text-gray-700 mb-4">Triangles are the most fundamental polygons in geometry. They have unique properties and classifications.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-sky-600 mb-2">By Sides</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Equilateral:</strong> 3 equal sides</p>
                    <p><strong>Isosceles:</strong> 2 equal sides</p>
                    <p><strong>Scalene:</strong> No equal sides</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-sky-600 mb-2">By Angles</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Acute:</strong> All angles < 90°</p>
                    <p><strong>Right:</strong> One angle = 90°</p>
                    <p><strong>Obtuse:</strong> One angle > 90°</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-sky-600 mb-2">Key Facts</h4>
                <div class="space-y-2 text-sm">
                    <p>Sum of angles = 180°</p>
                    <p>Exterior angle = sum of opposite interior angles</p>
                    <p>Longest side opposite largest angle</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-indigo-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-indigo-800 mb-3">📐 Congruent Triangles</h3>
        <p class="text-gray-700 mb-4">Congruent triangles are identical in shape and size. There are four tests to prove congruence.</p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-indigo-600 text-sm mb-2">SSS</h4>
                <p class="text-xs">Side-Side-Side</p>
                <p class="text-xs text-gray-600">All three sides equal</p>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-indigo-600 text-sm mb-2">SAS</h4>
                <p class="text-xs">Side-Angle-Side</p>
                <p class="text-xs text-gray-600">Two sides and included angle</p>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-indigo-600 text-sm mb-2">ASA</h4>
                <p class="text-xs">Angle-Side-Angle</p>
                <p class="text-xs text-gray-600">Two angles and included side</p>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-indigo-600 text-sm mb-2">RHS</h4>
                <p class="text-xs">Right-Hypotenuse-Side</p>
                <p class="text-xs text-gray-600">Right triangles only</p>
            </div>
        </div>
    </div>

    <div class="bg-rose-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-rose-800 mb-3">📏 Similar Triangles</h3>
        <p class="text-gray-700 mb-4">Similar triangles have the same shape but different sizes. Corresponding angles are equal, sides are proportional.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold mb-3">Tests for Similarity</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div class="text-center">
                    <p class="font-bold text-rose-600">AAA</p>
                    <p>All angles equal</p>
                </div>
                <div class="text-center">
                    <p class="font-bold text-rose-600">SSS</p>
                    <p>Sides proportional</p>
                </div>
                <div class="text-center">
                    <p class="font-bold text-rose-600">SAS</p>
                    <p>Two sides proportional, included angle equal</p>
                </div>
            </div>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold mb-2">Scale Factor</h4>
            <p class="text-sm">If triangles are similar with scale factor k:</p>
            <div class="text-sm space-y-1 mt-2">
                <p>• Corresponding lengths are in ratio k : 1</p>
                <p>• Areas are in ratio k² : 1</p>
                <p>• Volumes are in ratio k³ : 1</p>
            </div>
        </div>
    </div>

    <div class="bg-violet-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-violet-800 mb-3">🔷 Quadrilaterals</h3>
        <p class="text-gray-700 mb-4">Quadrilaterals are four-sided polygons with special properties.</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded border">
                <h4 class="font-bold text-violet-600 text-sm mb-1">Rectangle</h4>
                <p class="text-xs">4 right angles, opposite sides equal</p>
            </div>
            
            <div class="bg-white p-3 rounded border">
                <h4 class="font-bold text-violet-600 text-sm mb-1">Square</h4>
                <p class="text-xs">4 equal sides, 4 right angles</p>
            </div>
            
            <div class="bg-white p-3 rounded border">
                <h4 class="font-bold text-violet-600 text-sm mb-1">Rhombus</h4>
                <p class="text-xs">4 equal sides, opposite angles equal</p>
            </div>
            
            <div class="bg-white p-3 rounded border">
                <h4 class="font-bold text-violet-600 text-sm mb-1">Parallelogram</h4>
                <p class="text-xs">Opposite sides parallel and equal</p>
            </div>
            
            <div class="bg-white p-3 rounded border">
                <h4 class="font-bold text-violet-600 text-sm mb-1">Trapezium</h4>
                <p class="text-xs">One pair of parallel sides</p>
            </div>
            
            <div class="bg-white p-3 rounded border">
                <h4 class="font-bold text-violet-600 text-sm mb-1">Kite</h4>
                <p class="text-xs">Two pairs of adjacent equal sides</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. In triangle ABC, if angle A = 65° and angle B = 45°, what is angle C?</p>
                <input type="number" id="q1_answer" placeholder="Enter degrees" 
                       class="border border-gray-300 rounded px-3 py-2 w-28">
                <span class="text-sm">°</span>
                <button onclick="checkNumberAnswer(1, 70, 'Sum of angles in triangle = 180°. So C = 180° - 65° - 45° = 70°')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. What type of triangle has sides 5cm, 5cm, and 8cm?</p>
                <div class="space-y-2 mb-3">
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="a" class="mr-2">
                        <span>a) Equilateral</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="b" class="mr-2">
                        <span>b) Isosceles</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="q2" value="c" class="mr-2">
                        <span>c) Scalene</span>
                    </label>
                </div>
                <button onclick="checkAnswer(2, 'b', 'Two sides are equal (5cm each), so it is isosceles')" 
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  13: `<div class="space-y-6">
    <div class="bg-cyan-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-cyan-800 mb-3">⭕ Circle Geometry</h3>
        <p class="text-gray-700 mb-4">A circle is the set of all points that are the same distance from a center point. Let's explore its properties and measurements.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-cyan-600 mb-2">Circle Parts</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Center:</strong> Fixed point in middle</p>
                    <p><strong>Radius (r):</strong> Distance from center to edge</p>
                    <p><strong>Diameter (d):</strong> Distance across center (d = 2r)</p>
                    <p><strong>Circumference:</strong> Distance around circle</p>
                    <p><strong>Arc:</strong> Part of circumference</p>
                    <p><strong>Chord:</strong> Straight line between two points</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-cyan-600 mb-2">Key Formulas</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Circumference:</strong> C = πd or C = 2πr</p>
                    <p><strong>Area:</strong> A = πr²</p>
                    <p><strong>π (pi) ≈ 3.14159...</strong></p>
                    <p class="text-xs text-gray-600">Use π button on calculator or 3.14 for approximations</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📐 Circle Theorems</h3>
        <p class="text-gray-700 mb-4">Circle theorems are powerful rules about angles and lengths in circles.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-3">Angle Theorems</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Angle in semicircle:</strong> Always 90°</p>
                    <p><strong>Angles in same segment:</strong> Equal</p>
                    <p><strong>Angle at center:</strong> Twice angle at circumference</p>
                    <p><strong>Cyclic quadrilateral:</strong> Opposite angles sum to 180°</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-3">Tangent Theorems</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Tangent-radius:</strong> Meet at 90°</p>
                    <p><strong>Two tangents from point:</strong> Equal length</p>
                    <p><strong>Alternate segment:</strong> Tangent angle equals angle in alternate segment</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">🌟 Arc Length and Sector Area</h3>
        <p class="text-gray-700 mb-4">We can find the length of arcs and areas of sectors using angles.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Arc Length</h4>
                <div class="text-sm space-y-2">
                    <p class="font-mono bg-gray-100 p-2 rounded text-center">Arc length = (θ/360°) × 2πr</p>
                    <p>Where θ = angle at center in degrees</p>
                    <p class="text-xs text-gray-600">For angle in radians: Arc = θr</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Sector Area</h4>
                <div class="text-sm space-y-2">
                    <p class="font-mono bg-gray-100 p-2 rounded text-center">Sector area = (θ/360°) × πr²</p>
                    <p>Where θ = angle at center in degrees</p>
                    <p class="text-xs text-gray-600">For angle in radians: Area = ½θr²</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Find the circumference of a circle with radius 7 cm (use π = 3.14)</p>
                <input type="number" id="q1_answer" placeholder="Enter answer" step="0.01"
                       class="border border-gray-300 rounded px-3 py-2 w-28">
                <span class="text-sm">cm</span>
                <button onclick="checkNumberAnswer(1, 43.96, 'C = 2πr = 2 × 3.14 × 7 = 43.96 cm')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Find the area of a circle with radius 5 cm (use π = 3.14)</p>
                <input type="number" id="q2_answer" placeholder="Enter answer" step="0.01"
                       class="border border-gray-300 rounded px-3 py-2 w-28">
                <span class="text-sm">cm²</span>
                <button onclick="checkNumberAnswer(2, 78.5, 'A = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 cm²')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  14: `<div class="space-y-6">
    <div class="bg-red-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-red-800 mb-3">📏 Pythagoras' Theorem</h3>
        <p class="text-gray-700 mb-4">In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-red-600 mb-3 text-center">Pythagorean Formula</h4>
            <p class="text-center text-2xl font-mono bg-gray-100 p-3 rounded mb-3">a² + b² = c²</p>
            <div class="text-sm text-center text-gray-600">
                <p>a, b = legs (shorter sides)</p>
                <p>c = hypotenuse (longest side, opposite right angle)</p>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-red-600 mb-2">Finding the Hypotenuse</h4>
                <div class="text-sm space-y-2">
                    <p><strong>Given:</strong> legs a = 3, b = 4</p>
                    <p><strong>Find:</strong> hypotenuse c</p>
                    <p>c² = 3² + 4² = 9 + 16 = 25</p>
                    <p>c = √25 = 5</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-red-600 mb-2">Finding a Leg</h4>
                <div class="text-sm space-y-2">
                    <p><strong>Given:</strong> leg a = 5, hypotenuse c = 13</p>
                    <p><strong>Find:</strong> leg b</p>
                    <p>5² + b² = 13²</p>
                    <p>25 + b² = 169</p>
                    <p>b² = 144, so b = 12</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">📐 Introduction to Trigonometry</h3>
        <p class="text-gray-700 mb-4">Trigonometry uses ratios in right triangles to find unknown sides and angles.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-orange-600 mb-3 text-center">The Three Ratios</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div class="text-center">
                    <p class="font-bold text-orange-600">Sine</p>
                    <p class="font-mono bg-gray-100 p-2 rounded my-2">sin θ = opposite/hypotenuse</p>
                    <p class="text-xs text-gray-600">SOH</p>
                </div>
                <div class="text-center">
                    <p class="font-bold text-orange-600">Cosine</p>
                    <p class="font-mono bg-gray-100 p-2 rounded my-2">cos θ = adjacent/hypotenuse</p>
                    <p class="text-xs text-gray-600">CAH</p>
                </div>
                <div class="text-center">
                    <p class="font-bold text-orange-600">Tangent</p>
                    <p class="font-mono bg-gray-100 p-2 rounded my-2">tan θ = opposite/adjacent</p>
                    <p class="text-xs text-gray-600">TOA</p>
                </div>
            </div>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold text-orange-600 mb-2">Remember: SOH CAH TOA</h4>
            <p class="text-sm text-gray-700">This helps remember which ratio to use for each trigonometric function!</p>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">🔍 Using Trigonometry</h3>
        <p class="text-gray-700 mb-4">Use trigonometry to find missing sides or angles in right triangles.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Finding a Side</h4>
                <div class="text-sm space-y-2">
                    <p><strong>Given:</strong> angle = 30°, hypotenuse = 10</p>
                    <p><strong>Find:</strong> opposite side</p>
                    <p>sin 30° = opposite/10</p>
                    <p>opposite = 10 × sin 30° = 10 × 0.5 = 5</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-blue-600 mb-2">Finding an Angle</h4>
                <div class="text-sm space-y-2">
                    <p><strong>Given:</strong> opposite = 7, adjacent = 7</p>
                    <p><strong>Find:</strong> angle θ</p>
                    <p>tan θ = 7/7 = 1</p>
                    <p>θ = tan⁻¹(1) = 45°</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📊 Special Triangles</h3>
        <p class="text-gray-700 mb-4">Some right triangles have special angle and side relationships.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-purple-600 mb-2">45°-45°-90° Triangle</h4>
                <p class="text-sm">Sides in ratio 1 : 1 : √2</p>
                <p class="text-xs text-gray-600">If legs = 1, hypotenuse = √2</p>
            </div>
            
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-purple-600 mb-2">30°-60°-90° Triangle</h4>
                <p class="text-sm">Sides in ratio 1 : √3 : 2</p>
                <p class="text-xs text-gray-600">Short leg : long leg : hypotenuse</p>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. In a right triangle with legs 6 and 8, find the hypotenuse</p>
                <input type="number" id="q1_answer" placeholder="Enter answer" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(1, 10, 'Use Pythagoras: c² = 6² + 8² = 36 + 64 = 100, so c = 10')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. In a right triangle, if the hypotenuse is 5 and one leg is 3, find the other leg</p>
                <input type="number" id="q2_answer" placeholder="Enter answer" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(2, 4, 'Use Pythagoras: 3² + b² = 5², so b² = 25 - 9 = 16, therefore b = 4')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  15: `<div class="space-y-6">
    <div class="bg-teal-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-teal-800 mb-3">📍 Coordinate Geometry</h3>
        <p class="text-gray-700 mb-4">Coordinate geometry combines algebra and geometry using coordinates to describe positions and relationships.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-teal-600 mb-2">Coordinate System</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>x-axis:</strong> Horizontal line</p>
                    <p><strong>y-axis:</strong> Vertical line</p>
                    <p><strong>Origin:</strong> Point (0, 0) where axes meet</p>
                    <p><strong>Coordinates:</strong> (x, y) where x is horizontal, y is vertical</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-teal-600 mb-2">The Four Quadrants</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>I:</strong> (+x, +y) top right</p>
                    <p><strong>II:</strong> (-x, +y) top left</p>
                    <p><strong>III:</strong> (-x, -y) bottom left</p>
                    <p><strong>IV:</strong> (+x, -y) bottom right</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-blue-800 mb-3">📏 Distance Formula</h3>
        <p class="text-gray-700 mb-4">Find the distance between any two points using the distance formula.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-blue-600 mb-3 text-center">Distance Formula</h4>
            <p class="text-center text-lg font-mono bg-gray-100 p-3 rounded mb-3">d = √[(x₂-x₁)² + (y₂-y₁)²]</p>
            <p class="text-sm text-center text-gray-600">Distance between points (x₁, y₁) and (x₂, y₂)</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold text-blue-600 mb-2">Example</h4>
            <div class="text-sm space-y-2">
                <p><strong>Find distance between (1, 2) and (4, 6)</strong></p>
                <p>d = √[(4-1)² + (6-2)²]</p>
                <p>d = √[3² + 4²] = √[9 + 16] = √25 = 5</p>
            </div>
        </div>
    </div>

    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📊 Midpoint Formula</h3>
        <p class="text-gray-700 mb-4">Find the point exactly halfway between two given points.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-purple-600 mb-3 text-center">Midpoint Formula</h4>
            <p class="text-center text-lg font-mono bg-gray-100 p-3 rounded mb-3">M = ((x₁+x₂)/2, (y₁+y₂)/2)</p>
            <p class="text-sm text-center text-gray-600">Midpoint between (x₁, y₁) and (x₂, y₂)</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
            <h4 class="font-bold text-purple-600 mb-2">Example</h4>
            <div class="text-sm space-y-2">
                <p><strong>Find midpoint of (2, 4) and (8, 10)</strong></p>
                <p>M = ((2+8)/2, (4+10)/2) = (10/2, 14/2) = (5, 7)</p>
            </div>
        </div>
    </div>

    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">📈 Gradient (Slope)</h3>
        <p class="text-gray-700 mb-4">Gradient measures how steep a line is - the rate of change of y with respect to x.</p>
        
        <div class="bg-white p-4 rounded border mb-4">
            <h4 class="font-bold text-orange-600 mb-3 text-center">Gradient Formula</h4>
            <p class="text-center text-lg font-mono bg-gray-100 p-3 rounded mb-3">m = (y₂-y₁)/(x₂-x₁)</p>
            <p class="text-sm text-center text-gray-600">Gradient between points (x₁, y₁) and (x₂, y₂)</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-orange-600">Positive Gradient</h4>
                <p class="text-sm">Line slopes upward ↗</p>
                <p class="text-xs text-gray-600">m > 0</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-orange-600">Negative Gradient</h4>
                <p class="text-sm">Line slopes downward ↘</p>
                <p class="text-xs text-gray-600">m < 0</p>
            </div>
            <div class="bg-white p-4 rounded border text-center">
                <h4 class="font-bold text-orange-600">Zero Gradient</h4>
                <p class="text-sm">Horizontal line →</p>
                <p class="text-xs text-gray-600">m = 0</p>
            </div>
        </div>
    </div>

    <div class="bg-rose-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-rose-800 mb-3">📐 Equation of a Straight Line</h3>
        <p class="text-gray-700 mb-4">There are several ways to write the equation of a straight line.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-rose-600 mb-2">Gradient-Intercept Form</h4>
                <p class="font-mono bg-gray-100 p-2 rounded text-center mb-2">y = mx + c</p>
                <div class="text-sm space-y-1">
                    <p>m = gradient</p>
                    <p>c = y-intercept</p>
                    <p class="text-xs text-gray-600">Most common form</p>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-rose-600 mb-2">Point-Gradient Form</h4>
                <p class="font-mono bg-gray-100 p-2 rounded text-center mb-2">y - y₁ = m(x - x₁)</p>
                <div class="text-sm space-y-1">
                    <p>When you know gradient and one point</p>
                    <p class="text-xs text-gray-600">Useful for finding equations</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-green-800 mb-3">🎯 Interactive Practice</h3>
        
        <div class="space-y-4">
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">1. Find the distance between points (0, 0) and (3, 4)</p>
                <input type="number" id="q1_answer" placeholder="Enter answer" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(1, 5, 'Distance = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback1" class="hidden mt-3"></div>
            </div>
            
            <div class="bg-white p-4 rounded border">
                <p class="font-medium mb-3">2. Find the gradient of the line through points (1, 2) and (5, 10)</p>
                <input type="number" id="q2_answer" placeholder="Enter answer" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkNumberAnswer(2, 2, 'Gradient = (10-2)/(5-1) = 8/4 = 2')" 
                        class="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Check Answer</button>
                <div id="feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  // STATISTICS AND PROBABILITY TOPICS (16-21)
  16: `<div class="space-y-6">
    <div class="bg-purple-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-purple-800 mb-3">📊 Data Collection and Presentation</h3>
        <p class="text-gray-700 mb-4">Statistics begins with collecting and organizing data to understand patterns and make informed decisions.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Types of Data</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Qualitative:</strong> Categories (colors, names)</p>
                    <p><strong>Quantitative:</strong> Numbers (height, age)</p>
                    <p><strong>Discrete:</strong> Counted (students, cars)</p>
                    <p><strong>Continuous:</strong> Measured (weight, time)</p>
                </div>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-purple-600 mb-2">Collection Methods</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Survey:</strong> Questionnaires</p>
                    <p><strong>Observation:</strong> Direct recording</p>
                    <p><strong>Experiment:</strong> Controlled testing</p>
                    <p><strong>Census:</strong> Entire population</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-purple-200">
        <h3 class="text-lg font-bold text-purple-700 mb-4">📋 Data Presentation Methods</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-purple-50 p-4 rounded">
                <h4 class="font-bold text-purple-600 mb-2">Frequency Tables</h4>
                <div class="text-xs bg-white p-2 rounded border">
                    <table class="w-full">
                        <tr><th class="border px-1 py-1">Score</th><th class="border px-1 py-1">Freq</th></tr>
                        <tr><td class="border px-1 py-1">1-5</td><td class="border px-1 py-1">3</td></tr>
                        <tr><td class="border px-1 py-1">6-10</td><td class="border px-1 py-1">7</td></tr>
                        <tr><td class="border px-1 py-1">11-15</td><td class="border px-1 py-1">5</td></tr>
                    </table>
                </div>
            </div>
            <div class="bg-purple-50 p-4 rounded">
                <h4 class="font-bold text-purple-600 mb-2">Bar Charts</h4>
                <p class="text-xs">Bars show frequency of categories</p>
                <div class="mt-2 flex items-end justify-around h-12 bg-white rounded border">
                    <div class="bg-purple-400 w-3" style="height: 60%"></div>
                    <div class="bg-purple-400 w-3" style="height: 80%"></div>
                    <div class="bg-purple-400 w-3" style="height: 40%"></div>
                    <div class="bg-purple-400 w-3" style="height: 100%"></div>
                </div>
            </div>
            <div class="bg-purple-50 p-4 rounded">
                <h4 class="font-bold text-purple-600 mb-2">Pie Charts</h4>
                <p class="text-xs">Circles show proportions</p>
                <div class="mt-2 flex justify-center">
                    <div class="w-12 h-12 rounded-full" style="background: conic-gradient(#8b5cf6 0deg 144deg, #a78bfa 144deg 216deg, #c4b5fd 216deg 288deg, #ddd6fe 288deg 360deg);"></div>
                </div>
            </div>
        </div>

        <div class="bg-purple-50 p-4 rounded-lg">
            <h4 class="font-bold text-purple-600 mb-3">🎯 Interactive Practice</h4>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Question 1:</strong> A survey collected ages: 12, 15, 13, 12, 14, 15, 13, 12, 14, 15. What type of data is this?</p>
                <select id="q1_stats_answer" class="border border-gray-300 rounded px-3 py-2">
                    <option value="">Select answer</option>
                    <option value="qualitative">Qualitative</option>
                    <option value="quantitative_discrete">Quantitative Discrete</option>
                    <option value="quantitative_continuous">Quantitative Continuous</option>
                </select>
                <button onclick="checkStatsAnswer(1, 'quantitative_discrete', 'Ages are numbers that are counted in whole years, making them quantitative discrete data.')" 
                        class="ml-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Check Answer</button>
                <div id="stats_feedback1" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 2:</strong> In a frequency table, the class 10-14 has a frequency of 8. What does this mean?</p>
                <input type="text" id="q2_stats_text" placeholder="Enter your explanation" 
                       class="border border-gray-300 rounded px-3 py-2 w-full">
                <button onclick="checkStatsTextAnswer(2, ['8 values', '8 data points', 'eight values'], 'There are 8 data values that fall between 10 and 14 (inclusive).')" 
                        class="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Check Answer</button>
                <div id="stats_feedback2" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  17: `<div class="space-y-6">
    <div class="bg-indigo-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-indigo-800 mb-3">📈 Statistical Measures</h3>
        <p class="text-gray-700 mb-4">Statistical measures help us summarize and understand data sets through measures of central tendency and spread.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-indigo-600 mb-2">Measures of Central Tendency</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Mean (x̄):</strong> Sum ÷ Number of values</p>
                    <p><strong>Median:</strong> Middle value when ordered</p>
                    <p><strong>Mode:</strong> Most frequent value</p>
                </div>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-indigo-600 mb-2">Measures of Spread</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Range:</strong> Highest - Lowest</p>
                    <p><strong>Quartiles:</strong> Q1, Q2 (median), Q3</p>
                    <p><strong>Standard Deviation:</strong> Measure of spread</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-indigo-200">
        <h3 class="text-lg font-bold text-indigo-700 mb-4">🧮 Calculating Statistical Measures</h3>
        
        <div class="bg-indigo-50 p-4 rounded-lg mb-6">
            <h4 class="font-bold text-indigo-600 mb-3">Example Dataset: Test Scores</h4>
            <p class="mb-2"><strong>Data:</strong> 65, 70, 75, 80, 85, 90, 95</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <h5 class="font-bold text-indigo-500 mb-2">Step-by-Step Calculations:</h5>
                    <div class="text-sm space-y-1 bg-white p-3 rounded">
                        <p><strong>Mean:</strong> (65+70+75+80+85+90+95) ÷ 7 = 560 ÷ 7 = 80</p>
                        <p><strong>Median:</strong> Middle of 7 values = 80</p>
                        <p><strong>Mode:</strong> No repeated values = None</p>
                        <p><strong>Range:</strong> 95 - 65 = 30</p>
                    </div>
                </div>
                <div>
                    <h5 class="font-bold text-indigo-500 mb-2">Quartiles:</h5>
                    <div class="text-sm space-y-1 bg-white p-3 rounded">
                        <p><strong>Q1:</strong> 25th percentile = 70</p>
                        <p><strong>Q2:</strong> 50th percentile (median) = 80</p>
                        <p><strong>Q3:</strong> 75th percentile = 90</p>
                        <p><strong>IQR:</strong> Q3 - Q1 = 90 - 70 = 20</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-indigo-50 p-4 rounded-lg">
            <h4 class="font-bold text-indigo-600 mb-3">🎯 Interactive Practice</h4>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Dataset:</strong> 12, 15, 18, 15, 21, 24, 15, 18</p>
                <p class="mb-2"><strong>Question 1:</strong> What is the mean of this dataset?</p>
                <input type="number" id="q1_mean_answer" placeholder="Enter mean" step="0.1"
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkStatsNumberAnswer(1, 17.25, 'mean', 'Sum = 12+15+18+15+21+24+15+18 = 138, Mean = 138 ÷ 8 = 17.25')" 
                        class="ml-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Check Answer</button>
                <div id="stats_mean_feedback1" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 2:</strong> What is the median of the same dataset?</p>
                <p class="text-xs text-gray-600 mb-2">Hint: First order the values: 12, 15, 15, 15, 18, 18, 21, 24</p>
                <input type="number" id="q2_median_answer" placeholder="Enter median" step="0.1"
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkStatsNumberAnswer(2, 16.5, 'median', 'With 8 values, median is average of 4th and 5th values: (15 + 18) ÷ 2 = 16.5')" 
                        class="ml-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Check Answer</button>
                <div id="stats_mean_feedback2" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 3:</strong> What is the mode of the dataset?</p>
                <input type="number" id="q3_mode_answer" placeholder="Enter mode"
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkStatsNumberAnswer(3, 15, 'mode', 'The value 15 appears 3 times, more than any other value, so mode = 15')" 
                        class="ml-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Check Answer</button>
                <div id="stats_mean_feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  18: `<div class="space-y-6">
    <div class="bg-pink-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-pink-800 mb-3">🎯 Probability Basics</h3>
        <p class="text-gray-700 mb-4">Probability measures how likely an event is to occur, expressed as a number between 0 and 1.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-pink-600 mb-2">Probability Scale</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>0:</strong> Impossible</p>
                    <p><strong>0.5:</strong> Even chance</p>
                    <p><strong>1:</strong> Certain</p>
                    <div class="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 h-4 rounded mt-2"></div>
                    <div class="flex justify-between text-xs">
                        <span>0</span>
                        <span>0.5</span>
                        <span>1</span>
                    </div>
                </div>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-pink-600 mb-2">Basic Formula</h4>
                <div class="text-center p-3 bg-pink-50 rounded">
                    <p class="font-mono text-lg">P(E) = Number of favorable outcomes / Total number of outcomes</p>
                </div>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-pink-600 mb-2">Example</h4>
                <div class="text-sm space-y-1">
                    <p><strong>Rolling a dice:</strong></p>
                    <p>P(getting 3) = 1/6 ≈ 0.167</p>
                    <p>P(even number) = 3/6 = 0.5</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-pink-200">
        <h3 class="text-lg font-bold text-pink-700 mb-4">🎲 Probability Rules and Examples</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-pink-50 p-4 rounded-lg">
                <h4 class="font-bold text-pink-600 mb-3">Coin Toss Example</h4>
                <div class="text-sm space-y-2">
                    <p><strong>Sample Space:</strong> {Heads, Tails}</p>
                    <p><strong>P(Heads) =</strong> 1/2 = 0.5</p>
                    <p><strong>P(Tails) =</strong> 1/2 = 0.5</p>
                    <p><strong>Sum:</strong> 0.5 + 0.5 = 1 ✓</p>
                </div>
            </div>
            <div class="bg-pink-50 p-4 rounded-lg">
                <h4 class="font-bold text-pink-600 mb-3">Card Draw Example</h4>
                <div class="text-sm space-y-2">
                    <p><strong>Standard deck:</strong> 52 cards</p>
                    <p><strong>P(Heart) =</strong> 13/52 = 1/4</p>
                    <p><strong>P(King) =</strong> 4/52 = 1/13</p>
                    <p><strong>P(Red card) =</strong> 26/52 = 1/2</p>
                </div>
            </div>
        </div>

        <div class="bg-pink-50 p-4 rounded-lg mb-6">
            <h4 class="font-bold text-pink-600 mb-3">🔗 Probability Rules</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white p-3 rounded">
                    <h5 class="font-bold text-pink-500 mb-2">Addition Rule</h5>
                    <p class="text-sm">P(A or B) = P(A) + P(B) - P(A and B)</p>
                    <p class="text-xs text-gray-600">For mutually exclusive events: P(A or B) = P(A) + P(B)</p>
                </div>
                <div class="bg-white p-3 rounded">
                    <h5 class="font-bold text-pink-500 mb-2">Complement Rule</h5>
                    <p class="text-sm">P(not A) = 1 - P(A)</p>
                    <p class="text-xs text-gray-600">The probability that an event doesn't happen</p>
                </div>
            </div>
        </div>

        <div class="bg-pink-50 p-4 rounded-lg">
            <h4 class="font-bold text-pink-600 mb-3">🎯 Interactive Practice</h4>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Question 1:</strong> A bag contains 5 red balls, 3 blue balls, and 2 green balls. What is the probability of drawing a red ball?</p>
                <input type="text" id="q1_prob_answer" placeholder="Enter as fraction (e.g., 1/2)" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkProbAnswer(1, ['5/10', '1/2', '0.5'], 'Total balls = 5+3+2 = 10. P(red) = 5/10 = 1/2')" 
                        class="ml-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Check Answer</button>
                <div id="prob_feedback1" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 2:</strong> Rolling a fair 6-sided dice, what is P(getting a number greater than 4)?</p>
                <input type="text" id="q2_prob_answer" placeholder="Enter as fraction or decimal" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkProbAnswer(2, ['2/6', '1/3', '0.333', '0.33'], 'Numbers greater than 4 are 5 and 6. P = 2/6 = 1/3')" 
                        class="ml-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Check Answer</button>
                <div id="prob_feedback2" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 3:</strong> If P(sunny) = 0.7, what is P(not sunny)?</p>
                <input type="number" id="q3_prob_answer" placeholder="Enter decimal" step="0.1" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkStatsNumberAnswer(3, 0.3, 'probability', 'P(not sunny) = 1 - P(sunny) = 1 - 0.7 = 0.3')" 
                        class="ml-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Check Answer</button>
                <div id="prob_feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  19: `<div class="space-y-6">
    <div class="bg-orange-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-orange-800 mb-3">🌳 Probability Trees and Conditional Probability</h3>
        <p class="text-gray-700 mb-4">Tree diagrams help visualize sequences of events and calculate complex probabilities systematically.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-orange-600 mb-2">Tree Diagrams</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Branches:</strong> Show possible outcomes</p>
                    <p><strong>Probabilities:</strong> Written on branches</p>
                    <p><strong>Endpoints:</strong> Show final outcomes</p>
                    <p><strong>Multiplication:</strong> Along branches</p>
                </div>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-orange-600 mb-2">Conditional Probability</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>P(A|B):</strong> Probability of A given B</p>
                    <p><strong>Formula:</strong> P(A|B) = P(A and B) / P(B)</p>
                    <p><strong>Example:</strong> P(Rain|Cloudy)</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-orange-200">
        <h3 class="text-lg font-bold text-orange-700 mb-4">🎲 Tree Diagram Example</h3>
        
        <div class="bg-orange-50 p-4 rounded-lg mb-6">
            <h4 class="font-bold text-orange-600 mb-3">Example: Two Coin Tosses</h4>
            
            <div class="flex justify-center mb-4">
                <div class="text-sm font-mono bg-white p-4 rounded border">
                    <div class="text-center mb-2"><strong>Start</strong></div>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>First Toss</div>
                        <div></div>
                        <div>Second Toss</div>
                        <div>Outcome</div>
                        
                        <div class="border-r-2 border-gray-400 pr-2">H (0.5)</div>
                        <div>→</div>
                        <div>H (0.5)<br/>T (0.5)</div>
                        <div>HH (0.25)<br/>HT (0.25)</div>
                        
                        <div class="border-r-2 border-gray-400 pr-2">T (0.5)</div>
                        <div>→</div>
                        <div>H (0.5)<br/>T (0.5)</div>
                        <div>TH (0.25)<br/>TT (0.25)</div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h5 class="font-bold text-orange-500 mb-2">Calculations:</h5>
                    <div class="text-sm space-y-1 bg-white p-3 rounded">
                        <p><strong>P(HH) =</strong> 0.5 × 0.5 = 0.25</p>
                        <p><strong>P(exactly one H) =</strong> P(HT) + P(TH) = 0.25 + 0.25 = 0.5</p>
                        <p><strong>P(at least one H) =</strong> 1 - P(TT) = 1 - 0.25 = 0.75</p>
                    </div>
                </div>
                <div>
                    <h5 class="font-bold text-orange-500 mb-2">Key Rules:</h5>
                    <div class="text-sm space-y-1 bg-white p-3 rounded">
                        <p><strong>Along branches:</strong> Multiply probabilities</p>
                        <p><strong>Different paths:</strong> Add probabilities</p>
                        <p><strong>All outcomes sum to 1:</strong> 0.25 + 0.25 + 0.25 + 0.25 = 1</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-orange-50 p-4 rounded-lg mb-6">
            <h4 class="font-bold text-orange-600 mb-3">🎯 Conditional Probability Example</h4>
            
            <div class="bg-white p-4 rounded border mb-4">
                <p class="mb-2"><strong>Scenario:</strong> A class has 30 students. 18 play football, 12 play basketball, 6 play both sports.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h5 class="font-bold text-orange-500 mb-2">Given Information:</h5>
                        <div class="text-sm space-y-1">
                            <p>Total students: 30</p>
                            <p>Play football (F): 18</p>
                            <p>Play basketball (B): 12</p>
                            <p>Play both (F ∩ B): 6</p>
                        </div>
                    </div>
                    <div>
                        <h5 class="font-bold text-orange-500 mb-2">Questions:</h5>
                        <div class="text-sm space-y-1">
                            <p>P(B|F) = P(plays basketball given plays football)</p>
                            <p>= P(B ∩ F) / P(F)</p>
                            <p>= (6/30) / (18/30) = 6/18 = 1/3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-orange-50 p-4 rounded-lg">
            <h4 class="font-bold text-orange-600 mb-3">🎯 Interactive Practice</h4>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Question 1:</strong> Drawing two cards without replacement from a deck. What is P(both are hearts)?</p>
                <p class="text-xs text-gray-600 mb-2">Hint: First card P(Heart) = 13/52, Second card P(Heart|First was Heart) = 12/51</p>
                <input type="text" id="q1_tree_answer" placeholder="Enter as fraction" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkProbAnswer(1, ['12/204', '1/17'], 'P(both hearts) = (13/52) × (12/51) = 156/2652 = 12/204 = 1/17')" 
                        class="ml-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Check Answer</button>
                <div id="tree_feedback1" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 2:</strong> A bag has 4 red and 6 blue balls. Draw 2 balls without replacement. What is P(first red, second blue)?</p>
                <input type="text" id="q2_tree_answer" placeholder="Enter as fraction" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkProbAnswer(2, ['24/90', '4/15'], 'P(red then blue) = (4/10) × (6/9) = 24/90 = 4/15')" 
                        class="ml-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Check Answer</button>
                <div id="tree_feedback2" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 3:</strong> In a class, P(studies Math) = 0.8, P(passes test) = 0.9, P(passes test | studies Math) = 0.95. What is P(studies Math | passes test)?</p>
                <input type="number" id="q3_tree_answer" placeholder="Enter decimal" step="0.01" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkTreeAnswer(3, 0.84, 'Use formula: P(A|B) = P(B|A) × P(A) / P(B) = 0.95 × 0.8 / 0.9 = 0.844')" 
                        class="ml-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Check Answer</button>
                <div id="tree_feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  20: `<div class="space-y-6">
    <div class="bg-cyan-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-cyan-800 mb-3">📊 Statistical Distributions</h3>
        <p class="text-gray-700 mb-4">Statistical distributions show how data values are spread and help us understand patterns in large datasets.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-cyan-600 mb-2">Normal Distribution</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Bell-shaped curve</strong></p>
                    <p><strong>68-95-99.7 Rule:</strong></p>
                    <p>68% within 1 standard deviation</p>
                    <p>95% within 2 standard deviations</p>
                    <p>99.7% within 3 standard deviations</p>
                </div>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-cyan-600 mb-2">Other Distributions</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Uniform:</strong> All values equally likely</p>
                    <p><strong>Skewed:</strong> Tail on one side</p>
                    <p><strong>Bimodal:</strong> Two peaks</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-cyan-200">
        <h3 class="text-lg font-bold text-cyan-700 mb-4">📈 Understanding Distributions</h3>
        
        <div class="bg-cyan-50 p-4 rounded-lg mb-6">
            <h4 class="font-bold text-cyan-600 mb-3">Normal Distribution Properties</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded">
                    <h5 class="font-bold text-cyan-500 mb-2">Visual Representation</h5>
                    <div class="text-center">
                        <svg width="200" height="120" class="mx-auto">
                            <path d="M 20 100 Q 100 20 180 100" stroke="#0891b2" stroke-width="3" fill="none"/>
                            <line x1="100" y1="20" x2="100" y2="100" stroke="#0891b2" stroke-dasharray="5,5"/>
                            <text x="100" y="115" text-anchor="middle" font-size="12">μ (mean)</text>
                        </svg>
                    </div>
                </div>
                <div class="bg-white p-4 rounded">
                    <h5 class="font-bold text-cyan-500 mb-2">Key Features</h5>
                    <div class="text-sm space-y-1">
                        <p><strong>Symmetric:</strong> Mirror image around mean</p>
                        <p><strong>Mean = Median = Mode</strong></p>
                        <p><strong>Standard deviation (σ):</strong> Controls width</p>
                        <p><strong>Area under curve = 1</strong></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-cyan-50 p-4 rounded-lg mb-6">
            <h4 class="font-bold text-cyan-600 mb-3">📏 Standard Scores (Z-scores)</h4>
            
            <div class="bg-white p-4 rounded border mb-4">
                <div class="text-center mb-3">
                    <p class="font-mono text-lg"><strong>Z = (X - μ) / σ</strong></p>
                    <p class="text-sm text-gray-600">Where X = data value, μ = mean, σ = standard deviation</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5 class="font-bold text-cyan-500 mb-2">Example Calculation:</h5>
                        <div class="text-sm space-y-1">
                            <p><strong>Given:</strong> Test scores normally distributed</p>
                            <p>Mean (μ) = 75, Standard deviation (σ) = 10</p>
                            <p><strong>Find Z-score for X = 85:</strong></p>
                            <p>Z = (85 - 75) / 10 = 10/10 = 1</p>
                        </div>
                    </div>
                    <div>
                        <h5 class="font-bold text-cyan-500 mb-2">Interpretation:</h5>
                        <div class="text-sm space-y-1">
                            <p><strong>Z = 1:</strong> 1 standard deviation above mean</p>
                            <p><strong>Z = 0:</strong> Equal to the mean</p>
                            <p><strong>Z = -1:</strong> 1 standard deviation below mean</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-cyan-50 p-4 rounded-lg">
            <h4 class="font-bold text-cyan-600 mb-3">🎯 Interactive Practice</h4>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Question 1:</strong> Heights are normally distributed with mean 170cm and standard deviation 8cm. What is the Z-score for a height of 186cm?</p>
                <input type="number" id="q1_dist_answer" placeholder="Enter Z-score" step="0.1" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkStatsNumberAnswer(1, 2, 'zscore', 'Z = (186 - 170) / 8 = 16 / 8 = 2')" 
                        class="ml-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Check Answer</button>
                <div id="dist_feedback1" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 2:</strong> In a normal distribution, what percentage of data falls within 2 standard deviations of the mean?</p>
                <input type="number" id="q2_dist_answer" placeholder="Enter percentage" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkStatsNumberAnswer(2, 95, 'percentage', 'By the 68-95-99.7 rule, 95% of data falls within 2 standard deviations')" 
                        class="ml-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Check Answer</button>
                <div id="dist_feedback2" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 3:</strong> If test scores have mean = 80 and σ = 5, what score corresponds to Z = -1.5?</p>
                <input type="number" id="q3_dist_answer" placeholder="Enter score" 
                       class="border border-gray-300 rounded px-3 py-2 w-24">
                <button onclick="checkStatsNumberAnswer(3, 72.5, 'score', 'Using X = μ + Z×σ: X = 80 + (-1.5)×5 = 80 - 7.5 = 72.5')" 
                        class="ml-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Check Answer</button>
                <div id="dist_feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`,

  21: `<div class="space-y-6">
    <div class="bg-emerald-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold text-emerald-800 mb-3">🔬 Hypothesis Testing and Analysis</h3>
        <p class="text-gray-700 mb-4">Hypothesis testing helps us make decisions about populations based on sample data using statistical evidence.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-emerald-600 mb-2">Hypothesis Testing Steps</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>1. State hypotheses</strong> (H₀ and H₁)</p>
                    <p><strong>2. Choose significance level</strong> (α)</p>
                    <p><strong>3. Calculate test statistic</strong></p>
                    <p><strong>4. Find p-value</strong></p>
                    <p><strong>5. Make decision</strong></p>
                </div>
            </div>
            <div class="bg-white p-4 rounded border">
                <h4 class="font-bold text-emerald-600 mb-2">Types of Errors</h4>
                <div class="space-y-2 text-sm">
                    <p><strong>Type I Error:</strong> Reject true H₀</p>
                    <p><strong>Type II Error:</strong> Accept false H₀</p>
                    <p><strong>α (alpha):</strong> P(Type I Error)</p>
                    <p><strong>Power:</strong> 1 - P(Type II Error)</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white p-6 rounded-lg border border-emerald-200">
        <h3 class="text-lg font-bold text-emerald-700 mb-4">🧪 Hypothesis Testing Process</h3>
        
        <div class="bg-emerald-50 p-4 rounded-lg mb-6">
            <h4 class="font-bold text-emerald-600 mb-3">Example: Testing a Mean</h4>
            
            <div class="bg-white p-4 rounded border">
                <p class="mb-3"><strong>Scenario:</strong> A factory claims their light bulbs last 1000 hours on average. A sample of 25 bulbs has a mean of 950 hours with standard deviation 100 hours. Test at α = 0.05.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5 class="font-bold text-emerald-500 mb-2">Step-by-Step Solution:</h5>
                        <div class="text-sm space-y-2">
                            <p><strong>Step 1:</strong> H₀: μ = 1000, H₁: μ ≠ 1000</p>
                            <p><strong>Step 2:</strong> α = 0.05 (two-tailed)</p>
                            <p><strong>Step 3:</strong> t = (x̄ - μ) / (s/√n)</p>
                            <p>t = (950 - 1000) / (100/√25) = -50/20 = -2.5</p>
                            <p><strong>Step 4:</strong> With df = 24, |t| = 2.5</p>
                            <p><strong>Step 5:</strong> Critical value ≈ ±2.064</p>
                        </div>
                    </div>
                    <div>
                        <h5 class="font-bold text-emerald-500 mb-2">Conclusion:</h5>
                        <div class="text-sm space-y-2">
                            <p>Since |2.5| > 2.064, we <strong>reject H₀</strong></p>
                            <p><strong>Interpretation:</strong> There is sufficient evidence that the mean lifetime is not 1000 hours.</p>
                            <p><strong>Practical meaning:</strong> The bulbs may not last as long as claimed.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-emerald-50 p-4 rounded-lg mb-6">
            <h4 class="font-bold text-emerald-600 mb-3">📊 Correlation and Regression</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded">
                    <h5 class="font-bold text-emerald-500 mb-2">Correlation Coefficient (r)</h5>
                    <div class="text-sm space-y-2">
                        <p><strong>Range:</strong> -1 ≤ r ≤ 1</p>
                        <p><strong>r = 1:</strong> Perfect positive correlation</p>
                        <p><strong>r = 0:</strong> No linear correlation</p>
                        <p><strong>r = -1:</strong> Perfect negative correlation</p>
                        <p><strong>|r| > 0.7:</strong> Strong correlation</p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded">
                    <h5 class="font-bold text-emerald-500 mb-2">Linear Regression</h5>
                    <div class="text-sm space-y-2">
                        <p><strong>Equation:</strong> y = mx + b</p>
                        <p><strong>Slope (m):</strong> Change in y per unit x</p>
                        <p><strong>y-intercept (b):</strong> Value when x = 0</p>
                        <p><strong>R²:</strong> Proportion of variance explained</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-emerald-50 p-4 rounded-lg">
            <h4 class="font-bold text-emerald-600 mb-3">🎯 Interactive Practice</h4>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Question 1:</strong> If the p-value = 0.03 and α = 0.05, what is your decision about H₀?</p>
                <select id="q1_hyp_answer" class="border border-gray-300 rounded px-3 py-2">
                    <option value="">Select answer</option>
                    <option value="reject">Reject H₀</option>
                    <option value="fail_to_reject">Fail to reject H₀</option>
                    <option value="accept">Accept H₀</option>
                </select>
                <button onclick="checkHypAnswer(1, 'reject', 'Since p-value (0.03) < α (0.05), we reject H₀')" 
                        class="ml-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">Check Answer</button>
                <div id="hyp_feedback1" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 2:</strong> A correlation coefficient r = -0.85 indicates what type of relationship?</p>
                <select id="q2_hyp_answer" class="border border-gray-300 rounded px-3 py-2">
                    <option value="">Select answer</option>
                    <option value="strong_positive">Strong positive correlation</option>
                    <option value="strong_negative">Strong negative correlation</option>
                    <option value="weak_positive">Weak positive correlation</option>
                    <option value="no_correlation">No correlation</option>
                </select>
                <button onclick="checkHypAnswer(2, 'strong_negative', '|r| = 0.85 > 0.7 indicates strong correlation, and negative sign means negative relationship')" 
                        class="ml-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">Check Answer</button>
                <div id="hyp_feedback2" class="hidden mt-3"></div>
            </div>

            <div class="mb-4">
                <p class="mb-2"><strong>Question 3:</strong> In a two-tailed test with α = 0.01, what would be the critical z-values?</p>
                <input type="text" id="q3_hyp_answer" placeholder="Enter as ±value (e.g., ±2.58)" 
                       class="border border-gray-300 rounded px-3 py-2 w-32">
                <button onclick="checkHypTextAnswer(3, ['±2.58', '±2.576'], 'For α = 0.01 two-tailed test, critical z-values are ±2.58')" 
                        class="ml-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">Check Answer</button>
                <div id="hyp_feedback3" class="hidden mt-3"></div>
            </div>
        </div>
    </div>
</div>`
};

export function getLessonContent(topicId: number): string {
  return LESSON_CONTENT[topicId] || '<div class="bg-blue-50 p-6 rounded-lg"><h3 class="text-xl font-bold text-blue-800 mb-3">📚 Lesson Coming Soon!</h3><p class="text-gray-700">We are preparing comprehensive interactive content for this topic. Check back soon!</p></div>';
}
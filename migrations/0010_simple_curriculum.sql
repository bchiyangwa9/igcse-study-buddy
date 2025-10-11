-- Simple IGCSE Mathematics Curriculum
-- Reset and create clean curriculum structure

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty_level TEXT NOT NULL,
    estimated_duration INTEGER NOT NULL
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER NOT NULL,
    lesson_title TEXT NOT NULL,
    lesson_content TEXT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topics (id)
);

-- Insert key topics for complete mathematics curriculum
INSERT OR REPLACE INTO topics (id, title, description, category, difficulty_level, estimated_duration) VALUES
(1, 'Number Operations & BODMAS', 'Master basic number operations, negative numbers, and order of operations', 'Number', 'Foundation', 45),
(2, 'Fractions, Decimals & Percentages', 'Convert between forms and solve percentage problems', 'Number', 'Foundation', 50),
(3, 'Ratio, Proportion & Scale', 'Work with ratios, direct/inverse proportion, and scale drawings', 'Number', 'Intermediate', 55),
(4, 'Powers, Roots & Standard Form', 'Understand indices, roots, and scientific notation', 'Number', 'Intermediate', 45),
(5, 'Number Sequences', 'Find patterns, nth terms in arithmetic and geometric sequences', 'Number', 'Advanced', 40),

(6, 'Algebraic Expressions', 'Simplify, expand, and factorize algebraic expressions', 'Algebra', 'Foundation', 50),
(7, 'Linear Equations', 'Solve linear equations and inequalities', 'Algebra', 'Intermediate', 55),
(8, 'Quadratic Equations', 'Solve quadratics and understand parabolas', 'Algebra', 'Advanced', 60),
(9, 'Functions & Graphs', 'Understand function notation and graph transformations', 'Algebra', 'Advanced', 50),
(10, 'Advanced Algebra', 'Apply algebraic methods to complex problems', 'Algebra', 'Expert', 45),

(11, 'Angles & Lines', 'Calculate angles in parallel lines and polygons', 'Geometry', 'Foundation', 45),
(12, 'Area & Volume', 'Calculate perimeter, area, and volume of shapes', 'Geometry', 'Intermediate', 55),
(13, 'Similarity & Congruence', 'Understand similar shapes and geometric proofs', 'Geometry', 'Intermediate', 40),
(14, 'Circle Geometry', 'Work with circles: area, circumference, and theorems', 'Geometry', 'Advanced', 50),
(15, 'Coordinate Geometry', 'Use coordinates, gradients, and line equations', 'Geometry', 'Advanced', 45),

(16, 'Data & Statistics', 'Collect, present, and interpret statistical data', 'Statistics', 'Foundation', 40),
(17, 'Averages & Spread', 'Calculate mean, median, mode, and range', 'Statistics', 'Intermediate', 35),
(18, 'Probability Basics', 'Understand probability and tree diagrams', 'Statistics', 'Intermediate', 45),
(19, 'Statistical Analysis', 'Analyze distributions and correlation', 'Statistics', 'Advanced', 40),
(20, 'Advanced Probability', 'Complex probability with combinations', 'Probability', 'Advanced', 35),
(21, 'Mathematical Problem Solving', 'Apply all mathematical concepts to real problems', 'Mixed', 'Expert', 60);

-- Insert comprehensive lesson content
INSERT OR REPLACE INTO lessons (topic_id, lesson_title, lesson_content) VALUES
(1, 'Number Operations & BODMAS', '
<div class="max-w-4xl mx-auto p-6 bg-white">
    <h1 class="text-3xl font-bold text-blue-800 mb-6">📊 Number Operations & BODMAS</h1>
    
    <div class="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 class="text-xl font-semibold text-blue-800 mb-3">Learning Objectives</h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Master the four basic operations with positive and negative numbers</li>
            <li>Apply BODMAS order of operations correctly</li>
            <li>Work confidently with integers and real numbers</li>
            <li>Solve multi-step calculations systematically</li>
        </ul>
    </div>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Order of Operations (BODMAS)</h2>
        
        <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
            <h3 class="font-semibold text-yellow-800 mb-3">Remember: BODMAS</h3>
            <ol class="list-decimal list-inside space-y-1 text-gray-700">
                <li><strong>B</strong>rackets first</li>
                <li><strong>O</strong>rders (powers/indices)</li>
                <li><strong>D</strong>ivision and <strong>M</strong>ultiplication (left to right)</li>
                <li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
            </ol>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
            <h4 class="font-semibold mb-2">Example: 2 + 3 × (4 + 1)² ÷ 5</h4>
            <div class="space-y-2 text-gray-700">
                <p><strong>Step 1:</strong> Brackets: (4 + 1) = 5</p>
                <p><strong>Step 2:</strong> Orders: 5² = 25</p>
                <p><strong>Step 3:</strong> Division: 25 ÷ 5 = 5</p>
                <p><strong>Step 4:</strong> Multiplication: 3 × 5 = 15</p>
                <p><strong>Step 5:</strong> Addition: 2 + 15 = 17</p>
            </div>
        </div>
    </div>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Working with Negative Numbers</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 class="font-semibold text-red-800 mb-3">Addition & Subtraction</h3>
                <ul class="space-y-2 text-gray-700">
                    <li><strong>+ (+)</strong> = + &nbsp;&nbsp; Example: 5 + 3 = 8</li>
                    <li><strong>+ (-)</strong> = - &nbsp;&nbsp; Example: 5 + (-3) = 2</li>
                    <li><strong>- (+)</strong> = - &nbsp;&nbsp; Example: 5 - 3 = 2</li>
                    <li><strong>- (-)</strong> = + &nbsp;&nbsp; Example: 5 - (-3) = 8</li>
                </ul>
            </div>
            
            <div class="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 class="font-semibold text-green-800 mb-3">Multiplication & Division</h3>
                <ul class="space-y-2 text-gray-700">
                    <li><strong>(+) × (+)</strong> = + &nbsp;&nbsp; Example: 4 × 3 = 12</li>
                    <li><strong>(+) × (-)</strong> = - &nbsp;&nbsp; Example: 4 × (-3) = -12</li>
                    <li><strong>(-) × (+)</strong> = - &nbsp;&nbsp; Example: (-4) × 3 = -12</li>
                    <li><strong>(-) × (-)</strong> = + &nbsp;&nbsp; Example: (-4) × (-3) = 12</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="mt-8 text-center">
        <a href="/quiz/number-operations" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Take the Enhanced Quiz →
        </a>
    </div>
</div>
'),

(2, 'Fractions, Decimals & Percentages', '
<div class="max-w-4xl mx-auto p-6 bg-white">
    <h1 class="text-3xl font-bold text-blue-800 mb-6">🔢 Fractions, Decimals & Percentages</h1>
    
    <div class="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 class="text-xl font-semibold text-blue-800 mb-3">Learning Objectives</h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Convert fluently between fractions, decimals, and percentages</li>
            <li>Perform operations with fractions and mixed numbers</li>
            <li>Solve percentage problems including increase and decrease</li>
            <li>Apply concepts to real-world financial problems</li>
        </ul>
    </div>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Converting Between Forms</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                <h3 class="font-semibold text-green-800 mb-2">Fraction</h3>
                <p class="text-2xl font-bold text-green-700">3/4</p>
            </div>
            
            <div class="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                <h3 class="font-semibold text-blue-800 mb-2">Decimal</h3>
                <p class="text-2xl font-bold text-blue-700">0.75</p>
            </div>
            
            <div class="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                <h3 class="font-semibold text-purple-800 mb-2">Percentage</h3>
                <p class="text-2xl font-bold text-purple-700">75%</p>
            </div>
        </div>
    </div>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Percentage Applications</h2>
        
        <div class="space-y-4">
            <div class="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h3 class="font-semibold text-indigo-800 mb-2">Finding a Percentage</h3>
                <p class="text-gray-700"><strong>Example:</strong> Find 25% of 80 = 0.25 × 80 = 20</p>
            </div>
            
            <div class="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 class="font-semibold text-green-800 mb-2">Percentage Change</h3>
                <p class="text-gray-700"><strong>Example:</strong> Price increases from £40 to £50</p>
                <p class="text-gray-700">Percentage increase = (10/40) × 100% = 25%</p>
            </div>
        </div>
    </div>

    <div class="mt-8 text-center">
        <a href="/quiz/fractions-decimals-percentages" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Take the Enhanced Quiz →
        </a>
    </div>
</div>
'),

(3, 'Ratio, Proportion & Scale', '
<div class="max-w-4xl mx-auto p-6 bg-white">
    <h1 class="text-3xl font-bold text-blue-800 mb-6">⚖️ Ratio, Proportion & Scale</h1>
    
    <div class="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 class="text-xl font-semibold text-blue-800 mb-3">Learning Objectives</h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Simplify ratios and share quantities proportionally</li>
            <li>Solve direct and inverse proportion problems</li>
            <li>Work with scale drawings and maps</li>
            <li>Apply unitary method for proportion calculations</li>
        </ul>
    </div>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Direct and Inverse Proportion</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 class="font-semibold text-purple-800 mb-3">Direct Proportion</h3>
                <p class="text-gray-700 mb-2">As one increases, the other increases proportionally</p>
                <p class="text-gray-700"><strong>Example:</strong> 5 apples cost £2, 8 apples cost £3.20</p>
            </div>
            
            <div class="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 class="font-semibold text-red-800 mb-3">Inverse Proportion</h3>
                <p class="text-gray-700 mb-2">As one increases, the other decreases</p>
                <p class="text-gray-700"><strong>Example:</strong> 6 workers take 8 days, 4 workers take 12 days</p>
            </div>
        </div>
    </div>

    <div class="mt-8 text-center">
        <a href="/quiz/ratio-proportion-scale" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Take the Enhanced Quiz →
        </a>
    </div>
</div>
'),

(4, 'Powers, Roots & Standard Form', '
<div class="max-w-4xl mx-auto p-6 bg-white">
    <h1 class="text-3xl font-bold text-blue-800 mb-6">🔢 Powers, Roots & Standard Form</h1>
    
    <div class="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 class="text-xl font-semibold text-blue-800 mb-3">Learning Objectives</h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Work with indices and apply the laws of indices</li>
            <li>Calculate squares, cubes, and higher powers</li>
            <li>Find square roots and cube roots</li>
            <li>Convert to and from standard form (scientific notation)</li>
            <li>Perform calculations with numbers in standard form</li>
        </ul>
    </div>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Laws of Indices</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 class="font-semibold text-green-800 mb-2">Multiplication Rule</h3>
                    <p class="text-gray-700">a^m × a^n = a^(m+n)</p>
                    <p class="text-sm text-gray-600">Example: 2³ × 2² = 2⁵ = 32</p>
                </div>
                
                <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 class="font-semibold text-blue-800 mb-2">Division Rule</h3>
                    <p class="text-gray-700">a^m ÷ a^n = a^(m-n)</p>
                    <p class="text-sm text-gray-600">Example: 3⁵ ÷ 3² = 3³ = 27</p>
                </div>
            </div>
            
            <div class="space-y-4">
                <div class="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 class="font-semibold text-purple-800 mb-2">Power Rule</h3>
                    <p class="text-gray-700">(a^m)^n = a^(m×n)</p>
                    <p class="text-sm text-gray-600">Example: (2³)² = 2⁶ = 64</p>
                </div>
                
                <div class="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 class="font-semibold text-red-800 mb-2">Zero & Negative Powers</h3>
                    <p class="text-gray-700">a⁰ = 1, a^(-n) = 1/a^n</p>
                    <p class="text-sm text-gray-600">Example: 5⁰ = 1, 2^(-3) = 1/8</p>
                </div>
            </div>
        </div>
    </div>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Standard Form</h2>
        
        <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
            <h3 class="font-semibold text-yellow-800 mb-3">Standard Form Format: a × 10^n</h3>
            <ul class="text-gray-700 space-y-2">
                <li><strong>Where:</strong> 1 ≤ a < 10 and n is an integer</li>
                <li><strong>Large numbers:</strong> n is positive</li>
                <li><strong>Small numbers:</strong> n is negative</li>
            </ul>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-800">Converting TO Standard Form</h4>
                <div class="p-3 bg-gray-50 rounded">
                    <p class="text-gray-700"><strong>45,600</strong> = 4.56 × 10⁴</p>
                    <p class="text-gray-700"><strong>0.00078</strong> = 7.8 × 10^(-4)</p>
                </div>
            </div>
            
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-800">Converting FROM Standard Form</h4>
                <div class="p-3 bg-gray-50 rounded">
                    <p class="text-gray-700"><strong>3.2 × 10³</strong> = 3,200</p>
                    <p class="text-gray-700"><strong>6.7 × 10^(-2)</strong> = 0.067</p>
                </div>
            </div>
        </div>
    </div>

    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Interactive Practice</h2>
        
        <div class="space-y-4">
            <div class="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h3 class="font-semibold text-indigo-800 mb-2">Try This: Calculate 2⁵</h3>
                <button onclick="showAnswer1()" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Show Answer</button>
                <div id="answer1" class="hidden mt-2 p-2 bg-white rounded">
                    <p class="text-green-700 font-semibold">2⁵ = 2 × 2 × 2 × 2 × 2 = 32</p>
                </div>
            </div>
            
            <div class="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 class="font-semibold text-orange-800 mb-2">Try This: Express 250,000 in standard form</h3>
                <button onclick="showAnswer2()" class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Show Answer</button>
                <div id="answer2" class="hidden mt-2 p-2 bg-white rounded">
                    <p class="text-green-700 font-semibold">250,000 = 2.5 × 10⁵</p>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-8 text-center">
        <a href="/quiz/powers-roots-standard-form" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Take the Enhanced Quiz →
        </a>
    </div>
</div>

<script>
function showAnswer1() {
    document.getElementById("answer1").classList.remove("hidden");
}

function showAnswer2() {
    document.getElementById("answer2").classList.remove("hidden");
}
</script>
');
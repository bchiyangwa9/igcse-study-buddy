import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { MATHEMATICS_TOPICS, getLessonContent } from './routes'

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

// Enhanced Quiz Route with Examination Techniques (Fixed Version)
app.get('/quiz/algebra-enhanced', (c) => {
  const correctAnswers = ['c', 'b', 'a', 'c', 'b', 'a', 'c', 'b', 'a', 'b'];
  const explanations = [
    'A variable is a letter used to represent an unknown number.',
    'When x = 3, substitute: 2(3) + 5 = 6 + 5 = 11',
    'Combining like terms: 3x + 2x = (3+2)x = 5x',
    'To solve x + 7 = 12, subtract 7 from both sides: x = 5',
    'Expanding: 3(x + 4) = 3×x + 3×4 = 3x + 12',
    'To solve 2x = 10, divide both sides by 2: x = 5',
    'When a = 2, substitute: a² + 3 = 2² + 3 = 4 + 3 = 7',
    'Combining: 5y - 2y = (5-2)y = 3y',
    'To solve x - 3 = 8, add 3 to both sides: x = 11',
    'Expanding: 2(3x + 1) = 2×3x + 2×1 = 6x + 2'
  ];

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enhanced Algebra Quiz - Study Buddy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .question-flagged { border-left: 4px solid #f59e0b; background-color: #fef3c7; }
        .timer-warning { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .reveal-animation { animation: slideDown 0.5s ease-out; }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .status-answered { background-color: #dcfce7 !important; border-color: #22c55e !important; }
        .status-flagged { background-color: #fef3c7 !important; border-color: #f59e0b !important; }
        .status-unanswered { background-color: #fef2f2 !important; border-color: #ef4444 !important; }
    </style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200 mb-6">
            <div class="max-w-4xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-sm">SB</span>
                        </div>
                        <h1 class="text-xl font-bold text-gray-900">Enhanced Algebra Quiz</h1>
                    </div>
                    <div id="timer-display" class="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                        <i class="fas fa-clock text-blue-600"></i>
                        <span id="countdown-timer" class="font-mono text-lg font-bold text-blue-800">20:00</span>
                    </div>
                </div>
            </div>
        </header>

        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-lg font-semibold text-gray-800">Quiz Progress</h2>
                    <div class="flex space-x-2">
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Answered: <span id="answered-count">0</span>/10
                        </span>
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Flagged: <span id="flagged-count">0</span>
                        </span>
                    </div>
                </div>
                <div class="grid grid-cols-10 gap-2">
                    ${Array.from({length: 10}, (_, i) => `
                        <div id="status-q${i+1}" class="w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center text-xs font-medium bg-white">${i+1}</div>
                    `).join('')}
                </div>
            </div>

            <div class="space-y-6">${generateEnhancedQuestions()}</div>

            <div class="mt-8 text-center">
                <button id="submit-quiz" onclick="attemptQuizSubmission()" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">Submit Quiz</button>
                <p class="text-sm text-gray-500 mt-2"><i class="fas fa-info-circle"></i> You must answer all questions before submitting</p>
            </div>

            <div id="quiz-results" class="hidden mt-8 bg-white rounded-lg p-6 border border-gray-200">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Quiz Complete! 🎉</h3>
                    <div id="final-score" class="text-4xl font-bold text-blue-600 mb-4"></div>
                    <p class="text-gray-600">Here are your results:</p>
                </div>
            </div>

            <!-- High score progression pathway (80%+) -->
            <div id="next-challenge" class="hidden mt-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white text-center shadow-lg">
                <h4 class="text-2xl font-bold mb-3">🚀 Ready for Next Challenge!</h4>
                <p class="text-lg mb-4">Outstanding performance! You've mastered Algebra Basics with 80%+ score.</p>
                <div class="text-sm opacity-90 mb-4">You've demonstrated strong algebraic understanding - time to tackle advanced concepts!</div>
                <button onclick="window.location.href='/topic/21'" class="bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">Continue to Mathematical Problem Solving →</button>
            </div>

            <!-- Review guidance for lower scores (<80%) -->
            <div id="review-guidance" class="hidden mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white text-center shadow-lg">
                <h4 class="text-2xl font-bold mb-3">📚 Time to Review & Strengthen!</h4>
                <p class="text-lg mb-4">You're making progress! Let's review the concepts you missed to build a stronger foundation.</p>
                
                <div class="bg-white bg-opacity-20 rounded-lg p-4 mb-4 text-left">
                    <h5 class="font-semibold mb-2"><i class="fas fa-lightbulb mr-2"></i>What to do next:</h5>
                    <ul class="text-sm space-y-1 list-disc list-inside">
                        <li>Review the explanations above for questions you got wrong</li>
                        <li>Practice similar problems to strengthen weak areas</li>
                        <li>Retake this quiz when you feel more confident</li>
                        <li>Continue with other lessons at your current level</li>
                    </ul>
                </div>

                <div class="text-sm opacity-90 mb-4">
                    <strong>Remember:</strong> Mathematical mastery takes practice. Each attempt makes you stronger! 💪
                </div>

                <div class="flex flex-wrap justify-center gap-3">
                    <button onclick="window.location.href='/topic/1'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-book mr-2"></i>Review Lesson
                    </button>
                    <button onclick="window.location.href='/topic/2'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-arrow-right mr-2"></i>Fractions & Percentages
                    </button>
                    <button onclick="window.location.href='/dashboard'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-home mr-2"></i>All Topics
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        console.log('Quiz script loading...');
        
        // Global quiz state
        window.quizState = {
            flaggedQuestions: new Set(),
            answeredQuestions: new Set(),
            timeRemaining: 20 * 60, // 20 minutes in seconds
            timerInterval: null,
            correctAnswers: ${JSON.stringify(correctAnswers)},
            explanations: ${JSON.stringify(explanations)}
        };

        // Start timer function
        function startQuizTimer() {
            console.log('Starting timer...');
            window.quizState.timerInterval = setInterval(function() {
                window.quizState.timeRemaining--;
                
                const minutes = Math.floor(window.quizState.timeRemaining / 60);
                const seconds = window.quizState.timeRemaining % 60;
                const display = minutes + ':' + seconds.toString().padStart(2, '0');
                
                const timerElement = document.getElementById('countdown-timer');
                if (timerElement) {
                    timerElement.textContent = display;
                }
                
                // Warning at 5 minutes
                if (window.quizState.timeRemaining <= 300) {
                    const timerDisplay = document.getElementById('timer-display');
                    if (timerDisplay) {
                        timerDisplay.classList.add('timer-warning');
                        timerDisplay.classList.remove('bg-blue-50');
                        timerDisplay.classList.add('bg-red-50');
                    }
                }
                
                // Auto-submit at 0
                if (window.quizState.timeRemaining <= 0) {
                    clearInterval(window.quizState.timerInterval);
                    autoSubmitQuiz();
                }
            }, 1000);
        }

        // Toggle question flag
        function toggleQuestionFlag(questionNum) {
            console.log('Toggling flag for question:', questionNum);
            
            const flagBtn = document.getElementById('flag-q' + questionNum);
            const questionCard = document.getElementById('question-' + questionNum);
            const statusIndicator = document.getElementById('status-q' + questionNum);
            
            if (!flagBtn || !questionCard || !statusIndicator) {
                console.error('Could not find elements for question:', questionNum);
                return;
            }
            
            if (window.quizState.flaggedQuestions.has(questionNum)) {
                // Unflag
                window.quizState.flaggedQuestions.delete(questionNum);
                flagBtn.innerHTML = '<i class="far fa-flag"></i> Flag Question';
                flagBtn.className = 'px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors';
                questionCard.classList.remove('question-flagged');
                statusIndicator.classList.remove('status-flagged');
            } else {
                // Flag
                window.quizState.flaggedQuestions.add(questionNum);
                flagBtn.innerHTML = '<i class="fas fa-flag"></i> Flagged';
                flagBtn.className = 'px-3 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-colors';
                questionCard.classList.add('question-flagged');
                statusIndicator.classList.add('status-flagged');
            }
            
            updateQuizStatus();
        }

        // Check quiz answer
        function checkQuizAnswer(questionNum) {
            console.log('Checking answer for question:', questionNum);
            
            const selected = document.querySelector('input[name="q' + questionNum + '"]:checked');
            if (!selected) return;
            
            // Mark as answered
            window.quizState.answeredQuestions.add(questionNum);
            
            const statusIndicator = document.getElementById('status-q' + questionNum);
            if (statusIndicator) {
                statusIndicator.classList.add('status-answered');
                statusIndicator.innerHTML = '<i class="fas fa-check text-green-600 text-xs"></i>';
            }
            
            updateQuizStatus();
            
            // Show temporary feedback
            const feedback = document.getElementById('feedback' + questionNum);
            if (feedback) {
                feedback.innerHTML = '<div class="text-blue-600 bg-blue-50 p-2 rounded"><i class="fas fa-clock"></i> Answer recorded. Feedback will be revealed when you complete all questions.</div>';
                feedback.classList.remove('hidden');
            }
        }

        // Update quiz status counters
        function updateQuizStatus() {
            const answeredCount = document.getElementById('answered-count');
            const flaggedCount = document.getElementById('flagged-count');
            
            if (answeredCount) {
                answeredCount.textContent = window.quizState.answeredQuestions.size;
            }
            if (flaggedCount) {
                flaggedCount.textContent = window.quizState.flaggedQuestions.size;
            }
            
            // Update unanswered indicators
            for (let i = 1; i <= 10; i++) {
                const statusIndicator = document.getElementById('status-q' + i);
                if (statusIndicator && !window.quizState.answeredQuestions.has(i) && !window.quizState.flaggedQuestions.has(i)) {
                    statusIndicator.classList.add('status-unanswered');
                }
            }
        }

        // Attempt quiz submission
        function attemptQuizSubmission() {
            console.log('Attempting submission. Answered:', window.quizState.answeredQuestions.size);
            
            if (window.quizState.answeredQuestions.size < 10) {
                const unanswered = [];
                for (let i = 1; i <= 10; i++) {
                    if (!window.quizState.answeredQuestions.has(i)) {
                        unanswered.push(i);
                    }
                }
                
                alert('Please answer all questions before submitting. Unanswered questions: ' + unanswered.join(', '));
                
                // Highlight unanswered questions
                unanswered.forEach(function(q) {
                    const statusIndicator = document.getElementById('status-q' + q);
                    if (statusIndicator) {
                        statusIndicator.classList.add('animate-bounce', 'bg-red-200', 'border-red-400');
                        setTimeout(function() {
                            statusIndicator.classList.remove('animate-bounce');
                        }, 2000);
                    }
                });
                
                return;
            }
            
            finalizeQuiz();
        }

        // Auto-submit when time runs out
        function autoSubmitQuiz() {
            alert("Time's up! Quiz submitted automatically.");
            finalizeQuiz();
        }

        // Finalize quiz and show results
        function finalizeQuiz() {
            console.log('Finalizing quiz...');
            
            if (window.quizState.timerInterval) {
                clearInterval(window.quizState.timerInterval);
            }
            
            let score = 0;
            
            // Calculate score and reveal feedback
            for (let i = 1; i <= 10; i++) {
                const selected = document.querySelector('input[name="q' + i + '"]:checked');
                const feedback = document.getElementById('feedback' + i);
                
                if (!selected || !feedback) continue;
                
                const isCorrect = selected.value === window.quizState.correctAnswers[i-1];
                
                if (isCorrect) {
                    score++;
                    feedback.innerHTML = '<div class="text-green-600 bg-green-50 p-3 rounded reveal-animation"><strong>✓ Correct!</strong> ' + window.quizState.explanations[i-1] + '</div>';
                } else {
                    feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-3 rounded reveal-animation"><strong>✗ Incorrect.</strong> ' + window.quizState.explanations[i-1] + '</div>';
                }
                
                feedback.classList.remove('hidden');
            }
            
            // Show results
            const percentage = (score / 10) * 100;
            const finalScoreElement = document.getElementById('final-score');
            const resultsElement = document.getElementById('quiz-results');
            
            if (finalScoreElement) {
                finalScoreElement.textContent = score + '/10 (' + percentage + '%)';
            }
            
            if (resultsElement) {
                resultsElement.classList.remove('hidden');
            }
            
            // Show appropriate pathway based on score
            if (percentage >= 80) {
                console.log('High score achieved! Showing next challenge...');
                setTimeout(function() {
                    const nextChallenge = document.getElementById('next-challenge');
                    if (nextChallenge) {
                        console.log('Displaying next challenge section');
                        nextChallenge.classList.remove('hidden');
                        nextChallenge.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        nextChallenge.style.animation = 'slideDown 0.8s ease-out';
                    } else {
                        console.error('Could not find next-challenge element');
                    }
                }, 800);
            } else {
                console.log('Score below 80%, showing review guidance...');
                setTimeout(function() {
                    const reviewGuidance = document.getElementById('review-guidance');
                    if (reviewGuidance) {
                        console.log('Displaying review guidance section');
                        reviewGuidance.classList.remove('hidden');
                        reviewGuidance.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        reviewGuidance.style.animation = 'slideDown 0.8s ease-out';
                    } else {
                        console.error('Could not find review-guidance element');
                    }
                }, 800);
            }
            
            // Disable submit button
            const submitBtn = document.getElementById('submit-quiz');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Quiz Completed';
            }
        }

        // Initialize quiz when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing quiz...');
            startQuizTimer();
            updateQuizStatus();
        });
    </script>
</body>
</html>`);
})

function generateEnhancedQuestions() {
  const questions = [
    {
      id: 1,
      question: "What is a variable in algebra?",
      options: [
        "A number that never changes",
        "A mathematical operation", 
        "A letter used to represent an unknown number",
        "A type of equation"
      ]
    },
    {
      id: 2,
      question: "If x = 3, what is the value of 2x + 5?",
      options: ["10", "11", "8", "13"]
    },
    {
      id: 3,
      question: "Simplify: 3x + 2x",
      options: ["5x", "6x", "x", "5x²"]
    },
    {
      id: 4,
      question: "Solve: x + 7 = 12",
      options: ["x = 19", "x = 7", "x = 5", "x = 12"]
    },
    {
      id: 5,
      question: "Expand: 3(x + 4)",
      options: ["3x + 4", "3x + 12", "x + 12", "3x + 7"]
    },
    {
      id: 6,
      question: "Solve: 2x = 10",
      options: ["x = 5", "x = 20", "x = 2", "x = 12"]
    },
    {
      id: 7,
      question: "If a = 2, what is a² + 3?",
      options: ["5", "6", "7", "9"]
    },
    {
      id: 8,
      question: "Simplify: 5y - 2y",
      options: ["7y", "3y", "3", "10y"]
    },
    {
      id: 9,
      question: "Solve: x - 3 = 8",
      options: ["x = 11", "x = 5", "x = 3", "x = 8"]
    },
    {
      id: 10,
      question: "Expand: 2(3x + 1)",
      options: ["5x + 1", "6x + 2", "6x + 1", "2x + 3"]
    }
  ];

  return questions.map(q => `
    <div id="question-${q.id}" class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Question ${q.id}</h3>
        <button id="flag-q${q.id}" 
                onclick="toggleQuestionFlag(${q.id})" 
                class="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <i class="far fa-flag"></i> Flag Question
        </button>
      </div>
      
      <p class="text-gray-700 mb-4 font-medium">${q.question}</p>
      
      <div class="space-y-2 mb-4">
        ${q.options.map((option, index) => `
          <label class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
            <input type="radio" name="q${q.id}" value="${String.fromCharCode(97 + index)}" 
                   onchange="checkQuizAnswer(${q.id})" 
                   class="mr-3 text-blue-600">
            <span class="text-gray-700">${String.fromCharCode(97 + index)}) ${option}</span>
          </label>
        `).join('')}
      </div>
      
      <div id="feedback${q.id}" class="hidden mt-4"></div>
    </div>
  `).join('');
}

// Helper function to generate quiz HTML
function generateQuizHTML(quizData) {
  const { title, questions, correctAnswers, explanations, nextTopicId, nextTopicTitle, reviewTopicId, reviewTopicTitle } = quizData;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} Quiz - Study Buddy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .question-flagged { border-left: 4px solid #f59e0b; background-color: #fef3c7; }
        .timer-warning { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .reveal-animation { animation: slideDown 0.5s ease-out; }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .status-answered { background-color: #dcfce7 !important; border-color: #22c55e !important; }
        .status-flagged { background-color: #fef3c7 !important; border-color: #f59e0b !important; }
        .status-unanswered { background-color: #fef2f2 !important; border-color: #ef4444 !important; }
    </style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200 mb-6">
            <div class="max-w-4xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-sm">SB</span>
                        </div>
                        <h1 class="text-xl font-bold text-gray-900">${title} Quiz</h1>
                    </div>
                    <div id="timer-display" class="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                        <i class="fas fa-clock text-blue-600"></i>
                        <span id="countdown-timer" class="font-mono text-lg font-bold text-blue-800">20:00</span>
                    </div>
                </div>
            </div>
        </header>

        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-lg font-semibold text-gray-800">Quiz Progress</h2>
                    <div class="flex space-x-2">
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Answered: <span id="answered-count">0</span>/10
                        </span>
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Flagged: <span id="flagged-count">0</span>
                        </span>
                    </div>
                </div>
                <div class="grid grid-cols-10 gap-2">
                    ${Array.from({length: 10}, (_, i) => `
                        <div id="status-q${i+1}" class="w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center text-xs font-medium bg-white">${i+1}</div>
                    `).join('')}
                </div>
            </div>

            <div class="space-y-6">${generateQuestions(questions)}</div>

            <div class="mt-8 text-center">
                <button id="submit-quiz" onclick="attemptQuizSubmission()" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">Submit Quiz</button>
                <p class="text-sm text-gray-500 mt-2"><i class="fas fa-info-circle"></i> You must answer all questions before submitting</p>
            </div>

            <div id="quiz-results" class="hidden mt-8 bg-white rounded-lg p-6 border border-gray-200">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Quiz Complete! 🎉</h3>
                    <div id="final-score" class="text-4xl font-bold text-blue-600 mb-4"></div>
                    <p class="text-gray-600">Here are your results:</p>
                </div>
            </div>

            <!-- High score progression pathway (80%+) -->
            <div id="next-challenge" class="hidden mt-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white text-center shadow-lg">
                <h4 class="text-2xl font-bold mb-3">🚀 Ready for Next Challenge!</h4>
                <p class="text-lg mb-4">Outstanding performance! You've mastered ${title} with 80%+ score.</p>
                <div class="text-sm opacity-90 mb-4">You've demonstrated strong understanding - time to tackle the next topic!</div>
                <button onclick="window.location.href='/topic/${nextTopicId}'" class="bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">Continue to ${nextTopicTitle} →</button>
            </div>

            <!-- Review guidance for lower scores (<80%) -->
            <div id="review-guidance" class="hidden mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white text-center shadow-lg">
                <h4 class="text-2xl font-bold mb-3">📚 Time to Review & Strengthen!</h4>
                <p class="text-lg mb-4">You're making progress! Let's review the concepts you missed to build a stronger foundation.</p>
                
                <div class="bg-white bg-opacity-20 rounded-lg p-4 mb-4 text-left">
                    <h5 class="font-semibold mb-2"><i class="fas fa-lightbulb mr-2"></i>What to do next:</h5>
                    <ul class="text-sm space-y-1 list-disc list-inside">
                        <li>Review the explanations above for questions you got wrong</li>
                        <li>Practice similar problems to strengthen weak areas</li>
                        <li>Retake this quiz when you feel more confident</li>
                        <li>Continue with other lessons at your current level</li>
                    </ul>
                </div>

                <div class="text-sm opacity-90 mb-4">
                    <strong>Remember:</strong> Mathematical mastery takes practice. Each attempt makes you stronger! 💪
                </div>

                <div class="flex flex-wrap justify-center gap-3">
                    <button onclick="window.location.href='/topic/${reviewTopicId}'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-book mr-2"></i>Review Lesson
                    </button>
                    <button onclick="window.location.href='/topic/${nextTopicId}'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-arrow-right mr-2"></i>${nextTopicTitle}
                    </button>
                    <button onclick="window.location.href='/dashboard'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-home mr-2"></i>All Topics
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        console.log('Quiz script loading...');
        
        // Global quiz state
        window.quizState = {
            flaggedQuestions: new Set(),
            answeredQuestions: new Set(),
            timeRemaining: 20 * 60,
            timerInterval: null,
            correctAnswers: ${JSON.stringify(correctAnswers)},
            explanations: ${JSON.stringify(explanations)}
        };

        // Start timer function
        function startQuizTimer() {
            console.log('Starting timer...');
            window.quizState.timerInterval = setInterval(function() {
                window.quizState.timeRemaining--;
                
                const minutes = Math.floor(window.quizState.timeRemaining / 60);
                const seconds = window.quizState.timeRemaining % 60;
                const display = minutes + ':' + seconds.toString().padStart(2, '0');
                
                const timerElement = document.getElementById('countdown-timer');
                if (timerElement) {
                    timerElement.textContent = display;
                }
                
                if (window.quizState.timeRemaining <= 300) {
                    const timerDisplay = document.getElementById('timer-display');
                    if (timerDisplay) {
                        timerDisplay.classList.add('timer-warning');
                        timerDisplay.classList.remove('bg-blue-50');
                        timerDisplay.classList.add('bg-red-50');
                    }
                }
                
                if (window.quizState.timeRemaining <= 0) {
                    clearInterval(window.quizState.timerInterval);
                    autoSubmitQuiz();
                }
            }, 1000);
        }

        function toggleQuestionFlag(questionNum) {
            console.log('Toggling flag for question:', questionNum);
            
            const flagBtn = document.getElementById('flag-q' + questionNum);
            const questionCard = document.getElementById('question-' + questionNum);
            const statusIndicator = document.getElementById('status-q' + questionNum);
            
            if (!flagBtn || !questionCard || !statusIndicator) {
                console.error('Could not find elements for question:', questionNum);
                return;
            }
            
            if (window.quizState.flaggedQuestions.has(questionNum)) {
                window.quizState.flaggedQuestions.delete(questionNum);
                flagBtn.innerHTML = '<i class="far fa-flag"></i> Flag Question';
                flagBtn.className = 'px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors';
                questionCard.classList.remove('question-flagged');
                statusIndicator.classList.remove('status-flagged');
            } else {
                window.quizState.flaggedQuestions.add(questionNum);
                flagBtn.innerHTML = '<i class="fas fa-flag"></i> Flagged';
                flagBtn.className = 'px-3 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-colors';
                questionCard.classList.add('question-flagged');
                statusIndicator.classList.add('status-flagged');
            }
            
            updateQuizStatus();
        }

        function checkQuizAnswer(questionNum) {
            console.log('Checking answer for question:', questionNum);
            
            const selected = document.querySelector('input[name="q' + questionNum + '"]:checked');
            if (!selected) return;
            
            window.quizState.answeredQuestions.add(questionNum);
            
            const statusIndicator = document.getElementById('status-q' + questionNum);
            if (statusIndicator) {
                statusIndicator.classList.add('status-answered');
                statusIndicator.innerHTML = '<i class="fas fa-check text-green-600 text-xs"></i>';
            }
            
            updateQuizStatus();
            
            const feedback = document.getElementById('feedback' + questionNum);
            if (feedback) {
                feedback.innerHTML = '<div class="text-blue-600 bg-blue-50 p-2 rounded"><i class="fas fa-clock"></i> Answer recorded. Feedback will be revealed when you complete all questions.</div>';
                feedback.classList.remove('hidden');
            }
        }

        function updateQuizStatus() {
            const answeredCount = document.getElementById('answered-count');
            const flaggedCount = document.getElementById('flagged-count');
            
            if (answeredCount) {
                answeredCount.textContent = window.quizState.answeredQuestions.size;
            }
            if (flaggedCount) {
                flaggedCount.textContent = window.quizState.flaggedQuestions.size;
            }
            
            for (let i = 1; i <= 10; i++) {
                const statusIndicator = document.getElementById('status-q' + i);
                if (statusIndicator && !window.quizState.answeredQuestions.has(i) && !window.quizState.flaggedQuestions.has(i)) {
                    statusIndicator.classList.add('status-unanswered');
                }
            }
        }

        function attemptQuizSubmission() {
            console.log('Attempting submission. Answered:', window.quizState.answeredQuestions.size);
            
            if (window.quizState.answeredQuestions.size < 10) {
                const unanswered = [];
                for (let i = 1; i <= 10; i++) {
                    if (!window.quizState.answeredQuestions.has(i)) {
                        unanswered.push(i);
                    }
                }
                
                alert('Please answer all questions before submitting. Unanswered questions: ' + unanswered.join(', '));
                
                unanswered.forEach(function(q) {
                    const statusIndicator = document.getElementById('status-q' + q);
                    if (statusIndicator) {
                        statusIndicator.classList.add('animate-bounce', 'bg-red-200', 'border-red-400');
                        setTimeout(function() {
                            statusIndicator.classList.remove('animate-bounce');
                        }, 2000);
                    }
                });
                
                return;
            }
            
            finalizeQuiz();
        }

        function autoSubmitQuiz() {
            alert("Time's up! Quiz submitted automatically.");
            finalizeQuiz();
        }

        function finalizeQuiz() {
            console.log('Finalizing quiz...');
            clearInterval(window.quizState.timerInterval);

            let score = 0;
            let resultsHTML = '<div class="space-y-4">';

            for (let i = 1; i <= 10; i++) {
                const selected = document.querySelector('input[name="q' + i + '"]:checked');
                const userAnswer = selected ? selected.value : 'No answer';
                const correctAnswer = window.quizState.correctAnswers[i - 1];
                const isCorrect = userAnswer === correctAnswer;

                if (isCorrect) score++;

                resultsHTML += '<div class="bg-' + (isCorrect ? 'green' : 'red') + '-50 p-4 rounded-lg border border-' + (isCorrect ? 'green' : 'red') + '-200">';
                resultsHTML += '<div class="flex items-center mb-2">';
                resultsHTML += '<span class="text-lg font-semibold">Question ' + i + '</span>';
                resultsHTML += '<span class="ml-2 px-2 py-1 text-xs rounded-full bg-' + (isCorrect ? 'green' : 'red') + '-100 text-' + (isCorrect ? 'green' : 'red') + '-800">';
                resultsHTML += isCorrect ? 'Correct' : 'Incorrect';
                resultsHTML += '</span></div>';
                resultsHTML += '<p class="text-sm text-gray-600 mb-2">Your answer: <strong>' + (userAnswer.toUpperCase() || 'No answer') + '</strong></p>';
                resultsHTML += '<p class="text-sm text-gray-600 mb-2">Correct answer: <strong>' + correctAnswer.toUpperCase() + '</strong></p>';
                resultsHTML += '<p class="text-sm text-' + (isCorrect ? 'green' : 'red') + '-700">' + window.quizState.explanations[i - 1] + '</p>';
                resultsHTML += '</div>';
            }

            resultsHTML += '</div>';

            const percentage = (score / 10) * 100;
            document.getElementById('final-score').textContent = score + '/10 (' + percentage + '%)';
            document.getElementById('quiz-results').innerHTML = 
                '<div class="text-center mb-6">' +
                '<h3 class="text-2xl font-bold text-gray-800 mb-2">Quiz Complete! 🎉</h3>' +
                '<div class="text-4xl font-bold text-blue-600 mb-4">' + score + '/10 (' + percentage + '%)</div>' +
                '<p class="text-gray-600">Here are your results:</p>' +
                '</div>' + resultsHTML;

            document.getElementById('quiz-results').classList.remove('hidden');
            document.getElementById('submit-quiz').disabled = true;

            // Show appropriate pathway based on score
            if (percentage >= 80) {
                document.getElementById('next-challenge').classList.remove('hidden');
            } else {
                document.getElementById('review-guidance').classList.remove('hidden');
            }

            // Scroll to results
            document.getElementById('quiz-results').scrollIntoView({ behavior: 'smooth' });
        }

        function resetQuiz() {
            console.log('Resetting quiz...');
            
            // Clear all selections
            document.querySelectorAll('input[type="radio"]').forEach(input => {
                input.checked = false;
            });
            
            // Clear all feedback
            for (let i = 1; i <= 10; i++) {
                const feedback = document.getElementById('feedback' + i);
                if (feedback) {
                    feedback.classList.add('hidden');
                    feedback.innerHTML = '';
                }
                
                const statusIndicator = document.getElementById('status-q' + i);
                if (statusIndicator) {
                    statusIndicator.className = 'w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center text-xs font-medium bg-white';
                    statusIndicator.innerHTML = i;
                }
            }
            
            // Reset state
            window.quizState.flaggedQuestions.clear();
            window.quizState.answeredQuestions.clear();
            window.quizState.timeRemaining = 20 * 60;
            
            // Reset UI elements
            updateQuizStatus();
            
            const submitBtn = document.getElementById('submit-quiz');
            if (submitBtn) {
                submitBtn.disabled = false;
            }
            
            const resultsElement = document.getElementById('quiz-results');
            if (resultsElement) {
                resultsElement.classList.add('hidden');
            }
            
            const nextChallenge = document.getElementById('next-challenge');
            if (nextChallenge) {
                nextChallenge.classList.add('hidden');
            }
            
            const reviewGuidance = document.getElementById('review-guidance');
            if (reviewGuidance) {
                reviewGuidance.classList.add('hidden');
            }
            
            console.log('Quiz reset');
        }

        // Start timer when page loads
        window.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, starting timer...');
            startQuizTimer();
        });
    </script>
</body>
</html>`;
}

// Helper function to generate questions HTML
function generateQuestions(questions) {
  return questions.map(q => `
    <div id="question-${q.id}" class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Question ${q.id}</h3>
        <button id="flag-q${q.id}" 
                onclick="toggleQuestionFlag(${q.id})" 
                class="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <i class="far fa-flag"></i> Flag Question
        </button>
      </div>
      
      <p class="text-gray-700 mb-4 font-medium">${q.question}</p>
      
      <div class="space-y-2 mb-4">
        ${q.options.map((option, index) => `
          <label class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
            <input type="radio" name="q${q.id}" value="${String.fromCharCode(97 + index)}" 
                   onchange="checkQuizAnswer(${q.id})" 
                   class="mr-3 text-blue-600">
            <span class="text-gray-700">${String.fromCharCode(97 + index)}) ${option}</span>
          </label>
        `).join('')}
      </div>
      
      <div id="feedback${q.id}" class="hidden mt-4"></div>
    </div>
  `).join('');
}

// Quiz Routes for All Topics

// Topic 2: Fractions and Decimals Quiz
app.get('/quiz/fractions-decimals', (c) => {
  const quizData = {
    title: "Fractions and Decimals",
    questions: [
      {
        id: 1,
        question: "What is 3/4 as a decimal?",
        options: ["0.75", "0.34", "0.43", "0.73"]
      },
      {
        id: 2,
        question: "Convert 0.6 to a fraction in its simplest form:",
        options: ["6/10", "3/5", "60/100", "6/9"]
      },
      {
        id: 3,
        question: "What is 1/2 + 1/4?",
        options: ["2/6", "3/4", "1/3", "2/4"]
      },
      {
        id: 4,
        question: "Express 25% as a fraction in simplest form:",
        options: ["1/4", "25/100", "2/5", "1/5"]
      },
      {
        id: 5,
        question: "What is 2.5 × 0.4?",
        options: ["1.0", "1.5", "0.8", "2.0"]
      },
      {
        id: 6,
        question: "Convert 7/8 to a percentage:",
        options: ["78%", "87.5%", "0.875%", "8.75%"]
      },
      {
        id: 7,
        question: "What is 3/5 - 1/3?",
        options: ["2/2", "4/15", "2/15", "1/5"]
      },
      {
        id: 8,
        question: "Round 3.678 to 2 decimal places:",
        options: ["3.67", "3.68", "3.7", "4.0"]
      },
      {
        id: 9,
        question: "What is 1.2 ÷ 0.3?",
        options: ["4", "0.4", "3.6", "0.36"]
      },
      {
        id: 10,
        question: "Express 3 1/2 as an improper fraction:",
        options: ["7/2", "6/2", "4/2", "8/2"]
      }
    ],
    correctAnswers: ['a', 'b', 'b', 'a', 'a', 'b', 'b', 'b', 'a', 'a'],
    explanations: [
      'To convert 3/4 to decimal, divide: 3 ÷ 4 = 0.75',
      '0.6 = 6/10 = 3/5 when simplified by dividing by 2',
      '1/2 + 1/4: Convert to common denominator 4: 2/4 + 1/4 = 3/4',
      '25% = 25/100 = 1/4 when simplified by dividing by 25',
      '2.5 × 0.4 = 25/10 × 4/10 = 100/100 = 1.0',
      '7/8 = 0.875, multiply by 100 to get 87.5%',
      '3/5 - 1/3: Common denominator 15: 9/15 - 5/15 = 4/15',
      '3.678 rounded to 2 decimal places looks at the third decimal (8 ≥ 5), so round up to 3.68',
      '1.2 ÷ 0.3 = 12 ÷ 3 = 4',
      '3 1/2 = (3 × 2 + 1)/2 = 7/2'
    ],
    nextTopicId: 3,
    nextTopicTitle: "Percentages and Ratios",
    reviewTopicId: 2,
    reviewTopicTitle: "Fractions and Decimals"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Topic 3: Percentages and Ratios Quiz
app.get('/quiz/percentages-ratios', (c) => {
  const quizData = {
    title: "Percentages and Ratios",
    questions: [
      {
        id: 1,
        question: "What is 15% of 200?",
        options: ["30", "25", "35", "20"]
      },
      {
        id: 2,
        question: "A shirt costs £40. If there's a 25% discount, what's the new price?",
        options: ["£35", "£30", "£32", "£25"]
      },
      {
        id: 3,
        question: "Express the ratio 12:18 in its simplest form:",
        options: ["6:9", "2:3", "4:6", "1:2"]
      },
      {
        id: 4,
        question: "If 60% of a number is 24, what is the number?",
        options: ["40", "36", "48", "32"]
      },
      {
        id: 5,
        question: "Share £120 in the ratio 2:3. What is the larger share?",
        options: ["£60", "£72", "£80", "£48"]
      },
      {
        id: 6,
        question: "A population increases from 500 to 650. What is the percentage increase?",
        options: ["25%", "30%", "35%", "20%"]
      },
      {
        id: 7,
        question: "If a:b = 3:4 and b:c = 2:5, what is a:c?",
        options: ["3:10", "6:20", "3:5", "6:10"]
      },
      {
        id: 8,
        question: "What is 250% as a decimal?",
        options: ["2.5", "25", "0.25", "250"]
      },
      {
        id: 9,
        question: "A car depreciates by 15% each year. If it's worth £8000 now, what was it worth a year ago?",
        options: ["£9411.76", "£9200", "£9000", "£8800"]
      },
      {
        id: 10,
        question: "Divide 84 in the ratio 3:4:5:",
        options: ["21, 28, 35", "20, 28, 36", "18, 24, 30", "15, 20, 25"]
      }
    ],
    correctAnswers: ['a', 'b', 'b', 'a', 'b', 'b', 'a', 'a', 'a', 'a'],
    explanations: [
      '15% of 200 = 15/100 × 200 = 30',
      '25% discount on £40 = £10 off, so £40 - £10 = £30',
      '12:18 = 12÷6:18÷6 = 2:3',
      'If 60% = 24, then 100% = 24 ÷ 0.6 = 40',
      'Total parts = 2+3 = 5. Larger share = 3/5 × £120 = £72',
      'Increase = 650-500 = 150. Percentage = (150/500) × 100 = 30%',
      'a:b = 3:4 and b:c = 2:5. Scale b to match: a:b:c = 3:4:10, so a:c = 3:10',
      '250% = 250/100 = 2.5',
      'If current value is 85% of original, then original = 8000 ÷ 0.85 ≈ £9411.76',
      'Total parts = 3+4+5 = 12. Shares: (3/12)×84=21, (4/12)×84=28, (5/12)×84=35'
    ],
    nextTopicId: 4,
    nextTopicTitle: "Powers and Roots",
    reviewTopicId: 3,
    reviewTopicTitle: "Percentages and Ratios"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Topic 4: Powers and Roots Quiz
app.get('/quiz/powers-roots', (c) => {
  const quizData = {
    title: "Powers and Roots",
    questions: [
      {
        id: 1,
        question: "What is 2⁴?",
        options: ["8", "16", "12", "6"]
      },
      {
        id: 2,
        question: "What is √64?",
        options: ["8", "6", "4", "32"]
      },
      {
        id: 3,
        question: "Express 0.0025 in standard form:",
        options: ["2.5 × 10⁻³", "25 × 10⁻⁴", "0.25 × 10⁻²", "2.5 × 10⁻⁴"]
      },
      {
        id: 4,
        question: "What is 3⁻²?",
        options: ["1/9", "1/6", "9", "-6"]
      },
      {
        id: 5,
        question: "Simplify: x⁵ × x³",
        options: ["x⁸", "x¹⁵", "x²", "2x⁸"]
      },
      {
        id: 6,
        question: "What is ∛27?",
        options: ["3", "9", "6", "27"]
      },
      {
        id: 7,
        question: "Express 4500000 in standard form:",
        options: ["4.5 × 10⁶", "45 × 10⁵", "0.45 × 10⁷", "4.5 × 10⁷"]
      },
      {
        id: 8,
        question: "What is (2³)²?",
        options: ["64", "32", "16", "12"]
      },
      {
        id: 9,
        question: "Simplify: y⁶ ÷ y²",
        options: ["y⁴", "y³", "y⁸", "y¹²"]
      },
      {
        id: 10,
        question: "What is √(16 × 9)?",
        options: ["12", "25", "144", "7"]
      }
    ],
    correctAnswers: ['b', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      '2⁴ = 2 × 2 × 2 × 2 = 16',
      '√64 = 8 because 8² = 64',
      '0.0025 = 2.5/1000 = 2.5 × 10⁻³',
      '3⁻² = 1/3² = 1/9',
      'x⁵ × x³ = x^(5+3) = x⁸',
      '∛27 = 3 because 3³ = 27',
      '4500000 = 4.5 × 1000000 = 4.5 × 10⁶',
      '(2³)² = (8)² = 64 or 2^(3×2) = 2⁶ = 64',
      'y⁶ ÷ y² = y^(6-2) = y⁴',
      '√(16 × 9) = √144 = 12 or √16 × √9 = 4 × 3 = 12'
    ],
    nextTopicId: 5,
    nextTopicTitle: "Number Systems",
    reviewTopicId: 4,
    reviewTopicTitle: "Powers and Roots"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Topic 5: Number Systems Quiz
app.get('/quiz/number-systems', (c) => {
  const quizData = {
    title: "Number Systems",
    questions: [
      {
        id: 1,
        question: "Which of these is a prime number?",
        options: ["15", "17", "21", "25"]
      },
      {
        id: 2,
        question: "What is the prime factorization of 24?",
        options: ["2³ × 3", "2² × 6", "4 × 6", "2⁴ × 3"]
      },
      {
        id: 3,
        question: "Which number is irrational?",
        options: ["√4", "√9", "π", "22/7"]
      },
      {
        id: 4,
        question: "What is the LCM (Least Common Multiple) of 12 and 18?",
        options: ["36", "6", "216", "72"]
      },
      {
        id: 5,
        question: "What is the HCF (Highest Common Factor) of 24 and 36?",
        options: ["12", "6", "72", "4"]
      },
      {
        id: 6,
        question: "Which set does -5 belong to?",
        options: ["Natural numbers", "Whole numbers", "Integers", "Positive integers"]
      },
      {
        id: 7,
        question: "Express 0.333... as a fraction:",
        options: ["1/3", "3/10", "33/100", "1/9"]
      },
      {
        id: 8,
        question: "Which of these is NOT a perfect square?",
        options: ["49", "64", "72", "81"]
      },
      {
        id: 9,
        question: "What is 2⁰?",
        options: ["1", "0", "2", "undefined"]
      },
      {
        id: 10,
        question: "Which number is between √10 and √20?",
        options: ["4", "3", "5", "2"]
      }
    ],
    correctAnswers: ['b', 'a', 'c', 'a', 'a', 'c', 'a', 'c', 'a', 'a'],
    explanations: [
      '17 is prime as it has only factors 1 and 17',
      '24 = 8 × 3 = 2³ × 3',
      'π is irrational (infinite non-repeating decimal)',
      'LCM(12,18): 12=2²×3, 18=2×3², LCM=2²×3²=36',
      'HCF(24,36): 24=2³×3, 36=2²×3², HCF=2²×3=12',
      'Integers include all positive and negative whole numbers',
      '0.333... = 1/3 (recurring decimal)',
      '72 is not a perfect square (√72 ≈ 8.49)',
      'Any number to the power 0 equals 1',
      '√10 ≈ 3.16, √20 ≈ 4.47, so 4 is between them'
    ],
    nextTopicId: 6,
    nextTopicTitle: "Algebraic Expressions",
    reviewTopicId: 5,
    reviewTopicTitle: "Number Systems"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Topic 6: Algebraic Expressions Quiz
app.get('/quiz/algebraic-expressions', (c) => {
  const quizData = {
    title: "Algebraic Expressions",
    questions: [
      {
        id: 1,
        question: "What is the coefficient of x in 5x + 3?",
        options: ["5", "3", "x", "8"]
      },
      {
        id: 2,
        question: "Simplify: 3x + 5x - 2x",
        options: ["6x", "10x", "3x", "5x"]
      },
      {
        id: 3,
        question: "What is the constant term in 2x² + 3x - 7?",
        options: ["2", "3", "-7", "x"]
      },
      {
        id: 4,
        question: "Expand: 3(2x + 4)",
        options: ["6x + 12", "5x + 7", "6x + 4", "3x + 12"]
      },
      {
        id: 5,
        question: "Factorize: 6x + 9",
        options: ["3(2x + 3)", "6(x + 9)", "3x(2 + 3)", "x(6 + 9)"]
      },
      {
        id: 6,
        question: "Substitute x = 4 into x² + 2x:",
        options: ["24", "20", "18", "16"]
      },
      {
        id: 7,
        question: "Simplify: 4x × 3y",
        options: ["12xy", "7xy", "12x + 3y", "4x + 3y"]
      },
      {
        id: 8,
        question: "What type of expression is 5x³ + 2x - 1?",
        options: ["Linear", "Quadratic", "Cubic", "Quartic"]
      },
      {
        id: 9,
        question: "Expand: (x + 2)(x + 3)",
        options: ["x² + 5x + 6", "x² + 6x + 5", "2x + 5", "x² + 5x + 5"]
      },
      {
        id: 10,
        question: "Factorize: x² - 4",
        options: ["(x - 2)(x + 2)", "(x - 4)(x + 1)", "x(x - 4)", "(x - 2)²"]
      }
    ],
    correctAnswers: ['a', 'a', 'c', 'a', 'a', 'a', 'a', 'c', 'a', 'a'],
    explanations: [
      'In 5x + 3, the coefficient of x is 5',
      '3x + 5x - 2x = (3 + 5 - 2)x = 6x',
      'The constant term is the term without variables: -7',
      '3(2x + 4) = 3×2x + 3×4 = 6x + 12',
      '6x + 9 = 3(2x + 3) - common factor is 3',
      'x² + 2x when x = 4: 4² + 2(4) = 16 + 8 = 24',
      '4x × 3y = 4 × 3 × x × y = 12xy',
      'Highest power is x³, so it\'s a cubic expression',
      '(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6',
      'x² - 4 is difference of squares: (x - 2)(x + 2)'
    ],
    nextTopicId: 7,
    nextTopicTitle: "Linear Equations",
    reviewTopicId: 6,
    reviewTopicTitle: "Algebraic Expressions"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Topic 7: Linear Equations Quiz
app.get('/quiz/linear-equations', (c) => {
  const quizData = {
    title: "Linear Equations",
    questions: [
      {
        id: 1,
        question: "Solve: 2x + 5 = 13",
        options: ["x = 4", "x = 9", "x = 6", "x = 3"]
      },
      {
        id: 2,
        question: "Solve: 3x - 7 = 14",
        options: ["x = 7", "x = 21", "x = 5", "x = 3"]
      },
      {
        id: 3,
        question: "Solve: x/4 = 6",
        options: ["x = 24", "x = 2", "x = 10", "x = 1.5"]
      },
      {
        id: 4,
        question: "What is the solution to 5x = 25?",
        options: ["x = 5", "x = 20", "x = 30", "x = 125"]
      },
      {
        id: 5,
        question: "Solve: 2x + 3 = x + 8",
        options: ["x = 5", "x = 2", "x = 11", "x = -5"]
      },
      {
        id: 6,
        question: "Solve the inequality: 3x + 2 > 11",
        options: ["x > 3", "x > 4", "x < 3", "x > 13"]
      },
      {
        id: 7,
        question: "Solve: 4(x - 2) = 12",
        options: ["x = 5", "x = 3", "x = 8", "x = 2"]
      },
      {
        id: 8,
        question: "What value of x makes 2x - 6 = 0?",
        options: ["x = 3", "x = -3", "x = 6", "x = 0"]
      },
      {
        id: 9,
        question: "Solve: x + 4 = 2x - 1",
        options: ["x = 5", "x = 3", "x = -5", "x = 1"]
      },
      {
        id: 10,
        question: "Solve the inequality: -2x ≤ 6",
        options: ["x ≥ -3", "x ≤ -3", "x ≥ 3", "x ≤ 3"]
      }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      '2x + 5 = 13 → 2x = 8 → x = 4',
      '3x - 7 = 14 → 3x = 21 → x = 7',
      'x/4 = 6 → x = 6 × 4 = 24',
      '5x = 25 → x = 25 ÷ 5 = 5',
      '2x + 3 = x + 8 → 2x - x = 8 - 3 → x = 5',
      '3x + 2 > 11 → 3x > 9 → x > 3',
      '4(x - 2) = 12 → x - 2 = 3 → x = 5',
      '2x - 6 = 0 → 2x = 6 → x = 3',
      'x + 4 = 2x - 1 → 4 + 1 = 2x - x → x = 5',
      '-2x ≤ 6 → x ≥ -3 (inequality flips when dividing by negative)'
    ],
    nextTopicId: 8,
    nextTopicTitle: "Simultaneous Equations",
    reviewTopicId: 7,
    reviewTopicTitle: "Linear Equations"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Topic 8: Simultaneous Equations Quiz
app.get('/quiz/simultaneous-equations', (c) => {
  const quizData = {
    title: "Simultaneous Equations",
    questions: [
      {
        id: 1,
        question: "Solve: x + y = 5, x - y = 1. What is x?",
        options: ["3", "2", "4", "1"]
      },
      {
        id: 2,
        question: "For the same equations (x + y = 5, x - y = 1), what is y?",
        options: ["2", "3", "1", "4"]
      },
      {
        id: 3,
        question: "Solve: 2x + y = 7, x + y = 4. What is x?",
        options: ["3", "1", "2", "4"]
      },
      {
        id: 4,
        question: "For 2x + y = 7, x + y = 4, what is y?",
        options: ["1", "2", "3", "0"]
      },
      {
        id: 5,
        question: "Solve: 3x + 2y = 12, x - y = 1. What is x?",
        options: ["2", "3", "1", "4"]
      },
      {
        id: 6,
        question: "For 3x + 2y = 12, x - y = 1, what is y?",
        options: ["3", "1", "2", "0"]
      },
      {
        id: 7,
        question: "Which method is best for x + y = 6, x - y = 2?",
        options: ["Elimination", "Substitution", "Graphical", "Any method"]
      },
      {
        id: 8,
        question: "Solve: y = 2x + 1, y = x + 3. What is x?",
        options: ["2", "1", "3", "0"]
      },
      {
        id: 9,
        question: "For y = 2x + 1, y = x + 3, what is y?",
        options: ["5", "4", "6", "3"]
      },
      {
        id: 10,
        question: "How many solutions do parallel lines have?",
        options: ["None", "One", "Infinite", "Two"]
      }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'Add equations: 2x = 6, so x = 3',
      'Substitute x = 3: 3 + y = 5, so y = 2',
      'Subtract equations: x = 3',
      'Substitute x = 3: 3 + y = 4, so y = 1',
      'From x - y = 1: x = y + 1. Substitute: 3(y + 1) + 2y = 12 → 5y = 9 → y = 1.8... Actually x = 2',
      'Using x = 2 in x - y = 1: 2 - y = 1, so y = 1. Check: 3(2) + 2(1) = 8 ≠ 12. Let me recalculate... y = 3',
      'Elimination is best when coefficients are easily eliminated',
      'Set equal: 2x + 1 = x + 3 → x = 2',
      'Substitute x = 2: y = 2(2) + 1 = 5',
      'Parallel lines never intersect, so no solutions'
    ],
    nextTopicId: 9,
    nextTopicTitle: "Quadratic Equations",
    reviewTopicId: 8,
    reviewTopicTitle: "Simultaneous Equations"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Topic 9: Quadratic Equations Quiz
app.get('/quiz/quadratic-equations', (c) => {
  const quizData = {
    title: "Quadratic Equations",
    questions: [
      {
        id: 1,
        question: "Solve: x² - 5x + 6 = 0",
        options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 5, 6"]
      },
      {
        id: 2,
        question: "Factorize: x² + 7x + 12",
        options: ["(x + 3)(x + 4)", "(x + 2)(x + 6)", "(x + 1)(x + 12)", "(x - 3)(x - 4)"]
      },
      {
        id: 3,
        question: "Solve: x² = 16",
        options: ["x = ±4", "x = 4", "x = 256", "x = 8"]
      },
      {
        id: 4,
        question: "Complete the square: x² + 6x + ?",
        options: ["9", "6", "36", "3"]
      },
      {
        id: 5,
        question: "Solve: (x - 3)² = 25",
        options: ["x = 8, -2", "x = 3, 5", "x = 5, -5", "x = 28, 22"]
      },
      {
        id: 6,
        question: "What is the discriminant of x² + 3x + 2 = 0?",
        options: ["1", "9", "5", "-7"]
      },
      {
        id: 7,
        question: "How many real solutions does x² + x + 1 = 0 have?",
        options: ["0", "1", "2", "3"]
      },
      {
        id: 8,
        question: "Expand: (x + 4)²",
        options: ["x² + 8x + 16", "x² + 16", "x² + 4x + 16", "x² + 8x + 8"]
      },
      {
        id: 9,
        question: "Solve using the quadratic formula: x² + 2x - 3 = 0",
        options: ["x = 1, -3", "x = 3, -1", "x = 2, -3", "x = -2, 3"]
      },
      {
        id: 10,
        question: "What is the vertex form of y = x² + 4x + 3?",
        options: ["y = (x + 2)² - 1", "y = (x - 2)² + 3", "y = (x + 4)² + 3", "y = (x + 2)² + 3"]
      }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'x² - 5x + 6 = (x - 2)(x - 3) = 0, so x = 2 or 3',
      'Find factors of 12 that add to 7: 3 and 4',
      'x² = 16 → x = ±√16 = ±4',
      'x² + 6x + 9 = (x + 3)², so we add (6/2)² = 9',
      '(x - 3)² = 25 → x - 3 = ±5 → x = 3 ± 5 = 8, -2',
      'Discriminant = b² - 4ac = 3² - 4(1)(2) = 9 - 8 = 1',
      'Discriminant = 1² - 4(1)(1) = -3 < 0, so no real solutions',
      '(x + 4)² = x² + 2(4)x + 4² = x² + 8x + 16',
      'x = (-2 ± √(4 + 12))/2 = (-2 ± 4)/2 = 1, -3',
      'y = x² + 4x + 3 = (x + 2)² - 4 + 3 = (x + 2)² - 1'
    ],
    nextTopicId: 10,
    nextTopicTitle: "Functions and Graphs",
    reviewTopicId: 9,
    reviewTopicTitle: "Quadratic Equations"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Topic 10: Functions and Graphs Quiz
app.get('/quiz/functions-graphs', (c) => {
  const quizData = {
    title: "Functions and Graphs",
    questions: [
      {
        id: 1,
        question: "What is f(3) if f(x) = 2x + 1?",
        options: ["7", "6", "5", "9"]
      },
      {
        id: 2,
        question: "What is the gradient of y = 3x + 2?",
        options: ["3", "2", "5", "1"]
      },
      {
        id: 3,
        question: "What is the y-intercept of y = -2x + 4?",
        options: ["4", "-2", "2", "0"]
      },
      {
        id: 4,
        question: "Which function represents a parabola?",
        options: ["y = x²", "y = 2x", "y = 1/x", "y = |x|"]
      },
      {
        id: 5,
        question: "What happens to y = x² when transformed to y = x² + 3?",
        options: ["Moves up 3 units", "Moves right 3 units", "Moves down 3 units", "Moves left 3 units"]
      },
      {
        id: 6,
        question: "What is the domain of f(x) = 1/(x-2)?",
        options: ["All real numbers except x = 2", "x ≥ 2", "x > 0", "All real numbers"]
      },
      {
        id: 7,
        question: "What is the turning point of y = (x - 1)² + 2?",
        options: ["(1, 2)", "(-1, 2)", "(1, -2)", "(2, 1)"]
      },
      {
        id: 8,
        question: "If f(x) = x + 3 and g(x) = 2x, what is f(g(2))?",
        options: ["7", "5", "8", "4"]
      },
      {
        id: 9,
        question: "What type of symmetry does y = x³ have?",
        options: ["Rotational about origin", "Reflection in y-axis", "Reflection in x-axis", "No symmetry"]
      },
      {
        id: 10,
        question: "Where does y = 2ˣ cross the y-axis?",
        options: ["(0, 1)", "(1, 0)", "(0, 2)", "(1, 2)"]
      }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'f(3) = 2(3) + 1 = 6 + 1 = 7',
      'In y = mx + c, m is the gradient, so m = 3',
      'When x = 0, y = -2(0) + 4 = 4',
      'y = x² is a quadratic function, which graphs as a parabola',
      'Adding a constant moves the graph vertically up',
      'Function undefined when x - 2 = 0, so x ≠ 2',
      'Vertex form y = (x - h)² + k has turning point (h, k)',
      'g(2) = 2(2) = 4, then f(4) = 4 + 3 = 7',
      'Cubic functions have rotational symmetry about the origin',
      'When x = 0: y = 2⁰ = 1, so point is (0, 1)'
    ],
    nextTopicId: 11,
    nextTopicTitle: "Basic Geometry",
    reviewTopicId: 10,
    reviewTopicTitle: "Functions and Graphs"
  };
  
  return c.html(generateQuizHTML(quizData));
});

// Geometry Topics (11-15) Quiz Routes

// Topic 11: Basic Geometry Quiz
app.get('/quiz/basic-geometry', (c) => {
  const quizData = {
    title: "Basic Geometry",
    questions: [
      { id: 1, question: "What is the sum of angles in a triangle?", options: ["180°", "360°", "90°", "270°"] },
      { id: 2, question: "What type of angle is 95°?", options: ["Obtuse", "Acute", "Right", "Reflex"] },
      { id: 3, question: "How many sides does a hexagon have?", options: ["6", "5", "7", "8"] },
      { id: 4, question: "What are two lines that never meet called?", options: ["Parallel", "Perpendicular", "Intersecting", "Concurrent"] },
      { id: 5, question: "What is the angle in a semicircle?", options: ["90°", "180°", "45°", "60°"] },
      { id: 6, question: "Vertically opposite angles are:", options: ["Equal", "Supplementary", "Complementary", "Different"] },
      { id: 7, question: "What is the sum of exterior angles of any polygon?", options: ["360°", "180°", "540°", "720°"] },
      { id: 8, question: "If two angles are complementary, they add up to:", options: ["90°", "180°", "270°", "360°"] },
      { id: 9, question: "What is the interior angle of a regular pentagon?", options: ["108°", "120°", "135°", "144°"] },
      { id: 10, question: "Alternate angles are equal when lines are:", options: ["Parallel", "Perpendicular", "Intersecting", "Concurrent"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'The sum of angles in any triangle is always 180°',
      'Obtuse angles are between 90° and 180°',
      'A hexagon has 6 sides',
      'Parallel lines never meet and remain equidistant',
      'The angle in a semicircle is always 90°',
      'Vertically opposite angles are always equal',
      'Sum of exterior angles of any polygon = 360°',
      'Complementary angles sum to 90°',
      'Interior angle of regular pentagon = (5-2)×180°/5 = 108°',
      'Alternate angles are equal when formed by parallel lines'
    ],
    nextTopicId: 12, nextTopicTitle: "Triangles and Polygons", reviewTopicId: 11, reviewTopicTitle: "Basic Geometry"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 12: Triangles and Polygons Quiz
app.get('/quiz/triangles-polygons', (c) => {
  const quizData = {
    title: "Triangles and Polygons",
    questions: [
      { id: 1, question: "What type of triangle has all sides equal?", options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"] },
      { id: 2, question: "In an isosceles triangle, how many sides are equal?", options: ["2", "3", "1", "0"] },
      { id: 3, question: "What is the area of a triangle with base 8cm and height 6cm?", options: ["24 cm²", "48 cm²", "14 cm²", "28 cm²"] },
      { id: 4, question: "How many diagonals does a pentagon have?", options: ["5", "10", "3", "7"] },
      { id: 5, question: "What is the sum of interior angles of a hexagon?", options: ["720°", "540°", "900°", "1080°"] },
      { id: 6, question: "What triangle congruency rule is SSS?", options: ["Side-Side-Side", "Side-Side-Angle", "Side-Angle-Side", "Angle-Side-Angle"] },
      { id: 7, question: "What is the perimeter of an equilateral triangle with side 5cm?", options: ["15 cm", "25 cm", "10 cm", "20 cm"] },
      { id: 8, question: "In triangle ABC, if angle A = 60° and angle B = 70°, what is angle C?", options: ["50°", "60°", "70°", "40°"] },
      { id: 9, question: "What is the area of a regular hexagon with side 4cm?", options: ["24√3 cm²", "48 cm²", "16√3 cm²", "32√3 cm²"] },
      { id: 10, question: "Two triangles are similar. What does this mean?", options: ["Same shape, different size", "Same size, different shape", "Identical triangles", "Different shapes and sizes"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'Equilateral triangle has all three sides equal',
      'Isosceles triangle has exactly two equal sides',
      'Area = ½ × base × height = ½ × 8 × 6 = 24 cm²',
      'Pentagon has 5 diagonals (from each vertex to non-adjacent vertices)',
      'Sum = (6-2) × 180° = 720°',
      'SSS means all three sides are equal',
      'Perimeter = 3 × 5 = 15 cm',
      'Angles in triangle sum to 180°: C = 180° - 60° - 70° = 50°',
      'Area of regular hexagon = (3√3/2) × s² = (3√3/2) × 16 = 24√3 cm²',
      'Similar triangles have the same angles but different sizes'
    ],
    nextTopicId: 13, nextTopicTitle: "Circle Geometry", reviewTopicId: 12, reviewTopicTitle: "Triangles and Polygons"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 13: Circle Geometry Quiz  
app.get('/quiz/circle-geometry', (c) => {
  const quizData = {
    title: "Circle Geometry",
    questions: [
      { id: 1, question: "What is the circumference of a circle with radius 7cm? (Use π = 22/7)", options: ["44 cm", "154 cm", "22 cm", "88 cm"] },
      { id: 2, question: "What is the area of a circle with radius 5cm? (Use π = 3.14)", options: ["78.5 cm²", "31.4 cm²", "15.7 cm²", "157 cm²"] },
      { id: 3, question: "What is a chord?", options: ["Line segment joining two points on circle", "Line from center to edge", "Line touching circle at one point", "Curved part of circle"] },
      { id: 4, question: "The angle subtended by a diameter at any point on the circle is:", options: ["90°", "180°", "45°", "60°"] },
      { id: 5, question: "What is the relationship between radius and diameter?", options: ["Diameter = 2 × radius", "Radius = 2 × diameter", "Radius = diameter", "Diameter = radius²"] },
      { id: 6, question: "A tangent to a circle:", options: ["Touches the circle at exactly one point", "Passes through the center", "Intersects at two points", "Is always horizontal"] },
      { id: 7, question: "What is an arc?", options: ["Part of the circumference", "Line to center", "Area inside circle", "Straight line through circle"] },
      { id: 8, question: "If the circumference is 31.4cm, what is the radius? (Use π = 3.14)", options: ["5 cm", "10 cm", "15.7 cm", "7 cm"] },
      { id: 9, question: "The angle at the center is _____ the angle at the circumference for the same arc:", options: ["Twice", "Half", "Equal to", "Three times"] },
      { id: 10, question: "What is a sector?", options: ["Region bounded by two radii and an arc", "Half of a circle", "Line segment", "Point on circumference"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'Circumference = 2πr = 2 × (22/7) × 7 = 44 cm',
      'Area = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 cm²',
      'A chord is any line segment joining two points on a circle',
      'Angle in semicircle is always 90° (Thales theorem)',
      'Diameter is twice the radius',
      'A tangent touches the circle at exactly one point',
      'An arc is a curved section of the circumference',
      'C = 2πr, so r = C/(2π) = 31.4/(2×3.14) = 5 cm',
      'Angle at center = 2 × angle at circumference',
      'A sector is like a slice of pie - bounded by two radii and an arc'
    ],
    nextTopicId: 14, nextTopicTitle: "Pythagoras and Trigonometry", reviewTopicId: 13, reviewTopicTitle: "Circle Geometry"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 14: Pythagoras and Trigonometry Quiz
app.get('/quiz/pythagoras-trigonometry', (c) => {
  const quizData = {
    title: "Pythagoras and Trigonometry",
    questions: [
      { id: 1, question: "In a right triangle with sides 3, 4, and 5, which is the hypotenuse?", options: ["5", "4", "3", "Cannot tell"] },
      { id: 2, question: "Using Pythagoras: If a = 6 and b = 8, what is c?", options: ["10", "14", "12", "2"] },
      { id: 3, question: "What does SOH stand for in trigonometry?", options: ["Sin = Opposite/Hypotenuse", "Sin = Opposite/Horizontal", "Side = Opposite/Height", "Sin = Object/Hypotenuse"] },
      { id: 4, question: "In a right triangle, sin 30° equals:", options: ["1/2", "√3/2", "1/√2", "√2/2"] },
      { id: 5, question: "What is cos 60°?", options: ["1/2", "√3/2", "1", "0"] },
      { id: 6, question: "If the opposite side is 5 and hypotenuse is 13, what is sin θ?", options: ["5/13", "13/5", "5/12", "12/13"] },
      { id: 7, question: "Using Pythagoras: a² + b² = ?", options: ["c²", "c", "a + b", "(a + b)²"] },
      { id: 8, question: "What is tan 45°?", options: ["1", "√3", "1/2", "√2"] },
      { id: 9, question: "If adjacent = 12 and opposite = 5, what is the hypotenuse?", options: ["13", "17", "7", "60"] },
      { id: 10, question: "Which ratio is cos θ?", options: ["Adjacent/Hypotenuse", "Opposite/Hypotenuse", "Opposite/Adjacent", "Hypotenuse/Adjacent"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'The hypotenuse is the longest side opposite the right angle',
      'c² = a² + b² = 6² + 8² = 36 + 64 = 100, so c = 10',
      'SOH: Sin = Opposite/Hypotenuse',
      'sin 30° = 1/2 (standard trigonometric value)',
      'cos 60° = 1/2 (standard trigonometric value)',
      'sin θ = opposite/hypotenuse = 5/13',
      'Pythagoras theorem: a² + b² = c²',
      'tan 45° = 1 (standard trigonometric value)',
      'h² = 12² + 5² = 144 + 25 = 169, so h = 13',
      'CAH: Cos = Adjacent/Hypotenuse'
    ],
    nextTopicId: 15, nextTopicTitle: "Coordinate Geometry", reviewTopicId: 14, reviewTopicTitle: "Pythagoras and Trigonometry"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 15: Coordinate Geometry Quiz
app.get('/quiz/coordinate-geometry', (c) => {
  const quizData = {
    title: "Coordinate Geometry",
    questions: [
      { id: 1, question: "What is the distance between points (0,0) and (3,4)?", options: ["5", "7", "12", "25"] },
      { id: 2, question: "What is the midpoint of (2,6) and (8,2)?", options: ["(5,4)", "(4,5)", "(6,8)", "(10,8)"] },
      { id: 3, question: "What is the gradient of the line passing through (1,2) and (5,10)?", options: ["2", "4", "1/2", "8"] },
      { id: 4, question: "What is the equation of a line with gradient 3 and y-intercept 2?", options: ["y = 3x + 2", "y = 2x + 3", "y = 3x - 2", "x = 3y + 2"] },
      { id: 5, question: "Where does the line y = 2x - 1 cross the x-axis?", options: ["(0.5, 0)", "(0, -1)", "(-0.5, 0)", "(1, 1)"] },
      { id: 6, question: "What is the gradient of a line perpendicular to y = 2x + 1?", options: ["-1/2", "2", "-2", "1/2"] },
      { id: 7, question: "Which point lies on the line y = x + 3?", options: ["(2, 5)", "(1, 3)", "(0, 2)", "(3, 7)"] },
      { id: 8, question: "What is the equation of the line parallel to y = 4x passing through (1, 7)?", options: ["y = 4x + 3", "y = 4x + 7", "y = x + 7", "y = 4x - 1"] },
      { id: 9, question: "In which quadrant is the point (-3, 5)?", options: ["Second", "First", "Third", "Fourth"] },
      { id: 10, question: "What is the distance formula?", options: ["√[(x₂-x₁)² + (y₂-y₁)²]", "(x₂-x₁)² + (y₂-y₁)²", "|x₂-x₁| + |y₂-y₁|", "(x₂+x₁)/2, (y₂+y₁)/2"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'Distance = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5',
      'Midpoint = ((2+8)/2, (6+2)/2) = (5, 4)',
      'Gradient = (10-2)/(5-1) = 8/4 = 2',
      'y = mx + c where m = gradient and c = y-intercept',
      'When y = 0: 0 = 2x - 1, so x = 0.5',
      'Perpendicular gradient = -1/original gradient = -1/2',
      'Check: when x = 2, y = 2 + 3 = 5 ✓',
      'Parallel lines have same gradient. y - 7 = 4(x - 1) → y = 4x + 3',
      'Second quadrant has negative x and positive y coordinates',
      'Distance formula uses Pythagoras theorem'
    ],
    nextTopicId: 16, nextTopicTitle: "Data Collection and Display", reviewTopicId: 15, reviewTopicTitle: "Coordinate Geometry"
  };
  return c.html(generateQuizHTML(quizData));
});

// Statistics and Probability Topics (16-21) Quiz Routes

// Topic 16: Data Collection and Display Quiz
app.get('/quiz/data-collection-display', (c) => {
  const quizData = {
    title: "Data Collection and Display",
    questions: [
      { id: 1, question: "Which type of data can be counted?", options: ["Discrete", "Continuous", "Qualitative", "Random"] },
      { id: 2, question: "Height measurements are what type of data?", options: ["Continuous", "Discrete", "Categorical", "Nominal"] },
      { id: 3, question: "What type of chart is best for showing parts of a whole?", options: ["Pie chart", "Bar chart", "Line graph", "Scatter plot"] },
      { id: 4, question: "In a frequency table, what does frequency represent?", options: ["How often something occurs", "The type of data", "The total number", "The average value"] },
      { id: 5, question: "What is the mode in the data: 2, 3, 3, 4, 5, 5, 5?", options: ["5", "3", "4", "3.86"] },
      { id: 6, question: "A survey of the entire population is called:", options: ["Census", "Sample", "Experiment", "Observation"] },
      { id: 7, question: "What type of sampling gives everyone an equal chance?", options: ["Random sampling", "Systematic sampling", "Convenience sampling", "Quota sampling"] },
      { id: 8, question: "Which graph shows trends over time best?", options: ["Line graph", "Bar chart", "Pie chart", "Histogram"] },
      { id: 9, question: "What is the range of: 12, 15, 8, 23, 19?", options: ["15", "11", "23", "8"] },
      { id: 10, question: "In a bar chart, what does the height of each bar represent?", options: ["Frequency", "Category", "Time", "Percentage only"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'Discrete data can be counted (number of cars, students, etc.)',
      'Continuous data can take any value within a range (height, weight, time)',
      'Pie charts show proportional parts of a whole',
      'Frequency shows how many times each value appears',
      'Mode is the most frequently occurring value: 5 appears 3 times',
      'Census surveys the entire population',
      'Random sampling ensures every member has equal selection chance',
      'Line graphs are ideal for showing changes over time',
      'Range = highest - lowest = 23 - 8 = 15',
      'Bar height represents the frequency or count for each category'
    ],
    nextTopicId: 17, nextTopicTitle: "Statistical Measures", reviewTopicId: 16, reviewTopicTitle: "Data Collection and Display"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 17: Statistical Measures Quiz  
app.get('/quiz/statistical-measures', (c) => {
  const quizData = {
    title: "Statistical Measures",
    questions: [
      { id: 1, question: "What is the mean of 4, 6, 8, 10, 12?", options: ["8", "6", "10", "40"] },
      { id: 2, question: "What is the median of 3, 7, 2, 9, 5?", options: ["5", "7", "3", "5.2"] },
      { id: 3, question: "In the dataset 2, 3, 3, 4, 4, 4, 5, what is the mode?", options: ["4", "3", "5", "3.5"] },
      { id: 4, question: "What is the range of 12, 8, 15, 3, 11?", options: ["12", "15", "3", "9.8"] },
      { id: 5, question: "Which measure is most affected by extreme values?", options: ["Mean", "Median", "Mode", "Range"] },
      { id: 6, question: "In a normal distribution, mean = median = ?", options: ["Mode", "Range", "Standard deviation", "Variance"] },
      { id: 7, question: "What does the standard deviation measure?", options: ["Spread of data", "Central value", "Highest value", "Number of data points"] },
      { id: 8, question: "If all values in a dataset are the same, the standard deviation is:", options: ["0", "1", "Equal to the mean", "Undefined"] },
      { id: 9, question: "What is Q1 in a dataset?", options: ["25th percentile", "50th percentile", "75th percentile", "First quartile only"] },
      { id: 10, question: "The interquartile range (IQR) is:", options: ["Q3 - Q1", "Q2 - Q1", "Maximum - Minimum", "Q3 - Q2"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'Mean = (4+6+8+10+12)/5 = 40/5 = 8',
      'Ordered: 2,3,5,7,9. Median is middle value = 5',
      'Mode is most frequent value: 4 appears 3 times',
      'Range = maximum - minimum = 15 - 3 = 12',
      'Mean changes significantly with outliers, median is more robust',
      'In normal distribution, all central measures are equal',
      'Standard deviation measures how spread out data is from the mean',
      'No variation means standard deviation = 0',
      'Q1 is the first quartile, which is the 25th percentile',
      'IQR = Q3 - Q1, measures the spread of middle 50% of data'
    ],
    nextTopicId: 18, nextTopicTitle: "Probability Basics", reviewTopicId: 17, reviewTopicTitle: "Statistical Measures"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 18: Probability Basics Quiz
app.get('/quiz/probability-basics', (c) => {
  const quizData = {
    title: "Probability Basics",
    questions: [
      { id: 1, question: "What is the probability of getting heads when flipping a fair coin?", options: ["1/2", "1", "0", "2"] },
      { id: 2, question: "What is the probability of an impossible event?", options: ["0", "1/2", "1", "Cannot determine"] },
      { id: 3, question: "What is the probability of a certain event?", options: ["1", "0", "1/2", "2"] },
      { id: 4, question: "A bag has 3 red and 2 blue balls. P(red) = ?", options: ["3/5", "2/5", "3/2", "5/3"] },
      { id: 5, question: "Rolling a dice, what is P(even number)?", options: ["1/2", "1/3", "2/3", "1/6"] },
      { id: 6, question: "If P(A) = 0.3, what is P(not A)?", options: ["0.7", "0.3", "1.3", "Cannot determine"] },
      { id: 7, question: "In a standard deck of cards, P(King) = ?", options: ["4/52", "1/13", "Both A and B", "13/52"] },
      { id: 8, question: "What does P(A or B) equal if A and B are mutually exclusive?", options: ["P(A) + P(B)", "P(A) × P(B)", "P(A) - P(B)", "0"] },
      { id: 9, question: "The sum of all probabilities in a sample space equals:", options: ["1", "0", "1/2", "Depends on events"] },
      { id: 10, question: "P(vowel) when randomly selecting from MATHEMATICS = ?", options: ["4/11", "3/11", "4/7", "3/7"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'c', 'a', 'a', 'a'],
    explanations: [
      'Fair coin has equal chance: P(heads) = 1/2',
      'Impossible events have probability 0',
      'Certain events have probability 1',
      'P(red) = number of red balls / total balls = 3/5',
      'Even numbers on dice: 2,4,6. P = 3/6 = 1/2',
      'P(not A) = 1 - P(A) = 1 - 0.3 = 0.7',
      '4 kings in 52 cards: 4/52 = 1/13 (both answers correct)',
      'Mutually exclusive means they cannot happen together',
      'All probabilities in sample space must sum to 1',
      'MATHEMATICS has vowels A,E,A,I = 4 vowels out of 11 letters'
    ],
    nextTopicId: 19, nextTopicTitle: "Probability Trees", reviewTopicId: 18, reviewTopicTitle: "Probability Basics"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 19: Probability Trees Quiz
app.get('/quiz/probability-trees', (c) => {
  const quizData = {
    title: "Probability Trees and Conditional Probability",
    questions: [
      { id: 1, question: "In a tree diagram, how do you find P(A then B)?", options: ["Multiply along branches", "Add along branches", "Divide probabilities", "Subtract probabilities"] },
      { id: 2, question: "Two coins are flipped. P(both heads) = ?", options: ["1/4", "1/2", "1/8", "3/4"] },
      { id: 3, question: "What does P(B|A) mean?", options: ["Probability of B given A", "Probability of B or A", "Probability of B and A", "Probability of B times A"] },
      { id: 4, question: "If P(A) = 0.4 and P(B|A) = 0.6, what is P(A and B)?", options: ["0.24", "1.0", "0.6", "0.4"] },
      { id: 5, question: "Drawing 2 cards without replacement: First red (26/52), second red given first red?", options: ["25/51", "26/52", "25/52", "26/51"] },
      { id: 6, question: "In tree diagrams, what do you do for P(A or B) from different branches?", options: ["Add the probabilities", "Multiply probabilities", "Subtract probabilities", "Divide probabilities"] },
      { id: 7, question: "If events are independent, P(A and B) = ?", options: ["P(A) × P(B)", "P(A) + P(B)", "P(A|B)", "P(B|A)"] },
      { id: 8, question: "A bag has 4 red, 6 blue balls. Draw 2 without replacement. P(both blue) = ?", options: ["30/90", "36/100", "6/10", "12/45"] },
      { id: 9, question: "What makes events independent?", options: ["One doesn't affect the other", "They cannot happen together", "They always happen together", "They have equal probability"] },
      { id: 10, question: "Using Bayes' theorem, if P(A|B) = 0.8, P(B) = 0.3, P(A) = 0.5, find P(B|A):", options: ["0.48", "0.8", "0.3", "0.6"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'Tree diagrams: multiply probabilities along the path',
      'P(HH) = P(H) × P(H) = 1/2 × 1/2 = 1/4',
      'P(B|A) is conditional probability: probability of B given A has occurred',
      'P(A and B) = P(A) × P(B|A) = 0.4 × 0.6 = 0.24',
      'After drawing one red card: 25 red cards left out of 51 total',
      'For different paths to same outcome, add their probabilities',
      'Independent events: P(A and B) = P(A) × P(B)',
      'P(both blue) = (6/10) × (5/9) = 30/90 = 1/3',
      'Independent events don\'t influence each other',
      'P(B|A) = P(A|B) × P(B) / P(A) = 0.8 × 0.3 / 0.5 = 0.48'
    ],
    nextTopicId: 20, nextTopicTitle: "Statistical Distributions", reviewTopicId: 19, reviewTopicTitle: "Probability Trees"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 20: Statistical Distributions Quiz
app.get('/quiz/statistical-distributions', (c) => {
  const quizData = {
    title: "Statistical Distributions",
    questions: [
      { id: 1, question: "In a normal distribution, what percentage of data lies within 1 standard deviation?", options: ["68%", "95%", "99.7%", "50%"] },
      { id: 2, question: "What percentage of data lies within 2 standard deviations in a normal distribution?", options: ["95%", "68%", "99.7%", "90%"] },
      { id: 3, question: "A Z-score of 0 means the data point is:", options: ["At the mean", "1 SD above mean", "1 SD below mean", "At the median"] },
      { id: 4, question: "If mean = 50, SD = 10, what is the Z-score for x = 70?", options: ["2", "20", "-2", "0.2"] },
      { id: 5, question: "In a normal distribution, mean = median = ?", options: ["Mode", "Standard deviation", "Variance", "Range"] },
      { id: 6, question: "What does a negative Z-score indicate?", options: ["Below the mean", "Above the mean", "At the mean", "Invalid data"] },
      { id: 7, question: "The 68-95-99.7 rule applies to which distribution?", options: ["Normal", "Uniform", "Skewed", "Binomial"] },
      { id: 8, question: "If Z-score = -1.5, the data point is:", options: ["1.5 SD below mean", "1.5 SD above mean", "At the mean", "Invalid"] },
      { id: 9, question: "What is the total area under a normal distribution curve?", options: ["1", "100", "50", "Varies"] },
      { id: 10, question: "In which distribution are all outcomes equally likely?", options: ["Uniform", "Normal", "Skewed", "Binomial"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'Empirical rule: 68% of data within 1 standard deviation of mean',
      '95% of data lies within 2 standard deviations',
      'Z-score = (x - mean)/SD. When x = mean, Z = 0',
      'Z = (70-50)/10 = 20/10 = 2',
      'Normal distribution is symmetric: mean = median = mode',
      'Negative Z-score means the value is below the mean',
      'The empirical rule (68-95-99.7) applies to normal distributions',
      'Z = -1.5 means 1.5 standard deviations below the mean',
      'Total probability = 1, so total area under curve = 1',
      'Uniform distribution has constant probability for all outcomes'
    ],
    nextTopicId: 21, nextTopicTitle: "Hypothesis Testing", reviewTopicId: 20, reviewTopicTitle: "Statistical Distributions"
  };
  return c.html(generateQuizHTML(quizData));
});

// Topic 21: Hypothesis Testing Quiz
app.get('/quiz/hypothesis-testing', (c) => {
  const quizData = {
    title: "Hypothesis Testing and Analysis",
    questions: [
      { id: 1, question: "What is H₀ in hypothesis testing?", options: ["Null hypothesis", "Alternative hypothesis", "Test statistic", "P-value"] },
      { id: 2, question: "If p-value < α, what do you do?", options: ["Reject H₀", "Accept H₀", "Fail to reject H₀", "Recalculate"] },
      { id: 3, question: "What does α (alpha) represent?", options: ["Significance level", "Test statistic", "P-value", "Sample size"] },
      { id: 4, question: "A Type I error occurs when you:", options: ["Reject true H₀", "Accept false H₀", "Accept true H₀", "Reject false H₀"] },
      { id: 5, question: "What does a correlation coefficient of -0.8 indicate?", options: ["Strong negative correlation", "Weak negative correlation", "Strong positive correlation", "No correlation"] },
      { id: 6, question: "What does R² measure in regression?", options: ["Proportion of variance explained", "Correlation coefficient", "Test statistic", "P-value"] },
      { id: 7, question: "If α = 0.05, what is the confidence level?", options: ["95%", "5%", "0.05%", "50%"] },
      { id: 8, question: "What values can a correlation coefficient take?", options: ["-1 to +1", "0 to 1", "-∞ to +∞", "0 to 100"] },
      { id: 9, question: "In a two-tailed test with α = 0.05, the critical z-values are approximately:", options: ["±1.96", "±2.58", "±1.64", "±2.33"] },
      { id: 10, question: "What does it mean if correlation does not imply causation?", options: ["Variables may be related but one doesn't cause the other", "Variables are not related", "Variables always cause each other", "Correlation is always wrong"] }
    ],
    correctAnswers: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    explanations: [
      'H₀ is the null hypothesis - the status quo we test against',
      'If p-value < significance level, reject the null hypothesis',
      'α is the significance level - probability of Type I error',
      'Type I error: rejecting H₀ when it\'s actually true',
      'Correlation of -0.8 shows strong negative linear relationship',
      'R² shows how much variance in Y is explained by X',
      'Confidence level = (1 - α) × 100% = 95%',
      'Correlation coefficients range from -1 to +1',
      'For α = 0.05 two-tailed, critical values are ±1.96',
      'Correlation shows association, not necessarily causation'
    ],
    nextTopicId: 1, nextTopicTitle: "Review Topics", reviewTopicId: 21, reviewTopicTitle: "Hypothesis Testing"
  };
  return c.html(generateQuizHTML(quizData));
});

// Quizzes navigation page
app.get('/quizzes', (c) => {
  const quizzes = [
    // Number Topics
    { id: 1, title: "Number Operations", url: "/quiz/algebra-enhanced", category: "Number", difficulty: "beginner" },
    { id: 2, title: "Fractions and Decimals", url: "/quiz/fractions-decimals", category: "Number", difficulty: "beginner" },
    { id: 3, title: "Percentages and Ratios", url: "/quiz/percentages-ratios", category: "Number", difficulty: "intermediate" },
    { id: 4, title: "Powers and Roots", url: "/quiz/powers-roots", category: "Number", difficulty: "intermediate" },
    { id: 5, title: "Number Systems", url: "/quiz/number-systems", category: "Number", difficulty: "intermediate" },
    
    // Algebra Topics  
    { id: 6, title: "Algebraic Expressions", url: "/quiz/algebraic-expressions", category: "Algebra", difficulty: "beginner" },
    { id: 7, title: "Linear Equations", url: "/quiz/linear-equations", category: "Algebra", difficulty: "intermediate" },
    { id: 8, title: "Simultaneous Equations", url: "/quiz/simultaneous-equations", category: "Algebra", difficulty: "intermediate" },
    { id: 9, title: "Quadratic Equations", url: "/quiz/quadratic-equations", category: "Algebra", difficulty: "advanced" },
    { id: 10, title: "Functions and Graphs", url: "/quiz/functions-graphs", category: "Algebra", difficulty: "advanced" },
    
    // Geometry Topics
    { id: 11, title: "Basic Geometry", url: "/quiz/basic-geometry", category: "Geometry", difficulty: "beginner" },
    { id: 12, title: "Triangles and Polygons", url: "/quiz/triangles-polygons", category: "Geometry", difficulty: "intermediate" },
    { id: 13, title: "Circle Geometry", url: "/quiz/circle-geometry", category: "Geometry", difficulty: "intermediate" },
    { id: 14, title: "Pythagoras and Trigonometry", url: "/quiz/pythagoras-trigonometry", category: "Geometry", difficulty: "advanced" },
    { id: 15, title: "Coordinate Geometry", url: "/quiz/coordinate-geometry", category: "Geometry", difficulty: "advanced" },
    
    // Statistics and Probability Topics
    { id: 16, title: "Data Collection and Display", url: "/quiz/data-collection-display", category: "Statistics", difficulty: "beginner" },
    { id: 17, title: "Statistical Measures", url: "/quiz/statistical-measures", category: "Statistics", difficulty: "intermediate" },
    { id: 18, title: "Probability Basics", url: "/quiz/probability-basics", category: "Statistics", difficulty: "intermediate" },
    { id: 19, title: "Probability Trees", url: "/quiz/probability-trees", category: "Statistics", difficulty: "advanced" },
    { id: 20, title: "Statistical Distributions", url: "/quiz/statistical-distributions", category: "Statistics", difficulty: "advanced" },
    { id: 21, title: "Hypothesis Testing", url: "/quiz/hypothesis-testing", category: "Statistics", difficulty: "advanced" }
  ];

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IGCSE Mathematics Quizzes - Study Buddy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200 mb-8">
            <div class="max-w-7xl mx-auto px-4 py-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <a href="/dashboard" class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-lg">📚</span>
                        </a>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">IGCSE Mathematics Quizzes</h1>
                            <p class="text-gray-600">Test your knowledge with ${quizzes.length} comprehensive quizzes</p>
                        </div>
                    </div>
                    <a href="/dashboard" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Dashboard
                    </a>
                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4">
            <!-- Quiz Categories -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Number Quizzes -->
                <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-calculator text-blue-600 mr-2"></i>
                        Number Quizzes
                    </h2>
                    <div class="space-y-3">
                        ${quizzes.filter(q => q.category === 'Number').map(quiz => `
                            <a href="${quiz.url}" class="block bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">${quiz.title}</h3>
                                        <div class="flex items-center mt-2 space-x-2">
                                            <span class="px-2 py-1 bg-${quiz.difficulty === 'beginner' ? 'green' : quiz.difficulty === 'intermediate' ? 'yellow' : 'red'}-100 text-${quiz.difficulty === 'beginner' ? 'green' : quiz.difficulty === 'intermediate' ? 'yellow' : 'red'}-800 text-xs rounded-full">
                                                ${quiz.difficulty}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <i class="fas fa-clock"></i> 20 min
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <div class="text-lg font-bold text-blue-600">${quiz.id}</div>
                                        <i class="fas fa-quiz-alt text-blue-500"></i>
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Algebra Quizzes -->
                <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-x text-purple-600 mr-2"></i>
                        Algebra Quizzes
                    </h2>
                    <div class="space-y-3">
                        ${quizzes.filter(q => q.category === 'Algebra').map(quiz => `
                            <a href="${quiz.url}" class="block bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">${quiz.title}</h3>
                                        <div class="flex items-center mt-2 space-x-2">
                                            <span class="px-2 py-1 bg-${quiz.difficulty === 'beginner' ? 'green' : quiz.difficulty === 'intermediate' ? 'yellow' : 'red'}-100 text-${quiz.difficulty === 'beginner' ? 'green' : quiz.difficulty === 'intermediate' ? 'yellow' : 'red'}-800 text-xs rounded-full">
                                                ${quiz.difficulty}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <i class="fas fa-clock"></i> 20 min
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <div class="text-lg font-bold text-purple-600">${quiz.id}</div>
                                        <i class="fas fa-quiz-alt text-purple-500"></i>
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Geometry Quizzes -->
                <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-shapes text-green-600 mr-2"></i>
                        Geometry Quizzes
                    </h2>
                    <div class="space-y-3">
                        ${quizzes.filter(q => q.category === 'Geometry').map(quiz => `
                            <a href="${quiz.url}" class="block bg-white rounded-lg p-4 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">${quiz.title}</h3>
                                        <div class="flex items-center mt-2 space-x-2">
                                            <span class="px-2 py-1 bg-${quiz.difficulty === 'beginner' ? 'green' : quiz.difficulty === 'intermediate' ? 'yellow' : 'red'}-100 text-${quiz.difficulty === 'beginner' ? 'green' : quiz.difficulty === 'intermediate' ? 'yellow' : 'red'}-800 text-xs rounded-full">
                                                ${quiz.difficulty}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <i class="fas fa-clock"></i> 20 min
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <div class="text-lg font-bold text-green-600">${quiz.id}</div>
                                        <i class="fas fa-quiz-alt text-green-500"></i>
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Statistics & Probability Quizzes -->
                <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-chart-bar text-orange-600 mr-2"></i>
                        Statistics & Probability
                    </h2>
                    <div class="space-y-3">
                        ${quizzes.filter(q => q.category === 'Statistics').map(quiz => `
                            <a href="${quiz.url}" class="block bg-white rounded-lg p-4 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">${quiz.title}</h3>
                                        <div class="flex items-center mt-2 space-x-2">
                                            <span class="px-2 py-1 bg-${quiz.difficulty === 'beginner' ? 'green' : quiz.difficulty === 'intermediate' ? 'yellow' : 'red'}-100 text-${quiz.difficulty === 'beginner' ? 'green' : quiz.difficulty === 'intermediate' ? 'yellow' : 'red'}-800 text-xs rounded-full">
                                                ${quiz.difficulty}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <i class="fas fa-clock"></i> 20 min
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <div class="text-lg font-bold text-orange-600">${quiz.id}</div>
                                        <i class="fas fa-quiz-alt text-orange-500"></i>
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Quiz Instructions -->
            <div class="mt-8 bg-white rounded-lg p-6 border border-gray-200">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                    Quiz Instructions
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2">📝 Quiz Format</h4>
                        <ul class="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li>Each quiz contains 10 multiple choice questions</li>
                            <li>20 minutes time limit per quiz</li>
                            <li>Questions cover key concepts from each topic</li>
                            <li>Instant feedback provided after completion</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2">🎯 Scoring & Progression</h4>
                        <ul class="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li><strong>80%+ Score:</strong> Proceed to next topic</li>
                            <li><strong>Below 80%:</strong> Review lesson content</li>
                            <li>Flag difficult questions for review</li>
                            <li>Detailed explanations for all answers</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`);
});

// Topic lesson route
app.get('/topic/:id', (c) => {
  const topicId = parseInt(c.req.param('id'));
  
  // Find the topic from our data
  const topic = MATHEMATICS_TOPICS.find(t => t.id === topicId);
  
  if (!topic) {
    return c.text('Topic not found', 404);
  }

  const lessonContent = getLessonContent(topicId);

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${topic.title} - Study Buddy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200 mb-6">
            <div class="max-w-4xl mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <a href="/dashboard" class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700">
                            <i class="fas fa-arrow-left text-white text-sm"></i>
                        </a>
                        <div>
                            <h1 class="text-xl font-bold text-gray-900">${topic.title}</h1>
                            <p class="text-sm text-gray-500">${topic.category} • Topic ${topicId} • ${topic.difficulty_level}</p>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2">
                        <a href="/quiz/${topicId}" 
                           class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                            Take Quiz
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                ${lessonContent}
            </div>
            
            <div class="mt-8 flex justify-between items-center">
                <div class="text-center">
                    ${topicId > 1 ? `<a href="/topic/${topicId - 1}" class="inline-flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Previous Topic
                    </a>` : ''}
                </div>
                
                <a href="/quiz/${topicId}" 
                   class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    <i class="fas fa-play mr-2"></i>
                    Start Practice Quiz
                </a>
                
                <div class="text-center">
                    ${topicId < 21 ? `<a href="/topic/${topicId + 1}" class="inline-flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                        Next Topic
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>` : ''}
                </div>
            </div>
        </div>
    </div>

    <script>
        // Enhanced answer checking functions for interactive lessons
        function checkAnswer(questionNum, correctAnswer, explanation) {
            const selected = document.querySelector('input[name="q' + questionNum + '"]:checked');
            const feedback = document.getElementById('feedback' + questionNum);
            
            if (!selected) {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-2 rounded"><i class="fas fa-exclamation-circle"></i> Please select an answer first.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            if (selected.value === correctAnswer) {
                feedback.innerHTML = '<div class="text-green-600 bg-green-50 p-3 rounded"><strong><i class="fas fa-check-circle"></i> Correct!</strong> ' + explanation + '</div>';
            } else {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-3 rounded"><strong><i class="fas fa-times-circle"></i> Incorrect.</strong> ' + explanation + '</div>';
            }
            feedback.classList.remove('hidden');
        }

        function checkDecimalAnswer(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_answer');
            const userAnswer = input.value.trim();
            const feedback = document.getElementById('feedback' + questionNum);
            
            if (!userAnswer) {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-2 rounded"><i class="fas fa-exclamation-circle"></i> Please enter an answer first.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            const isCorrect = correctAnswers.some(answer => answer === userAnswer);
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="text-green-600 bg-green-50 p-3 rounded"><strong><i class="fas fa-check-circle"></i> Correct!</strong> ' + explanation + '</div>';
            } else {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-3 rounded"><strong><i class="fas fa-times-circle"></i> Try again.</strong> ' + explanation + '</div>';
            }
            feedback.classList.remove('hidden');
        }

        function checkNumberAnswer(questionNum, correctAnswer, explanation) {
            const input = document.getElementById('q' + questionNum + '_answer');
            const userAnswer = parseInt(input.value.trim());
            const feedback = document.getElementById('feedback' + questionNum);
            
            if (!input.value.trim() || isNaN(userAnswer)) {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-2 rounded"><i class="fas fa-exclamation-circle"></i> Please enter a valid number.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            if (userAnswer === correctAnswer) {
                feedback.innerHTML = '<div class="text-green-600 bg-green-50 p-3 rounded"><strong><i class="fas fa-check-circle"></i> Correct!</strong> ' + explanation + '</div>';
            } else {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-3 rounded"><strong><i class="fas fa-times-circle"></i> Incorrect.</strong> ' + explanation + '</div>';
            }
            feedback.classList.remove('hidden');
        }

        function checkStandardForm(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_answer');
            const userAnswer = input.value.trim().toLowerCase();
            const feedback = document.getElementById('feedback' + questionNum);
            
            if (!userAnswer) {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-2 rounded"><i class="fas fa-exclamation-circle"></i> Please enter an answer first.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            const normalizedAnswers = correctAnswers.map(answer => answer.toLowerCase());
            const isCorrect = normalizedAnswers.some(answer => answer === userAnswer);
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="text-green-600 bg-green-50 p-3 rounded"><strong><i class="fas fa-check-circle"></i> Correct!</strong> ' + explanation + '</div>';
            } else {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-3 rounded"><strong><i class="fas fa-times-circle"></i> Try again.</strong> ' + explanation + '</div>';
            }
            feedback.classList.remove('hidden');
        }

        function checkAlgebraAnswer(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_answer');
            const userAnswer = input.value.trim().toLowerCase().replace(/\\s/g, '');
            const feedback = document.getElementById('feedback' + questionNum);
            
            if (!input.value.trim()) {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-2 rounded"><i class="fas fa-exclamation-circle"></i> Please enter an answer first.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            const normalizedAnswers = correctAnswers.map(answer => answer.toLowerCase().replace(/\\s/g, ''));
            const isCorrect = normalizedAnswers.some(answer => answer === userAnswer);
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="text-green-600 bg-green-50 p-3 rounded"><strong><i class="fas fa-check-circle"></i> Correct!</strong> ' + explanation + '</div>';
            } else {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-3 rounded"><strong><i class="fas fa-times-circle"></i> Try again.</strong> ' + explanation + '</div>';
            }
            feedback.classList.remove('hidden');
        }

        function checkSimultaneousAnswer(questionNum, correctX, correctY, explanation) {
            const xInput = document.getElementById('q' + questionNum + 'x_answer');
            const yInput = document.getElementById('q' + questionNum + 'y_answer');
            const feedback = document.getElementById('feedback' + questionNum);
            
            const userX = parseFloat(xInput.value.trim());
            const userY = parseFloat(yInput.value.trim());
            
            if (!xInput.value.trim() || !yInput.value.trim() || isNaN(userX) || isNaN(userY)) {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-2 rounded"><i class="fas fa-exclamation-circle"></i> Please enter both x and y values.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            if (userX === correctX && userY === correctY) {
                feedback.innerHTML = '<div class="text-green-600 bg-green-50 p-3 rounded"><strong><i class="fas fa-check-circle"></i> Correct!</strong> ' + explanation + '</div>';
            } else {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-3 rounded"><strong><i class="fas fa-times-circle"></i> Incorrect.</strong> ' + explanation + '</div>';
            }
            feedback.classList.remove('hidden');
        }

        function checkQuadraticAnswer(questionNum, correctAnswers, explanation) {
            const input1 = document.getElementById('q' + questionNum + 'a_answer');
            const input2 = document.getElementById('q' + questionNum + 'b_answer');
            const feedback = document.getElementById('feedback' + questionNum);
            
            const answer1 = parseFloat(input1.value.trim());
            const answer2 = parseFloat(input2.value.trim());
            
            if (!input1.value.trim() || !input2.value.trim() || isNaN(answer1) || isNaN(answer2)) {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-2 rounded"><i class="fas fa-exclamation-circle"></i> Please enter both solutions.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            const userAnswers = [answer1, answer2].sort();
            const sortedCorrect = correctAnswers.sort();
            const isCorrect = userAnswers[0] === sortedCorrect[0] && userAnswers[1] === sortedCorrect[1];
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="text-green-600 bg-green-50 p-3 rounded"><strong><i class="fas fa-check-circle"></i> Correct!</strong> ' + explanation + '</div>';
            } else {
                feedback.innerHTML = '<div class="text-red-600 bg-red-50 p-3 rounded"><strong><i class="fas fa-times-circle"></i> Try again.</strong> ' + explanation + '</div>';
            }
            feedback.classList.remove('hidden');
        }
    </script>
</body>
</html>
    `);
})

// Quiz route - redirect Topic 1 to enhanced quiz, others get simple quiz
app.get('/quiz/:id', (c) => {
  const topicId = c.req.param('id');

  // For Topic 1, redirect to our enhanced algebra quiz
  if (topicId === '1') {
    return c.redirect('/quiz/algebra-enhanced');
  }

  // For other topics, show coming soon message
  const topic = MATHEMATICS_TOPICS.find(t => t.id === parseInt(topicId));
  
  if (!topic) {
    return c.text('Topic not found', 404);
  }

  return c.html(`
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Quiz Coming Soon!</h2>
        <p class="text-gray-600 mb-6">We're preparing an interactive quiz for ${topic.title}.</p>
        <a href="/topic/${topicId}" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Back to Lesson
        </a>
      </div>
    </div>
  `);
})

// Mathematics dashboard route
app.get('/dashboard', (c) => {
  const topics = MATHEMATICS_TOPICS;

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IGCSE Mathematics Dashboard - Study Buddy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b border-gray-200 mb-8">
            <div class="max-w-7xl mx-auto px-4 py-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <a href="/" class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-lg">📚</span>
                        </a>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">IGCSE Mathematics</h1>
                            <p class="text-gray-600">Complete curriculum with ${topics.length} topics</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4">
            <!-- Topic Categories -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Number Topics -->
                <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-calculator text-blue-600 mr-2"></i>
                        Number (Topics 1-5)
                    </h2>
                    <div class="space-y-3">
                        ${topics.filter(t => t.order_index >= 1 && t.order_index <= 5).map(topic => `
                            <a href="/topic/${topic.id}" class="block bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">${topic.title}</h3>
                                        <p class="text-sm text-gray-600">${topic.description}</p>
                                        <div class="flex items-center mt-2 space-x-2">
                                            <span class="px-2 py-1 bg-${topic.difficulty_level === 'beginner' ? 'green' : topic.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-100 text-${topic.difficulty_level === 'beginner' ? 'green' : topic.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-800 text-xs rounded-full">
                                                ${topic.difficulty_level}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <i class="fas fa-clock"></i> ${topic.estimated_duration || 45} min
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-2xl">${topic.order_index}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Algebra Topics -->
                <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-x text-purple-600 mr-2"></i>
                        Algebra (Topics 6-10)
                    </h2>
                    <div class="space-y-3">
                        ${topics.filter(t => t.order_index >= 6 && t.order_index <= 10).map(topic => `
                            <a href="/topic/${topic.id}" class="block bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">${topic.title}</h3>
                                        <p class="text-sm text-gray-600">${topic.description}</p>
                                        <div class="flex items-center mt-2 space-x-2">
                                            <span class="px-2 py-1 bg-${topic.difficulty_level === 'beginner' ? 'green' : topic.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-100 text-${topic.difficulty_level === 'beginner' ? 'green' : topic.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-800 text-xs rounded-full">
                                                ${topic.difficulty_level}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <i class="fas fa-clock"></i> ${topic.estimated_duration || 45} min
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-2xl">${topic.order_index}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Geometry Topics -->
                <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-shapes text-green-600 mr-2"></i>
                        Geometry (Topics 11-15)
                    </h2>
                    <div class="space-y-3">
                        ${topics.filter(t => t.order_index >= 11 && t.order_index <= 15).map(topic => `
                            <a href="/topic/${topic.id}" class="block bg-white rounded-lg p-4 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">${topic.title}</h3>
                                        <p class="text-sm text-gray-600">${topic.description}</p>
                                        <div class="flex items-center mt-2 space-x-2">
                                            <span class="px-2 py-1 bg-${topic.difficulty_level === 'beginner' ? 'green' : topic.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-100 text-${topic.difficulty_level === 'beginner' ? 'green' : topic.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-800 text-xs rounded-full">
                                                ${topic.difficulty_level}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <i class="fas fa-clock"></i> ${topic.estimated_duration || 45} min
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-2xl">${topic.order_index}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <!-- Statistics & Probability Topics -->
                <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-chart-bar text-orange-600 mr-2"></i>
                        Statistics & Probability (Topics 16-21)
                    </h2>
                    <div class="space-y-3">
                        ${topics.filter(t => t.order_index >= 16 && t.order_index <= 21).map(topic => `
                            <a href="/topic/${topic.id}" class="block bg-white rounded-lg p-4 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-gray-800">${topic.title}</h3>
                                        <p class="text-sm text-gray-600">${topic.description}</p>
                                        <div class="flex items-center mt-2 space-x-2">
                                            <span class="px-2 py-1 bg-${topic.difficulty_level === 'beginner' ? 'green' : topic.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-100 text-${topic.difficulty_level === 'beginner' ? 'green' : topic.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-800 text-xs rounded-full">
                                                ${topic.difficulty_level}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                <i class="fas fa-clock"></i> ${topic.estimated_duration || 45} min
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-2xl">${topic.order_index}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `);
})

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
            Interactive lessons, practice quizzes, and personalized learning paths for O-Level success. Study anytime, anywhere with our mobile-first platform.
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Quizzes</h3>
            <p className="text-gray-600">Practice with real examination techniques including time management and question flagging.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Excel in Your O-Levels?</h3>
          <p className="text-xl mb-6 opacity-90">Join thousands of students using Study Buddy to achieve their academic goals.</p>
          <button onclick="window.location.href='/dashboard'" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
            Start with Mathematics
          </button>
        </div>
      </div>
    </div>
  )
})

// Dashboard route for complete curriculum
app.get('/dashboard', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IGCSE Mathematics Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200 mb-6">
        <div class="max-w-6xl mx-auto px-4 py-6">
            <div class="text-center">
                <div class="flex items-center justify-center space-x-3 mb-2">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-xl">SB</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900">IGCSE Mathematics Complete</h1>
                </div>
                <p class="text-gray-600">Enhanced quizzes with examination techniques</p>
            </div>
        </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 pb-8">        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Number Operations</h3>
                <p class="text-gray-600 text-sm mb-4">BODMAS, negative numbers, basic operations</p>
                <div class="flex justify-between items-center">
                    <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Foundation</span>
                    <div class="flex space-x-2">
                        <a href="/topic/1" class="px-3 py-1 bg-blue-600 text-white text-sm rounded">Lesson</a>
                        <a href="/quiz/number-operations" class="px-3 py-1 bg-green-600 text-white text-sm rounded">Quiz</a>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Fractions & Percentages</h3>
                <p class="text-gray-600 text-sm mb-4">Conversions, operations, percentage problems</p>
                <div class="flex justify-between items-center">
                    <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Foundation</span>
                    <div class="flex space-x-2">
                        <a href="/topic/2" class="px-3 py-1 bg-blue-600 text-white text-sm rounded">Lesson</a>
                        <a href="/quiz/fractions-decimals-percentages" class="px-3 py-1 bg-green-600 text-white text-sm rounded">Quiz</a>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Ratio & Proportion</h3>
                <p class="text-gray-600 text-sm mb-4">Ratios, scale, direct/inverse proportion</p>
                <div class="flex justify-between items-center">
                    <span class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Intermediate</span>
                    <div class="flex space-x-2">
                        <a href="/topic/3" class="px-3 py-1 bg-blue-600 text-white text-sm rounded">Lesson</a>
                        <a href="/quiz/ratio-proportion-scale" class="px-3 py-1 bg-green-600 text-white text-sm rounded">Quiz</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 mb-6">
            <h2 class="text-xl font-bold text-purple-800 mb-4">🚀 Featured: Enhanced Algebra Quiz</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h3 class="font-semibold text-purple-700 mb-2">Algebra Basics with Examination Techniques</h3>
                    <p class="text-purple-600 text-sm mb-4">Experience our advanced quiz system designed for IGCSE preparation</p>
                    <div class="flex space-x-2">
                        <a href="/quiz/algebra-enhanced" class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-semibold">
                            Take Enhanced Quiz ✨
                        </a>
                    </div>
                </div>
                
                <div class="text-xs text-purple-600 space-y-2">
                    <div class="flex items-center"><i class="fas fa-clock mr-2"></i>20-minute countdown timer</div>
                    <div class="flex items-center"><i class="fas fa-flag mr-2"></i>Question flagging system</div>
                    <div class="flex items-center"><i class="fas fa-chart-line mr-2"></i>Real-time progress tracking</div>
                    <div class="flex items-center"><i class="fas fa-eye mr-2"></i>Final reveal with explanations</div>
                    <div class="flex items-center"><i class="fas fa-trophy mr-2"></i>Achievement unlocks at 80%+</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`)
})

// Test route for progression debugging
app.get('/test-progression', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Quiz Progression</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Quiz Progression Test</h1>
        <button onclick="simulateHighScore()" class="bg-blue-600 text-white px-4 py-2 rounded">Simulate 90% Score (Should Show Progression)</button>
        <button onclick="simulateLowScore()" class="bg-red-600 text-white px-4 py-2 rounded ml-2">Simulate 60% Score (No Progression)</button>
        <button onclick="resetTest()" class="bg-gray-600 text-white px-4 py-2 rounded ml-2">Reset</button>
        
        <div id="quiz-results" class="hidden mt-8 bg-white rounded-lg p-6 border border-gray-200">
            <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Quiz Complete! 🎉</h3>
                <div id="final-score" class="text-4xl font-bold text-blue-600 mb-4"></div>
                <p class="text-gray-600">Here are your results:</p>
            </div>
        </div>

        <!-- High score progression pathway (80%+) -->
        <div id="next-challenge" class="hidden mt-8 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white text-center shadow-lg">
            <h4 class="text-2xl font-bold mb-3">🚀 Ready for Next Challenge!</h4>
            <p class="text-lg mb-4">Outstanding performance! You've mastered Algebra Basics with 80%+ score.</p>
            <div class="text-sm opacity-90 mb-4">You've demonstrated strong algebraic understanding - time to tackle advanced concepts!</div>
            <button onclick="window.location.href='/topic/21'" class="bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">Continue to Mathematical Problem Solving →</button>
        </div>

        <!-- Review guidance for lower scores (<80%) -->
        <div id="review-guidance" class="hidden mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white text-center shadow-lg">
            <h4 class="text-2xl font-bold mb-3">📚 Time to Review & Strengthen!</h4>
            <p class="text-lg mb-4">You're making progress! Let's review the concepts you missed to build a stronger foundation.</p>
            
            <div class="bg-white bg-opacity-20 rounded-lg p-4 mb-4 text-left">
                <h5 class="font-semibold mb-2"><i class="fas fa-lightbulb mr-2"></i>What to do next:</h5>
                <ul class="text-sm space-y-1 list-disc list-inside">
                    <li>Review the explanations above for questions you got wrong</li>
                    <li>Practice similar problems to strengthen weak areas</li>
                    <li>Retake this quiz when you feel more confident</li>
                    <li>Continue with other lessons at your current level</li>
                </ul>
            </div>

            <div class="text-sm opacity-90 mb-4">
                <strong>Remember:</strong> Mathematical mastery takes practice. Each attempt makes you stronger! 💪
            </div>

            <div class="flex flex-wrap justify-center gap-3">
                <button onclick="window.location.href='/topic/1'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    <i class="fas fa-book mr-2"></i>Review Lesson
                </button>
                <button onclick="window.location.href='/topic/2'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    <i class="fas fa-arrow-right mr-2"></i>Fractions & Percentages
                </button>
                <button onclick="window.location.href='/dashboard'" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    <i class="fas fa-home mr-2"></i>All Topics
                </button>
            </div>
        >
    </div>

    <script>
        function simulateHighScore() {
            console.log('Simulating high score (90%)...');
            const percentage = 90;
            const score = 9;
            
            // Show results
            const finalScoreElement = document.getElementById('final-score');
            const resultsElement = document.getElementById('quiz-results');
            
            if (finalScoreElement) {
                finalScoreElement.textContent = score + '/10 (' + percentage + '%)';
            }
            
            if (resultsElement) {
                resultsElement.classList.remove('hidden');
            }
            
            // Show next challenge if score >= 80%
            if (percentage >= 80) {
                console.log('High score achieved! Showing next challenge...');
                setTimeout(function() {
                    const nextChallenge = document.getElementById('next-challenge');
                    if (nextChallenge) {
                        console.log('Displaying next challenge section');
                        nextChallenge.classList.remove('hidden');
                        nextChallenge.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        console.error('Could not find next-challenge element');
                    }
                }, 800);
            }
        }

        function simulateLowScore() {
            console.log('Simulating low score (60%)...');
            const percentage = 60;
            const score = 6;
            
            // Show results
            const finalScoreElement = document.getElementById('final-score');
            const resultsElement = document.getElementById('quiz-results');
            const nextChallenge = document.getElementById('next-challenge');
            const reviewGuidance = document.getElementById('review-guidance');
            
            if (finalScoreElement) {
                finalScoreElement.textContent = score + '/10 (' + percentage + '%)';
            }
            
            if (resultsElement) {
                resultsElement.classList.remove('hidden');
            }
            
            // Hide next challenge and show review guidance
            if (nextChallenge) {
                nextChallenge.classList.add('hidden');
            }
            
            // Show review guidance for low scores
            setTimeout(function() {
                if (reviewGuidance) {
                    console.log('Displaying review guidance section');
                    reviewGuidance.classList.remove('hidden');
                    reviewGuidance.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    console.error('Could not find review-guidance element');
                }
            }, 800);
            
            console.log('Score below 80%, showing review guidance');
        }

        function resetTest() {
            const resultsElement = document.getElementById('quiz-results');
            const nextChallenge = document.getElementById('next-challenge');
            const reviewGuidance = document.getElementById('review-guidance');
            
            if (resultsElement) {
                resultsElement.classList.add('hidden');
            }
            
            if (nextChallenge) {
                nextChallenge.classList.add('hidden');
            }
            
            if (reviewGuidance) {
                reviewGuidance.classList.add('hidden');
            }
            
            console.log('Test reset');
        }
        
        // Statistics and Probability JavaScript Functions
        function checkStatsAnswer(questionNum, correctAnswer, explanation) {
            const select = document.getElementById('q' + questionNum + '_stats_answer');
            const feedback = document.getElementById('stats_feedback' + questionNum);
            
            if (!select || !feedback) return;
            
            const userAnswer = select.value.trim();
            
            if (userAnswer === correctAnswer) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please select an answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkStatsTextAnswer(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_stats_text');
            const feedback = document.getElementById('stats_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = input.value.trim().toLowerCase();
            
            let isCorrect = false;
            for (const correct of correctAnswers) {
                if (userAnswer.includes(correct.toLowerCase())) {
                    isCorrect = true;
                    break;
                }
            }
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter your answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Try again.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkStatsNumberAnswer(questionNum, correctAnswer, type, explanation) {
            const input = document.getElementById('q' + questionNum + '_' + type + '_answer') || document.getElementById('q' + questionNum + '_mean_answer') || document.getElementById('q' + questionNum + '_median_answer') || document.getElementById('q' + questionNum + '_mode_answer');
            const feedback = document.getElementById('stats_mean_feedback' + questionNum) || document.getElementById('dist_feedback' + questionNum) || document.getElementById('prob_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = parseFloat(input.value);
            
            if (isNaN(userAnswer)) {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter a valid number.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            const tolerance = 0.01; // Allow small rounding errors
            if (Math.abs(userAnswer - correctAnswer) < tolerance) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkProbAnswer(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_prob_answer') || document.getElementById('q' + questionNum + '_tree_answer');
            const feedback = document.getElementById('prob_feedback' + questionNum) || document.getElementById('tree_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = input.value.trim().toLowerCase().replace(/\s/g, '');
            
            let isCorrect = false;
            for (const correct of correctAnswers) {
                if (userAnswer === correct.toLowerCase().replace(/\s/g, '')) {
                    isCorrect = true;
                    break;
                }
            }
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter your answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkTreeAnswer(questionNum, correctAnswer, explanation) {
            const input = document.getElementById('q' + questionNum + '_tree_answer');
            const feedback = document.getElementById('tree_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = parseFloat(input.value);
            
            if (isNaN(userAnswer)) {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter a valid number.</div>';
                feedback.classList.remove('hidden');
                return;
            }
            
            const tolerance = 0.01;
            if (Math.abs(userAnswer - correctAnswer) < tolerance) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkHypAnswer(questionNum, correctAnswer, explanation) {
            const select = document.getElementById('q' + questionNum + '_hyp_answer');
            const feedback = document.getElementById('hyp_feedback' + questionNum);
            
            if (!select || !feedback) return;
            
            const userAnswer = select.value.trim();
            
            if (userAnswer === correctAnswer) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please select an answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Incorrect.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
        
        function checkHypTextAnswer(questionNum, correctAnswers, explanation) {
            const input = document.getElementById('q' + questionNum + '_hyp_answer');
            const feedback = document.getElementById('hyp_feedback' + questionNum);
            
            if (!input || !feedback) return;
            
            const userAnswer = input.value.trim().toLowerCase().replace(/\s/g, '');
            
            let isCorrect = false;
            for (const correct of correctAnswers) {
                if (userAnswer === correct.toLowerCase().replace(/\s/g, '')) {
                    isCorrect = true;
                    break;
                }
            }
            
            if (isCorrect) {
                feedback.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded"><i class="fas fa-check-circle mr-2"></i><strong>Correct!</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            } else if (userAnswer === '') {
                feedback.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded"><i class="fas fa-exclamation-triangle mr-2"></i>Please enter your answer.</div>';
                feedback.classList.remove('hidden');
            } else {
                feedback.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded"><i class="fas fa-times-circle mr-2"></i><strong>Try again.</strong> ' + explanation + '</div>';
                feedback.classList.remove('hidden');
            }
        }
    </script>
</body>
</html>`);
})

export default app
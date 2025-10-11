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
    </script>
</body>
</html>`);
})

export default app
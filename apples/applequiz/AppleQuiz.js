// Database of 5 apples with 7 attribute scores
const APPLES_DATABASE = [
    {
        name: "Lady Alice",
        description: "Sweet and candy-like with a long shelf life.",
        image: "../ApplePictures/AllApples/1.jpg",
        attributes: {
            Juiciness: 0.5,
            Texture: 0.8,
            Flavor: 0.9,
            Aromatics: 0.6,
            Confidence: 0.7,
            Uniqueness: 0.5,
            Perseverance: 0.9
        }
    },
    {
        name: "Gala",
        description: "Sweet, tangy, and extremely popular.",
        image: "../ApplePictures/AllApples/2.jpg",
        attributes: {
            Juiciness: 0.6,
            Texture: 0.4,
            Flavor: 0.5,
            Aromatics: 0.3,
            Confidence: 0.8,
            Uniqueness: -0.5,
            Perseverance: 0.6
        }
    },
    {
        name: "Aurora Golden Gala",
        description: "Very sweet, thin-skinned and greasy.",
        image: "../ApplePictures/AllApples/3.jpg",
        attributes: {
            Juiciness: 0.8,
            Texture: 0.7,
            Flavor: 0.9,
            Aromatics: 0.8,
            Confidence: 0.6,
            Uniqueness: 0.8,
            Perseverance: 0.4
        }
    },
    {
        name: "Jazz",
        description: "Slightly sour and very crunchy.",
        image: "../ApplePictures/AllApples/4.jpg",
        attributes: {
            Juiciness: 0.6,
            Texture: 0.9,
            Flavor: 0.2, // more sour
            Aromatics: 0.5,
            Confidence: 0.9,
            Uniqueness: 0.4,
            Perseverance: 0.7
        }
    },
    {
        name: "Envy",
        description: "Very dense, crisp, and incredibly slow to brown.",
        image: "../ApplePictures/AllApples/5.jpg",
        attributes: {
            Juiciness: 0.4,
            Texture: 1.0, 
            Flavor: 0.4,
            Aromatics: 0.4,
            Confidence: 0.6,
            Uniqueness: 0.3,
            Perseverance: 1.0
        }
    }
];

const QUIZ_QUESTIONS = [
    {
        text: "It's a Friday night. What are you doing?",
        answers: [
            { text: "Going out to the hottest new club.", scores: { Confidence: 0.8, Uniqueness: 0.5, Aromatics: 0.6, Texture: 0, Juiciness: 0, Flavor: 0, Perseverance: 0 } },
            { text: "Staying in to read a long novel.", scores: { Perseverance: 0.8, Texture: 0.5, Flavor: 0.4, Confidence: 0, Uniqueness: 0, Aromatics: 0, Juiciness: 0 } },
            { text: "Hosting a weird niche dinner party for friends.", scores: { Uniqueness: 0.9, Aromatics: 0.8, Flavor: 0.8, Confidence: 0, Texture: 0, Juiciness: 0, Perseverance: 0 } },
            { text: "Working late to finish a project.", scores: { Perseverance: 1.0, Confidence: 0.4, Texture: 0.7, Uniqueness: 0, Aromatics: 0, Flavor: 0, Juiciness: 0 } }
        ]
    },
    {
        text: "How do you handle conflict?",
        answers: [
            { text: "I confront it head-on, loudly.", scores: { Confidence: 1.0, Texture: 0.8, Perseverance: 0.5, Uniqueness: 0, Aromatics: 0, Flavor: 0, Juiciness: 0 } },
            { text: "I smooth things over with sweet words.", scores: { Flavor: 0.9, Juiciness: 0.8, Aromatics: 0.5, Confidence: 0, Texture: 0, Uniqueness: 0, Perseverance: 0 } },
            { text: "I avoid it and mind my own business.", scores: { Texture: -0.5, Confidence: -0.6, Uniqueness: 0.2, Flavor: 0, Aromatics: 0, Juiciness: 0, Perseverance: 0 } },
            { text: "I find a creative, outside-the-box compromise.", scores: { Uniqueness: 0.8, Aromatics: 0.6, Confidence: 0.4, Texture: 0, Flavor: 0, Juiciness: 0, Perseverance: 0  } }
        ]
    },
    {
        text: "What is your fashion sense?",
        answers: [
            { text: "Bold, bright, and impossible to ignore.", scores: { Aromatics: 0.9, Uniqueness: 0.8, Confidence: 0.7, Texture: 0, Flavor: 0, Juiciness: 0, Perseverance: 0 } },
            { text: "Classic, reliable, everyday wear.", scores: { Uniqueness: -0.8, Perseverance: 0.6, Texture: 0.5, Confidence: 0, Aromatics: 0, Flavor: 0, Juiciness: 0 } },
            { text: "Comfortable and soft.", scores: { Texture: -0.8, Juiciness: 0.7, Flavor: 0.5, Confidence: 0, Aromatics: 0, Uniqueness: 0, Perseverance: 0 } },
            { text: "Tailored, structured, and immaculate.", scores: { Texture: 0.9, Confidence: 0.8, Perseverance: 0.5, Aromatics: 0, Uniqueness: 0, Flavor: 0, Juiciness: 0 } }
        ]
    },
    {
        text: "Pick a vacation destination.",
        answers: [
            { text: "A bustling, vibrant city.", scores: { Aromatics: 0.8, Confidence: 0.7, Flavor: 0.6, Texture: 0, Uniqueness: 0, Juiciness: 0, Perseverance: 0 } },
            { text: "A quiet, misty cabin in the woods.", scores: { Perseverance: 0.7, Texture: 0.6, Uniqueness: 0.4, Confidence: 0, Aromatics: 0, Flavor: 0, Juiciness: 0 } },
            { text: "A tropical beach with crystal clear water.", scores: { Juiciness: 0.9, Flavor: 0.8, Aromatics: 0.5, Confidence: 0, Uniqueness: 0, Texture: 0, Perseverance: 0 } },
            { text: "A rugged mountain you have to climb.", scores: { Texture: 0.9, Perseverance: 0.9, Confidence: 0.6, Uniqueness: 0, Aromatics: 0, Flavor: 0, Juiciness: 0 } }
        ]
    },
    {
        text: "How do others describe you?",
        answers: [
            { text: "Sweet and agreeable.", scores: { Flavor: 0.9, Juiciness: 0.6, Confidence: -0.3, Texture: 0, Uniqueness: 0, Aromatics: 0, Perseverance: 0 } },
            { text: "Tough but fair.", scores: { Texture: 0.8, Perseverance: 0.8, Flavor: -0.4, Confidence: 0, Uniqueness: 0, Aromatics: 0, Juiciness: 0 } },
            { text: "Weird but delightful.", scores: { Uniqueness: 1.0, Aromatics: 0.7, Flavor: 0.5, Confidence: 0, Texture: 0, Juiciness: 0, Perseverance: 0 } },
            { text: "Energetic and loud.", scores: { Juiciness: 0.7, Confidence: 0.9, Aromatics: 0.6, Texture: 0, Uniqueness: 0, Flavor: 0, Perseverance: 0 } }
        ]
    }
];

let currentUserScores = {
    Juiciness: 0, Texture: 0, Flavor: 0, Aromatics: 0, Confidence: 0, Uniqueness: 0, Perseverance: 0
};
let questionIndex = 0;

function calculateMatch(userScores, database) {
    const results = database.map(apple => {
        let sumSquaredDiff = 0;
        let highestAttr = { name: '', val: -2 };
        
        for (let attr in userScores) {
            // Calculate distance
            const userVal = userScores[attr];
            const appleVal = apple.attributes[attr] || 0;
            const diff = userVal - appleVal;
            sumSquaredDiff += (diff * diff);

            // Determine highest matching prominent trait for description
            if (appleVal > 0.5 && userVal > 0.3) {
                if (appleVal > highestAttr.val) {
                    highestAttr = { name: attr, val: appleVal };
                }
            }
        }
        
        const distance = Math.sqrt(sumSquaredDiff);
        // Max possible Euclidean distance between two vectors of length 7 ranging from -1 to 1 is sqrt(7 * 2^2) = sqrt(28) ≈ 5.29
        const maxDistance = Math.sqrt(7 * 4);
        const similarity = Math.max(0, 1 - (distance / maxDistance));
        const percentage = Math.round(similarity * 100);

        let matchReason = highestAttr.name 
            ? `You both scored high in ${highestAttr.name}!` 
            : `Overall, your vibes align closely.`;

        return { ...apple, percentage, matchReason };
    });

    results.sort((a, b) => b.percentage - a.percentage);
    return results;
}

function renderStartScreen() {
    const root = document.getElementById("quiz-root");
    root.innerHTML = `
        <h1 class="quiz-title">Which Apple Are You?</h1>
        <p class="quiz-description">Discover your true inner fruit. Just answer a few quick questions to find out which apple from the database best matches your personality!</p>
        <button class="start-btn" onclick="startQuiz()">Begin Quiz</button>
    `;
}

function startQuiz() {
    currentUserScores = { Juiciness: 0, Texture: 0, Flavor: 0, Aromatics: 0, Confidence: 0, Uniqueness: 0, Perseverance: 0 };
    questionIndex = 0;
    renderQuestion();
}

function answerQuestion(answerIndex) {
    const answer = QUIZ_QUESTIONS[questionIndex].answers[answerIndex];
    const scores = answer.scores;
    
    // Update running total (to average later)
    for (const attr in currentUserScores) {
        currentUserScores[attr] += (scores[attr] || 0);
    }
    
    questionIndex++;
    if (questionIndex >= QUIZ_QUESTIONS.length) {
        // Average the scores
        for (const attr in currentUserScores) {
            currentUserScores[attr] = currentUserScores[attr] / QUIZ_QUESTIONS.length;
        }
        renderResults();
    } else {
        renderQuestion();
    }
}

function renderQuestion() {
    const root = document.getElementById("quiz-root");
    const q = QUIZ_QUESTIONS[questionIndex];
    const progress = Math.round((questionIndex / QUIZ_QUESTIONS.length) * 100);

    let html = `
        <div class="progress-container">
            <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <h2 class="question-text">${q.text}</h2>
        <div class="answers-grid">
    `;

    q.answers.forEach((ans, idx) => {
        html += `<button class="answer-btn" onclick="answerQuestion(${idx})">${ans.text}</button>`;
    });

    html += `</div>`;
    root.innerHTML = html;
}

function renderResults() {
    const root = document.getElementById("quiz-root");
    const matches = calculateMatch(currentUserScores, APPLES_DATABASE);
    
    const primary = matches[0];
    const friend1 = matches[1];
    const friend2 = matches[2];
    const rival = matches[matches.length - 1];

    root.innerHTML = `
        <div class="results-container">
            <div class="match-card">
                <div class="match-card-header">
                    <img src="${primary.image}" alt="${primary.name}" class="primary-img">
                    <div class="match-info">
                        <h2>Your Match: ${primary.name}</h2>
                        <div class="match-percent">${primary.percentage}%</div>
                    </div>
                </div>
                <div class="match-desc">
                    <p>${primary.description}</p>
                    <p><em>${primary.matchReason}</em></p>
                </div>
            </div>

            <div class="others-container">
                <div class="mini-card">
                    <div class="mini-label">Friend</div>
                    <img src="${friend1.image}" alt="${friend1.name}">
                    <div class="mini-name">${friend1.name}</div>
                    <div class="mini-pct">${friend1.percentage}%</div>
                </div>
                <div class="mini-card">
                    <div class="mini-label">Friend</div>
                    <img src="${friend2.image}" alt="${friend2.name}">
                    <div class="mini-name">${friend2.name}</div>
                    <div class="mini-pct">${friend2.percentage}%</div>
                </div>
                <div class="mini-card rival-card">
                    <div class="mini-label">Enemy</div>
                    <img src="${rival.image}" alt="${rival.name}">
                    <div class="mini-name">${rival.name}</div>
                    <div class="mini-pct">${rival.percentage}%</div>
                </div>
            </div>

            <button class="retry-btn" onclick="renderStartScreen()">Take Quiz Again</button>
        </div>
    `;
}

// Initialize
document.addEventListener("DOMContentLoaded", renderStartScreen);

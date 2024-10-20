// รายการคำศัพท์และคำแปลที่ใช้ในเกม
const words = ["apple", "banana", "cat", "dog", "elephant", "frog", "grape", "hat", "ice"];
let currentWord = "";
let correctGuesses = 0;
let timeRemaining = 5;
let timerInterval;
let isAnswering = false;

// การเลือก HTML element
const playerNameInput = document.getElementById('playerName');
const startBtn = document.getElementById('startBtn');
const gameArea = document.getElementById('gameArea');
const questionText = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const timerText = document.getElementById('timer');
const cards = document.querySelectorAll('.card');

// เมื่อคลิกปุ่มเริ่มเกม
startBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value;
    if (playerName === "") {
        alert("Please enter your name!");
    } else {
        startGame();
    }
});

// ฟังก์ชันเริ่มเกม
function startGame() {
    playerNameInput.style.display = "none";
    startBtn.style.display = "none";
    gameArea.style.display = "block";
    nextQuestion();
}

// ฟังก์ชันสุ่มคำถามและเริ่มจับเวลา
function nextQuestion() {
    if (correctGuesses >= 9) {
        alert("Congratulations! You've opened all the cards!");
        return;
    }

    currentWord = words[Math.floor(Math.random() * words.length)];
    questionText.textContent = "Translate the word: " + currentWord;
    answerInput.value = "";
    timeRemaining = 5;
    timerText.textContent = "Time: " + timeRemaining;

    // เริ่มจับเวลา
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerText.textContent = "Time: " + timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }, 1000);

    isAnswering = true;
}

// ฟังก์ชันตรวจสอบคำตอบ
submitBtn.addEventListener('click', () => {
    const answer = answerInput.value.toLowerCase();
    if (!isAnswering) return;
    
    if (answer === currentWord) {
        clearInterval(timerInterval);
        correctGuesses++;
        alert("Correct! Choose a card to open.");

        // เปิดการ์ด: เปลี่ยนจากการ์ดที่ปิดเป็นการ์ดที่แสดงส่วนของภาพบุคคลปริศนา
        cards[correctGuesses - 1].classList.remove('closed');
        isAnswering = false;
        nextQuestion();
    } else {
        alert("Wrong answer! Try again.");
    }
});

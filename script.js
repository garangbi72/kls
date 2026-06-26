// 퀴즈 문제 데이터 (선생님께서 원하시는 문제로 수정/추가 가능합니다)
const quizData = [
    {
        question: "1. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는 무엇일까요?",
        options: ["음절", "형태소", "단어", "음운"],
        answer: "음운"
    },
    {
        question: "2. 발음할 때 공기의 흐름이 발음 기관에서 장애를 받지 않고 순조롭게 나오는 소리는?",
        options: ["자음", "모음", "파열음", "마찰음"],
        answer: "모음"
    },
    {
        question: "3. '국물'이 [궁물]로 발음되는 현상은 어떤 음운 변동인가요?",
        options: ["비음화", "유음화", "된소리되기", "구개음화"],
        answer: "비음화"
    },
    {
        question: "4. 다음 중 구개음화가 일어나는 단어는?",
        options: ["신라", "밥물", "해돋이", "입고"],
        answer: "해돋이"
    },
    {
        question: "5. '신라'가 [실라]로 발음되는 현상을 무엇이라고 할까요?",
        options: ["비음화", "유음화", "음절의 끝소리 규칙", "구개음화"],
        answer: "유음화"
    }
];

const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// 퀴즈 시작 함수
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.classList.remove('hidden');
    resultBox.classList.add('hidden');
    loadQuestion();
}

// 문제 불러오기 함수
function loadQuestion() {
    // 이전 선택지 초기화
    optionsContainer.innerHTML = '';
    
    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.innerText = currentQuiz.question;

    // 선택지 버튼 생성
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, option, currentQuiz.answer));
        optionsContainer.appendChild(button);
    });
}

// 정답 확인 및 다음 문제로 넘어가는 함수
function selectAnswer(button, selectedOption, correctAnswer) {
    // 모든 버튼 비활성화 (중복 클릭 방지)
    const buttons = optionsContainer.querySelectorAll('.btn');
    buttons.forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
        // 정답인 버튼을 찾아서 초록색으로 표시해줌
        buttons.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // 1.5초 뒤에 다음 문제로 이동
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

// 결과 화면 보여주기 함수
function showResult() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    scoreText.innerText = `총 ${quizData.length}문제 중 ${score}문제를 맞혔습니다!`;
}

// 다시 풀기 버튼 이벤트
restartBtn.addEventListener('click', startQuiz);

// 페이지 로드 시 퀴즈 시작
startQuiz();

const homebtn = document.querySelector('#homebtn');
const newbtn = document.querySelector('#newbtn');
const sendUs = document.querySelector('#sendUs');
const sentQ = document.querySelector('#sentQ');
const creditsbtn = document.querySelector('#creditsbtn');

const introduction = document.querySelector('#introduction');
const form = document.querySelector('#form');
const submit = document.querySelector('#submit');
const answer = document.querySelector('#answer');

const question = document.querySelector('#question');
const correctOrIncorrect = document.querySelector('#correctOrIncorrect');
const sendQuest = document.querySelector('#sendQuest');
const credits = document.querySelector('#credits');
const submittedQ = document.querySelector('#submittedQ');


let parsedObj = JSON.parse(localStorage.getItem('questions')) || [];

window.addEventListener('load', (event) => {
    event.preventDefault();
    form.style.display = "none";
    introduction.style.display = "block";
})

function clearAll () {
    question.innerHTML = '';
    correctOrIncorrect.innerHTML = '';
    credits.innerHTML = '';
    sendQuest.innerHTML = '';
    submittedQ.innerHTML = '';
}

function drawNewQuiz () {
    form.style.display = "block";
}

function proceed () {
    clearAll();
    drawNewQuiz();
    drawQuestion();
}

function drawQuestion () {
    fetch(`https://opentdb.com/api.php?amount=50`) 
        .then((response) => response.json())
        .then(json => {

            let p = document.createElement('p');
            questionArray = json.results;
            const shuffled = questionArray.sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 1);

            selected.forEach(function(item, index) {
                objective = (index, item);
            });

            console.log(objective);

            p.textContent = objective.question.replace(/&apos;/g, '').replace(/&quot/g, '').replace(/&#039;/g, '').replace(/&ea;/g, '');
            question.appendChild(p);
        })

        submit.addEventListener('click', (event) => {
            event.preventDefault();
            correctAnswer = objective.correct_answer;
            correctOrIncorrect.innerHTML = '';
            if (answer.value === correctAnswer) {
                let p2 = document.createElement('p');
                p2.textContent = "your Answer is Correct";
    
                let procBtn = document.createElement('button');
                procBtn.textContent = "Proceed to another question";
                procBtn.style.backgroundColor = "silver";
                procBtn.style.borderColor = "white";

                procBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    proceed();
                })

                correctOrIncorrect.appendChild(p2);
                correctOrIncorrect.appendChild(procBtn);
            }

            else {
                let p2 = document.createElement('p');
                p2.textContent = "Better luck next time";

                let tryAgain = document.createElement('button');
                tryAgain.textContent = "Try again?";
                tryAgain.style.backgroundColor = "silver";
                tryAgain.style.borderColor = "white";


                tryAgain.addEventListener('click', (event) => {
                    event.preventDefault();
                    proceed();
                })

                correctOrIncorrect.appendChild(p2);
                correctOrIncorrect.appendChild(tryAgain);
            }
        })
}

function newQuestion (array) {
    array.forEach((questions, index) => {
        let div = document.createElement('div');
        div.setAttribute('id', index);
        let storedQ = document.createElement("p");
        let storedAns = document.createElement("p");
        let storedName = document.createElement("p");
        let br = document.createElement("br");

        storedQ.textContent = `Question: ${questions.question}`;
        storedAns.textContent = `Answer: ${questions.answer}`;
        storedName.textContent = `Name: ${questions.name}`;

        div.appendChild(storedQ);
        div.appendChild(storedAns);
        div.appendChild(storedName);
        div.appendChild(br);
        submittedQ.appendChild(div);
    })  
}

homebtn.addEventListener('click', (event) => {
    event.preventDefault("p2");
    form.style.display = "none";
    introduction.style.display = "block";
    clearAll();
})

newbtn.addEventListener('click', (event) => {
    event.preventDefault();
    form.style.display = "none";
    introduction.style.display = "none";
    clearAll();
    drawQuestion();
    drawNewQuiz();
})

creditsbtn.addEventListener('click', (event) => {
    event.preventDefault();
    form.style.display = "none";
    introduction.style.display = "none";
    clearAll();
    let p3 = document.createElement('p');
    p3.textContent = "This quiz game was created by 'Niekada' while learning how-to-front-end at CodeAcademy. All questions provided by 'opentdb.com'";
    credits.appendChild(p3);
})

sendUs.addEventListener('click', (event) => {
    event.preventDefault();
    form.style.display = "none";
    introduction.style.display = "none";
    clearAll();
    let sendP = document.createElement("p");
    sendP.textContent = "Please enter your question and the answer to your question below"

    let sendForm = document.createElement("form");
    sendForm.setAttribute("method", "");
 
    let sendInput = document.createElement("input");
    sendInput.setAttribute("type", "text");
    sendInput.setAttribute("name", "Question");
    sendInput.setAttribute("placeholder","Your Question");

    let br = document.createElement("br");

    let answerInput = document.createElement("input");
    answerInput.setAttribute("type", "text");
    answerInput.setAttribute("name", "Answer");
    answerInput.setAttribute("placeholder","Your Answer");

    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "Answer");
    nameInput.setAttribute("placeholder","Your Name");

    let submitQ = document.createElement("button");
    submitQ.textContent = "Submit your question";
    submitQ.style.backgroundColor = "silver";
    submitQ.style.borderColor = "white";

    
    sendForm.appendChild(sendInput);
    sendForm.appendChild(br);
    sendForm.appendChild(answerInput);
    sendForm.appendChild(br.cloneNode());
    sendForm.appendChild(nameInput);
    sendForm.appendChild(br.cloneNode());
    sendForm.appendChild(br.cloneNode());
    sendForm.appendChild(submitQ);
    sendQuest.appendChild(sendP);
    sendQuest.appendChild(sendForm);

    submitQ.addEventListener('click', (event) => {
        event.preventDefault();
        clearAll();
        let thankP = document.createElement("p");
        thankP.textContent = "Thank you for your submission, our super computer will review it";

        let objQnA = {
            question: sendInput.value,
            answer: answerInput.value,
            name: nameInput.value,
        }

        parsedObj.push(objQnA);
        localStorage.setItem('questions', JSON.stringify(parsedObj));
        parsedObj = JSON.parse(localStorage.getItem('questions'));

        sendQuest.appendChild(thankP);
    })
})

sentQ.addEventListener('click', (event) => {
    event.preventDefault();
    form.style.display = "none";
    introduction.style.display = "none";
    clearAll();

    newQuestion(parsedObj);
})
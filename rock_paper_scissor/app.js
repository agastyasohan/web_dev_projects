let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector('#msg');

const computerChoice = () => {
    const options = ["rock","paper","scissors"]
    const randNum = Math.floor(Math.random()*3);
    return options[randNum];
};

const playGame = (userChoice,compChoice) => {
    if(userChoice === compChoice){
        msg.style.backgroundColor = "#081b31";
        return "It's a Draw";
    }
    else if ((userChoice === "rock" && compChoice === "paper") || (userChoice === "paper" && compChoice === "scissors") || (userChoice === "scissors" && compChoice === "rock" ) ){
        userScore++;
        document.querySelector('#comp_score').innerText = userScore;
        msg.style.backgroundColor = "red";
        return "You lost"
    }
    else {
        compScore++;
        document.querySelector('#user_score').innerText = compScore;
        msg.style.backgroundColor = "Green";
        return "You Won!"
    }
};



choices.forEach((choice) => {
    choice.addEventListener('click', ()=>{
        const userChoice = choice.getAttribute("id");
        const compChoice = computerChoice();
        const result = playGame(userChoice, compChoice);
        document.querySelector('#msg').innerText = `you chose ${userChoice} and computer chose ${compChoice}, ${result}`
    });
});




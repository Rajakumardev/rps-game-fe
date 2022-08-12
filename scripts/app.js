(() => {
    const API_ROOT = 'http://localhost:3000';
    const ADD_SCORE_EP = `/addNewHighScore`;
    const GET_SCORES_EP = `/getScores`;
    const POST_OPTIONS = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const rockButton = document.getElementById('rock');
    const paperButton = document.getElementById('paper');
    const scissorsButton = document.getElementById('scissor');
    const reset = document.getElementById('reset');
    const playerSelectionText = document.getElementById('player-selection');
    const cpuSelectionText = document.getElementById('cpu-selection');
    const resultContainer = document.getElementById('result');
    const scoreContainer = document.getElementById('score');
    const highScoreContainer = document.getElementById('high-scores');
    const getScoresButton = document.getElementById('get-scores');
    let score = 0;


    const handleClick = (event) => {
        const playerSelection = event.target.id;
        const cpuSelection = cpuChoice();
        getWinner(playerSelection, cpuSelection);
    }

    const handleResetClick = () => {
        score = 0;
        scoreContainer.innerHTML = score;
        playerSelectionText.innerHTML = '';
        cpuSelectionText.innerHTML = '';
        resultContainer.innerHTML = '';

        rockButton.disabled = false;
        paperButton.disabled = false;
        scissorsButton.disabled = false;
    }

    const saveScore = () => {

        const payload = {
            name: "test",
            score: score
        }

        fetch(`${API_ROOT}${ADD_SCORE_EP}`, {
            ...POST_OPTIONS,
            body: JSON.stringify(payload)
        }).then(response => {
            console.log(response.json());
        });
    }

    const getScores = () => {
        fetch(`${API_ROOT}${GET_SCORES_EP}`).then(response => response.json()).then(content => {

            console.log(content);
            const { data = [] } = content;
            const scores = data.map(({ name, score }) => {
                return `<li>${name}: ${score}</li>`;
            }).join('');
            highScoreContainer.innerHTML = scores;
        });
    }

    const cpuChoice = () => {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    const getWinner = (playerSelection, cpuSelection) => {

        playerSelectionText.innerText = playerSelection;
        cpuSelectionText.innerText = cpuSelection;

        if (playerSelection === cpuSelection) {
            resultContainer.innerText = 'Tie';
        } else if (playerSelection === 'rock' && cpuSelection === 'scissors' ||
            playerSelection === 'paper' && cpuSelection === 'rock' ||
            playerSelection === 'scissors' && cpuSelection === 'paper') {
            score = score + 10;
            scoreContainer.innerText = score;
            resultContainer.innerText = 'You win!';

        } else {
            resultContainer.innerText = 'You lose!';
            rockButton.disabled = true;
            paperButton.disabled = true;
            scissorsButton.disabled = true;
            if (score > 0) {
                saveScore();
            }
        }
    }


    rockButton.addEventListener('click', handleClick);
    paperButton.addEventListener('click', handleClick);
    scissorsButton.addEventListener('click', handleClick);
    reset.addEventListener('click', handleResetClick);
    getScoresButton.addEventListener('click', getScores);
})()
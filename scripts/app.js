(() => {
    const rockButton = document.getElementById('rock');
    const paperButton = document.getElementById('paper');
    const scissorsButton = document.getElementById('scissor');



    const handleClick = (event) => {
        const playerSelection = event.target.id;
        const computerSelection = cpuChoice();
        getWinner(playerSelection, computerSelection);
    }

    const cpuChoice = () => {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    const getWinner = (playerSelection, computerSelection) => {
        const playerSelectionText = document.getElementById('player-selection');
        const computerSelectionText = document.getElementById('computer-selection');
        const resultText = document.getElementById('result');

        playerSelectionText.innerText = playerSelection;
        computerSelectionText.innerText = computerSelection;

        if (playerSelection === computerSelection) {
            resultText.innerText = 'Tie';
        } else if (playerSelection === 'rock' && computerSelection === 'scissors' ||
            playerSelection === 'paper' && computerSelection === 'rock' ||
            playerSelection === 'scissors' && computerSelection === 'paper') {
            resultText.innerText = 'You win!';
        } else {
            resultText.innerText = 'You lose!';
        }
    }


    rock.addEventListener('click', handleClick);

})()
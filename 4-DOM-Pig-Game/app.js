/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore, p1LastRoll, p2LastRoll;
initialize();



//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';  //innerHTML required to send html string back.  

//roll the dice request
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(!gamePlaying) {
        return;
    }
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';    

    //3. Update the round score only if the roll is > 1
    
    if(dice > 1) {
        //Update the round score
        if(activePlayer == 0) {
            if(p1LastRoll == 6 && dice == 6)
            score[activePlayer] = 0;
            nextPlayer();
        }
        else if(activePlayer == 2) {
            if(p2LastRoll == 6 && dice == 6)
            score[activePlayer] = 0;
            nextPlayer();
        }
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else {
        nextPlayer();

    }
});

document.querySelector('.btn-hold').addEventListener('click',function() {
    
    if(!gamePlaying) {
        return;
    }
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player won the game
    if(scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.dice').style.display = 'none';
        gamePlaying = false;
    }
    else {
        //change player
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click',initialize);

function nextPlayer() {
    //Set Next Player
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    if (activePlayer == 1) {
        activePlayer = 0;
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
    else {
        activePlayer = 1;
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    }
}


function initialize() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    winningScore = 100;
    p1LastRoll = p2LastRoll = 0;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
}
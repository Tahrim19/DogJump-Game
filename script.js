let character = document.getElementById('character');
let obstacle = document.getElementById('obstacle');

function jump() {
    character.classList.add('animate');
    isJumped = true;
    setTimeout(function() {
        character.classList.remove('animate');
    }, 500);
}

let score = 0;
let isJumped = false;

let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('high-score').textContent = 'High Score: ' + highScore;

function handleClick() {
    jump();
    if(isJumped === true){
        score++;
        document.getElementById('current-score').textContent = 'Score: ' + score;
    }
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('high-score').textContent = 'High Score: ' + highScore;
    } 
}

document.addEventListener('click', handleClick);

let hitDetection = setInterval(function() {
    let charTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    let obsLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obsLeft < 20 && obsLeft > 0 && charTop >= 130) {
        obstacle.style.animation = 'paused';
        obstacle.style.display = 'paused';
        character.style.animation = 'paused';
        document.removeEventListener('click', handleClick);
        let resultMessage = document.createElement('div');
        resultMessage.classList.add('result-message');
        resultMessage.textContent = 'You Lose!';
        document.body.appendChild(resultMessage);
    }
}, 10);

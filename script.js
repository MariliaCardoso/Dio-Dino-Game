const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let xPosition = 0; 

function handleKeyUp(event) {
  if (event.keyCode === 32 && !isJumping) {
    jump();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {

      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 30;
          dino.style.bottom = position + 'px';
          dino.style.left = xPosition + 'px'; 
        }
      }, 30);
    } else {
      position += 25;
      xPosition += 10; 
      dino.style.bottom = position + 'px';
      dino.style.left = xPosition + 'px'; 
    }
  }, 30);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1400;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {

      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else {

      if (
        cactusPosition > xPosition && 
        cactusPosition < xPosition + 60 && 
        position <= 60 
      ) {

        clearInterval(leftTimer);
        isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
      }
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);

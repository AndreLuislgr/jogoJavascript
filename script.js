
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Carregar imagens
const playerImage = new Image();
playerImage.src = 'player.png'; // Substitua 'player.png' pela URL da imagem do jogador
const obstacleImage = new Image();
obstacleImage.src = 'obstacle.png'; // Substitua 'obstacle.png' pela URL da imagem do obstáculo

// Definir jogador
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    speed: 5,
};

// Variáveis para controlar os obstáculos
const obstacles = [];
const obstacleSpeed = 2;

// Variáveis para controle da interface gráfica
const gameOverScreen = document.getElementById('gameOverScreen');
const restartButton = document.getElementById('restartButton');

// Função para criar obstáculos
function createObstacle() {
    const obstacleWidth = Math.random() * (50 - 20) + 20;
    const obstacleX = Math.random() * (canvas.width - obstacleWidth);
    const obstacle = {
        x: obstacleX,
        y: 0,
        width: obstacleWidth,
        height: 10,
    };
    obstacles.push(obstacle);
}

// Função para exibir tela de Game Over
function showGameOverScreen() {
    gameOverScreen.style.display = 'block';
}

// Função para reiniciar o jogo
function restartGame() {
    gameOverScreen.style.display = 'none';
    player.x = canvas.width / 2;
    player.y = canvas.height - 30;
    obstacles.length = 0;
    updateGame();
}

// Função para atualizar o jogo
function updateGame() {
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mover o jogador
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.speed;
    } else if (leftPressed && player.x > 0) {
        player.x -= player.speed;
    }

    // Desenhar o jogador
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Desenhar e mover obstáculos
    for (let i = 0; i < obstacles.length; i++) {
        ctx.drawImage(obstacleImage, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        obstacles[i].y += obstacleSpeed;

        // Verificar colisões com obstáculos
        if (player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y) {
            showGameOverScreen();
            return;
        }

        // Remover obstáculos fora do canvas
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }

    // Criar obstáculos aleatoriamente
    if (Math.random() < 0.02) {
        createObstacle();
    }

    requestAnimationFrame(updateGame);
}

// Controles do jogador
let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
});

// Iniciar o jogo
updateGame();

// Adicionar evento de clique ao botão de recomeçar
restartButton.addEventListener('click', restartGame);
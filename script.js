// script.js

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let image;

// Função para carregar a imagem
document.getElementById('inputImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                image = img;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Função para aplicar translação
function applyTranslation() {
    if (image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Translação (deslocamento)
        const translationX = 50;
        const translationY = 50;
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Restaura a matriz de transformação para a identidade
        ctx.translate(translationX, translationY);

        // Redesenha a imagem transformada
        ctx.drawImage(image, 0, 0, image.width, image.height);
    }
}

// Função para aplicar rotação
function applyRotation() {
    if (image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Rotação
        const rotationAngle = 45 * (Math.PI / 180); // Ângulo de rotação em radianos (45 graus)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.setTransform(1, 0, 0, 1, 0, 0); // Restaura a matriz de transformação para a identidade
        ctx.translate(centerX, centerY); // Mova o contexto para o centro da imagem
        ctx.rotate(rotationAngle); // Rotação em torno do centro
        ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height); // Redesenha a imagem transformada
        ctx.translate(-centerX, -centerY); // Restaura a posição do contexto
    }
}

// Função para limpar a imagem
function clearImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
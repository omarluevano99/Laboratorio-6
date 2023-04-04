// Array con imágenes de perritos y gatitos
const images = [
    { src: "./perritos.jpg", type: "perrito" },
    { src: "./perritos2.jpg", type: "perrito" },
    { src: "./perritos3.jpg", type: "perrito" },
    { src: "./gatitos1.jpg", type: "gatito" },
    { src: "./gatitos2.jpg", type: "gatito" },
    { src: "./gatitos3.jpg", type: "gatito" }
  ];
  
  // Seleccionar elementos del DOM
  const gameContainer = document.querySelector(".game-container");
  const startButton = document.querySelector("#start-btn");
  const restartButton = document.querySelector("#restart-btn");
  const scoreSpan = document.querySelector("#score");
  const timerSpan = document.querySelector("#timer");
  
  // Variables para el juego
  let score = 0;
  let timer = 30;
  let selected = [];
  
  // Función para mezclar aleatoriamente un array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Función para crear un elemento de imagen
  function createImageElement(src, type) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("card", type);
    img.addEventListener("click", handleCardClick);
    return img;
  }
  
  // Función para manejar el evento de clic en una imagen
  function handleCardClick() {
    // Si ya se han seleccionado 2 imágenes, no hacer nada
    if (selected.length >= 2) {
      return;
    }
  
    // Desactivar la imagen para que no se pueda hacer clic de nuevo
    this.removeEventListener("click", handleCardClick);
  
    // Mostrar la imagen seleccionada
    this.classList.add("selected");
    selected.push(this);
  
    // Si se han seleccionado 2 imágenes, comprobar si son iguales
    if (selected.length === 2) {
      const [card1, card2] = selected;
  
      // Si son iguales, sumar puntos y desactivar las imágenes
      if (card1.classList[1] === card2.classList[1]) {
        score++;
        scoreSpan.textContent = score;
        selected = [];
        // Si todas las imágenes ya fueron encontradas, mostrar mensaje de victoria
        if (score === images.length / 2) {
          clearInterval(timerInterval);
          gameContainer.textContent = "¡Ganaste!";
          restartButton.classList.remove("d-none");
        }
      } else {
        // Si no son iguales, esperar 1 segundo y voltearlas
        setTimeout(() => {
          card1.classList.remove("selected");
          card2.classList.remove("selected");
          card1.addEventListener("click", handleCardClick);
          card2.addEventListener("click", handleCardClick);
          selected = [];
        }, 1000);
      }
    }
  }
  
  function startGame() {
    shuffleArray(cardsArray);
    createBoard();
  
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('click', flipCard);
    });
  
    timeInterval = setInterval(() => {
      timeCounter++;
      displayTime(timeCounter);
    }, 1000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    startGame();
  });
  
   
  
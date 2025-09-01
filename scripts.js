//variaveis de estado do jogo
let flippedCards = []
let matchePairs = 0;
let attempts = 0;
let isCheckingPair = false;
//Array com todas as cartas do jogo

const cardItems = [
  { id: 1, content: "🤩", matched: false },
  { id: 2, content: "🤩", matched: false },
  { id: 3, content: "🫦", matched: false },
  { id: 4, content: "🫦", matched: false },
  { id: 5, content: "🐶", matched: false },
  { id: 6, content: "🐶", matched: false },
  { id: 7, content: "🍀", matched: false },
  { id: 8, content: "🍀", matched: false },
  { id: 9, content: "🔥", matched: false },
  { id: 10, content: "🔥", matched: false },
  { id: 11, content: "🎯", matched: false },
  { id: 12, content: "🎯", matched: false },
  { id: 13, content: "🎮", matched: false },
  { id: 14, content: "🎮", matched: false },
  { id: 15, content: "🏖", matched: false },
  { id: 16, content: "🏖", matched: false },

]


//função que embaralhar as cartas
function shuffledcards(array) {
  const embaralha = array.sort(() => (Math.random() > 0.5 ? 1 : - 1));
  return embaralha;
}


//função que cria as cartas
function createCard(card) {
  //criando o elemento principal da carta
  const cardElement = document.createElement("div");
  cardElement.className = "card";


  //criando o elemento do emoji
  const emoji = document.createElement("span");
  emoji.className = "card-emoji";
  emoji.textContent = card.content;

  //adicionando o span(emoji) dentro da div
  cardElement.appendChild(emoji); //adiciona o emoji ao card

  //adiciona o evento de clique na carta
  cardElement.addEventListener("click", () => handleCardClick(cardElement, card));
  return cardElement;
}


//função que renderiza as cartas 
function renderCards() {
  const deck = document.getElementById("deck");

  deck.innerHTML = "";

  const cardsEmbaralhadas = shuffledcards(cardItems);
  //forEach percorrer as cartas e não retorna nada igual o map
  cardsEmbaralhadas.forEach((item) => {
    const cardElement = createCard(item);// recebemos o elemento = chamamos a função
    deck.appendChild(cardElement); //adicionando a carta ao deck
  })
}

//função de evento click
function handleCardClick(cardElement, card) {

  if (isCheckingPair || cardElement.classList.contains("revealed")) {
    return;
  }

  //revela a carta
  cardElement.classList.add("revealed");
  flippedCards.push({ cardElement, card })
  if (flippedCards.length === 2) {
    isCheckingPair = true;
    //incrementa o contador de tentativas
    attempts++

    //seleciona as cartas
    //desestruturando o array
    const [firstCard, secondCard] = flippedCards;

    //verifica se as cartas formam um par
    if (firstCard.card.content === secondCard.card.content) {
      //incrementa os pares encontrados.
      matchePairs++

      //marcar as cartas encontradas
      cardItems.forEach(item => {
        if (item.content === firstCard.card.content) {
          item.matched = true;
        }
      })

      //limpa array de cartas viradas.
      flippedCards = [];
      //libera proxima rodada
      isCheckingPair = false;
      //atualiza o status
      updateStates();
      //verifica se tem itens para encontrar.
      const tofind = cardItems.find((item) => item.matched === false);

      if (!tofind) {
        alert("Parabens, você encontrou todos os pares!");
      }

    } else {
      setTimeout(() => {
        //removendo a classe que o par não bater
        firstCard.cardElement.classList.remove("revealed");
        secondCard.cardElement.classList.remove("revealed");
        //limpa array de cartas viradas.
        flippedCards = [];
        //libera proxima rodada
        isCheckingPair = false;
        //atualiza o status
        updateStates();
      }, 1000);
    }
  }

}

//atualizando o acertos e tentativas
function updateStates() {
  document.getElementById("stats").textContent = `${matchePairs} acertos de ${attempts} tentativas`;
}


//reiniciar o jogo
function resetGame() {
  flippedCards = [];
  matchePairs = 0;
  attempts = 0;
  isCheckingPair = false;

  //desmarcar todas as cartas
  cardItems.forEach((cardreset) => (cardreset.matched = false))

  //renderiza novamente e atualiza o placar.
  renderCards()
  updateStates();
}

function initGames() {
  renderCards();

  //adiciona o evento de reiniciar o jogo no botão.
  document.getElementById("restart").addEventListener("click", resetGame)
}
//reseta as cartas

initGames();
const cardContainer = document .getElementById ("cards");
let firstCard, secondCard;
let cards = [];
let score = 0
let lockBoard = false ;

document.getElementById("score").textContent="Score:"+ score;
fetch("./data/cards.json")
.then((res)=> res.json())
.then ((data) => {
    cards = [...data,...data];
    shuffleCards();
    generateCards();
    console.log(cards);

})
function shuffleCards(){
    let currentIndex = cards.length
    let randomIndex;
    let tempValue;
    while (currentIndex !==0){
        randomIndex= Math.floor(Math.random()*currentIndex);
        currentIndex--;
        tempValue = cards[currentIndex];
        cards[currentIndex]= cards [randomIndex];
        cards[randomIndex]= tempValue;
    }
}
function generateCards(){
for ( let card of cards ){
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    
    cardElement.setAttribute( "data-name", card.name );
    cardElement.innerHTML=`
    <div class="front">
    <img class="front-image"src=${card.image}>
    </div>
    <div class="back"> </div>
    `;
    cardContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCards)
    cardElement.addEventListener("touch", flipCards)
}
} 
function flipCards(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add("flipped");
    if (!firstCard){
        firstCard=this;
        return;
    }
    secondCard= this;

 lockBoard=true;
 checkForMatch();

}
function checkForMatch(){
    let isMatch = firstCard.dataset.name=== secondCard.dataset.name;
    if(isMatch){
        disableCard();

    }
    else {
        unflipCards();

    }
}

function disableCard(){
    firstCard.removeEventListener("click", flipCards);
    secondCard.removeEventListener("click", flipCards);
    firstCard.removeEventListener("touch", flipCards);
    secondCard.removeEventListener("touch", flipCards);
    score++;
    document.getElementById("score").textContent="Score:"+ score;
    unlockBoard();
}
function unflipCards(){
    setTimeout(()=>{
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        unlockBoard();
    }, 1000);

}
function unlockBoard(){
    firstCard=null;
    secondCard= null;
    lockBoard = false;
}
function restart (){
    shuffleCards();
    unlockBoard();
    cardContainer.innerHTML ="";
    generateCards();
    score = 0;
    document. getElementById("score").
    textContent= score ;
}

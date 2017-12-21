/*
 * Create a list that holds all of your cards
 */

// var cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];

var cards = [
    {"name": "diamond1", "icon": "fa fa-diamond"},
    {"name": "diamond2", "icon": "fa fa-diamond"},
    {"name": "plane1", "icon": "fa fa-paper-plane-o"},
    {"name": "plane2", "icon": "fa fa-paper-plane-o"},
    {"name": "anchor1", "icon": "fa fa-anchor"},
    {"name": "anchor2", "icon": "fa fa-anchor"},
    {"name": "bolt1", "icon": "fa fa-bolt"},
    {"name": "bolt2", "icon": "fa fa-bolt"},
    {"name": "cube1", "icon": "fa fa-cube"},
    {"name": "cube2", "icon": "fa fa-cube"},
    {"name": "leaf1", "icon": "fa fa-leaf"},
    {"name": "leaf2", "icon": "fa fa-leaf"},
    {"name": "bike1", "icon": "fa fa-bicycle"},
    {"name": "bike2", "icon": "fa fa-bicycle"},
    {"name": "bomb1", "icon": "fa fa-bomb"},
    {"name": "bomb2", "icon": "fa fa-bomb"}
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var deck = shuffle(cards);
// console.log(cards);

// function that places an icon on each card
function placeCards2(array) {
    var index = 0;
    $('.card i').each(function () {
        var icon = cards[index].icon;
        $(this).addClass(icon);
        index++;
    });
}

placeCards2(deck);
console.log(deck);


// event listener that add classes open show when card is clicked and icon to open cards array
var openCards = [];
var openClass = [];
var card = $('.card');

// if cards do not match, cards flip over and arrays clear
function flipCards() {
    openClass[0].removeClass('open show');
    openClass[1].removeClass('open show');
    clearArray(openClass);
    clearArray(openCards);
}

// clears the arrays
function clearArray(array){
    array.pop();
    array.pop();
}


card.on('click', function () {
    var clicked = $(this);
    var picClass = $(clicked).children().attr("class");


    clicked.addClass('open show');

    if (openCards.length < 2) {
        openClass.push(clicked);
        openCards.push(picClass);
    }

    if (openCards.length === 2) {
        if (openCards[0] !== openCards[1]) {
            console.log("no match");
            setTimeout(function () {
                flipCards();
            }, 2000);
        }
        else {
            clearArray(openClass);
            clearArray(openCards);
        }
    }

});


console.log(openCards);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


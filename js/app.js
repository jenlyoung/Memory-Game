/*
 * Create a list that holds all of your cards
 */

// var cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
//variable for the cards
const cards = [
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

//variables for cards
const card = $('.card');
cardIcon = $('.card i');

//variable for restart
const restart = $('.restart');

// variables for placing cards
const deck = shuffle(cards);

// variables for stars
const stars = $('.stars i');

//variable for onclick
const moveCount = $('.moves');
openCards = [];
openClass = [];
let moves = 0;
correctPairs = 1;
wrongAnswer = 1;

//variables for time counter
startTime = null;
endTime = null;

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

// function that places an icon on each card

function placeCards2(array) {
    let index = 0;
    moveCount.html('0');
    cardIcon.each(function () {
        let icon = cards[index].icon;
        $(this).addClass(icon);
        index++;
    });
}

placeCards2(deck);


//event listener to restart game
restart.on('click', function () {
    startTime = null;
    card.removeClass('open show match fail bounce');
    cardIcon.removeClass();
    stars.removeClass('wrong');
    moveCount.html('0');
    placeCards2(deck);
    console.log("working");
    console.log(deck);
});

//function that adds match and bounce animation is cards match
function matchCards() {
    for (const openCard of openCards) {
        openCard.addClass('match bounce');
    }
    // openCards[0].addClass('match bounce');
    // openCards[1].addClass('match bounce');
}

//function that adds class fail and bounce to cards if they don't match and colors in a star
function wrongCards() {
    for (const openCard of openCards) {
        openCard.addClass('fail bounce');
    }
    // openCards[0].addClass('fail bounce');
    // openCards[1].addClass('fail bounce');
    placeStars(wrongAnswer);
}

// clears the arrays
function clearArray(array) {
    array.splice(0, 2);
}

// if cards do not match, cards flip over and arrays clear
function flipCards() {
    for (const openCard of openCards) {
        openCard.removeClass('open show fail bounce');
    }
    // openCards[0].removeClass('open show fail bounce');
    // openCards[1].removeClass('open show fail bounce');
    clearArray(openClass);
    clearArray(openCards);
}

//function that colors the stars if there is a wrong answer
function placeStars(x) {
    if (x === 1) {
        $('.star-1').addClass('wrong');
    }
    if (x === 2) {
        $('.star-2').addClass('wrong');
    }
    if (x === 3) {
        $('.star-3').addClass('wrong');
    }
}

function gameOver() {
    if (wrongAnswer === 4) {
        alert("Sorry, Game Over!");
    }
}

function winGame() {
    if (correctPairs === 2) {
        if (!endTime) {
            endTime = new Date();
        }
        let resultInSeconds = diffTime(endTime, startTime);
        console.log("end time" + endTime);
        alert("You Won in" + resultInSeconds + "seconds");
    }
}

// function gets the result of time elapsed in seconds
function diffTime(t2, t1) {
    let diffTime = t2.getTime() - t1.getTime(); // This will give difference in milliseconds
    let resultInSeconds = Math.round(diffTime / 1000);
    return resultInSeconds;
}

// event listener that works when a card  is clicked
card.on('click', function () {
    if (!startTime) {
        startTime = new Date();
    }
    moves++;
    $('.moves').html(moves);
    console.log(startTime);
    let clicked = $(this);
    let picClass = $(clicked).children().attr("class");

    clicked.addClass('open show');

    if (openCards.length < 2) {
        openCards.push(clicked);
        openClass.push(picClass);
    }

    if (openCards.length === 2) {

        if (openClass[0] !== openClass[1]) {
            console.log("no match");
            wrongCards();
            setTimeout(function () {
                flipCards();
                gameOver();
            }, 2000);
            wrongAnswer++;
            console.log(wrongAnswer);
        }

        else {
            matchCards();
            clearArray(openClass);
            clearArray(openCards);
            correctPairs++;
            setTimeout(function () {
                winGame();
            }, 2000);
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


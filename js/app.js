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
const card = $('.card'),
    cardIcon = $('.card i');

//variable for restart
const restart = $('.restart');

// variables for stars
const stars = $('.stars i');

//variables for onclick
const moveCount = $('.moves'),
    openCards = [],
    openClass = [];
let moves = 0,
    correctPairs = 0,
    wrongAnswer = 1,
    isClicked = false,

//variables for time counter
    startTime = null,
    endTime = null;

//variables for modal
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

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
function placeCards(array) {
    let index = 0;
    moveCount.html('0');
    cardIcon.each(function () {
        let icon = cards[index].icon;
        $(this).addClass(icon);
        index++;
    });
}
placeCards(shuffle(cards));


//event listener to restart game
restart.on('click', function () {
    startTime = null;
    endTime = null;
    card.removeClass('open show match fail bounce locked');
    cardIcon.removeClass();
    stars.removeClass('wrong');
    moveCount.html('0');
    moves = 0;
    wrongAnswer = 1;
    correctPairs = 0;
    placeCards(shuffle(cards));
    console.log(deck);
});

//function that adds match and bounce animation is cards match
function matchCards() {
    for (const openCard of openCards) {
        openCard.addClass('match bounce');
    }
}

//function that adds class fail and bounce to cards if they don't match and colors in a star
function wrongCards() {
    for (const openCard of openCards) {
        openCard.addClass('fail bounce');
    }
    placeStars(wrongAnswer);
}

// clears the arrays
function clearArray() {
    openCards.splice(0,2);
    openClass.splice(0,2);
}

// if cards do not match, cards flip over and arrays clear
function flipCards() {
    if (wrongAnswer < 4) {
        for (const openCard of openCards) {
            openCard.removeClass('open show fail bounce locked');
        }
    }
    else {
        gameOver();
    }
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

function move() {
    moves++;
    $('.moves').html(moves);
}

function gameOver() {
    if (wrongAnswer === 4) {
        // toggleModal();
        alert("you loose");
    }
}

function winGame() {
    if (correctPairs === 8) {
        // if (!endTime) {
        //     endTime = new Date();
        // }
        // let resultInSeconds = diffTime(endTime, startTime);
        // toggleModal();
        // console.log("end time" + endTime);
        alert("You win!");
    }
}

// function gets the result of time elapsed in seconds
function diffTime(t2, t1) {
    let diffTime = t2.getTime() - t1.getTime(); // This will give difference in milliseconds
    let resultInSeconds = Math.round(diffTime / 1000);
    return resultInSeconds;
}

card.on('click', function () {
    let clicked = $(this);
    let picClass = $(clicked).children().attr("class");

    //if array if full, clear the array
    if (openCards.length === 2) {
        clearArray();
    }
    //
    // if (openClass.length === 2) {
    //     clearArray(openClass);
    // }

    // card open already, exit
    if (clicked.hasClass('locked')) {
        return;
    }

    // when clicked
    isClicked = true;

    // if (!startTime) {
    //     startTime = new Date();
    // }
    // console.log(startTime);

    //
    if (isClicked === true) {
        openCards.push(clicked);
        openClass.push(picClass);
        clicked.addClass('open show locked');
        move();
    }

    if (openCards.length === 2) {
        //match
        if (openClass[0] === openClass[1]) {
            matchCards();
            correctPairs++;
            setTimeout(function () {
                winGame();
                isClicked = false;
            }, 800);
        }
        //no match
        else {
            wrongCards();
            wrongAnswer++;
            console.log(wrongAnswer);
            setTimeout(function () {
                flipCards();
                isClicked = false;
            }, 800);
        }
    }
    else {
        isClicked = false;
    }
});

// // event listener that works when a card  is clicked
// card.on('click', function () {
//     let clicked = $(this);
//     let picClass = $(clicked).children().attr("class");
//
//     if (isClicked) {
//         return
//     }
//
//     if (clicked.hasClass('locked')){
//         return;
//     }
//
//     isClicked = true;
//
//     if (!startTime) {
//         startTime = new Date();
//     }
//     console.log(startTime);
//
//     move();
//
//     clicked.addClass('open show locked');
//
//     if (openCards.length < 2) {
//         openCards.push(clicked);
//         openClass.push(picClass);
//     }
//
//     if (openCards.length === 2) {
//
//         if (openClass[0] !== openClass[1]) {
//             console.log(openCards);
//             wrongCards();
//             wrongAnswer++;
//             console.log(wrongAnswer);
//             setTimeout(function () {
//                 flipCards();
//                 // gameOver();
//                 isClicked = false;
//             }, 800);
//             // wrongAnswer++;
//             // console.log(wrongAnswer);
//         }
//         else {
//             console.log(openCards);
//             matchCards();
//             clearArray(openClass);
//             clearArray(openCards);
//             correctPairs++;
//             winGame();
//             isClicked = false;
//             // setTimeout(function () {
//             //     winGame();
//             // }, 2000);
//         }
//     } else {
//         isClicked = false;
//     }
// });
//

console.log(openCards);


// function toggleModal() {
//     $('.modal-content').html("<h>test</h>");
//     modal.classList.toggle("show-modal");
// }

// closeButton.addEventListener("click", toggleModal);

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


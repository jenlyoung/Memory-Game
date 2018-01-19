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
// let deck = (shuffle(cards));

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
    timeIntervalId,
    timeElapsed;

//variables for modals
const playAgain = $('.play-again'),
    closeButton = $('.close-button'),
    winModal = document.getElementById('winModal');

//functions to place cards--shuffle and place cards
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
function placeCards(x) {
    let index = 0;
    moveCount.html('0');
    cardIcon.each(function () {
        let icon = cards[index].icon;
        $(this).addClass(icon);
        index++;
    });
}
placeCards(shuffle(cards));

//function to clear board and restart game
function clearBoard() {
    clearInterval(timeIntervalId);
    $("#timer").html("0d 0h 0m 0s");
    card.removeClass('open show match fail bounce locked');
    cardIcon.removeClass();
    stars.removeClass('fa-star-o').addClass('fa-star');
    moveCount.html('0');
    moves = 0;
    wrongAnswer = 1;
    correctPairs = 0;
    placeCards(shuffle(cards));
}

// clears the array of open cards
function clearArray() {
    openCards.splice(0, 2);
    openClass.splice(0, 2);
}

//event listener to restart game
restart.on('click', function () {
    clearBoard();
});

//functions for animation of game when played

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

// if cards do not match, cards flip over and arrays clear
function flipCards() {
    if (wrongAnswer) {
        openCards[0].removeClass('open show fail bounce locked');
        openCards[1].removeClass('open show fail bounce locked');
    }
}

//function that changes star type based on # wrong answers
function placeStars(x) {
    if (x < 4){
        $('.star-rate').html(3);
    }
    if (x === 5) {
        $('.star-3').removeClass('fa-star').addClass('fa-star-o');
        $('.star-rate').html(2);
    }
    if (x === 9) {
        $('.star-2').removeClass('fa-star').addClass('fa-star-o');
        $('.star-rate').html(1);

    }
    if (x === 13) {
        $('.star-1').removeClass('fa-star').addClass('fa-star-o');
        $('.star-rate').html(0);
    }
}

// increments the moves
function move() {
    moves++;
    $('.moves').html(moves);
}

//function to start timer
function startGame() {
    startTime = new Date().getTime();

    // Update the time every 1 second
    timeIntervalId = setInterval(function () {
        // Get current time
        let currentTime = new Date().getTime();

        // have the startTime begin at 0
        let totalTime = currentTime - startTime;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

        // Output the result in an element with id="timer"
        $("#timer").html(days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ");

        //creates a variable with final time for modal and adds it to the HTML
        timeElapsed = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        document.getElementById("timeCompleted").innerHTML = timeElapsed;
    }, 1000);
}


//functions for the modals

// event listener for play again button
playAgain.on('click', function () {
    winModal.style.display = "none";
    clearBoard();
});

// const closeButton = $('.close-button');
closeButton.on('click', function () {
    winModal.style.display = "none";
    // looseModal.style.display = "none";
    clearBoard();
});

function openWinModal() {
    winModal.style.display = "flex";
}

function endGame() {
    if (correctPairs === 8) {
        openWinModal();
        clearInterval(timeIntervalId);
    }
}

/**
 * @ description: onclick function that:
 * adds open cards to an array and clear the array after 2 cards are clicked
 * open and closes cards when clicked
 * changes colors of cards based on correct or wrong answer
 * adds animation when a pair of cards has been clicked
 * ends game
 *
 */
card.on('click', function () {
    let clicked = $(this);
    let picClass = $(clicked).children().attr("class");

    // card open already, exit
    if (clicked.hasClass('locked')) {
        return;
    }

    if (isClicked) {
        return;
    }

    // when clicked
    isClicked = true;
    openCards.push(clicked);
    openClass.push(picClass);
    clicked.addClass('open show locked');
    move();

    //start timer
    if (moves === 1) {
        startGame();
    }

    if (openCards.length === 2) {
        //match
        if (openClass[0] === openClass[1]) {
            matchCards();
            correctPairs++;
            setTimeout(function () {
                endGame();
                isClicked = false;
                clearArray();
            }, 800);
        }
        //no match
        else {
            wrongCards();
            wrongAnswer++;
            $('.num-wrong').html(wrongAnswer - 1);
            setTimeout(function () {
                flipCards();
                isClicked = false;
                clearArray();
            }, 1000);
        }
    }
    else {
        isClicked = false;
    }
});




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
let deck = (shuffle(cards));

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
    // timeIntervalId,
    // timeElapsed,

//variables for time counter
    timeIntervalId,
    timeElapsed;

//variables for modals
const playAgain = $('.play-again'),
    showAll = $('.show-all');
closeButton = $('.close-button');

const winModal = document.getElementById('winModal');
const looseModal = document.getElementById('looseModal');


//functions to place cards--shuffle and place cards
// Shuffle function from http://stackoverflow.com/a/2450976
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

//function to clear board and restart game
function clearBoard() {
    clearInterval(timeIntervalId);
    $("#timer").html("0d 0h 0m 0s");
    card.removeClass('open show match fail bounce locked');
    cardIcon.removeClass();
    stars.removeClass('wrong');
    moveCount.html('0');
    moves = 0;
    wrongAnswer = 1;
    correctPairs = 0;
    placeCards(shuffle(cards));
}

// clears the arrays
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
    if (wrongAnswer < 5) {
        openCards[0].removeClass('open show fail bounce locked');
        openCards[1].removeClass('open show fail bounce locked');
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
    if (x === 4) {
        $('.star-4').addClass('wrong');
    }
}

function move() {
    moves++;
    $('.moves').html(moves);
}

//function to start timer
function startGame() {
    startTime = new Date().getTime();

    // Update the count down every 1 second
    timeIntervalId = setInterval(function () {
        // Get current time
        let currentTime = new Date().getTime();

        // have the startTime begin at 0
        let totalTime = currentTime - startTime;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
        var hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

        // Output the result in an element with id="timer"
        // document.getElementById("timer").innerHTML =

        $("#timer").html(days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ");

        //creates a variable with final time for modal
        timeElapsed = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        document.getElementById("timeCompleted").innerHTML = timeElapsed;
    }, 1000);
}

//function to end game and pop up modal
function endGame() {
    const isGameOver = wrongAnswer === 5 || correctPairs === 1;
    if (!isGameOver) {
        return;
    }
    if (wrongAnswer === 5) {
        openLooseModal();
        console.log("game over");
    }
    if (correctPairs === 8) {
        $('.num-wrong').html(wrongAnswer - 1);
        openWinModal();
        console.log("you win");
    }
    clearInterval(timeIntervalId);
}


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
            // console.log(wrongAnswer);
            $('.num-wrong').html(wrongAnswer - 1);
            setTimeout(function () {
                flipCards();
                endGame();
                isClicked = false;
                clearArray();
            }, 1000);
        }
    }
    else {
        isClicked = false;
    }
});

//functions for the modals
// event listener for play again button
playAgain.on('click', function () {
    winModal.style.display = "none";
    looseModal.style.display = "none";
    clearBoard();
});

//event listener for reveal all button
showAll.on('click', function () {
    card.addClass('open show locked');
    looseModal.style.display = "none";
})

// const closeButton = $('.close-button');
closeButton.on('click', function () {
    winModal.style.display = "none";
    looseModal.style.display = "none";
    clearBoard();
});

function openWinModal() {
    winModal.style.display = "flex";
};

function openLooseModal() {
    looseModal.style.display = "flex";
};





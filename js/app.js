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
let deck = (shuffle(cards));
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
    timeIntervalId,
    timeElapsed,

//variables for time counter
    startTime = null,
    endTime = null;

//variables for modal
// var modal = document.querySelector(".modal");
// var trigger = document.querySelector(".trigger");
// var closeButton = document.querySelector(".close-button");

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


function clearBoard(){
    clearInterval(timeIntervalId);
    // startTime = null;
    // endTime = null;
    $( "#timer" ).html("0d 0h 0m 0s");
    card.removeClass('open show match fail bounce locked');
    cardIcon.removeClass();
    stars.removeClass('wrong');
    moveCount.html('0');
    moves = 0;
    wrongAnswer = 1;
    correctPairs = 0;
    placeCards(shuffle(cards));
}
//event listener to restart game
restart.on('click', function () {
    clearBoard();
    // clearInterval(timeIntervalId);
    // // startTime = null;
    // // endTime = null;
    // $( "#timer" ).empty();
    // card.removeClass('open show match fail bounce locked');
    // cardIcon.removeClass();
    // stars.removeClass('wrong');
    // moveCount.html('0');
    // moves = 0;
    // wrongAnswer = 1;
    // correctPairs = 0;
    // placeCards(shuffle(cards));
});

// // event listener for playagain button
const playAgain = $('.playAgain');
playAgain.on('click', function () {
    winModal.style.display = "none";
    looseModal.style.display="none";
    clearBoard();
    // clearInterval(timeIntervalId);
    // // startTime = null;
    // // endTime = null;
    // $( "#timer" ).empty();
    // card.removeClass('open show match fail bounce locked');
    // cardIcon.removeClass();
    // stars.removeClass('wrong');
    // moveCount.html('0');
    // moves = 0;
    // wrongAnswer = 1;
    // correctPairs = 0;
    // placeCards(shuffle(cards));
});

const showAll = $('.show-all');
showAll.on('click', function (){
    card.addClass('open show');
    looseModal.style.display="none";
})

const closeButton = $('.closeButton');
closeButton.on('click', function (){
    winModal.style.display = "none";
    looseModal.style.display="none";
    clearBoard();
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
    openCards.splice(0, 2);
    openClass.splice(0, 2);
}

// if cards do not match, cards flip over and arrays clear
function flipCards() {
    if (wrongAnswer < 5) {
        for (const openCard of openCards) {
            openCard.removeClass('open show fail bounce locked');
        }
    }
    else {
        // gameOver();
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

function endGame() {
    const isGameOver = wrongAnswer === 5 || correctPairs === 1;
    if (!isGameOver) {
        return;
    }
    if (wrongAnswer === 5) {
        openLooseModal();
        console.log("game over");
    }
    if (correctPairs === 1) {
        $('.num-wrong').html(wrongAnswer - 1);
        openWinModal();
        console.log("you win");
    }
    clearInterval(timeIntervalId);
}

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

        $( "#timer" ).html(days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ");

        //creates a variable with final time for modal
        timeElapsed = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        document.getElementById("timeCompleted").innerHTML = timeElapsed;
    }, 1000);
}

// function gets the result of time elapsed in seconds
// function diffTime(t2, t1) {
//     let diffTime = t2.getTime() - t1.getTime(); // This will give difference in milliseconds
//     let resultInSeconds = Math.round(diffTime / 1000);
//     return resultInSeconds;
// }

card.on('click', function () {
    let clicked = $(this);
    let picClass = $(clicked).children().attr("class");

    //if array if full, clear the array
    if (openCards.length === 2) {
        clearArray();
    }

    // card open already, exit
    if (clicked.hasClass('locked')) {
        return;
    }

    // when clicked
    isClicked = true;

    //
    if (isClicked === true) {
        openCards.push(clicked);
        openClass.push(picClass);
        clicked.addClass('open show locked');
        move();
        // currentTime = new Date().getTime();
    }

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
            }, 800);
        }
        //no match
        else {
            wrongCards();
            wrongAnswer++;
            // console.log(wrongAnswer);
            $('.num-wrong').html(wrongAnswer -1);
            setTimeout(function () {
                flipCards();
                endGame();
                isClicked = false;
            }, 800);
        }
    }
    else {
        isClicked = false;
    }
});


console.log(openCards);


// Get the modal
// var modal = document.getElementById('myModal');
const winModal = document.getElementById('winModal');
const looseModal = document.getElementById('looseModal');

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function openWinModal() {
    winModal.style.display = "flex";
};

function openLooseModal() {
    looseModal.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
// span.on('click', function() {
//     looseModal.style.display = "none";
//     winModal.style.dislay = "none";
// })


// When the user clicks anywhere outside of the modal, close it
// function openModal(){
//     modal.style.display = "none";
// }

// function toggleModal() {
//     const timeMessage = "You got all 8 matches in " + endTime;
//     // let endTime = $('#timer');
//     $('.modal-content').append("<h1>Congratulations!</h1><p>timeMessage</p>");
//     modal.classList.toggle("show-modal");
// }
//
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


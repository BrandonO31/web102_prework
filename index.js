/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

    for (let i = 0; i < games.length; i++) {
// 0 - 10
        // create a new div element, which will become the game card
        let div = document.createElement('div');


        // add the class game-card to the list
        div.className = 'game-card';

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        let game_info = `
            <img src="${games[i].img}" alt="Image" class="game-img">
            <h2>${games[i].name}</h2>
            <p>${games[i].description}</p>
`
        div.innerHTML = game_info;

        // append the game to the games-container
        gamesContainer.append(div);
    }
}
// call the function we just defined using the correct variable

addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

let totalContributions = GAMES_JSON.reduce( (acc, game) => acc + game.backers ,0 );


// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `
    <p>${totalContributions.toLocaleString('en-US')} </p> 
`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalPledged = GAMES_JSON.reduce( (acc, game) => acc + game.pledged ,0 );

// set inner HTML using template literal
raisedCard.innerHTML = `
    <p>$${totalPledged.toLocaleString('en-US')}</p>
`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
let unfundedGames = GAMES_JSON.filter(games => {
    if (games.pledged < games.goal) {
        return true;
    }
    else return false;
});

    // use the function we previously created to add the unfunded games to the DOM
addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let FundedGames = GAMES_JSON.filter(games => {
        if (games.pledged > games.goal) {
            return true;
        }
        else return false;
    })

    // use the function we previously created to add unfunded games to the DOM
addGamesToPage(FundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let totalUnfundedGames = GAMES_JSON.reduce((acc, games) => {
    if (games.pledged < games.goal) {
        return ++acc;
    }
    else return acc;
}, 0);
``


// create a string that explains the number of unfunded games using the ternary operator
let amtFunded = GAMES_JSON.reduce((acc, games) =>  acc + games.pledged, 0);


const displayStr1 =
    `A total of <span class="special-desc-text"> ${amtFunded.toLocaleString('en-US')}</span> has been raised for 4 games. 
    Currently, <span class="special-desc-text">${GAMES_JSON.length > 1 ? `${totalUnfundedGames} </span> games remain unfunded.` : `${GAMES_JSON.length} game remains unfunded.` } 
    We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
let fundingDescription = document.createElement('p');
fundingDescription.innerHTML = displayStr1;
descriptionContainer.append(fundingDescription);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1  /*GAMES_JSON[i]*/, item2/*GAMES_JSON[i-1]*/) => {
    // console.log('item1:'+ item1.name ,'|item2:' + item2.name, '|diff:' + (item2.pledged - item1.pledged));
    return item2.pledged - item1.pledged; //descending order
});


// use destructuring and the spread operator to grab the first and second games
let [no1PledgedGame , no2PledgedGame] = [...sortedGames];

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledgedGame = document.createElement('p');
topPledgedGame.innerHTML = no1PledgedGame.name;
firstGameContainer.append(topPledgedGame);
// do the same for the runner up item
const secondTopPledgedGame = document.createElement('p');
secondTopPledgedGame.innerHTML = no2PledgedGame.name;
secondGameContainer.append(secondTopPledgedGame);



const gameSearchBox = document.getElementById('game-search-box');
const gameSearchButton = document.getElementById('gameSearch-button');


gameSearchButton.addEventListener('click' , () => {
    const searchInput = gameSearchBox.value.toLowerCase();
    console.log(searchInput);

    let matchingResults = [];
    if (searchInput) {
        matchingResults = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchInput));
        deleteChildElements(gamesContainer);
        addGamesToPage(matchingResults);
    }

});

gameSearchButton.addEventListener("click", () => {
    gamesContainer.scrollIntoView({ behavior: "smooth" });
})




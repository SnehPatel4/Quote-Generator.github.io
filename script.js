const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loader
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quotes
function newQuote() {
    loading();
    // Pick random quote from apiQuotes array.
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //if you want to fetch quotes locally then add localQuotes instead of variable apiQuotes in this function and call this function at the end.
    // localQuotes is the variable name in which stores all quotes in quotes.js file.
    
    //check if author feild is blank then replacde with 'unknown'.
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to detrermine styling.
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set quote, hide loader.
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes'; 
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); //convert response into json formate.
        newQuote();
    } catch(error) {
        //catching errors.
    }
}

//Tweet Quotes
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
    window.open(twitterUrl, '_blank');
}

//Event Listners.
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
// newQuote();

// Getting The Recommendations From the Model
let RECOMMENDED_MOVIES = []
let RECOMMENDED_MOVIE_POSTERS = []
function fetchRecommendations() {
    RECOMMENDED_MOVIES = []
    RECOMMENDED_MOVIE_POSTERS = []
    movieName = document.getElementById("movie-name").value
    API_URL = `http://127.0.0.1:8000/recommendation/${movieName}`
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok'); 
            }
            return response.json();
        })
        .then(data => {
            RECOMMENDED_MOVIES = data["recommendations"];
            fetchAndShowRecommendedMovies(RECOMMENDED_MOVIES);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
async function fetchMovieDetails(movieName) {
    console.log("Fetching Movie Poster of ",movieName);
    const DETAILS_ENDPOINT = `http://www.omdbapi.com/?t=${movieName}&apiKey=a9c6976d`;
    try {
        const response = await fetch(DETAILS_ENDPOINT);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        let posterurl = data["Poster"]
        console.log(posterurl)
        RECOMMENDED_MOVIE_POSTERS.push(posterurl);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}


function showRecommendations() {
    // Get the container element where recommendation cards will be appended
    const container = document.getElementById('recommendation-container');
    container.innerHTML = '';
    
    // Loop through the recommendations and create a card for each one
    console.log(RECOMMENDED_MOVIES,RECOMMENDED_MOVIE_POSTERS)
    for (let index = 0; index < RECOMMENDED_MOVIES.length; index++) {
        
        const card = document.createElement('div');
        card.classList.add('card');
        
        const img = document.createElement('img');
        img.src = RECOMMENDED_MOVIE_POSTERS[index];
        img.alt = RECOMMENDED_MOVIES[index];
        
        const title = document.createElement('h2');
        title.textContent = RECOMMENDED_MOVIES[index];
        
        // Append elements to the card
        card.appendChild(img);
        card.appendChild(title);
        
        // Append the card to the container
        container.appendChild(card);
    };
}

async function fetchAndShowRecommendedMovies(recommendedMovies) {
    try {
        for (const movie of recommendedMovies) {
            await fetchMovieDetails(movie);
        }
        console.log(RECOMMENDED_MOVIE_POSTERS)
        showRecommendations(recommendedMovies);
    } catch (error) {
        console.error("Error fetching or showing recommended movies:", error);
    }
}
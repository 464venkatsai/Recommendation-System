// Arrays Containers for Movie Poster URL's and Movie Name's
let RECOMMENDED_MOVIES = []
let RECOMMENDED_MOVIE_POSTERS = []
// Movie entered by user

let movieName = document.getElementById("movie-search-bar");
document.getElementById("search-btn").addEventListener("click", function() {
    console.log(movieName.value)
    fetchRecommendations(movieName.value);
});

/**
 * Function to fetch movie recommendations based on the given movie name.
 * Clears previous movie recommendations and fetchs recommendations for the current movie 
 */
function fetchRecommendations(movie_name) {
    // Showing Skeletion Animation for user
    ShowSkeletonAnimation();
    // Ensuring recommendations are empty
    RECOMMENDED_MOVIES = []
    RECOMMENDED_MOVIE_POSTERS = []
    movieName.value = movie_name
    // Fetching recommendations for the movie name
    API_URL = `http://127.0.0.1:8000/recommendation/${movie_name}`
    fetch(API_URL)
        .then(response => {if (!response.ok) {throw new Error('Network response was not ok'); }return response.json();})
        .then(data => {

            // fetching movie Poster's that are present in RECOMMENDED_MOVIES and making response
            RECOMMENDED_MOVIES = data["recommendations"];
            fetchPosterAndShowRecommendedMovies(RECOMMENDED_MOVIES);
        })
        .catch(error => {console.error('There was a problem with the fetch operation:', error);});
}

/**
 * Function to fetch the movie Poster form the OMDB api
 * Pushs movie poster URL to RECOMMENDED_MOVIE_POSTER 
 */
async function fetchMovieDetails(movieName) {
    // Fetching Movie Poster from the all the details 
    const DETAILS_ENDPOINT = `http://www.omdbapi.com/?t=${movieName}&apiKey=a9c6976d`;
    try {
        const response = await fetch(DETAILS_ENDPOINT);

        // If response was not ok throwing and network response error
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();

        // Pushing the movie poster to RECOMMENDED_MOVIE_POSTER 
        RECOMMENDED_MOVIE_POSTERS.push(data["Poster"]);
    } catch (error) {

        // Catching for unexpected error
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

/**
 * Function to show Skeletion Animation
 */
function ShowSkeletonAnimation() {
    const container = document.getElementById('recommendation-container');
    // Clearing the previous recommendations
    container.innerHTML = '';

    // Loop through the recommendations and create a card for each one
    for (let index = 0; index < 10; index++) {
        
        const card = document.createElement('div');
        card.classList.add('skeletonCard');
        // Loading the Skeletion Animation by assigning the class
        const div = document.createElement('div');
        div.classList.add('skeleton');
        
        // Append elements to the card
        card.appendChild(div); 
        
        // Append the card to the container
        container.appendChild(card);
    };
}

/**
 * Function to display the movies in front-end 
 * Clears the Previouly Recommended movies and displays current recommedations
 */
function showRecommendations() {
    // Get the container element where recommendation cards will be appended
    const container = document.getElementById('recommendation-container');
    // Clearing the previous recommendations
    container.innerHTML = '';

    // Loop through the recommendations and create a card for each one
    for (let index = 0; index < RECOMMENDED_MOVIES.length; index++) {
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.onclick = function() {
            fetchRecommendations(RECOMMENDED_MOVIES[index]);
        };
        
        const img = document.createElement('img');
        img.src = RECOMMENDED_MOVIE_POSTERS[index];
        
        const title = document.createElement('h2');
        title.textContent = RECOMMENDED_MOVIES[index];
        
        // Append elements to the card
        card.appendChild(img);
        // card.appendChild(title); 
        
        // Append the card to the container
        container.appendChild(card);
    };
}

/**
 * function to avoid the asynchronous nature and current programmming
 * executes line by line
 */
async function fetchPosterAndShowRecommendedMovies(recommendedMovies) {
    try {
        // Fetches all the movie Posters and pushing to RECOMMENDED_MOVIE_POSTERS
        for (const movie of recommendedMovies) {
            await fetchMovieDetails(movie);
        }
        // Showing the Recommedation in the front-end
        showRecommendations(recommendedMovies);
    } catch (error) {
        // Catching for Unexpected error 
        console.error("Error fetching or showing recommended movies:", error);
    }
}
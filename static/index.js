// Arrays Containers for Movie Poster URL's and Movie Name's
let RECOMMENDED_MOVIES = [];
let RECOMMENDED_MOVIE_POSTERS = [];
let CURRENT_MOVIE_DETAILS = {};

// Movie entered by user
const movieName = document.getElementById("movie-search-bar");
document.getElementById("search-btn").addEventListener("click", function() {
    console.log(movieName.value)
    fetchRecommendations(movieName.value);
});

const resultBox = document.querySelector(".result-box");
let ALL_Movies = []
/**
 * Function to fetch all the movie name for the search suggestions
 */
async function fetchAllMovieNames() {
    fetch("http://127.0.0.1:8000/getAllMovies")
    .then(response => {if (!response.ok) {throw new Error('Network response was not ok'); }return response.json();})
    .then(data => {
        ALL_Movies = data["Movies"]
    })  
    .catch(error => {console.error('There was a problem with the fetch operation:', error);});
}
async function getAllmovies(){
    await fetchAllMovieNames()
}
getAllmovies()
movieName.onkeyup = function ShowSuggestions() {
    let result = [];
    let input = movieName.value;
    if (input.length){
        result = ALL_Movies.filter((keyword)=>{
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }   
    displaySuggestions(result);
    if (!result.length) {
        resultBox.innerHTML = ""
    }
}
function displaySuggestions(result) {
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>"+list+"</li>";
    })
    resultBox.innerHTML = "<ul>"+content.join("")+"</ul>"
}
function selectInput(list){
    movieName.value = list.innerHTML;
    resultBox.innerHTML = ''
    fetchRecommendations(movieName.value)
}
/**
 * Function to show movie information 
 * Clears Previous movie details and shows current movie details
 */
function showMovieDetails() {
    // Getting the parent class
    let parent = document.getElementsByClassName("container")[0]
    parent.innerHTML = ""
    // Create the main section element with class "movie-details"
    let movieDetailsSection = document.createElement("section");
    movieDetailsSection.classList.add("movie-details");
    // Create the section for the movie poster
    let posterSection = document.createElement("section");
    let posterImage = document.createElement("img");
    posterImage.setAttribute("src", CURRENT_MOVIE_DETAILS["Poster"]);
    posterImage.setAttribute("alt", "");
    posterSection.appendChild(posterImage);

    // Create the div for movie details
    let movieDetailsDiv = document.createElement("div");

    // Create the h1 element for movie name
    let movieNameHeading = document.createElement("h1");
    movieNameHeading.textContent = CURRENT_MOVIE_DETAILS["MovieName"];

    // Create the strong element for story line
    let storyLineStrong = document.createElement("strong");
    storyLineStrong.textContent = "Story Line";

    // Create the p element for story line
    let storyLineParagraph = document.createElement("p");
    storyLineParagraph.setAttribute("id", "Story-Line");
    storyLineParagraph.textContent = CURRENT_MOVIE_DETAILS["Plot"];
    // Append story line strong and paragraph to the movie details div
    movieDetailsDiv.appendChild(movieNameHeading);
    movieDetailsDiv.appendChild(storyLineStrong);
    movieDetailsDiv.appendChild(storyLineParagraph);

    // Create the section for movie meta data
    let metaDataSection = document.createElement("section");
    metaDataSection.classList.add("movie-meta-data");

    // Array of meta data details
    let metaDataDetails = [
        { label: "Type", class: "type", value: CURRENT_MOVIE_DETAILS["Type"].charAt(0).toUpperCase() + CURRENT_MOVIE_DETAILS["Type"].slice(1)},
        { label: "Release Date", class: "release-year", value: CURRENT_MOVIE_DETAILS["Year"]},
        { label: "Genre", class: "genres", value: CURRENT_MOVIE_DETAILS["Genre"] },
        { label: "Director", class: "dicrector", value: CURRENT_MOVIE_DETAILS["Director"] },
        { label: "Cast", class: "Cast", value: CURRENT_MOVIE_DETAILS["Cast"] },
        { label: "Countries", class: "countries", value: CURRENT_MOVIE_DETAILS["Country"] },
    ];

    // Loop through meta data details and create elements
    metaDataDetails.forEach(function(detail) {
        let detailDiv = document.createElement("div");
        let detailLabel = document.createElement("b");
        detailLabel.textContent = detail.label;
        let detailValue = document.createElement("p");
        detailValue.setAttribute("class", detail.class);
        detailValue.textContent = detail.value;
        detailDiv.appendChild(detailLabel);
        detailDiv.appendChild(detailValue);
        metaDataSection.appendChild(detailDiv);
    });

    // Append poster section, movie details div, and meta data section to the main section
    movieDetailsSection.appendChild(posterSection);
    movieDetailsSection.appendChild(movieDetailsDiv);
    movieDetailsDiv.appendChild(metaDataSection)

    // Append the generated movie details section to the body or any other desired parent element
    parent.appendChild(movieDetailsSection);
}
async function showMovieDetailsSkeletonAnimation() {
    let parent = document.getElementsByClassName("container")[0];
    parent.innerHTML = `
        <section class="skeleton-section">
            <div class="SkeletionCard">
            </div>
            <div class="skeleton-meta-data">
                <h2></h2>
                <div class="story-plot"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="skeletion-movie-data">
                    <section>
                        <p></p>
                        <b></b>
                    </section>
                    <section>
                        <p></p>
                        <b></b>
                    </section>
                    <section>
                        <p></p>
                        <b></b>
                    </section>
                    <section>
                        <p></p>
                        <b></b>
                    </section>
                </div>
            </div>
        </section>
    `;
}

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
    console.log("fetching movie",movie_name)
    API_URL = `http://127.0.0.1:8000/recommendation/${encodeURIComponent(movie_name)}`;
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
async function fetchMovieDetails(movieName,currentmovie=false) {
    // Fetching Movie Poster from the all the details 
    console.log("Fetching",movieName)
    const DETAILS_ENDPOINT = `http://127.0.0.1:8000/api/${encodeURIComponent(movieName)}`;
    try {
        const response = await fetch(DETAILS_ENDPOINT);

        // If response was not ok throwing and network response error
        if (!response.ok) {throw new Error('Network response was not ok');}
        const data = await response.json();
        if (currentmovie) {
            CURRENT_MOVIE_DETAILS["Poster"] = data["Poster"];
            CURRENT_MOVIE_DETAILS["MovieName"] = data["Title"];
            CURRENT_MOVIE_DETAILS["Year"] = data["Released"];
            CURRENT_MOVIE_DETAILS["Genre"] = data["Genre"];
            CURRENT_MOVIE_DETAILS["Plot"] = data["Plot"];
            CURRENT_MOVIE_DETAILS["Director"] = data["Director"];
            CURRENT_MOVIE_DETAILS["Type"] = data["Type"];
            CURRENT_MOVIE_DETAILS["Country"] = data["Country"];
            CURRENT_MOVIE_DETAILS["Cast"] = data["Actors"];
        }else{
            // Pushing the movie poster to RECOMMENDED_MOVIE_POSTER 
            RECOMMENDED_MOVIE_POSTERS.push(data["Poster"]);
        }
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
async function showRecommendations() {
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
        showMovieDetailsSkeletonAnimation();
        await fetchMovieDetails(movieName.value,currentmovie=true)
        showMovieDetails()
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
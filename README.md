## 🚀 Movie Recommendation System Using Content Based Filtering
![movie recommeder](https://github.com/464venkatsai/Recommendation-System/assets/112299999/511e644c-d276-4b2c-bc6f-7f6bacb60d55)
## 🌐 Overview
This repository holds a movie recommedation system focusing on a IMBD dataset at This project is a movie recommendation system based on content-based filtering. It utilizes the IMDB dataset and the OMDB API to fetch movie data. Additionally, a FastAPI is implemented to provide recommendations for a given movie.

## 🗄️Data Sources
- **IMDB Dataset**: The IMDB dataset provides a comprehensive collection of movie metadata, including titles, genres, directors, and actors.
- **Links**: <a href="https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata">TMDB 5000 Movie Dataset</a> and <a href="https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset">Movies Dataset</a>. 
- **OMDB API**: The OMDB API is used to fetch additional movie details, such as ratings, plot summaries, and poster images.

## 📁 File Description
- 📁 `backend` : This folder contains the all Api files and functions for movie recommendation.
- 📁 `static` : This folder contains the styles and javascript files. 
- 📁 `Templates` : This folder HTML files that serves as frontend. 
- 📕 `.gitignore` : This file contains all the files and folder names that should be ignored. 
- 📘 `DockerFile` : This file contains the docker file. 
- 📗 `Readme` : This file provides the overview of the repository. 
-  📄 `requirements.txt` : This file contains all the dependencies and libaries required for project. 

## Workflow Of Project
![Flowchart](https://github.com/464venkatsai/Recommendation-System/assets/112299999/0e5bd74b-a374-4b8f-9bbd-ba1b9f448f42)

## 📄 Instructions for Local Execution 

- 📋 **Clone Repository**:<br>
   - To clone this repository, you only need `Git` installed on your system (globally).
   Git not installed? [Download Git From Official Site](https://git-scm.com/download/win)
   - Open VScode in the folder to get started.
   - In the terminal, enter `git clone https://github.com/464venkatsai/Recommendation-System.git .`
- 📁 **Ensure Folder Structure**<br>
<pre>
Recommendation-System/
├── backend/
│   ├── app/
│   │   ├── data/
│   │   │   ├── data.txt
│   │   │   ├── tmdb_5000_credits.csv (<a href="https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata">TMDB 5000 Movie Dataset</a>)
│   │   │   └── tmdb_5000_credits.csv (<a href="https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset">Movies Dataset</a>)
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── main.py
│   │   ├── recommeder.py
│   │   └── utils.py
│   │
├── static/
│   ├── index.js
│   └── style.css
│
├── templates/
│   └── index.html
│
└── requirements.txt
</pre>
- 🖥️ **Run Following Commands In Terminal**<br>
    - Install all the `pip install -r requirements.txt`
    - To start fastapi server  `uvicorn backend.app.main:app --reload`
    - be patient till you see Application started
    - - ![Screenshot 2024-04-12 235427](https://github.com/464venkatsai/Recommendation-System/assets/112299999/18b383c9-48cd-4ccd-8dca-65e1c00c357e)
    - finally check `http://127.0.0.1:8000` for movie recommendation system
<br>

## Docker
- If u have docker just run `docker run -it -p 8000:8000 movie_recommeder` in your terminal
- ![Screenshot 2024-04-12 235427](https://github.com/464venkatsai/Recommendation-System/assets/112299999/18b383c9-48cd-4ccd-8dca-65e1c00c357e)
- finally check `http://127.0.0.1:8000` for movie recommendation system


## 🙌 Want to contribute?
We are open to all kinds of contributions. If you want to:
- 🤔 Suggest a feature
- 🐛 Report an issue
- 🗒️ Improve documentation
- 👨‍💻 Contribute to the code

If you find project helpful show your please star and share this repository so that it can be helpful for others.

## 🛠️ Built Tools And Languages
- **HTML**
- **CSS**
- **JavaScript**
- **Python**
- **VScode**

## 🔗 Additional Resources
- 📚 **Dataset Source :** Access the original dataset from the <a href="https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata">TMDB 5000 Movie Dataset</a> and <a href="https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset">Movies Dataset</a>. 
- 🤝 **Connect on LinkedIn**: Have queries or looking for collaborations? Feel free to connect on <a href="https://www.linkedin.com/in/yogeswar-venkatasai-726275235/">Linked In</a>.
- 🌐 **Visit my Portfolio :** check out my portfolio for some cool stuff.
## 🎉 Closing Remarks
Thank you for taking the time to explore my portfolio! I hope you find my projects informative and inspiring. I am always open to feedback, collaboration opportunities, or just a friendly chat about data science.

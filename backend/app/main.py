from fastapi import FastAPI, Request
from requests.utils import requote_uri
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from backend.app.recommender import get_recommendations, cosine_sim2
from backend.app.config import API_KEY,COLLECTION,LOCAL_URL,DATABASE
from backend.app.utils import getAllMovieNames
from backend.app.db import Database
from backend.app.logger import Log
import requests

app = FastAPI()
log = Log()

templates = Jinja2Templates(directory="templates")

database = Database(LOCAL_URL,DATABASE,COLLECTION)


app.mount("/static",StaticFiles(directory="static"),name="static")

@app.get("/")
async def showHomePage(request:Request):
    log.info("Started Rendering Templates")
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/{movieName}")
async def read_item(movieName: str):
    log.info(f"Fetching for Movie {movieName}")
    try : 
        data = database.find({"Title":movieName})["Recommendations"]
        if data: 
            data.pop("_id")
            log.success(f"Fetched Results {movieName} from Mongodb")
            return data
    except Exception as e:
        log.fail("Failed to search in Mongodb")
        log.error(e)
    url =requote_uri(f'http://www.omdbapi.com/?t={movieName}&apiKey={API_KEY}')
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        database.insertOne(dict(data))
        return data
    else:
        return {"error": "Failed to fetch data from OMDb API"}
    

@app.get("/getAllMovies")
async def AllMovies():
    return {"Success": True, "Movies": list(getAllMovieNames())}

@app.get("/recommendation/{MovieName}")
async def getRecommendation(MovieName):
    recommendations = get_recommendations(MovieName, cosine_sim2)
    return {"Success": True, "recommendations": list(recommendations.values)}

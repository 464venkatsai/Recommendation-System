from fastapi import FastAPI, Request
from requests.utils import requote_uri
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from backend.app.recommender import get_recommendations, cosine_sim2
import requests

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.mount("/static",StaticFiles(directory="static"),name="static")

@app.get("/")
async def showHomePage(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/{movieName}")
async def read_item(movieName: str):
    url =requote_uri(f'http://www.omdbapi.com/?t={movieName}&apiKey=a9c6976d')
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return {"error": "Failed to fetch data from OMDb API"}
    

@app.get("/recommendation/{MovieName}")
async def getRecommendation(MovieName):
    recommendations = get_recommendations(MovieName, cosine_sim2)
    return {"Success": True, "recommendations": list(recommendations.values)}

import pandas as pd

def getAllMovieNames():
    df = pd.read_csv("./backend/app/data/tmdb_5000_credits.csv")
    return list(df["title"].values)
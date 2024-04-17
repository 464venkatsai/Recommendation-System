from pymongo import MongoClient


class Database:
    def  __init__(self,connection,databaseName,collectionName):
        self.connection = connection
        self.client = MongoClient(connection)
        self.database = self.client[databaseName]
        self.collection = self.database[collectionName]

    def insertOne(self,data):
        return self.collection.insert_one(data)

    def find(self,data:dict):
        return {"Recommendations":self.collection.find_one(data)}

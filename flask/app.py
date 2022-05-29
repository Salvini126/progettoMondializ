from flask import Flask , request, jsonify, Response
from flask_restful import Resource , Api ,reqparse
from flask_cors import CORS
from bson import json_util
import pandas as pd
from flask_pymongo import PyMongo
import geopandas

app = Flask(__name__ )

app.config["MONGO_URI"] = "mongodb://salvini:Forzainter2010@cluster0-shard-00-00.biumq.mongodb.net:27017,cluster0-shard-00-01.biumq.mongodb.net:27017,cluster0-shard-00-02.biumq.mongodb.net:27017/progettoMondiali?ssl=true&replicaSet=atlas-fj2ixn-shard-0&authSource=admin&retryWrites=true&w=majority" #bisogna anche specificare il nome del database al interno del link 

mongo = PyMongo(app)

CORS(app)
api = Api(app)


#-------------------------------------------------------------------------------------------------------------------Prova

class MondialiApi(Resource):
    def get(self,numAnno):
        mond = mongo.db.infoMondiali.find() #mondiali dal database
        dfInfo=pd.DataFrame(list(mond)) #mondiali e lo transformo in un dataframe
        world = geopandas.read_file(geopandas.datasets.get_path('naturalearth_lowres')) #recuperiamo geodataframe
        dfMerCoo= pd.merge(world,dfInfo,how="inner",left_on="name",right_on="Country") #merge infoMondiali e geometry
        anno = dfMerCoo[dfMerCoo["Year"] == numAnno].drop("_id" , axis = 1) #trova lo stato di quel anno, e drop della colonna _id
        return Response(anno.to_json(), mimetype = 'application/json')  #restituisce il json 

api.add_resource(MondialiApi, '/mondiali/<int:numAnno>', endpoint = 'task')




if __name__ == '__main__':
    app.run()
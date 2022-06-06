#importiamo le librerie che utilizzeremo
from flask import Flask , request, jsonify, Response
from flask_restful import Resource , Api ,reqparse
from flask_cors import CORS
from bson import json_util
import pandas as pd
from flask_pymongo import PyMongo
import geopandas

app = Flask(__name__ )#inizializziamo l'app

app.config["MONGO_URI"] = "mongodb://salvini:Forzainter2010@cluster0-shard-00-00.biumq.mongodb.net:27017,cluster0-shard-00-01.biumq.mongodb.net:27017,cluster0-shard-00-02.biumq.mongodb.net:27017/progettoMondiali?ssl=true&replicaSet=atlas-fj2ixn-shard-0&authSource=admin&retryWrites=true&w=majority" #bisogna anche specificare il nome del database al interno del link 

mongo = PyMongo(app)#inizializziamo il database

CORS(app)#angular riceve i dati passati da flask
api = Api(app)



@app.route('/')
def index():
    return ""

class MondialiApi(Resource):
    def get(self,numAnno):#viene inviata una richiesta get da angular
        mond = mongo.db.infoMondiali.find() #mondiali dal database
        dfInfo=pd.DataFrame(list(mond)) #mondiali e lo transformo in un dataframe
        world = geopandas.read_file(geopandas.datasets.get_path('naturalearth_lowres')) #recuperiamo geodataframe
        dfMerCoo= pd.merge(world,dfInfo,how="inner",left_on="name",right_on="Country") #merge infoMondiali e geometry
        anno = dfMerCoo[dfMerCoo["Year"] == numAnno].drop("_id" , axis = 1) #trova lo stato di quel anno, e drop della colonna _id
        return Response(anno.to_json(), mimetype = 'application/json')  #restituisce il json 

api.add_resource(MondialiApi, '/mondiali/<int:numAnno>', endpoint = 'task')#endpoint aggiunge nella porta 5000 


class CapocannonieriAPI(Resource):#
    def get(self,year):#self proprietà (si mette sempre nelle funzioni di python) e seconda proprietà year
        result = mond = mongo.db.capocannonieri.find({"Year" : year},{"_id" : 0}) #result=alla find degli anni della collection
        resp = json_util.dumps(result)#trasforma in json da API
        return Response(resp, mimetype = 'application/json') #restituisce il json 

api.add_resource(CapocannonieriAPI, '/capocannonieri/<int:year>')#endpoint aggiunge nella porta 5000 più l'anno(visualizzo i valori nella porta 5000)

@app.route('/year/<int:year>', methods=['GET'])#routing (se aggiungo "/year/nAnno") mi restituice il valore
def onedataaa(year):
    
    if request.method == 'GET':
        data = mongo.db.stadi.find({'Year': year},{"_id" : 0,"Link":0})
        resp = json_util.dumps(data)#trasforma in json da API
        return Response(resp, mimetype = 'application/json') #restituisce il json 



if __name__ == '__main__':#se c'è qualcosa nell'API app parte
    app.run()
    
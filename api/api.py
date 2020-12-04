from datetime import datetime
from bs4 import BeautifulSoup
import requests
import os
import flask
import flask_cors
from flask import request, jsonify, json
from flask_cors import CORS
import unicodedata

application = flask.Flask(__name__)
application.config["DEBUG"] = False

CORS(application, supports_credentials=True)




@application.route('/', methods=['GET'])
def home():
    return


@application.route('/<away>-<home>', methods=['GET'])
def matchup(away, home):
    return 

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    application.debug = True
    application.run(host='0.0.0.0', port=port)

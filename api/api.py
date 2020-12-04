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

def get_food_banks(zip_code):
    r = requests.get("https://shfb.auntbertha.com/food/food-pantry--ca?postal={}&filters=%7B%22attribute_tags%22%3A+%5B%22anyone+in+need%22%5D%7D&clearedfilter=1&cursor=0&limit=10".format(zip_code), headers={
        'User-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0'})
    


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

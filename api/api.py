from datetime import datetime
from bs4 import BeautifulSoup
import requests
import os
import flask
import flask_cors
from flask import request, jsonify, json
from flask_cors import CORS
import unicodedata

# application = flask.Flask(__name__)
# application.config["DEBUG"] = False

# CORS(application, supports_credentials=True)

def get_food_banks(zip_code):
    headers = {
        'authority': 'scrapeme.live',
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }

    r = requests.get("https://www.freefood.org/zip.php?zip={}".format(zip_code), headers=headers)
    c = r.content
    soup = BeautifulSoup(c, "html.parser")
    all = soup.find_all("div", {"class": "event-box"})
    l = []

    for ele in all:
        b = {}
        b["Name"] = ele.find("h3").text
        b["Address"] = " ".join(ele.find("p").text.strip().replace("\n", "").replace("\r", "").split()).split("Phone:")[0]
        
        l.append(b)

    print(l)

# @application.route('/', methods=['GET'])
# def home():
#     return


# @application.route('/<away>-<home>', methods=['GET'])
# def matchup(away, home):
#     return 

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     application.debug = True
#     application.run(host='0.0.0.0', port=port)

print(get_food_banks(35005))

import os 
from dotenv import load_dotenv
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR,".env"))

from app import create_app
from app.extensions import db

app = create_app()
if __name__=="__main__":
    app.run(debug=True)

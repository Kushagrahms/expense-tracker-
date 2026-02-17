from flask import Flask
from .config import Config
from .extensions import init_extensions
from app.routes.auth import auth_bp
from .extensions import db
from flask_jwt_extended import JWTManager
from app.routes.expense import expense_bp

def create_app():

    app = Flask(__name__)
    app.config.from_object(Config)#creation of app

    #for login 
    jwt=JWTManager(app)
    #extensions
    init_extensions(app)
    
    #blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(expense_bp)

    @app.route("/health")
    def health():
        return{"status":"ok"}
    
    print("DB URI =", app.config["SQLALCHEMY_DATABASE_URI"])

    return app
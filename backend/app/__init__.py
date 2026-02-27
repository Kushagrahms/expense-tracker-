from flask import Flask
from .config import Config
from .extensions import init_extensions
from app.routes.auth import auth_bp
from app.routes.expense import expense_bp
from app.routes.budget import budget_bp
from app.routes.user import user_bp
from flask_cors import CORS
# models for Flask-Migrate
from app.models.user import User
from app.models.expense import Expense
from app.models.budget import Budget


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.url_map.strict_slashes=False

    CORS(app)   
    # initialize extensions (db, jwt, migrate, cors)
    init_extensions(app)

    # register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(expense_bp)
    app.register_blueprint(budget_bp)
    app.register_blueprint(user_bp)

    @app.route("/health")
    def health():
        return {"status": "ok"}

    print("DB URI =", app.config["SQLALCHEMY_DATABASE_URI"])
    print(app.url_map)
    return app
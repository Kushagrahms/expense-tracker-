import os

class Config:
    # Security
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")
    
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
    DB_HOST = os.getenv("DB_HOST", "mysql")   # IMPORTANT: service name in K8s
    DB_NAME = os.getenv("DB_NAME", "expense_tracker")

    # Database
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:"
        f"{DB_PASSWORD}@"
        f"{DB_HOST}/"
        f"{DB_NAME}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
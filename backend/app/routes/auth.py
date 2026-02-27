from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.user import User
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity

#register route:
auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Invalid or missing JSON body"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Username, email and password are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    user = User(username=username,email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

#login route:
@auth_bp.route("/login",methods=["POST"])
def login():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error":"Invalid or missing json"}),400

    username=data.get("username")
    password=data.get("password")

    if not username or not password:
        return jsonify({"error":"username and password required"}),400

    user=User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({"error":"invalid credentials"}),401
    
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "messege":"Login successfull",
        "access_token":access_token
    }),200

#protected route
@auth_bp.route("/me",methods=["GET"])
@jwt_required()

def me():
    user_id=get_jwt_identity()


    return jsonify({
        "user_id":user_id,
        "message":"you are authenticated"
    }),200
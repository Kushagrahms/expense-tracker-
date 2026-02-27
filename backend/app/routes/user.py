from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from app.extensions import db
from app.models import User
from werkzeug.security import check_password_hash, generate_password_hash

user_bp=Blueprint("user",__name__,url_prefix="/api/user")
#updating profile

@user_bp.route("/update",methods=["PUT"])
@jwt_required()
def update_user():
    user_id=get_jwt_identity()
    user=User.query.get(user_id)
    data=request.get_json()
    new_name=data.get("username")

    if not new_name:
        return jsonify({"msg":"name is required"}),400
    user.username=new_name
    db.session.commit()

    return jsonify({"msg":"Name updated successfully"}),200

#changing pass
@user_bp.route("/change-password",methods=["PUT"])
@jwt_required()

def change_password():
    user_id=get_jwt_identity()
    user=User.query.get(user_id)
    data=request.get_json()
    current_password=data.get("current_password")
    new_password=data.get("new_password")

    if not check_password_hash(user.password_hash,current_password):
        return jsonify({"msg":"Current passwword is invalid"}),400
    user.password_hash=generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"msg":"Password updated successfully"}),200

#deleting account
@user_bp.route("/delete",methods=["PUT"])
@jwt_required()

def delete_account():
    user_id=get_jwt_identity()
    user=User.query.get(user_id)

    if not user:
        return jsonify({"msg":"user not found"}),400
    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg":"user deleted successfully"}),200




    
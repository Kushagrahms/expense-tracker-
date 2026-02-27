from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from app.models.budget import Budget
from app.extensions import db
from datetime import datetime

budget_bp = Blueprint("budget", __name__, url_prefix="/api/budgets")

@budget_bp.route("/", methods=["GET", "POST"])
@jwt_required()
def handle_budget():
    user_id = get_jwt_identity()
    now = datetime.utcnow()

    if request.method == "GET":
        budget = Budget.query.filter_by(
            user_id=user_id,
            month=now.month,
            year=now.year
        ).first()

        if not budget:
            return jsonify({"amount": 0}), 200

        return jsonify({"amount": budget.amount}), 200

    if request.method == "POST":
        data = request.get_json()
        amount = data.get("amount")

        if not amount:
            return jsonify({"error": "Budget amount required"}), 400

        existing = Budget.query.filter_by(
            user_id=user_id,
            month=now.month,
            year=now.year
        ).first()

        if existing:
            existing.amount = amount
        else:
            new_budget = Budget(
                amount=amount,
                month=now.month,
                year=now.year,
                user_id=user_id
            )
            db.session.add(new_budget)

        db.session.commit()

        return jsonify({"message": "Budget saved"}), 200
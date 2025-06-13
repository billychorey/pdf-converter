from flask import Blueprint, request, session, jsonify
from models.user import User
from db import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        print("📨 Registration data received:", data)

        if not username or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        existing_user = User.query.filter(
            (User.username == username) | (User.email == email)
        ).first()

        if existing_user:
            return jsonify({"error": "User already exists"}), 409

        user = User(username=username, email=email)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        print(f"✅ Registered user: {user.email}")
        session["user_id"] = user.id

        return jsonify({"message": "Registered successfully"}), 201

    except Exception as e:
        print("🚨 Registration error:", e)
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        print("🔐 Login attempt for:", email)

        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            print("❌ Invalid credentials")
            return jsonify({"error": "Invalid credentials"}), 401

        session["user_id"] = user.id
        print("✅ Login successful")
        return jsonify({"message": "Logged in"}), 200

    except Exception as e:
        print("🚨 Login error:", e)
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "Logged out"}), 200

from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.convert import convert_bp
from db import db  # ✅ db.py is in the same folder, so this is fine

def create_app():
    app = Flask(__name__)
    app.secret_key = "supersecretkey"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../instance/app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app, supports_credentials=True)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(convert_bp, url_prefix="/convert")

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5001)

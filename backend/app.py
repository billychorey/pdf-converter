from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from backend.routes.auth import auth_bp
from backend.routes.convert import convert_bp
from backend.models import db

app = Flask(__name__)
app.secret_key = "supersecretkey"  # 🔐 Replace this later with something secure


# ✅ Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'  # pick one and stick with it
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# ✅ Migrations
migrate = Migrate(app, db)

# ✅ CORS config
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# ✅ Cookie settings
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False

# ✅ Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(convert_bp, url_prefix='/convert')

if __name__ == '__main__':
    app.run(port=5001, debug=True)

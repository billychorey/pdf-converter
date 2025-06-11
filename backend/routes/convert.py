from flask import Blueprint, request, send_file, session
from PIL import Image
import io
from datetime import datetime

convert_bp = Blueprint("convert", __name__)

@convert_bp.route("/", methods=["POST"])
def convert_image_to_pdf():
    print("Session contents:", dict(session))  # 👈 Add this line

    # ✅ Match the session key used in auth.py
    if "user_id" not in session:
        return {"error": "Unauthorized"}, 401

    if "image" not in request.files:
        return {"error": "No image provided"}, 400

    image_file = request.files["image"]
    
    try:
        image = Image.open(image_file).convert("RGB")
    except Exception as e:
        return {"error": f"Invalid image: {str(e)}"}, 400

    pdf_bytes = io.BytesIO()
    image.save(pdf_bytes, format="PDF")
    pdf_bytes.seek(0)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"converted_{timestamp}.pdf"

    return send_file(
        pdf_bytes,
        mimetype="application/pdf",
        as_attachment=True,
        download_name=filename
    )

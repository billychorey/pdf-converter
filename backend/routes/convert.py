from flask import Blueprint, request, send_file, session
from PIL import Image
import io
from datetime import datetime

convert_bp = Blueprint("convert", __name__)

@convert_bp.route("", methods=["POST"])
def convert_image_to_pdf():
    if "user" not in session:
        return {"error": "Unauthorized"}, 401

    if "image" not in request.files:
        return {"error": "No image provided"}, 400

    image_file = request.files["image"]
    image = Image.open(image_file).convert("RGB")

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

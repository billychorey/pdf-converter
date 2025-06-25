# 🖼️ Image to PDF Converter App

Convert your images into clean, crisp PDFs — no fluff, no bloat. This full-stack application uses Flask (backend) and React (frontend) to let users register, log in, upload image files, and download or preview their converted PDFs.

---

## 🚀 Features

- 🔐 User registration and session-based login  
- 🖼️ Image upload (JPEG, PNG, etc.)  
- 🪄 PDF conversion using Pillow (server-side)  
- 📄 PDF download and preview  
- 🧾 Dashboard listing all user-generated PDFs  
- ⚙️ Built with:
  - **Flask**, **Flask-Migrate**, **Flask-CORS**
  - **React**, **React Router**, **Tailwind CSS**
  - **Pillow** for image ➝ PDF
  - **SQLite** for development DB

---

## 📂 Project Structure

pdf_converter/  
├── backend/  
│   ├── app.py  
│   ├── db.py  
│   ├── models/  
│   ├── routes/  
│   ├── instance/  
│   │   └── db.sqlite3  
│   ├── migrations/  
│   └── venv/  
├── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   ├── pages/  
│   │   ├── App.jsx  
│   │   └── index.css / index.jsx  
│   └── public/  
└── README.md

---

## 🛠️ Getting Started

### 🔧 Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
flask run --port=5001
💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
🧠 Frontend: http://localhost:5173
⚙️ Backend: http://localhost:5001

🧪 How It Works
Register or log in

Upload an image

The server converts it to a PDF

You get a dashboard of links:

Open to preview

Download to save

🧠 Future Features
❌ PDF deletion (in progress)

🖼️ Thumbnail image previews

🗂 Drag-and-drop upload

☁️ Cloud storage (e.g., S3)

🔁 Forgot password flow

🌑 Dark mode because... it's 2025


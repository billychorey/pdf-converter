# 🖼️ Image to PDF Converter App

Convert your images into clean, crisp PDFs with zero nonsense. A full-stack app built with Flask (backend) and React (frontend), this tool lets users register, log in, upload image files, and either preview or download their converted PDFs. No fluff. Just function.

---

## 🚀 Features

- 🔐 User registration and session-based login
- 🖼️ Image upload (JPEG, PNG, etc.)
- 🪄 Server-side PDF conversion using Pillow
- 📄 PDF download or view in a new tab
- 🧾 Dashboard that tracks converted files
- ⚙️ Built with:
  - **Flask**, **Flask-Migrate**, **Flask-CORS**
  - **React**, **React Router**
  - **Pillow** for image → PDF
  - **SQLite** for development DB

---

## 📂 Project Structure

```
pdf_converter/
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   ├── db.sqlite3
│   └── migrations/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│   └── public/
├── venv/
```

---

## 🛠️ Getting Started

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
python -m flask run --port=5001
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

> 🧠 Frontend runs at `http://localhost:5173`  
> 🛠 Backend runs at `http://localhost:5001`

---

## 🧪 How It Works

1. Register a new user (or log in if one exists)
2. Upload an image
3. The backend converts it into a PDF
4. A link appears on your dashboard:
   - 🖥️ Click **Open** to preview
   - 📥 Click **Download** to save locally

---

## 🧠 Future Features (Stretch Goals)

- Drag-and-drop upload
- Thumbnail previews of images
- Cloud storage integration (e.g., S3)
- Forgot password flow
- Dark mode because... it's 2025 🌑

---

## 💬 Feedback

If you have ideas, found bugs, or just want to say “hi,” feel free to open an issue or drop a PR.

---

> Built with focus, caffeine, and minimal stack overflow spiraling.

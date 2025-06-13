# 🖼️ Image to PDF Converter App

Convert image files to downloadable PDFs with a simple, secure login experience. Built with Flask (backend) and React (frontend), this app allows users to register, log in, upload image files, and receive downloadable or viewable PDFs.

---

## 🚀 Features

- 🔐 User registration and login with session-based authentication
- 🖼️ Upload an image and convert it to PDF on the backend
- 📄 View PDFs in a new tab or download them directly
- 🧾 Dashboard shows all converted files for the logged-in user
- ⚙️ Built with:
  - **Flask** + **Flask-Login** + **Flask-Migrate**
  - **React** + **React Router**
  - **Pillow** for image processing
  - **SQLite** for development database

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

## 🛠️ Setup

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
python -m flask run --port=5001
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

> Frontend runs at `http://localhost:5173`  
> Backend runs at `http://localhost:5001`

---

## 🧪 Usage

1. Register a new user (or login if you already exist)
2. Upload an image file (JPG, PNG, etc.)
3. Wait for the dashboard to show a new entry with:
   - 🖥️ “Open” to preview the PDF in a new tab
   - 📥 “Download” to save it directly

---

## 💡 Future Ideas

- Drag-and-drop upload UI
- Image preview before conversion
- Cloud storage integration (e.g. S3 or Firebase)
- JWT auth and password reset support
- Dark mode 🌒

---


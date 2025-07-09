# TextTrace - Advanced Text Recognition & Conversion

TextTrace is a modern web app that allows users to upload images of handwritten or printed text and convert it into clean **PDF** or **Word** documents.

🚀 Live: [https://flaskproject-blond.vercel.app](https://flaskproject-blond.vercel.app)  
⚠️ Backend currently not connected due to Vercel limitations.

---

## 🔧 Features

- 🧠 Handwriting & Printed Text Recognition (EasyOCR)
- 📄 Convert text to **PDF** or **.docx**
- 📤 Drag & Drop UI
- 🎨 Bootstrap 5, Mobile Responsive

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, JS
- **Backend**: Python, Flask, EasyOCR, OpenCV, FPDF, python-docx

---

## 📁 Folder Structure

```
texttrace/
│
├── static/              # Frontend styles & logic
│   ├── style.css
│   └── script.js
│
├── templates/
│   └── index.html       # Main web UI
│
├── app.py               # Flask backend
├── requirements.txt     # Python dependencies
└── README.md
```

---

## 🛠️ Run Locally

### 1. Clone + Set up virtualenv
```bash
git clone https://github.com/yourusername/texttrace.git
cd texttrace
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install & Run
```bash
pip install -r requirements.txt
python app.py
```

Visit: `http://127.0.0.1:5000`

---

## 📦 Requirements (generate if missing)

```bash
pip freeze > requirements.txt
```

Basic packages:
```
Flask
easyocr
opencv-python
fpdf
python-docx
numpy
```

---

## 🧪 Project Overview

### OCR Pipeline
- 🧠 `EasyOCR` detects bounding boxes
- 📐 Sorted by Y-coordinates for structured paragraph flow
- 🧾 Output to **PDF** via FPDF or **Word** via python-docx

### Frontend UX
- Live image preview
- Spinner + progress bar during processing
- Fetch API → `/recognize_handwriting` or `/download_text`

---

## 🚫 Known Issues

- ❌ Backend not working on Vercel (Vercel doesn't support Flask)
- 🧪 Unused `Tesseract` code in `script.js` — consider removing

---

## 🧑‍💻 Author

**Tejas Bagal**  
📍 Chhatrapati Sambhajinagar, Maharashtra  
📫 [bagaltejas47@gmail.com](mailto:bagaltejas47@gmail.com)  
🔗 [LinkedIn](https://linkedin.com/in/tejas-bagal)

---

## 📄 License

MIT License

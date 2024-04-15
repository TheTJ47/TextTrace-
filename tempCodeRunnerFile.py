from flask import Flask, render_template, request, jsonify, send_file, make_response
import cv2
import numpy as np
import io
from fpdf import FPDF
import tempfile
import tensorflow as tf

# Function to preprocess image for TensorFlow model
def preprocess_image(img, target_size=(224, 224)):  # Adjust based on model requirements
    """
    Preprocesses an image for TensorFlow model input.

    Args:
        img (np.ndarray): The image to preprocess.
        target_size (tuple, optional): The target size for resizing. Defaults to (224, 224).

    Returns:
        np.ndarray: The preprocessed image.
    """

    # Convert to grayscale if needed (adjust based on model)
    if len(img.shape) == 3 and img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Resize
    img = cv2.resize(img, target_size)

    # Normalize (adjust based on model's preprocessing steps)
    img = img.astype('float32') / 255.0

    # Expand dimensions if model expects 4D input
    if len(img.shape) == 2:
        img = np.expand_dims(img, axis=-1)

    return img

app = Flask(__name__)

# Configure paths to CSS and JavaScript files (unchanged)
CSS_PATH = "../static/style.css"
SCRIPT_PATH = "../static/script.js"

# Load a pre-trained TensorFlow model for text recognition
model = tf.keras.models.load_model('path/to/your/model.h5')  # Replace with your model path

@app.route('/')
def index():
    return render_template('index.html', css_path=CSS_PATH, script_path=SCRIPT_PATH)

@app.route('/recognize_handwriting', methods=['POST'])
def recognize_handwriting():
    # Get the image file from the request (unchanged)
    image_file = request.files['image']

    # Convert the image data to OpenCV format (unchanged)
    img_array = np.frombuffer(image_file.read(), dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    # Check if the image was loaded successfully (unchanged)
    if img is None:
        return jsonify({'error': 'Unable to read the image'}), 500

    # Preprocess the image for TensorFlow model
    img_preprocessed = preprocess_image(img)

    # Perform text recognition using TensorFlow
    predictions = model.predict(np.expand_dims(img_preprocessed, axis=0))  # Add batch dimension

    # Process detected text based on model output format
    if isinstance(predictions, np.ndarray):  # Assuming model outputs probabilities
        # Use a threshold (e.g., 0.5) to identify confident predictions
        text_detected = [chr(np.argmax(p)) for p in predictions[0] if np.max(p) > 0.5]
        text_detected_cleaned = ''.join(text_detected)
    else:
        # Handle other output formats (e.g., direct text or bounding boxes)
        # ... (Implement processing based on model output)
        raise NotImplementedError("Unsupported model output format")

    # Rest of the code for PDF generation and response remains unchanged
    pdf = FPDF()
    # ... (PDF generation logic)

    # Create a temporary file to save the PDF (unchanged)
    # ... (Temporary file handling)

    # Send the temporary file as an attachment (unchanged)
    response = make_response(send_file(tmp_file.name, as_attachment=True))
    response.headers['Content-Disposition'] = 'attachment; filename=recognized_text.pdf'
    return response

if __name__ == '__main__':
    # Run Flask app on all network interfaces (unchanged)
    app.run(host='0.0.0.0', port=5000, debug=True)



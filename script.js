function resizeImage(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const maxWidth = 500; // Adjust this value to your desired max width
            const maxHeight = 300; // Adjust this value to your desired max height

            let newWidth, newHeight;

            if (img.width > maxWidth && img.height > maxHeight) {
                // Both width and height exceed limits
                if (img.width / maxWidth > img.height / maxHeight) {
                    newWidth = maxWidth;
                    newHeight = img.height * (maxWidth / img.width);
                } else {
                    newHeight = maxHeight;
                    newWidth = img.width * (maxHeight / img.height);
                }
            } else if (img.width > maxWidth) {
                // Only width exceeds limit
                newWidth = maxWidth;
                newHeight = img.height * (maxWidth / img.width);
            } else if (img.height > maxHeight) {
                // Only height exceeds limit
                newHeight = maxHeight;
                newWidth = img.width * (maxHeight / img.height);
            } else {
                // Image already fits within limits
                newWidth = img.width;
                newHeight = img.height;
            }

            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8); // Adjust quality between 0-1 (0.8 is good balance)
            const resizedImage = document.getElementById('uploadedImage');
            resizedImage.src = resizedDataURL;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Add event listener to file input
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    resizeImage(file);
});

function analyzeImage() {
    // Simulate analysis process with animation
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 3000); // Hide overlay after 3 seconds (adjust as needed)
    // Implement your recognition and conversion logic here
}

function downloadText(filename) {
    // Add logic to download text file
}

function copyToClipboard() {
    // Add logic to copy text to clipboard
}

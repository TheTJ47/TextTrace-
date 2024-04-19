const fileInput = document.getElementById('fileInput');
    const uploadedFilename = document.getElementById('uploadedFilename');
    const uploadedImage = document.getElementById('uploadedImage');
    const overlay = document.querySelector('.overlay');

    fileInput.addEventListener('change', resizeAndDisplayImage);

    async function resizeAndDisplayImage() {
        const imageFile = fileInput.files[0];

        if (!imageFile) {
            console.log("No image file uploaded.");
            return;
        }

        uploadedFilename.textContent = imageFile.name;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const img = new Image();
            img.onload = async () => {
                const maxWidth = 500;
                const maxHeight = 300;

                let newWidth, newHeight;

                if (img.width > maxWidth && img.height > maxHeight) {
                    if (img.width / maxWidth > img.height / maxHeight) {
                        newWidth = maxWidth;
                        newHeight = img.height * (maxWidth / img.width);
                    } else {
                        newHeight = maxHeight;
                        newWidth = img.width * (maxHeight / img.height);
                    }
                } else if (img.width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = img.height * (maxWidth / img.width);
                } else if (img.height > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = img.width * (maxHeight / img.height);
                } else {
                    newWidth = img.width;
                    newHeight = img.height;
                }

                const canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8);
                uploadedImage.src = resizedDataURL;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(imageFile);
    }

    async function resizeAndRecognize() {
        const imageFile = fileInput.files[0];
    
        if (!imageFile) {
            console.log("No image file uploaded.");
            return alert('Please upload an image file.');
        }
    
        const reader = new FileReader();
        reader.onload = async (event) => {
            const img = new Image();
            img.onload = async () => {
                const maxWidth = 500;
                const maxHeight = 300;
    
                let newWidth, newHeight;
    
                if (img.width > maxWidth && img.height > maxHeight) {
                    if (img.width / maxWidth > img.height / maxHeight) {
                        newWidth = maxWidth;
                        newHeight = img.height * (maxWidth / img.width);
                    } else {
                        newHeight = maxHeight;
                        newWidth = img.width * (maxHeight / img.height);
                    }
                } else if (img.width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = img.height * (maxWidth / img.width);
                } else if (img.height > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = img.width * (maxHeight / img.height);
                } else {
                    newWidth = img.width;
                    newHeight = img.height;
                }
    
                const canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
                const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8);
    
                let formData = new FormData();
                formData.append('image', dataURItoBlob(resizedDataURL));
    
                try {
                    overlay.style.display = 'block'; // Show overlay
                    const response = await fetch('/recognize_handwriting', {
                        method: 'POST',
                        body: formData,
                    });
    
                    overlay.style.display = 'none'; // Hide overlay
    
                    if (response.ok) {
                        const blob = await response.blob();
                        const downloadUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = 'recognized_text.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        const errorResponse = await response.json();
                        alert(`Failed to recognize handwriting: ${errorResponse.error}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while recognizing handwriting.');
                } finally {
                    overlay.style.display = 'none'; // Hide overlay
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(imageFile);
    }

    // Function to convert data URI to Blob
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }
    async function downloadAsText() {
        const imageFile = fileInput.files[0];
    
        if (!imageFile) {
            console.log("No image file uploaded.");
            return alert('Please upload an image file.');
        }
    
        let formData = new FormData();
        formData.append('image', imageFile);
    
        try {
            overlay.style.display = 'block'; // Show overlay
            const response = await fetch('/download_text', {
                method: 'POST',
                body: formData,
            });
    
            overlay.style.display = 'none'; // Hide overlay
    
            if (response.ok) {
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = 'recognized_text.docx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                const errorResponse = await response.json();
                alert(`Failed to download recognized text: ${errorResponse.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while downloading recognized text.');
        } finally {
            overlay.style.display = 'none'; // Hide overlay
        }
    }
    // Smooth scrolling to section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
// const fileInput = document.getElementById('fileInput');
//         const uploadedFilename = document.getElementById('uploadedFilename');
//         const uploadedImage = document.getElementById('uploadedImage');
//         const overlay = document.querySelector('.overlay');
    
//         fileInput.addEventListener('change', resizeAndDisplayImage);
    
//         async function resizeAndDisplayImage() {
//             const imageFile = fileInput.files[0];
    
//             if (!imageFile) {
//                 console.log("No image file uploaded.");
//                 return;
//             }
    
//             uploadedFilename.textContent = imageFile.name;
    
//             const reader = new FileReader();
//             reader.onload = async (event) => {
//                 const img = new Image();
//                 img.onload = async () => {
//                     const maxWidth = 500;
//                     const maxHeight = 300;
    
//                     let newWidth, newHeight;
    
//                     if (img.width > maxWidth && img.height > maxHeight) {
//                         if (img.width / maxWidth > img.height / maxHeight) {
//                             newWidth = maxWidth;
//                             newHeight = img.height * (maxWidth / img.width);
//                         } else {
//                             newHeight = maxHeight;
//                             newWidth = img.width * (maxHeight / img.height);
//                         }
//                     } else if (img.width > maxWidth) {
//                         newWidth = maxWidth;
//                         newHeight = img.height * (maxWidth / img.width);
//                     } else if (img.height > maxHeight) {
//                         newHeight = maxHeight;
//                         newWidth = img.width * (maxHeight / img.height);
//                     } else {
//                         newWidth = img.width;
//                         newHeight = img.height;
//                     }
    
//                     const canvas = document.createElement('canvas');
//                     canvas.width = newWidth;
//                     canvas.height = newHeight;
//                     const ctx = canvas.getContext('2d');
//                     ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
//                     const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8);
//                     uploadedImage.src = resizedDataURL;
//                 };
//                 img.src = event.target.result;
//             };
//             reader.readAsDataURL(imageFile);
//         }
    
//         async function resizeAndRecognize() {
//             const imageFile = fileInput.files[0];
    
//             if (!imageFile) {
//                 console.log("No image file uploaded.");
//                 return alert('Please upload an image file.');
//             }
    
//             const reader = new FileReader();
//             reader.onload = async (event) => {
//                 const img = new Image();
//                 img.onload = async () => {
//                     const maxWidth = 500;
//                     const maxHeight = 300;
    
//                     let newWidth, newHeight;
    
//                     if (img.width > maxWidth && img.height > maxHeight) {
//                         if (img.width / maxWidth > img.height / maxHeight) {
//                             newWidth = maxWidth;
//                             newHeight = img.height * (maxWidth / img.width);
//                         } else {
//                             newHeight = maxHeight;
//                             newWidth = img.width * (maxHeight / img.height);
//                         }
//                     } else if (img.width > maxWidth) {
//                         newWidth = maxWidth;
//                         newHeight = img.height * (maxWidth / img.width);
//                     } else if (img.height > maxHeight) {
//                         newHeight = maxHeight;
//                         newWidth = img.width * (maxHeight / img.height);
//                     } else {
//                         newWidth = img.width;
//                         newHeight = img.height;
//                     }
    
//                     const canvas = document.createElement('canvas');
//                     canvas.width = newWidth;
//                     canvas.height = newHeight;
//                     const ctx = canvas.getContext('2d');
//                     ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
//                     const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8);
    
//                     let formData = new FormData();
//                     formData.append('image', dataURItoBlob(resizedDataURL));
    
//                     try {
//                         overlay.style.display = 'block'; // Show overlay
//                         const response = await fetch('/recognize_handwriting', {
//                             method: 'POST',
//                             body: formData,
//                         });
                
//                         overlay.style.display = 'none'; // Hide overlay
                
//                         if (response.ok) {
//                             const blob = await response.blob();
//                             const url = window.URL.createObjectURL(blob);
//                             const a = document.createElement('a');
//                             a.href = url;
//                             a.download = 'recognized_text.pdf';
//                             document.body.appendChild(a);
//                             a.click();
//                             document.body.removeChild(a);
//                             window.URL.revokeObjectURL(url);
//                         } else {
//                             alert('Failed to recognize handwriting.');
//                         }
//                     } catch (error) {
//                         console.error('Error:', error);
//                         alert('An error occurred while recognizing handwriting.');
//                     } finally {
//                         overlay.style.display = 'none'; // Hide overlay
//                     }
//                 };
//                 img.src = event.target.result;
//             };
//             reader.readAsDataURL(imageFile);
//         }
    
//         // Function to convert data URI to Blob
//         function dataURItoBlob(dataURI) {
//             const byteString = atob(dataURI.split(',')[1]);
//             const ab = new ArrayBuffer(byteString.length);
//             const ia = new Uint8Array(ab);
//             for (let i = 0; i < byteString.length; i++) {
//                 ia[i] = byteString.charCodeAt(i);
//             }
//             return new Blob([ab], { type: 'image/jpeg' });
//         }
        
//         async function downloadAsText() {
//         const recognizedTextContent = document.getElementById('recognizedTextContent').textContent.trim();

//         let formData = new FormData();
//         formData.append('text_content', recognizedTextContent);

//         try {
//             const response = await fetch('/download_text', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 const blob = await response.blob();
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'recognized_text.txt';
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//                 window.URL.revokeObjectURL(url);
//             } else {
//                 alert('Failed to download recognized text.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred while downloading recognized text.');
//         }
//     }


    // const fileInput = document.getElementById('fileInput');
    // const uploadedFilename = document.getElementById('uploadedFilename');
    // const uploadedImage = document.getElementById('uploadedImage');
    // const overlay = document.querySelector('.overlay');

    // fileInput.addEventListener('change', resizeAndDisplayImage);

    // async function resizeAndDisplayImage() {
    //     const imageFile = fileInput.files[0];

    //     if (!imageFile) {
    //         console.log("No image file uploaded.");
    //         return;
    //     }

    //     uploadedFilename.textContent = imageFile.name;

    //     const reader = new FileReader();
    //     reader.onload = async (event) => {
    //         const img = new Image();
    //         img.onload = async () => {
    //             const maxWidth = 500;
    //             const maxHeight = 300;

    //             let newWidth, newHeight;

    //             if (img.width > maxWidth && img.height > maxHeight) {
    //                 if (img.width / maxWidth > img.height / maxHeight) {
    //                     newWidth = maxWidth;
    //                     newHeight = img.height * (maxWidth / img.width);
    //                 } else {
    //                     newHeight = maxHeight;
    //                     newWidth = img.width * (maxHeight / img.height);
    //                 }
    //             } else if (img.width > maxWidth) {
    //                 newWidth = maxWidth;
    //                 newHeight = img.height * (maxWidth / img.width);
    //             } else if (img.height > maxHeight) {
    //                 newHeight = maxHeight;
    //                 newWidth = img.width * (maxHeight / img.height);
    //             } else {
    //                 newWidth = img.width;
    //                 newHeight = img.height;
    //             }

    //             const canvas = document.createElement('canvas');
    //             canvas.width = newWidth;
    //             canvas.height = newHeight;
    //             const ctx = canvas.getContext('2d');
    //             ctx.drawImage(img, 0, 0, newWidth, newHeight);

    //             const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8);
    //             uploadedImage.src = resizedDataURL;
    //         };
    //         img.src = event.target.result;
    //     };
    //     reader.readAsDataURL(imageFile);
    // }

    // async function resizeAndRecognize() {
    //     const imageFile = fileInput.files[0];
    
    //     if (!imageFile) {
    //         console.log("No image file uploaded.");
    //         return alert('Please upload an image file.');
    //     }
    
    //     const reader = new FileReader();
    //     reader.onload = async (event) => {
    //         const img = new Image();
    //         img.onload = async () => {
    //             const maxWidth = 500;
    //             const maxHeight = 300;
    
    //             let newWidth, newHeight;
    
    //             if (img.width > maxWidth && img.height > maxHeight) {
    //                 if (img.width / maxWidth > img.height / maxHeight) {
    //                     newWidth = maxWidth;
    //                     newHeight = img.height * (maxWidth / img.width);
    //                 } else {
    //                     newHeight = maxHeight;
    //                     newWidth = img.width * (maxHeight / img.height);
    //                 }
    //             } else if (img.width > maxWidth) {
    //                 newWidth = maxWidth;
    //                 newHeight = img.height * (maxWidth / img.width);
    //             } else if (img.height > maxHeight) {
    //                 newHeight = maxHeight;
    //                 newWidth = img.width * (maxHeight / img.height);
    //             } else {
    //                 newWidth = img.width;
    //                 newHeight = img.height;
    //             }
    
    //             const canvas = document.createElement('canvas');
    //             canvas.width = newWidth;
    //             canvas.height = newHeight;
    //             const ctx = canvas.getContext('2d');
    //             ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
    //             const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8);
    
    //             let formData = new FormData();
    //             formData.append('image', dataURItoBlob(resizedDataURL));
    
    //             try {
    //                 overlay.style.display = 'block'; // Show overlay
    //                 const response = await fetch('/recognize_handwriting', {
    //                     method: 'POST',
    //                     body: formData,
    //                 });
    
    //                 overlay.style.display = 'none'; // Hide overlay
    
    //                 if (response.ok) {
    //                     const blob = await response.blob();
    //                     const downloadUrl = window.URL.createObjectURL(blob);
    //                     const link = document.createElement('a');
    //                     link.href = downloadUrl;
    //                     link.download = 'recognized_text.pdf';
    //                     document.body.appendChild(link);
    //                     link.click();
    //                     document.body.removeChild(link);
    //                 } else {
    //                     const errorResponse = await response.json();
    //                     alert(`Failed to recognize handwriting: ${errorResponse.error}`);
    //                 }
    //             } catch (error) {
    //                 console.error('Error:', error);
    //                 alert('An error occurred while recognizing handwriting.');
    //             } finally {
    //                 overlay.style.display = 'none'; // Hide overlay
    //             }
    //         };
    //         img.src = event.target.result;
    //     };
    //     reader.readAsDataURL(imageFile);
    // }

    // // Function to convert data URI to Blob
    // function dataURItoBlob(dataURI) {
    //     const byteString = atob(dataURI.split(',')[1]);
    //     const ab = new ArrayBuffer(byteString.length);
    //     const ia = new Uint8Array(ab);
    //     for (let i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }
    //     return new Blob([ab], { type: 'image/jpeg' });
    // }
    // async function downloadAsText() {
    //     const imageFile = fileInput.files[0];
    
    //     if (!imageFile) {
    //         console.log("No image file uploaded.");
    //         return alert('Please upload an image file.');
    //     }
    
    //     let formData = new FormData();
    //     formData.append('image', imageFile);
    
    //     try {
    //         overlay.style.display = 'block'; // Show overlay
    //         const response = await fetch('/download_text', {
    //             method: 'POST',
    //             body: formData,
    //         });
    
    //         overlay.style.display = 'none'; // Hide overlay
    
    //         if (response.ok) {
    //             const blob = await response.blob();
    //             const downloadUrl = window.URL.createObjectURL(blob);
    //             const link = document.createElement('a');
    //             link.href = downloadUrl;
    //             link.download = 'recognized_text.docx';
    //             document.body.appendChild(link);
    //             link.click();
    //             document.body.removeChild(link);
    //         } else {
    //             if (response.status === 404) {
    //                 alert('Endpoint not found. Please check your server configuration.');
    //             } else {
    //                 const errorResponse = await response.json();
    //                 alert(`Failed to download recognized text: ${errorResponse.error}`);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('An error occurred while downloading recognized text.');
    //     } finally {
    //         overlay.style.display = 'none'; // Hide overlay
    //     }
    // }
    
    
    // // Smooth scrolling to section
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();

    //         const targetId = this.getAttribute('href').substring(1);
    //         const targetElement = document.getElementById(targetId);

    //         if (targetElement) {
    //             window.scrollTo({
    //                 top: targetElement.offsetTop,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });




// async function downloadAsText() {
//     const imageFile = fileInput.files[0];

//     if (!imageFile) {
//         console.log("No image file uploaded.");
//         return alert('Please upload an image file.');
//     }

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//         const img = new Image();
//         img.onload = async () => {
//             const maxWidth = 500;
//             const maxHeight = 300;

//             let newWidth, newHeight;

//             if (img.width > maxWidth && img.height > maxHeight) {
//                 if (img.width / maxWidth > img.height / maxHeight) {
//                     newWidth = maxWidth;
//                     newHeight = img.height * (maxWidth / img.width);
//                 } else {
//                     newHeight = maxHeight;
//                     newWidth = img.width * (maxHeight / img.height);
//                 }
//             } else if (img.width > maxWidth) {
//                 newWidth = maxWidth;
//                 newHeight = img.height * (maxWidth / img.width);
//             } else if (img.height > maxHeight) {
//                 newHeight = maxHeight;
//                 newWidth = img.width * (maxHeight / img.height);
//             } else {
//                 newWidth = img.width;
//                 newHeight = img.height;
//             }

//             const canvas = document.createElement('canvas');
//             canvas.width = newWidth;
//             canvas.height = newHeight;
//             const ctx = canvas.getContext('2d');
//             ctx.drawImage(img, 0, 0, newWidth, newHeight);

//             const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8);

//             let formData = new FormData();
//             formData.append('image', dataURItoBlob(resizedDataURL));

//             try {
//                 overlay.style.display = 'block'; // Show overlay
//                 const response = await fetch('/recognize_handwriting', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 overlay.style.display = 'none'; // Hide overlay

//                 if (response.ok) {
//                     const recognizedText = await response.text();

//                     // Create a Word document using jszip
//                     const zip = new JSZip();
//                     const doc = zip.folder('word');
//                     doc.file('document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//                         <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
//                             <w:body>
//                                 <w:p>
//                                     <w:r>
//                                         <w:t>${recognizedText}</w:t>
//                                     </w:r>
//                                 </w:p>
//                             </w:body>
//                         </w:document>`);

//                     const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//                         <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
//                             <Default Extension="xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
//                         </Types>`;
//                     zip.file('[Content_Types].xml', contentTypes);

//                     const blob = await zip.generateAsync({ type: 'blob' });
//                     const url = window.URL.createObjectURL(blob);
//                     const a = document.createElement('a');
//                     a.href = url;
//                     a.download = 'recognized_text.docx';
//                     document.body.appendChild(a);
//                     a.click();
//                     document.body.removeChild(a);
//                     window.URL.revokeObjectURL(url);
//                 } else {
//                     const errorResponse = await response.json();
//                     alert(`Failed to recognize handwriting: ${errorResponse.error}`);
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 alert('An error occurred while recognizing handwriting.');
//             } finally {
//                 overlay.style.display = 'none'; // Hide overlay
//             }
//         };
//         img.src = event.target.result;
//     };
//     reader.readAsDataURL(imageFile);
// }









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
                overlay.style.display = 'block';
                const response = await fetch('https://your-netlify-app-name.netlify.app/recognize_handwriting', {
                    method: 'POST',
                    body: formData,
                });

                overlay.style.display = 'none';

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
                overlay.style.display = 'none';
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(imageFile);
}

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
        overlay.style.display = 'block';
        const response = await fetch('https://your-netlify-app-name.netlify.app/download_text', {
            method: 'POST',
            body: formData,
        });

        overlay.style.display = 'none';

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
            if (response.status === 404) {
                alert('Endpoint not found. Please check your server configuration.');
            } else {
                const errorResponse = await response.json();
                alert(`Failed to download recognized text: ${errorResponse.error}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while downloading recognized text.');
    } finally {
        overlay.style.display = 'none';
    }
}

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




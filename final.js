// Navigationbar
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.style.top = "-80px"; /* Hide navbar */
    } else {
        navbar.style.top = "0"; /* Show navbar */
    }
    if (scrollTop > 5) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; /* For Safari */
});
function navicon() {
            if (window.innerWidth <= 768) {
                var links = document.querySelectorAll('.navbar a');
                links.forEach(function(link) {
                    link.style.display = link.style.display === 'block' ? 'none' : 'block';
                });
            }
        }
        
        function hideMenu() {
            if (window.innerWidth <= 768) {
                var links = document.querySelectorAll('.navbar a');
                links.forEach(function(link) {
                    link.style.display = 'none';
                });
            }
        }

        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                var navbar = document.getElementById('navbar');
                var isClickInside = navbar.contains(event.target);

                if (!isClickInside) {
                    hideMenu();
                }
            }
        });

        document.querySelectorAll('.navbar a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hideMenu();
                }
            });
        });



        let imagesArray = [];

       function convertToHTML() {
            const mixedInput = document.getElementById('mixed-input').value;
            const outputContainer = document.getElementById('output-inner-container');
            //const existingImages = imagesArray.slice();
        
            while (outputContainer.firstChild) {
                outputContainer.removeChild(outputContainer.firstChild);
            }
        
            const chunks = mixedInput.split(/\$(.*?)\$/g);
        
            chunks.forEach((chunk, index) => {
                if (index % 2 === 0) {
                    const formattedChunk = chunk.replace(/  +/g, match => Array(match.length).fill('\u00A0').join(''));
                    outputContainer.appendChild(document.createTextNode(formattedChunk));
                } else {
                    const katexSpan = document.createElement('span');
                    try {
                        katex.render(chunk, katexSpan, { throwOnError: false });
                        outputContainer.appendChild(katexSpan);
                    } catch (e) {
                        console.error('Error rendering LaTeX with KaTeX:', e);
                    }
                }
            });
        
            let outputHtml = outputContainer.innerHTML;
            const imgRegex = /img(\d+)/g;
        
            let match;
            while ((match = imgRegex.exec(outputHtml)) !== null) {
                const imgIndex = parseInt(match[1]) - 1;
                if (imagesArray[imgIndex]) {
                    outputHtml = outputHtml.replace(match[0], imagesArray[imgIndex].outerHTML);
                }
            }
        
            outputContainer.innerHTML = outputHtml;
        }
        





        // Define a function to change CSS properties
        function changeCSSProperty(property, value, elementIds) {
            elementIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.style[property] = value;
                }
            });
        }

        // Use event delegation to handle input changes
        document.addEventListener('input', function(event) {
            var target = event.target;
            if (target.matches('#font-size-input')) {
                changeCSSProperty('fontSize', target.value + 'px', ['output-inner-container','left-margin']);
                
            } else if (target.matches('#font-color-input')) {
                changeCSSProperty('color', target.value, ['output-inner-container','left-margin','top-margin']);
            } else if (target.matches('#letter-spacing-input')) {
                changeCSSProperty('letterSpacing', target.value + 'px', ['output-inner-container','left-margin','top-margin']);
            } else if (target.matches('#word-spacing-input')) {
                changeCSSProperty('wordSpacing', target.value + 'px', ['output-inner-container','left-margin','top-margin']);
            } else if (target.matches('#background-color-input')) {
                changeCSSProperty('backgroundColor', target.value, ['shadow-effect']);
            } else if (target.matches('#margin-top-input')) {
                changeCSSProperty('marginTop', target.value + 'px', ['output-inner-container','left-margin']);
            } else if (target.matches('#margin-left-input')) {
                changeCSSProperty('marginLeft', target.value + 'px', ['output-inner-container']);
            } else if (target.matches('#quality-input')) {
                quality = parseFloat(target.value) || 1.0;
            } else if (target.matches('#line-spacing-text-input')) {
                changeCSSProperty('lineHeight', target.value + 'px', ['output-inner-container','left-margin']);
            } else if (target.matches('#line-spacing-input')) {
                document.getElementById('content_page').style.backgroundSize = `100% ${target.value}px`;
            }else if (target.matches('#height-input')) {
                changeCSSProperty('height', target.value + '%', ['box']);
            }else if (target.matches('#width-input')) {
                changeCSSProperty('width', target.value + '%', ['subbox','left-margin']);
            }else if (target.matches('#top-margin-font-size-input')) {
                changeCSSProperty('fontSize', target.value + 'px', ['top-margin']);
            }

        });

        // Toggle left margin
        let leftMarginOn = true;
        let topMarginOn = true;
        function toggleLeftMargin() {
            leftMarginOn = !leftMarginOn;
            //document.getElementById('toggle-left-margin').textContent = 'Left Margin: ' + (leftMarginOn ? 'ON' : 'OFF');
            var leftMargin = document.getElementById('left-margin');
           
            var topMargin = document.getElementById('top-margin');
            var subbox = document.getElementById('subbox');
            var outputcontainer = document.getElementById('output-container');
            
            // Toggle left border on output container
            outputcontainer.style.borderLeft = leftMarginOn ? '2px solid #00000066' : 'none';

            // Toggle bottom and left border on top-margin
            topMargin.style.borderBottom = leftMarginOn ?  '1px solid #00000066': 'none';
            topMargin.style.borderLeft = leftMarginOn ?  '2px solid #00000066': 'none';

            // Toggle bottom border on subbox
            subbox.style.borderBottom = leftMarginOn ?  '1px solid #00000066': 'none';

            if (leftMargin.style.display === 'none' && subbox.style.display === 'none') {
                leftMargin.style.display = 'block';
                subbox.style.display = 'block';
            } else {
                leftMargin.style.display = 'none';
                subbox.style.display = 'none';
            }
        }

        // Toggle top margin
        function toggleTopMargin() {
            topMarginOn = !topMarginOn;
            //document.getElementById('toggle-top-margin').textContent = 'Top Margin: ' + (topMarginOn ? 'ON' : 'OFF');
            var topMargin = document.getElementById('box');
            topMargin.style.display = topMargin.style.display === 'none' ? 'flex' : 'none';
        }

        // Toggle background image
        function toggleBackground() {
            var content_page = document.getElementById('content_page');
            var bgToggle = document.getElementById('bg-toggle');

            content_page.style.backgroundImage = bgToggle.checked ? 'linear-gradient(#00000066  0.05em, transparent 0.1em)' : 'none';
        }
        function Shadow() {
            var heading_page = document.getElementById('heading_page');
            var effect = document.getElementById('shadow');

            heading_page.style.background = effect.checked ? 'linear-gradient(-75deg, rgb(0 0 0 / 40%), rgb(0 0 0 / 0%))' : 'none';
        }

        function changeBackgroundImage() {
            var input = document.getElementById('background-image-input');
            var file = input.files[0];
            var reader = new FileReader();
            document.getElementById('remove-button').style.display = 'block';

            reader.onload = function(e) {
                var backgroundImage = e.target.result;
                document.getElementById('shadow-effect').style.backgroundImage = "url('" + backgroundImage + "')";
            };

            reader.readAsDataURL(file);
        }

        function removeBackgroundImage() {
            document.getElementById('shadow-effect').style.backgroundImage = 'none';
            
            document.getElementById('background-image-input').value = ''; // Clear the file input
            document.getElementById('remove-button').style.display = 'none'; // Hide the remove button
        }
        // Function to apply the custom font to MathJax elements


var customFontUploaded = false;
var uploadedFontFamily = '';

// Function to apply custom font to MathJax elements
function applyCustomFontToMathJax(font, fallbackfont) {
    var effectiveFont = customFontUploaded ? uploadedFontFamily : font;
    var useDefaultMathFont = document.getElementById('default-math-font-checkbox').checked;

    var mathJaxElements = document.querySelectorAll('.katex .mathdefault,.katex .op-symbol.small-op,.katex,.katex .mathbf,.katex .delimsizing.size2');
    mathJaxElements.forEach(function(element) {
        if (useDefaultMathFont) {
            element.style.fontFamily = 'CustomFont';
        } else {
            element.style.fontFamily = effectiveFont + fallbackfont;
        }
    });
}
function toggleMathFont() {
    document.getElementById('default-math-font-checkbox').addEventListener('change', function() {
        const isChecked = this.checked;
        const elements = document.querySelectorAll('.katex .mathdefault, .katex .op-symbol.small-op, .katex');
        elements.forEach(element => {
            if (isChecked) {
                element.style.fontFamily = 'customfont';
            } 
        });
    });
}
function changeFontfile(elementId, fontFamily) {
    var fileInput = document.getElementById('font-file-input');
    if (!fileInput.files[0]) {
        alert('Please upload a font file first.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var fontData = e.target.result;
        var fontFace = new FontFace(fontFamily, fontData);

        fontFace.load().then(function(loadedFontFace) {
            // Remove previous custom font if any
            if (window.customFontFace) {
                document.fonts.delete(window.customFontFace);
            }

            document.fonts.add(loadedFontFace);
            window.customFontFace = loadedFontFace;  // Store the new custom font

            customFontUploaded = true;
            uploadedFontFamily = fontFamily;

            // Apply the new font to the specified element
            var element = document.getElementById(elementId);
            if (element) {
                element.style.fontFamily = fontFamily;
            }

            // Apply custom font to MathJax elements
            applyCustomFontToMathJax(fontFamily, ', CustomFont');

            // Also, set the font for the output container and heading page
            var outputContainer = document.getElementById('output-inner-container');
            var heading_page = document.getElementById('heading_page');
            outputContainer.style.fontFamily = fontFamily + ', CustomFont';
            heading_page.style.fontFamily = fontFamily + ', CustomFont';

            // Hook into MathJax rendering events
           
            document.getElementById('mixed-input').addEventListener('input', function() {
                applyCustomFontToMathJax(fontFamily, ', CustomFont');
            });

            // Reset file input to clear the previously uploaded file
            fileInput.value = "";
        }).catch(function(error) {
            console.error('Font failed to load:', error);
        });
    };
    reader.readAsArrayBuffer(fileInput.files[0]);
}


function changeFontFamily() {
    var fontFamilySelect = document.getElementById('font-family-select');
    var selectedFont = fontFamilySelect.options[fontFamilySelect.selectedIndex].value;

    // Reset the custom font flag if a new font is selected from the dropdown
    customFontUploaded = false;
    uploadedFontFamily = '';

    // Clear the file input
    var fileInput = document.getElementById('font-file-input');
    fileInput.value = '';

    // Apply selected font to MathJax elements
    applyCustomFontToMathJax(selectedFont, ', CustomFont');

    // Also, set the font for the output container and heading page
    var outputContainer = document.getElementById('output-inner-container');
    var heading_page = document.getElementById('heading_page');
    outputContainer.style.fontFamily = selectedFont + ', CustomFont';
    heading_page.style.fontFamily = selectedFont + ', CustomFont';
    document.getElementById('mixed-input').addEventListener('input', function() {
        applyCustomFontToMathJax(selectedFont, ', CustomFont');
    });

    
}


document.addEventListener('DOMContentLoaded', changeFontFamily());






        var imageQueue = []; // Array to store generated images
        var quality = 3.0; // Initial quality value

        function changeQuality() {
            var qualityInput = document.getElementById('quality-input').value;
            quality = parseFloat(qualityInput) || 1.0;
        }


        function generateAndPreview() {

            //shadow effect 
            const shadowBox = document.getElementById('shadow').checked;
            if (shadowBox) {
                const randomAngle = Math.floor(Math.random() * 360);
                const target = document.getElementById('heading_page');
                target.style.background = `linear-gradient(${randomAngle}deg, rgb(0 0 0 / 40%), rgb(0 0 0 / 0%))`;
            }
            var textElement = document.getElementById('images-store-container-text');
            if (textElement) {
                // Remove the text element
                textElement.remove();
            }
            var containerWrapper = document.getElementById('heading_page');
            var imageQueueContainer = document.getElementById('images-store-container');

            html2canvas(containerWrapper, { scale: quality }).then(function (canvas) {
                // Create a new image object
                var newImage = new Image();
                newImage.src = canvas.toDataURL();

                // Create a container for the new image and its download button
                var imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                // Create a cross sign for removing the image
                var crossSign = document.createElement('div');
                crossSign.textContent = '✖';
                crossSign.classList.add('buttontype_2');
                crossSign.onclick = function () {
                    removeImage(imageContainer, newImage);
                };

                // Create a download button for the new image
                var downloadButton = document.createElement('button');
                downloadButton.textContent = 'Download Image ' + imageQueue.length;
                downloadButton.classList.add('buttontype_2');
                downloadButton.onclick = function () {
                    downloadImage(newImage, 'container_image_' + imageQueue.length + '.png');
                };

                // Create a preview image for the new image
                var previewImage = new Image();
                previewImage.src = canvas.toDataURL();
                previewImage.classList.add('preview-image');
                previewImage.onclick = function () {
                    openImageInNewTab(newImage.src);
                };

                // Create a container for the move left and move right buttons
                var moveButtonsContainer = document.createElement('div');
                moveButtonsContainer.classList.add('button-container');

                // Create buttons for moving left and right
                var moveLeftButton = document.createElement('button');
                moveLeftButton.textContent = '←';
                moveLeftButton.classList.add('buttontype_2');
                moveLeftButton.onclick = function () {
                    moveImageLeft(imageContainer);
                };

                var moveRightButton = document.createElement('button');
                moveRightButton.textContent = '→';
                moveRightButton.classList.add('buttontype_2');
                moveRightButton.onclick = function () {
                    moveImageRight(imageContainer);
                };

                // Append the move buttons to the container
                moveButtonsContainer.appendChild(moveLeftButton);
                moveButtonsContainer.appendChild(moveRightButton);

                // Append the preview image, move buttons, cross sign, and download button to the container
                imageContainer.appendChild(crossSign);
                imageContainer.appendChild(previewImage);
                imageContainer.appendChild(moveButtonsContainer); // Append the move buttons container
                imageContainer.appendChild(downloadButton);

                // Append the container to the queue container
                imageQueueContainer.appendChild(imageContainer);

                // Add the new image to the queue
                imageQueue.push(newImage);

                // Add a shadow effect to the image container
                imageContainer.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
            });
        }

        function removeImage(imageContainer, image) {
            var index = imageQueue.indexOf(image);
            if (index !== -1) {
                // Remove the image from the array
                imageQueue.splice(index, 1);
                // Remove the image container from the queue container
                imageContainer.remove();

                // Check if the queue is empty
                if (imageQueue.length === 0) {
                    var imageQueueContainer = document.getElementById('images-store-container');
                    var textElement = document.createElement('p');
                    textElement.id = 'images-store-container-text';
                    textElement.textContent = 'Click "Generate Image" Button to generate new image';
                    imageQueueContainer.appendChild(textElement);
                }
            }
        }



        function moveImageLeft(imageContainer) {
            var currentIndex = Array.from(imageContainer.parentNode.children).indexOf(imageContainer);
            if (currentIndex > 0) {
                imageContainer.parentNode.insertBefore(imageContainer, imageContainer.parentNode.children[currentIndex - 1]);
                // Swap the images in the queue
                [imageQueue[currentIndex], imageQueue[currentIndex - 1]] = [imageQueue[currentIndex - 1], imageQueue[currentIndex]];
            }
        }

        function moveImageRight(imageContainer) {
            var currentIndex = Array.from(imageContainer.parentNode.children).indexOf(imageContainer);
            if (currentIndex < imageQueue.length - 1) {
                imageContainer.parentNode.insertBefore(imageContainer, imageContainer.parentNode.children[currentIndex + 2]);
                // Swap the images in the queue
                [imageQueue[currentIndex], imageQueue[currentIndex + 1]] = [imageQueue[currentIndex + 1], imageQueue[currentIndex]];
            }
        }

        function clearAllImages() {
            var imageQueueContainer = document.getElementById('images-store-container');
            imageQueueContainer.innerHTML = '<p id="images-store-container-text">Click "Generate Image" Button to generate new image</p>';
            imageQueue = [];
        }


        function downloadImage(image, fileName) {
            var link = document.createElement('a');
            link.href = image.src;
            link.download = fileName;
            link.click();
        }

        function openImageInNewTab(imageSrc) {
            var newTab = window.open();
            newTab.document.body.innerHTML = '<img src="' + imageSrc + '" style="height: 90%;">';
        }
        
        function generatePDF() {
            // Create a new jsPDF instance
            var { jsPDF } = jspdf;
            var pdf = new jsPDF({
                orientation: 'landscape', // Set the orientation to landscape
                unit: 'px', // Use pixels as the unit
                format: 'a4' // Set the format to A4
            });
        
            var pageWidth = pdf.internal.pageSize.getWidth();
            var pageHeight = pdf.internal.pageSize.getHeight();
        
            // Loop through each image in the imageQueue
            imageQueue.forEach(function (image, index) {
                // Add a new page for each image
                if (index > 0) {
                    pdf.addPage();
                }
        
                // Calculate aspect ratio and set dimensions
                var aspectRatio = image.width / image.height;
                var maxWidth = pageWidth * 0.8; // 80% of the page width
                var maxHeight = maxWidth / aspectRatio;
        
                // Check if the image height exceeds the page height
                if (maxHeight > pageHeight) {
                    maxHeight = pageHeight;
                    maxWidth = maxHeight * aspectRatio;
                }
        
                // Calculate x and y positions to center the image
                var x = (pageWidth - maxWidth) / 2;
                var y = (pageHeight - maxHeight) / 2;
        
                // Compress the image before adding it to the PDF
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                var compressedImage = canvas.toDataURL('image/jpeg', 1.0); // 100% quality JPEG
        
                // Add the image to the PDF with calculated dimensions and positions
                pdf.addImage(compressedImage, 'JPEG', x, y, maxWidth, maxHeight);
            });
        
            // Save the PDF
            pdf.save('document.pdf');
        }
        

            
        const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let startX, startY, lastX, lastY;
let drawingColor = '#000f64';
let drawingSize = 4;

let selectedTool = 'pen';
let undoStack = [];
let redoStack = [];
let snapshot;
let images = [];
//let imagesArray = [];

function setCanvasSize() {
    const drawingContainer = document.querySelector('.drawing-container');
    const containerWidth = drawingContainer.clientWidth;
    const containerHeight = drawingContainer.clientHeight;

    const canvasWidthSlider = document.getElementById('canvas-width');
    const canvasHeightSlider = document.getElementById('canvas-height');

    const canvasWidth = canvasWidthSlider.valueAsNumber * containerWidth / 100;
    const canvasHeight = canvasHeightSlider.valueAsNumber * containerHeight / 100;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

// Call setCanvasSize initially to set the canvas size when the page loads
setCanvasSize();

// Add event listeners to update the canvas size when the sliders are adjusted
document.getElementById('canvas-width').addEventListener('input', setCanvasSize);
document.getElementById('canvas-height').addEventListener('input', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function openColorPicker() {
    var colorInput = document.getElementById("drawing-color");
    colorInput.click();
}

function openDrawingContainer() {
    document.getElementById('drawing_popup').style.display = 'flex';
    setCanvasSize();
}

function closePopup() {
    document.getElementById('drawing_popup').style.display = 'none';
}

function changeDrawingColor(color) {
    drawingColor = color;
}
// Add an event listener to the color input element
document.getElementById("drawing-color").addEventListener('input', function(event) {
    changeDrawingColor(event.target.value);
});
function shape(shape) {
    selectedTool = shape;
}

function changeDrawingSize(size) {
    drawingSize = size;
}

function clearDrawing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoStack = [];
    redoStack = [];
    images = [];
}

function undo() {
    if (undoStack.length > 0) {
        redoStack.push(canvas.toDataURL());
        const lastAction = undoStack.pop();
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = lastAction;
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push(canvas.toDataURL());
        const lastAction = redoStack.pop();
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = lastAction;
    }
}

function saveDrawing() {
    const imgData = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'drawing.png';
    link.click();
}

const startDraw = (e) => {
    e.preventDefault(); // Prevent default touch events
    isDrawing = true;
    const { offsetX, offsetY } = getPointerPos(e);
    startX = offsetX;
    startY = offsetY;
    ctx.beginPath();
    ctx.lineWidth = drawingSize;
    ctx.strokeStyle = drawingColor;
    ctx.lineCap = 'round';
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.push(canvas.toDataURL());
    redoStack = [];
}

function drawShape(x, y) {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === 'pen') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = drawingColor;
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (selectedTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = '#ffffff';
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (selectedTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (selectedTool === 'rectangle') {
        ctx.beginPath();
        const width = x - startX;
        const height = y - startY;
        ctx.rect(startX, startY, width, height);
        ctx.stroke();
    } else if (selectedTool === 'circle') {
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
}

function addDrawingToOutput() {
    const imgData = canvas.toDataURL();
    const img = new Image();
    const imageCount = imagesArray.length + 1;
    const imgId = 'image' + imageCount;
    img.src = imgData;
    img.id = imgId;
    imagesArray.push(img);
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('drawing_popup').style.display = 'none';
        document.getElementById('popup-output').style.display = 'flex';
        const textarea = document.getElementById('mixed-input');
        textarea.value += ' img' + imageCount;
    };
}

function setProperties() {
    const floatInput = document.getElementById('floatInput').value;
    const widthInput = document.getElementById('widthInput').value;
    const img = imagesArray[imagesArray.length - 1];
    img.style.margin = 2+'px';
    img.style.float = floatInput;
    img.style.width = widthInput;
    const outputContainer = document.getElementById('output-inner-container');
    outputContainer.appendChild(img);
    document.getElementById('popup-output').style.display = 'none';
}

function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
        return {
            offsetX: e.touches[0].clientX - rect.left,
            offsetY: e.touches[0].clientY - rect.top
        };
    }
    return {
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top
    };
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('touchstart', startDraw, { passive: false });

canvas.addEventListener('mousemove', function(e) {
    const { offsetX, offsetY } = getPointerPos(e);
    drawShape(offsetX, offsetY);
});
canvas.addEventListener('touchmove', function(e) {
    const { offsetX, offsetY } = getPointerPos(e);
    drawShape(offsetX, offsetY);
}, { passive: false });

canvas.addEventListener('mouseup', function(e) {
    isDrawing = false;
});
canvas.addEventListener('touchend', function(e) {
    isDrawing = false;
}, { passive: false });

canvas.addEventListener('mouseleave', function() {
    isDrawing = false;
});
canvas.addEventListener('touchcancel', function() {
    isDrawing = false;
}, { passive: false });



function openImageUploadPopup() {
    document.getElementById('popup-image').style.display = 'flex';
}

function closePopupimage() {
    document.getElementById('popup-image').style.display = 'none';
}

function drawImage() {
    const input = document.getElementById('image-upload');
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            images.push({ img, x: 0, y: 0, width: 100, height: 100 });
            undoStack.push(canvas.toDataURL());
            redoStack = [];
            setProperty();
            drawImages()
            
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    closePopupimage();
}

function setProperty() {
    // Assuming 'container' is the id of the container element (e.g., a canvas or div)
const container = document.getElementById('drawing-canvas');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

const index = images.length - 1; // Index of the last added image
const aspectRatio = images[index].img.width / images[index].img.height;

// Get percentage values from input fields
const newWidthPercent = parseFloat(document.getElementById('image-width').value);
const newXPercent = parseFloat(document.getElementById('image-x').value);
const newYPercent = parseFloat(document.getElementById('image-y').value);

// Convert percentage values to pixels
const newWidth = (newWidthPercent / 100) * containerWidth;
const newHeight = newWidth / aspectRatio;
const newX = (newXPercent / 100) * containerWidth;
const newY = (newYPercent / 100) * containerHeight;

// Update the image properties
images[index].width = newWidth;
images[index].height = newHeight;
images[index].x = newX;
images[index].y = newY;



}

function drawImages() {
    const { img, x, y, width, height } =images[images.length-1];
    ctx.drawImage(img, x, y, width, height);

   
}

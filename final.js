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

        // Convert ArrayBuffer to Base64 for CSS @font-face
        var base64FontData = arrayBufferToBase64(fontData);
        var fontFaceRule = `
            @font-face {
                font-family: '${fontFamily}';
                src: url(data:font/truetype;base64,${base64FontData}) format('truetype');
            }
        `;

        // Remove previous custom font-face rule if any
        if (window.customFontStyle) {
            window.customFontStyle.remove();
        }

        // Create a new style element to inject @font-face rule
        var style = document.createElement('style');
        style.innerHTML = fontFaceRule;
        document.head.appendChild(style);
        window.customFontStyle = style;  // Store the new custom font style

        // Apply the new font to the specified element
        var element = document.getElementById(elementId);
        if (element) {
            element.style.fontFamily = fontFamily;
        }

        // Apply custom font to MathJax elements (if needed)
        applyCustomFontToMathJax(fontFamily, ', CustomFont');

        // Set the font for the output container and heading page
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
    };

    reader.readAsArrayBuffer(fileInput.files[0]);
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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


//to cntrol screeshot scroll problem 
const scrollContainer = document.getElementById('content_page');
const lineSpacingInput = document.getElementById('line-spacing-input');

// Function to get the scroll step value
function getScrollStep() {
    const value = parseInt(lineSpacingInput.value, 10);
    return isNaN(value) ? 26 : value; // Default step of 26 if input is invalid
}

// Function to get the effective scrollable height, considering margin
function getEffectiveScrollableHeight() {
    const containerMarginTop = parseInt(window.getComputedStyle(scrollContainer).marginTop, 10) || 0;
    const containerHeight = scrollContainer.clientHeight;
    const maxScroll = scrollContainer.scrollHeight - containerHeight;
    
    return maxScroll - containerMarginTop;
}

// Function to check if the new scroll position is valid
function isValidScrollPosition(newScrollTop) {
    const effectiveHeight = getEffectiveScrollableHeight();
    return newScrollTop >= 0 && newScrollTop <= effectiveHeight;
}

// Function to scroll by specific pixels and ensure boundaries are respected
function scrollByPixels(pixels) {
    const newScrollTop = scrollContainer.scrollTop + pixels;
    if (isValidScrollPosition(newScrollTop)) {
        scrollContainer.scrollTop = newScrollTop;
    }
}

// Function to handle scroll input and enforce bounds for all events
function handleScrollInput(delta) {
    const newScrollTop = scrollContainer.scrollTop + delta;
    if (isValidScrollPosition(newScrollTop)) {
        scrollByPixels(delta);
    }
}

// Handle wheel scrolling (mouse and touchpad)
scrollContainer.addEventListener('wheel', function(event) {
    event.preventDefault();
    
    let deltaY = event.deltaY;
    
    // Firefox uses "lines" as deltaMode in some cases, convert to pixels
    if (event.deltaMode === 1) { // deltaMode 1 means "lines", so we convert it to pixels
        deltaY *= 16; // Approximate height of a line in pixels
    }

    const delta = (deltaY > 0 ? getScrollStep() : -getScrollStep());
    handleScrollInput(delta);
});

// Handle keyboard scrolling
scrollContainer.addEventListener('keydown', function(event) {
    let delta = 0;
    const scrollStep = getScrollStep(); // Get the scroll step value

    switch (event.key) {
        case 'ArrowDown':
            delta = scrollStep; // Scroll down by the defined step
            break;
        case 'ArrowUp':
            delta = -scrollStep; // Scroll up by the defined step
            break;
        case 'PageDown':
            delta = scrollStep * 3; // Larger scroll for page down
            break;
        case 'PageUp':
            delta = -scrollStep * 3; // Larger scroll for page up
            break;
        default:
            return; // Ignore irrelevant keys
    }

    event.preventDefault();
    handleScrollInput(delta);
});

// Handle scroll event for dragging the scrollbar
scrollContainer.addEventListener('scroll', function() {
    const scrollStep = getScrollStep(); // Get the scroll step value
    const currentScrollTop = scrollContainer.scrollTop;

    // Calculate nearest step position
    const nearestStep = Math.round(currentScrollTop / scrollStep) * scrollStep;

    // Only adjust if current scroll position is not aligned with the step
    if (currentScrollTop !== nearestStep) {
        // Adjust to the nearest valid position
        const adjustment = nearestStep - currentScrollTop;
        
        // Check if the adjustment will keep within bounds
        if (isValidScrollPosition(currentScrollTop + adjustment)) {
            scrollByPixels(adjustment);
        } else {
            // If the adjustment exceeds bounds, snap back to the nearest valid position
            const snapBackAdjustment = currentScrollTop > nearestStep ? -((currentScrollTop % scrollStep) + (scrollStep - (currentScrollTop % scrollStep))) : -(currentScrollTop % scrollStep);
            if (isValidScrollPosition(currentScrollTop + snapBackAdjustment)) {
                scrollByPixels(snapBackAdjustment);
            }
        }
    }
});

// Handle touch events for mobile
let touchStartY = 0;
scrollContainer.addEventListener('touchstart', function(event) {
    touchStartY = event.touches[0].clientY;
});

scrollContainer.addEventListener('touchmove', function(event) {
    const touchEndY = event.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > 10) { // Only scroll if the movement is significant
        event.preventDefault();
        const delta = (deltaY > 0 ? getScrollStep() : -getScrollStep());
        handleScrollInput(delta);
    }
    touchStartY = touchEndY;
});






        var imageQueue = []; // Array to store generated images
        var quality = 5.0; // Initial quality value

        // Global variable to track if the alert has been shown
let highQualityAlertShown = false;

function changeQuality() {
    var qualityInput = document.getElementById('quality-input').value;
    var quality = parseFloat(qualityInput) || 1.0;

    // Check if the quality value exceeds the maximum limit
    if (quality > 20) {
        alert('Maximum quality is 20.');
        quality = 20; // Set quality to maximum allowed value
        highQualityAlertShown = false; // Reset the flag when exceeding max quality
    } 
    // Check if the quality value is high
    else if (quality > 5) {
        if (!highQualityAlertShown) { // Show alert only once
            alert('High quality may take generating image up to 1 minute.');
            highQualityAlertShown = true; // Set the flag to true after showing the alert
        }
    } else {
        // Reset the flag if the quality is 5 or lower
        highQualityAlertShown = false;
    }

    // Optional: Update quality in a global or higher scope variable if needed
    // qualityVariable = quality; // Uncomment and define qualityVariable elsewhere if needed
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
            var containerWrapper = document.getElementById('shadow-effect');
            containerWrapper.style.border = 'none';
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
                containerWrapper.style.border = "1px solid black";
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
            // Check if there are any images in the imageQueue
            if (imageQueue.length === 0) {
                alert("There are no images to generate a PDF. Please add images before generating.");
                return; // Exit the function if there are no images
            }
        
            // Show the loader before starting the PDF generation
            document.getElementById('loader').style.display = 'block';
        
            // Delay the PDF generation by a few milliseconds to allow the loader to show up
            setTimeout(function () {
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
                    var compressedImage = canvas.toDataURL('image/jpeg', 0.5); // 50% quality JPEG
        
                    // Add the image to the PDF with calculated dimensions and positions
                    pdf.addImage(compressedImage, 'JPEG', x, y, maxWidth, maxHeight);
                });
        
                // Save the PDF
                pdf.save('document.pdf');
        
                // Hide the loader after the PDF is generated
                document.getElementById('loader').style.display = 'none';
        
            }, 0); // Use a timeout to allow the loader to display first
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
    alert('Before drawing and adding images to the page, ensure that your page parameters are fixed, like page size and line spacing. Changing these after adding images may distort your page structure');
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

    // Line height used for text (ensure this matches the actual line height of the container's text)
    const lineSpacingInput = document.getElementById('line-spacing-text-input').value;
const lineHeight = lineSpacingInput ? parseInt(lineSpacingInput) : 26;

    // Function to set the image's width and height, ensuring height is a multiple of line height
    function adjustImageDimensions() {
        const outputContainer = document.getElementById('output-inner-container');
        const containerWidth = outputContainer.clientWidth; // Get the current container width
        const imgWidthPercent = parseFloat(widthInput); // Convert width input from percentage to a number
        const imgWidthInPixels = (imgWidthPercent / 100) * containerWidth; // Calculate width in pixels
        
        // Get the image's natural aspect ratio (for quality preservation)
        const aspectRatio = img.naturalWidth / img.naturalHeight;

        // Calculate the image's height based on the aspect ratio and width
        let imgHeightInPixels = imgWidthInPixels / aspectRatio;

        // Adjust the height to the nearest multiple of the line height
        imgHeightInPixels = Math.round(imgHeightInPixels / lineHeight) * lineHeight;

        // Check if the calculated width fits in the container
        if (imgWidthInPixels > containerWidth) {
            imgWidthInPixels = containerWidth; // Ensure image doesn't overflow container width
            imgHeightInPixels = imgWidthInPixels / aspectRatio; // Adjust height based on new width
        }

        // Now check if the calculated height exceeds container height
        if (imgHeightInPixels > outputContainer.clientHeight) {
            imgHeightInPixels = outputContainer.clientHeight; // Limit height to container height
            imgWidthInPixels = imgHeightInPixels * aspectRatio; // Recalculate width based on new height
        }

        // Ensure the width doesn't exceed the container after height adjustment
        if (imgWidthInPixels > containerWidth) {
            imgWidthInPixels = containerWidth; // Set width to container width if it exceeds
            imgHeightInPixels = imgWidthInPixels / aspectRatio; // Adjust height based on new width
        }

        // Apply the calculated width and height while preserving the aspect ratio
        //img.style.maxWidth = `${(imgWidthPercent / 100) * containerWidth}px`; // Set max-width
        img.style.maxHeight = `${imgHeightInPixels}px`;  // Set max-height with line height multiple
        img.style.width = 'auto';  // Auto width maintains aspect ratio
        img.style.height = 'auto'; // Let the height scale naturally
        img.style.leftMargin='3px'
        img.style.rightMargin='3px'
    }

    // Set basic styles for the image
    img.style.verticalAlign = 'bottom'; // Align the image to the bottom of the line
    img.style.float = floatInput; // Apply the float value (left, right, or none)
    img.style.objectFit = 'cover'; // Ensure the image covers its box without distortion

    // Adjust the image dimensions on load
    adjustImageDimensions();

    // Append the image to the container
    const outputContainer = document.getElementById('output-inner-container');
    outputContainer.appendChild(img);

    // Close the popup
    document.getElementById('popup-output').style.display = 'none';

    // Recalculate dimensions when the window or container resizes
    window.addEventListener('resize', adjustImageDimensions);
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

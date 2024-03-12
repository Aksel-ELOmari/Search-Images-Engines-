
// Get the image element
const image = document.getElementById('foto-img');
// Object to store applied filters
let appliedFilters = {};
// Get all range input elements
const rangeInputs = document.querySelectorAll('input[type="range"]');

// Add event listeners to each range input
rangeInputs.forEach(input => {
input.addEventListener('input', applyFilter);
});

// Function to apply filter based on the input label
function applyFilter(event) {
const filterName = event.target.id;
const filterValue = event.target.value;

// Update appliedFilters object with the filter and its value
appliedFilters[filterName] = `${filterName}(${filterValue}${getFilterUnit(filterName)})`;

// Apply accumulated filters to the image
image.style.filter = Object.values(appliedFilters).join(' ');
}

// Function to get the appropriate unit for each filter
function getFilterUnit(filterName) {
   // Define units for different filters as needed
   const units = {
   saturate: '%',
   blur: 'px',
   brightness: '%',
   'hue-rotate': 'deg',
   contrast: '%',
   grayscale: '%',
   invert: '%',
   sepia: '%',
   opacity: '%'
   // Add more filters and units if needed
};
return units[filterName] || ''; // Return the unit or empty string if not found
}

// Reset button functionality
const resetButton = document.querySelector('input[type="reset"]');
resetButton.addEventListener('click', () => {
rangeInputs.forEach(input => {
   // Reset each range input value to default
   input.value = 50; // Set default value as needed
});
// Clear applied filters and reset image filter
appliedFilters = {};
image.style.filter = 'none';
});
// Upload button functionality
const uploadInput = document.getElementById('Foto-file');
uploadInput.addEventListener('change', (event) => {
   rangeInputs.forEach(input => {
   // Reset each range input value to default
   input.value = 50; // Set default value as needed
   });
image.style.display = 'block';
const selectedFile = event.target.files[0];
if (selectedFile) {
   const reader = new FileReader();
   reader.onload = function (e) {
      // Reset image source and filters
      image.src = e.target.result;
      image.style.filter = 'none';
      appliedFilters = {};
   };
   reader.readAsDataURL(selectedFile);
}
});

// Download button functionality
const downloadButton = document.getElementById('downloadLink');
downloadButton.addEventListener('click', () => {
// Create a temporary canvas element
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to image dimensions
canvas.width = image.naturalWidth || image.width;
canvas.height = image.naturalHeight || image.height;

// Apply filters to the canvas before downloading
const filterStyle = Object.values(appliedFilters).join(' ');
ctx.filter = filterStyle;
ctx.drawImage(image, 0, 0);

// Convert canvas content to image data URL and initiate download
const link = document.createElement('a');
link.href = canvas.toDataURL("image/png");
link.download = 'filtered_image.png'; 
link.click();
});
// Select elements
const imageInput = document.getElementById('imageInput');
const formatSelect = document.getElementById('formatSelect');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const convertBtn = document.getElementById('convertBtn');
const downloadSection = document.getElementById('downloadSection');

// Convert Button Event Listener
convertBtn.addEventListener('click', () => {
  const file = imageInput.files[0];
  const format = formatSelect.value;
  const customWidth = parseInt(widthInput.value, 10);
  const customHeight = parseInt(heightInput.value, 10);

  // Validation
  if (!file) {
    alert('Please upload an image file.');
    return;
  }

  if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
    alert('Only PNG, JPEG, and JPG formats are supported.');
    return;
  }

  // FileReader to read the uploaded file
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;

    img.onload = function () {
      let width = img.width;
      let height = img.height;

      // Apply custom width/height if provided
      if (!isNaN(customWidth) && customWidth > 0) {
        width = customWidth;
      }
      if (!isNaN(customHeight) && customHeight > 0) {
        height = customHeight;
      }

      // Create a canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // Draw the image on canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to image blob
      canvas.toBlob(
        function (blob) {
          const newFileName = `converted-image.${format}`;
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = newFileName;
          link.innerText = `Download ${newFileName}`;
          link.className = 'download-link';

          // Clear previous download link
          downloadSection.innerHTML = '';
          downloadSection.appendChild(link);
        },
        `image/${format === 'jpg' ? 'jpeg' : format}`,
        1.0
      );
    };

    img.onerror = function () {
      alert('Failed to load image. Please try again.');
    };
  };

  reader.onerror = function () {
    alert('Error reading the file.');
  };

  reader.readAsDataURL(file);
});

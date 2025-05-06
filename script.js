function convertImage() {
  const fileInput = document.getElementById('imageInput');
  const format = document.getElementById('format').value;
  const width = parseInt(document.getElementById('width').value);
  const height = parseInt(document.getElementById('height').value);
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  if (!fileInput.files[0]) {
    alert('Please select an image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = width || img.width;
      canvas.height = height || img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/' + format);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = `converted-image.${format}`;
      downloadLink.innerText = 'Download Converted Image';
      downloadLink.style.display = 'block';

      const container = document.getElementById('downloadLinkContainer');
      container.innerHTML = '';
      container.appendChild(downloadLink);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}

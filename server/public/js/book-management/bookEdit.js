document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // prevent the form from submitting normally

    // create a FormData object from the form
    var formData = new FormData(this);

    // send the form data to the server using Fetch API
    //get the book id from the url
    const url = window.location.href;
    const bookID = url.split('/').pop();
    //append img url to the form data
    formData.append('ImageUrl', document.getElementById('image-preview').src);

    const isActiveCheckbox = formData.get('IsBookActive');
    const isOutOfStockCheckbox = formData.get('IsOutOfStock');

    const isActive = isActiveCheckbox === 'on';
    const isOutOfStock = !(isOutOfStockCheckbox === 'on');

    formData.set('IsBookActive', isActive);
    formData.set('IsOutOfStock', isOutOfStock);
    fetch(`/api/books/update/${bookID}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/admin/book-management';
      })
      .catch((error) => console.error('Error:', error));
  });

  const uploadButton = document.getElementById('upload-button');
  const fileInput = document.getElementById('bookCover');
  const imagePreview = document.getElementById('image-preview');
  const fileName = document.getElementById('file-name');

  uploadButton.addEventListener('click', function () {
    fileInput.click();
  });

  fileInput.addEventListener('change', function () {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('hidden');
        fileName.textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  }
});

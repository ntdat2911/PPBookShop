document.addEventListener('DOMContentLoaded', () => {
  // Event listener for the Create button
  document
    .querySelector('button[data-dialog-target="dialogCreate"]')
    .addEventListener('click', () => {
      document
        .querySelector('[data-dialog="dialogCreate"]')
        .classList.add('opacity-100', 'pointer-events-auto');
    });

  // Function to handle Create form submission
  document
    .querySelector('[data-dialog="dialogCreate"] form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      const isActiveCheckbox = formData.get('IsBookActive');
      const isOutOfStockCheckbox = formData.get('IsOutOfStock');

      const isActive = isActiveCheckbox === 'on';
      const isOutOfStock = isOutOfStockCheckbox === 'on';

      formData.set('IsBookActive', isActive);
      formData.set('IsOutOfStock', isOutOfStock);

      await fetch('http://localhost:4000/api/books/create', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle success response

          closeDialog('dialogCreate');
        })
        .catch((error) => {
          // Handle error response
          console.error('Error:', error);
        });

      // Close the dialog
      closeDialog('dialogCreate');
      location.reload();
    });

  // Function to handle Edit form submission

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

  // Function to close dialog
  function closeDialog(dialogName) {
    document
      .querySelector(`[data-dialog="${dialogName}"]`)
      .classList.remove('opacity-100', 'pointer-events-auto');
  }

  // Close dialog on Cancel button click
  document
    .querySelectorAll('button[data-dialog-close="true"]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        closeDialog(
          button.closest('[data-dialog]').getAttribute('data-dialog'),
        );
      });
    });

  document
    .querySelectorAll('#activateButton, #deactivateButton')
    .forEach((button) => {
      button.addEventListener('click', async (event) => {
        const bookId = event.target.getAttribute('data-book-id');
        // Perform specific actions based on the bookId
        if (event.target.id === 'activateButton') {
          await fetch('http://localhost:4000/api/books/update-active-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              BookID: bookId,
              IsBookActive: true,
            }),
          }).then(() => location.reload());
          // Activate the book
        } else if (event.target.id === 'deactivateButton') {
          await fetch('http://localhost:4000/api/books/update-active-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              BookID: bookId,
              IsBookActive: false,
            }),
          }).then(() => location.reload());
        }
      });
    });

  document
    .querySelectorAll('button[data-dialog-target="dialogEdit"]')
    .forEach((button) => {
      button.addEventListener('click', (event) => {
        const bookId = event.target.closest('tr').getAttribute('data-book-id');
        window.location.href = `${window.location.href}/edit/${bookId}`;
      });
    });
});

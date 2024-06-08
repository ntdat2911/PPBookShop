document.addEventListener('DOMContentLoaded', function () {
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
      const form = event.target;
      const formData = new FormData(form);

      const isActiveCheckbox = formData.get('IsAvailable');
      const isActive = isActiveCheckbox === 'on';
      formData.set('IsAvailable', isActive);

      const checkedCheckboxes = Array.from(
        document.querySelectorAll(
          'input[type="checkbox"][name="book"]:checked',
        ),
      );
      const selectedBooks = checkedCheckboxes.map((checkbox) => checkbox.value);
      if (selectedBooks.length === 0 || selectedBooks === null) {
        alert('Please select at least one book');
        return;
      }
      formData.set('SelectedBooks', selectedBooks.toString());
      await fetch('http://localhost:4000/api/promotions/create', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
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
        const promotionID = event.target.getAttribute('data-promotion-id');
        // Perform specific actions based on the bookId
        if (event.target.id === 'activateButton') {
          await fetch(
            'http://localhost:4000/api/promotions/update-active-status',
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                PromotionID: promotionID,
                IsAvailable: true,
              }),
            },
          ).then(() => this.location.reload());
          // Activate the book
        } else if (event.target.id === 'deactivateButton') {
          await fetch(
            'http://localhost:4000/api/promotions/update-active-status',
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                PromotionID: promotionID,
                IsAvailable: false,
              }),
            },
          ).then(() => this.location.reload());
        }
      });
    });

  document
    .querySelectorAll('button[data-dialog-target="dialogEdit"]')
    .forEach((button) => {
      button.addEventListener('click', (event) => {
        const promotionID = event.target
          .closest('tr')
          .getAttribute('data-promotion-id');
        window.location.href = `${window.location.pathname}/edit/${promotionID}`;
      });
    });
});

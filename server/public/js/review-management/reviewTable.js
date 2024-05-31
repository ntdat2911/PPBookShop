document.addEventListener('DOMContentLoaded', () => {
  // Event listener for the Create button
  document
    .querySelector('button[data-dialog-target="dialogDetail"]')
    .addEventListener('click', () => {
      document
        .querySelector('[data-dialog="dialogDetail"]')
        .classList.add('opacity-100', 'pointer-events-auto');
    });

  // Function to handle Create form submission
  document
    .querySelectorAll('button[data-dialog-target="dialogDetail"]')
    .forEach((button) => {
      button.addEventListener('click', (event) => {
        const dialog = document.querySelector('[data-dialog="dialogDetail"]');
        dialog.classList.add('opacity-100', 'pointer-events-auto');

        // Get the row
        const row = event.target.closest('tr');

        // Get the cell data
        const cellData = Array.from(row.cells).map((cell) => cell.textContent);

        // Get the p tags in the dialog
        const pTags = dialog.querySelectorAll('p');

        // Set the text content of the p tags to the cellData
        pTags[0].textContent = 'Book Title: ' + cellData[0];
        pTags[1].textContent = 'Username: ' + cellData[1];
        pTags[2].textContent = 'Review Title: ' + cellData[2];
        pTags[3].textContent = 'Review Content: ' + cellData[3];
        pTags[4].textContent = 'Rating: ' + cellData[4];
      });
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
});

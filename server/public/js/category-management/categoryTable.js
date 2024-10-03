document.addEventListener('DOMContentLoaded', function () {
  window.onload = function () {
    const searchInput = document.getElementById('searchInput');
    searchInput.focus();
    searchInput.setSelectionRange(
      searchInput.value.length,
      searchInput.value.length,
    );
  };
  const searchInput = document.getElementById('searchInput');
  let timeout = null;

  searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();
    // const rows = document.querySelectorAll('tbody tr');

    // rows.forEach((row) => {
    //   const columns = row.querySelectorAll('td');
    //   let found = false;

    //   columns.forEach((column) => {
    //     if (column.textContent.toLowerCase().includes(searchValue)) {
    //       found = true;
    //     }
    //   });

    //   if (found) {
    //     row.classList.remove('hidden');
    //   } else {
    //     row.classList.add('hidden');
    //   }
    // });
    //add input to search params in URL
    //debounce the search input
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const url = new URL(window.location.href);

      url.searchParams.set('search', searchValue);
      if (searchValue === '') {
        url.searchParams.delete('search');
      }
      window.location.href = url;
    }, 1000);
  });
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

      const isActiveCheckbox = formData.get('IsCategoryActive');

      const isActive = isActiveCheckbox === 'on';

      formData.set('IsCategoryActive', isActive);

      await fetch('http://localhost:4000/api/categories/create', {
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
        const categoryID = event.target.getAttribute('data-category-id');
        // Perform specific actions based on the bookId
        if (event.target.id === 'activateButton') {
          await fetch(
            'http://localhost:4000/api/categories/update-active-status',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                CategoryID: categoryID,
                IsCategoryActive: true,
              }),
            },
          ).then(() => this.location.reload());
          // Activate the book
        } else if (event.target.id === 'deactivateButton') {
          await fetch(
            'http://localhost:4000/api/categories/update-active-status',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                CategoryID: categoryID,
                IsCategoryActive: false,
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
        const categoryID = event.target
          .closest('tr')
          .getAttribute('data-category-id');
        window.location.href = `${window.location.pathname}/edit/${categoryID}`;
      });
    });
});

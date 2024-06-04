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

      const selectedItems = Array.from(
        document.querySelectorAll('#selectedItems div[data-id]'),
      ).map((item) => item.dataset.id);

      formData.set('SelectedBooks', selectedItems.toString());

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
              method: 'POST',
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
              method: 'POST',
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

  const toggleDropdown = document.getElementById('toggleDropdown');
  const dropdown = document.getElementById('dropdown');
  const selectedItemsContainer = document.getElementById('selectedItems');
  const dropdownItems = document.getElementById('dropdownItems');
  const inputBox = document.getElementById('inputBox');

  toggleDropdown.addEventListener('click', function () {
    dropdown.classList.toggle('hidden');
  });

  dropdownItems.addEventListener('click', function (event) {
    if (event.target.closest('.cursor-pointer')) {
      const selectedValue =
        event.target.closest('.cursor-pointer').dataset.value;
      const selectedText = event.target
        .closest('.cursor-pointer')
        .textContent.trim();
      addSelectedItem(selectedValue, selectedText);
      event.target.closest('.cursor-pointer').remove();
    }
  });

  function addSelectedItem(value, text) {
    const item = document.createElement('div');
    item.className =
      'flex items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300';
    item.dataset.id = value;
    item.innerHTML = `
        ${text}
        <span class="cursor-pointer ml-2 text-teal-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </span>
      `;
    selectedItemsContainer.insertBefore(
      item,
      selectedItemsContainer.querySelector('.flex-1'),
    );

    item.querySelector('span').addEventListener('click', function () {
      item.remove();
      addDropdownItem(value, text);
    });

    updateInputBox();
  }

  function addDropdownItem(value, text) {
    const item = document.createElement('div');
    item.className =
      'cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100';
    item.dataset.value = value;
    item.innerHTML = `
        <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
          <div class="w-full items-center flex">
            <div class="mx-2 leading-6">${text}</div>
          </div>
        </div>
      `;
    dropdownItems.appendChild(item);
  }

  function updateInputBox() {
    const selectedValues = Array.from(
      selectedItemsContainer.querySelectorAll('div[data-id]'),
    )
      .map((item) => item.textContent.trim())
      .join(', ');
    inputBox.value = selectedValues;
  }

  // Close the dropdown if the user clicks outside of it
  document.addEventListener('click', function (event) {
    if (
      !dropdown.contains(event.target) &&
      !toggleDropdown.contains(event.target)
    ) {
      dropdown.classList.add('hidden');
    }
  });
});

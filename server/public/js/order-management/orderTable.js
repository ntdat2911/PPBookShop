document.addEventListener('DOMContentLoaded', () => {
  const confirmationDialog = document.getElementById('confirmationDialog');
  const confirmationMessage = document.getElementById('confirmationMessage');
  const cancelButton = document.getElementById('cancelButton');
  const confirmButton = document.getElementById('confirmButton');

  let currentSelect;
  let previousValue;
  let selectedValue;
  let orderID;

  document.querySelectorAll('select[data-order-select]').forEach((select) => {
    select.addEventListener('change', (event) => {
      // Store the current select element and values
      currentSelect = select;
      previousValue = select.dataset.previousValue;
      selectedValue = select.value;
      orderID = select.getAttribute('data-order-id');

      // Set the confirmation message
      confirmationMessage.textContent = `Are you sure you want to change the order status to ${selectedValue}?`;

      // Show the confirmation dialog
      confirmationDialog.classList.remove('hidden');
    });

    // Store the initial value as a data attribute
    select.dataset.previousValue = select.value;
  });

  cancelButton.addEventListener('click', () => {
    // Hide the confirmation dialog
    confirmationDialog.classList.add('hidden');

    // Revert the select element to its previous value
    if (currentSelect) {
      currentSelect.value = previousValue;
    }
  });

  confirmButton.addEventListener('click', async () => {
    // Hide the confirmation dialog
    confirmationDialog.classList.add('hidden');

    // Proceed with the fetch request
    if (orderID && selectedValue) {
      await fetch(`http://localhost:4000/api/orders/update-status/${orderID}`, {
        method: 'PUT',
        body: JSON.stringify({ OrderStatus: selectedValue }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => location.reload());
    }
  });

  const statusFilter = document.getElementById('statusFilter');

  statusFilter.addEventListener('change', () => {
    const selectedStatus = statusFilter.value;
    const url = new URL(window.location.href);
    url.searchParams.set('status', selectedStatus);
    window.location.href = url.toString();
  });

  // To keep the filter selected value after page reload based on the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const currentStatus = urlParams.get('status');
  if (currentStatus) {
    statusFilter.value = currentStatus;
  }
});

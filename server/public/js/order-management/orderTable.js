document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('select[data-order-select]').forEach((select) => {
    select.addEventListener('change', async (event) => {
      // Handle the select change event here
      const selectedValue = select.value;
      const orderID = select.getAttribute('data-order-id');
      await fetch(`http://localhost:4000/api/orders/update-status/${orderID}`, {
        method: 'PUT',
        body: JSON.stringify({ OrderStatus: selectedValue }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => location.reload());
    });
  });
});

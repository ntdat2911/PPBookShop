document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent the form from submitting normally

    // create a FormData object from the form
    const url = window.location.href;
    const PromotionID = url.split('/').pop();
    const formData = new FormData(this);

    formData.set('PromotionID', PromotionID);
    const isActiveCheckbox = formData.get('IsAvailable');
    const isActive = isActiveCheckbox === 'on';
    formData.set('IsAvailable', isActive);

    const checkedCheckboxes = Array.from(
      document.querySelectorAll('input[type="checkbox"][name="book"]:checked'),
    );
    const selectedBooks = checkedCheckboxes.map((checkbox) => checkbox.value);
    if (selectedBooks.length === 0) {
      alert('Please select at least one book');
      return;
    }
    formData.set('SelectedBooks', selectedBooks.toString());
    fetch(`/api/promotions/update/${PromotionID}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/admin/promotion-management';
      })
      .catch((error) => console.error('Error:', error));
  });
  document
    .getElementById('ExpiredDate')
    .addEventListener('keydown', function (event) {
      event.preventDefault();
    });
});

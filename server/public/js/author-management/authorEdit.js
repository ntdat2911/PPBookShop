document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // prevent the form from submitting normally

    // create a FormData object from the form
    var formData = new FormData(this);
    const url = window.location.href;
    const categoryID = url.split('/').pop();

    fetch(`/api/authors/update/${categoryID}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        //redirect to the author list page
        window.location.href = '/admin/author-management';
      })
      .catch((error) => console.error('Error:', error));
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const content = tinymce.get('mytextarea').getContent();

    fetch(`/api/about-us/create/1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        //redirect to the author list page
        console.log(data);
        alert('About Us page updated successfully');
      })
      .catch((error) => console.error('Error:', error));
  });
  let timer;
});

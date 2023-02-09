async function newSongHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('#song').value.trim();
    const price_paid = document.querySelector('#retail-price').value.trim();
    const notes = document.querySelector('#notes').value.trim();

    const response = await fetch(`/api/song`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        price_paid,
        notes
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/inventory');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-song').addEventListener('submit', newSongHandler);
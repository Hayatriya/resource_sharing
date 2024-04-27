document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    fetch(`http://localhost:3000/user/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + password
        }
    })
    .then(response => response.json())
    .then(data => {
        const userDataDiv = document.getElementById('userData');
        userDataDiv.innerHTML = `<p>Name: ${data.name}</p>
                                 <p>ID: ${data.id}</p>
                                 <p>Email: ${data.email}</p>
                                 <p>Dynamic API Key: ${data.apiKey}</p>`;
    })
    .catch(error => console.error('Error:', error));
});

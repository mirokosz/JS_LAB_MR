document.getElementById('showMessageButton').addEventListener('click', function() {
    const div = document.createElement('div');
    div.textContent = 'Cześć!';
    document.body.appendChild(div);
});
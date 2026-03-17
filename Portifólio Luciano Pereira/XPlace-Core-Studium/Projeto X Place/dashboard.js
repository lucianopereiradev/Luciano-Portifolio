const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// abrir/fechar box
searchToggle.addEventListener('click', e => {
    e.stopPropagation();
    searchBox.style.display = (searchBox.style.display === 'block') ? 'none' : 'block';
});

// fechar ao clicar fora
document.addEventListener('click', e => {
    if (!searchBox.contains(e.target) && e.target !== searchToggle)
        searchBox.style.display = 'none';
});

searchButton.onclick = () => {
    const q = searchInput.value.trim();
    if (q) alert(`Você pesquisou por: ${q}`);
};
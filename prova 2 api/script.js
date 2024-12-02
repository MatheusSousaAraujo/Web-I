const apiKey = '9fc509eb640458859596551bdc15cdc7'; // Coloque sua chave da API do TMDb aqui
const apiUrl = 'https://api.themoviedb.org/3/';
const language = 'pt-BR'; // Definindo português como idioma
const searchBtn = document.getElementById('search-btn');
const movieSearch = document.getElementById('movie-search');
const movieList = document.getElementById('movie-list');
const movieDetails = document.getElementById('movie-details');
const favoriteList = document.getElementById('favorites-list');
let favorites = [];

// Função para buscar filmes
function searchMovies(query) {
    fetch(`${apiUrl}search/movie?api_key=${apiKey}&language=${language}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Erro ao buscar filmes:', error));
}

// Função para exibir os filmes encontrados
function displayMovies(movies) {
    movieList.innerHTML = ''; // Limpa a lista de filmes
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button onclick="showMovieDetails(${movie.id})">Ver Detalhes</button>
            <button onclick="toggleFavorite(${movie.id})">Favoritar</button>
        `;
        movieList.appendChild(movieCard);
    });
}

// Função para exibir os detalhes do filme
function showMovieDetails(movieId) {
    fetch(`${apiUrl}movie/${movieId}?api_key=${apiKey}&language=${language}`)
        .then(response => response.json())
        .then(data => {
            // Criando uma lista com todos os detalhes disponíveis
            const genres = data.genres.map(genre => genre.name).join(', ');
            const runtime = data.runtime ? `${data.runtime} minutos` : 'Duração não disponível';
            const budget = data.budget ? `Orçamento: $${data.budget.toLocaleString()}` : 'Orçamento não disponível';
            const revenue = data.revenue ? `Receita: $${data.revenue.toLocaleString()}` : 'Receita não disponível';
            const productionCompanies = data.production_companies.map(company => company.name).join(', ') || 'Produtores não disponíveis';
            const cast = data.cast ? data.cast.slice(0, 5).map(actor => actor.name).join(', ') : 'Elenco não disponível'; // Exibe os 5 primeiros atores
            const tagline = data.tagline ? `<em>"${data.tagline}"</em>` : 'Sem slogan disponível';
            const status = data.status ? data.status : 'Status não disponível';
            const originalLanguage = data.original_language ? data.original_language.toUpperCase() : 'Idioma não disponível';
            
            // Exibindo todos os detalhes na página
            movieDetails.innerHTML = `
                <h2>${data.title} (${data.release_date.split('-')[0]})</h2>
                <img src="https://image.tmdb.org/t/p/w200${data.poster_path}" alt="${data.title}">
                <p><strong>Sinopse:</strong> ${data.overview}</p>
                <p><strong>Gênero(s):</strong> ${genres}</p>
                <p><strong>Duração:</strong> ${runtime}</p>
                <p><strong>Orçamento:</strong> ${budget}</p>
                <p><strong>Receita:</strong> ${revenue}</p>
                <p><strong>Produtores:</strong> ${productionCompanies}</p>
                <p><strong>Elenco:</strong> ${cast}</p>
                <p><strong>Idioma Original:</strong> ${originalLanguage}</p>
                <p><strong>Status:</strong> ${status}</p>
                <p><strong>Tagline:</strong> ${tagline}</p>
                <p><strong>Avaliação:</strong> ${data.vote_average} / 10</p>
                <p><strong>Data de Lançamento:</strong> ${data.release_date}</p>
                <button onclick="getRelatedMovies(${movieId})">Filmes Relacionados</button>
            `;
            
            // Exibindo o conteúdo de detalhes na página
            movieDetails.style.display = 'block';
        })
        .catch(error => console.error('Erro ao obter detalhes do filme:', error));
}

// Função para obter filmes relacionados
function getRelatedMovies(movieId) {
    fetch(`${apiUrl}movie/${movieId}/recommendations?api_key=${apiKey}&language=${language}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Erro ao buscar filmes relacionados:', error));
}

// Função para favoritar/desfavoritar filmes
function toggleFavorite(movieId) {
    const movieIndex = favorites.indexOf(movieId);
    if (movieIndex === -1) {
        favorites.push(movieId);
    } else {
        favorites.splice(movieIndex, 1);
    }
    updateFavoriteList();
}

// Função para atualizar a lista de favoritos
function updateFavoriteList() {
    favoriteList.innerHTML = '';
    favorites.forEach(movieId => {
        fetch(`${apiUrl}movie/${movieId}?api_key=${apiKey}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                const favoriteItem = document.createElement('li');
                favoriteItem.textContent = data.title;
                favoriteList.appendChild(favoriteItem);
            })
            .catch(error => console.error('Erro ao buscar filme favorito:', error));
    });
}

// Event listener para o botão de busca
searchBtn.addEventListener('click', () => {
    const query = movieSearch.value.trim();
    if (query) {
        searchMovies(query);
    }
});

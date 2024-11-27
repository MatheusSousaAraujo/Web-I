document.getElementById('search-btn').addEventListener('click', function() {
    const movieName = document.getElementById('movie-search').value;
    
    if (!movieName) {
      alert('Por favor, insira o nome do filme.');
      return;
    }
    
    const apiKey = '44ba71a5'; // Substitua pela sua chave de API
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "False") {
          document.getElementById('movie-info').innerHTML = `<p>Filme não encontrado.</p>`;
          return;
        }
  
        const movieDetail = `
          <div class="movie-detail">
            <img src="${data.Poster}" alt="${data.Title}">
            <div>
              <h2>${data.Title} (${data.Year})</h2>
              <p class="genre">Gênero: ${data.Genre}</p>
              <p><strong>Elenco:</strong> ${data.Actors}</p>
              <p><strong>Sinopse:</strong> ${data.Plot}</p>
              <p class="rating">Avaliação IMDb: ${data.imdbRating}</p>
              <p><a href="https://www.imdb.com/title/${data.imdbID}" target="_blank">Veja mais no IMDb</a></p>
            </div>
          </div>
        `;
  
        document.getElementById('movie-info').innerHTML = movieDetail;
      })
      .catch(error => {
        console.error('Erro ao buscar o filme:', error);
        alert('Erro ao buscar o filme. Tente novamente.');
      });
  });
  
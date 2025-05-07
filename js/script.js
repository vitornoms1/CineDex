const movieTitle = document.querySelector('.movie__title');
const movieYear = document.querySelector('.movie__year');
const moviePoster = document.querySelector('.movie__poster');
const input = document.querySelector('.input__search');
const form = document.querySelector('.form');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const API_KEY = '5c00caca'; // Substitua pela sua chave da API

let movieList = [];
let currentIndex = 0;

// Função para buscar filmes da OMDb
const fetchMovieList = async (searchTerm) => {
  const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`);
  const data = await res.json();

  if (data.Response === 'True') {
    movieList = data.Search;
    currentIndex = 0; // Iniciar a navegação no primeiro filme
    renderMovie(movieList[currentIndex]); // Exibir o primeiro filme
  } else {
    movieTitle.textContent = 'Filme não encontrado';
    movieYear.textContent = '';
    moviePoster.src = './images/notfound.png';
    movieList = []; // Limpar lista se não encontrar filmes
  }
};

// Função para renderizar o filme atual
const renderMovie = (movie) => {
  movieTitle.textContent = movie.Title;
  movieYear.textContent = movie.Year;
  moviePoster.src = movie.Poster !== 'N/A' ? movie.Poster : './images/notfound.png';
};

// Navegar para o filme anterior
btnPrev.addEventListener('click', () => {
  if (movieList.length > 0 && currentIndex > 0) {
    currentIndex--; // Desce um índice
    renderMovie(movieList[currentIndex]); // Exibe o filme correspondente
  }
});

// Navegar para o próximo filme
btnNext.addEventListener('click', () => {
  if (movieList.length > 0 && currentIndex < movieList.length - 1) {
    currentIndex++; // Aumenta o índice
    renderMovie(movieList[currentIndex]); // Exibe o próximo filme
  }
});

// Ao submeter a pesquisa, buscar filmes
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const term = input.value.trim();
  if (term) {
    fetchMovieList(term); // Busca os filmes com o termo digitado
  }
});
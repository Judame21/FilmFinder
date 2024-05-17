

//dropdown menu
document.addEventListener("DOMContentLoaded", function() {
  var dropdowns = document.querySelectorAll('.nav-item.dropdown');
  dropdowns.forEach(function(dropdown) {
    dropdown.addEventListener('mouseenter', function() {
      this.querySelector('.dropdown-menu').classList.add('show');
    });

    dropdown.addEventListener('mouseleave', function() {
      this.querySelector('.dropdown-menu').classList.remove('show');
    });
  });
});


$(document).ready(function() {
  // Función para hacer la búsqueda de películas por género
  function searchMoviesByGenre(genreId) {
      // Llama a la API utilizando el género como filtro
      fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  }

  // Agrega un controlador de eventos a cada enlace de categoría
  $('.nav-link').click(function() {
      // Obtén el filtro asociado al género de la categoría seleccionada
      var filter = $(this).data('filter');
      // Si el filtro es "all", muestra todas las películas
      $('.nav-link').removeClass('active');
      $(this).addClass('active');
      if (filter === 'all') {
          fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
      } else {
          // De lo contrario, realiza la búsqueda de películas por género
          searchMoviesByGenre(filter);
      }
  });

  // Función para hacer la llamada a la API y mostrar las películas
  function fetchMovies(url) {
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              displayMovies(data.results);
              displayCarousel(data.results)
          })
          .catch(error => {
              console.error('Error fetching movies:', error);
          });
  }

  // Función para mostrar las películas en la interfaz de usuario
  function displayMovies(movies) {
      // Limpiar el contenedor de películas antes de mostrar nuevas películas
      $('#movies-container').empty();

      // Iterar sobre cada película y agregarla al contenedor
      movies.forEach(movie => {
          const releaseYear = (new Date(movie.release_date)).getFullYear();
          const movieElement = `
            <div class="col-md-2 text-white" >
              <div class="movie-card" data-movie-id="${movie.id} " role="button">
                  <img class="card-img mt-3" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Card image">
                  <div class="card-img">
                      <h5 class="card-title">${movie.title}</h5>
                      <p class="card-text mb-3">${releaseYear}</p>
                  </div>
                </div>
              </div>
          `;
          $('#movies-container').append(movieElement);
      });
  }
});

  document.addEventListener('DOMContentLoaded', function() {
    // Función para filtrar películas por título
    $('.form-control').on('input', function() {
        const searchText = $(this).val().toLowerCase();
        if (searchText.trim() === '') {
          clearMovies()
            fetchMovies(1); // Vuelve a mostrar las películas del punto inicial
            $('.todas').addClass('active');
        } else {
          $('.nav-link').removeClass('active');
            fetchMoviesBySearch(searchText);
        }
    });
});

function fetchMoviesBySearch(searchText) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            clearMovies();
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function clearMovies() {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = ''; // Elimina todos los elementos dentro del contenedor
}


  const API_KEY = 'b851805f1177c518e9b596f687ce6741';
  const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
  

  const totalPages = 10; // Número total de páginas que deseas obtener
  let currentPage = 1;
  
  function fetchMovies(page) {
    fetch(`${BASE_URL}?api_key=${API_KEY}&page=${page}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayMovies(data.results);
        displayCarousel(data.results);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
  function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');

    movies.forEach(movie => {
        const releaseYear = (new Date(movie.release_date)).getFullYear();

        // Crear un elemento para cada película y agregarlo a la fila
        const movieElement = `
              <div class="col-md-2 text-white" >
                <div class="movie-card" data-movie-id="${movie.id} " role="button">
                  <img class="card-img mt-3" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Card image">
                  <div class="card-img">
                      <h5 class="card-title">${movie.title}</h5>
                      <p class="card-text mb-3">${releaseYear}</p>
                  </div>
                </div>
              </div>
          `;
          $('#movies-container').append(movieElement);
    });

}
function displayCarousel(movies){
  const carouselContainer = document.getElementById("carousel-container");

  if (movies.length > 0) {
    const firstMovie = movies[0];
    const movieElement = `
      <div class="carousel-item active">
        <img src="http://image.tmdb.org/t/p/original${firstMovie.backdrop_path}" class="d-block w-100" alt="Movie poster">
        <div class="carousel-caption">
          <div class="container movie-details">
            <div id="movie-details" class="row">
              <div class="col-12 col-md-4">
                <img class="img-carousel card-img mt-3 mb-3 rounded-" src="https://image.tmdb.org/t/p/w500${firstMovie.poster_path}" alt="Card image">
              </div>
              <div class="col-12 col-md-8">
                <h2 class="movie-title">${firstMovie.title}</h2>
                <p>${firstMovie.overview}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>`;

      carouselContainer.innerHTML = movieElement;
      for (let index = 1; index < 3; index++) {
        const firstMovie = movies[index];
        const movieElement = `
          <div class="carousel-item">
            <img src="http://image.tmdb.org/t/p/original${firstMovie.backdrop_path}" class="d-block w-100" alt="Movie poster">
            <div class="carousel-caption">
              <div class="container movie-details">
                <div id="movie-details" class="row">
                  <div class="col-12 col-md-4">
                    <img class="img-carousel card-img mt-3 mb-3 rounded-" src="https://image.tmdb.org/t/p/w500${firstMovie.poster_path}" alt="Card image">
                  </div>
                  <div class="col-12 col-md-8">
                    <h2 class="movie-title">${firstMovie.title}</h2>
                    <p>${firstMovie.overview}</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>`;
          
        carouselContainer.innerHTML += movieElement;
      }


  }
}

  


  function loadMoreMovies() {
    if (currentPage <= totalPages) {
      fetchMovies(currentPage);
      currentPage++;
    } else {
      console.log('Ya has cargado todas las películas.');
    }
  }
  
  // Ejemplo de uso: cargar más películas al hacer clic en un botón de "Cargar más"
  document.getElementById('load-more-btn').addEventListener('click', loadMoreMovies);
  
  // Cargar las primeras películas al cargar la página
  fetchMovies(currentPage);
  currentPage++;

  $(document).ready(function() {
    // Utiliza un selector de delegación para adjuntar el controlador de eventos a un elemento padre estático
    $(document).on('click', '.movie-card', function() {
        // Obtiene el ID de la película de los datos personalizados (data-movie-id)
        var movieId = $(this).data('movie-id');
        // Guarda el ID de la película en el almacenamiento local del navegador
        localStorage.setItem('selectedMovieId', movieId);
        // Redirige a la página de detalles de la película
        window.location.href = 'movie_details.html';
    });
  });
  
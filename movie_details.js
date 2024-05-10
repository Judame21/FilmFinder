$(document).ready(function() {
    // Obtiene el ID de la película seleccionada del almacenamiento local
    var selectedMovieId = localStorage.getItem('selectedMovieId');

    if (selectedMovieId) {
        // Hacer una solicitud AJAX para obtener los detalles de la película
        $.ajax({
            url: 'https://api.themoviedb.org/3/movie/' + selectedMovieId,
            method: 'GET',
            data: {
                api_key: 'b851805f1177c518e9b596f687ce6741',
                language: "es"
            },
            success: function(response) {

                var rating = response.vote_average;
                var starsPercentage = rating.toFixed(1);
                
                // Obtener la URL de la imagen de fondo
                var backdropUrl = 'http://image.tmdb.org/t/p/original' + response.backdrop_path;
                var imagePath = 'http://image.tmdb.org/t/p/original' + response.poster_path;
                var duracionFormateada = convertirDuracion(response.runtime);
                var presupuestoFormateado = formatearPresupuesto(response.budget);
                ;
                // Establecer la imagen de fondo del elemento .fondo
                
                // Mostrar otros detalles de la película
                $('#main').html(
                    '<div class="background-container" style="background-image: url(&quot;'+backdropUrl+'&quot;); background-color: rgb(0, 0, 0);">'+
                    '<div class="overlay"></div>'+
                    '</div>' +
                    '<div class="container movie-details">'+
                    '<div id="movie-details">'+
                    '<div class="row fila-details">'+
                    '<div class="col-12 col-md-4">'+
                    '        <img class="card-img mt-3 mb-3 rounded-" src="'+imagePath+'" alt="Card image">'+
                    '        </div>'+
                    '        <div class="col-12 col-md-6 m-2"> <!-- Cambiado a col-md-5 -->'+
                    '        <h2 class="movie-title">'+response.title+'</h2>'+
                    '        <p></p>'+
                    '        <p>'+response.overview+'</p>'+
                    '        <div class="rating-container">'+
                    '            <div class="stars"> '+
                    '            <i class="fas fa-star"></i>'+
                    '            <i class="fas fa-star"></i>'+
                    '            <i class="fas fa-star"></i>'+
                    '            </div>'+
                    '            <div class="rating-value">'+starsPercentage+'/10</div>'+
                    '        </div>'+
                    '        </div>'+
                    '        <div class="col-12 col-md-2 columna-informacion d-flex">'+
                    '            <div class="elemento-informativo">'+
                    '                <i class="fas fa-clock movie__icon" aria-hidden="true"></i>'+
                    '                <span>Estreno</span>'+
                    '                <span>'+response.release_date+'</span>'+
                    '            </div>'+
                    '            <div class="elemento-informativo">'+
                    '                <i class="fas fa-history movie__icon" aria-hidden="true"></i>'+
                    '                <span>Duración</span>'+
                    '                <span>'+duracionFormateada+'</span>'+
                    '            </div>'+
                    '            <div class="elemento-informativo">'+
                    '                <i class=" fas fa-solid fa-money-bill"></i>'+
                    '                <span>Presupuesto</span>'+
                    '                <span>'+presupuestoFormateado+'</span>'+
                    '            </div>'+
                    '    </div>'+
                    '    </div>'+
                    '    </div>'+
                    '</div>'
                );
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los detalles de la película:', error);
                $('#main').html('<p>Error al obtener los detalles de la película.</p>');
            }
        });
    } else {
        $('#movie-details').html('<p>No se ha seleccionado ninguna película.</p>');
    }
});

function convertirDuracion(minutos) {
    // Calcular las horas y los minutos
    var horas = Math.floor(minutos / 60);
    var minutosRestantes = minutos % 60;
    
    // Construir la cadena de duración en el formato deseado
    var duracionFormateada = horas + "h " + minutosRestantes + "m";
    
    return duracionFormateada;
}

function formatearPresupuesto(presupuesto) {
    // Convertir el presupuesto a formato numérico
    var presupuestoNumerico = parseInt(presupuesto);
    
    // Agregar el signo de dólar y formatear el número
    var presupuestoFormateado = "$" + presupuestoNumerico.toLocaleString();
    
    return presupuestoFormateado;
}
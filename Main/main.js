
let API_KEY = "00fc2bd5a54d4f3669c47b17c4d7cb3e";
const movieImage = [];

// Funcion para obtener las pelicula recientes de la API
async function getLatestMovies() {
    let moviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

    try {
        let response = await axios.get(moviesUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}
// Funcion para crear los arreglos contenedores de los datos necesarios de las peliculas.
// Ejemplo: Array "movieImage" con URLs de pelculas.
getLatestMovies().then((movies) => {

    for (let img of movies) {

        movieImage.push(img.poster_path)
        //console.log(img.poster_path)
    }
})

 //console.log(movieImage);




    // getLatestMoviesImage().then((movies) => {
    //     movies.forEach(x => {
    //         const {name, year, genere, seasons, imagen} = x;

    //     });
    // })



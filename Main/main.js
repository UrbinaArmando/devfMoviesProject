let API_KEY = "8d2ac7ee3c9c31fda2dcf263fbf976e0";
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
    console.log()
}
// Funcion para crear los arreglos contenedores de los datos necesarios de las peliculas.
// Ejemplo: Array "movieImage" con URLs de pelculas.
getLatestMovies().then((movies) => {

    for (let img of movies) {

        movieImage.push(img.poster_path)
        //console.log(img.poster_path)
    }
})
console.log(`https://api.themoviedb.org/3/movie${movieImage[0]}`);
document.getElementById('image1').src = `https://api.themoviedb.org/3/movie${movieImage[0]}`;




// getLatestMoviesImage().then((movies) => {
//     movies.forEach(x => {
//         const {name, year, genere, seasons, imagen} = x;

//     });
// })

/*console.log(document.getElementById("searchIcon"))
var searchIcon = document.getElementById("searchIcon");
var searchBox = document.getElementById("searchInput");

searchIcon.addEventListener('click', (e) => {
    searchBox.classList.toggle("active");
    console.log('active search works');
});*/

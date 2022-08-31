
let API_KEY = "00fc2bd5a54d4f3669c47b17c4d7cb3e";
let peliculas;
let generos;
let actores;
let carta;

const tituloModal    = document.querySelector("#tituloModal");
const contenidoModal = document.querySelector("#contenidoModal"); 
const imagenModal    = document.querySelector("#imagenModal"); 
const actoresModal    = document.querySelector("#actoresModal"); 


const obtenerGeneros = () => {

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-ES`)
        .then(response => response.json()).then((data) => {

            const todos = { id: 0, name: "Todos" }

            data.genres.unshift(todos);
            generos = data.genres;

           // console.log(generos.slice(0, 15));

            mostrarGeneros(generos.slice(0, 15));
        });
}

const mostrarGeneros = (generos) => {
    document.querySelector("#generos").innerHTML = "";

    for (const genero of generos) {

        let carta = document.createElement("div");

        carta.classList.add("card", "mt-2", "mb-2", "ms-2")
        carta.setAttribute("style", "width: 18rem;");

        let card = `
            <div class="card-body">       
                <h5 class="card-title titulo">${genero.name}</h5>
            </div>               
        `;

        carta.innerHTML = card;
        document.querySelector("#generos").append(carta);
    }
}


const obtenerPeliculas = () => {

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1&region=MX`)
        .then(response => response.json()).then((data) => {

            peliculas = data.results;

           // console.log(peliculas.slice(0, 15));

            mostrarPeliculas(peliculas.slice(0, 15));
        
        });
}

const mostrarPeliculas = (peliculas) => {
    document.querySelector("#resultados").innerHTML = "";

    //Mensaje de no hay resultados
    if (peliculas.length == 0) {

        let mensaje = document.createElement("div");

        mensaje.classList.add("mt-2", "mb-2", "ms-2")
        mensaje.setAttribute("style", "width: 100rem; height: 150rem; text-align: center;");

        let sinResultados = `
            <img src="assets/empty-box-256.png" class="img" alt="...">
            <h1 id="pel">No hay resultados.....</h1>             
        `;

        mensaje.innerHTML = sinResultados;
        document.querySelector("#resultados").append(mensaje);
    }

    for (const pelicula of peliculas) {

        let carta = document.createElement("div");

        carta.classList.add("card", "mt-2", "mb-2", "ms-2")
        carta.setAttribute("style", "width: 18rem;");

        let card = `
            <div>
                <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" class="card-img-top" alt="${pelicula.title}">
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col clearfix">
                        <span class="float-left">${pelicula.vote_average}</span>
                        <i class="fa fa-star" ></i>  
                    </div>
                </div>
                <h5 class="card-title titulo">${pelicula.title}</h5>
                <a data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary centrado" id="${pelicula.id}">Detalles</a>
            </div>               
        `;

        carta.innerHTML = card;
        document.querySelector("#resultados").append(carta);
    }
}


const mostrarDetalles = (e) => {
    let id = e.target.getAttribute("id");

    if (id !== null) {

        tituloModal.innerText = "";
        contenidoModal.innerText = "";
        
        const {title, overview, backdrop_path} = peliculas.find(p => p.id == id);

        tituloModal.innerText = title;
        contenidoModal.innerText = overview;
        imagenModal.setAttribute("src", `https://image.tmdb.org/t/p/original/${backdrop_path}`);
    
    }
};





let buscarPelicula = (evt) => {
    let name = document.querySelector("#searchInput").value.toLowerCase();
    
    let filtrados = peliculas.filter((pelicula)=>{
        return pelicula.title.toLowerCase().includes(name);
    });

    mostrarPeliculas(filtrados.slice(0, 15));
} 


const obtenerActores = (pelicula) => {
    fetch(`https://api.themoviedb.org/3/movie/${pelicula}/credits?api_key=${API_KEY}&language=es-ES`)
        .then(response => response.json()).then((data) => {
            actores = data.cast.filter((res) => res['known_for_department'] == "Acting");
            console.log(actores);
        });
}

// Se ejecutan siempre que inicie la pagina para traer la info de la API.
obtenerGeneros();
obtenerPeliculas();
//obtenerActores();

document.querySelector("#searchInput").addEventListener("keyup", buscarPelicula)
resultados.addEventListener("click", mostrarDetalles);
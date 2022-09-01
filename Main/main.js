
let API_KEY = "00fc2bd5a54d4f3669c47b17c4d7cb3e";
let peliculas;
let generos = [];
let actores;
let carta;

const tituloModal = document.querySelector("#tituloModal");
const contenidoModal = document.querySelector("#contenidoModal");
const imagenModal = document.querySelector("#imagenModal");
const actoresModal = document.querySelector("#actoresModal");


const obtenerGeneros = async () => {

    await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-ES`)
        .then(response => response.json()).then((data) => {

            // const todos = { id: 0, name: "Todos" }

            //data.genres.unshift(todos);
            generos = data.genres;

            // console.log(generos.slice(0, 15));

            //mostrarGeneros(generos.slice(0, 15));
        });
}

const mostrarGeneros = (generos) => {
    document.querySelector("#generos").innerHTML = "";

    for (const genero of generos) {

        let carta = document.createElement("div");

        carta.classList.add("card", "mt-2", "mb-2", "ms-2", "text-bg-dark")
        carta.setAttribute("style", "width: 15rem;");

        let card = `
            <div class="card-body">       
                <h5 class="card-title titulo text-white"">${genero.name}</h5>
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

        carta.classList.add("card", "mt-2", "mb-2", "ms-2", "p-0", "text-bg-dark")
        carta.setAttribute("style", "width: 15rem;");

        let card = `
            <div>
                <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" class="card-img-top" alt="${pelicula.title}">
            </div>
            <div class="card-body d-flex flex-column mb-0">
                <div class="row">
                    <div class="col clearfix">
                        <span class="float-left">${pelicula.vote_average}</span>
                        <i class="fa fa-star" ></i>  
                    </div>
                </div>
                <h5 class="card-title text-white titulo">${pelicula.title}</h5>              
            </div>
            <a data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-secondary centrado align-self-end m-1" id="${pelicula.id}">Detalles</a>               
        `;

        carta.innerHTML = card;
        document.querySelector("#resultados").append(carta);
    }
}

const mostrarPeliculasGeneros = (idGenero, nombreGenero) => {
    if (!peliculas.find((e) => e.genre_ids.includes(idGenero))) {
        return;
    }

    let fila = document.createElement("div");
    fila.classList.add("row");
    fila.id = `${idGenero}`
    let maquetaCarrusel = ` <div class="slider-wrap">
                                 <div class="slider">
                                    <div class="slider-inner" id="${idGenero}${nombreGenero}">
                                    </div>
                                </div>
                            </div>
    `;
    fila.innerHTML = maquetaCarrusel;
    document.querySelector("#peliculasGeneros").append(fila);

    let cabeceraSeccion = document.createElement("h1");
    cabeceraSeccion.innerText = `${nombreGenero}`;
    cabeceraSeccion.id = `${idGenero}`;
    cabeceraSeccion.classList.add("text-white");
    document.getElementById(`${idGenero}`).insertBefore(cabeceraSeccion, document.getElementById(`${idGenero}`).firstChild);


    let filtrados = (idGenero == 0) ? peliculas : peliculas.filter((pelicula) => pelicula.genre_ids.includes(idGenero));

    for (const pelicula of filtrados) {

        let carta = document.createElement("div");

        carta.classList.add("card", "mt-2", "mb-2", "ms-2", "p-0", "text-bg-dark")
        carta.setAttribute("style", "width: 15rem;");

        let card = `
            <div>
                <img src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" class="card-img-top" alt="${pelicula.title}">
            </div>
            <div class="card-body d-flex flex-column mb-0">
                <div class="row">
                    <div class="col clearfix">
                        <span class="float-left">${pelicula.vote_average}</span>
                        <i class="fa fa-star" ></i>  
                    </div>
                </div>
                <h5 class="card-title text-white titulo">${pelicula.title}</h5>                
            </div> 
            <a data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-secondary centrado align-self-end m-1" id="${pelicula.id}">Detalles</a>              
        `;

        carta.innerHTML = card;
        document.getElementById(`${idGenero}${nombreGenero}`).append(carta);
        document.getElementById(`${idGenero}${nombreGenero}`).addEventListener("click", mostrarDetalles);
    }
}


const mostrarDetalles = (e) => {
    let id = e.target.getAttribute("id");

    if (id !== null) {

        tituloModal.innerText = "";
        contenidoModal.innerText = "";
        actoresModal.innerText = "Actores: ";

        const { title, overview, backdrop_path } = peliculas.find(p => p.id == id);
        obtenerActores(id).then(() => {
            for (let i = 0; i < 5; i++) {
                if (i == 4) {
                    actoresModal.innerText += `${actores[i].name}. `;
                }
                else {
                    actoresModal.innerText += `${actores[i].name}, `;
                }
            }
        });
        tituloModal.innerText = title;
        contenidoModal.innerText = overview;
        imagenModal.setAttribute("src", `https://image.tmdb.org/t/p/original/${backdrop_path}`);
    }
};


let buscarPelicula = (evt) => {
    let name = document.querySelector("#searchInput").value.toLowerCase();

    let filtrados = peliculas.filter((pelicula) => {
        return pelicula.title.toLowerCase().includes(name);
    });

    mostrarPeliculas(filtrados.slice(0, 15));
}




let obtenerActores = async (pelicula) => {
    await fetch(`https://api.themoviedb.org/3/movie/${pelicula}/credits?api_key=${API_KEY}&language=es-ES`)
        .then(response => response.json()).then((data) => {
            actores = data.cast.filter((res) => res['known_for_department'] == "Acting");
            //console.log(actores)
        });
}



// Se ejecutan siempre que inicie la pagina para traer la info de la API.

obtenerPeliculas();
obtenerGeneros().then(() => {
    generos.forEach((e) => {
        mostrarPeliculasGeneros(e.id, e.name);
    });
});
//obtenerActores();

document.querySelector("#searchInput").addEventListener("keyup", buscarPelicula)
resultados.addEventListener("click", mostrarDetalles);
//prueba.addEventListener("click", mostrarDetalles);


// Codigo para el carrusel
const slider = document.querySelectorAll('.slider-inner');
const progressBar = document.querySelectorAll('.prog-bar-inner');

let sliderGrabbed = false;

slider.forEach((e) => {
    e.parentElement.addEventListener('scroll', (e) => {
        progressBar.style.width = `${getScrollPercentage()}%`
    })
})

slider.forEach((e) => {
    e.addEventListener('mousedown', (e) => {
        sliderGrabbed = true;
        slider.style.cursor = 'grabbing';
    })
})

slider.forEach((e) => {
    e.addEventListener('mouseup', (e) => {
        sliderGrabbed = false;
        slider.style.cursor = 'grab';
    })
})

slider.forEach((e) => {
    e.addEventListener('mouseleave', (e) => {
        sliderGrabbed = false;
    })
})

slider.forEach((e) => {
    e.addEventListener('mousemove', (e) => {
        if (sliderGrabbed) {
            slider.parentElement.scrollLeft -= e.movementX;
        }
    })
})

slider.forEach((e) => {
    addEventListener('wheel', (e) => {
        e.preventDefault()
        slider.parentElement.scrollLeft += e.deltaY;
    })
})

slider.forEach((e) => {
    ((e.parentElement.scrollLeft / (e.parentElement.scrollWidth - e.parentElement.clientWidth)) * 100)
})

/*function getScrollPercentage() {
    return ((slider.parentElement.scrollLeft / (slider.parentElement.scrollWidth - slider.parentElement.clientWidth)) * 100);
}*/
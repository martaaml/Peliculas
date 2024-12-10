let peliABuscar = "";
var paginaABuscar = 1;
let isLoading = false;
window.onload = () => {
    //APIKey =  https://www.omdbapi.com/?i=tt3896198&apikey=466ebfd1
    document.getElementById("btn").addEventListener("click", peticionAjaxModerna);
    window.addEventListener("scroll", scrollInfinito);
    // document.getElementById("buscarMas").addEventListener("click", cargarPaginas);
};
function peticionAjaxModerna() {
    mostrarPelis();
    peliABuscar = document.getElementById("BuscarPelicula").value;
    fetch("https://www.omdbapi.com/?apikey=466ebfd1&s=" + peliABuscar, { method: "GET" })//Esto es una promesa
        .then((res) => res.json()) //Da el contenido del archivo
        .then((datosRecibidos) =>  //Esto da los datos
        {
            document.getElementById("numeroResultados").innerHTML = "Se han encontrado " + datosRecibidos.totalResults + "peliculas";
            let miLista = document.getElementById("lista");
            miLista.innerHTML = "";

            console.log(datosRecibidos);
            for (pelicula of datosRecibidos.Search) {
                let li = document.createElement("li");
                li.innerHTML = pelicula.Title;
                miLista.appendChild(li);
                let img = document.createElement("img");
                img.src = pelicula.Poster;
                img.idPelicula = pelicula.imdbID;
                li.appendChild(img);
                li.addEventListener("click", detalle);
            }
        })
        .catch((err) => console.log("error".err));
}

function cargarPaginas() {
    peliABuscar = document.getElementById("BuscarPelicula").value;
    fetch("https://www.omdbapi.com/?apikey=466ebfd1&s=" + peliABuscar + "&page=2", { method: "GET" })//Esto es una promesa
        .then((res) => res.json()) //Da el contenido del archivo
        .then((datosRecibidos) =>  //Esto da los datos
        {
            paginaABuscar++;
            document.getElementById("numeroResultados").innerHTML = "Se han encontrado " + datosRecibidos.totalResults + "peliculas";
            let miLista = document.getElementById("lista");
            console.log(datosRecibidos);
            for (pelicula of datosRecibidos.Search) {
                let li = document.createElement("li");
                li.innerHTML = pelicula.Title;
                miLista.appendChild(li);
                let img = document.createElement("img");
                img.src = pelicula.Poster;
                img.idPelicula = pelicula.imdbID;
                img.addEventListener("click", detalle);
                li.appendChild(img);       
            }
        })
        .catch((err) => console.log("error".err));
}

function imagenSinFuncionar(){

}
function infoPeli() {
    peliABuscar = document.getElementById("BuscarPelicula").value;
    fetch("https://www.omdbapi.com/?apikey=466ebfd1&i=" + peliABuscar + "&page=2", { method: "GET" })
        .then((res) => res.json())
        .then((datosRecibidos) => {
            console.log(datosRecibidos);
            for (pelicula of datosRecibidos.Search) {
                let li = document.createElement("li");
                li.innerHTML = pelicula.Title;
                miLista.appendChild(li);
                let img = document.createElement("img");
                img.src = pelicula.Poster;
                img.idPelicula = pelicula.imdbID;
                img.addEventListener("click", detalle);
                li.appendChild(img);
            }
        })
        .catch((err) => console.log("error".err));
}

function detalle(e) {
    mostrarDetalle();
    console.log(e.target.idPelicula);
    url = "https://www.omdbapi.com/?apikey=466ebfd1&i=" + e.target.idPelicula;
    fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((datosRecibidos) => {
            document.getElementById("detalle").innerHTML = datosRecibidos.Plot;
        })
        .catch((err) => console.log("error".err));
}

function mostrarPelis() {
    document.getElementById("Inicio").style.display = "none";
    document.getElementById("Busqueda").style.display = "flex";
    document.getElementById("detalle").style.display = "none";
}

function mostrarDetalle() {
    document.getElementById("Inicio").style.display = "none";
    document.getElementById("Busqueda").style.display = "none";
    document.getElementById("detalle").style.display = "flex";
}

function mostrarInicio() {
    document.getElementById("Inicio").style.display = "flex";
    document.getElementById("Busqueda").style.display = "none";
    document.getElementById("detalle").style.display = "none";
}

function scrollInfinito() {
    // Evitar múltiples llamadas a cargarPaginas
    if (isLoading || !llegaFinal()) return;

    isLoading = true; // Marcar como cargando
    cargarPaginas();
    isLoading = false; // Liberar el estado después de cargar
}

function llegaFinal() {
    const posicionDeScroll =
        document.documentElement.scrollTop + window.innerHeight;
    const totalPantalla = document.documentElement.scrollHeight;

    return posicionDeScroll / totalPantalla >= 0.8;
}

// BUSQUEDA CON 4 LETRAS
function busquedaSola() {
    const searchTerm = document.getElementById("BuscarPelicula").value.trim();

    // Verificamos si el texto tiene al menos 4 caracteres
    if (searchTerm.length >= 4) {
        fetch(`https://www.omdbapi.com/?apikey=466ebfd1&s=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                const lista = document.getElementById("lista");
                lista.innerHTML = ""; // Limpiar resultados anteriores

                // Mostrar el número de resultados
                const numResultados = data.totalResults || 0;
                document.getElementById("numeroResultados").innerText =
                    `Se encontraron ${numResultados} resultados`;

                // Si hay resultados, agregarlos a la lista
                if (data.Search) {
                    data.Search.forEach((pelicula) => {
                        const li = document.createElement("li");
                        li.textContent = pelicula.Title;

                        const img = document.createElement("img");
                        img.src = pelicula.Poster !== "N/A" ? pelicula.Poster : "https://via.placeholder.com/150";
                        li.appendChild(img);

                        lista.appendChild(li);
                    });
                }
            })
            .catch((error) => console.error('Error al buscar películas:', error));
    }
}

// Asignar la función de búsqueda al evento de entrada del input
document.getElementById("BuscarPelicula").addEventListener("input", busquedaSola);

// BUSQUEDA PELIS
function busquedaSeries() {
    mostrarPelis();
    let peliABuscar = document.getElementById("BuscarPelicula").value;
   fetch("https://www.omdbapi.com/?apikey=466ebfd1&type=series&s=" + peliABuscar, { method: "GET" })

        .then((res) => res.json()) //Da el contenido del archivo
        .then((datosRecibidos) =>  //Esto da los datos
        {
            document.getElementById("numeroResultados").innerHTML = "Se han encontrado " + datosRecibidos.totalResults + "peliculas";

            let miLista = document.getElementById("lista");
            miLista.innerHTML = "";

            console.log(datosRecibidos);
            for (pelicula of datosRecibidos.Search) {
                let li = document.createElement("li");
                li.innerHTML = pelicula.Title;
                miLista.appendChild(li);
                let img = document.createElement("img");
                img.src = pelicula.Poster;
                img.idPelicula = pelicula.imdbID;
                li.appendChild(img);
                li.addEventListener("click", detalle);
            }
        })
        .catch((err) => console.log("error".err));
}
document.getElementById("botonSeries").addEventListener("click", busquedaSeries);
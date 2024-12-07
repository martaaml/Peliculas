let peliABuscar="";
var paginaABuscar=1;
window.onload = () =>
    {
        //APIKey =  https://www.omdbapi.com/?i=tt3896198&apikey=466ebfd1
        document.getElementById("btn").addEventListener("click", peticionAjaxModerna);
        document.getElementById("buscarMas").addEventListener("click", cargarPaginas);
    };
    function peticionAjaxModerna()
    {
        mostrarPelis();
        peliABuscar= document.getElementById("BuscarPelicula").value;
        fetch("https://www.omdbapi.com/?apikey=466ebfd1&s="+peliABuscar,{method: "GET"})//Esto es una promesa
            .then((res) => res.json()) //Da el contenido del archivo
            .then((datosRecibidos) =>  //Esto da los datos
            {
                document.getElementById("numeroResultados").innerHTML="Se han encontrado "+datosRecibidos.totalResults+"peliculas";
                let miLista = document.getElementById("lista");
                miLista.innerHTML="";
                
                console.log(datosRecibidos);
                for(pelicula of datosRecibidos.Search){
                    let li = document.createElement("li");
                    li.innerHTML=pelicula.Title;
                    miLista.appendChild(li);
                    let img=document.createElement("img");
                    img.src=pelicula.Poster;
                    img.idPelicula= pelicula.imdbID;
                    li.appendChild(img);
                    li.addEventListener("click",detalle);
                }
            })
        .catch((err) => console.log("error".err));
    }

    function cargarPaginas(){
        peliABuscar= document.getElementById("BuscarPelicula").value;
        fetch("https://www.omdbapi.com/?apikey=466ebfd1&s="+peliABuscar+"&page=2",{method: "GET"})//Esto es una promesa
            .then((res) => res.json()) //Da el contenido del archivo
            .then((datosRecibidos) =>  //Esto da los datos
            {
                paginaABuscar++;
                document.getElementById("numeroResultados").innerHTML="Se han encontrado "+datosRecibidos.totalResults+"peliculas";
                let miLista = document.getElementById("lista");
                console.log(datosRecibidos);
                for(pelicula of datosRecibidos.Search){
                    let li = document.createElement("li");
                    li.innerHTML=pelicula.Title;
                    miLista.appendChild(li);
                    let img=document.createElement("img");
                    img.src=pelicula.Poster;
                    img.idPelicula= pelicula.imdbID;
                    img.addEventListener("click",detalle);
                    li.appendChild(img);
                }
            })
        .catch((err) => console.log("error".err));
    }


    function infoPeli(){
        peliABuscar= document.getElementById("BuscarPelicula").value;
        fetch("https://www.omdbapi.com/?apikey=466ebfd1&i="+peliABuscar+"&page=2",{method: "GET"})
            .then((res) => res.json()) 
            .then((datosRecibidos) => 
            {
                console.log(datosRecibidos);
                for(pelicula of datosRecibidos.Search){
                    let li = document.createElement("li");
                    li.innerHTML=pelicula.Title;
                    miLista.appendChild(li);
                    let img=document.createElement("img");
                    img.src=pelicula.Poster;
                    img.idPelicula= pelicula.imdbID;
                    img.addEventListener("click",detalle);
                    li.appendChild(img);
                }
            })
        .catch((err) => console.log("error".err));
    }

    function detalle(e){
        mostrarDetalle();
          console.log(e.target.idPelicula);  
        url="https://www.omdbapi.com/?apikey=466ebfd1&i="+e.target.idPelicula;
        fetch(url,{method:"GET"})
        .then((res)=>res.json())
        .then((datosRecibidos) => {
            document.getElementById("detalle").innerHTML = datosRecibidos.Plot;
        })
        .catch((err) => console.log("error".err));
    }

    function mostrarPelis(){
        document.getElementById("Inicio").style.display="none";
        document.getElementById("Busqueda").style.display="flex";
        document.getElementById("detalle").style.display="none";
    }

    function mostrarDetalle(){
        document.getElementById("Inicio").style.display="none";
        document.getElementById("Busqueda").style.display="none";
        document.getElementById("detalle").style.display="flex";
    }

    function mostrarInicio(){
        document.getElementById("Inicio").style.display="flex";
        document.getElementById("Busqueda").style.display="none";
        document.getElementById("detalle").style.display="none";
    }
    
const btnReaccion = document.getElementById('reaccion');
const contenedorListaMusic = document.getElementById('lista-music');
const controles = document.getElementById('controles');

const menuMusic = document.getElementById('menuMusic');
const titlePlaylist = document.getElementById('titlePlaylist');
const playDescription = document.getElementById('playDescription');
const imgAlbum = document.getElementById('imgAlbum');
const album = document.getElementById('album');

//Eventos
btnReaccion.addEventListener('click', likear);
menuMusic.addEventListener('click', cargarInfo);
contenedorListaMusic.addEventListener('click', reproducirMusica);
controles.addEventListener('click', controlar)
    //Funciones
let estado = 0;

function likear() {
    if (estado === 0) {
        btnReaccion.classList.add('reaccion-activa');
        estado = 1;
    } else if (estado === 1) {
        btnReaccion.classList.remove('reaccion-activa');
        estado = 0;
    }
}


function cargarInfo(e) {
    let jsonurl = '';
    let titlePlay = '';
    let descripcionPlay = '';
    let srcImg = '';

    if (e.target.classList.contains('playEstudiar')) {
        jsonurl = '/reproductor/assets/musicJSON/urbano.json';
        titlePlay = 'Artistas Urbanos';
        descripcionPlay = 'La Mejor Musica Urbana, Solo en Artist Info!!';
        srcImg = '/reproductor/assets/img/Copia-de-8343-1-.webp';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(/reproductor/assets/img/urbanos-e1674590560254.png)";
    } else if (e.target.classList.contains('playRock')) {
        jsonurl = '/reproductor/assets/musicJSON/cumbia.json';
        titlePlay = 'Cumbia';
        descripcionPlay = 'La mejor Cumbia Para Celebrar Y Pasarla Bien ';
        srcImg = '/reproductor/assets/img/635.webp';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(/reproductor/assets/img/f.elconfidencial.com_original_d87_15d_d95_d8715dd951ad260d870cc6400e70f314.jpg)";
    } else if (e.target.classList.contains('playDeporte')) {
        jsonurl = '/reproductor/assets/musicJSON/clasico.json';
        titlePlay = 'Musica Clasica';
        descripcionPlay = 'La mejor musica clasica aqui';
        srcImg = '/reproductor//assets/img/elvis.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(/reproductor/assets/img/clasicos.webp)";
    }
    else if (e.target.classList.contains('playKpop')) {
        jsonurl = '/reproductor/assets/musicJSON/kpop.json';
        titlePlay = 'K-POP';
        descripcionPlay = 'Lo mejor de K-pop';
        srcImg = '/reproductor/assets/img/kpop.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(/reproductor/assets/img/bts.jpg)";
    }
    titlePlaylist.innerHTML = titlePlay;
    playDescription.innerHTML = descripcionPlay;
    imgAlbum.src = srcImg;
    cargarMusica(jsonurl);
}

function cargarMusica(url) {
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            let html = '';
            data.forEach(music => {
                html += `
                <li class="music">
                    <input type="text" value="${music.url}" style="display: none;">
                    <a href="#" id="${music.id}" class="btn play-music"><i class="far fa-play-circle"></i></a>
                    <h3>${music.artista}</h3> 
                    <h3 class="name" id="name">${music.nombre}</h3> 
                    <h3 class="time">--</h3>
                </li>
                `
                contenedorListaMusic.innerHTML = html;
            });
        });
}

function reproducirMusica(e) {
    if (e.target.parentElement.classList.contains('play-music')) {
        let urlM = e.target.parentElement.previousElementSibling.value;
        controles.innerHTML = `<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
        <audio src="${urlM}" style="width: 50vw;" controls autoplay><input type="text" value="${urlM}" style="display: none;"></audio>
        <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;

        e.target.parentElement.classList.add('reaccion-activa-reproducida');
        siguienteAutomatico();
    }
}

function controlar(e) {
    let audio = e.target.parentElement.parentElement.children[1].children[0];
    let audioUrl = audio.value;

    let musicArray = Array.from(contenedorListaMusic.children);

    if (e.target.parentElement.classList.contains('siguiente')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) {
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras(siguienteMusica, elementoParaReproducido)
            }
        });
    }
    if (e.target.parentElement.classList.contains('atras')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) {
                let musicaAtras = limusic.previousElementSibling.children[0].value;

                let elementoParaReproducido = limusic.previousElementSibling.children[1];
                siguienteAtras(musicaAtras, elementoParaReproducido)
            }
        });
    }
}

function siguienteAtras(musica, reproducida) {
    controles.innerHTML = `<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
    <audio src="${musica}" style="width: 50vw;" controls autoplay><input type="text" value="${musica}" style="display: none;"></audio>
    <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;
    reproducida.classList.add('reaccion-activa-reproducida');

    siguienteAutomatico();
}

function siguienteAutomatico() {
    let audioEtiqueta = controles.children[1];
    audioEtiqueta.addEventListener('ended', () => {
        let audioUrl = audioEtiqueta.children[0].value;
        let musicArray = Array.from(contenedorListaMusic.children);
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) {
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras(siguienteMusica, elementoParaReproducido)
            }
        });
    })
}



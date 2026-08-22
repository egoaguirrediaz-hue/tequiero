/* =========================================
   ELEMENTOS
========================================= */

const inicio =
    document.getElementById("inicio");

const sorpresa =
    document.getElementById("sorpresa");

const album =
    document.getElementById("album");

const final =
    document.getElementById("final");


const btnComenzar =
    document.getElementById("btnComenzar");

const btnSorpresa =
    document.getElementById("btnSorpresa");

const btnAnterior =
    document.getElementById("btnAnterior");

const btnSiguiente =
    document.getElementById("btnSiguiente");

const btnContinuar =
    document.getElementById("btnContinuar");


const mensajeSorpresa =
    document.getElementById("mensajeSorpresa");

const fotoAlbum =
    document.getElementById("fotoAlbum");

const fraseAlbum =
    document.getElementById("fraseAlbum");

const contadorFoto =
    document.getElementById("contadorFoto");


/* =========================================
   CAMBIAR PANTALLA
========================================= */

function cambiarPantalla(
    actual,
    siguiente
) {

    actual.classList.remove(
        "activa"
    );

    setTimeout(() => {

        siguiente.classList.add(
            "activa"
        );

    }, 300);
}


/* =========================================
   CORAZONES
========================================= */

function crearCorazon() {

    const corazon =
        document.createElement("div");

    corazon.classList.add(
        "corazon"
    );


    const corazones = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘"
    ];


    corazon.innerHTML =
        corazones[
            Math.floor(
                Math.random() *
                corazones.length
            )
        ];


    corazon.style.left =
        Math.random() * 100 + "%";


    corazon.style.fontSize =
        (15 +
        Math.random() * 20)
        + "px";


    corazon.style.animationDuration =
        (5 +
        Math.random() * 5)
        + "s";


    const contenedor =
        document.querySelector(
            ".corazones"
        );


    if (contenedor) {

        contenedor.appendChild(
            corazon
        );
    }


    setTimeout(() => {

        corazon.remove();

    }, 10000);
}


setInterval(
    crearCorazon,
    700
);


/* =========================================
   INICIO
========================================= */

btnComenzar.addEventListener(
    "click",
    () => {

        cambiarPantalla(
            inicio,
            sorpresa
        );

    }
);


/* =========================================
   MENSAJES
========================================= */

const mensajes = [

    "No tienes que estar bien todo el tiempo. ❤️",

    "También tienes derecho a tener días difíciles.",

    "No tienes que poder con todo tú sola.",

    "Si hoy necesitas descansar, descansa.",

    "Si necesitas hablar, aquí estoy.",

    "Y si simplemente necesitas un abrazo... también. 🥰",

    "Porque me importas muchísimo.",

    "Y quiero estar para ti, en los días buenos y en los no tan buenos. ❤️"

];


let mensajeActual = 0;


btnSorpresa.addEventListener(
    "click",
    () => {

        mensajeActual++;


        if (
            mensajeActual <
            mensajes.length
        ) {

            mensajeSorpresa.style.opacity =
                "0";


            setTimeout(() => {

                mensajeSorpresa.textContent =
                    mensajes[
                        mensajeActual
                    ];

                mensajeSorpresa.style.opacity =
                    "1";

            }, 300);


        } else {

            cambiarPantalla(
                sorpresa,
                album
            );

        }

    }
);


/* =========================================
   FOTOS
========================================= */

const fotos = [

    {
        src:
            "assets/foto1.jpg",

        texto:
            "Cuando estés feliz, quiero estar ahí para celebrar contigo. ❤️"
    },


    {
        src:
            "assets/foto2.jpg",

        texto:
            "Cuando tengas un día difícil, quiero que recuerdes que no estás sola. 🥰"
    },


    {
        src:
            "assets/foto3.jpg",

        texto:
            "Y cuando sientas que todo pesa demasiado, puedes apoyarte en mí. Siempre. 💕"
    }

];


let fotoActual = 0;


/* =========================================
   MOSTRAR FOTO
========================================= */

function mostrarFoto(indice) {

    fotoAlbum.classList.add(
        "foto-cambiando"
    );

    fraseAlbum.style.opacity =
        "0";


    setTimeout(() => {

        fotoAlbum.src =
            fotos[indice].src;

        fraseAlbum.textContent =
            fotos[indice].texto;

        contadorFoto.textContent =
            `${indice + 1} / ${fotos.length}`;


        fotoAlbum.classList.remove(
            "foto-cambiando"
        );

        fraseAlbum.style.opacity =
            "1";

    }, 300);
}


/* =========================================
   ANTERIOR
========================================= */

btnAnterior.addEventListener(
    "click",
    () => {

        fotoActual--;


        if (
            fotoActual < 0
        ) {

            fotoActual =
                fotos.length - 1;
        }


        mostrarFoto(
            fotoActual
        );

    }
);


/* =========================================
   SIGUIENTE
========================================= */

btnSiguiente.addEventListener(
    "click",
    () => {

        fotoActual++;


        if (
            fotoActual >=
            fotos.length
        ) {

            fotoActual = 0;
        }


        mostrarFoto(
            fotoActual
        );

    }
);


/* =========================================
   CARTA FINAL
========================================= */

btnContinuar.addEventListener(
    "click",
    () => {

        cambiarPantalla(
            album,
            final
        );


        for (
            let i = 0;
            i < 35;
            i++
        ) {

            setTimeout(
                crearCorazon,
                i * 100
            );

        }

    }
);

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

const numeroMensaje =
    document.getElementById("numeroMensaje");

const totalMensajes =
    document.getElementById("totalMensajes");


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
        "💘",
        "💞"

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
        (
            15 +
            Math.random() * 20
        ) + "px";


    corazon.style.animationDuration =
        (
            5 +
            Math.random() * 5
        ) + "s";


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


/* =========================================
   CORAZONES AUTOMÁTICOS
========================================= */

setInterval(
    crearCorazon,
    800
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

    "Descansa, mi amor. Yo estoy aquí. ❤️",

    "No tienes que sentir que tienes que estar bien todo el tiempo. Ahora lo importante eres tú y que puedas recuperarte tranquilita.",

    "Si necesitas hablar, aquí estoy para escucharte. No importa la hora ni el tema.",

    "Si necesitas distraerte, también estoy. Puedo hacer mi trabajo de payaso un ratito para intentar sacarte una sonrisa. 😂❤️",

    "Si necesitas cariño, quiero darte todo el que pueda, aunque sea a la distancia.",

    "Ojalá pudiera estar ahí para abrazarte, consentirte y decirte personalmente que todo poquito a poquito va a estar mejor.",

    "No puedo quitarte lo que estás sintiendo, pero sí puedo acompañarte mientras pasa.",

    "No tienes que pasar estos días sintiendo que estás sola. Tienes a alguien que te quiere muchísimo y que está pendiente de ti.",

    "Quiero estar contigo no solamente cuando todo está bonito, sino también cuando necesitas un poquito más de paciencia, cariño y compañía.",

    "Así que por ahora tú concéntrate en descansar y recuperarte. Yo voy a estar aquí para ti. ❤️"

];


let mensajeActual = 0;


totalMensajes.textContent =
    mensajes.length;


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


                numeroMensaje.textContent =
                    mensajeActual + 1;


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
            "Quiero volver a verte así de sonriente muy pronto. 🥰❤️"

    },


    {

        src:
            "assets/foto2.jpg",

        texto:
            "Este es uno de esos momentos que me recuerda lo bonito que es tenerte en mi vida. ❤️"

    },


    {

        src:
            "assets/foto3.jpg",

        texto:
            "Y mientras te recuperas, quiero que recuerdes que aquí tienes a alguien que te quiere muchísimo. 💕"

    }

];


let fotoActual = 0;


/* =========================================
   MOSTRAR FOTO
========================================= */

function mostrarFoto(
    indice
) {

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
   FOTO ANTERIOR
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
   FOTO SIGUIENTE
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
   FINAL
========================================= */

btnContinuar.addEventListener(
    "click",
    () => {

        cambiarPantalla(
            album,
            final
        );


        /* Lluvia de corazones */

        for (
            let i = 0;
            i < 45;
            i++
        ) {

            setTimeout(
                crearCorazon,
                i * 100
            );

        }

    }
);


/* =========================================
   MENSAJE DE CONSOLA
========================================= */

console.log(
    "❤️ Hecho especialmente para ella."
);
const scenes = {
    intro: document.getElementById("scene-intro"),
    mirror: document.getElementById("scene-mirror"),
    observation: document.getElementById("scene-observation"),
    truth: document.getElementById("scene-truth"),
    final: document.getElementById("scene-final")
};

const startButton =
    document.getElementById("startButton");

const truthButton =
    document.getElementById("truthButton");

const music =
    document.getElementById("music");

const girlImage =
    document.getElementById("girlImage");

const mirrorCaption =
    document.getElementById("mirrorCaption");

const observationText =
    document.getElementById("observationText");

const observationNumber =
    document.getElementById("observationNumber");

const truthText =
    document.getElementById("truthText");

const finalText =
    document.getElementById("finalText");


/* =========================================
   CONFIGURACIÓN
========================================= */

const CONFIG = {

    musicVolume: 0.16,

    typingSpeed: 42,

    observationDelay: 2800,

    transitionDelay: 1200

};


/* =========================================
   CAMBIAR ESCENA
========================================= */

function goTo(scene) {

    Object.values(scenes).forEach(item => {

        item.classList.remove("active");

    });

    scenes[scene].classList.add("active");

}


/* =========================================
   ESPERAR
========================================= */

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* =========================================
   ESCRIBIR
========================================= */

async function typeText(
    element,
    text,
    speed = CONFIG.typingSpeed
) {

    element.textContent = "";

    for (const character of text) {

        element.textContent += character;

        await wait(speed);

    }

}


/* =========================================
   FADE DE MÚSICA
========================================= */

function fadeMusic(
    targetVolume,
    duration = 2000
) {

    const startVolume = music.volume;

    const steps = 40;

    const stepTime = duration / steps;

    const difference =
        targetVolume - startVolume;

    let step = 0;

    const interval = setInterval(() => {

        step++;

        music.volume =
            startVolume +
            difference * (step / steps);

        if (step >= steps) {

            clearInterval(interval);

        }

    }, stepTime);

}


/* =========================================
   INICIO
========================================= */

startButton.addEventListener(
    "click",
    async () => {

        /*
         * El navegador permite iniciar
         * audio después de una interacción.
         */

        music.volume = 0;

        music.play().catch(() => {});

        fadeMusic(
            CONFIG.musicVolume,
            3000
        );


        /*
         * Entramos al espejo.
         */

        goTo("mirror");

        await wait(1300);


        /*
         * Primer mensaje.
         */

        mirrorCaption.textContent =
            "Enfocando...";

        mirrorCaption.classList.add("visible");

        await wait(1800);


        /*
         * Aparece la fotografía.
         */

        girlImage.classList.add("visible");

        await wait(3500);


        /*
         * Segundo mensaje.
         */

        mirrorCaption.textContent =
            "Ahora mira.";

        await wait(2500);


        /*
         * Pasamos a las observaciones.
         */

        goTo("observation");

        await wait(1000);

        await showObservations();


        /*
         * Pasamos a la verdad.
         */

        goTo("truth");

        await wait(900);

        await showTruth();

    }
);


/* =========================================
   OBSERVACIONES
========================================= */

async function showObservations() {

    const observations = [

        {
            number: "01",
            text: "Yo veo a alguien fuerte."
        },

        {
            number: "02",
            text: "Veo a alguien que cuida muchísimo a quienes ama."
        },

        {
            number: "03",
            text: "Veo una mujer que sigue adelante incluso cuando está cansada."
        },

        {
            number: "04",
            text: "Veo esa sonrisa que probablemente no sabes cuánto me gusta."
        },

        {
            number: "05",
            text: "Y veo a alguien que consiguió convertirse en una parte muy importante de mi vida."
        }

    ];


    for (
        let i = 0;
        i < observations.length;
        i++
    ) {

        observationNumber.textContent =
            observations[i].number;

        await typeText(
            observationText,
            observations[i].text
        );

        await wait(
            CONFIG.observationDelay
        );

    }

}


/* =========================================
   VERDAD
========================================= */

async function showTruth() {

    await typeText(
        truthText,
        "Pero hay algo que este espejo nunca podrá mostrarte."
    );

    await wait(3000);


    truthText.textContent = "";

    await typeText(
        truthText,
        "Porque puedes mirarte todos los días..."
    );

    await wait(2200);


    truthText.textContent = "";

    await typeText(
        truthText,
        "pero nunca vas a poder verte como te veo yo."
    );

    await wait(3000);


    truthButton.classList.remove("hidden");

    truthButton.style.opacity = "1";

    truthButton.style.pointerEvents = "auto";

}


/* =========================================
   FINAL
========================================= */

truthButton.addEventListener(
    "click",
    async () => {

        truthButton.style.opacity = "0";

        truthButton.style.pointerEvents =
            "none";


        goTo("final");

        await wait(1800);


        const finalMessage =
`No veo solamente tu cara.

Veo todo lo que eres.

Y cuando te miro...

también veo la suerte que tuve de encontrarte.

Así te veo yo.

Mi Amor ❤️

— Chris`;


        await typeText(
            finalText,
            finalMessage,
            55
        );

    }
);
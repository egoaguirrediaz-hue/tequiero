/* ==========================================================
   BLOQUE 1 — INTRO EXPERIENCE
========================================================== */

const intro = document.getElementById("intro");
const universe = document.getElementById("universe");

const enterButton = document.getElementById("enterButton");

const music = document.getElementById("backgroundMusic");

const starsContainer = document.getElementById("stars");


/* ==========================================================
   CREAR ESTRELLAS
========================================================== */

function createStars() {

    const amount = window.innerWidth < 600
        ? 110
        : 180;

    for (let i = 0; i < amount; i++) {

        const star = document.createElement("span");

        star.classList.add("star");

        const size = Math.random() < 0.9
            ? Math.random() * 1.5 + 1
            : Math.random() * 2.5 + 1;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        const delay =
            Math.random() * 4;

        const duration =
            Math.random() * 4 + 3;

        star.style.animationDelay =
            `${delay}s`;

        star.style.animationDuration =
            `${duration}s`;

        starsContainer.appendChild(star);
    }
}

createStars();


/* ==========================================================
   ENTRAR AL UNIVERSO
========================================================== */

enterButton.addEventListener(
    "click",
    async () => {

        /*
         * El navegador permite iniciar música
         * porque hubo una interacción real del usuario.
         */

        try {

            music.volume = 0;

            await music.play();

            fadeMusicIn();

        } catch (error) {

            console.log(
                "La música necesita interacción adicional."
            );

        }


        /*
         * Comienza la transición.
         */

        intro.classList.add("exit");

        setTimeout(() => {

            universe.classList.add("show");

        }, 700);

    }
);


/* ==========================================================
   FADE IN DE MÚSICA
========================================================== */

function fadeMusicIn() {

    let volume = 0;

    const targetVolume = 0.38;

    const interval = setInterval(() => {

        volume += 0.015;

        if (volume >= targetVolume) {

            volume = targetVolume;

            clearInterval(interval);

        }

        music.volume = volume;

    }, 80);

}


/* ==========================================================
   PREVENIR DOBLE TOQUE
========================================================== */

let entered = false;

enterButton.addEventListener(
    "click",
    () => {

        if (entered) return;

        entered = true;

        enterButton.style.pointerEvents =
            "none";

    },
    {
        once: true
    }
);


/* ==========================================================
   PEQUEÑO EFECTO PARALLAX
   Solo en dispositivos con mouse.
========================================================== */

if (window.matchMedia("(pointer:fine)").matches) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5);

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5);

            const nebulaOne =
                document.querySelector(
                    ".nebula-one"
                );

            const nebulaTwo =
                document.querySelector(
                    ".nebula-two"
                );

            nebulaOne.style.transform =
                `
                translate(
                    ${x * 20}px,
                    ${y * 20}px
                )
                rotate(20deg)
                `;

            nebulaTwo.style.transform =
                `
                translate(
                    ${x * -15}px,
                    ${y * -15}px
                )
                rotate(-20deg)
                `;

        }
    );

}
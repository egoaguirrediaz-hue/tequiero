/* ==========================================================
   ELEMENTOS
========================================================== */

const intro = document.getElementById("intro");

const universe = document.getElementById("universe");

const enterButton =
    document.getElementById("enterButton");

const music =
    document.getElementById("backgroundMusic");

const starsContainer =
    document.getElementById("stars");

const universeStars =
    document.getElementById("universeStars");

const explorePanel =
    document.getElementById("explorePanel");

const closePanel =
    document.getElementById("closePanel");

const panelTitle =
    document.getElementById("panelTitle");

const panelEyebrow =
    document.getElementById("panelEyebrow");

const panelText =
    document.getElementById("panelText");

const panelContinue =
    document.getElementById("panelContinue");

const warp =
    document.getElementById("warp");


/* ==========================================================
   CONTENIDO TEMPORAL
   Luego lo reemplazaremos por historias reales.
========================================================== */

const sections = {

    nosotros: {

        eyebrow:
            "el centro de todo",

        title:
            "Nosotros",

        text:
            "Tú y yo. Dos personas que se encontraron y que, poquito a poquito, fueron creando algo bonito sin darse cuenta. Una historia hecha de pequeños momentos, sonrisas, cariño y recuerdos que hoy significan muchísimo para mí. Y lo más bonito es saber que todavía nos quedan muchos momentos por vivir juntos. 💛"

    },

    tu: {

        eyebrow:
            "una parte de mi universo",

        title:
            "Tú",

        text:
            "Hay personas que llegan a tu vida sin que las estés buscando… y luego estás tú, que llegaste y, sin darme cuenta, empezaste a convertirte en una de las partes más bonitas de la mía."

    },

    provocas: {

        eyebrow:
            "hay algo que haces",

        title:
            "Lo que provocas",

        text:
            "A veces basta con ver tu nombre aparecer en mi teléfono para que, sin siquiera decir una palabra, mi día se vuelva un poquito más bonito."

    },

    mundo: {

        eyebrow:
            "nuestro pequeño mundo",

        title:
            "Nuestro mundo",

        text:
            "Hay pequeñas cosas que quizás para los demás no significan nada, pero que para nosotros lo significan todo. Miradas, palabras, momentos, bromas y recuerdos que solo nosotros sabemos entender. Y algún día, cada una de esas pequeñas cosas tendrá su propio lugar en nuestra historia. 💛"

    },

    futuro: {

        eyebrow:
            "todavía falta escribirlo",

        title:
            "Lo que falta vivir",

        text:
            "Viajes, noches, domingos, aventuras y momentos que todavía no existen... pero que algún día podrían ser nuestros."

    }

};


/* ==========================================================
   ESTRELLAS DEL UNIVERSO
========================================================== */

function createUniverseStars() {

    const amount =
        window.innerWidth < 600
            ? 150
            : 260;

    universeStars.innerHTML = "";

    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("span");

        star.className = "u-star";

        const size =
            Math.random() * 2 + .5;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.setProperty(
            "--duration",
            `${Math.random() * 4 + 3}s`
        );

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        universeStars.appendChild(star);

    }

}


/* ==========================================================
   ESTRELLAS INTRO
========================================================== */

function createIntroStars() {

    const amount =
        window.innerWidth < 600
            ? 100
            : 180;

    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("span");

        star.classList.add("star");

        const size =
            Math.random() < .9
                ? Math.random() * 1.5 + 1
                : Math.random() * 2.5 + 1;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.animationDelay =
            `${Math.random() * 4}s`;

        starsContainer.appendChild(star);

    }

}

createIntroStars();

createUniverseStars();


/* ==========================================================
   ENTRAR
========================================================== */

let entered = false;

enterButton.addEventListener(
    "click",
    async () => {

        if (entered) return;

        entered = true;

        enterButton.style.pointerEvents =
            "none";


        /* música */

        try {

            music.volume = 0;

            await music.play();

            fadeMusicIn();

        } catch (error) {

            console.log(
                "La reproducción fue bloqueada."
            );

        }


        /* transición */

        warp.classList.add("active");

        setTimeout(() => {

            intro.classList.add("exit");

        }, 300);

        setTimeout(() => {

            universe.classList.add("show");

        }, 700);

        setTimeout(() => {

            warp.classList.remove("active");

        }, 1500);

    }
);


/* ==========================================================
   MÚSICA
========================================================== */

function fadeMusicIn() {

    let volume = 0;

    const target =
        .38;

    const interval =
        setInterval(() => {

            volume += .015;

            if (volume >= target) {

                volume = target;

                clearInterval(interval);

            }

            music.volume =
                volume;

        }, 80);

}


/* ==========================================================
   ABRIR SECCIÓN
========================================================== */

document
    .querySelectorAll(".planet, .core")
    .forEach(element => {

        element.addEventListener(
            "click",
            () => {

                const section =
                    element.dataset.section;

                openSection(section);

            }
        );

    });


/* ==========================================================
   OPEN SECTION
========================================================== */

function openSection(sectionName) {

    const data =
        sections[sectionName];

    if (!data) return;


    panelEyebrow.textContent =
        data.eyebrow;

    panelTitle.textContent =
        data.title;

    panelText.textContent =
        data.text;


    explorePanel.classList.add(
        "active"
    );

}


/* ==========================================================
   CERRAR PANEL
========================================================== */

closePanel.addEventListener(
    "click",
    closeSection
);

panelContinue.addEventListener(
    "click",
    closeSection
);

function closeSection() {

    explorePanel.classList.remove(
        "active"
    );

}


/* ==========================================================
   PARALLAX DEL UNIVERSO
========================================================== */

if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    .5);

            const y =
                (event.clientY /
                    window.innerHeight -
                    .5);


            const stars =
                document.querySelector(
                    ".universe-stars"
                );

            const nebulaPurple =
                document.querySelector(
                    ".nebula-purple"
                );

            const nebulaPink =
                document.querySelector(
                    ".nebula-pink"
                );


            if (!universe.classList.contains("show")) {
                return;
            }


            stars.style.transform =
                `
                translate(
                    ${x * 12}px,
                    ${y * 12}px
                )
                `;


            nebulaPurple.style.transform =
                `
                translate(
                    ${x * 25}px,
                    ${y * 25}px
                )
                `;


            nebulaPink.style.transform =
                `
                translate(
                    ${x * -20}px,
                    ${y * -20}px
                )
                `;

        }
    );

}


/* ==========================================================
   MOVIMIENTO DEL TELÉFONO
========================================================== */

if (
    window.DeviceOrientationEvent
) {

    window.addEventListener(
        "deviceorientation",
        event => {

            if (
                !universe.classList.contains(
                    "show"
                )
            ) {
                return;
            }

            const x =
                Math.max(
                    -20,
                    Math.min(
                        20,
                        event.gamma || 0
                    )
                );

            const y =
                Math.max(
                    -20,
                    Math.min(
                        20,
                        event.beta || 0
                    )
                );


            universeStars.style.transform =
                `
                translate(
                    ${x * .4}px,
                    ${y * .2}px
                )
                `;

        }
    );

}


/* ==========================================================
   SWIPE HACIA ABAJO = CERRAR
========================================================== */

let touchStartY = 0;

universe.addEventListener(
    "touchstart",
    event => {

        touchStartY =
            event.touches[0].clientY;

    },
    {
        passive: true
    }
);

universe.addEventListener(
    "touchend",
    event => {

        const touchEndY =
            event.changedTouches[0].clientY;

        const difference =
            touchEndY - touchStartY;


        if (
            difference > 100 &&
            explorePanel.classList.contains(
                "active"
            )
        ) {

            closeSection();

        }

    },
    {
        passive: true
    }
);


/* ==========================================================
   REGENERAR ESTRELLAS AL CAMBIAR TAMAÑO
========================================================== */

let resizeTimeout;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimeout);

        resizeTimeout =
            setTimeout(() => {

                createUniverseStars();

            }, 300);

    }
);
/* =====================================================
   PARA TI, CUALQUIER DÍA
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    createStars();

    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", startExperience);

    setupStars();

    setupNavigation();

    setupLoveReveal();

    setupNeeds();

    setupFinal();

});


/* =====================================================
   UTILIDADES
   ===================================================== */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* =====================================================
   ESTRELLAS DEL FONDO
   ===================================================== */

function createStars() {

    const container = document.getElementById("stars");

    for (let i = 0; i < 150; i++) {

        const star = document.createElement("span");

        star.className = "star";

        const size = Math.random() * 2.8 + 1;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${3 + Math.random() * 5}s`;

        container.appendChild(star);
    }
}


/* =====================================================
   INICIO
   ===================================================== */

async function startExperience() {

    const music = document.getElementById("music");

    music.volume = 0.22;

    try {
        await music.play();
    } catch (error) {
        console.log("El navegador requiere interacción para reproducir audio.");
    }

    const welcome = document.getElementById("welcome");

    welcome.style.opacity = "0";
    welcome.style.transform = "scale(1.03)";

    await wait(1300);

    welcome.classList.add("hidden");

    playIntro();

}


/* =====================================================
   INTRO
   ===================================================== */

async function playIntro() {

    const intro = document.getElementById("intro");
    const text = document.getElementById("introText");

    const messages = [

        "No es nuestro aniversario.",

        "No es una fecha importante.",

        "No es una ocasión especial.",

        "Es simplemente hoy.",

        "Y hoy pensé en ti."

    ];

    intro.classList.remove("hidden");

    intro.style.opacity = "1";

    for (const message of messages) {

        text.style.opacity = "0";

        await wait(650);

        text.textContent = message;

        text.style.opacity = "1";

        await wait(2300);

    }

    intro.style.opacity = "0";

    await wait(1300);

    intro.classList.add("hidden");

    const experience = document.getElementById("experience");

    experience.classList.remove("hidden");

    await wait(100);

    experience.classList.add("visible");

    document.getElementById("sky-section")
        .scrollIntoView({
            behavior: "instant"
        });

}


/* =====================================================
   ESTRELLAS INTERACTIVAS
   ===================================================== */

function setupStars() {

    const stars = document.querySelectorAll(".star-message");
    const message = document.getElementById("starMessage");

    stars.forEach(star => {

        star.addEventListener("click", () => {

            message.classList.remove("show");

            setTimeout(() => {

                message.textContent = star.dataset.message;

                message.classList.add("show");

            }, 150);

            createSmallStars(star);

        });

    });

}


function createSmallStars(element) {

    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {

        const particle = document.createElement("span");

        particle.style.position = "fixed";
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;
        particle.style.width = "3px";
        particle.style.height = "3px";
        particle.style.borderRadius = "50%";
        particle.style.background = "#ffffff";
        particle.style.boxShadow = "0 0 8px white";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "20";

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;

        particle.animate(
            [
                {
                    transform: "translate(0,0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${Math.cos(angle) * distance}px,
                                   ${Math.sin(angle) * distance}px)`,
                    opacity: 0
                }
            ],
            {
                duration: 700,
                easing: "ease-out"
            }
        ).onfinish = () => particle.remove();

    }

}


/* =====================================================
   NAVEGACIÓN
   ===================================================== */

function setupNavigation() {

    document.querySelectorAll("[data-next]").forEach(button => {

        button.addEventListener("click", () => {

            const targetId = button.dataset.next;

            scrollToSection(targetId);

        });

    });

}


function scrollToSection(id) {

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   OBSERVER PARA ANIMACIONES
   ===================================================== */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            if (entry.target.id === "care-section") {

                revealCare();

            }

            if (entry.target.id === "final-section") {

                revealFinal();

            }

        });

    },

    {
        threshold: 0.35
    }

);

document.addEventListener("DOMContentLoaded", () => {

    const care = document.getElementById("care-section");
    const final = document.getElementById("final-section");

    if (care) observer.observe(care);
    if (final) observer.observe(final);

});


/* =====================================================
   SECCIÓN DE CUIDADO
   ===================================================== */

async function revealCare() {

    if (document.getElementById("care-section").dataset.revealed) {
        return;
    }

    document.getElementById("care-section").dataset.revealed = "true";

    const lines = document.querySelectorAll(".typing-line");

    for (const line of lines) {

        line.classList.add("show");

        await wait(700);

    }

}


/* =====================================================
   "PUEDO VIVIR SIN TI"
   ===================================================== */

function setupLoveReveal() {

    const button = document.getElementById("revealButton");

    const answer = document.getElementById("loveAnswer");

    const continueButton = document.getElementById("partContinue");

    button.addEventListener("click", async () => {

        button.style.opacity = "0";
        button.style.pointerEvents = "none";

        await wait(500);

        answer.classList.remove("hidden");

        await wait(2300);

        continueButton.classList.remove("hidden");

        continueButton.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

    continueButton.addEventListener("click", () => {

        scrollToSection("needs-section");

    });

}


/* =====================================================
   ¿QUÉ NECESITAS HOY?
   ===================================================== */

function setupNeeds() {

    const cards = document.querySelectorAll(".need-card");

    const response = document.getElementById("needResponse");

    const continueButton = document.getElementById("needsContinue");

    const responses = {

        hug:
            "Entonces ven... aunque sea desde aquí, te mando uno de esos abrazos que no necesitan palabras. 🤍",

        rest:
            "Entonces descansa, mi amor. No tienes que poder con todo todos los días. Hoy también puedes simplemente respirar.",

        talk:
            "Entonces háblame. De lo que sea. De lo importante, de lo absurdo o simplemente de cómo estuvo tu día. Yo te escucho.",

        love:
            "Entonces recuerda esto: eres importante para mí. Muchísimo. Y me haces más feliz de lo que imaginas."

    };

    cards.forEach(card => {

        card.addEventListener("click", () => {

            cards.forEach(c => c.classList.remove("selected"));

            card.classList.add("selected");

            response.classList.remove("show");

            setTimeout(() => {

                response.textContent = responses[card.dataset.need];

                response.classList.add("show");

            }, 200);

            continueButton.classList.remove("hidden");

        });

    });

    continueButton.addEventListener("click", () => {

        scrollToSection("letter-section");

    });

}


/* =====================================================
   FINAL ANIMADO
   ===================================================== */

async function revealFinal() {

    const section = document.getElementById("final-section");

    if (section.dataset.revealed) return;

    section.dataset.revealed = "true";

    const messages = document.querySelectorAll(".final-messages p");

    await wait(600);

    for (const message of messages) {

        message.classList.add("show");

        await wait(800);

    }

}


/* =====================================================
   ABRAZO
   ===================================================== */

function setupFinal() {

    const button = document.getElementById("finalButton");

    const hugButton = document.getElementById("hugButton");

    const hugMessage = document.getElementById("hugMessage");

    button.addEventListener("click", () => {

        scrollToSection("final-section");

    });

    hugButton.addEventListener("click", async () => {

        hugMessage.classList.remove("hidden");

        fadeVolume(0.08, 1800);

        createHugParticles();

        await wait(3500);

        fadeVolume(0.22, 1800);

    });

}


/* =====================================================
   PARTÍCULAS DEL ABRAZO
   ===================================================== */

function createHugParticles() {

    const section = document.getElementById("final-section");

    for (let i = 0; i < 18; i++) {

        const particle = document.createElement("span");

        particle.textContent = "✦";

        particle.style.position = "absolute";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${55 + Math.random() * 25}%`;
        particle.style.color = "rgba(232,223,189,.8)";
        particle.style.fontSize = `${8 + Math.random() * 12}px`;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "12";

        section.appendChild(particle);

        particle.animate(
            [
                {
                    transform: "translateY(0) scale(.5)",
                    opacity: 0
                },
                {
                    transform: "translateY(-120px) scale(1)",
                    opacity: 1
                },
                {
                    transform: "translateY(-230px) scale(.2)",
                    opacity: 0
                }
            ],
            {
                duration: 2500 + Math.random() * 1500,
                easing: "ease-out"
            }
        ).onfinish = () => particle.remove();

    }

}


/* =====================================================
   VOLUMEN
   ===================================================== */

function fadeVolume(target, duration) {

    const music = document.getElementById("music");

    if (!music) return;

    const start = music.volume;

    const difference = target - start;

    const steps = 50;

    const intervalTime = duration / steps;

    let step = 0;

    const interval = setInterval(() => {

        step++;

        music.volume =
            start + (difference * (step / steps));

        if (step >= steps) {

            music.volume = target;

            clearInterval(interval);

        }

    }, intervalTime);

}
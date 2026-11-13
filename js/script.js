// JavaScript Document

// =================================
// GENESIS MIRALDA - PORTAFOLIO
// Funciones de interacción
// =================================


// MENÚ PARA DISPOSITIVOS MÓVILES

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const menuAbierto = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", menuAbierto);

});


// CERRAR EL MENÚ AL SELECCIONAR UNA SECCIÓN

const enlacesMenu = document.querySelectorAll(".nav-links a");

enlacesMenu.forEach(function (enlace) {

    enlace.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// AÑO AUTOMÁTICO EN EL PIE DE PÁGINA

const piePagina = document.querySelector(".footer p");

if (piePagina) {
    piePagina.textContent =
        "Genesis Miralda · Portafolio " + new Date().getFullYear();
}

/* ==================================
   LIGHTBOX — AMPLIAR IMÁGENES Y VIDEOS
================================== */

document.addEventListener("DOMContentLoaded", function () {

    const lightbox = document.getElementById("lightbox");
    const lightboxContent = document.getElementById("lightbox-content");
    const closeButton = document.getElementById("lightbox-close");

    if (!lightbox || !lightboxContent || !closeButton) return;

    // Abrir ventana
    function openLightbox(element) {
        lightboxContent.innerHTML = "";
        lightboxContent.appendChild(element);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    // Cerrar ventana
    function closeLightbox() {
        const video = lightboxContent.querySelector("video");

        if (video) {
            video.pause();
            video.removeAttribute("src");
            video.load();
        }

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxContent.innerHTML = "";
        document.body.style.overflow = "";
    }

    // Ampliar imágenes al hacer clic
    document.querySelectorAll("main img").forEach(function (img) {
        img.addEventListener("click", function () {
            const enlargedImage = document.createElement("img");
            enlargedImage.src = img.currentSrc || img.src;
            enlargedImage.alt = img.alt || "Imagen ampliada";

            openLightbox(enlargedImage);
        });
    });

    // Agregar botón para ampliar cada video
    document.querySelectorAll("main video").forEach(function (video) {

        const button = document.createElement("button");
        button.type = "button";
        button.className = "video-expand-button";
        button.textContent = "Ampliar video ↗";
        button.setAttribute("aria-label", "Ampliar video");

        video.parentElement.appendChild(button);

        button.addEventListener("click", function () {
            const enlargedVideo = video.cloneNode(true);

            enlargedVideo.controls = true;
            enlargedVideo.autoplay = false;
            enlargedVideo.playsInline = true;

            openLightbox(enlargedVideo);
            enlargedVideo.load();
        });

    });

    // Cerrar con la X
    closeButton.addEventListener("click", closeLightbox);

    // Cerrar al hacer clic fuera del contenido
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });

});
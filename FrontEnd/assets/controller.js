import { loadWorks } from "./model.js";

export async function startApplication() {
	console.log("[CONTROLLER] Démarrage et demande des travaux au model");

	const works = await loadWorks();

	console.log("[CONTROLLER] Travaux reçus, mise à jour du DOM");
	displayWorks(works);
}

function displayWorks(works) {
	const gallery = document.querySelector(".gallery");

	works.forEach(function (work) {
		const figure = document.createElement("figure");
		gallery.appendChild(figure);

		const image = document.createElement("img");
		figure.appendChild(image);

		image.src = work.imageUrl;
		image.alt = work.title;

		const figcaption = document.createElement("figcaption");
		figcaption.textContent = work.title;
		figure.appendChild(figcaption);
	});

	console.log("[DOM] Galerie mise à jour avec", works.length, "travaux");
}
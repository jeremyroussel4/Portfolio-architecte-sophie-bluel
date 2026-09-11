let works = [];

export async function loadWorks() {
	console.log("[MODEL] Chargement des travaux depuis l'API");

	const response = await fetch("http://localhost:5678/api/works");
	works = await response.json();

	console.log("[MODEL] Travaux reçus :", works);
	return works;
}
fetch("http://localhost:5678/api/works")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const gallery = document.querySelector(".gallery");
    
  // Pour chaque élément de data, 
  // mets cet élément dans work et exécute le code qui suit. 
    data.forEach(function (work) {
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
  });
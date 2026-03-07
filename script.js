const username = "BettinaSM";
const repoContainer = document.getElementById("repos");

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(data => {

    data
      .filter(repo => !repo.fork)
      .forEach(repo => {

        const repoElement = document.createElement("div");

        repoElement.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Sem descrição"}</p>
        <a href="${repo.html_url}" target="_blank">Abrir repositório</a>
        <hr>
        `;

        repoContainer.appendChild(repoElement);

      });

  });

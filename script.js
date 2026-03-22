const username = "BettinaSM";
const repoContainer = document.getElementById("repos");

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(data => {

    repoContainer.innerHTML = ""; // limpa antes

    data
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .forEach(repo => {

        const repoElement = document.createElement("div");

        repoElement.innerHTML = `
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>${repo.description || "Sem descrição"}</p>
          <small>Última atualização: ${new Date(repo.updated_at).toLocaleDateString()}</small>
          <hr>
        `;

        repoContainer.appendChild(repoElement);

      });

  })
  .catch(error => {
    repoContainer.innerHTML = "Erro ao carregar repositórios.";
    console.error("Erro:", error);
  });

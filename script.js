const username = "BettinaSM";
const repoContainer = document.getElementById("repos");

fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  .then(response => response.json())
  .then(data => {

    repoContainer.innerHTML = "";

    const sortedRepos = data
      .filter(repo => !repo.fork)
      .sort((a, b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

    sortedRepos.forEach(repo => {

      const repoElement = document.createElement("div");

      const updatedDate = new Date(repo.updated_at).toLocaleDateString("pt-BR");

      repoElement.innerHTML = `
        <h3>
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </h3>
        <p>${repo.description || "Sem descrição"}</p>
        <small>📅 Última atualização: ${updatedDate}</small>
        <hr>
      `;

      repoContainer.appendChild(repoElement);

    });

  })
  .catch(error => {
    repoContainer.innerHTML = "Erro ao carregar repositórios.";
    console.error(error);
  });

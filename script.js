const username = "BettinaSM";
const repoContainer = document.getElementById("repos");

const featuredRepos = [
  "infra-linux-baseline-hardening",
  "enterprise-linux-unix-hardening-framework",
  "linux-security-logging-and-monitoring",
  "cloud-infrastructure-automation-lab",
  "devops-ci-cd-pipeline-lab"
];

fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  .then(response => response.json())
  .then(data => {

    repoContainer.innerHTML = "";

    let repos = data.filter(repo => !repo.fork);

    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    repos.forEach(repo => {

      const repoElement = document.createElement("div");
      repoElement.classList.add("repo-card");

      const isFeatured = featuredRepos.includes(repo.name);

      repoElement.innerHTML = `
        <h3>
          ${isFeatured ? "⭐ " : ""}
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </h3>
        <p>${repo.description || "Sem descrição"}</p>
        <small>📅 ${new Date(repo.updated_at).toLocaleDateString("pt-BR")}</small>
      `;

      repoContainer.appendChild(repoElement);
    });

 // 🌙 Toggle Dark Mode
const toggleBtn = document.getElementById("toggle-theme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
  });

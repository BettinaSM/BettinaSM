const username = "BettinaSM";

const repoContainer = document.getElementById("repos");
const featuredContainer = document.getElementById("featured");
const searchInput = document.getElementById("search");

const featuredRepos = [
  "infra-linux-baseline-hardening",
  "enterprise-linux-unix-hardening-framework",
  "linux-security-logging-and-monitoring",
  "cloud-infrastructure-automation-lab",
  "devops-ci-cd-pipeline-lab"
];

let reposGlobal = [];

// 🔽 FETCH
fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  .then(res => res.json())
  .then(data => {

    reposGlobal = data
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    renderRepos(reposGlobal);

    const featured = reposGlobal.filter(repo =>
      featuredRepos.includes(repo.name)
    );

    renderFeatured(featured);
  });

// 🔽 RENDER ALL
function renderRepos(repos) {
  repoContainer.innerHTML = "";

  repos.forEach(repo => {
    const el = document.createElement("div");
    el.classList.add("repo-card");

    el.innerHTML = `
      <h3>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      </h3>
      <p>${repo.description || "Sem descrição"}</p>
      <small>📅 ${new Date(repo.updated_at).toLocaleDateString("pt-BR")}</small>
    `;

    repoContainer.appendChild(el);
  });
}

// 🔽 RENDER FEATURED
function renderFeatured(repos) {
  featuredContainer.innerHTML = "";

  repos.forEach(repo => {
    const el = document.createElement("div");
    el.classList.add("repo-card");

    el.innerHTML = `
      <h3>⭐ 
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      </h3>
      <p>${repo.description || "Sem descrição"}</p>
    `;

    featuredContainer.appendChild(el);
  });
}

// 🔍 SEARCH
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = reposGlobal.filter(repo =>
    repo.name.toLowerCase().includes(value)
  );

  renderRepos(filtered);
});

// 🌙 DARK MODE
const toggleBtn = document.getElementById("toggle-theme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

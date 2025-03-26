function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || "en";
}

async function loadUsers() {
  const lang = getUrlParam("lang");
  const response = await fetch(`/api/users?lang=${lang}`);
  const data = await response.json();

  document.getElementById("pageTitle").textContent = data.titles.all_users;

  const usersHtml = data.users
    .map(
      (user) => `
        <a href="/views/user.html?id=${user.id}&lang=${lang}">
            <div class="card">
                <h3>${user.name}</h3>
                <p><b>${data.titles.email}:</b> ${user.email}</p>
                <p><b>${data.titles.role}:</b> ${user.role}</p>
                <span class="badge ${user.status ? "active" : "inactive"}">
                    ${user.status ? data.titles.active : data.titles.inactive}
                </span>
            </div>
        </a>
    `
    )
    .join("");

  document.getElementById("mainContent").innerHTML = usersHtml;
}

loadUsers();

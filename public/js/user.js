async function loadUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const lang = urlParams.get("lang") || "en";

  const response = await fetch(`/api/user/${id}?lang=${lang}`);
  const data = await response.json();

  const userHtml = `
        <h1>${data.user.name}</h1>
        <div class="meta-info">
            <p><b>${data.titles.email}:</b> ${data.user.email}</p>
            <p><b>${data.titles.role}:</b> ${data.user.role}</p>
            <span class="badge ${data.user.status ? "active" : "inactive"}">
                ${data.user.status ? data.titles.active : data.titles.inactive}
            </span>
        </div>
        <p><b>${data.titles.description}:</b> ${data.user.description}</p>
        <a class="btn" href="/views/users.html?lang=${lang}">
            ← ${data.titles.backToUsers}
        </a>
    `;

  document.getElementById("userDetail").innerHTML = userHtml;
  document.title = data.user.name;
}

loadUser();

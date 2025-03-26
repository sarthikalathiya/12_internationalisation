const http = require("http");
const Url = require("url");
const path = require("path");
const fs = require("fs");
const i18n = require("i18n");

i18n.configure({
  locales: ["en", "fr", "es", "de", "it"],
  directory: __dirname + "/locales",
  defaultLocale: "en", // Default language
  queryParameter: "lang",
  autoReload: true,
  syncFiles: true,
  objectNotation: true,
});

const server = http.createServer((req, res) => {
  const parsedUrl = Url.parse(req.url);
  const lang = parsedUrl.query ? parsedUrl.query.split("=")[1] : "en";
  i18n.setLocale(lang);

  // API endpoints
  if (parsedUrl.pathname === "/api/users" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    const users = i18n.__("users");
    const titles = i18n.__("title");
    res.end(JSON.stringify({ users, titles }));
  } else if (
    parsedUrl.pathname.startsWith("/api/user/") &&
    req.method === "GET"
  ) {
    const id = parseInt(parsedUrl.pathname.split("/")[3], 10);
    const users = i18n.__("users");
    const user = users.find((u) => u.id === id);
    const titles = i18n.__("title");

    if (user) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ user, titles }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    }
  }
  // Serve static files
  else {
    let filePath;
    if (parsedUrl.pathname === "/") {
      filePath = path.join(__dirname, "public/views", "users.html");
    } else if (parsedUrl.pathname.endsWith(".html")) {
      filePath = path.join(
        __dirname,
        "public/views",
        parsedUrl.pathname.replace("/views/", "")
      );
    } else {
      filePath = path.join(__dirname, "public", parsedUrl.pathname);
    }

    const extname = path.extname(filePath);
    let contentType = "text/html";

    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  }
});

// Start the Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server running at http://localhost:3000/");
});

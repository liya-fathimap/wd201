
  const http = require("http");
  const fs = require("fs");

  let homeContent = "";
  let projectContent = "";
  let registrationContent = "";
  fs.readFile("home.html", (err, home) => {
    if (err) {
      throw err;
    }
    homeContent = home;
  });
  
  fs.readFile("project.html", (err, project) => {
    if (err) {
      throw err;
    }
    projectContent = project;
  });
  
  fs.readFile("registration.html", (err, registration) => {
    if (err) {
      throw err;
    }
    registrationContent = registration;
  });

function getPortFromArgs(defaultPort) {
    const args = process.argv;
    const portIndex = args.indexOf("--port");
  
    if (portIndex !== -1 && args[portIndex + 1]) {
      const port = parseInt(args[portIndex + 1], 10);
      if (!isNaN(port)) {
        return port;
      } else {
        console.log("Invalid port number ");
      }
    }
  
    return defaultPort;
  }
  
  
  const port = getPortFromArgs(3000);
  
  http
    .createServer((request, response) => {
      let url = request.url;
      response.writeHead(200, { "Content-Type": "text/html" });
  
      switch (url) {
        case "/project":
          response.write(projectContent);
          break;
        case "/registration":
          response.write(registrationContent);
          break;
        case "/":
          response.write(homeContent);
          break;
        default:
          response.write("<h1>404 Not Found</h1>");
          break;
      }
  
      response.end();
    })
    .listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

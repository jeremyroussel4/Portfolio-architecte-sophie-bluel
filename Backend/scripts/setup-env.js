const fs = require("fs");
const path = require("path");

const backendDirectory = path.resolve(__dirname, "..");
const envPath = path.join(backendDirectory, ".env");
const examplePath = path.join(backendDirectory, ".env.example");

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(examplePath, envPath);
  console.log("Backend/.env créé depuis Backend/.env.example");
} else {
  console.log("Backend/.env existe déjà : aucune modification.");
}
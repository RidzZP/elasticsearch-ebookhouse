const express = require("express");
const bodyParser = require("body-parser");
const {
  testElasticsearchConnection,
} = require("./services/elasticsearchService");

// Import Routes

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Set Endpoints

app.listen(port, async () => {
  try {
    await testElasticsearchConnection();
    console.log(`Server berjalan di http://localhost:${port}`);
  } catch (error) {
    console.error(`Error connecting to Elasticsearch: ${error.message}`);
  }
});

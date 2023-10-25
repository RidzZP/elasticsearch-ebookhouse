const express = require("express");
const bodyParser = require("body-parser");
const { testElasticConnection } = require("./services/elasticService");

// Import Routes
const autocompleteRoute = require("./routes/autocompleteRoute");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Set Endpoints
app.use("/autocomplete", autocompleteRoute);

app.listen(port, async () => {
  try {
    await testElasticConnection();
    console.log(`Server berjalan di http://localhost:${port}`);
  } catch (error) {
    console.error(`Error connecting to Elasticsearch: ${error.message}`);
  }
});

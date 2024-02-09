const express = require("express");
const bodyParser = require("body-parser");
const {
  testElasticsearchConnection,
} = require("./services/elasticsearchService");

const searchRouteBookhouse = require("./routes/searchRouteBookhouse");
const searchJoinBookhouse = require("./routes/searchJoinBookhouse");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/autocompleteBookhouse", searchRouteBookhouse);
app.use("/searchBookhouse", searchJoinBookhouse);

app.get("/", (req, res) => {
  res.send("<h1>Elasticsearch API <b>ONLINE</b></h1>");
});

app.listen(port, async () => {
  try {
    await testElasticsearchConnection();
    console.log(`Server berjalan di http://localhost:${port}`);
  } catch (error) {
    console.error(`Error connecting to Elasticsearch: ${error.message}`);
  }
});

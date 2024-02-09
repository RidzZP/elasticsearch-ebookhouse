const { Client } = require("@elastic/elasticsearch");
const elasticsearchConfig = require("../config/elasticsearchConfig");

const elasticsearchClient = new Client({ node: elasticsearchConfig.node });

async function testElasticsearchConnection() {
  try {
    const info = await elasticsearchClient.info();
    console.log("Elasticsearch info:", info);
    console.log("Connection to Elasticsearch successful.");
  } catch (error) {
    throw new Error(`Error connecting to Elasticsearch: ${error.message}`);
  }
}

module.exports = {
  elasticsearchClient,
  testElasticsearchConnection,
};

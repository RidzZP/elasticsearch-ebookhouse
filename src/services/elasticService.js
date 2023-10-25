const { Client } = require("@elastic/elasticsearch");
const elasticConfig = require("../config/elasticConfig");

const elasticClient = new Client({ node: elasticConfig.node });

async function testElasticConnection() {
  try {
    const info = await elasticClient.info();
    console.log("Elasticsearch info:", info);
    console.log("Connection to Elasticsearch successful.");
  } catch (error) {
    throw new Error(`Error connecting to Elasticsearch: ${error.message}`);
  }
}

module.exports = {
  elasticClient,
  testElasticConnection,
};

const { elasticsearchClient } = require("../services/elasticsearchService");

exports.searchBookhouse = async (req, res) => {
  try {
    let { q } = req.query;
    const size = parseInt(req.query.size) || 15;

    const ebhSearch = await elasticsearchClient.search({
      index: "join_index_ebh",
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: q,
                  type: "bool_prefix",
                  fields: [
                    "name.product_type",
                    "name.product_type._2gram",
                    "name.product_type._3gram",
                  ],
                },
              },
              {
                multi_match: {
                  query: q,
                  fuzziness: 1,
                },
              },
            ],
          },
        },
        sort: [
          {
            _score: {
              order: "desc",
            },
          },
        ],
        size: size,
      },
    });

    const bookhouseResult = ebhSearch.body.hits.hits.map((hit) => {
      const { product_id, category_id, manufacturer_id, name, slug, table } =
        hit._source;

      return {
        product_id: product_id,
        category_id: category_id,
        manufacturer_id: manufacturer_id,
        name: name,
        slug: slug,
        table: table,
      };
    });

    res.json({
      success: true,
      status: 200,
      data: bookhouseResult,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

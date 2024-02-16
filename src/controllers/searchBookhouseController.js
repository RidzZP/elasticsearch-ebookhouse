const { elasticsearchClient } = require("../services/elasticsearchService");

exports.autocompleteBookhouse = async (req, res) => {
  try {
    let { q } = req.query;
    const size = parseInt(req.query.size) || 15;

    const [productSearch, categorySearch, manufactureSearch] =
      await Promise.all([
        elasticsearchClient.search({
          index: "product",
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
        }),
        elasticsearchClient.search({
          index: "category",
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
        }),
        elasticsearchClient.search({
          index: "manufacture",
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
        }),
      ]);

    const productResult = productSearch.body.hits.hits.map((hit) => {
      const { product_id, name, seo } = hit._source;

      return {
        id: product_id,
        name: name,
        slug: seo,
      };
    });

    const categoryResult = categorySearch.body.hits.hits.map((hit) => {
      const { category_id, name, slug } = hit._source;

      return {
        id: category_id,
        name: name,
        slug: slug,
      };
    });

    const manufactureResult = manufactureSearch.body.hits.hits.map((hit) => {
      const { manufacturer_id, name, slug } = hit._source;

      return {
        id: manufacturer_id,
        text: name,
        slug: slug,
      };
    });

    res.json({
      success: true,
      status: 200,
      data: {
        productResult,
        categoryResult,
        manufactureResult,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

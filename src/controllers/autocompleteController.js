const { elasticClient } = require("../services/elasticService");

exports.autocomplete = async (req, res) => {
  const { query } = req.query;

  try {
    const [
      productResult,
      manufactureResult,
      categoryResult,
    ] = await Promise.all([
      elasticClient.search({
        index: "product",
        body: {
          suggest: {
            product_suggest: {
              prefix: query,
              completion: {
                field: "name.suggest",
                size: 50,
                fuzzy: {
                  fuzziness: "AUTO",
                },
              },
            },
          },
        },
      }),
      elasticClient.search({
        index: "manufacture",
        body: {
          suggest: {
            manufacture_suggest: {
              prefix: query,
              completion: {
                field: "name.suggest",
                size: 50,
                fuzzy: {
                  fuzziness: "AUTO",
                },
              },
            },
          },
        },
      }),
      elasticClient.search({
        index: "category",
        body: {
          suggest: {
            category_suggest: {
              prefix: query,
              completion: {
                field: "name.suggest",
                size: 50,
                fuzzy: {
                  fuzziness: "AUTO",
                },
              },
            },
          },
        },
      }),
    ]);

    const productSuggestion = productResult.body.suggest.product_suggest[0].options.map(
      (option) => {
        return {
          id: option._source.product_id,
          name: option.text,
        };
      }
    );

    const manufactureSuggestion = manufactureResult.body.suggest.manufacture_suggest[0].options.map(
      (option) => {
        return {
          name: option.text,
        };
      }
    );

    const categorySuggestion = categoryResult.body.suggest.category_suggest[0].options.map(
      (option) => {
        return {
          name: option.text,
        };
      }
    );

    res.json({
      success: true,
      status: 200,
      data: {
        productSuggestion,
        manufactureSuggestion,
        categorySuggestion,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan dalam autocomplete." });
  }
};

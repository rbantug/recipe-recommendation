export default function makeExpressCallback(controller) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        method: req.method,
        path: req.path,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
        },
      };
      controller(httpRequest)
        .then((httpResponse) => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }
  
          if (httpResponse.status === 'success') {
            res.status(httpResponse.statusCode).json({
              headers: httpResponse.headers,
              status: httpResponse.status,
              data: httpResponse.data,
              statusCode: httpResponse.statusCode,
            });
          } else if (httpResponse.status === 'fail') {
            res.status(httpResponse.statusCode).json({
              headers: httpResponse.headers,
              status: httpResponse.status,
              message: httpResponse.message,
              statusCode: httpResponse.statusCode,
            });
          }
        })
        .catch((e) => res.status(500).send({ error: 'An unknown error has occurred.' }));
    };
  }
  
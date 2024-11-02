export default function makeExpressCallback(controller) {
    return async (req, res, next) => {
      let cookiesPath

      if(process.env.NODE_ENV === 'supertest') {
        cookiesPath = req.headers.cookies
      } else {
        cookiesPath = req.cookies
      }

      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        method: req.method,
        path: req.path,
        cookies: cookiesPath,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          ...req.headers
        },
        user: req.user
      };

      controller(httpRequest)
        .then((httpResponse) => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }

          if (httpResponse.cookies) {
            httpResponse.cookies.forEach(c => {
              res.cookies(c.name, c.payload, c.options)
            })
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
  
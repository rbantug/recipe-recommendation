export default function makeExpressCallback(controller, AppError) {
    return async (req, res, next) => {
      let cookiesPath

      if(process.env.TESTING === 'supertest') {
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
        user: req.user,
        secure: req.secure,
        protocol: req.protocol,
        host: req.get('host')
      };

      controller(httpRequest)
        .then((httpResponse) => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }

          if (httpResponse.cookie) {
            httpResponse.cookie.forEach(c => res.cookie(c.name, c.payload, c.options)
            )
          } 
  
          if (httpResponse.status === 'success') {
            res.status(httpResponse.statusCode).json({
              headers: httpResponse.headers,
              status: httpResponse.status,
              data: httpResponse.data,
              statusCode: httpResponse.statusCode,
              message: httpResponse.message,
              token: httpResponse.token
            }); 
          }

          if (httpResponse.status === 'fail') {
            return next(httpResponse)
          }
        })
        .catch(e => next(new AppError('An unknown error occurred.', 500, httpRequest.headers)))
    };
  }
  
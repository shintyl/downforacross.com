function isAsset(url) {
    return /\.(png|jpe?g|gif|css|js|svg|ico|map|json)$/i.test(url.pathname)
  }
  
  export default function middleware(req: Request) {
    const url = new URL(req.url)
  
    // If the request is requesting an asset file, do not run our
    // middleware function.
    if (isAsset(url)) {
      // Continue with Vercel's default asset handler
      return new Response(null, {
        headers: { 'x-middleware-next': '1' },
      })
    }
  
    // You can add and append headers in multiple ways,
    // below we'll explore some common patterns
  
    // 1. Add a header to the `Headers` interface
    // https://developer.mozilla.org/en-US/docs/Web/API/Headers
    const headers = new Headers({ 'x-custom-1': 'value-1' })
    headers.set('x-custom-2', 'value-2')
  
    // 2. Add existing headers to a new `Response`
    const res = new Response(null, { headers })
  
    // 3. Add a header to an existing response
    res.headers.set('x-custom-3', 'value-3')
  
    // 4. Merge existing headers with new ones in a response
    return new Response(null, {
      headers: {
        // x-middleware-next header invokes a `next()` style function
        // within Vercel middleware, ultimately passing the
        // request to the next middleware.
        'x-middleware-next': '1',
  
        // Our custom headers
        ...Object.fromEntries(res.headers),
        'x-custom-4': 'value-4',
      },
    })
  }
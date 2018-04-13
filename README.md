# Apicase JSON API

Apicase plugin that helps you work with JSON API.

## Read JSON API specification

[**click here**](http://jsonapi.org/)

## Installation

```
npm install @apicase/jsonapi
```

```javascript
import fetch from "@apicase/adapter-fetch"
import { ApiService } from "@apicase/core"
import { jsonApiPlugin } from "@apicase/jsonapi"

const Root = new ApiService(fetch, {
  url: "/api"
}).use(jsonApiPlugin) // <- Add this line
```

## Usage

Imagine that we have API route with the following `result.body`:

```json
{
  "data": [
    {
      "id": "1",
      "type": "post",
      "attributes": {
        "title": "Hello world",
        "text": "Lorem Ipsum Dolor ..."
      },
      "relationships": {
        "author": {
          "data": {
            "id": "1",
            "type": "user"
          }
        }
      }
    }
  ],
  "included": [
    {
      "id": "1",
      "type": "user",
      "attributes": {
        "name": "Anton",
        "surname": "Kosykh"
      }
    }
  ]
}
```

We'll create a service with `meta.normalize` options:

```javascript
const GetPosts = Root.extend({
  meta: {
    normalize: ["id", "title", "text", "author.id", "author.name"]
  }
})

GetPosts
  .doRequest()
  .then(({ result }) => {
    console.log(result.body)
  })
```

It will convert `result.body` to:

```json
[
  {
    "id": "1",
    "title": "Hello world",
    "text": "Lorem Ipsum Dolor ...",
    "author": {
      "id": "1",
      "name": "Anton"
    }
  }
]
```

If you need `links` or another options from original body, it's stored in `result.rawBody`:

```javascript
console.log(result.rawBody.included)
/*
  [{
    "id": "1",
    "type": "user",
    "attributes": {
      "name": "Anton",
      "surname": "Kosykh"
    }
  }]
*/
```

## License

MIT

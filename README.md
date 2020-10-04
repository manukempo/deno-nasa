# Deno | The NASA Project

A full stack app written in **Deno** and **Oak**.

- Current libraries/frameworks available:
  - **Oak** is a middleware framework for Deno's http server, including a router middleware. https://github.com/oakserver/oak
  - **Drash** is a REST micro-framework for Deno's HTTP server with zero dependencies.
    - https://drash.land/
    - https://drash.land/drash
  - **Deno Express** is a Deno Webserver like the node express way. https://github.com/NMathar/deno-express
  - **Pogo** is an easy-to-use, safe, and expressive framework for writing web servers and applications. It is inspired by hapi. https://github.com/sholladay/pogo
  - **Servest** is a http module suite for Deno:
    - https://servestjs.org/
    - https://github.com/keroxp/servest
- **Oak**:
  - Current version: https://deno.land/x/oak@v6.3.0/mod.ts
  - Oak Documentation: https://doc.deno.land/https/deno.land/x/oak@v6.3.0/mod.ts
  - Example Context Response Headers (Middleware):
    ![contextHeaders](images/contextHeaders.jpg)
  - NOTE: Challenges Page found (although no new challenges out since 2019): https://adventofcode.com/2019/about
  - **allowedMethods()** allows other machines to know what routes our app supports and to get specific status codes back from the requests.
    ```typescript
    app.use(api.allowedMethods());
    ```
    - With this implementation, if you try to use a method that our app doesn't include, it returns a _405 Method Not Allowed_ instead of a just a _404_.
    - **NOTE**: The OPTIONS method, returns what methods are currently allowed by our app:
      ![optionsAllowed](images/optionsAllowed.jpg)

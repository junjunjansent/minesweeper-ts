// attempts to run this were a bit futile to try to get bun to serve my typescirpt as static files

import { transform } from "https://deno.land/x/esbuild/mod.js"; // Bun doesn’t have built-in API, you can use esbuild here or spawn tsc

Bun.serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname === "/" ? "/index.html" : url.pathname;

    // Handle .ts files: compile and serve JS
    if (path.endsWith(".ts")) {
      try {
        const tsPath = "." + path;
        const tsCode = await Bun.file(tsPath).text();

        // Compile TypeScript code to JS (using Bun.transform)
        // Bun.transform can compile TS code (experimental)
        const result = await Bun.transform(tsCode, {
          loader: "ts",
          minify: false,
          sourceMaps: "inline",
          sourceRoot: "./",
        });

        return new Response(result.code, {
          headers: {
            "Content-Type": "application/javascript; charset=utf-8",
          },
        });
      } catch (e) {
        return new Response("TS file not found", { status: 404 });
      }
    }

    // Serve other files as static
    try {
      const file = Bun.file("." + path);
      return new Response(file);
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  },
});

# A TypeScript client to [XTDB][xtdb]

This library wraps the [XTDB REST API][rest-api], which is well documented on the XTDB website.

Every endpoint is fully typed, both on argument and return -- so most of the API is discoverable simply by exploring the TypeScript API surface.

The [Clojure][clojure-api] or [Java][java-api] client documentation may also be helpful as a reference for how the various functionality works.

To quickly get an XTDB HTTP API up and running locally, you can use [xtdb-http][], which I threw together for this purpose.

[xtdb]: https://xtdb.com
[rest-api]: https://docs.xtdb.com/clients/http/
[clojure-api]: https://docs.xtdb.com/clients/clojure/
[java-api]: https://docs.xtdb.com/clients/java/
[xtdb-http]: https://github.com/tekacs/xtdb-http
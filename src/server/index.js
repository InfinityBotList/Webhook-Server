const config = require("../../config");
const path = require("path");

module.exports = async (client) => {
  const fastify = require("fastify")({ logger: true });

  fastify.register(require("@fastify/autoload"), {
    dir: path.join(__dirname, "../routes"),
  });

  fastify.addHook("preHandler", (req, res, done) => {
    req.client = client;

    /**
     * THE FOLLOWING WILL PREVENT CORS FROM BLOCKING THE REQUEST
     */
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    done();
  });

  fastify.setNotFoundHandler(function (request, reply) {
    reply.code(404).send({
      message: "Route not found. Do you know what you are looking for?",
      error: true,
      fatal: false,
      status: 404,
    });
  });

  const start = async () => {
    try {
      await fastify.listen({
        port: process.env.PORT || config.port,
        host: "0.0.0.0",
      });

      console.log("Webhook server is online chief!");
    } catch (err) {
      console.log(`Error while starting server: ${err.message}`);

      fastify.log.error(err.stack);

      process.exit(1);
    }
  };

  start();
};

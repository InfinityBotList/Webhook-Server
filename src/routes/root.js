module.exports = async (fastify, opts) => {
  fastify.get("/", (request, reply) => {
    reply.status(200).send({
      message: "Welcome chief, this is just a simple IBL Webhook Server",
      version: "0.0.1",
      error: false,
      fatal: false,
      status: 200,
    });
  });
};

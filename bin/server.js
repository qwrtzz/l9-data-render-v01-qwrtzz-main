// @ts-check
import fastify from 'fastify';
import response from '../__fixtures__/users.js';

const server = () => {
  const app = fastify();

  app.get('/users', (_req, reply) => {
    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(JSON.stringify(response));
  });

  return app;
};

const port = 3000;

server().listen({ port });

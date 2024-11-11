import Fastify from 'fastify';
import awsLambdaFastify from '@fastify/aws-lambda';

const app = Fastify({ logger: true });

app.get('/', async (request, reply) => {
  reply.send({ message: 'HELLO' });
});

app.get('/characters', async (request, reply) => {
  reply.send({ message: 'List of characters' });
});

app.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    message: 'Route not found',
    code: 'route-not-found',
  });
});

app.setErrorHandler((error, request, reply) => {
  reply.status(500).send({
    message: error.message || 'Internal server error',
    code: 'internal-server-error',
  });
});

export const httpHandler = awsLambdaFastify(app);
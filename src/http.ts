import Fastify from 'fastify';
import awsLambdaFastify from '@fastify/aws-lambda';

const app = Fastify({ logger: true });

// Definição de rota de exemplo
app.get('/', async (request, reply) => {
  reply.send({ message: 'HELLO' });
});

app.get('/characters', async (request, reply) => {
  reply.send({ message: 'List of characters' });
});

// Tratamento de rotas não encontradas (404)
app.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    message: 'Route not found',
    code: 'route-not-found',
  });
});

// Tratamento de erros gerais
app.setErrorHandler((error, request, reply) => {
  reply.status(500).send({
    message: error.message || 'Internal server error',
    code: 'internal-server-error',
  });
});

// Adaptando para o AWS Lambda
export const handler = awsLambdaFastify(app);
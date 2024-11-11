async function handlePlayerAction(action: any) {
  return { status: 'Action processed', action };
}

export const websocketHandler = async (event: any) => {
  const { requestContext, body } = event;

  switch (requestContext.routeKey) {
    case '$connect':
      return { statusCode: 200, body: 'Connected' };
    case '$disconnect':
      return { statusCode: 200, body: 'Disconnected' };
    case 'playerAction':
      const action = JSON.parse(body);
      return handlePlayerAction(action);
    default:
      return { statusCode: 400, body: 'Invalid route' };
  }
};
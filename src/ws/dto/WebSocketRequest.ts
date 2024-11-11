type WebSocketRouteKey = '$connect' | '$disconnect' | 'playerAction';

export interface WebSocketRequest {
  requestContext: {
    routeKey: WebSocketRouteKey;
    connectionId: string;
  };
  body: string | null;
}
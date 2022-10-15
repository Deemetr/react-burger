import type { Middleware, MiddlewareAPI } from "redux";
import {
  WS_CONNECTION_START,
  WS_DISCONNECT,
  WS_GET_MESSAGE
} from "./actions/wsActionTypes";

import {
  wsConncectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage
} from "./reducers/feed-reducer";
import type { AppDispatch, RootState } from "./reducers/index";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(action.url);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsConncectionSuccess());
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError(event));
        };

        socket.onmessage = (event) => {
          dispatch(wsGetMessage(event.data));
        };
        socket.onclose = () => {
          dispatch(wsConnectionClosed());
        };

        if (type === WS_GET_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }

        if (type === WS_DISCONNECT) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};
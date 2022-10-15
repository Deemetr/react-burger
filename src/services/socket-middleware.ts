import type { Middleware, MiddlewareAPI } from "redux";
import { TWsActions } from "./reducers/feed-reducer";

import type { AppDispatch, RootState } from "./reducers/index";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsActions.connect("").type) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsActions.onOpen());
        };

        socket.onerror = (event) => {
          dispatch(wsActions.onError(event));
        };

        socket.onmessage = (event) => {
          dispatch(wsActions.onMessage(event.data));
        };
        socket.onclose = () => {
          dispatch(wsActions.onClose());
        };

        if (type === wsActions.disconnect().type && socket) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};

import feedReducer, {
   initialState,
   wsConncectionSuccess, wsConnectionClosed, wsConnectionError, wsGetMessage
} from "./feed-reducer";

describe("Feed reducer", () => {
  it("should set success connection status", () => {
    const actualState = feedReducer(initialState, wsConncectionSuccess());

    expect(actualState.wsConnected).toBe(true);
    expect(actualState.error).toBe(undefined);
  });

  it("should set fail connection status", () => {
    const errorMessage = "Error message";
    const actualState = feedReducer(
      initialState,
      wsConnectionError(errorMessage)
    );

    expect(actualState.wsConnected).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  it("should set closed connection status", () => {
    const actualState = feedReducer(initialState, wsConnectionClosed());

    expect(actualState.wsConnected).toBe(false);
    expect(actualState.error).toEqual(undefined);
  });

  it("should set new messages", () => {
    const wsResponse = {
      success: true,
      orders: [],
      total: 1,
      totalToday: 1,
    };

    const actualState = feedReducer(
      initialState,
      wsGetMessage(JSON.stringify(wsResponse))
    );

    expect(actualState.total).toBe(1);
    expect(actualState.totalToday).toBe(1);
    expect(actualState.orders).toEqual([]);
  });
});

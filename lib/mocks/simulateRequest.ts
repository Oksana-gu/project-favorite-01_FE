// TODO: remove after integration with app/api/locations
export const simulateRequest = (delay = 1000) =>
  new Promise<void>((resolve) => setTimeout(resolve, delay));

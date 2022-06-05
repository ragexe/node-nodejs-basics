import { parentPort } from "worker_threads";

export const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = (ordinalNumber) => {
  try {
    const nthFibonacciValue = nthFibonacci(ordinalNumber);
    parentPort.postMessage({ status: "resolved", data: nthFibonacciValue });
  } catch (err) {
    parentPort.postMessage({ status: "error", data: null });
  }
};

parentPort.on("message", (ordinalNumber) => {
  sendResult(ordinalNumber);
});

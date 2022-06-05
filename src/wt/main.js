import { cpus } from "os";
import * as path from "path";
import { Worker } from "worker_threads";

const WORKER_FILE_NAME = "worker.js";
const WORKER_FILE_PATH = path.join(
  path.resolve(),
  "src",
  "wt",
  WORKER_FILE_NAME
);

const BASIC_NUM = 10;

export const performCalculations = async () => {
  const results = [];
  const logicalCPUCores = cpus();

  const ordinalNumbers = new Array(logicalCPUCores.length)
    .fill()
    .map((_, index) => index + BASIC_NUM);

  await Promise.all(
    ordinalNumbers.map(
      (ordinalNumber, index) =>
        new Promise((resolve, reject) => {
          const worker = new Worker(WORKER_FILE_PATH);
          worker.postMessage(ordinalNumber);

          worker
            .on("error", (error) => reject(error))
            .on("message", (result) => {
              results.push([index, result]);
              worker.terminate().then(() => {
                resolve();
              });
            });
        })
    )
  );

  return results
    .sort(([leftIndex, _], [rightIndex, __]) => {
      return leftIndex - rightIndex;
    })
    .map(([_, result]) => result);
};

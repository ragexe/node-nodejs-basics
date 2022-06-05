import { pipeline } from "node:stream/promises";
import { Transform } from "stream";

export const transform = async () => {
  const writableStream = process.stdout;
  const readableStream = process.stdin;

  const reverseTransformer = new Transform({
    transform: (chunk, _, callback) => {
      const result = [
        ...chunk.toString().split("").slice(0, -1).reverse(),
        "\n",
      ].join("");

      callback(null, result);
    },
  });

  return pipeline(readableStream, reverseTransformer, writableStream);
};

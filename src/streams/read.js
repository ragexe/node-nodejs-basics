import * as path from "path";
import { createReadStream } from "fs";

const SOURCE_FILE_NAME = "fileToRead.txt";
const SOURCE_FILE_PATH = path.join(
  path.resolve(),
  "src",
  "streams",
  "files",
  SOURCE_FILE_NAME
);

export const read = async () => {
  const readStream = createReadStream(SOURCE_FILE_PATH);
  const promise = new Promise((resolve, reject) => {
    readStream
      .on("data", (chunk) => process.stdout.write(chunk))
      .on("end", () => process.stdout.write("\n"))
      .on("close", () => {
        resolve(void 0);
      })
      .on("error", (error) => {
        reject(error);
      });
  });

  return promise;
};

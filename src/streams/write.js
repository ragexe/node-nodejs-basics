import { createWriteStream } from "fs";
import * as path from "path";

const SOURCE_FILE_NAME = "fileToWrite.txt";
const SOURCE_FILE_PATH = path.join(
  path.resolve(),
  "src",
  "streams",
  "files",
  SOURCE_FILE_NAME
);

export const write = async () => {
  const writableStream = createWriteStream(SOURCE_FILE_PATH);
  const promise = new Promise((resolve, reject) => {
    process.stdin
      .on("data", (chunk) => writableStream.write(chunk))
      .on("end", () => writableStream.write("\n"))
      .on("close", () => {
        resolve(void 0);
      })
      .on("error", (error) => {
        reject(error);
      });
  });

  return promise;
};

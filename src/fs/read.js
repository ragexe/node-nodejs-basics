import { readFile } from "node:fs/promises";
import * as path from "path";

const SOURCE_FILE_NAME = "fileToRead.txt";
const SOURCE_FILE_PATH = path.join(
  path.resolve(),
  "src",
  "fs",
  "files",
  SOURCE_FILE_NAME
);

export const read = async () => {
  try {
    const contentBuffer = await readFile(SOURCE_FILE_PATH, { flag: "r" });
    console.log(contentBuffer.toString());

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

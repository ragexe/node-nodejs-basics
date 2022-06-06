import { readdir } from "node:fs/promises";
import * as path from "path";

const SOURCE_FOLDER_NAME = "files";
const SOURCE_FOLDER_PATH = path.join(
  path.resolve(),
  "src",
  "fs",
  SOURCE_FOLDER_NAME
);

export const list = async () => {
  try {
    const files = await readdir(SOURCE_FOLDER_PATH, { withFileTypes: true });

    files.forEach(({ name: fileName }) => {
      console.log(fileName);
    });

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

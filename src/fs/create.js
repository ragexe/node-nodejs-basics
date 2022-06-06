import { writeFile } from "node:fs/promises";
import * as path from "path";

const FILE_NAME = "fresh.txt";
const FILE_CONTENT = "I am fresh and young";
const FILE_PATH = path.join(path.resolve(), "src", "fs", "files", FILE_NAME);

export const create = async () => {
  try {
    await writeFile(FILE_PATH, FILE_CONTENT, { flag: "ax" });

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && error.code === "EEXIST") {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

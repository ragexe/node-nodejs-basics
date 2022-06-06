import { rm } from "node:fs/promises";
import * as path from "path";

const FILE_NAME = "fileToRemove.txt";
const FILE_PATH = path.join(path.resolve(), "src", "fs", "files", FILE_NAME);

export const remove = async () => {
  try {
    await rm(FILE_PATH, { force: false });

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && ["ENOENT", "ERR_FS_EISDIR"].includes(error.code)) {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

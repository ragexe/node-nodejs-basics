import { cp, stat } from "node:fs/promises";
import * as path from "path";

const SOURCE_FOLDER_NAME = "files";
const TARGET_FOLDER_NAME = "files_copy";

const [SOURCE_FOLDER_PATH, TARGET_FOLDER_PATH] = [
  SOURCE_FOLDER_NAME,
  TARGET_FOLDER_NAME,
].map((folderName) => path.join(path.resolve(), "src", "fs", folderName));

class CustomError extends Error {
  code = "SRC_NOT_A_FOLDER";

  constructor(message) {
    super(message);
  }
}

export const copy = async () => {
  try {
    const stats = await stat(SOURCE_FOLDER_PATH);

    if (!stats.isDirectory()) {
      throw new CustomError();
    }

    await cp(SOURCE_FOLDER_PATH, TARGET_FOLDER_PATH, {
      errorOnExist: true,
      recursive: true,
      force: false,
    });

    return Promise.resolve(void 0);
  } catch (error) {
    if (
      error &&
      ["ERR_FS_CP_EEXIST", "ENOENT", "SRC_NOT_A_FOLDER"].includes(error.code)
    ) {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

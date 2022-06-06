import { rename as _rename, access } from "node:fs/promises";
import { constants } from "node:fs";
import * as path from "path";

const SOURCE_FILE_NAME = "wrongFilename.txt";
const TARGET_FILE_NAME = "properFilename.md";
const [SOURCE_FILE_PATH, TARGET_FILE_PATH] = [
  SOURCE_FILE_NAME,
  TARGET_FILE_NAME,
].map((fileName) => path.join(path.resolve(), "src", "fs", "files", fileName));

class CustomError extends Error {
  code = "SOURCE_FILE_DOES_NOT_EXISTS_OR_TARGET_FILE_DOES";

  constructor(message) {
    super(message);
  }
}

const checkFileExists = (filePath) => {
  return access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);
};

export const rename = async () => {
  try {
    const sourceFileExistsAndTargetFileDoesNot = await Promise.all([
      await checkFileExists(SOURCE_FILE_PATH),
      !(await checkFileExists(TARGET_FILE_PATH)),
    ]);

    if (!sourceFileExistsAndTargetFileDoesNot.every((value) => value))
      throw new CustomError();

    await _rename(SOURCE_FILE_PATH, TARGET_FILE_PATH);

    return Promise.resolve(void 0);
  } catch (error) {
    if (
      error &&
      error.code === "SOURCE_FILE_DOES_NOT_EXISTS_OR_TARGET_FILE_DOES"
    ) {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

import { createHash } from "crypto";
import { readFile } from "node:fs/promises";
import * as path from "path";

const SOURCE_FILE_NAME = "fileToCalculateHashFor.txt";
const SOURCE_FILE_PATH = path.join(
  path.resolve(),
  "src",
  "hash",
  "files",
  SOURCE_FILE_NAME
);

export const calculateHash = async () => {
  const dataBuffer = await readFile(SOURCE_FILE_PATH, { flag: "r" });
  const sha256Hash = createHash("sha256").update(dataBuffer);
  const hexString = sha256Hash.digest("hex");

  return hexString;
};

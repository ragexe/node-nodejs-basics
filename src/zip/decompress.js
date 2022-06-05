import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import * as path from 'path';
import { createBrotliDecompress } from 'zlib';

const SOURCE_FILE_NAME = "archive.gz";
const TARGET_FILE_NAME = "fileToCompress_.txt";

const [SOURCE_FILE_PATH, TARGET_FILE_PATH] = [
  SOURCE_FILE_NAME,
  TARGET_FILE_NAME,
].map((fileName) => path.join(path.resolve(), "src", "zip", "files", fileName));

export const decompress = async () => {
  const readableStream = createReadStream(SOURCE_FILE_PATH);
  const writableStream = createWriteStream(TARGET_FILE_PATH);

  return pipeline(readableStream, createBrotliDecompress(), writableStream);
};

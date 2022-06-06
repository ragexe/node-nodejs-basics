import { spawn } from "node:child_process";
import { stdin, stdout } from "node:process";
import * as path from "path";

const SOURCE_FILE_NAME = "script.js";
const SOURCE_FILE_PATH = path.join(
  path.resolve(),
  "src",
  "cp",
  "files",
  SOURCE_FILE_NAME
);

export const spawnChildProcess = async (args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn("node", [SOURCE_FILE_PATH, ...args], {
      stdio: ["pipe", "pipe", "pipe", "ipc"],
    });

    childProcess.stderr.on("data", (data) => {
      console.error(`childProcess stderr: ${data}`);
    });

    childProcess
      .on("message", (message) => {
        console.log(
          `Received message from childProcess(pid:${childProcess.pid}):`,
          message
        );
      })
      .on("close", (code) => {
        console.log(
          `childProcess(pid:${childProcess.pid}) exited with code ${code}`
        );
        resolve();
      });

    stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(stdout);
  });
};

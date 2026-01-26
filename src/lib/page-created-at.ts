import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export const pageCreatedAt = async (filePath: string) => {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["log", "--diff-filter=A", '--pretty=format:%cI', "--", filePath],
      {
        encoding: "utf8",
      }
    );

    const result = stdout.trim();

    if (!result) return null;

    return new Date(result);
  } catch {
    return null;
  }
};

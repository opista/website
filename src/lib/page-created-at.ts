import { execFileSync } from "child_process";

export const pageCreatedAt = (filePath: string) => {
  try {
    const result = execFileSync(
      "git",
      [
        "log",
        "--diff-filter=A",
        '--pretty=format:%cI',
        "--",
        filePath,
      ],
      {
        encoding: "utf8",
      }
    ).trim();

    if (!result) return new Date();

    return new Date(result);
  } catch {
    return new Date();
  }
};

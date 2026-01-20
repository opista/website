import { execFileSync } from "child_process";

export const pageModifiedAt = (filePath: string) => {
  try {
    const result = execFileSync(
      "git",
      ["log", "-1", '--pretty=format:%cI', filePath],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }
    ).trim();

    if (!result) return new Date();

    return new Date(result);
  } catch {
    return new Date();
  }
};

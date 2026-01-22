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

    if (!result) return null;

    return new Date(result);
  } catch {
    return null;
  }
};

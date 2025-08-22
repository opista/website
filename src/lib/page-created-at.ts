import { execSync } from "child_process";

export const pageCreatedAt = (filePath: string) => {
  const result = execSync(
    `git log --diff-filter=A --pretty="format:%cI" -- "${filePath}"`,
    {
      encoding: "utf8",
    }
  ).trim();

  return new Date(result);
};

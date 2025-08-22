import { execSync } from "child_process";

export const pageModifiedAt = (filePath: string) => {
  const result = execSync(`git log -1 --pretty="format:%cI" "${filePath}"`, {
    encoding: "utf8",
  }).trim();

  return new Date(result);
};

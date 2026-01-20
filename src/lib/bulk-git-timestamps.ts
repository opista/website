import { execFileSync } from "child_process";
import { join } from "path";

export type Timestamps = {
  createdAt: Date;
  modifiedAt: Date;
};

export const getBulkTimestamps = (directory: string): Map<string, Timestamps> => {
  const map = new Map<string, Timestamps>();

  try {
    const output = execFileSync(
      "git",
      [
        "log",
        "--name-only",
        "--pretty=format:COMMIT_DATE_%cI",
        "--",
        directory,
      ],
      { encoding: "utf8" }
    );

    const lines = output.split(/\r?\n/);
    let currentDate: Date | null = null;
    const root = process.cwd();

    for (const line of lines) {
      if (!line) continue;

      if (line.startsWith("COMMIT_DATE_")) {
        const dateStr = line.substring("COMMIT_DATE_".length);
        currentDate = new Date(dateStr);
      } else if (currentDate) {
        const fullPath = join(root, line);

        const entry = map.get(fullPath);
        if (!entry) {
          map.set(fullPath, {
            createdAt: currentDate,
            modifiedAt: currentDate,
          });
        } else {
          entry.createdAt = currentDate;
        }
      }
    }
  } catch (err) {
    console.warn("Failed to fetch git timestamps in bulk", err);
  }

  return map;
};

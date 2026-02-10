import { IconTools } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { Link } from "./link";

export const WorkInProgress = () => (
  <div
    aria-label="Work in Progress"
    className={cn(
      "wip mb-5 flex items-start gap-3 rounded-lg border p-4",
      "bg-amber-50 border-amber-200 text-amber-900",
      "dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200"
    )}
    role="note"
  >
    <IconTools
      aria-hidden="true"
      className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400"
      stroke={1.5}
    />
    <div className="space-y-1 text-sm">
      <p className="font-semibold">Work in Progress</p>
      <p>
        This section is currently under construction. If you have experience with
        this area and would like to contribute, please check out the{" "}
        <Link
          className="text-amber-700 underline decoration-amber-400 decoration-wavy underline-offset-2 hover:text-amber-800 hover:decoration-2 dark:text-amber-300 dark:hover:text-amber-200"
          href="#corrections-and-contributions"
        >
          Corrections & Contributions
        </Link>{" "}
        section.
      </p>
    </div>
  </div>
);

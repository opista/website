import clsx from "clsx";

import { PencilFilledIcon } from "./icons/pencil-filled-icon";

type SolderingRequirementProps = {
  requiresSoldering?: boolean;
};

export const SolderingRequirement = ({
  requiresSoldering,
}: SolderingRequirementProps) => (
  <div className="mb-5">
    <div
      className={clsx(
        "inline-flex items-center rounded-full bg-red-500 pl-1 pr-2 gap-1 text-white text-sm",
        {
          "bg-green-800": !requiresSoldering,
          "bg-yellow-700": requiresSoldering,
        }
      )}
    >
      <div className="rounded-full bg-white p-1 bg-white/40 flex items-center justify-center">
        <PencilFilledIcon className="size-2" />
      </div>
      <span>
        {requiresSoldering ? "Soldering required" : "No soldering required"}
      </span>
    </div>
  </div>
);

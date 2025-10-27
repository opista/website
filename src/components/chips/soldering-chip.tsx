import { PencilFilledIcon } from "../icons/pencil-filled-icon";

import { Chip } from "./chip";

type SolderingChipProps = {
  requiresSoldering?: boolean;
};

export const SolderingChip = ({ requiresSoldering }: SolderingChipProps) => (
  <Chip
    color={requiresSoldering ? "yellow" : "green"}
    icon={PencilFilledIcon}
    label={requiresSoldering ? "Soldering required" : "No soldering required"}
  />
);

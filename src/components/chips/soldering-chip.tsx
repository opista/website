import { IconPencil } from "@tabler/icons-react";

import { Chip } from "./chip";

type SolderingChipProps = {
  requiresSoldering?: boolean;
};

export const SolderingChip = ({ requiresSoldering }: SolderingChipProps) => (
  <Chip
    color={requiresSoldering ? "yellow" : "green"}
    icon={IconPencil}
    label={requiresSoldering ? "Soldering required" : "No soldering required"}
  />
);

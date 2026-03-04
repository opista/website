import { IconBallpenFilled } from "@tabler/icons-react";

import { Chip } from "./chip";

type SolderingChipProps = {
  requiresSoldering?: boolean;
};

export const SolderingChip = ({ requiresSoldering }: SolderingChipProps) => (
  <Chip
    color={requiresSoldering ? "yellow" : "green"}
    icon={IconBallpenFilled}
    label={
      <>
        <span className="sr-only">Status: </span>
        {requiresSoldering ? "Soldering required" : "No soldering required"}
      </>
    }
  />
);

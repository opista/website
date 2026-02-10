import { IconBarrierBlockFilled } from "@tabler/icons-react";

import { Alert } from "./alert";
import { Link } from "./link";

export const WorkInProgress = () => (
  <Alert icon={IconBarrierBlockFilled} type="warning">
    <p className="font-semibold mb-2">Work in Progress</p>
    <p className="mb-0">
      This section is currently under construction. If you have experience with
      this area and would like to contribute, please check out the{" "}
      <Link href="#corrections-and-contributions">
        Corrections & Contributions
      </Link>{" "}
      section.
    </p>
  </Alert>
);
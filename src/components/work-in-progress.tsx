import { Link } from "./link";

export const WorkInProgress = () => {
  return (
    <>
      <p>This section is currently a work in progress.</p>
      <p>
        If you have experience with this area and would like to contribute,
        please check out the{" "}
        <Link href="#corrections-and-contributions">
          Corrections & Contributions
        </Link>{" "}
        section.
      </p>
    </>
  );
};

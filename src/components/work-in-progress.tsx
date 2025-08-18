import { Link } from "./link";

export const WorkInProgress = () => (
  <div className="mb-5 px-4 py-px bg-[repeating-linear-gradient(45deg,_blue_0,_blue_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-blue-500">
    <p>This section is currently a work in progress.</p>
    <p>
      If you have experience with this area and would like to contribute, please
      check out the{" "}
      <Link href="#corrections-and-contributions">
        Corrections & Contributions
      </Link>{" "}
      section.
    </p>
  </div>
);

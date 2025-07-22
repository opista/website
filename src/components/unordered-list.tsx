import { HTMLAttributes } from "react";

export const UnorderedList = (props: HTMLAttributes<HTMLUListElement>) => (
  <ul {...props} className="my-0" />
);

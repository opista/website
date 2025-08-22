import { Table } from "../table/table";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";
import { Heading } from "../heading";
import { Image } from "../image";
import { Link } from "../link";

type Heading = {
  label: string;
  width?: string;
};
type PurchaseOption = {
  label: string;
  link: string;
};

type Faceplate = {
  name: string;
  image: string;
  purchase: PurchaseOption[];
};

const headings: Heading[] = [
  { label: "Colour", width: "170px" },
  { label: "Image", width: "250px" },
  { label: "Purchase", width: "150px" },
];

export type IpodFaceplateOptionsTableProps = {
  faceplates: Faceplate[];
  generation?: "5th" | "6th/7th";
};

export const IpodFaceplateOptionsTable = ({
  faceplates,
  generation,
}: IpodFaceplateOptionsTableProps) => (
  <Table containerClassName="!mb-0">
    <thead>
      <tr>
        {headings.map((heading) => (
          <TableHeadCell key={heading.label} style={{ width: heading.width }}>
            {heading.label}
          </TableHeadCell>
        ))}
      </tr>
    </thead>
    <tbody>
      {faceplates.map(({ image, name, purchase }) => (
        <tr key={name}>
          <TableBodyCell className="align-top">
            <p className="mt-0">{name}</p>
          </TableBodyCell>
          <TableBodyCell>
            <Image
              alt={`Example of a ${name} ${generation} generation faceplate`}
              className="m-0"
              height={500}
              src={image}
              width={500}
            />
          </TableBodyCell>
          <TableBodyCell className="align-top">
            {purchase.map((option) => (
              <Link className="block" href={option.link} key={option.link}>
                {option.label}
              </Link>
            ))}
          </TableBodyCell>
        </tr>
      ))}
    </tbody>
  </Table>
);

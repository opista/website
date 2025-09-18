import { Heading } from "../heading";
import { Image } from "../image";
import { Link } from "../link";
import { Table } from "../table/table";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";

type Heading = {
  label: string;
  width?: string;
};
type PurchaseOption = {
  label: string;
  link: string;
};

type Plate = {
  name: string;
  image: string;
  purchase: PurchaseOption[];
};

const headings: Heading[] = [
  { label: "Colour", width: "170px" },
  { label: "Image", width: "250px" },
];

export type IpodPlateOptionsTableProps = {
  plates: Plate[];
  generation?: "5th" | "6th/7th";
};

export const IpodPlateOptionsTable = ({
  plates,
  generation,
}: IpodPlateOptionsTableProps) => (
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
      {plates.map(({ image, name, purchase }) => (
        <tr key={name}>
          <TableBodyCell className="align-top">
            <p className="mt-0">{name}</p>
            <div>
              <p className="mb-0">Purchase:</p>
              {purchase.map((option) => (
                <Link className="block" href={option.link} key={option.link}>
                  {option.label}
                </Link>
              ))}
            </div>
          </TableBodyCell>
          <TableBodyCell>
            <Image
              alt={`Example of a ${name} ${generation} generation plate`}
              className="m-0"
              expandable
              height={500}
              src={image}
              width={500}
            />
          </TableBodyCell>
        </tr>
      ))}
    </tbody>
  </Table>
);

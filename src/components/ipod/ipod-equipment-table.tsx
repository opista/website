import { ConditionalWrapper } from "../conditional-wrapper";
import { Table } from "../table/table";
import { TableBodyCell } from "../table/table-body-cell";
import { Link } from "../link";
import { TableHeadCell } from "../table/table-head-cell";

type Heading = {
  label: string;
  width?: string;
};

type Tool = {
  name: string;
  description: string;
  price: {
    label: string;
    link?: string;
  };
};

const headings: Heading[] = [
  { label: "Tool", width: "180px" },
  { label: "Description", width: "350px" },
  { label: "Price", width: "100px" },
];

const tools: Tool[] = [
  {
    name: "iFixit Essential Electronics Toolkit",
    description:
      "A toolkit with all the necessary tools, including a spudger, tweezers, and screwdriver",
    price: {
      label: "~£27",
      link: "https://www.ifixit.com/en-gb/products/essential-electronics-toolkit",
    },
  },
  {
    name: "iSesamo opening tool",
    description:
      "A thin, flat tool used to open the iPod case without damaging it",
    price: {
      label: "~£9",
      link: "https://www.ifixit.com/en-gb/products/isesamo-opening-tool",
    },
  },
];

export const IpodEquipmentTable = () => {
  return (
    <Table>
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
        {tools.map((tool) => (
          <tr key={tool.name}>
            <TableBodyCell>{tool.name}</TableBodyCell>
            <TableBodyCell>{tool.description}</TableBodyCell>
            <TableBodyCell>
              <ConditionalWrapper
                condition={!!tool.price.link}
                wrapper={(children) => (
                  <Link href={tool.price.link as string}>{children}</Link>
                )}
              >
                {tool.price.label}
              </ConditionalWrapper>
            </TableBodyCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

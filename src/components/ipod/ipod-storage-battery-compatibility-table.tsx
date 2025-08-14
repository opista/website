import { ReactNode, FC, Fragment } from "react";
import { CheckCircleIcon } from "../icons/check-circle-icon";
import { CrossCircleIcon } from "../icons/cross-circle-icon";
import { Table } from "../table/table";
import clsx from "clsx";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";
import { BackplateIndicator } from "../backplate-indicator";
import { toSlug } from "@/util/to-slug";
import { ConditionalWrapper } from "../conditional-wrapper";
import { Link } from "../link";
import { Tooltip } from "../tooltip";

type StorageMod =
  | "iFlash Solo"
  | "iFlash Dual"
  | "iFlash Quad"
  | "iFlash Sata"
  | "Generic MicroSD";

type BatteryMod =
  | "650mAh (OEM)"
  | "2000mAh (square)"
  | "2000mAh (rectangle)"
  | "2800mAh (rectangle)"
  | "3000mAh (thin)"
  | "3000mAh (thick)";

type StorageOption = {
  name: StorageMod;
  thick: boolean;
  thin: boolean;
};

type DimensionsOption = {
  link?: string;
  measurements: number[]; // H x W x D
  note?: string;
};

type CompatibilityRow = {
  name: BatteryMod;
  dimensions?: DimensionsOption[];
  storageOptions: StorageOption[];
};

const batteryMap: CompatibilityRow[] = [
  {
    name: "650mAh (OEM)",
    storageOptions: [
      {
        name: "iFlash Solo",
        thick: true,
        thin: true,
      },
      { name: "iFlash Dual", thick: true, thin: true },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: true },
      { name: "Generic MicroSD", thick: true, thin: true },
    ],
  },
  {
    name: "2000mAh (square)",
    dimensions: [
      {
        link: "https://www.aliexpress.com/item/1005008200745392.html",
        measurements: [46.3, 42.6, 5.0],
      },
    ],
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: true },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: false },
      { name: "Generic MicroSD", thick: true, thin: true },
    ],
  },
  {
    name: "2000mAh (rectangle)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: false },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: false },
      { name: "Generic MicroSD", thick: true, thin: true },
    ],
  },
  {
    name: "2800mAh (rectangle)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: false },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: false },
      { name: "Generic MicroSD", thick: true, thin: true },
    ],
  },
  {
    name: "3000mAh (thin)",
    dimensions: [
      {
        link: "https://www.aliexpress.com/item/1005003263973779.html",
        measurements: [82, 50.3, 3.9],
        note: "Be careful when selecting your battery, there are multiple options. You want a depth AT OR BELOW 4mm",
      },
    ],
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: false },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: false },
      { name: "Generic MicroSD", thick: true, thin: false },
    ],
  },
  {
    name: "3000mAh (thick)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: false },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: false },
      { name: "iFlash Sata", thick: true, thin: false },
      { name: "Generic MicroSD", thick: true, thin: false },
    ],
  },
];

const compatibilityMap: Record<
  string,
  { className: string; description: ReactNode | string; icon: FC<IconProps> }
> = {
  true: {
    className: "text-green-600 bg-green-100",
    description: "Compatible",
    icon: CheckCircleIcon,
  },
  false: {
    className: "text-red-600 bg-red-100",
    description: "Incompatible",
    icon: CrossCircleIcon,
  },
};

const CompatibilityCell = ({ level }: { level: string }) => {
  const { className, icon: Icon } = compatibilityMap[level];
  return (
    <TableBodyCell className={clsx("text-center w-[60px]", className)}>
      <Icon className="inline-block size-6" />
    </TableBodyCell>
  );
};

const Key = () => (
  <Table>
    <tbody>
      {Object.entries(compatibilityMap).map(
        ([level, { description, icon }], index) => (
          <tr
            className={clsx({
              "border-t border-[var(--tw-prose-td-borders)]": index > 0,
            })}
            key={icon.name}
          >
            <CompatibilityCell level={level} />
            <TableBodyCell>{description}</TableBodyCell>
          </tr>
        )
      )}
    </tbody>
  </Table>
);

const BatteryDimensions = ({
  dimensions,
}: {
  dimensions: DimensionsOption;
}) => {
  const { link, measurements, note } = dimensions;

  const measurementsFormatted = (
    <>
      <span className="font-bold">H</span> {measurements[0].toFixed(1)}mm x{" "}
      <span className="font-bold">W</span> {measurements[1].toFixed(1)}mm x{" "}
      <span className="font-bold">D</span> {measurements[2].toFixed(1)}mm
    </>
  );

  return (
    <>
      <ConditionalWrapper
        condition={!!link}
        wrapper={(children) => (
          <Link className="text-xs" href={link!}>
            {children}
          </Link>
        )}
      >
        {measurementsFormatted}
      </ConditionalWrapper>
      {note && <Tooltip content={note} />}
    </>
  );
};

export const IpodStorageBatteryCompatibilityTable = () => (
  <>
    <Key />
    <Table containerClassName="!mb-0">
      <thead>
        <tr className="text-center">
          <TableHeadCell border className="w-[260px]">
            Battery Mod
          </TableHeadCell>
          <TableHeadCell border className="w-[180px]">
            Storage Adaptor
          </TableHeadCell>
          <TableHeadCell border className="w-[100px]">
            <BackplateIndicator backplate="thin" />
          </TableHeadCell>
          <TableHeadCell border className="w-[100px]">
            <BackplateIndicator backplate="thick" />
          </TableHeadCell>
        </tr>
      </thead>
      <tbody>
        {batteryMap.map((battery) => (
          <Fragment key={battery.name}>
            <tr>
              <TableBodyCell
                border
                className="align-middle"
                rowSpan={battery.storageOptions.length}
              >
                <div>{battery.name}</div>
                {battery.dimensions?.map((dimensions) => (
                  <BatteryDimensions
                    dimensions={dimensions}
                    key={toSlug(battery.name, ...dimensions.measurements)}
                  />
                ))}
              </TableBodyCell>
              <TableBodyCell border>
                {battery.storageOptions[0].name}
              </TableBodyCell>
              <CompatibilityCell level={`${battery.storageOptions[0].thin}`} />
              <CompatibilityCell level={`${battery.storageOptions[0].thick}`} />
            </tr>
            {battery.storageOptions.slice(1).map((option) => (
              <tr key={toSlug(battery.name, option.name)}>
                <TableBodyCell border>{option.name}</TableBodyCell>
                <CompatibilityCell level={`${option.thin}`} />
                <CompatibilityCell level={`${option.thick}`} />
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </Table>
  </>
);

import { ReactNode, FC } from "react";
import { CheckCircleIcon } from "../icons/check-circle-icon";
import { CrossCircleIcon } from "../icons/cross-circle-icon";
import { Table } from "../table/table";
import clsx from "clsx";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";
import { BackplateIndicator } from "../backplate-indicator";

type StorageMod = "iFlash Solo" | "iFlash Dual" | "iFlash Quad" | "iFlash Sata";
type BatteryMod =
  | "650mAh (OEM)"
  | "2000mAh (square)"
  | "2000mAh (rectangle)"
  | "2800mAh (rectangle)"
  | "3000mAh (thin)"
  | "3000mAh (thick)";

type StorageOption = {
  name: StorageMod;
  note?: string;
  thick: boolean;
  thin: boolean;
};

type CompatibilityRow = {
  name: BatteryMod;
  storageOptions: StorageOption[];
};

const batteryMap: CompatibilityRow[] = [
  {
    name: "650mAh (OEM)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: true },
      { name: "iFlash Dual", thick: true, thin: true },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: true },
    ],
  },
  {
    name: "2000mAh (square)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: true },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: false },
    ],
  },
  {
    name: "2000mAh (rectangle)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: false },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: false },
    ],
  },
  {
    name: "2800mAh (rectangle)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: false },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: false },
    ],
  },
  {
    name: "3000mAh (thin)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: false },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: true },
      { name: "iFlash Sata", thick: true, thin: false },
    ],
  },
  {
    name: "3000mAh (thick)",
    storageOptions: [
      { name: "iFlash Solo", thick: true, thin: false },
      { name: "iFlash Dual", thick: true, thin: false },
      { name: "iFlash Quad", thick: true, thin: false },
      { name: "iFlash Sata", thick: true, thin: false },
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
    <TableBodyCell className={clsx("text-center", className)}>
      <Icon className="inline-block size-6" />
    </TableBodyCell>
  );
};

const Key = () => (
  <Table>
    <tbody>
      {Object.entries(compatibilityMap).map(
        ([level, { description }], index) => (
          <tr
            className={clsx({
              "border-t border-[var(--tw-prose-td-borders)]": index > 0,
            })}
            key={`key-${description}-${level}`}
          >
            <CompatibilityCell level={level} />
            <TableBodyCell>{description}</TableBodyCell>
          </tr>
        )
      )}
    </tbody>
  </Table>
);

export const IpodStorageBatteryCompatibilityTable = () => (
  <>
    <Key />
    <Table>
      <thead>
        <tr className="text-center">
          <TableHeadCell border>Battery Mod</TableHeadCell>
          <TableHeadCell border>Storage Mod</TableHeadCell>
          <TableHeadCell border>
            <BackplateIndicator backplate="thin" />
          </TableHeadCell>
          <TableHeadCell border>
            <BackplateIndicator backplate="thick" />
          </TableHeadCell>
          <TableHeadCell>Notes</TableHeadCell>
        </tr>
        <tr></tr>
      </thead>
      <tbody>
        {batteryMap.map((battery) => (
          <>
            <tr key={battery.name}>
              <TableBodyCell
                className="border-r border-[var(--tw-prose-td-borders)] align-middle"
                rowSpan={battery.storageOptions.length}
              >
                {battery.name}
              </TableBodyCell>
              <TableBodyCell className="border-r border-[var(--tw-prose-td-borders)]">
                {battery.storageOptions[0].name}
              </TableBodyCell>
              <CompatibilityCell level={`${battery.storageOptions[0].thin}`} />
              <CompatibilityCell level={`${battery.storageOptions[0].thick}`} />
              <TableBodyCell>{battery.storageOptions[0].note}</TableBodyCell>
            </tr>
            {battery.storageOptions.slice(1).map((option) => (
              <tr key={`${battery.name}-${option.name}`}>
                <TableBodyCell className="border-r border-[var(--tw-prose-td-borders)]">
                  {option.name}
                </TableBodyCell>
                <CompatibilityCell level={`${option.thin}`} />
                <CompatibilityCell level={`${option.thick}`} />
                <TableBodyCell>{option.note}</TableBodyCell>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </Table>
  </>
);

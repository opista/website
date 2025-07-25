import { Table } from "../table/table";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";
import { FC, ReactNode } from "react";
import { CheckCircleIcon } from "../icons/check-circle-icon";
import { CrossCircleIcon } from "../icons/cross-circle-icon";
import { ExclamationCircleIcon } from "../icons/exclamation-circle-icon";
import clsx from "clsx";
import { InformationIcon } from "../icons/information-icon";
import { Link } from "../link";

type SupportLevel = "full" | "none" | "partial" | "software";

type CapacityOption = {
  capacity: Capacity;
  upgrades: {
    "128GB": SupportLevel;
    "256GB": SupportLevel;
    "512GB": SupportLevel;
    "1TB": SupportLevel;
  };
};

type GenerationConfiguration = {
  generation: Generation;
  capacityOptions: CapacityOption[];
};

const deviceMap: GenerationConfiguration[] = [
  {
    generation: 5,
    capacityOptions: [
      {
        capacity: 30,
        upgrades: {
          "128GB": "full",
          "256GB": "full",
          "512GB": "partial",
          "1TB": "partial",
        },
      },
      {
        capacity: 60,
        upgrades: {
          "128GB": "full",
          "256GB": "full",
          "512GB": "full",
          "1TB": "full",
        },
      },
    ],
  },
  {
    generation: 5.5,
    capacityOptions: [
      {
        capacity: 30,
        upgrades: {
          "128GB": "full",
          "256GB": "full",
          "512GB": "partial",
          "1TB": "partial",
        },
      },
      {
        capacity: 80,
        upgrades: {
          "128GB": "full",
          "256GB": "full",
          "512GB": "full",
          "1TB": "full",
        },
      },
    ],
  },
  {
    generation: 6,
    capacityOptions: [
      {
        capacity: 80,
        upgrades: {
          "128GB": "full",
          "256GB": "software",
          "512GB": "software",
          "1TB": "software",
        },
      },
      {
        capacity: 160,
        upgrades: {
          "128GB": "full",
          "256GB": "software",
          "512GB": "software",
          "1TB": "software",
        },
      },
    ],
  },
  {
    generation: 6.5,
    capacityOptions: [
      {
        capacity: 120,
        upgrades: {
          "128GB": "full",
          "256GB": "software",
          "512GB": "software",
          "1TB": "software",
        },
      },
    ],
  },
  {
    generation: 7,
    capacityOptions: [
      {
        capacity: 160,
        upgrades: {
          "128GB": "full",
          "256GB": "full",
          "512GB": "full",
          "1TB": "full",
        },
      },
    ],
  },
];

const supportLevelMap: Record<
  SupportLevel,
  { className: string; description: ReactNode | string; icon: FC<IconProps> }
> = {
  full: {
    className: "text-green-600 bg-green-100",
    description: "Supported",
    icon: CheckCircleIcon,
  },
  partial: {
    className: "text-yellow-600 bg-yellow-100",
    description:
      "Supported, but you'll reach the RAM's song limit before the storage limit",
    icon: ExclamationCircleIcon,
  },
  software: {
    className: "text-purple-600 bg-purple-100",
    description: (
      <>
        Unsupported, but bypassable by{" "}
        <Link href="#bypassing-6th-generation-storage-limits">
          flashing a newer software version
        </Link>
      </>
    ),
    icon: InformationIcon,
  },
  none: {
    className: "text-red-600 bg-red-100",
    description: "Unsupported",
    icon: CrossCircleIcon,
  },
};

const CompatibilityCell = ({ level }: { level: SupportLevel }) => {
  const { className, icon: Icon } = supportLevelMap[level];
  return (
    <TableBodyCell className={clsx("text-center", className)}>
      <Icon className="inline-block size-6" />
    </TableBodyCell>
  );
};

const Key = () => (
  <Table>
    <tbody>
      {Object.entries(supportLevelMap).map(
        ([level, { description }], index) => (
          <tr
            className={clsx({
              "border-t border-[var(--tw-prose-td-borders)]": index > 0,
            })}
            key={`key-${level}`}
          >
            <CompatibilityCell level={level as SupportLevel} />
            <TableBodyCell>{description}</TableBodyCell>
          </tr>
        )
      )}
    </tbody>
  </Table>
);

export const IpodStorageUpgradeTable = () => (
  <>
    <Key />
    <Table className="text-center">
      <thead>
        <tr>
          <TableHeadCell
            className="border-r border-[var(--tw-prose-td-borders)] align-middle"
            colSpan={2}
            rowSpan={2}
          >
            Generation
          </TableHeadCell>
          <TableHeadCell colSpan={4}>Compatible upgrades</TableHeadCell>
        </tr>
        <tr>
          <TableHeadCell>128GB</TableHeadCell>
          <TableHeadCell>256GB</TableHeadCell>
          <TableHeadCell>512GB</TableHeadCell>
          <TableHeadCell>1TB</TableHeadCell>
        </tr>
      </thead>
      <tbody>
        {deviceMap.map((device) => (
          <>
            <tr key={device.generation}>
              <TableBodyCell
                className="border-r border-[var(--tw-prose-td-borders)] align-middle"
                rowSpan={device.capacityOptions.length}
              >
                {device.generation}
              </TableBodyCell>
              <TableBodyCell className="border-r border-[var(--tw-prose-td-borders)]">
                {device.capacityOptions[0].capacity}GB
              </TableBodyCell>
              {Object.entries(device.capacityOptions[0].upgrades).map(
                ([upgrade, support]) => (
                  <CompatibilityCell
                    key={`${device.generation}-${device.capacityOptions[0].capacity}-${upgrade}`}
                    level={support}
                  />
                )
              )}
            </tr>
            {device.capacityOptions.slice(1).map((option) => (
              <tr key={`${device.generation}-${option.capacity}`}>
                <TableBodyCell className="border-r border-[var(--tw-prose-td-borders)]">
                  {option.capacity}GB
                </TableBodyCell>
                {Object.entries(option.upgrades).map(([upgrade, support]) => (
                  <CompatibilityCell
                    key={`${device.generation}-${option.capacity}-${upgrade}`}
                    level={support}
                  />
                ))}
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </Table>
  </>
);

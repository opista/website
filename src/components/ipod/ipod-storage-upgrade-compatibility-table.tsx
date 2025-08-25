import { FC, Fragment, ReactNode } from "react";
import clsx from "clsx";

import { toSlug } from "@/util/to-slug";
import { CheckCircleIcon } from "../icons/check-circle-icon";
import { CrossCircleIcon } from "../icons/cross-circle-icon";
import { ExclamationCircleIcon } from "../icons/exclamation-circle-icon";
import { IconProps } from "../icons/icon.types";
import { InformationIcon } from "../icons/information-icon";
import { Link } from "../link";
import { Table } from "../table/table";
import { TableBodyCell } from "../table/table-body-cell";
import { TableHeadCell } from "../table/table-head-cell";

import { Capacity, Generation } from "./ipod.types";

type SupportLevel = "firmware" | "full" | "none" | "partial";

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
          "256GB": "firmware",
          "512GB": "firmware",
          "1TB": "firmware",
        },
      },
      {
        capacity: 160,
        upgrades: {
          "128GB": "full",
          "256GB": "firmware",
          "512GB": "firmware",
          "1TB": "firmware",
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
          "256GB": "firmware",
          "512GB": "firmware",
          "1TB": "firmware",
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
  firmware: {
    className: "text-purple-600 bg-purple-100",
    description: (
      <>
        Unsupported, but bypassable by{" "}
        <Link href="#bypassing-6th-generation-storage-limits">
          flashing a newer firmware version
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
    <TableBodyCell
      className={clsx("align-middle text-center w-[60px]", className)}
    >
      <Icon className="inline-block size-6" />
    </TableBodyCell>
  );
};

const Key = () => (
  <Table>
    <tbody>
      {Object.entries(supportLevelMap).map(
        ([level, { description, icon }], index) => (
          <tr
            className={clsx({
              "border-t border-[var(--tw-prose-td-borders)]": index > 0,
            })}
            key={icon.name}
          >
            <CompatibilityCell level={level as SupportLevel} />
            <TableBodyCell>{description}</TableBodyCell>
          </tr>
        )
      )}
    </tbody>
  </Table>
);

export const IpodStorageUpgradeCompatibilityTable = () => (
  <>
    <Key />
    <Table className="text-center" containerClassName="!mb-0">
      <thead>
        <tr>
          <TableHeadCell
            border
            className="align-middle w-[150px]"
            colSpan={2}
            rowSpan={2}
          >
            Generation
          </TableHeadCell>
          <TableHeadCell className="w-[320px]" colSpan={4}>
            Compatible upgrades
          </TableHeadCell>
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
          <Fragment key={device.generation}>
            <tr>
              <TableBodyCell
                border
                className="align-middle"
                rowSpan={device.capacityOptions.length}
              >
                {device.generation}
              </TableBodyCell>
              <TableBodyCell border>
                {device.capacityOptions[0].capacity}GB
              </TableBodyCell>
              {Object.entries(device.capacityOptions[0].upgrades).map(
                ([upgrade, support]) => (
                  <CompatibilityCell
                    key={toSlug(
                      device.generation.toString(),
                      device.capacityOptions[0].capacity.toString(),
                      upgrade
                    )}
                    level={support}
                  />
                )
              )}
            </tr>
            {device.capacityOptions.slice(1).map((option) => (
              <tr
                key={toSlug(
                  device.generation.toString(),
                  option.capacity.toString()
                )}
              >
                <TableBodyCell border>{option.capacity}GB</TableBodyCell>
                {Object.entries(option.upgrades).map(([upgrade, support]) => (
                  <CompatibilityCell
                    key={toSlug(
                      device.generation.toString(),
                      option.capacity.toString(),
                      upgrade
                    )}
                    level={support}
                  />
                ))}
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </Table>
  </>
);

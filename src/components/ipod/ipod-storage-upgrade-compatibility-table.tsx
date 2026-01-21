import { FC, Fragment, ReactNode } from "react";
import { cn } from "@/util/cn";

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
    "2TB": SupportLevel;
  };
};

type GenerationConfiguration = {
  generation: Generation;
  capacityOptions: CapacityOption[];
};

const deviceMap: GenerationConfiguration[] = [
  {
    capacityOptions: [
      {
        capacity: 30,
        upgrades: {
          "1TB": "partial",
          "2TB": "partial",
          "128GB": "full",
          "256GB": "full",
          "512GB": "partial",
        },
      },
      {
        capacity: 60,
        upgrades: {
          "1TB": "full",
          "2TB": "partial",
          "128GB": "full",
          "256GB": "full",
          "512GB": "full",
        },
      },
    ],
    generation: 5,
  },
  {
    capacityOptions: [
      {
        capacity: 30,
        upgrades: {
          "1TB": "partial",
          "2TB": "partial",
          "128GB": "full",
          "256GB": "full",
          "512GB": "partial",
        },
      },
      {
        capacity: 80,
        upgrades: {
          "1TB": "full",
          "2TB": "partial",
          "128GB": "full",
          "256GB": "full",
          "512GB": "full",
        },
      },
    ],
    generation: 5.5,
  },
  {
    capacityOptions: [
      {
        capacity: 80,
        upgrades: {
          "1TB": "firmware",
          "2TB": "firmware",
          "128GB": "full",
          "256GB": "firmware",
          "512GB": "firmware",
        },
      },
      {
        capacity: 160,
        upgrades: {
          "1TB": "firmware",
          "2TB": "firmware",
          "128GB": "full",
          "256GB": "firmware",
          "512GB": "firmware",
        },
      },
    ],
    generation: 6,
  },
  {
    capacityOptions: [
      {
        capacity: 120,
        upgrades: {
          "1TB": "firmware",
          "2TB": "firmware",
          "128GB": "full",
          "256GB": "firmware",
          "512GB": "firmware",
        },
      },
    ],
    generation: 6.5,
  },
  {
    capacityOptions: [
      {
        capacity: 160,
        upgrades: {
          "1TB": "full",
          "2TB": "partial",
          "128GB": "full",
          "256GB": "full",
          "512GB": "full",
        },
      },
    ],
    generation: 7,
  },
];

const supportLevelMap: Record<
  SupportLevel,
  { className: string; description: ReactNode | string; icon: FC<IconProps> }
> = {
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
  full: {
    className: "text-green-600 bg-green-100",
    description: "Supported",
    icon: CheckCircleIcon,
  },
  none: {
    className: "text-red-600 bg-red-100",
    description: "Unsupported",
    icon: CrossCircleIcon,
  },
  partial: {
    className: "text-yellow-600 bg-yellow-100",
    description:
      "Supported, but you'll probably reach the RAM's item limit before the storage limit",
    icon: ExclamationCircleIcon,
  },
};

const CompatibilityCell = ({ level }: { level: SupportLevel }) => {
  const { className, icon: Icon } = supportLevelMap[level];
  return (
    <TableBodyCell
      className={cn("align-middle text-center w-[60px]", className)}
      aria-label={level}
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
            className={cn({
              "border-t border-(--tw-prose-td-borders)": index > 0,
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
    <Table className="text-center" containerClassName="mb-0!">
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
          <TableHeadCell className="w-[320px]" colSpan={5}>
            Compatible upgrades
          </TableHeadCell>
        </tr>
        <tr>
          <TableHeadCell className="text-center">128GB</TableHeadCell>
          <TableHeadCell className="text-center">256GB</TableHeadCell>
          <TableHeadCell className="text-center">512GB</TableHeadCell>
          <TableHeadCell className="text-center">1TB</TableHeadCell>
          <TableHeadCell className="text-center">2TB</TableHeadCell>
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
              <CompatibilityCell level={device.capacityOptions[0].upgrades["128GB"]} />
              <CompatibilityCell level={device.capacityOptions[0].upgrades["256GB"]} />
              <CompatibilityCell level={device.capacityOptions[0].upgrades["512GB"]} />
              <CompatibilityCell level={device.capacityOptions[0].upgrades["1TB"]} />
              <CompatibilityCell level={device.capacityOptions[0].upgrades["2TB"]} />
            </tr>
            {device.capacityOptions.slice(1).map((option) => (
              <tr
                key={toSlug(
                  device.generation.toString(),
                  option.capacity.toString()
                )}
              >
                <TableBodyCell border>{option.capacity}GB</TableBodyCell>
                <CompatibilityCell level={option.upgrades["128GB"]} />
                <CompatibilityCell level={option.upgrades["256GB"]} />
                <CompatibilityCell level={option.upgrades["512GB"]} />
                <CompatibilityCell level={option.upgrades["1TB"]} />
                <CompatibilityCell level={option.upgrades["2TB"]} />
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </Table>
  </>
);

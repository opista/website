"use client";

import LinkButton from "@/components/link-button";
import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/page-title";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Image from "next/image";

export default function AviosReminderPage() {
  const { isBelowSm } = useBreakpoint("sm");
  return (
    <PageLayout className="prose dark:prose-invert" tag="article">
      <div className="flex flex-col sm:flex-row items-center">
        <Image
          alt="Krushme logo"
          className="my-0 mb-2 sm:mb-0 sm:mr-2 rounded-[25%]"
          height={isBelowSm ? 40 : 70}
          src="/apps/krushme/logo.png"
          width={isBelowSm ? 40 : 70}
        />
        <PageTitle className="mb-0">Krushme</PageTitle>
      </div>

      <p>
        Introducing Krushme, where we ensure your Krushem cravings are never
        krushed by an unexpected machine downtime! Our mission is simple: to
        ensure you enjoy your favourite Krushem every time you visit a KFC
        restaurant. With Krushme, you&apos;re always in the know about the
        availability of Krushem machines at your nearest KFC.
      </p>

      <div className="text-center">
        <LinkButton className="mx-auto" href="https://krushme.co.uk/">
          Try Krushme
        </LinkButton>
      </div>

      <Image
        alt="A screenshot of the Krushme website in action"
        height={837}
        src="/apps/krushme/screenshot-1.jpg"
        width={1200}
      ></Image>

      <p className="font-bold">Why You&apos;ll Love Krushme:</p>
      <ul>
        <li>
          <p>
            <span className="inline-block font-bold">
              Stay Informed, Stay Delighted:
            </span>{" "}
            With our finger on the pulse of KFC&apos;s Krushem machines, we show
            you where to head for a guaranteed Krushem delight. Green means go
            for joy, and red means a brief pause in the bliss.
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Krushem Coverage Kingdom-Wide:</span>{" "}
            From John o&apos; Groats to Land&apos;s End, we monitor every KFC
            outlet. You&apos;ll always know where your next Krushem treat
            awaits!
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">More Than Just Krushems:</span>{" "}
            It&apos;s not just about the Krushem status. We also provide you
            with essential info like the opening and closing times of KFC
            outlets, so your plans are as smooth as your favorite shake.
          </p>
        </li>
      </ul>

      <div className="text-center">
        <LinkButton className="mx-auto" href="https://krushme.co.uk/">
          Try Krushme
        </LinkButton>
      </div>
    </PageLayout>
  );
}

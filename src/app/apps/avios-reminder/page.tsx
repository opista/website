"use client";

import LinkButton from "@/components/link-button";
import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/page-title";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Image from "next/image";
import Link from "next/link";

export default function AviosReminderPage() {
  const { isBelowSm } = useBreakpoint("sm");
  return (
    <PageLayout className="prose dark:prose-invert" tag="article">
      <div className="flex flex-col sm:flex-row items-center">
        <Image
          alt="Avios Reminder logo"
          className="my-0 mb-2 sm:mr-2"
          height={isBelowSm ? 40 : 70}
          src="/apps/avios-reminder/logo.png"
          width={isBelowSm ? 40 : 70}
        />
        <PageTitle className="mb-0">Avios Reminder</PageTitle>
      </div>
      <p className="font-bold">
        Effortless Rewards with Avios Reminder - Your Key to Accumulating Points
        Faster
      </p>
      <p>
        Welcome to a world where every online shopping experience becomes more
        rewarding. Introducing Avios Reminder, the browser extension designed to
        turbocharge your Avios point collection.
      </p>

      <div className="text-center">
        <LinkButton
          className="mx-auto"
          href="https://chromewebstore.google.com/detail/avios-reminder/lkcogehgaekpbdgbhalkdijfdbgliecl"
        >
          Try Avios Reminder
        </LinkButton>
      </div>

      <p className="font-bold">Key Features:</p>
      <ul>
        <li>
          <p>
            <span className="inline-block font-bold">
              Shop and Earn Automatically:
            </span>{" "}
            With Avios Reminder, you&apos;re seamlessly connected to hundreds of
            online retailers. Shop as usual, and earn Avios points without any
            extra steps.
          </p>
          <Image
            alt="An image demonstrating a notification alerting the user that they're automatically earning Avios"
            className="mx-auto"
            height={280}
            src="/apps/avios-reminder/screenshot-1.png"
            width={440}
          />
        </li>
        <li>
          <p>
            <span className="font-bold">Easily Discover Deals:</span> Looking
            for the best offers? Our extension&apos;s intuitive search feature
            lets you effortlessly find retailers with attractive Avios deals,
            making it simple to maximize your rewards.
          </p>
          <Image
            alt="An image demonstrating how to search for Avios-rewarding retailers"
            className="mx-auto"
            height={280}
            src="/apps/avios-reminder/screenshot-3.png"
            width={440}
          />
        </li>
        <li>
          <p>
            <span className="font-bold">
              Instant Alerts for Savvy Shoppers:
            </span>{" "}
            Never miss an opportunity to earn points. Get immediate
            notifications when you visit a website offering Avios, ensuring
            every shopping trip is as rewarding as possible.
          </p>
        </li>
        <Image
          alt="An image demonstrating a notification alerting the user that they can earn Avios and need to click through to the BA Shopping website"
          className="mx-auto"
          height={280}
          src="/apps/avios-reminder/screenshot-2.png"
          width={440}
        />
      </ul>
      <p>
        Transform your online shopping into a rewarding journey. Add Avios
        Reminder to your browser today and start turning your everyday purchases
        into exciting rewards!
      </p>

      <div className="text-center">
        <LinkButton
          className="mx-auto"
          href="https://chromewebstore.google.com/detail/avios-reminder/lkcogehgaekpbdgbhalkdijfdbgliecl"
        >
          Try Avios Reminder
        </LinkButton>
      </div>

      <h2 id="faq">Frequently Asked Questions</h2>
      <h3>Are you collecting my data?</h3>

      <p>No! Your personal data is never sent to us.</p>

      <h3>Why don&apos;t all websites appear in the extension?</h3>

      <p>
        We use British Airways&apos; data for display participating retailers.
        We have no control over which retailers are displayed. You can read more
        about that on{" "}
        <Link href="https://www.shopping.ba.com/collection-reminder#why-do-i-not-get-a-reminder-for-all-brands">
          BA&apos;s own FAQs
        </Link>
        . We are looking into alternative methods to list{" "}
        <span className="italic">all</span> retailers!
      </p>

      <h3>Why haven&apos;t Avios appeared in my account after a purchase?</h3>

      <p>
        Please make sure that you aren&apos;t blocking cookies! These are
        important to ensure that BA and the retailer can link the purchase to
        your account. This won&apos;t resolve missing Avios for existing
        purchases, but BA offer the ability to claim for missing Avios{" "}
        <Link href="https://www.shopping.ba.com/my-account/missing-avios">
          here
        </Link>
        .
      </p>

      <p>
        If that doesn&apos;t solve your issue for future purchases, BA offer
        more suggestions under the &quot;How can we help?&quot; section on their{" "}
        <Link href="https://www.shopping.ba.com/collect/how-it-works">
          &quot;How it works&quot; page
        </Link>
        .
      </p>
    </PageLayout>
  );
}

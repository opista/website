"use client";

import LinkButton from "@/components/link-button";
import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/page-title";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Image from "next/image";

export default function SvnBlamerPage() {
  const { isBelowSm } = useBreakpoint("sm");
  return (
    <PageLayout className="prose dark:prose-invert" tag="article">
      <div className="flex flex-col sm:flex-row items-center">
        <Image
          alt="SVN Blamer logo"
          className="my-0 mb-2 sm:mb-0 sm:mr-2 rounded-[25%]"
          height={isBelowSm ? 40 : 70}
          src="/apps/svn-blamer/logo.png"
          width={isBelowSm ? 40 : 70}
        />
        <PageTitle className="mb-0">SVN Blamer</PageTitle>
      </div>

      <p>
        Are you tired of spending hours sifting through SVN logs to identify who
        made changes to a file? Say goodbye to the hassle with SVN Blamer, the
        Visual Studio Code extension designed to streamline your SVN workflow.
      </p>

      <div className="text-center grid gap-2 grid-cols-1 sm:grid-cols-2">
        <LinkButton href="https://marketplace.visualstudio.com/items?itemName=beaugust.blamer-vs">
          Try SVN Blamer on VS Code Marketplace
        </LinkButton>
        <LinkButton href="https://open-vsx.org/extension/beaugust/blamer-vs">
          Try SVN Blamer on VSX Open Registry
        </LinkButton>
      </div>

      <div>
        <Image
          alt="A screenshot of the SVN Blamer extension in action"
          className="mx-auto"
          height={230}
          src="/apps/svn-blamer/example.gif"
          width={600}
        />
      </div>

      <p className="font-bold">SVN Blamer&apos;s core features:</p>
      <ul>
        <li>
          <p>
            <span className="inline-block font-bold">
              Visualize Changes Effortlessly:
            </span>{" "}
            With SVN Blamer, every line of your file is enhanced with colored
            circles, placed conveniently next to line numbers, indicating
            revision groups. Quickly identify which revisions have affected
            specific lines, simplifying the tracking of changes and
            understanding of code evolution.
          </p>
          <p>
            <Image
              alt="A screenshot of the extension with visual indicators"
              className="mx-auto"
              height={782}
              src="/apps/svn-blamer/visual-indicators.png"
              width={391}
            />
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Insight at Your Fingertips</span> Hover
            over any line to reveal a tooltip packed with valuable information:
            the committer&apos;s name, the date of the revision, and the
            accompanying commit message. Gone are the days of guessing who
            altered a particular piece of code—SVN Blamer puts the facts right
            at your fingertips.
          </p>
          <p>
            <Image
              alt="A screenshot demonstrating blame information on hover"
              className="mx-auto"
              height={1207}
              src="/apps/svn-blamer/blame-hover-message.png"
              width={400}
            />
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Customize Your Experience:</span> Tailor
            SVN Blamer to suit your preferences effortlessly, with auto-blaming
            files as you open them. You can also toggle blame on and off
            directly from the toolbar, giving you added control over revision
            information display. Whether you&apos;re immersed in code review or
            debugging, SVN Blamer can be seamlessly adjusted to your workflow,
            ensuring efficient collaboration and analysis.
          </p>
          <p>
            <Image
              alt="A gif demonstrating auto-blame"
              className="mx-auto"
              height={600}
              src="/apps/svn-blamer/auto-blame.gif"
              width={369}
            />
            <Image
              alt="A gif demonstrating how you can toggle blame"
              className="mx-auto"
              height={600}
              src="/apps/svn-blamer/toolbar-toggle.gif"
              width={377}
            />
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">Elevate Your SVN Workflow Today:</span>{" "}
            Experience the power of SVN Blamer and revolutionize your SVN
            workflow in Visual Studio Code. Say goodbye to manual blame tracking
            and hello to streamlined code collaboration. Download SVN Blamer now
            and unlock the full potential of your coding journey
          </p>
        </li>
      </ul>

      <div className="text-center">
        <LinkButton
          className="mx-1"
          href="https://marketplace.visualstudio.com/items?itemName=beaugust.blamer-vs"
        >
          Try SVN Blamer on VS Code Marketplace
        </LinkButton>
        <LinkButton
          className="mx-1"
          href="https://open-vsx.org/extension/beaugust/blamer-vs"
        >
          Try SVN Blamer on VSX Open Registry
        </LinkButton>
      </div>
    </PageLayout>
  );
}

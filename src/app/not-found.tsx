import { Metadata } from "next";

import { Button } from "@/components/button";
import { ContentShell } from "@/components/content-shell";
import { Heading } from "@/components/heading";

export const metadata: Metadata = {
  description: "Perhaps you took a wrong turn somewhere?",
  title: "Not Found - OPISTA",
};

export default function NotFoundPage() {
  return (
    <ContentShell>
      <div className="text-center mt-10">
        <Heading spanClassName="block" level="h1">
          Page not found
        </Heading>
        <p className="my-4">Perhaps you took a wrong turn somewhere?</p>
        <Button center href="/">
          Head home
        </Button>
      </div>
    </ContentShell>
  );
}

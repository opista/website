import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { PageLayout } from "@/components/page-layout";

export default function NotFoundPage() {
  return (
    <PageLayout className="text-center mt-10">
      <Heading level="h1">Page not found</Heading>
      <p className="my-4">Perhaps you took a wrong turn somewhere?</p>
      <Button center href="/">
        Head home
      </Button>
    </PageLayout>
  );
}

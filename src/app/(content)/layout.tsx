import { ContentShell } from "@/components/content-shell";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentShell>{children}</ContentShell>;
}


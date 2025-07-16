import { PageContainer } from "@/components";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageContainer>{children}</PageContainer>;
}

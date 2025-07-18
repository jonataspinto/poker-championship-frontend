import { GoBackButton, PageContainer } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer className="max-w-4xl">
      <GoBackButton />
      {children}
    </PageContainer>
  );
}

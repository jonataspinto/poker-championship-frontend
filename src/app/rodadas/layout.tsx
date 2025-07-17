import { GoBackButton, PageContainer } from "@/components";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <GoBackButton />
        {children}
      </div>
    </PageContainer>
  );
}

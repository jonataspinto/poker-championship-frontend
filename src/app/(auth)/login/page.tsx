import { auth } from "@/auth";
import { PageContainer } from "@/components";
import { LoginGoogleButton } from "@/components/ui/Header/DrawerMenu/LoginGoogleButton";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/perfil");
  }

  return (
    <PageContainer className="flex flex-1 items-center justify-center">
      <LoginGoogleButton />
    </PageContainer>
  );
}

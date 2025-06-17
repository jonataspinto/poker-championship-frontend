import { PageContainer } from "@/components";
import { LoggedUser } from "@/pages/profile";
import { JourneysHistory } from "@/pages/profile";

export default function Perfil() {
  return (
    <PageContainer>
      <LoggedUser />
      <JourneysHistory />
    </PageContainer>
  );
}

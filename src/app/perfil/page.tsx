import { PageContainer } from "@/components";
import { LoggedUser } from "@/containers/profile";
import { JourneysHistory } from "@/containers/profile";

export default function Perfil() {
  return (
    <PageContainer>
      <LoggedUser />
      <JourneysHistory />
    </PageContainer>
  );
}

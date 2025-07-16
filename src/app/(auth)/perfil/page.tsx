import { PageContainer } from "@/components";
import { LoggedUser } from "./_components/LoggedUser";
import { JourneysHistory } from "./_components/JourneysHistory";

export default function Perfil() {
  return (
    <PageContainer>
      <LoggedUser />
      <JourneysHistory />
    </PageContainer>
  );
}

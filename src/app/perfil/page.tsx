import { PageContainer } from "@/components";
import { LoggedUserData } from "./_components/LoggedUserData";
import { JourneyHistory } from "./_components/JourneyHistory";

export default function Perfil() {
  return (
    <PageContainer>
      <LoggedUserData />
      <JourneyHistory />
    </PageContainer>
  );
}

import { LoggedUser } from "./_components/LoggedUser";
import { JourneysHistory } from "./_components/JourneysHistory";

export default function Perfil() {
  return (
    <>
      <LoggedUser />
      <JourneysHistory />
    </>
  );
}

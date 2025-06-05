import { LoggedUserData } from "./_components/LoggedUserData";
import { JourneyHistory } from "./_components/JourneyHistory";

export default function Perfil() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <LoggedUserData />
      <JourneyHistory />
    </div>
  );
}

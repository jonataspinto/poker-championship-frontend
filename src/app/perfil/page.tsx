import { JourneyHistory } from "./_components/JourneyHistory";

export default function Perfil() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>

      <JourneyHistory />
    </div>
  );
}

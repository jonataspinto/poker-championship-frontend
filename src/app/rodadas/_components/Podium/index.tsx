import { ComponentProps } from "react";
import { Avatar } from "@/components";
import "./styles.css";

function PodiumCard({
  name,
  src,
  alt,
  ...props
}: ComponentProps<"div"> & {
  name: string;
  src: string;
  alt: string;
}) {
  return (
    <div {...props}>
      <div className="rounded-2xl bg-gray-200 w-[60px] mx-auto">
        <Avatar
          src={src}
          alt={alt}
          title={name}
          width={60}
          height={60}
          fill={false}
          className="rounded-2xl w-full"
        />
      </div>
      <p className="truncate mt-1 capitalize">{name}</p>
    </div>
  );
}

export async function Podium({
  podium,
  players
}: {
  podium?: Podium;
  players: Map<string, PlayerDTO>;
}) {
  return (
    <div className="podium px-4 overflow-hidden">
      <PodiumCard
        className="first font-bold min-w-28 justify-center"
        name={
          (players.get(podium?.first as string)?.name as string) ?? "Primeiro"
        }
        src={players.get(podium?.first as string)?.photoURL as string}
        alt={(players.get(podium?.first as string)?.name as string) ?? "first"}
      />

      <PodiumCard
        className="second truncate mb-1 justify-center min-w-16"
        name={
          (players.get(podium?.second as string)?.name as string) ?? "Segundo"
        }
        src={players.get(podium?.second as string)?.photoURL as string}
        alt={
          (players.get(podium?.second as string)?.name as string) ?? "second"
        }
      />

      <PodiumCard
        className="third flex mb-1 justify-center min-w-16"
        name={
          (players.get(podium?.third as string)?.name as string) ?? "Terceiro"
        }
        src={players.get(podium?.third as string)?.photoURL as string}
        alt={(players.get(podium?.third as string)?.name as string) ?? "third"}
      />

      <div className="first-base py-4 font-bold text-center">1</div>
      <div className="second-base py-4 font-bold text-center">2</div>
      <div className="third-base py-4 font-bold text-center">3</div>
    </div>
  );
}

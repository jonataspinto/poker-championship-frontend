import { ComponentProps } from "react";
import { Avatar } from "../ui";

function Root(props: ComponentProps<"table">) {
  return (
    <table
      {...props}
      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    />
  );
}
function THead() {
  const cols = [
    { name: "id", label: "#" },
    { name: "name", label: "Ranking" },
    { name: "points", label: "Pontos" }
    // { name: "firsts", label: "1º" },
    // { name: "seconds", label: "2º" },
    // { name: "thirds", label: "3º" },
    // { name: "fourths", label: "4º" },
    // { name: "fifths", label: "5º" }
  ];
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {cols.map((col) => (
          <th
            key={col.name}
            scope="col"
            className="px-6 py-3 text-left whitespace-nowrap"
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function BodyLine({
  player,
  position
}: {
  player: PlayerDTO;
  position: number;
}) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {position}
      </td>
      <td className="px-6 py-4 whitespace-nowrap capitalize flex items-center gap-2">
        <div className="relative rounded-full overflow-hidden bg-gray-200 w-[40px] h-[40px] flex items-center justify-center">
          <Avatar
            fill
            src={player.photoURL || ""}
            alt={player.name}
            title={player.name}
            className="object-cover w-full"
          />
        </div>
        {player.name}
      </td>
      <td className="px-6 py-4">{player.points}</td>
      {/* {Object.keys(player.podiums).map((podium) => (
        <td key={podium} className="px-6 py-4">
          {player.podiums[podium as keyof PlayerPodium]}
        </td>
      ))} */}
    </tr>
  );
}

function TBody({ players }: { players: PlayerDTO[] }) {
  return (
    <tbody>
      {players.map((player, index) => (
        <BodyLine key={player.id} player={player} position={index + 1} />
      ))}
    </tbody>
  );
}

export const PlayersTable = {
  Root,
  Head: THead,
  Body: TBody
};

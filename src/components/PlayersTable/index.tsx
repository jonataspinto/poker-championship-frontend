function THead() {
  const cols = [
    // { name: "id", label: "#" },
    { name: "name", label: "Nome" },
    { name: "points", label: "Pontos" },
    { name: "firsts", label: "1º" },
    { name: "seconds", label: "2º" },
    { name: "thirds", label: "3º" },
    { name: "fourths", label: "4º" },
    { name: "fifths", label: "5º" }
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

function BodyLine({ player }: { player: PlayerDTO }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      {/* <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Image
          src={player.photoURL || ""}
          alt={player.name}
          className="rounded-full"
          width={100}
          height={100}
        />
      </th> */}
      <td className="px-6 py-4 whitespace-nowrap capitalize">{player.name}</td>
      <td className="px-6 py-4">{player.points}</td>
      {Object.keys(player.podiums).map((podium) => (
        <td key={podium} className="px-6 py-4">
          {player.podiums[podium as keyof PlayerPodium]}
        </td>
      ))}
    </tr>
  );
}

function TBody({ players }: { players: PlayerDTO[] }) {
  return (
    <tbody>
      {players.map((player) => (
        <BodyLine key={player.id} player={player} />
      ))}
    </tbody>
  );
}

export const PlayersTable = {
  Head: THead,
  Body: TBody
};

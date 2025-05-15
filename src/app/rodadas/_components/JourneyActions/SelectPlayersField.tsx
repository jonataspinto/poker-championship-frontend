import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function SelectPlayersField({
  label,
  players,
  name,
  defaultValue,
  ...restProps
}: ComponentProps<"select"> & {
  label: string;
  name: string;
  players: Map<string, PlayerDTO>;
}) {
  const capitalizedName = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const validatedDefaultValue = defaultValue ? (defaultValue as string) : "";

  return (
    <div className={twMerge("flex flex-col gap-2", restProps.className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={players?.get(validatedDefaultValue)?.id ?? ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>Selecione</option>
        {Array.from(players?.values()).map((player) => (
          <option key={player.id} value={player.id}>
            {capitalizedName(player.name)}
          </option>
        ))}
      </select>
    </div>
  );
}

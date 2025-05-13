import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { revalidateTag } from "next/cache";
import { updateJourney } from "@/services/actions";
import { SubmitButton } from "./SubmitButton";

function SelectField({
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

export function JourneyPodiumForm({
  journey,
  players
}: {
  journey: JourneyDTO;
  players: Map<string, PlayerDTO>;
}) {
  async function handleSubmit(formData: FormData) {
    "use server";

    const bestHand = formData.get("bestHand") as string;
    const biggestEliminator = formData.get("biggestEliminator") as string;
    const podium: Podium = {
      first: formData.get("first") as string,
      second: formData.get("second") as string,
      third: formData.get("third") as string,
      fourth: formData.get("fourth") as string,
      fifth: formData.get("fifth") as string
    };

    const payload: Partial<Journey> = {
      bestHand,
      biggestEliminator,
      podium
    };

    const response = await updateJourney(journey.id, payload);

    if (response) {
      revalidateTag("list-journeys");
    }
  }

  return (
    <form className="flex flex-col gap-4 w-full h-full" action={handleSubmit}>
      <SelectField
        name="first"
        label="Primeiro lugar"
        players={players}
        defaultValue={journey?.podium?.first}
      />
      <SelectField
        name="second"
        label="Segundo lugar"
        players={players}
        defaultValue={journey?.podium?.second}
      />
      <SelectField
        name="third"
        label="Terceiro lugar"
        players={players}
        defaultValue={journey?.podium?.third}
      />
      <SelectField
        name="fourth"
        label="Quarto lugar"
        players={players}
        defaultValue={journey?.podium?.fourth}
      />
      <SelectField
        name="fifth"
        label="Quinto lugar"
        players={players}
        defaultValue={journey?.podium?.fifth}
      />
      <SelectField
        name="bestHand"
        label="Melhor mão"
        players={players}
        defaultValue={journey?.bestHand}
      />
      <SelectField
        players={players}
        label="Maior eliminador"
        name="biggestEliminator"
        className="mb-auto"
        defaultValue={journey?.biggestEliminator}
      />
      <SubmitButton className="mt-8" />
    </form>
  );
}

import React from "react";
import { IJourney, IPlayer, Status } from "../../../../interfaces"
import { JourneyListItem } from "./JourneyListItem";
import { JourneyListItemSkeleton } from "./JourneyListItemSkeleton";

interface JourneyListProps {
  journeys: IJourney[],
  players: IPlayer[],
  status?: Status
}

export const JourneyList = ({
  journeys = [],
  players = [],
  status
}: JourneyListProps) => {

  return (status === Status.LOADING ? <JourneyListItemSkeleton /> :
    <>
      {journeys.map((journey) => (
        <JourneyListItem
          key={journey.id}
          journey={journey}
          players={players}
        />
      ))}
    </>
  )
};

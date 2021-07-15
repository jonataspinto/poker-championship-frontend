import React, { createContext, ReactNode } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { JourneyServices } from "../../services";
import { IJourney, INewJourney } from "../../interfaces";

interface IJourneyContextProvider {
  children: ReactNode;
}

interface IJourneyContext {
  journeys: Array<IJourney>;
  fetchJourneys: () => Promise<void>;
  createJourney: (journeyData: INewJourney) => Promise<void>;
  updateJourney: (journeyData: IJourney) => Promise<void>;
  closeJourney: (journeyId: string) => Promise<void>;
}

export const JourneyContext = createContext<IJourneyContext>({} as IJourneyContext)

export const JourneyProvider = ({ children }: IJourneyContextProvider) => {
  const [journeys, setJourneys] = useState<Array<IJourney>>([]);

  const fetchJourneys = useCallback(async () => {
    try {
      const data = await JourneyServices.getAllJourneys();
      setJourneys(data);
    } catch (error) {
      console.error(error?.response)
    }
  }, [

  ])

  const createJourney = useCallback(async (journeyData: INewJourney) => {
    try {
      const data = await JourneyServices.createNewJourney(journeyData);
      setJourneys(prevState => ([
        data,
        ...prevState
      ]));
    } catch (error) {
      console.error(error?.response)
    }
  }, [

  ])

  const updateJourney = useCallback(async (journeyData: IJourney) => {
    try {
      const data = await JourneyServices.updateJourney(journeyData);

      setJourneys(prevState => {
        const draftStateJourneys = prevState;

        draftStateJourneys.splice(
          prevState.findIndex((journey) => (
            journey.uuid === data.uuid
          )),
          1,
          data,
        );

        return draftStateJourneys;
      });
    } catch (error) {
      console.error(error?.response)
    }
  }, [

  ])

  const closeJourney = useCallback(async (journeyId: string) => {
    try {
      await JourneyServices.closeJourney(journeyId);

      setJourneys(prevState => {
        const draftStateJourneys = prevState;

        draftStateJourneys.splice(
          prevState.findIndex((journey) => (
            journey.id === journeyId
          )),
          1
        );

        return draftStateJourneys;
      });
    } catch (error) {
      console.error(error?.response)
    }
  }, [])

  return (
    <JourneyContext.Provider
      value={{
        journeys,
        fetchJourneys,
        createJourney,
        updateJourney,
        closeJourney
      }}
    >
      {children}
    </JourneyContext.Provider>
  )
}

import React, { createContext, ReactNode } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { JourneyServices, RefreshIdToken } from "../../services";
import { IJourney, INewJourney } from "../../shared/interfaces";
import { useAuth } from "../Auth";

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
  const { logoutGoogle } = useAuth();

  const fetchJourneys = useCallback(async () => {
    try {
      const data = await JourneyServices.getAllJourneys();
      setJourneys(data);
    } catch (error) {
      if (error?.response?.data?.code === "auth/id-token-expired") {
        await RefreshIdToken(({ status }: { status: string }) => {
          if (status === "success") {
            return fetchJourneys();
          }
          logoutGoogle();
        });
      }
    }
  }, [
    logoutGoogle
  ])

  const createJourney = useCallback(async (journeyData: INewJourney) => {
    try {
      const data = await JourneyServices.createNewJourney(journeyData);
      setJourneys(prevState => ([
        data,
        ...prevState
      ]));
    } catch (error) {
      if (error?.response?.data?.code === "auth/id-token-expired") {
        await RefreshIdToken(({ status }: { status: string }) => {
          if (status === "success") {
            return createJourney(journeyData);
          }
          logoutGoogle();
        });
      }
    }
  }, [
    logoutGoogle
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
      if (error?.response?.data?.code === "auth/id-token-expired") {
        await RefreshIdToken(({ status }: { status: string }) => {
          if (status === "success") {
            return updateJourney(journeyData);
          }
          logoutGoogle();
        });
      }
    }
  }, [
    logoutGoogle
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
      if (error?.response?.data?.code === "auth/id-token-expired") {
        await RefreshIdToken(({ status }: { status: string }) => {
          if (status === "success") {
            return closeJourney(journeyId);
          }
          logoutGoogle();
        });
      }
    }
  }, [
    logoutGoogle
  ])

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

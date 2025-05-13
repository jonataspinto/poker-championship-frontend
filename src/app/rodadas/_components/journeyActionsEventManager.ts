import { EventManager } from "@/utils/EventManager";

export enum JOURNEY_ACTIONS_EVENT_KEY {
  UPDATE = "JOURNEY_UPDATE",
  CREATE = "JOURNEY_CREATE"
}

export const journeyActionsEventManager = new EventManager();

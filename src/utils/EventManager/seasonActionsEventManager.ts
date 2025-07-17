import { EventManager } from "./EventManager";

export enum SEASON_ACTIONS_EVENT_KEY {
  UPDATE = "SEASON_UPDATE",
  CREATE = "SEASON_CREATE"
}

export const seasonActionsEventManager = new EventManager();

import { journeyMock, playersListMock } from "_mock";
import { MapPodiumJourney } from "./MapPodiumJourney";

describe("Test map podium players.", () => {
  test("should to return podium, closedBy and otherScorers with data of players.", () => {
    const mapedPodium = MapPodiumJourney(journeyMock, playersListMock);

    expect(mapedPodium).toMatchObject({
      closedBy: {},
      podiums: {},
      otherScorers: {}
    });
  })
})

import { journeyMock } from "_mock/journey-mock";
import { JourneyIsComplete } from "./JourneyIsComplete";

describe("Test", () => {
  test("should to verify if podium, bestHand and biggestEliminator is complete.", () => {
    const formatedString = JourneyIsComplete(journeyMock);

    expect(formatedString).toBe(true);
  })

  test("should to verify if podium, bestHand and biggestEliminator is complete and return false", () => {
    const formatedString = JourneyIsComplete({...journeyMock, bestHand: ""});

    expect(formatedString).toBe(false);
  })
})

import { IJourney } from "../interfaces";

export const JourneyIsComplete = (journey: IJourney) => {
  let isValid = false;

  const { podium, biggestEliminator, bestHand } = journey;

  const ValuesOfKeys = Object.values({ ...podium, biggestEliminator, bestHand })

  ValuesOfKeys.forEach((key) => {
    if(key) {
      isValid = true
    } else {
      isValid = false
    }
  })

  return isValid
}

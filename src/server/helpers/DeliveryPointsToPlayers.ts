import { JourneyPoints } from "@/utils/constants";

export class DeliveryPointsToPlayers {
  private podium: Podium;

  private bestHand: string;

  private biggestEliminator: string;

  private playersRepository: PlayerRepository;

  constructor(journeyData: Journey, playersRepository: PlayerRepository) {
    this.podium = journeyData.podium || ({} as Podium);
    this.bestHand = journeyData.bestHand || "";
    this.biggestEliminator = journeyData.biggestEliminator || "";
    this.playersRepository = playersRepository;
  }

  async deliveryPodium(): Promise<void> {
    const podium = Object.entries(this.podium) as [
      keyof PlayerPodium,
      string
    ][];

    podium.forEach(async (podiumPosition) => {
      const key = podiumPosition[0];
      const value = podiumPosition[1];
      if (key && value) {
        const player = await this.playersRepository.findById(value);

        const {
          id,
          points = 0,
          podiums = {
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 0
          },
          ...rest
        } = player;

        await this.playersRepository.update(id, {
          ...rest,
          points: points + JourneyPoints[key],
          podiums: {
            ...player.podiums,
            [key]: (podiums?.[key] || 0) + 1
          }
        });
      }
    });
  }

  async deliveryBiggestEliminator(): Promise<void> {
    if (this.biggestEliminator) {
      const player = await this.playersRepository.findById(
        this.biggestEliminator
      );

      const { id, points = 0, ...rest } = player;

      await this.playersRepository.update(id, {
        ...rest,
        points: points + JourneyPoints.biggestEliminator
      });
    }
  }

  async deliveryBestHandPoints(): Promise<void> {
    if (this.bestHand) {
      const player = await this.playersRepository.findById(this.bestHand);

      const { id, points = 0, ...rest } = player;

      await this.playersRepository.update(id, {
        ...rest,
        points: points + JourneyPoints.bestHand
      });
    }
  }
}

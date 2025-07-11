import { JourneyPoints, PlayerMapper } from "@/utils";

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

    await Promise.all(
      podium.map(async (podiumData) => {
        const podiumPosition = podiumData[0];
        const podiumUserId = podiumData[1];

        if (podiumPosition && podiumUserId) {
          const player = await this.playersRepository.findById(podiumUserId);

          const payload = this.deliveryPodiumPoints(podiumPosition, player);

          return this.playersRepository.update(podiumUserId, payload);
        }
      })
    );
  }

  deliveryPodiumPoints(podiumPosition: keyof PlayerPodium, player: PlayerDTO) {
    const {
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

    return PlayerMapper.toPersistence({
      ...rest,
      points: points + JourneyPoints[podiumPosition],
      podiums: {
        ...player.podiums,
        [podiumPosition]: (podiums?.[podiumPosition] || 0) + 1
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

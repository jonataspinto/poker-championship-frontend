import { sanitizeObject } from "@/utils";
import { DeliveryPointsToPlayers } from "../helpers/";

export class JourneyController implements Controller<JourneyDTO> {
  private journeysRepository: Repository<Journey, JourneyDTO>;
  private playersRepository: PlayerRepository;
  private journeyTagsRepository: Repository<JourneyTag, JourneyTagDTO>;
  private seasonsRepository: Repository<Season, SeasonDTO>;

  constructor(
    journeysRepository: Repository<Journey, JourneyDTO>,
    playersRepository: PlayerRepository,
    journeyTagsRepository: Repository<JourneyTag, JourneyTagDTO>,
    seasonsRepository: Repository<Season, SeasonDTO>
  ) {
    this.journeysRepository = journeysRepository;
    this.playersRepository = playersRepository;
    this.journeyTagsRepository = journeyTagsRepository;
    this.seasonsRepository = seasonsRepository;
  }

  index = async (playerId?: string) => {
    const journeys = await this.journeysRepository.findAll({
      ...(!!playerId && { players: [playerId] })
    });

    const orderedList = journeys?.sort((a, b) => b.tag - a.tag);

    return orderedList;
  };

  store = async (payload: Pick<Journey, "seasonId" | "players">) => {
    const season = await this.seasonsRepository.findById(payload?.seasonId);

    if (season.hasClosed) {
      throw new Error("this season is closed");
    }

    const tag = await this.journeyTagsRepository.create(payload);

    const newJourney = await this.journeysRepository.create({
      ...payload,
      tag: tag.tagNumber,
      hasClosed: false
    });

    return newJourney;
  };

  show = async (id?: string) => {
    if (!id) {
      return;
    }

    const journey = await this.journeysRepository.findById(id);

    if (!journey) {
      return;
    }

    return journey;
  };

  update = async (id: string, payload: Partial<Journey>) => {
    const journeyExists = await this.journeysRepository.findById(id);

    if (!journeyExists) {
      throw new Error("journey not found");
    }

    if (journeyExists.hasClosed) {
      throw new Error("this journey is closed");
    }

    const updatedData = await this.journeysRepository.update(
      id,
      payload as Journey
    );

    return updatedData;
  };

  delete = async (id: string) => {
    await this.journeysRepository.delete(id);

    return id;
  };

  closeJourney = async (id: string, userId: string) => {
    const journey = await this.journeysRepository.findById(id);

    if (journey.hasClosed) {
      throw new Error("this journey is already closed");
    }

    const payload = {
      ...sanitizeObject<Journey>(journey),
      hasClosed: true,
      closedBy: userId
    } as Journey;

    const deliveryPointsToPlayers = new DeliveryPointsToPlayers(
      payload,
      this.playersRepository
    );

    const updatedData = await this.journeysRepository.update(id, payload);

    await deliveryPointsToPlayers.deliveryPodium();
    await deliveryPointsToPlayers.deliveryBiggestEliminator();
    await deliveryPointsToPlayers.deliveryBestHandPoints();

    return updatedData;
  };
}

import { Request, Response } from "express";
// import { DeliveryPointsToPlayers } from "../helpers/";

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

  // store = async (request: Request, response: Response) => {
  //   const payload = request.body;

  //   const season = await this.seasonsRepository.findById(payload.seasonId);

  //   if (season.hasClosed) {
  //     response.status(400).json({ error: "this season is closed" });
  //     return;
  //   }

  //   const tag = await this.journeyTagsRepository.create(payload);

  //   const newJourney = await this.journeysRepository.create({
  //     ...payload,
  //     tag: tag.tagNumber,
  //     hasClosed: false,
  //     bestHand: null,
  //     closedBy: null,
  //     biggestEliminator: null,
  //     podium: null
  //   });

  //   response.status(201).json(newJourney);
  // };

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

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    await this.journeysRepository.delete(id);

    response.sendStatus(204);
  };

  // closeJourney = async (request: Request, response: Response) => {
  //   const { id } = request.params;
  //   const { authorization = "" } = request.headers;

  //   const journey = await this.journeysRepository.findById(id);

  //   if (journey.hasClosed) {
  //     response.status(400).json({ error: "this journey is closed" });
  //     return;
  //   }
  //   const deliveryPointsToPlayers = new DeliveryPointsToPlayers(journey);

  //   const useEmail = await this.auth.getEmailByToken(
  //     authorization.split("Bearer ")[1]
  //   );

  //   const player = await this.playersRepository?.findByEmail?.(useEmail);

  //   if (!player) {
  //     response.status(404).json({ error: "player not found" });
  //     return;
  //   }

  //   journey.hasClosed = true;
  //   journey.closedBy = player.id;

  //   const updatedData = await this.journeysRepository.update(id, journey);

  //   await Promise.all([
  //     deliveryPointsToPlayers.deliveryPodium(),
  //     deliveryPointsToPlayers.deliveryBestHandPoints(),
  //     deliveryPointsToPlayers.deliveryBiggestEliminator()
  //   ]);

  //   response.json(updatedData);
  // };
}

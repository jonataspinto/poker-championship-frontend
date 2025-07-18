export class SeasonController implements Controller<SeasonDTO> {
  private seasonsRepository: Repository<Season, SeasonDTO>;

  constructor(seasonsRepository: Repository<Season, SeasonDTO>) {
    this.seasonsRepository = seasonsRepository;
  }

  index = async () => {
    const seasons = await this.seasonsRepository.findAll();

    const orderedList = seasons.sort((a, b) => b.tag - a.tag);

    return orderedList;
  };

  store = async (payload: Season) => {
    const seasons = await this.seasonsRepository.findAll();

    const hasOpenSeason = !!seasons.find((season) => !season.hasClosed);

    if (hasOpenSeason) {
      throw new Error("There is already an open season");
    }

    const lastSeasonTag = seasons[0]?.tag || 0;

    const newSeason = await this.seasonsRepository.create({
      ...payload,
      tag: lastSeasonTag + 1
    });

    return newSeason;
  };

  show = async (id?: string) => {
    if (!id) {
      throw new Error("Season ID is required");
    }

    const season = await this.seasonsRepository.findById(id);

    if (!season) {
      throw new Error(`Season with id ${id} not found`);
    }

    return season as SeasonDTO;
  };

  update = async (id: string, payload: Season) => {
    const seasonExists = await this.seasonsRepository.findById(id);

    if (!seasonExists) {
      throw new Error(`Season with id ${id} not found`);
    }

    if (seasonExists.hasClosed) {
      throw new Error("This season is closed and cannot be updated");
    }

    const updatedSeason = await this.seasonsRepository.update(id, payload);

    return updatedSeason as SeasonDTO;
  };

  delete = async (id: string) => {
    await this.seasonsRepository.delete(id);

    return id;
  };

  closeSeason = async (userId: string) => {
    const seasons = await this.index();

    const season = { ...seasons?.[0] };

    if (!season) {
      throw new Error(`Season not found`);
    }

    if (season.hasClosed) {
      throw new Error("The last season is already closed");
    }

    const updatedSeason = await this.seasonsRepository.update(season?.id, {
      hasClosed: true,
      closedBy: userId
    } as Season);

    return updatedSeason;
  };
}

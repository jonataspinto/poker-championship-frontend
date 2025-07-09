export class SeasonsRepository implements Repository<Season, SeasonDTO> {
  constructor(private dbProvider: IDBProvider<Season, SeasonDTO>) {}

  async create(payload: Season) {
    return this.dbProvider.save(payload);
  }

  async findAll(query?: Record<string, string | number | Array<unknown>>) {
    const [queryKey, queryValue] = Object.entries(query || {})?.[0] ?? [];

    return this.dbProvider.getAll(queryKey, queryValue);
  }

  async findById(id: string) {
    return this.dbProvider.getById(id);
  }

  async delete(id: string) {
    return this.dbProvider.delete(id);
  }

  async update(id: string, payload: Season) {
    return this.dbProvider.update(id, payload);
  }
}

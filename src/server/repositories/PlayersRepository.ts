export class PlayersRepository implements PlayerRepository {
  private dbProvider;

  constructor(dbProvider: IDBProvider<Player, PlayerDTO>) {
    this.dbProvider = dbProvider;
  }

  async create(payload: Player) {
    const data = await this.dbProvider?.save?.(payload);

    if (!data) {
      throw new Error("Failed to create player");
    }

    return data;
  }

  async findAll() {
    const data = await this?.dbProvider?.getAll?.();
    return data as PlayerDTO[];
  }

  async findById(id: string) {
    const data = await this.dbProvider?.getById?.(id);
    return data as PlayerDTO;
  }

  async findByEmail(email: string) {
    const data = await this.dbProvider?.getByEmail?.(email);

    if (!data) {
      throw new Error("Player not found");
    }

    return data;
  }

  async delete(id: string) {
    const data = await this.dbProvider?.delete?.(id);

    if (!data) {
      throw new Error("Failed to delete player");
    }

    return data;
  }

  async update(id: string, payload: Player) {
    const data = await this.dbProvider?.update?.(id, payload);

    if (!data) {
      throw new Error("Failed to update player");
    }

    return data;
  }
}

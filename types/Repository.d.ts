interface Repository<T, DTO> {
  create: (payload: T) => Promise<DTO>;
  findAll: (
    query?: Record<string, string | number | Array<unknown>>
  ) => Promise<Array<DTO>>;
  findById: (id: string) => Promise<DTO>;
  delete: (id: string) => Promise<string>;
  update: (id: string, payload: T) => Promise<DTO>;
}

interface PlayerRepository extends Repository<Player, PlayerDTO> {
  findByEmail: (email: string) => Promise<PlayerDTO>;
}

interface Controller<DTO = unknown> {
  index: (query?: string) => Promise<DTO[]>;

  show: (id?: string) => Promise<DTO | undefined>;
}

interface Controller<DTO = unknown> {
  index: () => Promise<DTO[]>;

  show: (id?: string) => Promise<DTO | undefined>;
}

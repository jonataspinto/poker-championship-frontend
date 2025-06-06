type PageProps<T extends string = string, K extends string = string> = {
  params: Promise<{
    [P in T]: P extends "slugs" ? string[] : string;
  }>;

  searchParams: Promise<Partial<Record<K, string>>>;
};

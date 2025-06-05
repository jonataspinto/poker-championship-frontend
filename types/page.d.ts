type PageProps<T extends string = string, K extends string = string> = {
  params: {
    [P in T]: P extends "slugs" ? string[] : string;
  };

  searchParams: Partial<Record<K, string>>;
};

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: string;
}

export interface Page<T> {
  results: T[];
  info: Info;
}

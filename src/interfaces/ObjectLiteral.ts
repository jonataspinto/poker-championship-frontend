export interface IObjectLiteral<T> {
  [key: string]: T;
}

export interface IObjectLiteralCall<T> {
  [key: string]: () => T;
}

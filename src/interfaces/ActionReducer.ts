export interface IActionReducer<M, N> {
  type: M,
  payload?: N
}

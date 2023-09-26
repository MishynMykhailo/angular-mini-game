export interface ICells {
  id: number;
  state: CellStatus;
}
export enum CellStatus {
  User = 'user',
  Active = 'active',
  Neutral = 'neutral',
  Destroy = 'destroy',
}

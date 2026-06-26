export interface SignalMapRegion {
  name: string;
  signal: "red" | "blue" | "integrated";
}

export interface PositionCardData {
  defaultPosition: string;
  oppositeCoordinate: string;
  directionBackToCenter: string;
  timeToSpendThere: string;
}

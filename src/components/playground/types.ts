export type ToolType =
  | 'pencil'
  | 'eraser'
  | 'line'
  | 'rectangle'
  | 'filledRectangle'
  | 'oval'
  | 'filledOval'
  | 'sprayCan'
  | 'fillBucket';

export type PatternType =
  | 'solid'
  | 'white'
  | 'checkerboard'
  | 'dots25'
  | 'horizontalLines'
  | 'verticalLines'
  | 'diagonalRight'
  | 'diagonalLeft';

export interface Point {
  x: number;
  y: number;
}

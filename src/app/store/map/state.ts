import { Point } from '@bm/models';

export interface MapState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  activeTool: number;
  grid: Grid;
  background: ImageBitmap;
}

export interface Grid {
  size: number;
  offset: Point;
}

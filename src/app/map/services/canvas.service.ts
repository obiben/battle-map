import { Injectable } from '@angular/core';
import * as Canvas from '@bm/store/canvas';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { Point } from '@bm/models';
import * as Navigation from '@bm/store/navigation';

const FIT_PADDING = 20;

@Injectable()
export class MapCanvas {
  public background: ImageBitmap;
  public context: CanvasRenderingContext2D;
  public element: HTMLCanvasElement;

  public readonly background$ = this.store.pipe(select(Canvas.background));
  public readonly context$ = this.store.pipe(select(Canvas.context));
  public readonly element$ = this.store.pipe(select(Canvas.element));

  constructor(private store: Store<AppState>) {
    this.background$.subscribe(b => this.background = b);
    this.context$.subscribe(c => this.context = c);
    this.element$.subscribe(e => this.element = e);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.store.dispatch(new Canvas.SetCanvas(canvas));
  }

  setBackground(image: ImageBitmap) {
    this.store.dispatch(new Canvas.SetBackground(image));
    this.fitToScreen();
  }

  fitToScreen() {
    const xScale = (this.element.width - FIT_PADDING) / this.background.width;
    const yScale = (this.element.height - FIT_PADDING) / this.background.height;
    const scale = Math.min(xScale, yScale);
    const offset = this.centerImage(this.background, scale);

    this.store.dispatch(new Navigation.SetScale(scale));
    this.store.dispatch(new Navigation.SetPan(offset));
  }

  private centerImage(image: ImageBitmap, scale: number): Point {
    return {
      x: this.element.width / 2 - image.width * scale / 2,
      y: this.element.height / 2 - image.height * scale / 2
    };
  }
}
import { Component } from '@angular/core';
import { MapCanvas, MapGrid } from '@bm/map/services';
import { Point } from '@bm/models';
import { fetchImage } from '@bm/utils';

@Component({
  selector: 'bm-map-settings',
  templateUrl: './map-settings.component.html'
})
export class MapSettingsComponent {
  size: number;
  offset: Point;
  color: string;

  constructor(public grid: MapGrid, private canvas: MapCanvas) {
    this.grid.size$.subscribe(s => this.size = s);
    this.grid.offset$.subscribe(o => this.offset = o);
    this.grid.color$.subscribe(o => this.color = o);
  }

  onLoadImageClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.onchange = this.onBackgroundChange.bind(this);
    document.body.appendChild(input);
    input.click();
  }

  onSizeChange(e: Event) {
    this.grid.setSize(Number((e.target as HTMLInputElement).value));
  }

  onColorChange(color: string) {
    this.grid.setColor(color);
  }

  onOffsetChange(x: any, y: any) {
    this.grid.setOffset({ x: Number(x), y: Number(y) });
  }

  private onBackgroundChange(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    const url = URL.createObjectURL(file);
    fetchImage(url).then(image => this.canvas.setBackground(image));
  }
}

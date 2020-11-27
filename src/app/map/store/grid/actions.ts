import { Action } from '@ngrx/store';
import { Point } from '@bm/models';

export class SetOffset implements Action {
  public static readonly TYPE = '[Grid] Set Offset';
  readonly type = SetOffset.TYPE;
  constructor(public offset: Point) { }
}

export class SetSize implements Action {
  public static readonly TYPE = '[Grid] Set Size';
  readonly type = SetSize.TYPE;
  constructor(public size: number) { }
}

export class SetColor implements Action {
  public static readonly TYPE = '[Grid] Set Color';
  readonly type = SetColor.TYPE;
  constructor(public color: string) { }
}

export type GridActions =
  SetOffset |
  SetSize |
  SetColor;

import { Stuck } from '../Primitive/Stuck';
import { HKT } from '../Primitive/HKT';
import {Length, MakeTArray, Tail, TArray} from './TArray';

export type TNumber = number;

export type Inc<x extends TNumber> = Add<x, 1>;
export interface Inc_ extends HKT {
  params: [TNumber];
  x: this['params'][0];
  result: Inc<this['x']>;
}

export type Add<x extends TNumber, y extends TNumber> = Length<[...MakeTArray<x>, ...MakeTArray<y>]>;
export interface Add_ extends HKT {
  params: [TNumber, TNumber];
  x: this['params'][0];
  y: this['params'][1];
  result: Add<this['x'], this['y']>;
}

//@FIXME: Can't use Length to L directly, this might be bug of TS 4.1
export type Dec<x extends TNumber>
  = Tail<MakeTArray<x>> extends infer L ? L extends TArray ? Length<L> : Stuck : Stuck;
export interface Dec_ extends HKT {
  params: [TNumber];
  x: this['params'][0];
  result: Dec<this['x']>;
}

export type Sub<x extends TNumber, y extends TNumber> = x extends 0 ? 0 : Sub<Dec<x>, Dec<y>>;
export interface Sub_ extends HKT {
  params: [TNumber, TNumber];
  x: this['params'][0];
  y: this['params'][1];
  result: Sub<this['x'], this['y']>;
}

export type Mul<x extends TNumber, y extends TNumber> = x extends 0 ? 0 : y extends 0 ? 0 : Add<Mul<x, Dec<y>>, x>;
export interface Mul_ extends HKT {
  params: [TNumber, TNumber];
  x: this['params'][0];
  y: this['params'][1];
  result: Mul<this['x'], this['y']>;
}

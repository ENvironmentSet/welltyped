import { Stuck } from '../Primitive/Stuck';
import { TType } from '../Primitive/TType';
import { HKT, Apply } from '../Primitive/HKT';
import { If } from './Control';
import { TNumber } from './TNumber';

export type TArray = Array<TType>;
export type Empty = [];

export type MakeTArray<length extends TNumber, initType = unknown, result extends TArray = Empty>
  = Length<result> extends length ? result : MakeTArray<length, initType, [initType, ...result]>;

export type IsEmpty<l extends TArray> = Length<l> extends 0 ? true : false;
export interface IsEmpty_ extends HKT {
  params: [TArray]
  l: this['params'][0];
  result: IsEmpty<this['l']>;
}

export type Head<l extends TArray> = If<IsEmpty<l>, Stuck, l[0]>;
export interface Head_ extends HKT {
  params: [TArray]
  l: this['params'][0];
  result: Head<this['l']>;
}

export type Tail<l extends TArray> = l extends [unknown, ...infer tail] ? tail : Stuck
export interface Tail_ extends HKT {
  params: [TArray]
  l: this['params'][0];
  result: Tail<this['l']>;
}

export type Init<l extends TArray> = l extends [...infer init, unknown] ? init : Stuck;
export interface Init_ extends HKT {
  params: [TArray]
  l: this['params'][0];
  result: Init<this['l']>;
}

export type Last<l extends TArray> = l extends [] ? Stuck : Length<l> extends 1 ? Head<l> : Last<Tail<l>>;
export interface Last_ extends HKT {
  params: [TArray]
  l: this['params'][0];
  result: Last<this['l']>;
}

//@FIXME: Can't return l['length'] directly, seems bug of TS 4.1
export type Length<l extends TArray> = l['length'] extends infer N ? N extends TNumber ? N : Stuck : Stuck;
export interface Length_ extends HKT {
  params: [TArray]
  l: this['params'][0];
  result: Length<this['l']>;
}

export type Cons<car extends TType, cdr extends TArray> = [car, ...cdr];
export interface Cons_ extends HKT {
  params: [TType, TArray]
  car: this['params'][0];
  cdr: this['params'][1];
  result: Cons<this['car'], this['cdr']>;
}

//@FIXME: TS Bug: Using recursive type with 'If' sometime goes wrong.
export type Map<f extends HKT, l extends TArray>
  = IsEmpty<l> extends true ? Stuck : Cons<Apply<f, [Head<l>]>, Map<f, Tail<l>>>;
export interface Map_ extends HKT {
  params: [HKT, TArray];
  f: this['params'][0];
  l: this['params'][1];
  result: Map<this['f'], this['l']>;
}

export type Concat<xs extends TArray, ys extends TArray> = [...xs, ...ys];
export interface Concat_ extends HKT {
  params: [TArray, TArray];
  xs: this['params'][0];
  ys: this['params'][1];
  result: Concat<this['xs'], this['ys']>;
}

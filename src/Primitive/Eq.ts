import { HKT } from '../Primitive/HKT';
import { TType } from '../Primitive/TType';

export type Eq<a, b> =
  (<T>() => T extends a ? never : never) extends (<T>() => T extends b ? never : never) ?
    true : false;
export interface Eq_ extends HKT {
  params: [TType, TType];
  a: this['params'][0];
  b: this['params'][1];
  result: Eq<this['a'], this['b']>;
}

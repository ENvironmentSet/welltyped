import { HKT } from '../Primitive/HKT';
import { TType } from '../Primitive/TType';

export type Intersection<a, b> = a & b;
export interface Intersection_ extends HKT {
  params: [TType, TType]
  a: this['params'][0];
  b: this['params'][1];
  result: Intersection<this['a'], this['b']>;
}

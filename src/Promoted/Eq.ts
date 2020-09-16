import { HKT } from '../Primitive/HKT';
import { TType } from '../Primitive/TType';

export type Eq<a, b> = a extends b ? b extends a ? true : false : false;
export interface Eq_ extends HKT {
  params: [TType, TType];
  a: this['params'][0];
  b: this['params'][1];
  result: Eq<this['a'], this['b']>;
}

import { HKT } from '../Primitive/HKT';
import { TType } from '../Primitive/TType';

export type TypeOfTType<a extends TType, b extends TType> = a extends b ? true : false;
export interface TypeOfTType_ extends HKT {
  params: [TType, TType];
  a: this['params'][0];
  b: this['params'][1];
  result: TypeOfTType<this['a'], this['b']>;
}

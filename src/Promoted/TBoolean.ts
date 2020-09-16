import { HKT } from '../Primitive/HKT';

export type TBoolean = boolean;

export type Not<x extends TBoolean> = x extends true ? false : true;
export interface Not_ extends HKT {
  params: [TBoolean];
  x: this['params'][0]
  result: Not<this['x']>;
}

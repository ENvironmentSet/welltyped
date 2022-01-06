import { HKT } from '../Primitive/HKT';
import { TType } from '../Primitive/TType';
import { TBoolean } from '../Promoted/TBoolean'

export type If<condition extends boolean, then, orElse> = condition extends true ? then : orElse;
export interface If_ extends HKT {
  params: [TBoolean, TType, TType];
  condition: this['params'][0];
  then: this['params'][1];
  orElse: this['params'][2];
  result: If<this['condition'], this['then'], this['orElse']>;
}

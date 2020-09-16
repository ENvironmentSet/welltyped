import { TString } from './TString';
import { TType } from '../Primitive/TType';
import { HKT } from '../Primitive/HKT';
import { Stuck } from '../Primitive/Stuck';

//@TODO Make type families first class.

export type TObject = object;

export type Get<o extends TObject, k extends keyof o> = o[k];
export interface Get_ extends HKT{
  params: [TObject, TString];
  o: this['params'][0];
  k: this['params'][1];
  result: this['k'] extends keyof this['o'] ? Get<this['o'], this['k']> : Stuck;
}

export type Set<o extends TObject, k extends TString, v extends TType>
  = Pick<o, Exclude<keyof o, k>> & Record<k, v>;
export interface Set_ extends HKT{
  params: [TObject, TString, TType];
  o: this['params'][0];
  k: this['params'][1];
  v: this['params'][2];
  result: Set<this['o'], this['k'], this['v']>;
}

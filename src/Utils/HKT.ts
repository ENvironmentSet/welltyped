import { Type } from 'Utils/Type';
import { Apply } from 'Utils/Apply';

export interface HKT<paramKind = Type, resultKind = Type> {
  param: paramKind;
  result: resultKind; //@FIXME: Sometimes result kinds gets wrong, further investigation required.
  _unstableResultKind: resultKind; //Till then, I'm going to use this simple placeholder.
  failed: boolean;
}

export interface TotalHKT<paramKind = Type, resultKind = Type> extends HKT<paramKind, resultKind> {
  failed: false;
}

interface GetHKTInfos extends TotalHKT<[HKT, 'param' | 'result']> {
  result: this['param'][1] extends 'result' ?
      this['param'][0]['_unstableResultKind']
    : this['param'][0][this['param'][1]];
}

export interface GetHKTParamKind extends TotalHKT<HKT> {
  result: Apply<GetHKTInfos, [this['param'], 'param']>;
}

export interface GetHKTResultKind extends TotalHKT<HKT> {
  result: Apply<GetHKTInfos, [this['param'], 'result']>;
}
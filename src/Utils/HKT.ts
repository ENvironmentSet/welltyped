import { Type } from 'Utils/Type';
import { Apply } from 'Utils/Apply';

export interface HKT<paramKind = Type, resultKind = Type> {
  param: paramKind;
  result: resultKind;
  failed: boolean;
}

export interface TotalHKT<paramKind = Type, resultKind = Type> extends HKT<paramKind, resultKind> {
  failed: false;
}

export interface GetHKTInfos extends TotalHKT<[HKT, 'param' | 'result']> {
  result: this['param'][0][this['param'][1]];
}

export interface GetHKTParamKind extends GetHKTInfos {
  result: Apply<GetHKTInfos, [this['param'], 'param']>;
}

export interface GetHKTResultKind extends GetHKTInfos {
  result: Apply<GetHKTInfos, [this['param'], 'result']>;
}
import { Type } from 'Utils/Type';

export interface HKT<paramKind = Type, resultKind = Type> {
  param: paramKind;
  result: resultKind;
  failed: boolean;
}

export interface TotalHKT<paramKind = Type, resultKind = Type> extends HKT<paramKind, resultKind> {
  failed: false;
}
import { Type } from 'Utils/Type';

export interface HKT<paramKind = Type, resultKind = Type> {
  param: paramKind;
  result: resultKind;
  failed: boolean;
}
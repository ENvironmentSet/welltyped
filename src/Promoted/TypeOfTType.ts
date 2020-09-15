import { HKT } from '../Primitive/HKT';
import { DeriveGeneric, UnInitialized } from '../Primitive/UnInitialized';

interface _TypeOfTTypeC<ttype> extends HKT {
  result: this['param'] extends ttype ? true : false;
}
interface _TypeOfTType extends HKT {
  result: _TypeOfTTypeC<this['param']>
}
export type TypeOfTType<param = UnInitialized> = DeriveGeneric<_TypeOfTType, param>;

import { TString } from './TString';
import { TType } from '../Primitive/TType';

//@TODO Make type families first class.

export type TObject = object;
export type Empty = {};

export type Set<tobject extends TObject, propName extends TString, propValue extends TType>
  = Pick<tobject, Exclude<keyof tobject, propName>> & Record<propName, propValue>;

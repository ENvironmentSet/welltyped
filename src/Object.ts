import { TObject, Set, Get } from './Promoted/TObject';
import { TString } from './Promoted/TString';
import { TType } from './Primitive/TType';

export function get<o extends TObject, k extends keyof o>(o: o, k: k): Get<o, k> {
  return o[k];
}

export function set<o extends TObject, k extends TString, v extends TType>(o: o, k: k, v: v): Set<o, k, v> {
  return { ...o, [k]: v } as Set<o, k, v>;
}

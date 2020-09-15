import { TObject, Set } from './Promoted/TObject';
import { TString } from './Promoted/TString';

export const empty = {};

export function get<tobject extends TObject, propName extends keyof tobject>
                   (object: tobject, propName: propName)
                   : tobject[propName] {
  return object[propName];
}

export function set<tobject extends TObject, propName extends TString, propValue>
                      (object: tobject, propName: propName, propValue: propValue)
                      : Set<tobject, propName, propValue> {
  return { ...object, [propName]: propValue } as Set<tobject, propName, propValue>;
}

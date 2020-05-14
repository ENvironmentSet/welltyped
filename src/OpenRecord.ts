import { PhantomTypeParameter } from './Primitive/PhantomTypeParameter';
import { Cons, AnyList, Head, Tail } from './Promoted/List';
import { HKT } from './Primitive/HKT';
import { Stuck } from './Primitive/Stuck';
import { DeriveGeneric, UnInitialized } from './Primitive/UnInitialized';
import { If } from './Promoted/Bool';
import { Eq } from './Promoted/Eq';

type _OpenRecord<record> = object & PhantomTypeParameter<'OpenRecord/record', record>;
export interface OpenRecord<record> extends _OpenRecord<record> {}

export type PropertyKey = keyof any;

export const empty: OpenRecord<[]> = {} as OpenRecord<[]>;
export function unsafeMakeOpenRecord<record>(internal: object): OpenRecord<record> {
  return internal as OpenRecord<record>;
}

interface _IsMember extends HKT {
  result: this['param'] extends [infer key, infer record] ?
    key extends PropertyKey ? {
        base: false;
        recursiveStep: Head<record> extends [infer keyOfHead, infer _] ?
          Eq<[key, keyOfHead]> extends true ?
            true
            : IsMember<[key, Tail<record>]>
          : Stuck;
      }[record extends [] ? 'base' : 'recursiveStep']
      : Stuck
    : Stuck;
}
export type IsMember<param = UnInitialized> = DeriveGeneric<_IsMember, param>;

//@ts-expect-error
export function insert<
  //@TODO: Abstract If<[IsMember<[key, record]>, never, unknown] out constraints
  record extends AnyList, key extends PropertyKey, value extends If<[IsMember<[key, record]>, never, unknown]>
  >(
  key: key,
  value: value,
  openRecord: OpenRecord<record>
): OpenRecord<Cons<[[key, value], record]>> {
  return unsafeMakeOpenRecord({ [key]: value, ...openRecord });
}

interface _Get extends HKT {
  result: this['param'] extends [infer key, infer record] ?
      key extends PropertyKey ? {
        base: never;
        recursiveStep: Head<record> extends [infer keyOfHead, infer value] ?
          Eq<[key, keyOfHead]> extends true ?
            value
            : Get<[key, Tail<record>]>
          : Stuck;
      }[record extends [] ? 'base' : 'recursiveStep']
      : Stuck
    : Stuck;
}
type Get<param = UnInitialized> = DeriveGeneric<_Get, param>;

export function get<record extends AnyList, key extends PropertyKey>(
  key: key,
  record: OpenRecord<record>
): Get<[key, record]> {
  //@ts-expect-error
  return record[key];
}

interface _Set extends HKT {
  result: this['param'] extends [infer key, infer value, infer record] ?
    key extends PropertyKey ? {
        base: OpenRecord<[]>;
        recursiveStep: Head<record> extends [infer keyOfHead, infer valueOfHead] ?
          Eq<[key, keyOfHead]> extends true ?
            OpenRecord<Cons<[[key, value], Tail<record>]>>
            : Set<[key, value, Tail<record>]> extends OpenRecord<infer updatedLast> ?
            OpenRecord<Cons<[[keyOfHead, valueOfHead], updatedLast]>>
              : Stuck
          : Stuck;
      }[record extends [] ? 'base' : 'recursiveStep']
      : Stuck
    : Stuck;
}
type Set<param = UnInitialized> = DeriveGeneric<_Set, param>;

//@ts-expect-error
export function set<
  record extends AnyList, key extends PropertyKey, value extends If<[IsMember<[key, record]>, unknown, never]>
  >(
  key: key,
  value: value,
  openRecord: OpenRecord<record>
): Set<[key, value, record]> {
  //@ts-expect-error
  return unsafeMakeOpenRecord({ ...openRecord, ...{ [key]: value } });
}

export function modify<
  record extends AnyList, key extends PropertyKey, R
  >(
    key: key,
    f: (x: Get<[key, record]>) => R,
    openRecord: OpenRecord<record>
): Set<[key, R, record]> {
  //@ts-expect-error
  return set(key, f(get(key, openRecord)), openRecord);
}
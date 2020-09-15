import { TType } from './TType';

export type Simpl<type extends TType> = {
    [K in keyof type]: Simpl<type[K]>
};

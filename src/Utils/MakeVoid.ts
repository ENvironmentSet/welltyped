export abstract class MakeVoid<Name extends keyof any> {
  protected readonly abstract _: {
    readonly [Tag in Name]: never;
  };
}
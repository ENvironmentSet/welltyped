export abstract class PhantomTypeParameter<Identifier extends keyof any, InstantiatedType> {
  protected readonly abstract _: {
    readonly [Name in Identifier]: (_: InstantiatedType) => InstantiatedType;
  };
}
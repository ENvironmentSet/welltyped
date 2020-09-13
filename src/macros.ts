import {
  factory, isTypeAliasDeclaration, Statement,
  Identifier, NodeArray, TypeParameterDeclaration,
  TypeNode, SyntaxKind
} from 'typescript';
import { DecoratorMacro } from '@blainehansen/macro-ts';

function withParams(
  params: NodeArray<TypeParameterDeclaration> = factory.createNodeArray(),
  body: TypeNode
): TypeNode {

  return factory.createConditionalTypeNode(
    factory.createIndexedAccessTypeNode(
      factory.createThisTypeNode(),
      factory.createLiteralTypeNode(factory.createStringLiteral('param'))
    ),
    factory.createTupleTypeNode(
      params.map(({ name }) => factory.createInferTypeNode(factory.createTypeParameterDeclaration(name)))
    ),
    params.reduce(
      (body, { name, constraint }) =>
        constraint ?
          factory.createConditionalTypeNode(
            factory.createTypeReferenceNode(name),
            constraint,
            body,
            factory.createTypeReferenceNode('Stuck')
          ) :
          body,
      body
    ),
    factory.createTypeReferenceNode('Stuck')
  )
}

function createHKT(
  name: Identifier,
  params: NodeArray<TypeParameterDeclaration> = factory.createNodeArray(),
  body: TypeNode
  ): Statement {

  return factory.createInterfaceDeclaration(
    undefined,
    undefined,
    `_${name.escapedText}`,
    undefined,
    [
      factory.createHeritageClause(
        SyntaxKind.ExtendsKeyword,
        [
          factory.createExpressionWithTypeArguments(
            factory.createIdentifier('HKT'),
            undefined
          )
        ]
      )
    ],
    [
      factory.createPropertySignature(
        undefined,
        'result',
        undefined,
        withParams(params, body)
      )
    ]
  );
}

function deriveGeneric(name: Identifier): Statement {
  return factory.createTypeAliasDeclaration(
    undefined,
    undefined,
    name,
    [
      factory.createTypeParameterDeclaration('param', undefined, factory.createTypeReferenceNode('UnInitialized'))
    ],
    factory.createTypeReferenceNode(
      'DeriveGeneric',
      [
        factory.createTypeReferenceNode(`_${name.escapedText}`),
        factory.createTypeReferenceNode('param')
      ]
    )
  );
}

function exportHKT(name: Identifier): Statement {
  return factory.createExportDeclaration(
    undefined,
    undefined,
    false,
    factory.createNamedExports([
      factory.createExportSpecifier(
        name,
        name
      )
    ])
  );
}

export const macros = {
  // HKT must be used with
  // import { HKT, Stuck, UnInitialized, DeriveGeneric } from './Primitive/HKT';
  HKT: DecoratorMacro((ctx, statement) => {//@TODO: Pattern match?
    if (!isTypeAliasDeclaration(statement))
      return ctx.TsNodeErr(statement, 'Not a type alias', `The "HKT" macro isn't being used correctly.`,);
    const { name, typeParameters: params, type: body } = statement;

    return ctx.Ok({
      replacement: createHKT(name, params, body),
      append: [
        deriveGeneric(name),
        exportHKT(name)
      ],
    });
  }),
};

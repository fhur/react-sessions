# Advanced Typescript

- Typescript's types are turing complete: https://github.com/microsoft/TypeScript/issues/14833
- Allows for interesting proejcts like https://github.com/koskimas/kysely#minimal-example

# Goal

```ts
type X = ParseUrl<"/rfqs/:rfqId/offers/:offerId">;
type X = { rfqId: string; offerId: string };

function route<TUrl>(url: TUrl, params: ParseUrl<TUrl>) { ... }

route("/rfqs/:rfqId/dashboarx",{ rfqId:"123-123-123" })
```

## Intermediate goals

```ts
type MergeKeys<A,B> = /* the keys of both A and B */
```

```ts
type Merge<A,B> = /* merges the type A with the type B similar to {...a, ...b} */
```

```ts
type ParseEmptyStr<Str, Else> = /* if the string is empty, return {} otherwise return the Else type
```

```ts
type ParseUrl<Str> = /* takes a string as input and returns an object type describing the params */
Parse<"/a/:foo/b"> = {foo:string}
Parse<"/"> = {}
Parse<"/a/b/c"> = {}
Parse<"/:a/:b/:c"> = {a:string, b:string, c:string}
```

## Concepts

## Useful to think in terms of sets:

## Special types:

- any: matches everything. (aka the Universal set)
- never: matches nothing. Often used when writing type utilities as an analogous of "null" or "false". (aka the empty set)

## keyof operator:

Gives you the keys of a record. Simple!

## Union operator `|`

- Equivalent to the union operator in set theory.
- Given two lists, returns the union of those lists

## Utility types

- Analogous to creating utility functions, but in the type world.
- Arguments to our utility types are type arguments e.g. `Pick<User, 'name'> === { name: string }`
- Utility types are just type aliases with type arguments.
- Let's create the `MergeKeys<A, B>` type

## Mapped types

- Analogous to `array.map`, but in the type world.
- The syntax is the weird part.
- Implement the `MergeType<A,B>`

## Conditional types & the infer keyword

- Analogous to `if`s
- They return one type or another depending on whether a condition passes
- Conditions are always type checks

## Let's implement ParseUrl

```ts
''                 => { }
'/'                => { }
'/foo'             => { }
'/:param'          => { param:string}
'/:param/$rest'    => { param:string } & ParseUrl<$rest>
```

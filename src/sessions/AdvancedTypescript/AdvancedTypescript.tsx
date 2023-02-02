export default function AdvancedTypescript() {
  // # Keyof operator

  // type X = keyof { a: 1; b: 2 };
  // type X = keyof { a: 1; b: 2,c :3 };

  // # Union
  // type A = '1' | '2' | '3';
  // type B = '2' | '3' | '4';
  // type C = A | B;
  // type X = keyof { a: 1; b: 2 } | keyof { c: 3; d: 4 };

  // Let's define the MergeKeys type
  type MergeKeys<A, B> = keyof A | keyof B;

  // # Mapped types

  // Example 1
  // type X = {
  //   [key in keyof { a: 1; b: 2,c :'lol' }]: string
  // };
  // type XX = {[key in keyof X]: `/${X[key]}`}

  // Example 2
  // Make all keys readonly
  // type MakeReadonly<T> = {
  //   readonly [key in keyof T]: T[key];
  // };
  // type X = MakeReadonly<{ a: 1; b: 2 }>;

  // Example 3: implement the Merge type
  // type Merge<
  //   A extends Record<string, string>,
  //   B extends Record<string, string>
  // > = {
  //   readonly [key in MergeKeys<A, B>]: string;
  // };

  // type X = Merge<{ a: "1"; b: "2",c:"asd" }, { c: "3"; d: "4" }>;

  // # Conditional types
  // type IfType<T, Then, Else> = T extends Then ? Then : Else;
  // Example: implement the ParseEmptyStr type
  //
  // prettier-ignore
  // type ParseEmptyStr<Str extends string, Else> =
  //   Str extends ("" | "/") ? {}
  //   : Else;

  // type X = ParseEmptyStr<'', 'not empty'>;

  // # Infer keyword
  // type Parameters<T extends (...args: any) => any> = T extends (
  //   ...args: infer P
  // ) => any
  //   ? P
  //   : never;

  // function hello(name: string, lastName: string, age: number): void {}
  // type X = Parameters<typeof hello>;

  // type DataTable<TItem> = {};
  // type ExtractFirstTypeArgument<T> = T extends DataTable<infer TItem>
  //   ? TItem
  //   : never;
  // type XX = ExtractFirstTypeArgument<123>

  // # Implement ParseUrl!
  // prettier-ignore
  // type ParseUrl<Str> =
  //       // Empty string -> empty object
  //       Str extends '' ? {} :
  //       // Separator -> empty object
  //       Str extends '/' ? {} :
  //       // Recursive case
  //       Str extends `/${infer Segment}/${infer Rest}` ? Merge<{[key in Segment]:string}, ParseUrl<`/${Rest}`>> :
  //       // Recursive case
  //       Str extends `/${infer Segment}` ? {[key in Segment]:string} :
  //       {}
}

type MergeKeys<A, B> = keyof A | keyof B;

type Merge<
  A extends Record<string, string>,
  B extends Record<string, string>
> = {
  readonly [key in MergeKeys<A, B>]: string;
};

type Merge2<A, B> = {
  readonly [key in MergeKeys<A, B>]: key extends keyof A
    ? A[key]
    : key extends keyof B
    ? B[key]
    : never;
};
type XXXX = Merge2<{ a: 1 }, { b: "2" }>;

type ParseEmptyStr<Str extends string, Else> = Str extends "" | "/" ? {} : Else;

// prettier-ignore
type ParseUrl<Str> =
  // Base case
  Str extends ("" | "/") ? {} :
  // Matching strings of this shape:
  //     /:param/$rest
  Str extends `/:${infer Param}/${infer Rest}`? Merge<{[key in Param]:string}, ParseUrl<`/${Rest}`>> : 
  //     /no-param/$rest
  Str extends `/${string}/${infer Rest}`? Merge<{}, ParseUrl<`/${Rest}`>> : 
  //     /:param
  Str extends `/:${infer Param}` ? {[key in Param]:string} : 
  //     /no-param
  {}

type X1 = ParseUrl<"/:a">;
type X2 = ParseUrl<"/:a/b">;
type X3 = ParseUrl<"/:a/b/:c">;
type X4 = ParseUrl<"/:a/:b/:c">;

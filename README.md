# ts-guard-match

Dead-simple matcher library, relying on TypeScript type guards

# Usage
```ts
import match from "ts-guard-match";

// Write your type guards
const isString = (v: any): v is string => typeof v === "string";
const isNumber = (v: any): v is number => typeof v === "number";
const isBoolean = (v: any): v is boolean => typeof v === "boolean";

// Or use ts-guardian to generate them for you
// import { is } from "ts-guardian";
// const isString = is("string");
// const isNumber = is("number");
// const isBoolean = is("boolean");

type InputType = number | string | boolean;
const input = 3 as InputType;

const output = match(input)
  .when(isNumber, (n) => `It is a number, that gives ${n * n} when squared`)
  .when(isString, (n) => `It is a string of a length of ${n.length}`)
  .when(isBoolean, (n) => `It is a boolean, which becomes ${!n} when negated`)
  .run();

import assert from "assert";
assert.strictEqual(output, "It is a number, that gives 9 when squared");
```

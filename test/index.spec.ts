import match, { BuiltMatch } from "../src/index";

const isNumber = (v: any): v is number => typeof v === "number";
const isString = (v: any): v is string => typeof v === "string";

type Expect<T extends true> = T;
type Not<T> = T extends true ? false : true;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

describe("match", () => {
  it.each([
    [3, "it is number"],
    ["hello", "it is string"],
  ])("matches %p to %p", (input: number | string, expectedOutput: string) => {
    const result = match(input)
      .when(isString, (_) => "it is string")
      .when(isNumber, (_) => "it is number")
      .run();
    expect(result).toBe(expectedOutput);
  });

  it("doesnt allow to run when not exhaustive", () => {
    const matcher = match(3 as number | string).when(
      isString,
      (_) => "it is string"
    );

    type _ = Expect<Not<Equal<typeof matcher, BuiltMatch<string>>>>;
  });

  it.skip("using `otherwise` allows `run` in cases where `when`s are not exhaustive", () => {
    const matcher = match(3 as number | string)
      .when( isString, (_) => "it is string")
      .otherwise(() => 'no case matched, resulting to default')

    type _ = Expect<Equal<typeof matcher, BuiltMatch<string>>>;
    expect(matcher.run()).toBe('no case matched, resulting to default')
  })
});

import helloWorld from "./index";

describe("index", () => {
  it("can call hello world", () => {
    expect(helloWorld()).toEqual("hello world");
  });
});

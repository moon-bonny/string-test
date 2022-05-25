import Solution from "../src/index.js";

let solutionData = [
  {
    s: "我要去[一|二]的地方吃(三|四)可以吗？",
    expected: [
      "我要去一的地方吃三可以吗？",
      "我要去一的地方吃四可以吗？",
      "我要去二的地方吃三可以吗？",
      "我要去二的地方吃四可以吗？",
      "我要去的地方吃三可以吗？",
      "我要去的地方吃四可以吗？",
    ],
  },
  {
    s: "我要去[一|二]的地方吃[三|四]可以吗？",
    expected: [
      "我要去一的地方吃三可以吗？",
      "我要去一的地方吃四可以吗？",
      "我要去一的地方吃可以吗？",
      "我要去二的地方吃三可以吗？",
      "我要去二的地方吃四可以吗？",
      "我要去二的地方吃可以吗？",
      "我要去的地方吃三可以吗？",
      "我要去的地方吃四可以吗？",
      "我要去的地方吃可以吗？",
    ],
  },
  {
    s: "(一|二)的地方吃(三|四)",
    expected: ["一的地方吃三", "一的地方吃四", "二的地方吃三", "二的地方吃四"],
  },
];

describe.each(solutionData)("solution($s)", ({ s, expected }) => {
  let solution = new Solution();
  solution.getResult(s);
  //   console.log(solution.result);

  test(`${s} result item is correct`, () => {
    expected.forEach((item) => {
      expect(solution.result).toContain(item);
    });
  });

  test(`${s} result length is correct`, () => {
    expect(expected.length).toBe(solution.result.length);
  });
});

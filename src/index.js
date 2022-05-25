// 定义一个内部类，存所有待替换的数据
class TmpPosition {
  // 开始位置
  stPos;
  // 结束位置
  edPos;
  // 类型
  type;
  // 待替换字符集
  strList = [];

  getList(str) {
    if (str.charAt(0) == "(") {
      this.type = 0;
    }
    if (str.charAt(0) == "[") {
      this.type = 1;
    }

    // 先将括号内容提取出来
    let content = str.substring(1, str.length - 1);
    // 然后再将可选内容分割
    let contents = content.split("|");
    for (let i = 0; i < contents.length; i++) {
      this.strList.push(contents[i]);
    }
    if (this.type == 1) {
      this.strList.push("");
    }
  }

  // 构造函数
  constructor(stPos, edPos, str) {
    this.stPos = stPos;
    this.edPos = edPos;
    this.getList(str);
  }
}

export default class Solution {
  result = [];

  // 打印最后结果
  pr() {
    for (let i = 0; i < this.result.length; i++) {
      console.log(this.result[i]);
    }
  }

  getResult(s) {
    let posList = [];
    // 解析语料，将所有的可变结构都封装
    for (let i = 0; i < s.length; i++) {
      if (s.charAt(i) == "(" || s.charAt(i) == "[") {
        let st = i;
        while (s.charAt(i) != ")" && s.charAt(i) != "]") i++;
        let ed = i;
        posList.push(new TmpPosition(st, ed, s.substring(st, ed + 1)));
      }
    }

    // 根据封装的可变信息组装成最后的结果
    this.assemble(posList, s, s.length, 0);
  }

  // 其中s是当前层的临时字符串，len用来计算偏移量，k表示当前应该替换第k个位置
  assemble(posList, s, len, k) {
    if (k == posList.length) {
      this.result.push(s);
      return;
    }
    let offset = len - s.length;
    // 这里面进行替换
    let pos = posList[k];
    let s1 = s.substring(0, pos.stPos - offset);
    let s2 = s.substring(pos.edPos - offset + 1);
    for (let j = 0; j < pos.strList.length; j++) {
      let sb = `${s1}${pos.strList[j]}${s2}`;
      this.assemble(posList, sb, len, k + 1);
    }
  }
}

let s = "我要去[一|二]的地方吃(三|四)可以吗？";
// let s =
//   "我要去[一|二]的地方吃(三|四)可以吗？(五|六)会更好吗[七|八]？(九|十)更好啊";
let solution = new Solution();
solution.getResult(s);
// solution.pr();

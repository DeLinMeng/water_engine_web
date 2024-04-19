import {
  WCeLiuYanType1,
  WCeLiuYanType2,
  WCeLiuYanType3,
  WShengTaiBengType,
  WShengTaiType,
  WXieLiuGuanType,
  WXieLiuZhaType,
} from "./Home.type";

export enum WaterXieLiuType {
  type1 = "泄流管（虹吸管）",
  type2 = "泄流闸",
  type3 = "生态机组",
  type4 = "生态泵",
  type5 = "测流堰",
}

export enum WaterCeLiuType {
  type_juxing = "矩形薄壁堰",
  type_sanjiao = "三角形薄壁堰",
  type_runyuan = "锐缘矩形宽顶堰",
}

export type TaskScreenObject = { title: string; type: WaterXieLiuType };

// Q——流量，待求值，m3/s；
// H——泄流孔最小作用水头，淹没出流时为上下游水位差，自由出流时为上游水位与出口中心高程的差，m，（输入参数）；
// L——管道长度，m，（输入参数）；
// D——直径（对于圆形管道，取内径），m，（输入参数）；
// n——糙率，默认值为0.013，可修改（经验系数）；
// R——水力半径，m，（中间变量）；
// A——断面面积，m2，（中间变量）；
// g——重力加速度，m/s²（固定取值，为9.81）；
// ξ——局部水头损失系数，默认值为1，可修改（经验系数）；
// x——出流系数，默认为值1，可修改，淹没出流时取0（经验系数）。
export const initXieLiuState: WXieLiuGuanType = {
  Q: {
    id: "Q",
    count: undefined,
    unit: "m³/s",
    name: "流量",
    description: "有压泄流管（孔）流量",
  },
  V: {
    id: "V",
    count: undefined,
    unit: "m/s",
    name: "流速值",
    description: "流速值",
  },
  H: {
    id: "H",
    count: "",
    unit: "m",
    name: "总水头",
    editable: true,
    placeholder: "请输入总水头值",
    description:
      "H--泄流孔最小作用水头，淹没出流时为上下游水位差，自由出流时为上游水位与出口中心高程的差，m",
  },
  L: {
    id: "L",
    count: "",
    unit: "m",
    name: "管道长度",
    editable: true,
    placeholder: "请输入管道长度",
    description: "L——管道长度，m",
  },
  D: {
    id: "D",
    count: "",
    unit: "m",
    name: "管道内径",
    editable: true,
    placeholder: "请输入管道内径",
    description: "D——直径（对于圆形管道，取内径），m",
  },
  n: {
    id: "n",
    count: "0.013",
    name: "糙率",
    editable: true,
    placeholder: "请输入糙率",
    description: "n——糙率，默认值为0.013，可修改（经验系数",
  },
  R: {
    id: "R",
    count: "",
    unit: "m",
    name: "水力半径",
    editable: false,
    placeholder: "中间参数，根据D计算",
    description: "R——水力半径",
  },
  A: {
    id: "A",
    count: "",
    unit: "m²/s",
    name: "断面面积",
    editable: false,
    placeholder: "中间参数，根据D计算",
    description: "A——断面面积，m²",
  },
  g: {
    id: "g",
    count: "9.81",
    unit: "m/s²",
    name: "重力加速度",
    editable: false,
    placeholder: "请输入重力加速度",
    description: "g——重力加速度，m/s²（固定取值，为9.81",
  },
  ξ: {
    id: "ξ",
    count: "1",
    unit: "",
    name: "局部水头损失系数",
    editable: true,
    placeholder: "请输入局部水头损失系数",
    description: "ξ——局部水头损失系数，默认值为1，可修改（经验系数）",
  },
  x: {
    id: "x",
    count: "1",
    unit: "",
    name: "出流系数",
    editable: true,
    placeholder: "请输入出流系数",
    description: "x——出流系数，默认为值1，可修改，淹没出流时取0（经验系数）",
  },
};

/*

Q——流量，待求值，m3/s；
e——闸门开启高度，m；（输入参数）；
B——泄流孔单孔宽，m；（输入参数）；
H——自由出流时为总水头，淹没出流时为上下游水位差，m，（输入参数）；
g——重力加速度，m/s²（固定取值，为9.81）；
μ——孔流流量系数当e/H≥0.03时，不同闸形式分别用下列公式计算：

*/
export const initWXieLiuZhaState: WXieLiuZhaType = {
  Q: {
    id: "Q",
    count: undefined,
    unit: "m³/s",
    name: "流量",
    description: "泄流闸流量",
  },
  e: {
    id: "e",
    count: "",
    unit: "m",
    name: "闸门开启高度",
    editable: true,
    placeholder: "请输入闸门开度",
    description: "e 闸门开启高度，m",
  },
  B: {
    id: "B",
    count: "",
    unit: "m",
    name: "闸门宽度",
    editable: true,
    placeholder: "请输入闸门宽度",
    description: "B——闸门宽度，m",
  },
  H: {
    id: "H",
    count: "",
    unit: "m",
    name: "总水头(上下游水位差)",
    editable: true,
    placeholder: "请输入",
    description: "H--自由出流时为总水头，淹没出流时为上下游水位差，m",
  },
  g: {
    id: "g",
    count: "9.81",
    unit: "m/s²",
    name: "重力加速度",
    editable: false,
    placeholder: "请输入重力加速度",
    description: "g——重力加速度，m/s²（固定取值，为9.81",
  },
  μ: {
    id: "μ",
    count: "",
    unit: "",
    name: "闸门类型",
    editable: true,
    placeholder: "选择闸门类型",
    description: "孔流流量系数当e/H≥0.03时，不同闸形式分别用下列公式计算",
  },
  θ: {
    id: "θ",
    count: "",
    unit: "度",
    name: "闸门底缘切线与水平线的夹角",
    editable: true,
    placeholder: "请输入",
    description: "θ——闸门底缘切线与水平线的夹角，度",
  },
};

/*
Qi——第i单机流量，待求值，m³/ s；
Ni——第i单机电功率，kW，（输入参数）；
ηi——第i单机效率，默认值为80%，可修改（输入参数）；
h——实测水头，m，（输入参数）；
g——重力加速度，m/s²（固定取值，为9.81）。
*/

export const initShengTaiItem: WShengTaiType = {
  g: {
    id: "g",
    count: "9.81",
    unit: "m/s²",
    name: "重力加速度",
    editable: false,
    placeholder: "请输入重力加速度",
    description: "g——重力加速度，m/s²（固定取值，为9.81",
  },
  η: {
    id: "η",
    count: "0.8",
    unit: "",
    name: "效率",
    editable: true,
    placeholder: "请输入效率",
    description: "η——效率，默认值为1，可修改（经验系数）",
  },
  h: {
    id: "h",
    count: "",
    unit: "m",
    name: "水头",
    editable: true,
    placeholder: "请输入水头",
    description: "H——水头，m，（输入参数）",
  },
  N: {
    id: "N",
    count: "",
    unit: "kW",
    name: "机组功率",
    editable: true,
    placeholder: "机组功率",
    description: "Ni——第i单机电功率，kW，（输入参数）",
  },
};

/*

Q——单机流量，待求值，m³/ s；
——单机效率，%，即（有效电功率/耗用电功率）×100，包括电动机、水泵、传动系统及水管摩阻等方面的综合效率，默认值为60%，可修改（输入参数）；
N——单机电功率，kW（输入参数）；
h——抽水扬程（抽水站上下水位差），m，当出水管口中心高于水面时，则以出水管中心高程与抽水池水体水位差计算扬程。（输入参数）；
g——重力加速度，m/s²（固定取值，为9.81）。

*/

export const initShengTaiBeng: WShengTaiBengType = {
  N: {
    id: "N",
    count: "",
    unit: "kW",
    name: "单机电功率",
    editable: true,
    placeholder: "请输入功率",
    description: "单机电功率，kW（输入参数）",
  },
  η: {
    id: "η",
    count: "0.6",
    unit: "",
    name: "效率",
    editable: true,
    placeholder: "请输入效率",
    description:
      "单机效率，%，即（有效电功率/耗用电功率）×100，包括电动机、水泵、传动系统及水管摩阻等方面的综合效率，默认值为60%，可修改（输入参数）",
  },
  h: {
    id: "h",
    count: "",
    unit: "m",
    name: "抽水扬程",
    editable: true,
    placeholder: "请输入抽水扬程",
    description:
      "h——抽水扬程（抽水站上下水位差），m，当出水管口中心高于水面时，则以出水管中心高程与抽水池水体水位差计算扬程。",
  },
  g: {
    id: "g",
    count: "9.81",
    unit: "m/s²",
    name: "重力加速度",
    editable: false,
    placeholder: "请输入重力加速度",
    description: "g——重力加速度，m/s²（固定取值，为9.81",
  },
  Q: {
    id: "Q",
    count: "",
    unit: "m³/s",
    name: "流量",
    editable: true,
    placeholder: "请输入流量",
    description: "Q——单机流量，待求值，m³/ s",
  },
};

/*

矩形薄壁堰

Q——流量，待求值，m3/s；
CD——流量系数，默认值为0.6，可修改（经验系数）；
b——堰口宽度，m（输入参数）；
h——总水头，m，为堰前水位与堰底的高程差，（输入参数）；
g——重力加速度，m/s²（固定取值，为9.81）。
*/
export const initWCeLiuYan1: WCeLiuYanType1 = {
  Q: {
    id: "Q",
    count: undefined,
    unit: "m³/s",
    name: "流量",
    description: "矩形薄壁堰流量",
  },
  CD: {
    id: "CD",
    count: "0.6",
    unit: "",
    name: "流量系数",
    editable: true,
    placeholder: "请输入流量系数",
    description: "CD——流量系数，默认值为0.6，可修改（经验系数）",
  },
  b: {
    id: "b",
    count: "",
    unit: "m",
    name: "堰口宽度",
    editable: true,
    placeholder: "请输入堰口宽度",
    description: "b——堰口宽度，m",
  },
  h: {
    id: "h",
    count: "",
    unit: "m",
    name: "总水头",
    editable: true,
    placeholder: "请输入总水头",
    description: "h——总水头，m，为堰前水位与堰底的高程差",
  },
  g: {
    id: "g",
    count: "9.81",
    unit: "m/s²",
    name: "重力加速度",
    editable: false,
    placeholder: "请输入重力加速度",
    description: "g——重力加速度，m/s²（固定取值，为9.81）",
  },
};

/*

三角形薄壁堰
Q——流量，待求值，m3/s；
CD——流量系数，默认值为0.6，可修改（经验系数）；
θ——堰口角，默认值为π/2，可修改（输入参数）；
h——总水头，m，为堰前水位与堰底的高程差（输入参数）；
g——重力加速度，m/s²（固定取值，为9.81）。
*/

export const initWCeLiuYan2: WCeLiuYanType2 = {
  Q: {
    id: "Q",
    count: undefined,
    unit: "m³/s",
    name: "流量",
    description: "三角形薄壁堰流量",
  },
  CD: {
    id: "CD",
    count: "0.6",
    unit: "",
    name: "流量系数",
    editable: true,
    placeholder: "请输入流量系数",
    description: "CD——流量系数，默认值为0.6，可修改（经验系数）",
  },
  θ: {
    id: "θ",
    count: "90",
    unit: "度",
    name: "堰口角",
    editable: true,
    placeholder: "请输入堰口角",
    description: "θ——堰口角，默认值为π/2，在π/9(20°)~5π/9（100°）之间",
  },
  h: {
    id: "h",
    count: "",
    unit: "m",
    name: "总水头",
    editable: true,
    placeholder: "请输入总水头",
    description: "h——总水头，m，为堰前水位与堰底的高程差",
  },
  g: {
    id: "g",
    count: "9.81",
    unit: "m/s²",
    name: "重力加速度",
    editable: false,
    placeholder: "请输入重力加速度",
    description: "g——重力加速度，m/s²（固定取值，为9.81）",
  },
};

/*

锐缘矩形宽顶堰

Q——流量，待求值，m3/s；
C——流量组合系数，默认值为1，可修改（经验系数）；
h——总水头，m，为堰前水位与堰底的高程差（输入参数）；
b——堰顶宽度，m（输入参数）；
g——重力加速度，m/s²（固定取值，为9.81）。

*/

export const initWCeLiuYan3: WCeLiuYanType3 = {
  Q: {
    id: "Q",
    count: undefined,
    unit: "m³/s",
    name: "流量",
    description: "锐缘矩形宽顶堰流量",
  },
  C: {
    id: "C",
    count: "1",
    unit: "",
    name: "流量组合系数",
    editable: true,
    placeholder: "请输入流量组合系数",
    description: "C——流量组合系数，默认值为1，可修改（经验系数）",
  },
  h: {
    id: "h",
    count: "",
    unit: "m",
    name: "总水头",
    editable: true,
    placeholder: "请输入总水头",
    description: "h——总水头，m，为堰前水位与堰底的高程差",
  },
  b: {
    id: "b",
    count: "",
    unit: "m",
    name: "堰顶宽度",
    editable: true,
    placeholder: "请输入堰顶宽度",
    description: "b——堰顶宽度，m",
  },
  g: {
    id: "g",
    count: "9.81",
    unit: "m/s²",
    name: "重力加速度",
    editable: false,
    placeholder: "请输入重力加速度",
    description: "g——重力加速度，m/s²（固定取值，为9.81）",
  },
};

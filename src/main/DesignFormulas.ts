import { Big } from "big.js";
import { GateType, WShengTaiType } from "./Home.type";
import Decimal from "decimal.js";
import { reduce } from "lodash";
// 泄流管（虹吸管） 计算公式
type SolveForQParams = {
  H: Big;
  L: Big;
  n: Big;
  R: Big;
  A: Big;
  ξ: Big;
  x: Big;
  g: Big;
};
export const DesignXieLiuGuan = {
  getR(D: string) {
    return Big(D).div(4).toFixed(4);
  },
  getA(D: string) {
    return Big(D).pow(2).times(Math.PI).div(4).toFixed(4);
  },
  async getQ({
    H,
    L,
    R,
    A,
    n,
    ξ,
    x,
    g,
  }: {
    H: string;
    L: string;
    R: string;
    A: string;
    n: string;
    ξ: string;
    x: string;
    g: string;
  }) {
    try {
      const Q = DesignXieLiuGuan.solveForQ({
        H: new Big(H),
        L: new Big(L || 0),
        R: new Big(R),
        A: new Big(A),
        n: new Big(n),
        ξ: new Big(ξ),
        x: new Big(x),
        g: new Big(g),
      });
      return Q;
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  },
  // 泄流管（虹吸管）
  solveForQ({ H, L, n, R, A, ξ, x, g }: SolveForQParams): string {
    // Calculate L * n^2
    const Ln2 = L.times(n.pow(2));

    // Calculate R to the power of 4/3
    const R43 = Math.pow(R.toNumber(), 4 / 3);

    // Calculate the first part of the denominator (L * n^2) / (R^(4/3) * A^2)
    const firstPartDenominator = Ln2.div(Big(R43).times(A.pow(2)));

    console.log("R43", R43, Ln2, Big(R43).times(A.pow(2)));

    // Calculate the second part of the denominator (Σξ + x) / (2g * A^2)
    const secondPartDenominator = ξ
      .plus(x)
      .div(new Big(2).times(g).times(A.pow(2)));

    // Sum both parts to get the denominator of the right-hand side of the equation
    const denominator = firstPartDenominator.plus(secondPartDenominator);

    // Calculate Q by taking the square root of H divided by the denominator
    const Q = H.div(denominator).sqrt().toFixed(4);

    return Q;
  },
};

// 泄流闸 计算公式
type SolveForQParams2 = {
  H: Decimal;
  e: Decimal;
  B: Decimal;
  θ: Decimal;
  g: Decimal;
  gateType?: GateType;
};

export const DesignXieLiuZha = {
  async getQ({
    e,
    H,
    B,
    g,
    θ,
    gateType,
  }: {
    H: string;
    e: string;
    B: string;
    θ: string;
    g: string;
    gateType?: GateType;
  }) {
    try {
      const Q = DesignXieLiuZha.solveForQ({
        e: new Decimal(e),
        H: new Decimal(H),
        B: new Decimal(B),
        θ: new Decimal(θ || 0),
        g: new Decimal(g),
        gateType,
      });
      return Q;
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  },
  // 平底平板闸门
  pingdi_pingban(base: Decimal): Decimal {
    const coefficient = new Decimal(0.454);
    const exponent = -0.138;
    // Decimal.js 可以处理小数指数
    const ratioRaisedToExponent = base.pow(exponent);
    return coefficient.times(ratioRaisedToExponent);
  },

  // 平底弧形闸门
  pingdi_huxing(θ: Decimal, base: Decimal): Decimal {
    // 将角度转换为Decimal类型，进行高精度计算
    const radians = new Decimal(θ);
    // 首先将所有的数字常量转换为Big对象
    const one = new Decimal(1);
    const constant1 = new Decimal(0.0166);
    const exponent1 = 0.723;
    const constant2 = new Decimal(0.582);
    const constant3 = new Decimal(0.0371);
    const exponent2 = 0.547;
    // 计算各个部分
    const part1 = constant1.times(radians.pow(exponent1));
    const part2 = constant2.minus(constant3.times(radians.pow(exponent2)));
    const part3 = part2.times(base);
    // 组合计算结果
    const mu = one.minus(part1).minus(part3);
    return mu;
  },

  // 曲线型实用堰平板闸门
  quxian_pingban(base: Decimal): Decimal {
    // 将常数转换为Big对象
    const coefficient = new Decimal(0.53);
    const exponent = -0.12;
    // 计算(e/H)的指数部分
    const ratioRaisedToExponent = base.pow(exponent);
    // 计算最终结果
    const mu = coefficient.times(ratioRaisedToExponent);
    return mu;
  },

  // 曲线型实用堰弧形闸门
  quxian_huxing(base: Decimal): Decimal {
    // 将常数转换为Big对象
    const coefficient = new Decimal(0.531);
    const exponent = -0.139;
    // 计算(e/H)的指数部分
    const ratioRaisedToExponent = base.pow(exponent);
    // 计算最终结果
    const mu = coefficient.times(ratioRaisedToExponent);
    return mu;
  },

  getZhaMenu(e: Decimal, H: Decimal, θ: Decimal, gateType?: GateType): Decimal {
    const normalμ = new Decimal(0.03);
    let base = e.div(H);
    let u = normalμ;
    if (base.toNumber() < 0.03) {
      base = normalμ;
    }
    switch (gateType) {
      case GateType.type1:
        u = DesignXieLiuZha.pingdi_pingban(base);
        break;
      case GateType.type2:
        u = DesignXieLiuZha.pingdi_huxing(θ, base);
        break;
      case GateType.type3:
        u = DesignXieLiuZha.quxian_pingban(base);
        break;
      case GateType.type4:
        u = DesignXieLiuZha.quxian_huxing(base);
        break;
      default:
        break;
    }
    return u;
  },

  // 闸门
  solveForQ({ e, H, B, g, θ, gateType }: SolveForQParams2): string {
    const mu = DesignXieLiuZha.getZhaMenu(e, H, θ, gateType);
    // Calculate 2gH
    const twoGH = new Decimal(2).times(g).times(H);

    // Calculate square root of 2gH
    const sqrtTwoGH = twoGH.sqrt();

    // Calculate Q = mu * e * B * sqrt(2gH)
    const Q = mu.times(e).times(B).times(sqrtTwoGH);

    return Q.toFixed(4).toString();
  },
};

export const ShengTaiJiZu = {
  getQs(items: WShengTaiType[]) {
    return reduce<WShengTaiType, number>(
      items,
      (sum, item) =>
        new Decimal(sum || 0).plus(ShengTaiJiZu.getQ(item)).toNumber(),
      0
    );
  },

  getQ(item: WShengTaiType): Decimal {
    // 创建 Decimal 实例
    const N = new Decimal(item.N.count!);
    const g = new Decimal(item.g.count!);
    const η = new Decimal(item.η.count!);
    const h = new Decimal(item.h.count!);
    // 使用 Decimal 库的方法进行计算
    const Qi = N.div(g.mul(η).mul(h));
    return Qi;
  },
};

export const ShengTaiBeng = {
  getQs({ η, N, h, g }: { η: string; N: string; g: string; h: string }) {
    const _η = new Decimal(η);
    const _N = new Decimal(N);
    const _g = new Decimal(g);
    const _h = new Decimal(h);
    // 执行计算，确保变量名与对象的属性名相匹配
    const Q = _η.mul(_N).div(_g.mul(_h));
    return Q.toFixed(4).toString(); // 返回计算结果的字符串表示
  },
};

export const CeiLiuYan = {
  getQs1({ CD, b, h, g }: { CD: string; b: string; h: string; g: string }) {
    // 转换所有输入为 Decimal 实例
    const _CD = new Decimal(CD);
    const _g = new Decimal(g);
    const _b = new Decimal(b);
    const _h = new Decimal(h);

    // 计算公式中的各个部分
    const twoThirds = new Decimal("2").dividedBy("3");
    const squareRootOf2g = new Decimal("2").mul(_g).sqrt();
    const hToThreeHalfs = _h.pow("1.5");
    // 计算 Q
    const Q = _CD.mul(twoThirds).mul(squareRootOf2g).mul(_b).mul(hToThreeHalfs);

    // 返回结果，保留四位小数
    return Q.toFixed(4);
  },

  getQs2({ CD, θ, h, g }: { CD: string; θ: string; h: string; g: string }) {
    // 创建 Decimal 实例
    const _CD = new Decimal(CD);
    const _g = new Decimal(g);
    const _h = new Decimal(h);

    // 将π定义为Decimal类型的数值，以确保计算的精确性
    const pi = new Decimal(Math.PI);
    // 将角度转换为Decimal类型，进行高精度计算
    const radians = new Decimal(θ).times(pi).dividedBy(180);

    // 计算公式中的各个部分
    const eightFifteenths = new Decimal(8).div(15);
    const tanThetaOver2 = Decimal.tan(radians.div(2)); // 使用 Math.tan 计算 tan(θ/2)
    const squareRootOf2g = Decimal.sqrt(new Decimal(2).mul(_g));
    const hToTheFiveHalfs = _h.pow(5 / 2);

    // 计算 Q
    const Q = _CD
      .mul(eightFifteenths)
      .mul(tanThetaOver2)
      .mul(squareRootOf2g)
      .mul(hToTheFiveHalfs);

    // 返回结果，保留四位小数
    return Q.toFixed(4);
  },

  getQs3({ h, C, b, g }: { h: string; C: string; b: string; g: string }) {
    // 创建 Decimal 实例
    const _h = new Decimal(h);
    const _C = new Decimal(C);
    const _b = new Decimal(b);
    const _g = new Decimal(g);
    // 计算公式中的各个部分
    const twoThirdsH = _h.mul(2).div(3);
    const twoThirdsHCubed = twoThirdsH.pow(1.5); // 相当于 (2/3 h)^(3/2)
    const sqrtG = _g.sqrt();
    // 计算 Q
    const Q = twoThirdsHCubed.mul(_C).mul(_b).mul(sqrtG);
    // 返回结果，保留四位小数
    return Q.toFixed(4).toString();
  },
};

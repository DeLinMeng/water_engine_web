import React, { useCallback, useMemo, useReducer } from "react";
import { Button, Form, Space, message } from "antd";
import { BaseItem, WXieLiuGuanType } from "../Home.type";
import { initXieLiuState } from "../Containts";
import { isEmpty } from "lodash";
import BlInput from "../../common/BlInput";
import { DesignXieLiuGuan } from "../DesignFormulas";
import Decimal from "decimal.js";
import BlResult from "../../common/BlResult";
import BlDisable from "../../common/BlDisable";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
  item: { top: 8 },
};

const WXieLiuGuan: React.FC = () => {
  const reducer = (
    state: WXieLiuGuanType,
    action: { id?: NonNullable<BaseItem>["id"]; payload: WXieLiuGuanType }
  ) => {
    return { ...state, ...action?.payload };
  };
  const [state, dispatch] = useReducer(reducer, initXieLiuState);
  const [messageApi, contextHolder] = message.useMessage();

  // 校验是否有空值
  const checkPass = useCallback((_state: any) => {
    return Object.keys(_state)
      .filter((el) => el !== "Q" && el !== "V")
      .some((key) => {
        // @ts-ignore 语法错误
        const item = _state[key];
        if (isEmpty(item.count) || item.count === 0) {
          dispatch({
            // @ts-ignore 语言错误
            payload: { [key]: { ...item, errorMessage: `${item.id}不能为空` } },
          });
          return true;
        }
        return false;
      });
  }, []);

  const H = useMemo(() => {
    return (
      <BlInput
        item={state.H}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: { H: { ...state.H, count: value, errorMessage: "" } },
          });
        }}
      />
    );
  }, [state.H]);

  //
  const L = useMemo(() => {
    return (
      <BlInput
        item={state.L}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: { L: { ...state.L, count: value, errorMessage: "" } },
          });
        }}
      />
    );
  }, [state.L]);

  const D = useMemo(() => {
    return (
      <BlInput
        item={state.D}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: {
              D: { ...state.D, count: value, errorMessage: "" },
              R: {
                ...state.R,
                count: isEmpty(value) ? "" : DesignXieLiuGuan.getR(value),
                errorMessage: "",
              },
              A: {
                ...state.A,
                count: isEmpty(value) ? "" : DesignXieLiuGuan.getA(value),
                errorMessage: "",
              },
            },
          });
        }}
      />
    );
  }, [state.A, state.D, state.R]);

  const RA = useMemo(() => {
    return (
      <Form.Item {...tailLayout}>
        <Space direction={"vertical"}>
          <BlDisable item={state.R} />
          <BlDisable item={state.A} />
        </Space>
      </Form.Item>
    );
  }, [state.A, state.R]);

  //
  const n = useMemo(() => {
    return (
      <BlInput
        item={state.n}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: { n: { ...state.n, count: value, errorMessage: "" } },
          });
        }}
      />
    );
  }, [state.n]);

  // g
  const g = useMemo(() => {
    return <BlInput item={state.g} />;
  }, [state.g]);

  const ξ = useMemo(() => {
    return (
      <BlInput
        item={state.ξ}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: { ξ: { ...state.ξ, count: value, errorMessage: "" } },
          });
        }}
      />
    );
  }, [state.ξ]);

  const x = useMemo(() => {
    return (
      <BlInput
        item={state.x}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: { x: { ...state.x, count: value, errorMessage: "" } },
          });
        }}
      />
    );
  }, [state.x]);

  const Q = useMemo(() => {
    return <BlResult item={state.Q} />;
  }, [state.Q]);

  const V = useMemo(() => {
    return <BlResult item={state.V} />;
  }, [state.V]);

  const onSubmit = useCallback(async () => {
    if (checkPass(state)) {
      messageApi.open({
        type: "error",
        content: "数据校验有问题",
      });
      return;
    }
    const q = await DesignXieLiuGuan.getQ({
      H: state.H.count!,
      L: state.L.count!,
      R: state.R.count!,
      A: state.A.count!,
      n: state.n.count!,
      g: state.g.count!,
      ξ: state.ξ.count!,
      x: state.x.count!,
    });
    const v = new Decimal(q || 0).div(state.A.count!).toFixed(4).toString();
    dispatch({
      // @ts-ignore 计算水力半径
      payload: { Q: { ...state.Q, count: q }, V: { ...state.V, count: v } },
    });
    messageApi.open({
      type: "success",
      content: "计算成功",
    });
  }, [checkPass, messageApi, state]);

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        name="control-hooks"
        onFinish={onSubmit}
        style={{ maxWidth: 600 }}
      >
        {H}
        {L}
        {D}
        {n}
        {g}
        {ξ}
        {x}
        {RA}
        <Form.Item {...tailLayout}>
          <Space>{Q}</Space>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>{V}</Space>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              计算
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default WXieLiuGuan;

import React, { useCallback, useMemo, useReducer } from "react";
import { Button, Form, Space, message } from "antd";
import { BaseItem, GateType, WXieLiuZhaType } from "../Home.type";
import { initWXieLiuZhaState } from "../Containts";
import { isEmpty } from "lodash";
import Big from "big.js";
import BlInput from "../../common/BlInput";
import BlSelect from "../../common/BlSelect";
import { DesignXieLiuZha } from "../DesignFormulas";
import BlResult from "../../common/BlResult";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
  item: { top: 8 },
};

const WXieLiuZha: React.FC = () => {
  const [form] = Form.useForm();

  const reducer = (
    state: WXieLiuZhaType,
    action: { id?: NonNullable<BaseItem>["id"]; payload: WXieLiuZhaType }
  ) => {
    return { ...state, ...action?.payload };
  };
  const [state, dispatch] = useReducer(reducer, initWXieLiuZhaState);
  const [gateType, setGateType] = React.useState<GateType>();
  const [messageApi, contextHolder] = message.useMessage();

  // 校验是否有空值
  const checkPass = useCallback(
    (_state: any) => {
      return Object.keys(_state)
        .filter((el) => {
          const passθ = gateType === GateType.type2 && el !== "θ";
          return el !== "Q" && el !== "μ" && passθ;
        })
        .some((key) => {
          // @ts-ignore 语法错误
          const item = _state[key];
          if (isEmpty(item.count) || item.count === 0) {
            dispatch({
              // @ts-ignore 语言错误
              payload: {
                [key]: { ...item, errorMessage: `${item.id}不能为空` },
              },
            });
            return true;
          }
          return false;
        });
    },
    [gateType]
  );

  const e = useMemo(() => {
    return (
      <BlInput
        item={state.e}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: {
              e: { ...state.e, count: value, errorMessage: "" },
              μ: {
                ...state.μ,
                count:
                  !isEmpty(state.H.count) && state.H.count !== "0"
                    ? Big(value || 0)
                        .div(state.H.count!)
                        .toNumber()
                        .toString()
                    : state.μ.count,
                errorMessage: "",
              },
            },
          });
        }}
      />
    );
  }, [state.H.count, state.e, state.μ]);

  //
  const B = useMemo(() => {
    return (
      <BlInput
        item={state.B}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: { B: { ...state.B, count: value, errorMessage: "" } },
          });
        }}
      />
    );
  }, [state.B]);

  const H = useMemo(() => {
    return (
      <BlInput
        item={state.H}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: {
              H: { ...state.H, count: value, errorMessage: "" },
              μ: {
                ...state.μ,
                count:
                  !isEmpty(state.e.count) && value && Big(value).toNumber() >= 0
                    ? Big(state.e.count || 0)
                        .div(value)
                        .toString()
                    : state.μ.count,
                errorMessage: "",
              },
            },
          });
        }}
      />
    );
  }, [state.H, state.e.count, state.μ]);

  //
  const g = useMemo(() => {
    return (
      <BlInput
        item={state.g}
        onChange={(value) => {
          dispatch({
            // @ts-ignore 计算水力半径
            payload: { g: { ...state.g, count: value, errorMessage: "" } },
          });
        }}
      />
    );
  }, [state.g]);

  // θ
  const θ = useMemo(() => {
    return (
      gateType === GateType.type2 && (
        <BlInput
          item={state.θ}
          onChange={(value) => {
            dispatch({
              // @ts-ignore 计算水力半径
              payload: { θ: { ...state.θ, count: value, errorMessage: "" } },
            });
          }}
        />
      )
    );
  }, [gateType, state.θ]);

  const onGenderChange = (value: string) => {
    setGateType(value as GateType);
  };

  const select_u = useMemo(() => {
    return (
      <BlSelect
        item={state.μ}
        options={Object.values(GateType)}
        onChange={onGenderChange}
      ></BlSelect>
    );
  }, [state.μ]);

  const onSubmit = useCallback(async () => {
    if (checkPass(state)) {
      messageApi.open({
        type: "error",
        content: "数据校验有问题",
      });
      return;
    }
    const q = await DesignXieLiuZha.getQ({
      H: state.H.count!,
      e: state.e.count!,
      θ: state.θ.count!,
      g: state.g.count!,
      B: state.B.count!,
      gateType: gateType,
    });
    // @ts-ignore 计算水力半径
    dispatch({ payload: { Q: { ...state.Q, count: q } } });
    messageApi.open({
      type: "success",
      content: "计算成功",
    });
  }, [checkPass, gateType, messageApi, state]);

  const Q = useMemo(() => {
    return <BlResult item={state.Q} />;
  }, [state.Q]);

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onSubmit}
        style={{ maxWidth: 600 }}
      >
        {select_u}
        {θ}
        {e}
        {H}
        {B}
        {g}
        <Form.Item {...tailLayout}>
          <Space>{Q}</Space>
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

export default WXieLiuZha;

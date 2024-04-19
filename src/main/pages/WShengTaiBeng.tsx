import { Button, Form, Space } from "antd";
import React, { FC, memo, useCallback, useMemo, useReducer } from "react";
import { BaseItem, WShengTaiBengType } from "../Home.type";
import { initShengTaiBeng } from "../Containts";
import { isEmpty } from "lodash";
import { ShengTaiBeng } from "../DesignFormulas";
import BlResult from "../../common/BlResult";
import BlInput from "../../common/BlInput";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
  item: { top: 8 },
};

interface Props {}
const WShengTaiBeng: FC<Props> = (props) => {
  const reducer = (
    state: WShengTaiBengType,
    action: { id?: NonNullable<BaseItem>["id"]; payload: WShengTaiBengType }
  ) => {
    return { ...state, ...action?.payload };
  };

  const [state, dispatch] = useReducer(reducer, initShengTaiBeng);

  // 校验是否有空值
  const checkPass = useCallback((_state: any) => {
    return Object.keys(_state)
      .filter((el) => el !== "Q")
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

  const onSubmit = useCallback(async () => {
    if (checkPass(state)) {
      return;
    }
    const q = await ShengTaiBeng.getQs({
      η: state.η.count!,
      N: state.N.count!,
      h: state.h.count!,
      g: state.g.count!,
    });
    // @ts-ignore 计算水力半径
    dispatch({ payload: { Q: { ...state.Q, count: q } } });
  }, [checkPass, state]);

  const Q = useMemo(() => {
    return <BlResult item={state.Q} />;
  }, [state.Q]);

  return (
    <>
      <Form
        {...layout}
        name="control-hooks"
        onFinish={onSubmit}
        style={{ maxWidth: 600 }}
      >
        {Object.keys(state)
          ?.filter((el) => el !== "Q")
          ?.map((key) => {
            // @ts-ignore xxx
            const item = state[key] as BaseItem;
            return (
              <BlInput
                key={key}
                item={item}
                onChange={(value) => {
                  dispatch({
                    // @ts-ignore 计算水力半径
                    payload: {
                      [key]: { ...item, count: value, errorMessage: "" },
                    },
                  });
                }}
              />
            );
          })}
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
export default memo(WShengTaiBeng);

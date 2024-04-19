import { Button, Form, Space } from "antd";
import { FC, memo, useCallback, useMemo, useReducer } from "react";
import { isEmpty } from "lodash";
import { BaseItem, WCeLiuYanType1 } from "../../Home.type";
import { initWCeLiuYan1 } from "../../Containts";
import { CeiLiuYan } from "../../DesignFormulas";
import BlResult from "../../../common/BlResult";
import BlInput from "../../../common/BlInput";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
  item: { top: 8 },
};

interface Props {}
const WCeLiuYan1: FC<Props> = (props) => {
  const reducer = (
    state: WCeLiuYanType1,
    action: { id?: NonNullable<BaseItem>["id"]; payload: WCeLiuYanType1 }
  ) => {
    return { ...state, ...action?.payload };
  };
  const [state, dispatch] = useReducer(reducer, initWCeLiuYan1);

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
    const q = await CeiLiuYan.getQs1({
      CD: state.CD.count!,
      b: state.b.count!,
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
export default memo(WCeLiuYan1);

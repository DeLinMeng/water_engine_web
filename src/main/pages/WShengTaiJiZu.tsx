import { List, Button, Form, Divider } from "antd";
import { FC, memo, useCallback, useState } from "react";
import { useMixedState } from "../units/hooks";
import { BaseItem, WShengTaiType } from "../Home.type";
import BlColor from "../../common/BlColor";
import { CloseOutlined } from "@ant-design/icons";
import BlInput from "../../common/BlInput";
import BlResult from "../../common/BlResult";
import { ShengTaiJiZu } from "../DesignFormulas";
import { initShengTaiItem } from "../Containts";
interface Props {}

const WShengTaiJiZu: FC<Props> = (props) => {
  const [totalQ, setTotalQ] = useState<BaseItem>({
    id: "Q",
    count: undefined,
    unit: "m³/s",
    name: "总流量",
    description: "Q——总流量，m³/s",
  });
  const [items, setItems, itemsRef] = useMixedState<WShengTaiType[]>([]);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: WShengTaiType }) => {
      return (
        <div
          style={{
            marginTop: 12,
            marginInline: 12,
            padding: 12,
            backgroundColor: BlColor.lightPrimary,
            borderRadius: 8,
          }}
        >
          <div
            style={{
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <text
              style={{
                flex: 1,
                fontSize: 17,
                color: BlColor.primary,
              }}
            >{`第${index + 1}机组`}</text>
            <Button
              size={"small"}
              type={"primary"}
              icon={<CloseOutlined />}
              onClick={() => {
                // 删除
                setItems((old) => {
                  old?.splice(index, 1);
                  return [...(old ?? [])];
                });
              }}
            />
          </div>

          <Form style={{ padding: 12 }}>
            <BlInput
              item={item.N}
              onChange={(value) => {
                const newItems = items?.map((it, _index) => {
                  if (_index === index) {
                    return {
                      ...it,
                      N: { ...it.N, count: value, errorMessage: "" },
                    };
                  }
                  return it;
                });
                setItems(newItems);
              }}
            />
            <BlInput
              item={item.η}
              onChange={(value) => {
                const newItems = items?.map((it, _index) => {
                  if (_index === index) {
                    return {
                      ...it,
                      η: { ...it.η, count: value, errorMessage: "" },
                    };
                  }
                  return it;
                });
                setItems(newItems);
              }}
            />
            <BlInput
              item={item.h}
              onChange={(value) => {
                const newItems = items?.map((it, _index) => {
                  if (_index === index) {
                    return {
                      ...it,
                      h: { ...it.h, count: value, errorMessage: "" },
                    };
                  }
                  return it;
                });
                setItems(newItems);
              }}
            />
            <BlInput item={item.g} />
          </Form>
        </div>
      );
    },
    [items, setItems]
  );

  const checkPass = useCallback(() => {
    let pass = true;
    const checkItems = itemsRef.current?.map((el) => {
      if (!el.N.count) {
        pass = false;
        el.N.errorMessage = "请输入流量";
      } else {
        el.N.errorMessage = "";
      }
      if (!el.η.count) {
        pass = false;
        el.η.errorMessage = "请输入效率";
      } else {
        el.η.errorMessage = "";
      }
      if (!el.h.count) {
        pass = false;
        el.h.errorMessage = "请输入水头";
      } else {
        el.h.errorMessage = "";
      }
      return el;
    });
    setItems(checkItems);
    return pass;
  }, [itemsRef, setItems]);

  const onSubmit = useCallback(async () => {
    if (!checkPass()) {
      return;
    }
    const q = await ShengTaiJiZu.getQs(itemsRef.current ?? [])
      .toFixed(4)
      .toString();
    setTotalQ({ ...totalQ, count: q });
  }, [checkPass, itemsRef, totalQ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 12,
        overflow: "auto",
      }}
    >
      <div style={{ width: "50%", margin: 12 }}>
        <List
          style={{ padding: 12 }}
          bordered
          dataSource={items}
          renderItem={(item, index) => renderItem({ item, index })}
        />
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
          }}
        >
          <Button
            onClick={() => {
              setItems((old) => {
                return [...(old ?? []), initShengTaiItem];
              });
            }}
          >
            添加生态机组
          </Button>
        </div>
      </div>
      <div
        style={{
          margin: 12,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BlResult item={totalQ}></BlResult>
        <Button type={"primary"} style={{ marginTop: 20 }} onClick={onSubmit}>
          计算
        </Button>
      </div>
    </div>
  );
};
export default memo(WShengTaiJiZu);

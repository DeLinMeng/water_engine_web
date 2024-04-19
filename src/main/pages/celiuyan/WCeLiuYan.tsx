import React, { FC, memo, useMemo } from "react";
import BlSelect from "../../../common/BlSelect";
import { WaterCeLiuType } from "../../Containts";
import WCeLiuYan1 from "./WCeLiuYan1";
import WCeLiuYan2 from "./WCeLiuYan2";
import WCeLiuYan3 from "./WCeLiuYan3";
import { Form } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface Props {}
const WCeLiuYan: FC<Props> = (props) => {
  const [ceLiuType, setCeLiuType] = React.useState<WaterCeLiuType>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectItem = {
    id: "堰",
    count: "",
    unit: "",
    name: "测流堰类型",
    editable: true,
    placeholder: "请先选择测流堰类型",
    description: "测流堰类型",
  };

  const onGenderChange = (value: string) => {
    setCeLiuType(value as WaterCeLiuType);
  };

  const selectType = useMemo(() => {
    return (
      <BlSelect
        style={{ padding: 10 }}
        item={selectItem}
        options={Object.values(WaterCeLiuType)}
        onChange={onGenderChange}
      ></BlSelect>
    );
  }, [selectItem]);

  const renderContent = useMemo(() => {
    switch (ceLiuType) {
      case WaterCeLiuType.type_juxing:
        return <WCeLiuYan1 />;
      case WaterCeLiuType.type_sanjiao:
        return <WCeLiuYan2 />;
      case WaterCeLiuType.type_runyuan:
        return <WCeLiuYan3 />;
      default:
        return null;
    }
  }, [ceLiuType]);

  return (
    <Form name="control-hooks">
      {selectType}
      {renderContent}
    </Form>
  );
};
export default memo(WCeLiuYan);

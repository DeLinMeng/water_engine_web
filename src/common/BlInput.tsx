import { Form, Input } from "antd";
import React, { FC, memo } from "react";
import { BaseItem } from "../main/Home.type";
interface Props {
  item?: BaseItem;
  onChange?: (value: string) => void;
}
const BlInput: FC<Props> = (props) => {
  const { item, onChange } = props;
  return (
    <Form.Item
      style={{ marginTop: 10 }}
      name={`${item?.name}(${item?.id})`}
      label={`${item?.name}(${item?.id})`}
    >
      <Input
        placeholder={item?.placeholder}
        readOnly={!item?.editable}
        required={item?.editable}
        value={item?.count}
        defaultValue={item?.count}
        type="number"
        onChange={(value) => {
          const count = value.currentTarget.value;
          onChange?.(count);
        }}
        suffix={item?.unit}
      />
    </Form.Item>
  );
};
export default memo(BlInput);

import { Form, Select } from "antd";
import React, { memo } from "react";
import { BaseItem } from "../main/Home.type";

const { Option } = Select;

interface Props<T extends string> {
  options: T[];
  item?: BaseItem;
  onChange?: (value: T) => void;
  style?: React.CSSProperties;
}

function BlSelect<T extends string>(props: Props<T>) {
  const { item, onChange, options, style } = props;
  return (
    <Form.Item
      style={{ marginTop: 10, ...style }}
      name={`${item?.name}(${item?.id})`}
      label={`${item?.name}(${item?.id})`}
      rules={[{ required: true }]}
    >
      <Select placeholder={item?.placeholder} onChange={onChange} allowClear>
        {options.map((option) => {
          return (
            <Option key={option} value={option}>
              {option}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
}
export default memo(BlSelect);

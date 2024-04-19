import { FC, memo } from "react";
import BlColor from "./BlColor";
import { BaseItem } from "../main/Home.type";
interface Props {
  item?: BaseItem;
}
const BlDisable: FC<Props> = ({ item }) => {
  return (
    <view>
      <text
        style={{
          color: BlColor.grey3,
          fontSize: 15,
          fontFamily: "initial",
          fontWeight: "bold",
        }}
      >
        {item?.name ?? ""}
        {`(${item?.id})`}:
      </text>
      <text
        style={{
          marginLeft: 10,
          color: BlColor.grey3,
          fontSize: 15,
          fontFamily: "initial",
          fontWeight: "bold",
          padding: 5,
        }}
      >
        {item?.count ?? "- -"}
      </text>
    </view>
  );
};

export default memo(BlDisable);

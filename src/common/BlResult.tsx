import { FC, memo } from "react";
import BlColor from "./BlColor";
import { BaseItem } from "../main/Home.type";
interface Props {
  item?: BaseItem;
  type?: string;
}
const BlResult: FC<Props> = ({ item }) => {
  return (
    <text
      style={{
        color: BlColor.primary,
        fontSize: 18,
        fontFamily: "initial",
        fontWeight: "bold",
        border: "1px solid",
        padding: 10,
        borderRadius: 5,
      }}
    >
      {item?.name ?? ""}
      {`(${item?.id})`}: {item?.count ?? "- -"}
    </text>
  );
};

export default memo(BlResult);

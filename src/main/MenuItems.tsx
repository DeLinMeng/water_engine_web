import type { MenuProps } from "antd";
import { WaterCeLiuType, WaterXieLiuType } from "./Containts";
import WXieLiuZha from "./pages/WXieLiuZha";
import WXieLiuGuan from "./pages/WXieLiuGuan";
import WShengTaiBeng from "./pages/WShengTaiBeng";
import WShengTaiJiZu from "./pages/WShengTaiJiZu";
import WCeLiuYan from "./pages/celiuyan/WCeLiuYan";

export const MenuItems: MenuProps["items"] = [
  {
    label: WaterXieLiuType.type1,
    key: WaterXieLiuType.type1,
  },
  {
    label: WaterXieLiuType.type2,
    key: WaterXieLiuType.type2,
  },

  {
    label: WaterXieLiuType.type3,
    key: WaterXieLiuType.type3,
  },
  {
    label: WaterXieLiuType.type4,
    key: WaterXieLiuType.type4,
  },
  {
    label: WaterXieLiuType.type5,
    key: WaterXieLiuType.type5,
  },
];

export const getMenuPages = (type?: WaterXieLiuType) => {
  switch (type) {
    case WaterXieLiuType.type1:
      return <WXieLiuGuan />;
    case WaterXieLiuType.type2:
      return <WXieLiuZha />;
    case WaterXieLiuType.type3:
      return <WShengTaiJiZu />;
    case WaterXieLiuType.type4:
      return <WShengTaiBeng />;
    case WaterXieLiuType.type5:
      return <WCeLiuYan />;
    default:
      break;
  }
};

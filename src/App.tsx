import React, { useState } from "react";
import { ConfigProvider } from "antd";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { MenuItems, getMenuPages } from "./main/MenuItems";
import BlColor from "./common/BlColor";
import { WaterXieLiuType } from "./main/Containts";

const App: React.FC = () => {
  const [current, setCurrent] = useState<WaterXieLiuType>(
    WaterXieLiuType.type1
  );

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key as WaterXieLiuType);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: BlColor.primary,
          borderRadius: 2,
          // 派生变量，影响范围小
          colorBgContainer: BlColor.lightPrimary,
        },
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={MenuItems}
      />
      {getMenuPages(current)}
    </ConfigProvider>
  );
};

export default App;

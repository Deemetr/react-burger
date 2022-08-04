import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function TabContainer() {
  const [current, setCurrent] = React.useState("bread");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="bread" active={current === "bread"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="filling" active={current === "filling"} onClick={setCurrent}>
        Начинка
      </Tab>
    </div>
  );
}

export default TabContainer;

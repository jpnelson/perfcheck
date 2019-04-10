import * as React from "react";
import Select from "react-select";

import register from "../../index.js";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

register([
  {
    component: () => {
      let arr = [];
      for (let i = 0; i < 1000; i++) {
        arr[i] = <Select key={i} options={options} />;
      }
      return <React.Fragment>{arr}</React.Fragment>;
    }
  }
]);

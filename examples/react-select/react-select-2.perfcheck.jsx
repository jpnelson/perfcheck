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
    component: () => <Select options={options} />
  }
]);

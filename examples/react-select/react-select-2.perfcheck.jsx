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
    name: "basic",
    component: () => <Select options={options} />,
    tests: ["single-tti", "many-tti", "bundle-size"]
  }
]);

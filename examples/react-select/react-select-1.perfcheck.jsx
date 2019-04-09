import * as React from "react";
import Select from "react-select";

import register from "../../index.js";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate" }
];

register([
  {
    name: "basic",
    component: () => <Select options={options} />,
    tests: ["single-tti", "many-tti", "bundle-size"]
  }
]);

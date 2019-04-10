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
    component: () => <Select options={options} />
  }
]);

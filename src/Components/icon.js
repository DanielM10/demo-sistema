import React from "react";
import * as Muicon from "@material-ui/icons";

const Icon = ({ name, ...rest }) => {
  const IconComponent = Muicon[name];
  return IconComponent ? <IconComponent {...rest} /> : null;
};

export default Icon;
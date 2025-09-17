import React, { FC } from "react";
import { Label, Tag, Text } from "react-konva";

import { ShapeLabelProps } from "./interfaces";

const ShapeLabel: FC<ShapeLabelProps> = ({ x, y, text }) => (
  <Label x={x} y={y}>
    <Tag fill="black" opacity={0.75} cornerRadius={4} />
    <Text text={text} fill="white" fontSize={12} padding={4} />
  </Label>
);

export default ShapeLabel;

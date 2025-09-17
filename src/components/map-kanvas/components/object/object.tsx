import React, { FC } from "react";
import useImage from "use-image";
import { Image } from "react-konva";

import { ObjectProps } from "./interfaces";

const Object: FC<ObjectProps> = ({
  src,
  x,
  y,
  width = 100,
  height = 100,
  ...rest
}) => {
  const [image] = useImage(src);

  return (
    <Image
      x={x}
      y={y}
      width={width}
      height={height}
      {...rest}
      alt={src}
      image={image}
    />
  );
};

export default Object;

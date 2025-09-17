import Konva from "konva";
import { KonvaNodeEvents } from "react-konva";

export interface ObjectProps
  extends Omit<Konva.ImageConfig, "image">,
    KonvaNodeEvents {
  src: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

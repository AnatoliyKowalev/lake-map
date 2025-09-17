"use client";

import { FC, useEffect, useRef, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";

import Object from "./components/object";
import ShapeLabel from "./components/shape-label";
import { SidebarTrigger } from "@/components/ui/sidebar";

// import lake_2018 from "@/../public/2018.jpg";
// import lake_2022 from "@/../public/2022.jpg";

import { ZONES } from "./zones";
import { LAKE_LAYERS } from "./lake-layers";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMapFilter } from "@/contexts/map-filter";
import { BASE_PATH } from "@/lib/constants";
import {
  DEFAULT_HISTORY,
  DEFAULT_MAP_SIZE,
  loadImage,
  MAP_YEARS,
} from "./constants";

import { TypeHistory } from "./interfaces";
import { withBasePath } from "@/lib/utils";

const MapKanvas: FC = () => {
  // const [size, setSize] = useState(DEFAULT_MAP_SIZE);
  // const [points, setPoints] = useState<number[]>([]);
  // const [isDrawing, setIsDrawing] = useState(false);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);
  const [history, setHistory] = useState<TypeHistory>(DEFAULT_HISTORY);

  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { filter } = useMapFilter();

  const handleLineTooltip = (e: KonvaEventObject<unknown, unknown>) => {
    const pos = e.target.getStage()?.getPointerPosition();
    const info = e.target.attrs.dataInfo;

    if (pos && info) {
      setTooltip({
        ...pos,
        text: info,
      });
    }
  };

  const tooltipHandlers = {
    onMouseEnter: handleLineTooltip,
    onMouseMove: handleLineTooltip,
    onTouchStart: handleLineTooltip,
    onTouchMove: handleLineTooltip,
  };

  // const handleMouseDown = (e: any) => {
  //   const stage = e.target.getStage();
  //   const pos = stage.getPointerPosition();
  //   setPoints([pos!.x, pos!.y]);
  //   setIsDrawing(true);
  // };

  // const handleMouseMove = (e: any) => {
  //   if (!isDrawing) return;
  //   const stage = e.target.getStage();
  //   const pos = stage.getPointerPosition();
  //   setPoints((prev) => [...prev, pos!.x, pos!.y]);
  // };

  // const handleMouseUp = () => {
  //   setIsDrawing(false);
  // };

  const mapScaler = (size: number) => (isMobile ? size / 2 : size);

  useEffect(() => {
    Promise.all([
      loadImage(`${BASE_PATH}/2018.jpg`),
      loadImage(`${BASE_PATH}/2022.jpg`),
    ]).then(([map_2018, map_2022]) => {
      setHistory({
        map_2018,
        map_2022,
      });
    });
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (containerRef.current) {
  //       setSize({
  //         width: containerRef.current.clientWidth,
  //         height: DEFAULT_MAP_SIZE.height,
  //         // height: containerRef.current.offsetHeight,
  //       });
  //     }
  //   };
  //   handleResize(); // set initial size
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div
      className="py-4 flex flex-col gap-2 w-full overflow-hidden"
      ref={containerRef}
    >
      <SidebarTrigger className="bg-blue-500 fixed top-2 z-50" />
      <Stage
        width={DEFAULT_MAP_SIZE.width}
        height={mapScaler(DEFAULT_MAP_SIZE.height)}
        onMouseLeave={() => setTooltip(null)}
      >
        <Layer>
          {MAP_YEARS.map((year) => {
            // @ts-expect-error sssss
            const img = history[`map_${year}`];

            return (
              img && (
                <KonvaImage
                  image={img}
                  x={0}
                  y={0}
                  width={mapScaler(800)}
                  height={mapScaler(600)}
                  // @ts-expect-error sssss
                  opacity={filter[`opacity_${year}`]}
                  key={`year-map-${year}`}
                />
              )
            );
          })}
          {filter.show_layers &&
            LAKE_LAYERS.map(({ name, shape, depth }) => {
              const points = JSON.parse(shape) as number[];

              return (
                <Line
                  onPointerMove={handleLineTooltip}
                  {...tooltipHandlers}
                  points={points.map((point) => mapScaler(point))}
                  tension={0.1}
                  opacity={0.3}
                  stroke="#0b5768ff"
                  fill="#0b5768ff"
                  strokeWidth={0.5}
                  dataInfo={`Глибина: ${depth}`}
                  closed
                  key={`shape-${name}`}
                />
              );
            })}
          {filter.show_objects &&
            ZONES.map(({ name, shape, img, x, y, width, height }) => {
              const points = shape && (JSON.parse(shape) as number[]);

              return points ? (
                <Line
                  {...tooltipHandlers}
                  points={points.map((point) => mapScaler(point))}
                  tension={0.1}
                  opacity={filter.show_objects ? 0.3 : 0}
                  stroke="#b8c22dff"
                  fill="#b8c22dff"
                  strokeWidth={0.5}
                  closed
                  dataInfo={name}
                  key={`shape-${name}`}
                />
              ) : (
                img && width && height && (
                  <Object
                    {...tooltipHandlers}
                    src={withBasePath(img)}
                    x={mapScaler(x)}
                    y={mapScaler(y)}
                    width={mapScaler(width)}
                    height={mapScaler(height)}
                    dataInfo={name}
                    key={`shape-${name}`}
                  />
                )
              );
            })}
          {tooltip && (
            <>
              <ShapeLabel
                x={tooltip.x - 40}
                y={tooltip.y + 20}
                text={tooltip.text}
              />
              <ShapeLabel
                x={40}
                y={40}
                text={`${`x:${Math.trunc(
                  isMobile ? tooltip.x * 2 : tooltip.x
                )} y:${Math.trunc(isMobile ? tooltip.y * 2 : tooltip.y)}`}`}
              />
            </>
          )}
          {/* <Line
            points={points}
            stroke="pink"
            strokeWidth={2}
            tension={2}
            closed
          /> */}
        </Layer>
      </Stage>
    </div>
  );
};

export default MapKanvas;

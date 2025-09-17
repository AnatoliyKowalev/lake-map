"use client";

import React from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

import { MAP_YEARS } from "./constants";
import { useMapFilter } from "@/contexts/map-filter";

const Filter = () => {
  const { filter, updateFilter } = useMapFilter();

  return (
    <Card className="p-2 grid gap-4">
      {MAP_YEARS.map((year) => {
        // @ts-ignore
        const opacity = filter[`opacity_${year}`];

        return (
          <React.Fragment key={year}>
            <Label className="grid gap-2">
              <div className="relative flex gap-2">
                <Badge className="absolute bottom-1 left-1 bg-secondary text-xs">
                  {year}
                </Badge>
                <Image
                  onClick={() =>
                    updateFilter({
                      [`opacity_${year}`]: opacity === 1 ? 0 : 1,
                    })
                  }
                  src={`/${year}.jpg`}
                  width={100}
                  height={100}
                  className="rounded w-full"
                  alt={`${year} year lake view`}
                />
              </div>
              <div>Видимість: {opacity * 100}%</div>
              <Slider
                onValueChange={(value) =>
                  updateFilter({
                    [`opacity_${year}`]: value[0],
                  })
                }
                value={[opacity]}
                min={0}
                max={1}
                step={0.1}
              />
            </Label>
          </React.Fragment>
        );
      })}
      <div className="relative flex gap-2">
        <Image
          src={`/layers.jpg`}
          width={100}
          height={100}
          className="rounded w-full"
          alt={`Layrs year lake view`}
        />
      </div>
      <Label className="gap-2">
        Показати:
        <Checkbox
          defaultChecked={filter.show_layers}
          onCheckedChange={(show_layers: boolean) =>
            updateFilter({
              show_layers,
            })
          }
        />
      </Label>
      <Label className="gap-2">
        Показати об'єкти:
        <Checkbox
          defaultChecked={filter.show_objects}
          onCheckedChange={(show_objects: boolean) =>
            updateFilter({
              show_objects,
            })
          }
        />
      </Label>
    </Card>
  );
};

export default Filter;

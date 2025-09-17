export const MAP_YEARS = [2018, 2022];

export const DEFAULT_MAP_SIZE = { width: 750, height: 600 };

export const DEFAULT_HISTORY = {
  map_2018: null,
  map_2022: null,
};

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
};

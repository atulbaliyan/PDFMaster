
import { FilterType } from "../../../../types/filter";

export function filterMatrix(filter: FilterType): number[] {
  switch (filter) {
    case "grayscale":
      return grayscaleMatrix();

    case "bw":
      return blackWhiteMatrix();

    case "document":
      return documentMatrix();

    case "enhanced":
      return enhancedMatrix();

    default:
      return originalMatrix();
  }
}



// colorMatrices.ts

/**
 * Brightness
 * value range: -100 to 100
 */
export function brightnessMatrix(value: number): number[] {
  const offset = value /300;

  return [
    1, 0, 0, 0, offset,
    0, 1, 0, 0, offset,
    0, 0, 1, 0, offset,
    0, 0, 0, 1, 0,
  ];
}


/**
 * Contrast
 * value range: -100 to 100
 */
export function contrastMatrix(value: number): number[] {
  const contrast = 1 + value / 100;
  const intercept = 0.5 * (1 - contrast);

  return [
    contrast, 0, 0, 0, intercept,
    0, contrast, 0, 0, intercept,
    0, 0, contrast, 0, intercept,
    0, 0, 0, 1, 0,
  ];
}

export function multiplyMatrices(a: number[], b: number[]): number[] {
  const result = new Array(20).fill(0);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      let sum = 0;

      for (let k = 0; k < 4; k++) {
        sum += a[row * 5 + k] * b[k * 5 + col];
      }

      if (col === 4) {
        sum += a[row * 5 + 4];
      }

      result[row * 5 + col] = sum;
    }
  }

  return result;
}

export function grayscaleMatrix(): number[] {
  return [
    0.2126, 0.7152, 0.0722, 0, 0,
    0.2126, 0.7152, 0.0722, 0, 0,
    0.2126, 0.7152, 0.0722, 0, 0,
    0,      0,      0,      1, 0,
  ];
}

export function originalMatrix(): number[] {
  return [
    1,0,0,0,0,
    0,1,0,0,0,
    0,0,1,0,0,
    0,0,0,1,0,
  ];
}

export function blackWhiteMatrix(): number[] {
  return [
    1.5, 1.5, 1.5, 0, -1,
    1.5, 1.5, 1.5, 0, -1,
    1.5, 1.5, 1.5, 0, -1,
    0,   0,   0,   1, 0,
  ];
}

export function documentMatrix(): number[] {
  return [
    1.2, 0,   0,   0, 0.05,
    0,   1.2, 0,   0, 0.05,
    0,   0,   1.2, 0, 0.05,
    0,   0,   0,   1, 0,
  ];
}
export function enhancedMatrix(): number[] {
  return [
    1.3, 0,   0,   0, 0.02,
    0,   1.3, 0,   0, 0.02,
    0,   0,   1.3, 0, 0.02,
    0,   0,   0,   1, 0,
  ];
}
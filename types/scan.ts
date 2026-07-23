export interface ScanImage {
  id: string;
  uri: string;
  rotation: number;
  brightness: number;
  contrast: number;
  filter:
    | "original"
    | "bw"
    | "grayscale"
    | "magic"
    | "highContrast";
  cropped: boolean;
}
import { ScanImage } from "../../types/scan";

export function addPage(
  pages: ScanImage[],
  page: ScanImage
): ScanImage[] {
  return [...pages, page];
}

export function removePage(
  pages: ScanImage[],
  id: string
): ScanImage[] {
  return pages.filter((page) => page.id !== id);
}
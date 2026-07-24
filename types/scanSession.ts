import {ScanImage} from "./scan";

export interface ScanSession {
  id: string;
  pages: ScanImage[];
  createdAt: string;
}
import { IGalleryFrontmatter } from "./frontmatters.interfaces";

export interface IGetGallery_photograph extends IGalleryFrontmatter {}

export interface IGetGalleryOutput {
  gallery: IGetGallery_photograph[];
}

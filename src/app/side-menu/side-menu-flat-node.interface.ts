/** Flat node with expandable and level information */
export interface SideMenuFlatNode {
  name: string;
  path?: string;
  children?: SideMenuFlatNode[];
}

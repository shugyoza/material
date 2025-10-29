/** Flat node with expandable and level information */
export interface SideMenuFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}

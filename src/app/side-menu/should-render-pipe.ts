import { Pipe, PipeTransform } from '@angular/core';

import { SideMenuFlatNode } from './side-menu-flat-node.interface';

@Pipe({
  name: 'shouldRender'
})
export class ShouldRenderPipe implements PipeTransform {
  getParentNode(currentNode: SideMenuFlatNode, nodes: SideMenuFlatNode[]) {
    const nodeIndex = nodes.indexOf(currentNode);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      const node = nodes[i];
      if (node.level === currentNode.level - 1) {
        return node;
      }
    }

    return null;
  }

  transform(currentNode: SideMenuFlatNode, nodes: SideMenuFlatNode[]): boolean {
    let parent = this.getParentNode(currentNode, nodes);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }

      parent = this.getParentNode(parent, nodes);
    }

    return true;
  }

}

import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTreeModule, CdkTree } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { map, timer } from 'rxjs';

import { SideMenuFlatNode } from './side-menu-flat-node.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [CdkTreeModule, MatButtonModule, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  tree = viewChild<CdkTree<SideMenuFlatNode>>(CdkTree);

  childrenAccessor = (dataNode: SideMenuFlatNode) => {
    return timer(100).pipe(map(() => dataNode.children ?? []));
  };

  dataSource = new ArrayDataSource(EXAMPLE_DATA);

  nodes = EXAMPLE_DATA;

  hasChild = (_: number, node: SideMenuFlatNode): boolean => {
    return (node.children?.length ?? 0) > 0;
  };

  getParentNode(node: SideMenuFlatNode): SideMenuFlatNode | null {
    for (const parent of flattenNodes(EXAMPLE_DATA)) {
      if (parent.children?.includes(node)) {
        return parent;
      }
    }

    return null;
  }

  shouldRender(node: SideMenuFlatNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!this.tree()?.isExpanded(parent)) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }
}

function flattenNodes(nodes: SideMenuFlatNode[]): SideMenuFlatNode[] {
  const flattenedNodes: SideMenuFlatNode[] = [];

  for (const node of nodes) {
    flattenedNodes.push(node);

    if (node.children) {
      flattenedNodes.push(...flattenNodes(node.children));
    }
  }

  return flattenedNodes;
}

const EXAMPLE_DATA: SideMenuFlatNode[] = [
  {
    name: 'Admin',
    icon: 'manage_accounts',
    children: [
      {
        name: 'Client',
        children: [
          {
            name: 'Person',
            icon: 'person',
          },
          {
            name: 'LLC',
            icon: 'work',
          },
          {
            name: 'Corporation',
            icon: 'enterprise',
          },
          {
            name: 'Partnership',
            icon: 'group',
          },
        ],
      },
      {
        name: 'Document',
        icon: 'docs',
        children: [
          {
            name: 'Deed',
            icon: 'book',
          },
          {
            name: 'Legalization',
            icon: 'license',
          },
          {
            name: 'Registration',
            icon: 'approval',
          },
        ],
      },
    ],
  },
  {
    name: 'Client',
  },
  {
    name: 'Document',
  },
  {
    name: 'Music',
    path: 'music',
    icon: 'music_note',
  },
];

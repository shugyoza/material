import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ArrayDataSource} from '@angular/cdk/collections';
import {FlatTreeControl, CdkTreeModule} from '@angular/cdk/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { SideMenuFlatNode } from './side-menu-flat-node.interface';
import { ShouldRenderPipe } from './should-render-pipe';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-side-menu',
  imports: [CdkTreeModule, MatButtonModule, MatIconModule, ShouldRenderPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  readonly flatTreeControl = signal(new FlatTreeControl<SideMenuFlatNode>(
    node => node.level,
    node => node.expandable,
  ));

  dataSource = new ArrayDataSource(EXAMPLE_DATA);

  nodes = EXAMPLE_DATA

  hasChild = (_: number, node: SideMenuFlatNode) => node.expandable;
}

const EXAMPLE_DATA: SideMenuFlatNode[] = [
  {
    name: 'Fruit',
    expandable: true,
    level: 0,
  },
  {
    name: 'Apple',
    expandable: false,
    level: 1,
  },
  {
    name: 'Banana',
    expandable: false,
    level: 1,
  },
  {
    name: 'Fruit loops',
    expandable: false,
    level: 1,
  },
  {
    name: 'Vegetables',
    expandable: true,
    level: 0,
  },
  {
    name: 'Green',
    expandable: true,
    level: 1,
  },
  {
    name: 'Broccoli',
    expandable: false,
    level: 2,
  },
  {
    name: 'Brussels sprouts',
    expandable: false,
    level: 2,
  },
  {
    name: 'Orange',
    expandable: true,
    level: 1,
  },
  {
    name: 'Pumpkins',
    expandable: false,
    level: 2,
  },
  {
    name: 'Carrots',
    expandable: false,
    level: 2,
  },
];

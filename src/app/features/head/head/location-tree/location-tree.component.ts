import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface LocationNode {
  name: string;
  children?: LocationNode[];
}

const TREE_DATA: LocationNode[] = [
  {
    name: 'Belarus',
    children: [
      {name: 'Minsk'},
      {name: 'Barysaw'},
      {name: 'Salihorsk'},
    ]
  }, {
    name: 'Ukraine',
    children: [
      {
        name: 'Kyiv',
        children: [
          {name: 'Borispol'},
          {name: 'Malin'},
        ]
      }, {
        name: 'Vinnitsya',
        children: [
          {name: 'Zhytomir'},
          {name: 'Litin'},
        ]
      },
    ]
  },
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-location-tree',
  templateUrl: './location-tree.component.html',
  styleUrls: ['./location-tree.component.scss']
})
export class LocationTreeComponent implements OnInit {
  private _transformer = (node: LocationNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {
  }
}

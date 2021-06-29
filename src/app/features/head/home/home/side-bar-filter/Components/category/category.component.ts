import { Component, OnInit, Input } from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
//////////////////////////////////////////
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Category',
    children: [
      {name: 'Home'},
      {name: 'Food'},
      {name: 'Clothes'},
    ]
  }, {
    name: 'Location',
    children: [
      {
        name: 'Ukraine',
        children: [
          {name: 'Kiev'},
          {name: 'Lviv'},
        ]
      }, {
        name: 'Belarus',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/////////////////////////////////////////
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
////////////////////////////////////////
export class CategoryComponent implements OnInit {

  ngOnInit(): void {
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  //-----------------------------------
}
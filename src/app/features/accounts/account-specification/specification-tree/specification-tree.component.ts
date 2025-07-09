import { Component, input, output } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { AccountSpecificationNode } from '../../../../services';

@Component({
  selector: 'app-specification-tree',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule],
  template: `
    <mat-tree
      #treeRef
      [dataSource]="tree()"
      [childrenAccessor]="childrenAccessor"
    >
      <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
        <button
          [ngClass]="{ 'text-blue-500': currentNode() === node.id }"
          mat-button
          (click)="onNodeClick(node)"
        >
          {{ node.label }}
        </button>
      </mat-tree-node>

      <mat-tree-node
        *matTreeNodeDef="let node; when: hasChild"
        matTreeNodePadding
        matTreeNodeToggle
        [cdkTreeNodeTypeaheadLabel]="node.name"
      >
        <button
          matIconButton
          matTreeNodeToggle
          [attr.aria-label]="'Toggle ' + node.name"
        >
          <mat-icon class="mat-icon-rtl-mirror">
            {{ treeRef.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
          </mat-icon>
        </button>

        <p class="flex items-center justify-between">
          <span class="text-lg">{{ node.label }}</span>
          <span class="text-lg ml-2 p-2 bg-gray-600 rounded-md text-gray-500">{{
            node.count
          }}</span>
        </p>
      </mat-tree-node>
    </mat-tree>
  `,
  styles: [
    `
      .mat-tree-node button {
        text-align: left;
      }
    `,
  ],
})
export class SpecificationTreeComponent {
  currentNode = input<string | null>(null);
  tree = input<AccountSpecificationNode[]>([]);
  nodeSelected = output<string>();

  childrenAccessor = (node: AccountSpecificationNode) => node.children ?? [];

  hasChild = (_: number, node: AccountSpecificationNode) =>
    !!node.children && node.children.length > 0;

  onNodeClick(node: AccountSpecificationNode) {
    this.nodeSelected.emit(node.id);
  }
}

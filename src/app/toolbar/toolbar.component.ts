import { Component } from '@angular/core';
import { CoreMaterialModule } from '../core-material.module';
import { CommonModule } from '@angular/common';

/** @title Basic sidenav */
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrl: 'toolbar.component.scss',
  imports: [CommonModule, CoreMaterialModule],
  standalone: true,
})
export class ToolbarComponent {}

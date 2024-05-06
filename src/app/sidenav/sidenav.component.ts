import { Component, ViewChild } from '@angular/core';
import { CoreMaterialModule } from '../core-material.module';
import { CommonModule } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

/** @title Basic sidenav */
@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrl: './sidenav.component.scss',

  // styleUrl: 'sidenav-overview-example.css',
  imports: [CommonModule, CoreMaterialModule],
  standalone: true,
})
export class SidenavComponent {
  isExpanded = true;
  showSubmenu: boolean = false;
  accordionOpen: boolean = false;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  closeAllPanels() {
    this.accordion?.closeAll();
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded) this.accordion?.closeAll();
  }

  toggleAccordion() {
    if (!this.isExpanded) return;
    this.accordionOpen = !this.accordionOpen;
  }
}

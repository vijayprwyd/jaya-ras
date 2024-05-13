import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

const constructFormObject = (
  tabs: string[],
  screens: string[],
  permissions: string[]
) => {
  const tabGroup: any = {};
  tabs.forEach((tab) => {
    const screenGroup: any = {};
    screens.forEach((screen) => {
      const permissionGroup: any = {};
      permissions.forEach(
        (permission) => (permissionGroup[permission] = new FormControl(''))
      );
      screenGroup[screen] = new FormGroup(permissionGroup);
    });
    tabGroup[tab] = new FormGroup(screenGroup);
  });
  return new FormGroup(tabGroup);
};

@Component({
  standalone: true,
  selector: 'permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class PermissionFormComponent {
  name = new FormControl('');
  tabs: string[] = ['Tab1', 'Tab2', 'Tab3'];
  screens: string[] = ['Screen1', 'Screen2', 'Screen3'];
  permissions: string[] = ['Create', 'Read', 'Update', 'Delete'];

  onSubmit() {
    console.log(this.permissionForm.value);
  }

  permissionForm = constructFormObject(
    this.tabs,
    this.screens,
    this.permissions
  );
}

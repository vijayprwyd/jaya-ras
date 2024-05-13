import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { mockData } from './mock';

const constructFormObject = (
  tabNames: string[],
  screenNames: string[],
  labelNames: string[]
) => {
  const tabNamesGroup: any = {};
  tabNames.forEach((tab) => {
    const screenNamesGroup: any = {};
    screenNames.forEach((screen) => {
      const labelNamesGroup: any = {};
      labelNames.forEach(
        (label) => (labelNamesGroup[label] = new FormControl(''))
      );
      labelNamesGroup['selectAll'] = new FormControl('');
      screenNamesGroup[screen] = new FormGroup(labelNamesGroup);
    });
    tabNamesGroup[tab] = new FormGroup(screenNamesGroup);
  });
  return new FormGroup(tabNamesGroup);
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
export class PermissionFormComponent implements OnInit {
  name = new FormControl('');
  tabNames: string[] = [];
  screenNames: string[] = [];
  labelNames: string[] = [];
  permissionForm: any;

  onSubmit() {
    console.log(this.permissionForm.value);
  }

  toggleSelectAllPermission(
    evt: MatCheckboxChange,
    screenName: string,
    tabName: string
  ) {
    const updatedFields: Record<string, boolean> = {};
    this.labelNames.forEach((label) => (updatedFields[label] = evt.checked));
    this.permissionForm.patchValue({
      [tabName]: {
        [screenName]: updatedFields,
      },
    });
  }

  toggleSelectAllPermissions(evt: MatCheckboxChange, tabName: string) {
    const updatedLabels: Record<string, boolean> = {};
    const updatedScreens: Record<string, Record<string, boolean>> = {};

    this.labelNames.forEach((label) => (updatedLabels[label] = evt.checked));
    this.screenNames.forEach(
      (screen) => (updatedScreens[screen] = updatedLabels)
    );

    this.permissionForm.patchValue({
      [tabName]: updatedScreens,
    });
  }

  async ngOnInit() {
    // API call here
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tabIdNameMap = new Map(
      mockData.tabDto.map((tab) => [tab.tabName, tab.tabId])
    );

    const screenIdTabsMap = new Map();
    mockData.screenDto.forEach((screen) => {
      const currentScreens = screenIdTabsMap.get(screen.screensId) ?? [];
      currentScreens.push({
        tabId: screen.screensId,
        screenNames: screen.screenName,
      });
      this.screenNames.push(screen.screenName);
    });

    this.tabNames = [...tabIdNameMap.keys()];

    const labelIdNamesMap = new Map(
      mockData.labelDto.map((label) => [label.labelName, label.labelId])
    );
    this.labelNames = [...labelIdNamesMap.keys()];

    this.permissionForm = constructFormObject(
      this.tabNames,
      this.screenNames,
      this.labelNames
    );
  }
}

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

interface Tab {
  tabId: number;
  tabName: string;
  visibility: string;
  screens: {
    screenId: number;
    screenName: string;
  }[];
}

interface Label {
  labelId: number;
  labelName: string;
  labelDescription: string;
  language: string;
}

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
  permissionForm: any;
  tabs: Tab[] = [];
  labels: Label[] = [];

  onSubmit() {
    console.log(this.permissionForm.value);
  }

  toggleLabelsForSelectedScreen(
    evt: MatCheckboxChange,
    screenName: string,
    tabName: string
  ) {
    const updatedFields: Record<string, boolean> = {};
    this.labels.forEach(
      (label) => (updatedFields[label.labelName] = evt.checked)
    );
    this.permissionForm.patchValue({
      [tabName]: {
        [screenName]: updatedFields,
      },
    });
  }

  toggleLabelsForAllScreensInTab(evt: MatCheckboxChange, tab: Tab) {
    const updatedLabels: Record<string, boolean> = {};
    const updatedScreens: Record<string, Record<string, boolean>> = {};

    this.labels.forEach(
      (label) => (updatedLabels[label.labelName] = evt.checked)
    );
    updatedLabels['selectAll'] = evt.checked;

    tab.screens.forEach(
      (screen) => (updatedScreens[screen.screenName] = updatedLabels)
    );

    this.permissionForm.patchValue({
      [tab.tabName]: updatedScreens,
    });
  }

  getScreenInfoByTab = (tabId: number) =>
    mockData.screenDto
      .filter((screen) => screen.screensId.tabId === tabId)
      .map((screen) => ({
        screenId: screen.screensId.screenId,
        screenName: screen.screenName,
      }));

  transformData = () => {
    this.tabs = mockData.tabDto.map((tab) => ({
      ...tab,
      screens: this.getScreenInfoByTab(tab.tabId),
    }));
    this.labels = mockData.labelDto;
  };

  constructFormObject = () => {
    const tabNamesGroup: any = {};
    this.tabs.forEach((tab) => {
      const screenNamesGroup: any = {};
      tab.screens.forEach((screen) => {
        const labelNamesGroup: any = {};
        this.labels.forEach(
          (label) => (labelNamesGroup[label.labelName] = new FormControl(''))
        );
        labelNamesGroup['selectAll'] = new FormControl('');
        screenNamesGroup[screen.screenName] = new FormGroup(labelNamesGroup);
      });
      tabNamesGroup[tab.tabName] = new FormGroup(screenNamesGroup);
    });
    this.permissionForm = new FormGroup(tabNamesGroup);
  };

  async ngOnInit() {
    // API call here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.transformData();
    this.constructFormObject();
  }
}

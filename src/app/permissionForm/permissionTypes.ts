export interface Tab {
  tabId: number;
  tabName: string;
  visibility: string;
  screens: {
    screenId: number;
    screenName: string;
  }[];
}

export interface Label {
  labelId: number;
  labelName: string;
  labelDescription: string;
  language: string;
}

export interface RequestPayload {
  permissionDto: {
    permissionId: {
      roleName: string;
      screenId: number;
    };
    permissions: string;
  }[];
}

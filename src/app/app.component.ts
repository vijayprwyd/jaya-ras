import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { CoreMaterialModule } from './core-material.module';
import { LoginComponent } from './login/login.component';
import { PermissionFormComponent } from './permissionForm/permission-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoreMaterialModule,
    SidenavComponent,
    ToolbarComponent,
    LoginComponent,
    PermissionFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ras-app';
}

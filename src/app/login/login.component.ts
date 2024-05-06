import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreMaterialModule } from '../core-material.module';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterOutlet, CoreMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  title = 'login';
}

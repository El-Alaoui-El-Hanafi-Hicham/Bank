import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone:false,
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
saveSettings() {
throw new Error('Method not implemented.');
}
notifications: boolean=false;
darkMode: boolean=false;
}

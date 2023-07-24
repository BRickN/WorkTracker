import {SettingsFormData} from '../../screens/settingsScreen';

export class Settings {
  breakTime: string;
  hoursPerWeek: string;
  yearlyHours: string;

  constructor(settingsFormData: SettingsFormData) {
    this.breakTime = settingsFormData.breakTime;
    this.hoursPerWeek = settingsFormData.hoursPerWeek;
    this.yearlyHours = settingsFormData.yearlyHours;
  }
}

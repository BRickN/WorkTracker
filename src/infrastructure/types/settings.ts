import {SettingsFormData} from '../../screens/settingsScreen';

export class Settings {
  breakTime: string;
  yearlyHours: string;

  constructor(settingsFormData: SettingsFormData) {
    this.breakTime = settingsFormData.breakTime;
    this.yearlyHours = settingsFormData.yearlyHours;
  }
}

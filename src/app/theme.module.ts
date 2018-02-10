import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCheckboxModule,

  MatCardModule, MatListModule, MatInputModule, MatSliderModule,
  MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatStepperModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSidenavModule,

    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatToolbarModule,

    BrowserAnimationsModule

  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSidenavModule,

    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,

    MatSidenavModule
  ]
})
export class ThemeModule
{
  constructor() {
  }
}

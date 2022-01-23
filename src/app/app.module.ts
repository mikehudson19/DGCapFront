import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ReportComponent } from './report/report.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { HttpClientModule } from '@angular/common/http';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from "primeng/calendar";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ReportComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

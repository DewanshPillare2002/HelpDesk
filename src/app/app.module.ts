import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlotpageComponent } from './slotpage/slotpage.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { EntryDetailsComponent } from './entry-details/entry-details.component';
import { ExitDetailsComponent } from './exit-details/exit-details.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';

import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { HeaderComponent } from './header/header.component';
import { MainScreenBodyComponent } from './main-screen-body/main-screen-body.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SlotpageComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    EntryDetailsComponent,
    ExitDetailsComponent,
    HistoryDetailsComponent,
    StaffHomeComponent,
    ManageUsersComponent,
    ManageStaffComponent,
    HeaderComponent,
    MainScreenBodyComponent,
    StaffDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

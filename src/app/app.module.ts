import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HelpFeedbackComponent } from './help-feedback/help-feedback.component';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SuccessComponent } from './success/success.component';
import { SummaryComponent } from './summary/summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlotpageComponent } from './slotpage/slotpage.component';
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
import { PaymentProgressComponent } from './payment-progress/payment-progress.component';


@NgModule({
  // Decalrations contains the names of all the components/directives/pipes that you have created
  declarations: [
    AppComponent,
    FeedbackComponent,
    HelpFeedbackComponent,
    SubscriptionComponent,
    SuccessComponent,
    SummaryComponent,
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
    StaffDetailsComponent,
    PaymentProgressComponent
  ],
  // imports contain the names of all the modules whose components are required in your module.
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  // providers is an array for registering services, so that they can be avaliable to every component.
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
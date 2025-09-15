import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpFeedbackComponent } from './help-feedback/help-feedback.component';
import Feedback from './feedback/feedback';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { MainScreenBodyComponent } from './main-screen-body/main-screen-body.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { EntryDetailsComponent } from './entry-details/entry-details.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { ExitDetailsComponent } from './exit-details/exit-details.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';
import { SlotpageComponent } from './slotpage/slotpage.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SuccessComponent } from './success/success.component';
import { SummaryComponent } from './summary/summary.component';



const routes: Routes = [
  {path: 'help&support', component: HelpFeedbackComponent},
  {path: 'feedback', component: Feedback},
  {path: '', component: HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path : 'adminScreen', component : MainScreenBodyComponent},
  {path : 'home', component : AppComponent},
  {path : 'manageStaff', component : ManageStaffComponent},
  {path : 'staffDetails/:id', component : StaffDetailsComponent},
  {path : 'manageUsers', component : ManageUsersComponent},

  {path: 'StaffHome', component: StaffHomeComponent},
  {path: 'Entry', component: EntryDetailsComponent},
  {path: 'Exit', component: ExitDetailsComponent},
  {path: 'History', component: HistoryDetailsComponent},
  {path:'slotpage', component:SlotpageComponent},

  {path: 'sus' , component:SubscriptionComponent},
  {path: 'success', component: SuccessComponent},
    {path:'checkout', component: SummaryComponent,
        children : [{path: 'subscriptions/:id', component : SummaryComponent}]
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

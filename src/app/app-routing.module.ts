import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SuccessComponent } from './success/success.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
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

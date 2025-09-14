import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpFeedbackComponent } from './help-feedback/help-feedback.component';
import Feedback from './feedback/feedback';

const routes: Routes = [
  {path: 'help&support', component: HelpFeedbackComponent},
  {path: 'feedback', component: Feedback}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

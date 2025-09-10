import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HelpFeedbackComponent } from './help-feedback/help-feedback.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot/chatbot.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    HelpFeedbackComponent,
    PaymentComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

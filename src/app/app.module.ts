import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { EditComponent } from './pages/edit/edit.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { CancelAppointmentComponent } from './components/modals/cancel-appointment/cancel-appointment.component';
import { EditAppointmentComponent } from './components/modals/edit-appointment/edit-appointment.component';
import { AuthInterceptor } from './interceptors/auth';
import { SharedModule } from './shared/shared/shared.module';
import { EmailSubscribtionButtonComponent } from './shared/components/email-subscribtion-button/email-subscribtion-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    CreateAppointmentComponent,
    EditComponent,
    LoadingComponent,
    CancelAppointmentComponent,
    EditAppointmentComponent,
    EmailSubscribtionButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    HotToastModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

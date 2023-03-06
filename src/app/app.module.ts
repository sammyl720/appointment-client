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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditComponent } from './pages/edit/edit.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { HotToastModule } from '@ngneat/hot-toast';
import { CancelAppointmentComponent } from './components/modals/cancel-appointment/cancel-appointment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditAppointmentComponent } from './components/modals/edit-appointment/edit-appointment.component';
import { environment } from './environments/environment';
import { AuthInterceptor } from './interceptors/auth';
import { EventDetailsComponent } from './components/event-details/event-details.component';
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
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
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

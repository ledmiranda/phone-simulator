import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhoneSimulatorComponent } from './phone-simulator/phone-simulator.component';
import { ApplicationListComponent } from './phone-simulator/application-list/application-list.component';
import { ApplicationItemComponent } from './phone-simulator/application-item/application-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { applicationsReducer } from './store/applications/applications.reducer';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApplicationInterceptor } from './util/application.interceptor';
import { ApplicationFormComponent } from './phone-simulator/application-form/application-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ApplicationEditComponent } from './phone-simulator/application-item/application-edit/application-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationListComponent,
    ApplicationItemComponent,
    SpinnerComponent,
    ApplicationFormComponent,
    ApplicationEditComponent,
    PhoneSimulatorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PaginationModule.forRoot(),
    StoreModule.forRoot({ isLoading: applicationsReducer }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplicationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

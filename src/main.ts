import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // ✅ HttpClient for service
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // ✅ For formControlName

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([]),  // Empty routes since no routing
    importProvidersFrom(ReactiveFormsModule)
  ]
}).catch(err => console.error(err));

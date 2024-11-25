import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {JwtInterceptor} from './app/service/token.interceptor';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])), // Registro del interceptor
    provideRouter(routes), // Rutas standalone
  ],
}).catch((err) => console.error(err));

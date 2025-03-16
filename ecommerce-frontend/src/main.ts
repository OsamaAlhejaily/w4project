import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';

import { productReducer } from './app/store/product.reducer';
import { ProductEffects } from './app/store/product.effects';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ products: productReducer }),
    provideEffects([ProductEffects]),
    provideRouter(routes)
  ]
});

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => 
    initializeApp({
    "projectId":"ringoffire-df301",
    "appId":"1:2423325111:web:726198cf50879cab70e832",
    "storageBucket":"ringoffire-df301.firebasestorage.app",
    "apiKey":"AIzaSyAFLy6QC0vz0fHbhQ-wbm5nwqY6lW_rjjk",
    "authDomain":"ringoffire-df301.firebaseapp.com",
    "messagingSenderId":"2423325111",})), 
    provideFirestore(() => getFirestore())]
};
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, PreloadAllModules , Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from './shared/services/seo.service';
import { SidebarModule } from 'ng-sidebar';
import { SlideshowModule } from 'ng-simple-slideshow';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { AlertModule } from 'ngx-alerts';

//  import { TinymceModule } from 'ng2-tinymce-alt';
import { EditorModule } from '@tinymce/tinymce-angular';

//  import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
// import { TinymceComponent } from 'ng2-tinymce';

/*
 * Platform and Environment providers/directives/pipes
 */
// import { CKEditorModule } from 'ng2-ckeditor';



// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Mine
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';

import { AppConfig } from './app.config';
import { APP_INITIALIZER } from '@angular/core';

// import { SummernoteComponent } from './summernote.component';
// import { UNITYTinyMCE } from './unity-tinymce';

// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';
//  import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';

import { FrDatePipeComponent } from './shared/pipes/fr-date-pipe';
// import { DragulaModule } from 'ng2-dragula/ng2-dragula';


import './add-rxjs-operators';
import { AlertService } from './shared/services/alert.service';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import '../styles/styles.scss';
import '../styles/headings.css';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MoreInfoPartComponent } from './static-pages/more-info-part/more-info-part.component';
import { MoreInfoProComponent } from './static-pages/more-info-pro/more-info-pro.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterProComponent } from './register/register-pro/register-pro.component';
import { RegisterPartComponent } from './register/register-part/register-part.component';
import { SearchBestProComponent } from './search-best-pro/search-best-pro.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AboutComponent } from './about/about.component';
import { TarifComponent } from './tarif/tarif.component';
import { MentionsComponent } from './mentions-legales/mentions-legales.component';
import { PolitiqueComponent } from './politique/politique.component';
import { ConfirmComponent } from './confirm-register/confirm-register.component';
import { ConfirmDemandComponent } from './confirm-demand/confirm-demand.component';
import { CondGenComponent } from './cond-gen/cond-gen.component';
import { QuiSommeNousComponent } from './qui-sommes-nous/qui-somme-nous.component';
import { CondGenVentesComponent } from './cond-gen-ventes/cond-gen-ventes.component';
import { RequestPartComponent } from './request-part/request-part.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { HeaderComponent } from './header/header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons/dist';
import { ListDemandsComponent } from './list-demands/list-demands.component';
import { MyDemandsComponent } from './my-demands/my-demands.component';
import { DemandComponent } from './demand/demand.component';
import { ValidationAdminCompteProComponent } from './admin-validation-compte-pro/admin-validation-compte-pro.component';
import { ValidationCompteProComponent } from './validation-compte-pro/validation-compte-pro.component';
import { ValidationComptePartComponent } from './validation-compte-part/validation-compte-part.component';
import { ProfessionalProfileComponent } from './professional-profile/professional-profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ValidationDemandeSiteComponent} from './validation-demande-site/validation-demande-site.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PaymentComponent } from './payment/payment.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { PaymentAcceptedComponent } from './payment-accepted/payment-accepted.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { AppRoutingModule } from './app-routing.module';
import { GooglePlacesDirective } from './_directives/google-places.directive';
import { AgmCoreModule, MapsAPILoader  } from '@agm/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { SiteWebComponent } from './site-web/site-web.component';
import { CookiesComponent } from './cookies/cookies.component';

// Application wide providers
const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState];

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

// type StoreType = {
//   state: InternalStateType,
//   restoreInputValues: () => void,
//   disposeOldHosts: () => void
// };

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FrDatePipeComponent,
    MoreInfoPartComponent,
    MoreInfoProComponent,
    ProfileComponent,
    RegisterProComponent,
    RegisterPartComponent,
    SearchBestProComponent,
    SearchResultComponent,
    EditProfileComponent,
    AboutComponent,
    TarifComponent,
    MentionsComponent,
    PolitiqueComponent,
    ConfirmComponent,
    ConfirmDemandComponent,
    CondGenComponent,
    CondGenVentesComponent,
    QuiSommeNousComponent,
    RequestPartComponent,
    AlertComponent,
    HeaderComponent,
    ListDemandsComponent,
    MyDemandsComponent,
    DemandComponent,
    ValidationAdminCompteProComponent,
    ValidationCompteProComponent,
    ValidationComptePartComponent,
    ProfessionalProfileComponent,
    ProfileDetailComponent,
    ProductFormComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    PaymentComponent,
    SiteWebComponent,
    ValidationDemandeSiteComponent,
    SocialMediaComponent,
    PaymentAcceptedComponent,
    PaymentFailedComponent,
    GooglePlacesDirective,
    CookiesComponent
  ],
  imports: [
    // import Angular's modules
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    EditorModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    HttpModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgxAutoScrollModule,
    MatAutocompleteModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'left'}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbPogK48KczuK8QfqKE-zInFKS6u5RKtE',
      libraries: ['places','geometry']
   }),
    AppRoutingModule,
    NgxSpinnerModule,
    CommonModule,
    NgbModule.forRoot(),
    Angular2PromiseButtonModule
      .forRoot({
        // your custom config goes here
        spinnerTpl: '<span class="btn-spinner"></span>',
        // disable buttons when promise is pending
        disableBtn: true,
        // the class used to indicate a pending promise
        btnLoadingClass: 'is-loading',
        // only disable and show is-loading class for clicked button,
        // even when they share the same promise
        handleCurrentBtnOnly: false,
      }),
    SidebarModule.forRoot(),
    SlideshowModule,
  
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
   }),
  
   SlideshowModule,
  ],
  providers: [
    // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    AlertService,
    AuthenticationService,
    Title,
    SeoService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  
})
export class AppModule {}

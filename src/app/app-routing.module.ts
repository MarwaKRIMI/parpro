import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ListDemandsComponent } from './list-demands/list-demands.component';
import { MyDemandsComponent } from './my-demands/my-demands.component';
import { DemandComponent } from './demand/demand.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentAcceptedComponent } from './payment-accepted/payment-accepted.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { ConfirmDemandComponent } from './confirm-demand/confirm-demand.component';
import { ValidationAdminCompteProComponent } from './admin-validation-compte-pro/admin-validation-compte-pro.component';
import { MoreInfoPartComponent } from './static-pages/more-info-part/more-info-part.component';
import { MoreInfoProComponent } from './static-pages/more-info-pro/more-info-pro.component';
import { RegisterProComponent } from './register/register-pro/register-pro.component';
import { RegisterPartComponent } from './register/register-part/register-part.component';
import { SearchBestProComponent } from './search-best-pro/search-best-pro.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AboutComponent } from './about/about.component';
import { TarifComponent } from './tarif/tarif.component';
import { ValidationCompteProComponent } from './validation-compte-pro/validation-compte-pro.component';
import { ValidationComptePartComponent } from './validation-compte-part/validation-compte-part.component';
import { MentionsComponent } from './mentions-legales/mentions-legales.component';
import { PolitiqueComponent } from './politique/politique.component';
import { CondGenComponent } from './cond-gen/cond-gen.component';
import { CondGenVentesComponent } from './cond-gen-ventes/cond-gen-ventes.component';
import { QuiSommeNousComponent } from './qui-sommes-nous/qui-somme-nous.component';
import { RequestPartComponent } from './request-part/request-part.component';
import { ConfirmComponent } from './confirm-register/confirm-register.component';
import { ProfessionalProfileComponent } from './professional-profile/professional-profile.component';
import { SiteWebComponent } from './site-web/site-web.component';
import {ValidationDemandeSiteComponent} from './validation-demande-site/validation-demande-site.component'
import { CookiesComponent } from './cookies/cookies.component';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'connexion',
    component: LoginComponent
  },
  {
    path: 'mot-de-passe-oublie',
    component: RequestPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'profil-part',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Particular'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'compte-pro',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'profil-pro',
    component: ProfileDetailComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'demandes',
    component: ListDemandsComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'mes-demandes-acceptees',
    component: MyDemandsComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'demandes/:id',
    component: DemandComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'paiement',
    component: PaymentComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'paiement-valide',
    component: PaymentAcceptedComponent
  },
    {
      path: 'paiement-invalide',
      component: PaymentFailedComponent
  },
  {
    path: 'admin/demande/confirm',
    component: ConfirmDemandComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'admin/professionnel/confirm',
    component: ValidationAdminCompteProComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional', 'Particular'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'plus-info-part',
    component: MoreInfoPartComponent
  },
  {
    path: 'plus-info-pro',
    component: MoreInfoProComponent
  }
  ,
  {
    path: 'register/professionnel',
    component: RegisterProComponent
  },
  {
    path: 'register/particulier',
    component: RegisterPartComponent
  },
  {
    path: 'recherche',
    component: SearchBestProComponent,
    //canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Particular'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'recherche/resultats',
    component: SearchResultComponent,
    //canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Particular'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'profil/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Particular', 'Professional'],
            redirectTo: 'connexion'
        }
    }
  },

  {
    path: 'a-propos',
    component: AboutComponent
  },
  {
    path: 'tarif',
    component: TarifComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Professional'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'validation-pro',
    component: ValidationCompteProComponent,

  },
  {
    path: 'validation-part',
    component: ValidationComptePartComponent,

  },
  {
    path: 'mentions-legales',
    component: MentionsComponent
  },
  {
    path: 'politique-confidentialite',
    component: PolitiqueComponent
  },
  {
    path: 'conditions-generales-utilisations',
    component: CondGenComponent
  },
  {
    path: 'conditions-generales-vente',
    component: CondGenVentesComponent
  },
  {
    path: 'qui-sommes-nous',
    component: QuiSommeNousComponent
  },
  {
    path: 'demande/particulier',
    component: RequestPartComponent,
    //canActivate: [AuthGuard],
    // data: {
    //     permission: {
    //         only: ['Particular'],
    //         redirectTo: 'connexion'
    //     }
    // }
  },
  {
    path: 'demande/particulier/:id',
    component: RequestPartComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Particular'],
            redirectTo: 'connexion'
        }
    }
  },
  {
    path: 'confirmation-email',
    component: ConfirmComponent,
  },
  {
    path: 'professionnel-profil/:slug',
    component: ProfessionalProfileComponent,
/*     canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['Particular', 'Professional'],
            redirectTo: 'connexion'
        }
    } */
  },
  {
    path: 'site-internet',
    component: SiteWebComponent
  },
  {
    path:'validation-demande-site',
    component: ValidationDemandeSiteComponent
  },
  {
    path:"cookies",
    component:CookiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

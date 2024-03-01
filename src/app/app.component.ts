/*
 * Angular 2 decorators and services
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AppConfig } from './app.config';
import * as jQuery from 'jquery';
import { AuthenticationService } from './shared/services/authentication.service';
declare let ga: any;

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css'],
  providers: [AppConfig]
})
export class AppComponent implements OnInit {
  public errorMessage: string;
  constructor(
    public appState: AppState,
    public router: Router,
    private authService: AuthenticationService,
    
    ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // comment has been removed
        ga('send', 'pageview', event.urlAfterRedirects);
      }
      window.scrollTo(0, 0);
    });

    // Method to close the nav bar when clicking on a link on small screens
    $(document).on('click', '.navbar-collapse.in', function(e) {
      if (
        $(e.target).is('a') &&
        $(e.target).attr('class') !== 'dropdown-toggle'
      ) {
      //  $(this).collapse('hide');
      }
    });

  }


  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#404040",
          fontSize:'8px'
   
        },
        button: {
          background: "#ffffff",
          text: "#1f1f1f",
          borderRadius:'none'
        },
        
        span:{
         fontSize:'10px'
        }
      },
      theme: "classic",
      content: {
        message: "Afin de vous proposer le meilleur service possible, PARPRO utilise des cookies. En continuant de naviguer sur le site, vous déclarez accepter leur utilisation.",
        dismiss: "J'accepte",
        link: "Cookies",
        href: "https://www.parpro.fr/#/cookies" 
      }
    });
  }
}

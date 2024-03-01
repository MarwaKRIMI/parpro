import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../shared/services/message.service';
import { Message } from '../models/message.model';
import {debounceTime} from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { ActivityService } from '../shared/services/activity.service';
import { AlertModule, AlertService } from 'ngx-alerts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fws-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ActivityService]
})
export class HeaderComponent implements OnInit {
  userName :string;
 _opened: boolean = false;
  sosForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  activities = [];
  message: Message = new Message();
  animate: boolean = false;
  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private alertService: AlertService,
    private activityService: ActivityService,
    private translate: TranslateService


  ) {

    this.getActivities();
    this.message.activity=""
    translate.setDefaultLang('fr');
  }
  switchLanguage(language: string) {
    this.translate.use(language);}
  ngOnInit() {
   
    this.sosForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      emailR: ['',Validators.required],
      messeage: [''],
      activity: ['""', Validators.required]
  });
    this._opened=false;
    setTimeout(() => {
      this.animate = true;
    }, 1000);
  }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
}
  onSubmit() {

      this.submitted = true;

      this.loading = true;
      this.messageService.post(this.message)
        .pipe(debounceTime(400))
        .subscribe(
          data => {
            this.alertService.success('Message envoyé avec succès');
            this.message = new Message ();
            
            this.message.activity=""

            this._toggleSidebar();
        
            this.loading = false;
            
            
          },
          error => {
            if(error === "The specified user already exist") {
              this.alertService.danger('Cet utilisateur existe déjà');
              this.loading = false;
            } else {
              this.alertService.danger('une erreur est survenue veuillez réessayer plus tard');
              this.loading = false;
            }
          });
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  private logoutUser() {
    return this.authService.logout();
  }

  getActivities() {
    this._opened = false;
    this.activityService.getAll().subscribe(
      res => this.activities = res,
      error => {
        this.alertService.danger('une erreur est survenue veuillez réessayer plus tard');
        this.loading = false;
      });
  }

}

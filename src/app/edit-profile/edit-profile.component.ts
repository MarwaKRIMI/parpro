import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/User.service';
import { first } from 'rxjs/operators';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';
import { User } from '../models/user.model';
import { Professional } from '../models/professional.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ProfessionalService } from '../shared/services/professional.service';
import { AlertModule, AlertService } from 'ngx-alerts';

@Component({
  selector: 'fws-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers:[UserService, ProfessionalService]
})
export class EditProfileComponent implements OnInit {
  loading = false;
  submitted = false;
  me:User = new User();
  professional : Professional =new Professional();
  avatarChanged:boolean = false;
  userId:any;
  user:any;
  constructor( private titleservice: Title,
    private meta: Meta,
    private userService:UserService,
    private alertService:AlertService,
    private authService:AuthenticationService,
    private profService:ProfessionalService,
    private sanitization: DomSanitizer) {
    this.getProfile()
   }

   ngOnInit() {
    //title et description
    this.meta.addTag({
      name: "description",
      content: "modifier vos paramètres du compte professionnel "
    });
    this.titleservice.setTitle("Paramètres généraux du compte|PARPRO");
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

    //if(!this.avatarChanged)
      //delete this.me['avatar']

    if(this.authService.getUserRole() == 'Professional'){
      this.professional.user = this.me;
      if(this.professional.user.id){
        this.userId = this.professional.user.id;
      }
      delete this.professional.user.plainPassword;
      delete this.professional.services;
      delete this.professional.user.id;
      delete this.professional.user.address.id;
      delete this.professional.user.languages;
      let professional = Object.assign({}, this.professional);
      let user = Object.assign({}, this.professional.user);
      if (this.professional.user.avatar && this.professional.user.avatar.id) {
        delete user.avatar;
        professional.user=user;
      }
      //this.user = this.professional;
      this.profService.update(professional, this.userId)
        .pipe(first())
        .subscribe(
            data => {
              this.alertService.success('Mise à jour avec succès');
              let localStorageUser = localStorage.getItem("currentUser");
              let currentUser = JSON.parse(localStorageUser);
              currentUser.firstName = data.user.firstName;
              currentUser.lastName = data.user.lastName;
              localStorage.setItem("currentUser", JSON.stringify(currentUser));
              this.loading = false;
            },
            error => {
                this.alertService.danger('Une erreur est survenue veuillez réessayer plus tard');
                this.loading = false;
        });
    }else{
      this.user = this.me;
      let user = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        address: this.user.address,
        phone: this.user.phone,
        avatar: this.user.avatar
      };
      if(user.avatar && user.avatar.id) {
        delete user.avatar;
      }
      delete user.address.id;
      this.userService.update(user)
        .pipe(first())
        .subscribe(
            data => {
              let localStorageUser = localStorage.getItem("currentUser");
              let currentUser = JSON.parse(localStorageUser);
              currentUser.firstName = data.user.firstName;
              currentUser.lastName = data.user.lastName;
              localStorage.setItem("currentUser", JSON.stringify(currentUser));
              this.alertService.success('Mise à jour avec succès');
              this.loading = false;
            },
            error => {
              this.alertService.danger('une erreur est survenue veuillez réessayer plus tard');
              this.loading = false;
        });
    }

  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        //reader.onload = e => this.imageSrc[index] = reader.result;
        reader.onload = ((file: any) => {
          return (e: Event) => {
            //use "e" or "file"
            this.avatarChanged = true;
            this.me.avatar = reader.result;
          }
        })(file);

        reader.readAsDataURL(file);
    }
}

makeTrustedImage(item) {
  const imageString =  JSON.stringify(item).replace(/\\n/g, '');
  const style = 'url(' + imageString + ')';
  return this.sanitization.bypassSecurityTrustStyle(style);
}

  getProfile() {
    this.userService.me().subscribe(
      res => {
        if(this.authService.getUserRole() == 'Professional'){
          this.me.id = res.user.id;
          this.me.firstName = res.user.firstName;
          this.me.lastName = res.user.lastName;
          this.me.address = res.user.address;
          this.me.phone = res.user.phone;
          this.me.email = res.user.email;
          this.me.avatar = res.user.avatar;
          this.professional.companyName = res.companyName;
        }else{
          this.me = res
        }
      },
      error => {
      this.alertService.danger('une erreur est survenue veuillez réessayer plus tard');
    });
  }

}

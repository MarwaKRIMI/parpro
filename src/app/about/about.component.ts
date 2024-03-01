import { Component, OnInit } from "@angular/core";
import { AlertService } from "../shared/services/alert.service";
import { ProfessionalService } from "../shared/services/professional.service";
import { AuthenticationService } from "../shared/services/authentication.service";
import { FilterDemand } from "../models/demand-filter.model";
import { Demand } from "../models/demand.model";
import { UserService } from "../shared/services/User.service";
import { first } from "rxjs/operators";
import { Professional } from "../models/professional.model";
import { TSImportEqualsDeclaration } from "babel-types";
@Component({
  selector: "fws-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
  providers: [ProfessionalService, UserService]
})
export class AboutComponent implements OnInit {
  loading = false;
  submitted = false;
  fileUrl: string;
  fileToUpload: File = null;
  constructor(
    private alertService: AlertService,
    private professionalService: ProfessionalService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}
  me: Professional;
  ngOnInit() {
    this.getProfile();
  }
  onSubmit(Image) {
    this.submitted = true;
    this.loading = true;

    
  }

  getProfile() {
    this.me = JSON.parse(localStorage.getItem("currentUser"));
    if (this.me == null) {
      this.userService.me().subscribe(
        res => {
          this.me = res;
        },
        error => {
          this.alertService.error(
            "une erreur est survenue veuillez réessayer plus tard"
          );
        }
      );
    }
  }

  url: string;
  
  handleFileInput(event: any) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();


      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }



    }
  }
}

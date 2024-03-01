import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";
@Component({
  selector: "app-validation-demande-site",
  templateUrl: "./validation-demande-site.component.html",
  styleUrls: ["./validation-demande-site.component.css"]
})
export class ValidationDemandeSiteComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Validation de demande| PARPRO");
    // description //
    this.meta.addTag({
      name: "description",
      content: "La validation de demande de creation de site internet."
    });
  }
}

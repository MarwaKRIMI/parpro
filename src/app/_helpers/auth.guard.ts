import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router,
    private authService: AuthenticationService) {
}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const userRole: string = this.authService.getUserRole();
  console.log(userRole);
  const permission = route.data["permission"];

  let canActivate: boolean;

  if (!permission) throw new Error('Permissions is not setup!');
  if (!permission.only.length) throw new Error('Roles are not setup!');

  canActivate = permission.only.includes(userRole);

  if (!canActivate) this.router.navigate([permission.redirectTo]);

  return canActivate;
  }
}

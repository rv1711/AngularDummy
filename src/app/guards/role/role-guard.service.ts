import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const role = this.authService.currentUser.role;
    let url: string = state.url.toString();
    if ((/seller/).test(url)) {
      if (role === 'admin')
        return true;
      else {
        this.router.navigate(['consumer']);
        return false;
      }
    }
    else if ((/consumer/).test(url)) {
      if (role === 'user')
        return true;
      else {
        this.router.navigate(['seller']);
        return false;
      }
    }
  }
}

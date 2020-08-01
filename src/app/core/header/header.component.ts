import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SigninComponent } from 'src/app/log/signin/signin.component';
import { RequestService } from 'src/app/service/request.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LogoutDialogComponent } from 'src/app/log/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn: boolean;

  constructor(public dialog: MatDialog,
    private requestService: RequestService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userLoggedIn=this.authService.isLoggedIn();
  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(SigninComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.userLoggedIn=this.authService.isLoggedIn();
      console.log(this.userLoggedIn);
    });
  }

  openLogoutDialog(){
    const dialogRef = this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The Logout dialog was closed', result);
      this.userLoggedIn=this.authService.isLoggedIn();
      console.log(this.userLoggedIn);
    });
  }

}

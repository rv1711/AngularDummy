import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public isLoggedOut: boolean) { }

  ngOnInit() {
    this.isLoggedOut=false;
  }

  onBtnClick(val){
    if(val){
      this.authService.logout();
      this.isLoggedOut=true;
      this.dialogRef.close();
    }
    else{
      this.isLoggedOut=false;
      this.dialogRef.close();
    }
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RequestService } from 'src/app/service/request.service';
import { loginResponse } from 'src/app/helper/login';
import { SuccessDialogComponent } from 'src/app/core/success-dialog/success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private requestService: RequestService,
    private route: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SigninComponent>,
    @Inject(MAT_DIALOG_DATA) public isLoggedIn: boolean) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    });

  }

  get f(){
    return this.loginForm.controls;
  }

  onLogin(){
    const credentials = {
      "username": this.f.email.value,
      "password": this.f.password.value
    };
    /*this.http.post("http://localhost:3000/auth/login",credentials).subscribe((res)=>{
      console.log(res);
    });*/
    //this.authService.login(credentials);
    this.requestService.postRequest("loginUser",credentials).subscribe((res: loginResponse)=>{
      this.authService.login(res.access_token);
      this.dialogRef.close();
      this.navToUrl();
    },
    (error: HttpErrorResponse)=>{
      console.log(error);
      const dialogRef = this.dialog.open(SuccessDialogComponent,{
        data : "Error"
      });
      this.loginForm.reset();
    });
  }

  navToUrl(){
    const dialogRef = this.dialog.open(SuccessDialogComponent,{
      data : "Success"
    });
    dialogRef.afterClosed().subscribe((res)=>{
      let role: string;
      role = this.authService.currentUser.role;
      console.log("Role", role);
      
      if(role === "admin"){
        this.route.navigate(['seller']);
      }
      else{
        this.route.navigate(['consumer']);
      }
    });
  }

}

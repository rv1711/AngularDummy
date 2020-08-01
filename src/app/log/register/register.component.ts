import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RequestService } from 'src/app/service/request.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/core/success-dialog/success-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

interface Roles {
  displayName: string;
  backValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  roles: Roles[];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private requestService: RequestService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {

    this.roles = [
      {displayName: "Buyer", backValue: "user"},
      {displayName: "Seller", backValue: "admin"}
    ];

    this.registerForm = this.formBuilder.group({
      displayName: ["",Validators.required],
      userName: ["",Validators.required],
      password: ["",Validators.required],
      role: [null, Validators.required]
    });

  }

  get f(){
    return this.registerForm.controls;
  }

  onRegister(){
    const registerBody = {
      displayName: this.f.displayName.value,
      userName: this.f.userName.value,
      password: this.f.password.value,
      role: this.f.role.value.backValue
    };
    console.log("Reg Body", registerBody);
    this.requestService.postRequest("signUp",registerBody).subscribe((res)=>{
      console.log(res);
      const dialogRef = this.dialog.open(SuccessDialogComponent,{
        data : "Success"
      });
      this.registerForm.reset();
    },
    (error: HttpErrorResponse)=>{
      const dialogRef = this.dialog.open(SuccessDialogComponent,{
        data : "Failed"
      });
    });
  }

}

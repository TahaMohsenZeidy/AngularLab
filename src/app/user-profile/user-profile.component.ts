import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'models/member.model';
import { FileUploadService } from 'services/file-upload.service';
import { MemberService } from 'services/member.service';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  currentFile?: File;
  fileName = 'Select File';
  fileName1 = 'Select File';
  fileInfos?: Observable<any>;
  Type: any = ['TEACHER', 'STUDENT'];
  form: FormGroup =new FormGroup({
    type: new FormControl("", [Validators.required]),
    cin: new FormControl("", [Validators.required]),
    cv: new FormControl("", []),
    photo: new FormControl("", []),
    date: new FormControl("", [Validators.required]),
    nom: new FormControl("", [Validators.required]),
    prenom: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });
  currentId: string = '';
  memberReceivedByService: any;
  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uploadService: FileUploadService  
  ) {}

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.params.id;
    console.log(this.currentId);
    if (!!this.currentId) {
      this.memberService.getMemeberById(this.currentId).then((member) => {
        this.memberReceivedByService = member;
        console.log('Found member');
        console.log(member);
        this.form.patchValue(member);
      });
    } 
  }

  onSubmit(): void {
    console.log(this.form.value);
    const memberToSave: Member = {
      ...this.memberReceivedByService,
      ...this.form.value,
    };
    this.memberService
      .saveMember(memberToSave)
      .then(() => this.router.navigate(['/table-list']));
  }
   // Choose city using select dropdown
  changeCity(e) {
    // this.form.setValue(e.target.value, {
    //   onlySelf: true
    // })
    this.form.patchValue({type: e.target.value});
  }

  //files 

  selectResume(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      this.upload()
    } else {
      this.fileName = 'Select File';
    }
  }

  selectPhoto(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName1 = this.currentFile.name;
      this.upload()
    } else {
      this.fileName1 = 'Select File';
    }
  }

  upload(): void {  
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe(data => {
        if(data['body'] != null){
          if(this.currentFile.name.endsWith("pdf")){
            this.form.patchValue({cv: data['body'].message});
          }
          else{
            this.form.patchValue({photo: data['body'].message})
          }
          console.log(data['body'].message)
        }
      }, error => {
        console.log(error)
      }
      );
    }
  }

  // uploadedResume(){
  //   var inputValue = (<HTMLInputElement>document.getElementById("resume")).value;
  //   console.log(inputValue);
  // }
  
  // uploadedPhoto(){
  //   var inputValue = (<HTMLInputElement>document.getElementById("photo")).value;
  //   console.log(inputValue);
  // }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupsService } from 'src/app/core/services/groups.services';
import { ToastComponent } from 'src/app/sheared/toast/toast.component';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements  OnInit{

  addGroup !: FormGroup;
  colorSelected!:string;
  loadingSpiner:boolean=false
  //
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AddGroupComponent>,
  private _snackBar: MatSnackBar,
  private groupsService : GroupsService,
  private toast: ToastComponent,){

  }


  //
  ngOnInit(): void {

    this.addGroup = new FormGroup({
      'name':new FormControl(null,[Validators.required]),
    })

    if(this.data["courier"]){
   //   this.editId=this.data["courier"].PatID;
      this.generateGroupForm();
    }

  
  }


  //
  generateGroupForm(){
   
  }


  //
  onAddNewGroup(){
    if (this.addGroup.invalid) {
      Object.keys(this.addGroup.controls).forEach((controlName) =>
        this.addGroup.controls[controlName].markAsTouched()
      );
      return;
    }
    if(!this.data["courier"]){
      this.loadingSpiner=true;
      let groupData = new FormData()
      groupData.append('name',this.addGroup.value.name);
      groupData.append('color',this.colorSelected)
      alert(this.colorSelected)
      this.groupsService.addGroup(groupData).subscribe({
        next:(res : any)=>{
          this.loadingSpiner=false;
        },
        error:(error : any)=>{
          this.loadingSpiner=false;
        }
      })
    }
  }


   //
   getTitle() {
    if (this.data["courier"]) {
      return "Edit Group"  ;
    }
    return "Add Group";
  }


  //
  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 2500,
    });
  }


  //
  closeDialog(){
    this.dialogRef.close()
  }


  //
  showSuccess(message : string) {
    this.toast.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }



  showError(message : string) {
    this.toast.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



  onConfirm() {
    this.toast.messageService.clear('c');
  }

  onReject() {
    this.toast.messageService.clear('c');
  }

  clear() {
    this.toast.messageService.clear();
  }

}

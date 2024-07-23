import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManagementService } from 'app/services/management.service';

@Component({
    selector: 'selector-name',
    templateUrl: './confirm-dialog.component.html'
})

export class ConfirmDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: number },
        private managementService : ManagementService
      ) {}
      
      onNoClick(): void {
          this.dialogRef.close();
        }
        
        confirmar(): void {
            this.dialogRef.close('confirmar');
        }


        onSubmitDEL(id:number){
            console.log(id);
            this.managementService.deleteHost(id)
            .subscribe();
    
         
          }
        ngOnInit(): void {
            
        }
  }
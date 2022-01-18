import { Component, OnInit } from '@angular/core';
import { Member } from 'models/member.model';
import { MemberService } from 'services/member.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  datasource: Member[] = [];
  ngOnInit(): void {
    this.fetchDataSource();
  }
  fetchDataSource(): void {
    this.memberService.getAllMemebers().then((members)=>{
    console.log(members);
    this.datasource=members;
    });
  }
  displayedColumns = [
    'id',
    'cin',
    'name',
    'type',
    'cv',
    'date',
    'actions',
  ];
  fetchedName = {
    name: '',
  };

  onRemove(id: string) {
    this.memberService.deleteMemberById(id).then(() => {
      this.fetchDataSource();
    });
  }

  openRemoveMemberDialog(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.onRemove(id);
      }
    })
  }

  constructor(
    private memberService: MemberService,
  ) {}

}

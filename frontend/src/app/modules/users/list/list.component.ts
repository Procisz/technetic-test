import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/data/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @ViewChild(MatAccordion) public accordion: MatAccordion;
  public users$: Observable<User[]> = this.userService.getUsers();

  constructor(private userService: UserService) { }
}

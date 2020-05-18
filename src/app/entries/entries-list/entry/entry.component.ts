import { Component, Input } from '@angular/core';
import { faCheckCircle, faClock, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Todolist } from 'src/app/models/todolist.model';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {


  @Input() entry: Todolist;
  @Input() index: number;
  faCheckCircle = faCheckCircle;
  faClock = faClock;
  faQuestionCircle = faQuestionCircle;

  injectClass() {
      const status = this.entry.status;
      return status === 'Done' ? 'status-completed' : status === 'In progress' ? 'status-pending' : 'status-new';
  }


}

import { Component, OnInit } from '@angular/core';
import { Todolist } from '../../models/todolist.model';
import { FlotiqService } from '../../services/flotiq.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entries-details',
  templateUrl: './entries-details.component.html',
  styleUrls: ['./entries-details.component.scss']
})
export class EntriesDetailsComponent implements OnInit {
  entry: Todolist;
  id: string;
  faSpinner = faSpinner;
  loading = false;
  processing = false;

  constructor(
    private flotiqService: FlotiqService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.loading = true;
        this.id = params.id;
        this.flotiqService.getItem(this.id).subscribe((response) => {
          this.loading = false;
          this.entry = response;
        }, error => {
          this.loading = false;
        });
      });
    }

    editEntry() {
      this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    }

    deleteEntry() {
      this.processing = true;
      this.flotiqService.deleteItem(this.id).subscribe((response) => {
        this.processing = false;
        this.router.navigate(['entries']);
        this.flotiqService.itemRemoved.next(this.id);
      }, error => {
        this.processing = false;
      });

    }

  }

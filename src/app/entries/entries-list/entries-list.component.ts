import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlotiqService } from 'src/app/services/flotiq.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Todolist } from '../../models/todolist.model';
import { TodolistResponse } from 'src/app/models/todolistResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit, OnDestroy {

  entries: Todolist[];
  itemChanged: Subscription;
  itemAdded: Subscription;
  itemRemoved: Subscription;

  constructor(
    private flotiqService: FlotiqService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
    ) { }

    ngOnInit() {
      this.flotiqService.listItems().subscribe((entries: TodolistResponse) => {
        this.entries = entries.data;
      });

      this.itemChanged = this.flotiqService.itemChanged.subscribe((response) => {
        const index = this.getIndex(response.id);
        this.entries[index] = response;
      });

      this.itemAdded =  this.flotiqService.itemAdded.subscribe((response) => {
        this.entries.push(response);
      });

      this.itemRemoved = this.flotiqService.itemRemoved.subscribe((id) => {
        const index = this.getIndex(id);
        this.entries.splice(index, 1);
      });
    }

    ngOnDestroy() {
      this.itemChanged.unsubscribe();
      this.itemAdded.unsubscribe();
      this.itemRemoved.unsubscribe();
  }

    newEntry() {
      this.router.navigate(['new'], {relativeTo: this.activatedRoute});
    }

    private getIndex(objectId: string): number {
      const index = this.entries.findIndex(entry => entry.id === objectId);
      return index;
  }

  }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { FlotiqService } from '../../services/flotiq.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Todolist } from 'src/app/models/todolist.model';

@Component({
  selector: 'app-entries-edit',
  templateUrl: './entries-edit.component.html',
  styleUrls: ['./entries-edit.component.scss']
})
export class EntriesEditComponent implements OnInit {

  entryForm: FormGroup;
  editMode = false;
  id: string;
  loading = false;
  sending = false;
  faSpinner = faSpinner;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private flotiqService: FlotiqService,
    private authService: AuthService
    ) { }

    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        this.init();
      });
    }

    private init() {
      this.id = this.id ? this.id : 'todolist-' + Math.round(Math.random() * 100000);

      if (this.editMode) {
        this.loading = true;
        this.flotiqService.getItem(this.id).subscribe((responseEntry: Todolist) => {
          this.loading = false;
          this.initForm({
            id: new FormControl(this.id),
            title: new FormControl(responseEntry.title),
            description: new FormControl(responseEntry.description),
            status: new FormControl(responseEntry.status)
          });
        }, error => {
          this.loading = false;
          console.log('Error with fetching data');
        });

      } else {
        this.initForm({
          id: new FormControl(this.id, Validators.required),
          title: new FormControl('', Validators.required),
          description: new FormControl(''),
          user: new FormControl(''),
          status: new FormControl('New')
        });
      }
    }

    private initForm(formData) {
      this.entryForm = new FormGroup(formData);
    }

    onSubmit() {
      this.sending = true;
      if (this.editMode) {
        this.flotiqService.updateItem(this.entryForm.value, this.id).subscribe((response: Todolist) => {
          this.flotiqService.itemChanged.next(response);
          this.sending = false;
          this.router.navigate(['entries', this.id]);
        }, error => {
          this.sending = false;
        });
      } else {
        this.flotiqService.addItem(this.entryForm.value).subscribe((response: Todolist) => {
          this.flotiqService.itemAdded.next(response);
          this.router.navigate(['entries', this.id]);
          this.sending = false;
        }, error => {
          this.sending = false;
        });
      }
    }

    onCancel() {
      if (this.editMode) {
        this.router.navigate(['entries', this.id]);
      } else {
        this.router.navigate(['entries']);
      }
    }

    disableInput() {
      return this.sending ? 'opacity-50 cursor-not-allowed' : '';
    }

  }

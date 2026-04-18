import { Component, DestroyRef, EventEmitter, inject, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() filterUser: EventEmitter<string> = new EventEmitter<string>();
  filterControl: FormControl = new FormControl('');
  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.filterUser.emit(this.filterControl.value)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
import { DOCUMENT, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private document: Document = inject(DOCUMENT);
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  showLoader(): void {
    this.isLoadingSubject.next(true);
    this.document.body.style.overflow = 'hidden';
  }

  hideLoader(): void {
    this.isLoadingSubject.next(false);
    this.document.body.style.removeProperty('overflow');
  }

}
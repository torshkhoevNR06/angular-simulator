import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  @Output() createUser: EventEmitter<IUser> = new EventEmitter();  
  private messageService: MessageService = inject(MessageService);

  private fb: FormBuilder = inject(FormBuilder);
  userForm: FormGroup = this.fb.group({
    id: [],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100), Validators.email]],
    address: this.fb.group({
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(90)]],
        lng: ['', [Validators.required, Validators.minLength(60), Validators.maxLength(180)]],
      }),
    }),
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]]
    })
  });

  submitUserForm(): void {
    if (this.userForm.valid) {
      this.userForm.patchValue({ id: Date.now() })
      this.createUser.emit(this.userForm.value);
      this.userForm.reset();
    } else {
      this.messageService.showError('Форма не валидна');
      throw new Error('Проверьте, правильно ли заполнены все поля!');
    }
  }

}
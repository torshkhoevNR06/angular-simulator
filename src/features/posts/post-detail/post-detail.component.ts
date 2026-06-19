import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../IPost';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  post!: IPost;

  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];
  }

}
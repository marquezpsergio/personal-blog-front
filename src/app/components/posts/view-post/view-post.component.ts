import { Component } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../modules/MaterialModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent {
  postId: any;
  postData: any;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {
    this.postId = this.activatedRoute.snapshot.params['postId'];
  }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    this.postService.getPostById(this.postId).subscribe(
      (data) => {
        this.postData = data;
      },
      (error) => {
        this.matSnackBar.open('Failed to get post: ' + error.message, 'Close', {
          duration: 3000,
        });
      }
    );
  }
}

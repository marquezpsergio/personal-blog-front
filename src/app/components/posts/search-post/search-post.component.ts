import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/MaterialModule';
import { TruncateModule } from '../../../modules/TruncateModule';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TruncateModule,
    RouterLink,
  ],
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss'],
})
export class SearchPostComponent implements OnInit {
  posts: any[] = [];
  title: string = '';

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.title = params['title'] || '';
      if (this.title) {
        this.searchPostByTitle();
      }
    });
  }

  searchPostByTitle(): void {
    if (this.title.trim().length >= 2) {
      this.postService.searchByTitle(this.title).subscribe(
        (data) => {
          this.posts = data;
        },
        (error) => {
          this.snackBar.open('Error searching post', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please enter at least 2 characters', 'Close', {
        duration: 3000,
      });
    }
  }

  likePost(postId: number): void {
    this.postService.likePost(postId).subscribe({
      next: () => {
        this.snackBar.open('Post liked successfully', 'Close', {
          duration: 3000,
        });
        this.searchPostByTitle();
      },
      error: (error) => {
        this.snackBar.open('Failed to like post: ' + error.message, 'Close', {
          duration: 3000,
        });
      },
    });
  }
}

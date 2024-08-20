import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../modules/MaterialModule';
import { RouterLink } from '@angular/router';
import { TruncateModule } from '../../../modules/TruncateModule';

@Component({
  selector: 'app-view-all-post',
  standalone: true,
  imports: [CommonModule, RouterLink, MaterialModule, TruncateModule],
  templateUrl: './view-all-post.component.html',
  styleUrls: ['./view-all-post.component.scss'],
})
export class ViewAllPostComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().pipe(
      catchError((error) => {
        this.snackBar.open('Failed to get posts: ' + error.message, 'Close', {
          duration: 3000,
        });
        return of([]);
      })
    ).subscribe((data) => {
      this.posts = data;
    });
  }

  likePost(postId: number): void {
    this.postService.likePost(postId).subscribe({
      next: () => {
        this.snackBar.open('Post liked successfully', 'Close', {
          duration: 3000,
        });
        this.loadPosts();
      },
      error: (error) => {
        this.snackBar.open('Failed to like post: ' + error.message, 'Close', {
          duration: 3000,
        });
      }
    });
  }
}

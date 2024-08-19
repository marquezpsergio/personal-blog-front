import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../modules/MaterialModule';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-all-post',
  standalone: true,
  imports: [CommonModule, RouterLink, MaterialModule],
  templateUrl: './view-all-post.component.html',
  styleUrl: './view-all-post.component.scss',
})
export class ViewAllPostComponent implements OnInit {
  posts$: Observable<any[]> | undefined;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.posts$ = this.postService.getAllPosts().pipe(
      catchError((error) => {
        this.snackBar.open('Failed to get posts: ' + error.message, 'Close', {
          duration: 3000,
        });
        return of([]);
      })
    );
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  }
}

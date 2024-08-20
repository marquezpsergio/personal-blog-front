import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../modules/MaterialModule';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../../services/comments/comment.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit {
  postId: any;
  postData: any;
  commentForm!: FormGroup;
  comments: any[] = [];

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {
    this.postId = this.activatedRoute.snapshot.params['postId'];
  }

  ngOnInit(): void {
    this.loadPost();

    this.commentForm = this.fb.group({
      author: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  publishComment(): void {
    this.commentService
      .createNewComment(
        this.postId,
        this.commentForm.get('author')?.value ?? '',
        this.commentForm.get('content')?.value ?? ''
      )
      .subscribe(
        (data) => {
          this.matSnackBar.open('Comment published successfully', 'Close', {
            duration: 3000,
          });
          this.getCommentsByPostId();
          this.commentForm.reset();
        },
        (error) => {
          this.matSnackBar.open(
            'Failed to publish comment: ' + error.message,
            'Close',
            {
              duration: 3000,
            }
          );
        }
      );
  }

  loadPost(): void {
    this.postService.getPostById(this.postId).subscribe(
      (data) => {
        this.postData = data;
        this.getCommentsByPostId();
      },
      (error) => {
        this.matSnackBar.open('Failed to get post: ' + error.message, 'Close', {
          duration: 3000,
        });
      }
    );
  }

  getCommentsByPostId(): void {
    this.commentService.getAllCommentsByPostId(this.postId).subscribe(
      (data) => {
        this.comments = data ?? [];
      },
      (error) => {
        this.matSnackBar.open(
          'Failed to get comments: ' + error.message,
          'Close',
          {
            duration: 3000,
          }
        );
      }
    );
  }

  likePost(): void {
    this.postService.likePost(this.postId).subscribe(
      () => {
        this.matSnackBar.open('Post liked successfully', 'Close', {
          duration: 3000,
        });
        this.loadPost();
      },
      (error) => {
        this.matSnackBar.open(
          'Failed to like post: ' + error.message,
          'Close',
          {
            duration: 3000,
          }
        );
      }
    );
  }
}

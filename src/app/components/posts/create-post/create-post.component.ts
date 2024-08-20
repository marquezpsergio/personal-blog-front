import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../modules/MaterialModule';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../../services/posts/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      author: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  addTag(event: any) {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createPost() {
    const data = this.postForm.value;
    data.tags = this.tags;

    if (this.postForm.valid) {
      this.createPostRequest(data);
    }
  }

  private createPostRequest(data: any) {
    this.postService.createNewPost(data).subscribe(
      () => {
        this.snackBar.open('Post created successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  private handleError(error: any) {
    this.snackBar.open('Failed to create post: ' + error, 'Close', {
      duration: 3000,
    });
  }
}

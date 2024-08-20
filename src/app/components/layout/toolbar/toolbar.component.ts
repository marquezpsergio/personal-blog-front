import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MaterialModule } from '../../../modules/MaterialModule';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  searchTitle: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  searchPostByTitle() {
    if (this.searchTitle.trim().length >= 2) {
      this.router.navigate(['/search-post'], {
        queryParams: { title: this.searchTitle },
      });
    } else {
      this.snackBar.open('Please enter at least 2 characters', 'Close', {
        duration: 3000,
      });
    }
  }
}

import { Routes } from '@angular/router';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { ViewAllPostComponent } from './components/posts/view-all-post/view-all-post.component';
import { ViewPostComponent } from './components/posts/view-post/view-post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'view-all', component: ViewAllPostComponent },
  { path: 'view-post/:postId', component: ViewPostComponent },
  { path: '**', redirectTo: '' },
];

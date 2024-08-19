import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/blog/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createNewPost(post: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}api/posts`, post);
  }

  getAllPosts(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/posts`);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/posts/${postId}`);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/blog/api/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  createNewComment(postId: number, author: string, content: string): Observable<any> {
    const params = new HttpParams()
      .set('postId', postId.toString())
      .set('author', author)
      .set('content', content);

    return this.http.post<any>(`${BASIC_URL}/create`, null, { params });
  }

  getAllCommentsByPostId(postId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}/post/${postId}`);
  }
}

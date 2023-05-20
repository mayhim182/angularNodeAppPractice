import { Injectable } from '@angular/core';
import { post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: any[] = [];
  private postsUpdated = new Subject<post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => {
            // console.log(post, 'before map');
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((postData) => {
        // console.log(postData,"This is being printed");
        this.posts = postData;
        // console.log(this.posts,'yeh bhi print ho rha h');
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: post = { id: '', title: title, content: content };
    this.http
      .post<any>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        // console.log(responseData);
        const postId=responseData.postId;
        post.id=postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/"+postId).subscribe(()=>{
         const updatedPosts = this.posts.filter(post=> post.id!==postId);
         this.posts=updatedPosts;
         this.postsUpdated.next([...this.posts]);
    });
  }
}

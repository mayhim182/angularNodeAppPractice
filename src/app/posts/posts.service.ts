import { Injectable } from '@angular/core';
import { post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { response } from 'express';

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

  getPost(id:string){
    return this.http.get<{_id:string,title:string,content:string}>('http://localhost:3000/api/posts/'+id);
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

  updatePost(id:string, title:string, content:string){
    const post:post ={id:id,title:title,content:content};
    this.http.put("http://localhost:3000/api/posts/"+id,post).subscribe(
      (response)=>{
        const updatedPosts = [...this.posts];
        const oldPostIndex=updatedPosts.findIndex(p=>p.id===post.id);
        updatedPosts[oldPostIndex]=post;
        this.posts=updatedPosts;
      }
    );
  }

  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/"+postId).subscribe(()=>{
         const updatedPosts = this.posts.filter(post=> post.id!==postId);
         this.posts=updatedPosts;
         this.postsUpdated.next([...this.posts]);
    });
  }
}

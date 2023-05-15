import { Injectable } from '@angular/core';
import { post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostsService{
    private posts:post[]=[];
    private postsUpdated = new Subject<post[]>();

    getPosts(){
        return [...this.posts]; //spread operator ... copies original array objects to temp array[]
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title:string,content:string){
        const post:post ={title:title,content:content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}
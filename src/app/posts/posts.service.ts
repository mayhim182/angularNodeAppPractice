import { Injectable } from '@angular/core';
import { post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class PostsService{
    private posts:post[]=[];
    private postsUpdated = new Subject<post[]>();

    constructor(private http:HttpClient){}

    getPosts(){
        this.http.get<{message:string,posts:post}>('http://localhost:3000/api/posts')
        .subscribe(()=>{

        });
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title:string,content:string){
        const post:post ={id:'',title:title,content:content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}
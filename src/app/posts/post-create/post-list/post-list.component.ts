import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { post } from "../../../posts/post.model";
import { Subscription } from "rxjs";
import { PostsService } from "../../posts.service";


@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  posts:post[]=[];
  private postsSub:Subscription=Subscription.EMPTY;
    

    constructor(public postService:PostsService){}   //Dependency injection here

    ngOnInit(): void {
        this.postService.getPosts();
        this.postsSub=this.postService.getPostUpdateListener().subscribe(
            (posts:post[])=>{
                console.log(posts[0].content);
                this.posts=posts;
            }
        );
    }

    ngOnDestroy(): void {
        this.postsSub.unsubscribe();
    }

}
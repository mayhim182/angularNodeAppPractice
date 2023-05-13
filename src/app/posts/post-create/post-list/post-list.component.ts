import { Component, Input } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { post } from "../../../posts/post.model";


@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})
export class PostListComponent{

    @Input() posts:post[]=[];

}
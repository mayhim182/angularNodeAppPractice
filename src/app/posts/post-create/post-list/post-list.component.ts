import { Component, Input } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";


@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})
export class PostListComponent{

    @Input() posts:any=[];

}
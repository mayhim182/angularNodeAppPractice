import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import {post} from "../../posts/post.model";


@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.css']
})
export class PostCreateComponent{

    enteredContent='';
    enteredTitle='';
    @Output() postCreated = new EventEmitter<post>();
    
    onAddPost(form:NgForm){
        if(form.invalid) return ;
        const post:post={
            title:form.value.title,
            content:form.value.content
        };
        this.postCreated.emit(post);
    }
}
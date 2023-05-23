import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  // postCreated = new EventEmitter<post>();
  private mode = 'create';
  private postId: string = '';
  public post:post={id:'',title:'',content:''};
  isLoading:boolean=false;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        const postId = paramMap.get('postId');
        this.postId = postId !== null ? postId : '';
        //Show spinner here
        this.isLoading=true;
        this.postsService.getPost(this.postId).subscribe(
          //End spinner after resp

            (postData)=>{
                this.isLoading=false;
                this.post={id:postData._id,title:postData.title,content:postData.content};
            }
        );
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) return;
    this.isLoading=true;
    if(this.mode==='create'){
        this.postsService.addPost(form.value.title, form.value.content);
    }
    else{
        this.postsService.updatePost(this.postId,form.value.title,form.value.content);
    }
    form.resetForm();
  }
}

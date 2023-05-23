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
        this.postsService.getPost(this.postId).subscribe(
            (postData)=>{
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

    if(this.mode==='create'){
        this.postsService.addPost(form.value.title, form.value.content);
    }
    else{
        this.postsService.updatePost(this.postId,form.value.title,form.value.content);
    }
    form.resetForm();
  }
}

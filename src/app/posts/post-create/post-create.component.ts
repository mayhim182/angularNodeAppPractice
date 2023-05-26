import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { post } from '../post.model';
import { mimeType } from "./mime-type.validator";

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
  public post: post = { id: '', title: '', content: '' };
  isLoading: boolean = false;
  imagePreview: string = '';

  form: FormGroup = new FormGroup({});

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators:[mimeType] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        const postId = paramMap.get('postId');
        this.postId = postId !== null ? postId : '';
        //Show spinner here
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(
          //End spinner after resp

          (postData) => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
            };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
            });
          }
        );
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost() {
    if (this.form.invalid) return;
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result !== null && typeof reader.result === 'string')
          this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

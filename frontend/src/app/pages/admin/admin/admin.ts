import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { Post, CreatePostDto, UpdatePostDto } from '../../../interfaces/posts.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent implements OnInit {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private authService = inject(AuthService);

  posts = signal<Post[]>([]);
  selectedPost = signal<Post | null>(null);
  isEditing = signal<boolean>(false);
  showForm = signal<boolean>(false);
  selectedImage = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    image: ['', [Validators.required]],
    category: ['', [Validators.required]]
  });

  ngOnInit() {
    console.log('AdminComponent inicializado');
    this.loadPosts();
  }

  async loadPosts() {
    try {
      console.log('Cargando posts...');
      const posts = await this.postService.getAllPosts();
      console.log('Posts cargados:', posts);

      // Verificar que posts sea un array
      if (Array.isArray(posts)) {
        this.posts.set(posts);
      } else {
        console.error('Los posts no son un array:', posts);
        this.posts.set([]); // Fallback a array vacío
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      this.posts.set([]); // Fallback a array vacío en caso de error
    }
  }

  openCreateForm() {
    this.isEditing.set(false);
    this.showForm.set(true);
    this.selectedPost.set(null);
    this.postForm.reset();
  }

  openEditForm(post: Post) {
    this.isEditing.set(true);
    this.showForm.set(true);
    this.selectedPost.set(post);

    this.imagePreview.set(post.bannerUrl); // image -> bannerUrl
    this.selectedImage.set(null);

    this.postForm.patchValue({
      title: post.title,
      description: post.body, // description -> body
      image: post.bannerUrl, // image -> bannerUrl
      category: '' // TODO: Implementar categorías cuando estén disponibles en Post
    });
  }

  closeForm() {
    this.showForm.set(false);
    this.selectedPost.set(null);
    this.selectedImage.set(null);
    this.imagePreview.set(null);
    this.postForm.reset();
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('Por favor selecciona un archivo de imagen válido (JPEG, PNG, GIF, WebP)');
        return;
      }

      this.selectedImage.set(file);

      const imageUrl = URL.createObjectURL(file);
      this.imagePreview.set(imageUrl);

      // Marcar el campo como válido
      this.postForm.patchValue({ image: file.name });
    }
  }

  removeImage() {
    this.selectedImage.set(null);
    this.imagePreview.set(null);
    this.postForm.patchValue({ image: '' });
  }

  async onSubmit() {
    if (this.postForm.valid && (this.selectedImage() || this.isEditing())) {
      const formData = this.postForm.value;

      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);

      // Solo agregar nueva imagen si se seleccionó una
      if (this.selectedImage()) {
        submitData.append('image', this.selectedImage()!);
      }

      formData.category
        .split(',')
        .map((cat: string) => cat.trim())
        .forEach((category: string) => {
          submitData.append('category[]', category);
        });

      const imageUrl = this.selectedImage()
        ? `/uploads/${this.selectedImage()!.name}`
        : formData.image;

      // Obtener el usuario autenticado para el authorId
      const currentUser = this.authService.currentUser();
      if (!currentUser) {
        console.error('Usuario no autenticado');
        return;
      }

      const postData: CreatePostDto = {
        title: formData.title,
        body: formData.description, // description -> body
        bannerUrl: imageUrl, // image -> bannerUrl
        authorId: currentUser.userId
      };

      try {
        if (this.isEditing()) {
          const updateData: UpdatePostDto = {
            title: formData.title,
            body: formData.description,
            bannerUrl: imageUrl
          };

          const result = await this.postService.updatePost(
            this.selectedPost()!.postId, // id -> postId
            updateData
          );
          if (result) {
            console.log('Post updated successfully');
          } else {
            console.error('Post not found');
          }
        } else {
          const newPost = await this.postService.createPost(postData);
          console.log('Post created successfully:', newPost);
        }

        await this.loadPosts();
        this.closeForm();
      } catch (error) {
        console.error('Error saving post:', error);
      }
    } else {
      this.postForm.markAllAsTouched();
    }
  }

  async deletePost(post: Post) {
    if (confirm(`¿Estás seguro de que quieres eliminar "${post.title}"?`)) {
      try {
        const success = await this.postService.deletePost(post.postId);
        if (success) {
          console.log('Post deleted successfully');
          await this.loadPosts();
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.postForm.get(fieldName);
    if (field?.hasError('required') && field?.touched) {
      return 'Este campo es obligatorio';
    }
    if (field?.hasError('minlength') && field?.touched) {
      const minLength = field.errors?.['minlength']?.requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return '';
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.postForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}

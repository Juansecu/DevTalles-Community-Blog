import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PostService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '../../services/auth.service';
import { Post, PostComment } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.html',
  styleUrls: ['./post.scss'],
  imports: [ReactiveFormsModule, DatePipe]
})
export class SinglePostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private commentsService = inject(CommentsService);
  public authService = inject(AuthService); // Made public for template access

  postId = signal<string>('');
  post = signal<Post | null>(null);
  comments = signal<PostComment[]>([]);
  isLiking = signal<boolean>(false);
  isLoadingComments = signal<boolean>(false);
  isSubmittingComment = signal<boolean>(false);

  commentForm: FormGroup = this.fb.group({
    comment: ['', [Validators.required]]
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId.set(params['id']);
      this.loadPost(params['id']);
      this.loadComments();
    });
  }

  private async loadPost(id: string) {
    try {
      const postId = parseInt(id, 10);
      const postsData = await this.postService.getPost(postId);

      if (postsData) {
        // The postsData already has the correct Post interface structure
        this.post.set(postsData);
      } else {
        console.error('Post not found');
        this.post.set(null);
      }
    } catch (error) {
      console.error('Error loading post:', error);
      this.post.set(null);
    }
  }

  private async loadComments() {
    if (!this.postId()) return;

    this.isLoadingComments.set(true);
    try {
      console.log('Cargando comentarios para el post:', this.postId());
      const postIdNumber = parseInt(this.postId(), 10);
      const comments = await this.commentsService.getCommentsByPost(postIdNumber);

      console.log('Comentarios recibidos:', comments);
      this.comments.set(comments);
    } catch (error) {
      console.error('Error cargando comentarios:', error);
      this.comments.set([]);
    } finally {
      this.isLoadingComments.set(false);
    }
  }

  async onSubmitComment() {
    if (!this.commentForm.valid) {
      console.log('Formulario de comentario no válido');
      this.commentForm.markAllAsTouched();
      return;
    }

    const currentUserId = this.authService.getCurrentUserId();
    if (!currentUserId) {
      console.error('Usuario no autenticado');
      // Aquí podrías mostrar un mensaje de error o redirigir al login
      return;
    }

    const postIdNumber = parseInt(this.postId(), 10);
    if (!postIdNumber) {
      console.error('ID de post inválido');
      return;
    }

    this.isSubmittingComment.set(true);
    try {
      const commentText = this.commentForm.get('comment')?.value;

      const newCommentData = {
        content: commentText,
        postId: postIdNumber,
        authorId: currentUserId
      };

      console.log('Creando nuevo comentario:', newCommentData);
      const createdComment = await this.commentsService.createComment(newCommentData);

      if (createdComment) {
        console.log('Comentario creado exitosamente:', createdComment);
        // Recargar todos los comentarios para obtener la información actualizada
        await this.loadComments();
        this.commentForm.reset();
      } else {
        console.error('Error al crear el comentario');
      }
    } catch (error) {
      console.error('Error creando comentario:', error);
    } finally {
      this.isSubmittingComment.set(false);
    }
  }

  async toggleLike() {
    if (this.isLiking() || !this.post()) {
      return;
    }

    this.isLiking.set(true);

    try {
      const postId = parseInt(this.postId(), 10);
      const result = await this.postService.toggleLike(postId);

      if (result.success && this.post()) {
        // Actualizar el post con los nuevos datos de likes
        const updatedPost = {
          ...this.post()!,
          likesCount: result.likes,
          isLiked: !this.post()!.isLiked // Toggle the current state
        };
        this.post.set(updatedPost);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      this.isLiking.set(false);
    }
  }

  getCommentError(): string {
    const commentControl = this.commentForm.get('comment');
    if (commentControl?.hasError('required') && commentControl?.touched) {
      return 'Este campo es obligatorio';
    }
    return '';
  }

  hasCommentError(): boolean {
    const commentControl = this.commentForm.get('comment');
    return !!(commentControl?.invalid && commentControl?.touched);
  }
}

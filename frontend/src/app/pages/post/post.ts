import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PostService } from '../../services/posts.service';
import { Post, Comment } from '../../interfaces/posts.interface';

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

  postId = signal<string>('');
  post = signal<Post | null>(null);
  comments = signal<Comment[]>([]);
  isLiking = signal<boolean>(false);

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

  private loadComments() {
    const mockComments: Comment[] = [
      {
        id: '1',
        author: 'Juan Pérez',
        content: '¡Excelente post! Me ha sido muy útil la información.',
        publishedAt: '2 hours ago'
      },
      {
        id: '2',
        author: 'María González',
        content:
          'Gracias por compartir este contenido. ¿Habrá más posts sobre este tema?',
        publishedAt: '3 hours ago'
      },
      {
        id: '3',
        author: 'DevTalles Team',
        content:
          '¡Gracias por sus comentarios! Definitivamente habrá más contenido pronto.',
        publishedAt: '5 hours ago',
        isTeamMember: true
      },
      {
        id: '4',
        author: 'Carlos Ruiz',
        content: 'Muy bien explicado, esperando el siguiente artículo.',
        publishedAt: '1 day ago'
      },
      {
        id: '5',
        author: 'Ana Torres',
        content: 'Perfect timing! Justo estaba buscando información sobre esto.',
        publishedAt: '2 days ago'
      },
      {
        id: '6',
        author: 'Luis Martín',
        content: 'Gran trabajo en el blog. Sigan así!',
        publishedAt: '3 days ago'
      }
    ];

    this.comments.set(mockComments);
  }

  onSubmitComment() {
    if (this.commentForm.valid) {
      const commentText = this.commentForm.get('comment')?.value;

      const newComment: Comment = {
        id: Date.now().toString(),
        author: 'Usuario Actual',
        content: commentText,
        publishedAt: 'Hace unos segundos'
      };

      const currentComments = this.comments();
      this.comments.set([newComment, ...currentComments]);

      this.commentForm.reset();
    } else {
      console.log('Formulario de comentario no válido');
      this.commentForm.markAllAsTouched();
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

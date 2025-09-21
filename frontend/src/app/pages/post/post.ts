import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  categories: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: string;
  isTeamMember?: boolean;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.html',
  styleUrls: ['./post.scss'],
  imports: [ReactiveFormsModule]
})
export class SinglePostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  postId = signal<string>('');
  post = signal<Post | null>(null);
  comments = signal<Comment[]>([]);

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

  private loadPost(id: string) {
    const mockPost: Post = {
      id,
      title: 'Hello world! This is a post title',
      content: `¡Hola a todos!

Estamos muy emocionados de anunciarles el lanzamiento de nuestro blog oficial. Aquí les compartiremos actualizaciones relacionadas a DevTalles (lanzamientos de cursos, adquisición de instructores al equipo, concursos, etc.) y al mundo de la tecnología.

¡No olviden compartir en redes sociales!`,
      author: 'Author',
      publishedAt: '09/20/2025',
      image: '/example.jpg',
      categories: ['Categoría', 'Categoría', 'Categoría', 'Categoría']
    };

    this.post.set(mockPost);
  }

  private loadComments() {
    const mockComments: Comment[] = [
      {
        id: '1',
        author: 'Author',
        content: 'Hello world!',
        publishedAt: '2 hours ago'
      },
      {
        id: '2',
        author: 'Author',
        content: 'Hello world!',
        publishedAt: '3 hours ago'
      },
      {
        id: '3',
        author: 'Author2',
        content: 'Hello world xd',
        publishedAt: '5 hours ago',
        isTeamMember: true
      },
      {
        id: '4',
        author: 'Author',
        content: 'Hello world!',
        publishedAt: '1 day ago'
      },
      {
        id: '5',
        author: 'Author3',
        content: 'Hello world!',
        publishedAt: '2 days ago'
      },
      {
        id: '6',
        author: 'Author4',
        content: 'Hello world!',
        publishedAt: '3 days ago'
      }
    ];

    this.comments.set(mockComments);
  }

  onSubmitComment() {
    if (this.commentForm.valid) {
      const commentText = this.commentForm.get('comment')?.value;

      // Crear nuevo comentario
      const newComment: Comment = {
        id: Date.now().toString(),
        author: 'Usuario Actual', // En una app real vendría de la sesión
        content: commentText,
        publishedAt: 'Hace unos segundos'
      };

      const currentComments = this.comments();
      this.comments.set([newComment, ...currentComments]);

      this.commentForm.reset();

      console.log('Comentario enviado:', commentText);
    } else {
      console.log('Formulario de comentario no válido');
      this.commentForm.markAllAsTouched();
    }
  }

  getCommentError(): string {
    const commentControl = this.commentForm.get('comment');
    if (commentControl?.hasError('required') && commentControl?.touched) {
      return 'Este campo es obligatorio';
    }
    if (commentControl?.hasError('minlength') && commentControl?.touched) {
      return 'El comentario debe tener al menos 10 caracteres';
    }
    return '';
  }

  hasCommentError(): boolean {
    const commentControl = this.commentForm.get('comment');
    return !!(commentControl?.invalid && commentControl?.touched);
  }
}

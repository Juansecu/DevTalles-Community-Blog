import { MigrationInterface, QueryRunner, View } from 'typeorm';

export class CreatePostWithLikesViewMigration1758590398234
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createView(
      new View({
        name: 'Post_with_likes',
        expression: `
          SELECT
            p."Post_id" AS "Post_id",
            p."Title" AS "Title",
            p."Body" AS "Body",
            p."Banner_url" AS "Banner_url",
            p."Author_id" AS "Author_id",
            u."Username" AS "Author_username",
            p."Posted_at" AS "Posted_at",
            p."Updated_at" AS "Updated_at",
            COUNT(pl."Post_id") AS "Likes_count",
            COALESCE(array_agg(DISTINCT c."Name") FILTER (WHERE c."Category_id" IS NOT NULL), '{}') AS "Categories",
            COALESCE(
              array_agg(json_build_object(
                'postCommentId', pc."Post_comment_id",
                'content', pc."Content",
                'postedAt', pc."Posted_at",
                'updatedAt', pc."Updated_at",
                'author', json_build_object(
                  'userId', cu."User_id",
                  'username', cu."Username"
                )
              )) FILTER (WHERE pc."Post_comment_id" IS NOT NULL), '{}'
            ) AS "Comments"
          FROM
            "Posts" p
          LEFT JOIN
            "Post_likes" pl ON p."Post_id" = pl."Post_id"
          INNER JOIN
            "Users" u ON p."Author_id" = u."User_id"
          LEFT JOIN
            "Post_categories" pcg ON p."Post_id" = pcg."Post_id"
          LEFT JOIN
            "Categories" c ON pcg."Category_id" = c."Category_id"
          LEFT JOIN
            "Post_comments" pc ON p."Post_id" = pc."Post_id"
          LEFT JOIN
            "Users" cu ON pc."Author_id" = cu."User_id"
          GROUP BY
            p."Post_id",
            p."Title",
            p."Body",
            p."Banner_url",
            p."Author_id",
            u."Username",
            p."Posted_at",
            p."Updated_at"
          ORDER BY
            p."Posted_at" DESC
        `.trim()
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropView('Post_with_likes');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostCommentsTableMigration1758586515097
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Post_comments',
        columns: [
          {
            name: 'Post_comment_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'Content',
            type: 'text',
            isNullable: false
          },
          {
            name: 'Parent_id',
            type: 'int',
            isNullable: true
          },
          {
            name: 'Author_id',
            type: 'int',
            isNullable: false
          },
          {
            name: 'Post_id',
            type: 'int',
            isNullable: false
          },
          {
            name: 'Posted_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false
          },
          {
            name: 'Updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            columnNames: ['Parent_id'],
            referencedTableName: 'Post_comments',
            referencedColumnNames: ['Post_comment_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['Author_id'],
            referencedTableName: 'Users',
            referencedColumnNames: ['User_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['Post_id'],
            referencedTableName: 'Posts',
            referencedColumnNames: ['Post_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Post_comments', true);
  }
}

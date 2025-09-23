import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostLikesTableMigration1758589644154
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Post_likes',
        columns: [
          {
            name: 'Post_id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'User_id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'Liked_at',
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
            columnNames: ['Post_id'],
            referencedColumnNames: ['Post_id'],
            referencedTableName: 'Posts',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['User_id'],
            referencedColumnNames: ['User_id'],
            referencedTableName: 'Users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Post_likes', true);
  }
}

import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePostsTableMigration1758582199106
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Posts',
        columns: [
          {
            name: 'Post_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'Title',
            type: 'varchar',
            length: '100',
            isNullable: false
          },
          {
            name: 'Body',
            type: 'text',
            isNullable: false
          },
          {
            name: 'Banner_url',
            type: 'varchar',
            length: '100',
            isNullable: false
          },
          {
            name: 'Likes_count',
            type: 'int',
            isNullable: false,
            default: 0
          },
          {
            name: 'User_id',
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
            columnNames: ['User_id'],
            referencedTableName: 'Users',
            referencedColumnNames: ['User_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Posts', true);
  }
}

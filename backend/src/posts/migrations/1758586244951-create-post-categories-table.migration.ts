import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostCategoriesTableMigration1758586244951
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Post_categories',
        columns: [
          {
            name: 'Post_id',
            type: 'int',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'Category_id',
            type: 'int',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'Added_at',
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
            referencedTableName: 'Posts',
            referencedColumnNames: ['Post_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['Category_id'],
            referencedTableName: 'Categories',
            referencedColumnNames: ['Category_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Post_categories', true);
  }
}

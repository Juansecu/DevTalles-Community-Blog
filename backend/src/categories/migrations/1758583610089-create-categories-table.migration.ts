import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategoriesTableMigration1758583610089
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Categories',
        columns: [
          {
            name: 'Category_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'Name',
            type: 'varchar',
            length: '50',
            isNullable: false
          },
          {
            name: 'Added_by',
            type: 'int',
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
            columnNames: ['Added_by'],
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
    await queryRunner.dropTable('Categories', true);
  }
}

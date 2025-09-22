import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolesTableMigration1758494324365
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Roles',
        columns: [
          {
            name: 'Role_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false
          },
          {
            name: 'Name',
            type: 'varchar',
            length: '30',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'Description',
            type: 'varchar',
            length: '100',
            isNullable: false
          },
          {
            name: 'Access_level',
            type: 'int',
            isNullable: false,
            default: 1
          },
          {
            name: 'Added_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'Updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Roles', true);
  }
}

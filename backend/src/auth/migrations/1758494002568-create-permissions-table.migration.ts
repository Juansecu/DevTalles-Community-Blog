import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePermissionsTableMigration1758494002568
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Permissions',
        columns: [
          {
            name: 'Permission_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false
          },
          {
            name: 'Name',
            type: 'varchar',
            length: '50',
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
    await queryRunner.dropTable('Permissions', true);
  }
}

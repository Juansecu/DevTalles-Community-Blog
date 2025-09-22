import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolePermissionsTableMigration1758495279566
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Role_permissions',
        columns: [
          {
            name: 'Role_id',
            type: 'integer',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'Permission_id',
            type: 'integer',
            isPrimary: true,
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
        ],
        foreignKeys: [
          {
            columnNames: ['Role_id'],
            referencedTableName: 'Roles',
            referencedColumnNames: ['Role_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['Permission_id'],
            referencedTableName: 'Permissions',
            referencedColumnNames: ['Permission_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Role_permissions', true);
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserPermissionsTableMigration1758495565022
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User_permissions',
        columns: [
          {
            name: 'User_id',
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
            columnNames: ['User_id'],
            referencedTableName: 'Users',
            referencedColumnNames: ['User_id'],
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
    await queryRunner.dropTable('User_permissions', true);
  }
}

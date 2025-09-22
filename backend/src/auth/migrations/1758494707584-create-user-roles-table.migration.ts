import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserRolesTableMigration1758494707584
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User_roles',
        columns: [
          {
            name: 'User_id',
            type: 'integer',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'Role_id',
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
            columnNames: ['Role_id'],
            referencedTableName: 'Roles',
            referencedColumnNames: ['Role_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User_roles', true);
  }
}

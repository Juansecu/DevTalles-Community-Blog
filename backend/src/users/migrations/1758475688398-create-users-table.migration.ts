import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTableMigration1758475688398
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Users',
        columns: [
          {
            name: 'User_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true,
            isGenerated: false
          },
          {
            name: 'First_name',
            type: 'varchar',
            length: '50',
            isNullable: false
          },
          {
            name: 'Last_name',
            type: 'varchar',
            length: '70',
            isNullable: false
          },
          {
            name: 'Email',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'Username',
            type: 'varchar',
            length: '32',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'Password',
            type: 'varchar',
            length: '60',
            isNullable: false
          },
          {
            name: 'Birthdate',
            type: 'date',
            isNullable: false
          },
          {
            name: 'Registered_at',
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
    await queryRunner.dropTable('Users', true);
  }
}

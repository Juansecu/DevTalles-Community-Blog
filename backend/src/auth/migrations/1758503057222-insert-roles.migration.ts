import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRolesMigration1758503057222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Roles" ("Role_id", "Name", "Description", "Access_level")
      VALUES
        (1, 'WEB_MASTER', 'Super administrator with all permissions', 1),
        (2, 'ADMIN', 'Administrator with elevated permissions', 2),
        (3, 'MODERATOR', 'Moderator with content management permissions', 3),
        (4, 'USER', 'Regular user with standard permissions', 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roleIds = [1, 2, 3, 4];

    await queryRunner.query(`
      DELETE FROM "Roles"
      WHERE "Role_id" IN (${roleIds.join(', ')});
    `);
  }
}

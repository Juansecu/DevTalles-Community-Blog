import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRolePermissionsMigration1758503765082
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Role_permissions" ("Role_id", "Permission_id")
      VALUES
        -- WEB_MASTER permissions
        (1, 1),
        (1, 2),
        (1, 3),
        (1, 4),
        (1, 5),
        (1, 6),
        (1, 7),
        (1, 8),
        (1, 9),
        (1, 10),
        (1, 11),
        (1, 12),
        (1, 13),
        (1, 14),
        (1, 15),
        (1, 16),
        (1, 17),
        -- ADMIN permissions
        (2, 4),
        (2, 6),
        (2, 9),
        (2, 10),
        (2, 11),
        (2, 12),
        (2, 13),
        (2, 14),
        (2, 15),
        (2, 16),
        (2, 17),
        -- MODERATOR permissions
        (3, 4),
        (3, 6),
        -- USER permissions
        (4, 1),
        (4, 2),
        (4, 3),
        (4, 5),
        (4, 7),
        (4, 8);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roleIds = [1, 2, 3, 4];
    const permissionIds = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
    ];

    await queryRunner.query(`
      DELETE FROM Role_permissions
      WHERE Role_id IN (${roleIds.join(', ')})
      AND Permission_id IN (${permissionIds.join(', ')});
    `);
  }
}

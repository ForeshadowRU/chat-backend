import {MigrationInterface, QueryRunner} from "typeorm";

export class refractoring1587840312981 implements MigrationInterface {
    name = 'refractoring1587840312981'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` ADD `isPrivate` tinyint NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` DROP COLUMN `isPrivate`", undefined);
    }

}

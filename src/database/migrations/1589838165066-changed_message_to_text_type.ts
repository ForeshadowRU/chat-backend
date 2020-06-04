import {MigrationInterface, QueryRunner} from "typeorm";

export class changedMessageToTextType1589838165066 implements MigrationInterface {
    name = 'changedMessageToTextType1589838165066'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `message` DROP COLUMN `text`", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD `text` text NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `channel` ADD UNIQUE INDEX `IDX_800e6da7e4c30fbb0653ba7bb6` (`name`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel` DROP INDEX `IDX_800e6da7e4c30fbb0653ba7bb6`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP COLUMN `text`", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD `text` varchar(255) NOT NULL", undefined);
    }

}

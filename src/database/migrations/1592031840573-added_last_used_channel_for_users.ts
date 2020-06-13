import {MigrationInterface, QueryRunner} from "typeorm";

export class addedLastUsedChannelForUsers1592031840573 implements MigrationInterface {
    name = 'addedLastUsedChannelForUsers1592031840573'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `message` DROP COLUMN `last_used_channel`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `last_used_channel` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `status` `status` int NOT NULL DEFAULT 0", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `status` `status` int NOT NULL DEFAULT '1'", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `last_used_channel`", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD `last_used_channel` int NOT NULL DEFAULT '0'", undefined);
    }

}

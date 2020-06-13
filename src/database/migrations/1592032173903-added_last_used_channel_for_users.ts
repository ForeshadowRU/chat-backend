import {MigrationInterface, QueryRunner} from "typeorm";

export class addedLastUsedChannelForUsers1592032173903 implements MigrationInterface {
    name = 'addedLastUsedChannelForUsers1592032173903'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `last_used_channel` `last_used_channel` int NOT NULL DEFAULT 1", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `last_used_channel` `last_used_channel` int NOT NULL DEFAULT '0'", undefined);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1583427464953 implements MigrationInterface {
    name = 'initialMigration1583427464953'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `server` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `avatar` varchar(255) NULL, `username` varchar(255) NOT NULL, `password` char(60) NULL, `firstname` varchar(255) NOT NULL, `status` int NOT NULL, `lastname` varchar(255) NOT NULL, `isGoogleAccount` tinyint NOT NULL DEFAULT 0, `registred_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `channel` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `serverId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `message` (`id` int NOT NULL AUTO_INCREMENT, `text` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `senderId` int NULL, `channelId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `server_members_user` (`serverId` varchar(36) NOT NULL, `userId` int NOT NULL, INDEX `IDX_f16298702d40d574b58981d492` (`serverId`), INDEX `IDX_80d6203fcfd3cce7f1b3f9b665` (`userId`), PRIMARY KEY (`serverId`, `userId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `channel_users_user` (`channelId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_b1264bc94c62439e51a031b992` (`channelId`), INDEX `IDX_abc4f49166d336a1f2493dd6e1` (`userId`), PRIMARY KEY (`channelId`, `userId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `channel` ADD CONSTRAINT `FK_656efd5d40c72d70f0e63293966` FOREIGN KEY (`serverId`) REFERENCES `server`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_bc096b4e18b1f9508197cd98066` FOREIGN KEY (`senderId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_5fdbbcb32afcea663c2bea2954f` FOREIGN KEY (`channelId`) REFERENCES `channel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `server_members_user` ADD CONSTRAINT `FK_f16298702d40d574b58981d4925` FOREIGN KEY (`serverId`) REFERENCES `server`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `server_members_user` ADD CONSTRAINT `FK_80d6203fcfd3cce7f1b3f9b6650` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `channel_users_user` ADD CONSTRAINT `FK_b1264bc94c62439e51a031b992b` FOREIGN KEY (`channelId`) REFERENCES `channel`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `channel_users_user` ADD CONSTRAINT `FK_abc4f49166d336a1f2493dd6e1d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `channel_users_user` DROP FOREIGN KEY `FK_abc4f49166d336a1f2493dd6e1d`", undefined);
        await queryRunner.query("ALTER TABLE `channel_users_user` DROP FOREIGN KEY `FK_b1264bc94c62439e51a031b992b`", undefined);
        await queryRunner.query("ALTER TABLE `server_members_user` DROP FOREIGN KEY `FK_80d6203fcfd3cce7f1b3f9b6650`", undefined);
        await queryRunner.query("ALTER TABLE `server_members_user` DROP FOREIGN KEY `FK_f16298702d40d574b58981d4925`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_5fdbbcb32afcea663c2bea2954f`", undefined);
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_bc096b4e18b1f9508197cd98066`", undefined);
        await queryRunner.query("ALTER TABLE `channel` DROP FOREIGN KEY `FK_656efd5d40c72d70f0e63293966`", undefined);
        await queryRunner.query("DROP INDEX `IDX_abc4f49166d336a1f2493dd6e1` ON `channel_users_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_b1264bc94c62439e51a031b992` ON `channel_users_user`", undefined);
        await queryRunner.query("DROP TABLE `channel_users_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_80d6203fcfd3cce7f1b3f9b665` ON `server_members_user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_f16298702d40d574b58981d492` ON `server_members_user`", undefined);
        await queryRunner.query("DROP TABLE `server_members_user`", undefined);
        await queryRunner.query("DROP TABLE `message`", undefined);
        await queryRunner.query("DROP TABLE `channel`", undefined);
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `server`", undefined);
    }

}

-- CreateTable
CREATE TABLE `brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(50) NOT NULL,
    `title_ar` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(96) NOT NULL,
    `subcategory_id` INTEGER NOT NULL,

    UNIQUE INDEX `slug`(`slug`),
    INDEX `slug_2`(`slug`),
    INDEX `subcategory_id`(`subcategory_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(255) NOT NULL,
    `title_ar` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `description_en` TEXT NULL,
    `description_ar` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `ad_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(50) NOT NULL,
    `title_ar` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(96) NOT NULL,
    `subcategory_id` INTEGER NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `slug`(`slug`),
    INDEX `slug_2`(`slug`),
    INDEX `subcategory_id`(`subcategory_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(255) NOT NULL,
    `title_ar` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(96) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `optionsubcategory` (
    `option_id` INTEGER NOT NULL,
    `subcategory_id` INTEGER NOT NULL,

    INDEX `subcategory_id`(`subcategory_id`),
    PRIMARY KEY (`option_id`, `subcategory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `optionvalue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_id` INTEGER NOT NULL,
    `value_en` VARCHAR(255) NOT NULL,
    `value_ar` VARCHAR(255) NOT NULL,

    INDEX `option_id`(`option_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(255) NOT NULL,
    `title_ar` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `image` VARCHAR(255) NULL,
    `description_en` TEXT NULL,
    `description_ar` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `slug`(`slug`),
    INDEX `category_id`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adName` VARCHAR(255) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `subcategoryId` INTEGER NOT NULL,
    `brand` VARCHAR(255) NULL,
    `model` VARCHAR(255) NULL,
    `condition` ENUM('new', 'used') NULL,
    `currency` ENUM('LKR', 'USD') NULL,
    `authenticity` ENUM('original', 'copy') NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `negotiable` BOOLEAN NULL DEFAULT false,
    `description` TEXT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NULL,
    `location` VARCHAR(255) NULL,
    `mapLatitude` DECIMAL(10, 8) NULL,
    `mapLongitude` DECIMAL(11, 8) NULL,
    `userId` INTEGER NOT NULL,
    `payment` BOOLEAN NULL DEFAULT false,
    `viewCount` INTEGER NULL DEFAULT 0,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `postad_categoryId_fkey`(`categoryId`),
    INDEX `postad_subcategoryId_fkey`(`subcategoryId`),
    INDEX `postad_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postad_features` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postAdId` INTEGER NOT NULL,
    `feature` VARCHAR(255) NULL,

    INDEX `postAdId`(`postAdId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postad_options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postAdId` INTEGER NOT NULL,
    `optionKey` VARCHAR(255) NULL,
    `optionValue` VARCHAR(255) NULL,

    INDEX `postAdId`(`postAdId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postad_photos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postAdId` INTEGER NOT NULL,
    `photoUrl` TEXT NULL,
    `altText` VARCHAR(255) NULL,

    INDEX `postAdId`(`postAdId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(20) NULL,
    `avatarUrl` VARCHAR(500) NOT NULL,
    `createdDate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `member` BOOLEAN NOT NULL,
    `userexid` VARCHAR(500) NOT NULL,
    `verifiedSeller` BOOLEAN NOT NULL,

    UNIQUE INDEX `users_userexid_key`(`userexid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `brand` ADD CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `optionsubcategory` ADD CONSTRAINT `optionsubcategory_ibfk_1` FOREIGN KEY (`option_id`) REFERENCES `option`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `optionsubcategory` ADD CONSTRAINT `optionsubcategory_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `optionvalue` ADD CONSTRAINT `optionvalue_ibfk_1` FOREIGN KEY (`option_id`) REFERENCES `option`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `subcategory` ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `postad` ADD CONSTRAINT `postad_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postad` ADD CONSTRAINT `postad_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postad` ADD CONSTRAINT `postad_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postad_features` ADD CONSTRAINT `postad_features_ibfk_1` FOREIGN KEY (`postAdId`) REFERENCES `postad`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `postad_options` ADD CONSTRAINT `postad_options_ibfk_1` FOREIGN KEY (`postAdId`) REFERENCES `postad`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `postad_photos` ADD CONSTRAINT `postad_photos_ibfk_1` FOREIGN KEY (`postAdId`) REFERENCES `postad`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

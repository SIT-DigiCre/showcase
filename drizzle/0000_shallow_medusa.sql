CREATE TABLE `account` (
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `provider_account_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_id` ON `account` (`user_id`);--> statement-breakpoint
CREATE TABLE `asset` (
	`id` text PRIMARY KEY NOT NULL,
	`item_id` integer,
	`format` text,
	`preview_url` text,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `audio` (
	`id` text PRIMARY KEY NOT NULL,
	`item_id` integer,
	`duration` integer,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `image` (
	`id` text PRIMARY KEY NOT NULL,
	`item_id` integer,
	`width` integer,
	`height` integer,
	`alt_text` text,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`work_id` integer NOT NULL,
	`name` text NOT NULL,
	`file_url` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer DEFAULT '"2025-04-08T09:31:06.795Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-04-08T09:31:06.795Z"' NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `work`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_by` text NOT NULL,
	`created_at` integer DEFAULT '"2025-04-08T09:31:06.796Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-04-08T09:31:06.796Z"' NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `series_name_unique` ON `series` (`name`);--> statement-breakpoint
CREATE TABLE `session` (
	`session_token` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text,
	`email` text NOT NULL,
	`email_verified` integer,
	`name` text NOT NULL,
	`image` text,
	`cover` text,
	`bio` text,
	`role` text DEFAULT 'user' NOT NULL,
	`is_verified` integer DEFAULT false,
	`created_at` integer DEFAULT '"2025-04-08T09:31:06.795Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-04-08T09:31:06.795Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_slug_unique` ON `user` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `video` (
	`id` text PRIMARY KEY NOT NULL,
	`item_id` integer,
	`width` integer,
	`height` integer,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `work_series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`work_id` integer NOT NULL,
	`series_id` integer NOT NULL,
	`created_at` integer DEFAULT '"2025-04-08T09:31:06.796Z"' NOT NULL,
	FOREIGN KEY (`work_id`) REFERENCES `work`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `work` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`content` text,
	`author_id` text NOT NULL,
	`period` text,
	`is_visible` integer DEFAULT false,
	`created_at` integer DEFAULT '"2025-04-08T09:31:06.795Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-04-08T09:31:06.795Z"' NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);

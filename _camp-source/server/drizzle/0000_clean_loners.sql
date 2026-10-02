CREATE TABLE `meals` (
	`id` text PRIMARY KEY NOT NULL,
	`adults` integer DEFAULT 1 NOT NULL,
	`choices` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `shopping` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`quantity` text DEFAULT '' NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'need' NOT NULL,
	`position` integer DEFAULT 100 NOT NULL,
	`updated_at` text NOT NULL
);

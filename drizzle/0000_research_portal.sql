CREATE TABLE `research_attempts` (
	`client` text PRIMARY KEY NOT NULL,
	`started` integer NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `research_audit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`operation` text NOT NULL,
	`detail` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `research_links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`group_name` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`url` text NOT NULL,
	`sort_order` integer NOT NULL,
	`icon` text NOT NULL,
	`is_visible` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `research_sessions` (
	`token` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`csrf` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `research_state` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);

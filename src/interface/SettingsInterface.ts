export interface SettingsInterface {
    token: string;
    bot: BotConfig;
    support_channels: string[];
    excluded_roles: string[];
    urls: UrlsConfig;
    images: ImagesConfig;
    debug: boolean;
}

export interface BotConfig {
    activity: ActivityType;
    activity_message: string;
    activity_status: string;
}

export interface UrlsConfig {
    allowed_urls: string[];
    max_content_size_in_bytes: number;
}

export interface ImagesConfig {
    max_size_in_bytes: number;
    parse_language: string;
    message_reaction: string;
}

export enum ActivityType {
    Playing = "PLAYING",
    Streaming = "STREAMING",
    Listening = "LISTENING",
    Watching = "WATCHING",
    Competing = "COMPETING",
}
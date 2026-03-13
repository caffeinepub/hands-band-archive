import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CommunityPost {
    id: bigint;
    author: string;
    message: string;
    timestamp: Time;
}
export interface ArchiveItem {
    id: bigint;
    title: string;
    date: string;
    tags: Array<string>;
    type: Type;
    description: string;
}
export type Time = bigint;
export interface Show {
    id: bigint;
    venue: string;
    city: string;
    date: string;
    isUpcoming: boolean;
    notes: string;
    timestamp: Time;
}
export interface Download {
    id: bigint;
    title: string;
    downloadType: DownloadType;
    description: string;
    fileUrl: string;
}
export interface MusicRelease {
    id: bigint;
    artworkDescription: string;
    title: string;
    trackList: Array<string>;
    recordingNotes: string;
    dateRecorded: string;
    notes: string;
    subtitle: string;
}
export interface UserProfile {
    name: string;
}
export enum DownloadType {
    art = "art",
    lyrics = "lyrics",
    wallpaper = "wallpaper",
    demo = "demo",
    zine = "zine",
    poster = "poster"
}
export enum Type {
    flyer = "flyer",
    other = "other",
    demo = "demo",
    journal = "journal",
    notebook = "notebook",
    photo = "photo"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCommunityPost(author: string, message: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArchiveItem(title: string, type: Type, description: string, date: string, tags: Array<string>): Promise<void>;
    createDownload(title: string, downloadType: DownloadType, description: string, fileUrl: string): Promise<void>;
    createMusicRelease(title: string, subtitle: string, notes: string, recordingNotes: string, dateRecorded: string, trackList: Array<string>, artworkDescription: string): Promise<void>;
    createShow(venue: string, city: string, date: string, isUpcoming: boolean, notes: string): Promise<void>;
    deleteArchiveItem(id: bigint): Promise<void>;
    deleteCommunityPost(id: bigint): Promise<void>;
    deleteDownload(id: bigint): Promise<void>;
    deleteMusicRelease(id: bigint): Promise<void>;
    deleteShow(id: bigint): Promise<void>;
    getArchiveItems(): Promise<Array<ArchiveItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCommunityPosts(): Promise<Array<CommunityPost>>;
    getDownloads(): Promise<Array<Download>>;
    getMusicReleases(): Promise<Array<MusicRelease>>;
    getShows(): Promise<Array<Show>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateArchiveItem(id: bigint, title: string, type: Type, description: string, date: string, tags: Array<string>): Promise<void>;
    updateDownload(id: bigint, title: string, downloadType: DownloadType, description: string, fileUrl: string): Promise<void>;
    updateMusicRelease(id: bigint, title: string, subtitle: string, notes: string, recordingNotes: string, dateRecorded: string, trackList: Array<string>, artworkDescription: string): Promise<void>;
    updateShow(id: bigint, venue: string, city: string, date: string, isUpcoming: boolean, notes: string): Promise<void>;
}

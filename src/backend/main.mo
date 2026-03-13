import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  module Type {
    public type Type = {
      #flyer;
      #notebook;
      #photo;
      #demo;
      #journal;
      #other;
    };

    public func compare(a : Type, b : Type) : Order.Order {
      switch (a, b) {
        case (#flyer, #notebook) { #less };
        case (#flyer, #photo) { #less };
        case (#flyer, #demo) { #less };
        case (#flyer, #journal) { #less };
        case (#flyer, #other) { #less };
        case (#notebook, #flyer) { #greater };
        case (#notebook, #photo) { #less };
        case (#notebook, #demo) { #less };
        case (#notebook, #journal) { #less };
        case (#notebook, #other) { #less };
        case (#photo, #flyer) { #greater };
        case (#photo, #notebook) { #greater };
        case (#photo, #demo) { #less };
        case (#photo, #journal) { #less };
        case (#photo, #other) { #less };
        case (#demo, #flyer) { #greater };
        case (#demo, #notebook) { #greater };
        case (#demo, #photo) { #greater };
        case (#demo, #journal) { #less };
        case (#demo, #other) { #less };
        case (#journal, #flyer) { #greater };
        case (#journal, #notebook) { #greater };
        case (#journal, #photo) { #greater };
        case (#journal, #demo) { #greater };
        case (#journal, #other) { #less };
        case (#other, #flyer) { #greater };
        case (#other, #notebook) { #greater };
        case (#other, #photo) { #greater };
        case (#other, #demo) { #greater };
        case (#other, #journal) { #greater };
        case (_) { #equal };
      };
    };
  };

  module DownloadType {
    public type DownloadType = {
      #wallpaper;
      #poster;
      #demo;
      #zine;
      #lyrics;
      #art;
    };

    public func compare(a : DownloadType, b : DownloadType) : Order.Order {
      switch (a, b) {
        case (#wallpaper, #poster) { #less };
        case (#wallpaper, #demo) { #less };
        case (#wallpaper, #zine) { #less };
        case (#wallpaper, #lyrics) { #less };
        case (#wallpaper, #art) { #less };
        case (#poster, #wallpaper) { #greater };
        case (#poster, #demo) { #less };
        case (#poster, #zine) { #less };
        case (#poster, #lyrics) { #less };
        case (#poster, #art) { #less };
        case (#demo, #wallpaper) { #greater };
        case (#demo, #poster) { #greater };
        case (#demo, #zine) { #less };
        case (#demo, #lyrics) { #less };
        case (#demo, #art) { #less };
        case (#zine, #wallpaper) { #greater };
        case (#zine, #poster) { #greater };
        case (#zine, #demo) { #greater };
        case (#zine, #lyrics) { #less };
        case (#zine, #art) { #less };
        case (#lyrics, #wallpaper) { #greater };
        case (#lyrics, #poster) { #greater };
        case (#lyrics, #demo) { #greater };
        case (#lyrics, #zine) { #greater };
        case (#lyrics, #art) { #less };
        case (#art, #wallpaper) { #greater };
        case (#art, #poster) { #greater };
        case (#art, #demo) { #greater };
        case (#art, #zine) { #greater };
        case (#art, #lyrics) { #greater };
        case (_) { #equal };
      };
    };
  };

  public type CommunityPost = {
    id : Nat;
    author : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module CommunityPost {
    public func compareByTimestamp(a : CommunityPost, b : CommunityPost) : Order.Order {
      if (a.timestamp < b.timestamp) { #less } else if (a.timestamp > b.timestamp) {
        #greater;
      } else { #equal };
    };
  };

  public type Show = {
    id : Nat;
    venue : Text;
    city : Text;
    date : Text;
    isUpcoming : Bool;
    notes : Text;
    timestamp : Time.Time;
  };

  public type MusicRelease = {
    id : Nat;
    title : Text;
    subtitle : Text;
    notes : Text;
    recordingNotes : Text;
    dateRecorded : Text;
    trackList : [Text];
    artworkDescription : Text;
  };

  public type ArchiveItem = {
    id : Nat;
    title : Text;
    type_ : Type.Type;
    description : Text;
    date : Text;
    tags : [Text];
  };

  public type Download = {
    id : Nat;
    title : Text;
    downloadType : DownloadType.DownloadType;
    description : Text;
    fileUrl : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  public type Media = {
    id : Text;
    name : Text;
    artist : Text;
    mediaType : Text;
    url : Text;
    artwork : Text;
    blob : Storage.ExternalBlob;
    createdAt : Nat;
  };

  public type Music = {
    id : Text;
    timestamp : Text;
    collection : Text;
    blob : Storage.ExternalBlob;
    createdAt : Nat;
  };

  public type Picture = {
    id : Text;
    width : Nat;
    height : Nat;
    blob : Storage.ExternalBlob;
    createdAt : Nat;
  };

  let communityPosts = Map.empty<Nat, CommunityPost>();
  let shows = Map.empty<Nat, Show>();
  let musicReleases = Map.empty<Nat, MusicRelease>();
  let archiveItems = Map.empty<Nat, ArchiveItem>();
  let downloads = Map.empty<Nat, Download>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextCommunityPostId = 6;
  var nextShowId = 4;
  var nextMusicReleaseId = 4;
  var nextArchiveItemId = 6;
  var nextDownloadId = 4;

  let initialDataLoaded = true;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Community Post Functions
  public shared ({ caller }) func addCommunityPost(author : Text, message : Text) : async () {
    if (author.size() == 0 or message.size() == 0) {
      Runtime.trap("Author and message cannot be empty");
    };

    let post : CommunityPost = {
      id = nextCommunityPostId;
      author;
      message;
      timestamp = Time.now();
    };

    communityPosts.add(nextCommunityPostId, post);
    nextCommunityPostId += 1;
  };

  public query ({ caller }) func getCommunityPosts() : async [CommunityPost] {
    communityPosts.values().toArray().sort(CommunityPost.compareByTimestamp);
  };

  public shared ({ caller }) func deleteCommunityPost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };

    switch (communityPosts.get(id)) {
      case (null) { Runtime.trap("Community post not found") };
      case (?_) {
        communityPosts.remove(id);
      };
    };
  };

  // Show Functions
  public shared ({ caller }) func createShow(
    venue : Text,
    city : Text,
    date : Text,
    isUpcoming : Bool,
    notes : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create shows");
    };

    let show : Show = {
      id = nextShowId;
      venue;
      city;
      date;
      isUpcoming;
      notes;
      timestamp = Time.now();
    };

    shows.add(nextShowId, show);
    nextShowId += 1;
  };

  public shared ({ caller }) func updateShow(
    id : Nat,
    venue : Text,
    city : Text,
    date : Text,
    isUpcoming : Bool,
    notes : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update shows");
    };

    let updatedShow : Show = {
      id;
      venue;
      city;
      date;
      isUpcoming;
      notes;
      timestamp = Time.now();
    };

    switch (shows.get(id)) {
      case (null) { Runtime.trap("Show not found") };
      case (?_) {
        shows.add(id, updatedShow);
      };
    };
  };

  public shared ({ caller }) func deleteShow(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete shows");
    };

    switch (shows.get(id)) {
      case (null) { Runtime.trap("Show not found") };
      case (?_) {
        shows.remove(id);
      };
    };
  };

  public query ({ caller }) func getShows() : async [Show] {
    shows.values().toArray();
  };

  // Music Release Functions
  public shared ({ caller }) func createMusicRelease(
    title : Text,
    subtitle : Text,
    notes : Text,
    recordingNotes : Text,
    dateRecorded : Text,
    trackList : [Text],
    artworkDescription : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create music releases");
    };

    let release : MusicRelease = {
      id = nextMusicReleaseId;
      title;
      subtitle;
      notes;
      recordingNotes;
      dateRecorded;
      trackList;
      artworkDescription;
    };

    musicReleases.add(nextMusicReleaseId, release);
    nextMusicReleaseId += 1;
  };

  public shared ({ caller }) func updateMusicRelease(
    id : Nat,
    title : Text,
    subtitle : Text,
    notes : Text,
    recordingNotes : Text,
    dateRecorded : Text,
    trackList : [Text],
    artworkDescription : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update music releases");
    };

    let updatedRelease : MusicRelease = {
      id;
      title;
      subtitle;
      notes;
      recordingNotes;
      dateRecorded;
      trackList;
      artworkDescription;
    };

    switch (musicReleases.get(id)) {
      case (null) { Runtime.trap("Music release not found") };
      case (?_) {
        musicReleases.add(id, updatedRelease);
      };
    };
  };

  public shared ({ caller }) func deleteMusicRelease(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete music releases");
    };

    switch (musicReleases.get(id)) {
      case (null) { Runtime.trap("Music release not found") };
      case (?_) {
        musicReleases.remove(id);
      };
    };
  };

  public query ({ caller }) func getMusicReleases() : async [MusicRelease] {
    musicReleases.values().toArray();
  };

  // Archive Item Functions
  public shared ({ caller }) func createArchiveItem(
    title : Text,
    type_ : Type.Type,
    description : Text,
    date : Text,
    tags : [Text],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create archive items");
    };

    let item : ArchiveItem = {
      id = nextArchiveItemId;
      title;
      type_;
      description;
      date;
      tags;
    };

    archiveItems.add(nextArchiveItemId, item);
    nextArchiveItemId += 1;
  };

  public shared ({ caller }) func updateArchiveItem(
    id : Nat,
    title : Text,
    type_ : Type.Type,
    description : Text,
    date : Text,
    tags : [Text],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update archive items");
    };

    let updatedItem : ArchiveItem = {
      id;
      title;
      type_;
      description;
      date;
      tags;
    };

    switch (archiveItems.get(id)) {
      case (null) { Runtime.trap("Archive item not found") };
      case (?_) {
        archiveItems.add(id, updatedItem);
      };
    };
  };

  public shared ({ caller }) func deleteArchiveItem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete archive items");
    };

    switch (archiveItems.get(id)) {
      case (null) { Runtime.trap("Archive item not found") };
      case (?_) {
        archiveItems.remove(id);
      };
    };
  };

  public query ({ caller }) func getArchiveItems() : async [ArchiveItem] {
    archiveItems.values().toArray();
  };

  // Download Functions
  public shared ({ caller }) func createDownload(
    title : Text,
    downloadType : DownloadType.DownloadType,
    description : Text,
    fileUrl : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create downloads");
    };

    let download : Download = {
      id = nextDownloadId;
      title;
      downloadType;
      description;
      fileUrl;
    };

    downloads.add(nextDownloadId, download);
    nextDownloadId += 1;
  };

  public shared ({ caller }) func updateDownload(
    id : Nat,
    title : Text,
    downloadType : DownloadType.DownloadType,
    description : Text,
    fileUrl : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update downloads");
    };

    let updatedDownload : Download = {
      id;
      title;
      downloadType;
      description;
      fileUrl;
    };

    switch (downloads.get(id)) {
      case (null) { Runtime.trap("Download not found") };
      case (?_) {
        downloads.add(id, updatedDownload);
      };
    };
  };

  public shared ({ caller }) func deleteDownload(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete downloads");
    };

    switch (downloads.get(id)) {
      case (null) { Runtime.trap("Download not found") };
      case (?_) {
        downloads.remove(id);
      };
    };
  };

  public query ({ caller }) func getDownloads() : async [Download] {
    downloads.values().toArray();
  };
};

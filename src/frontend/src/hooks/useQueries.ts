import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ArchiveItem,
  CommunityPost,
  Download,
  MusicRelease,
  Show,
} from "../backend.d";
import { useActor } from "./useActor";

export function useMusicReleases() {
  const { actor, isFetching } = useActor();
  return useQuery<MusicRelease[]>({
    queryKey: ["musicReleases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMusicReleases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useArchiveItems() {
  const { actor, isFetching } = useActor();
  return useQuery<ArchiveItem[]>({
    queryKey: ["archiveItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArchiveItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useShows() {
  const { actor, isFetching } = useActor();
  return useQuery<Show[]>({
    queryKey: ["shows"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getShows();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDownloads() {
  const { actor, isFetching } = useActor();
  return useQuery<Download[]>({
    queryKey: ["downloads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDownloads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCommunityPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<CommunityPost[]>({
    queryKey: ["communityPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCommunityPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCommunityPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      author,
      message,
    }: { author: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addCommunityPost(author, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityPosts"] });
    },
  });
}

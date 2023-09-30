import { string, object, array, number, infer as _infer, boolean, literal } from "zod";


export const SearchResultsSchema = object({
    kind: string(),
    etag: string(),
    regionCode: string(),
    pageInfo: object({
        totalResults: number(),
        resultsPerPage: number(),
    }),
    items: array(object({
        kind: string(),
        etag: string(),
        id: object({
            kind: string(),
            videoId: string()
        })
    }))
});

export const VideoDetailsSchema = object({
    kind: string(),
    etag: string(),
    items: array(
      object({
        kind: string(),
        etag: string(),
        id: string(),
        snippet: object({
          publishedAt: string(),
          channelId: string(),
          title: string(),
          description: string(),
          thumbnails: object({
            default: object({
              url: string(),
              width: number(),
              height: number(),
            }),
            medium: object({
              url: string(),
              width: number(),
              height: number(),
            }),
            high: object({
              url: string(),
              width: number(),
              height: number(),
            }),
            standard: object({
              url: string(),
              width: number(),
              height: number(),
            }),
            maxres: object({
              url: string(),
              width: number(),
              height: number(),
            }),
          }),
          channelTitle: string(),
          tags: array(string()),
          categoryId: string(),
          liveBroadcastContent: string(),
          localized: object({
            title: string(),
            description: string(),
          }),
          defaultAudioLanguage: string(),
        }),
        contentDetails: object({
          duration: string(),
          dimension: string(),
          definition: string(),
          caption: string(),
          licensedContent: boolean(),
          projection: string(),
        }),
        statistics: object({
          viewCount: string(),
          likeCount: string(),
          favoriteCount: string(),
          commentCount: string(),
        }),
      })
    ),
    pageInfo: object({
      totalResults: number(),
      resultsPerPage: number(),
    }),
  });
export const FollowerSchema = object({
     data:string(),
});

export type IFollower = _infer<typeof FollowerSchema>;
export type ISearchResults = _infer<typeof SearchResultsSchema>;
export type IVideoDetails = _infer<typeof VideoDetailsSchema>;



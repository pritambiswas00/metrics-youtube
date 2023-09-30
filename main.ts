import { createObjectCsvWriter } from "csv-writer";
import { Context, Effect, Ref, pipe } from "effect";
import { FollowerSchema, IFollower, ISearchResults, SearchResultsSchema, VideoDetailsSchema } from "./Schema";


const GOOGLE_AUTH_TOKEN = `Bearer `;

//Error Classes//

class JSONParseError {
    readonly _tag = "JSONParseError"
    readonly count: number;
    constructor(private counts: number) {
        this.count = counts;
    }

}

class FetchError {
    readonly _tag = "FetchError"
}

class CSVMakerError {
    readonly _tag = "CSVMakerError"
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//State Interface//
type User = {
    Total30DayViews: number;
    ViewsMinusShorts: number;
    Followers: string;
    Name: string;
    FullName: string;
    GeoLocation: string;
}

interface GenerateCSVState extends Ref.Ref<User[]> { };
const GenerateCSVState = Context.Tag<GenerateCSVState>(); //Context//

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Utility Functions///

//Shorts Video Checker//
function isDurationLessThan60Seconds(duration: string): boolean {
    const hoursMatch = duration.match(/(\d+)H/i);
    const minutesMatch = duration.match(/(\d+)M/i);
    const secondsMatch = duration.match(/(\d+)S/i);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (hoursMatch) hours = parseInt(hoursMatch[1], 10);
    if (minutesMatch) minutes = parseInt(minutesMatch[1], 10);
    if (secondsMatch) seconds = parseInt(secondsMatch[1], 10);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds < 60;
}

//Video Details Fetcher//
const get_video_details = (id: string) => pipe(
    Effect.tryPromise({
        try: () => fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`, {
            method: "GET",
            headers: {
                Authorization: GOOGLE_AUTH_TOKEN
            }
        }),
        catch: () => new Error("Fetcher Error")
    }).pipe(
        Effect.flatMap((x) =>
            Effect.tryPromise({
                try: () => x.json(),
                catch: () => new JSONParseError(2)
            }).pipe(
                Effect.flatMap((x) =>
                    Effect.try({
                        try: () => VideoDetailsSchema.parse({
                            "kind": "youtube#videoListResponse",
                            "etag": "cga4p7FcoraTk7BfKHjAZRzb0EI",
                            "items": [
                                {
                                    "kind": "youtube#video",
                                    "etag": "sPQgYGLt7CEF0EstpnHjNZESsyw",
                                    "id": "C90O1sCTpG0",
                                    "snippet": {
                                        "publishedAt": "2023-09-09T01:30:03Z",
                                        "channelId": "UCI78AdiI6f7VKhqW1i4B3Rw",
                                        "title": "would you eat this? #shorts",
                                        "description": "#liquidivpartner #shorts #mukbang #asmr #eating #asmreating  \n\nInstagram @zachchoi  \nTikTok @thezachchoi\nFacebook: Zach Choi ASMR",
                                        "thumbnails": {
                                            "default": {
                                                "url": "https://i.ytimg.com/vi/C90O1sCTpG0/default.jpg",
                                                "width": 120,
                                                "height": 90
                                            },
                                            "medium": {
                                                "url": "https://i.ytimg.com/vi/C90O1sCTpG0/mqdefault.jpg",
                                                "width": 320,
                                                "height": 180
                                            },
                                            "high": {
                                                "url": "https://i.ytimg.com/vi/C90O1sCTpG0/hqdefault.jpg",
                                                "width": 480,
                                                "height": 360
                                            },
                                            "standard": {
                                                "url": "https://i.ytimg.com/vi/C90O1sCTpG0/sddefault.jpg",
                                                "width": 640,
                                                "height": 480
                                            },
                                            "maxres": {
                                                "url": "https://i.ytimg.com/vi/C90O1sCTpG0/maxresdefault.jpg",
                                                "width": 1280,
                                                "height": 720
                                            }
                                        },
                                        "channelTitle": "Zach Choi ASMR",
                                        "tags": [
                                            "asmr",
                                            " zach choi",
                                            "zachchoi",
                                            "zach choi asmr",
                                            "mukbang",
                                            "먹방",
                                            " 쇼",
                                            " 이팅",
                                            " 사운드",
                                            " korean asmr",
                                            "asmr eating",
                                            "asmr eating no talking",
                                            "asmr mukbang",
                                            "asmr mukbang no talking",
                                            "brie burger"
                                        ],
                                        "categoryId": "22",
                                        "liveBroadcastContent": "none",
                                        "localized": {
                                            "title": "would you eat this? #shorts",
                                            "description": "#liquidivpartner #shorts #mukbang #asmr #eating #asmreating  \n\nInstagram @zachchoi  \nTikTok @thezachchoi\nFacebook: Zach Choi ASMR"
                                        },
                                        "defaultAudioLanguage": "en"
                                    },
                                    "contentDetails": {
                                        "duration": "PT28S",
                                        "dimension": "2d",
                                        "definition": "hd",
                                        "caption": "false",
                                        "licensedContent": true,
                                        "contentRating": {},
                                        "projection": "rectangular"
                                    },
                                    "statistics": {
                                        "viewCount": "3067129",
                                        "likeCount": "238799",
                                        "favoriteCount": "0",
                                        "commentCount": "903"
                                    }
                                }
                            ],
                            "pageInfo": {
                                "totalResults": 1,
                                "resultsPerPage": 1
                            }
                        }),
                        catch: () => new JSONParseError(13)
                    }))
            )
        )
    )
)

//CSV Rows Maker//
const generate_csv_rows = (videoDetails: ISearchResults, followerDetails: IFollower) => {
    const videoResults = Effect.all(videoDetails.items.map((x) => get_video_details(x.id.videoId)), { concurrency: 2 })
    return videoResults.pipe(
        Effect.map((responses) => {
            let totalViews = 0;
            let totalShortsViews = 0;
            responses.forEach((response, _) => {
                totalViews += +response.items[0].statistics.viewCount;
                if (isDurationLessThan60Seconds(response.items[0].contentDetails.duration)) {
                    totalShortsViews += +response.items[0].statistics.viewCount;
                }
            });
            return Effect.succeed({ Total30DayViews: totalViews, ViewsMinusShorts: totalViews - totalShortsViews, Followers: followerDetails.data, Name: "", FullName: "", GeoLocation: "" });
        })
    )
}

//CSV Object//

const csv_writer_obj=(path:string)=>createObjectCsvWriter({
    path: path,
    header: [
        { id: 'Name', title: 'Name' },
        { id: 'FullName', title: 'Full name' },
        { id: 'Total30DayViews', title: 'Total 30 Day Views' },
        { id: 'ViewsMinusShorts', title: '30 Day Views minus Shorts (<60s videos)' },
        { id: 'Followers', title: 'Followers' },
        { id: 'GeoLocation', title: 'GeoLocation' },
    ],
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Start Program//

const csv_writer = csv_writer_obj("Test.csv");

const program = (id: string) => pipe(
    Effect.succeed(id),
    Effect.flatMap((x) =>
        Effect.all([
            Effect.tryPromise({
                try: () => fetch(`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${x}&maxResults=50&publishedAfter=2023-09-01T00:00:00Z&publishedBefore=2023-09-30T00:00:00Z&type=video`, {
                    method: "GET",
                    headers: {
                        Authorization: GOOGLE_AUTH_TOKEN
                    }
                }),
                catch: () => new FetchError()
            }).pipe(
                Effect.flatMap((x) =>
                    Effect.tryPromise({
                        try: () => x.json(),
                        catch: () => new JSONParseError(1)
                    })
                )).pipe(
                    Effect.flatMap((x) =>
                        Effect.try({
                            try: () => SearchResultsSchema.parse({
                                "kind": "youtube#searchListResponse",
                                "etag": "qGK3_YbD2gUW6Uwz5lTTSzrhQ8k",
                                "regionCode": "IN",
                                "pageInfo": {
                                    "totalResults": 7,
                                    "resultsPerPage": 7
                                },
                                "items": [
                                    {
                                        "kind": "youtube#searchResult",
                                        "etag": "SH-UiYC4UK-kdQYuFiBJh4NfD9s",
                                        "id": {
                                            "kind": "youtube#video",
                                            "videoId": "CcC82I4pVA0"
                                        }
                                    },
                                    {
                                        "kind": "youtube#searchResult",
                                        "etag": "2qZtHRB9pHe6MeUHzME1UcwX83o",
                                        "id": {
                                            "kind": "youtube#video",
                                            "videoId": "R-r27XEdpO4"
                                        }
                                    },
                                    {
                                        "kind": "youtube#searchResult",
                                        "etag": "esHqa0Y0gXYrRV_ZwcWAFJ3j6p4",
                                        "id": {
                                            "kind": "youtube#video",
                                            "videoId": "RPtBEufVU_4"
                                        }
                                    },
                                    {
                                        "kind": "youtube#searchResult",
                                        "etag": "ewB4v7lrGnSA2K6Ko4UResOIBSU",
                                        "id": {
                                            "kind": "youtube#video",
                                            "videoId": "TEWhkPJvWh8"
                                        }
                                    },
                                    {
                                        "kind": "youtube#searchResult",
                                        "etag": "mTQieY32up5iXyfZiVbIaRZ53cs",
                                        "id": {
                                            "kind": "youtube#video",
                                            "videoId": "boot77KSNxA"
                                        }
                                    },
                                    {
                                        "kind": "youtube#searchResult",
                                        "etag": "bceQV3kKcPR6uplmzbpInTdYjCU",
                                        "id": {
                                            "kind": "youtube#video",
                                            "videoId": "Zjw5mMGhYxE"
                                        }
                                    },
                                    {
                                        "kind": "youtube#searchResult",
                                        "etag": "rqNbk2u2b8Iu5okH2YjodUGboVA",
                                        "id": {
                                            "kind": "youtube#video",
                                            "videoId": "k3rlRsZTiZw"
                                        }
                                    }
                                ]
                            }),
                            catch: (error) => new JSONParseError(11)
                        }))),
            Effect.tryPromise({
                try: () => fetch(`https://www.ensembledata.com/apis/youtube/channel/followers?browseId=${x}&token=A5b99aRPp7KaY2B7`),
                catch: () => new FetchError()
            }).pipe(
                Effect.flatMap((x) =>
                    Effect.tryPromise({
                        try: () => x.json(),
                        catch: () => new JSONParseError(3)
                    }),
                )
            )
                .pipe(
                    Effect.flatMap((x) =>
                        Effect.try({
                            try: () => FollowerSchema.parse({ data: "2.2m" }),
                            catch: () => new JSONParseError(13)
                        })
                    )
                )
        ])
    )
).pipe(
    Effect.flatMap((x) => generate_csv_rows(x[0], x[1])),
    Effect.flatMap((x) => x.pipe(
        Effect.flatMap((res) =>
            GenerateCSVState.pipe(
                Effect.flatMap((state) => Ref.update(state, (c) => [...c, res]))
            )
        )
    ))
);

const ids: string[] = [
    "UCI78AdiI6f7VKhqW1i4B3Rw",
    // "UCI78AdiI6f7VKhqW1i4B3Rw",
    // "UCI78AdiI6f7VKhqW1i4B3Rw",
    // "UCI78AdiI6f7VKhqW1i4B3Rw",
    // "UChCBHudFoBnsF0O1flPXqiQ",
    // "UCI78AdiI6f7VKhqW1i4B3Rw",
    // "UCUw4K8hh4No3ks8wxfqj-uQ",
    // "UCTJLP240qyOLchOPWV27row",
    // "UCJswRv22oiUgmT1FuFeUekw",
    // "UC7wvDM9avjylOCiZ7--b60Q",
    // "UCG9IkxZWMiufFkXT2IE34Qw",
    // "UC78mJyZPMa_OG08KLHjhODw",
    // "UCb0Vz-YNWQEVctt7-U_Yj_A",
    // "UCKliXHOqQFkFK5FbWh8sEIw",
    // "UCP0_k4INXrwPS6HhIyYqsTg",
    // "UCKKf2Tvw0Xqz6RfzTI2dTpQ",
    // "UChUZYCkg0wKnfQz9-xNvtaQ",
    // "UCsDUx3IrrXQI0CbfKMxTCww",
    // "UCJv5T2W-D3K3fYO0prgv5uw",
    // "UCVUBigRuM7Q8gZK5TMVt0Pg",
    // "UCCOo3F56SHHeYRSM97SVpog",
    // "UCJVkkxqSzMZDcLFhULXAIIQ",
    // "UCoWliOvugpnkRXzjHXWiO3w",
    // "UC-SgrUhzMPuSHZMu_EUX1Yw",
];

const runProgram = pipe(
    Effect.succeed(ids),
    Effect.flatMap((x) => Effect.all(x.map(program), { concurrency: 1 }))
).pipe(
    Effect.flatMap((_) =>
        GenerateCSVState.pipe(
            Effect.flatMap((state) => Ref.get(state)),
            Effect.flatMap((x) =>
                Effect.tryPromise({
                    try: () => csv_writer.writeRecords(x),
                    catch: () => new CSVMakerError()
                })
            )
        )
    )
).pipe(
    Effect.catchTag("CSVMakerError", (e) => Effect.log("Error in Generating CSV" + e._tag)),
);

Effect.runPromise(Effect.provideServiceEffect(runProgram, GenerateCSVState, Ref.make([])));



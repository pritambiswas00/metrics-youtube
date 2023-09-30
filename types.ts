import * as Schema from "@effect/schema/Schema";

const DataSchema = Schema.struct({
    data:Schema.string
});

export const DataSchemaParse = Schema.parse(DataSchema);

const VideoDetailsSchema = Schema.struct({
  data: Schema.struct({
    user: Schema.struct({
      urlCanonical: Schema.string,
      title: Schema.string,
      description: Schema.string,
      thumbnail: Schema.struct({
        thumbnails: Schema.array(Schema.struct({
          url: Schema.string,
          width: Schema.number,
          height: Schema.number
        }))
      }),
      siteName: Schema.string,
      appName: Schema.string,
      androidPackage: Schema.string,
      iosAppStoreId: Schema.string,
      iosAppArguments: Schema.string,
      ogType: Schema.string,
      urlApplinksWeb: Schema.string,
      urlApplinksIos: Schema.string,
      urlApplinksAndroid: Schema.string,
      urlTwitterIos: Schema.string,
      urlTwitterAndroid: Schema.string,
      twitterCardType: Schema.string,
      twitterSiteHandle: Schema.string,
      schemaDotOrgType: Schema.string,
      noindex: Schema.boolean,
      unlisted: Schema.boolean,
      familySafe: Schema.boolean,
      tags: Schema.array(Schema.string),
      availableCountries: Schema.array(Schema.string),
      linkAlternates: Schema.array(Schema.struct({
        hrefUrl: Schema.string
      }))
    }),
    videos: Schema.array(Schema.struct({
      richItemRenderer: Schema.struct({
        content: Schema.struct({
          videoRenderer: Schema.struct({
            videoId: Schema.string,
            thumbnail: Schema.struct({
              thumbnails: Schema.array(Schema.struct({
                url: Schema.string,
                width: Schema.number,
                height: Schema.number
              }))
            }),
            title: Schema.struct({
              runs: Schema.array(Schema.struct({
                text: Schema.string,
              })),
              accessibility: Schema.struct({
                accessibilityData: Schema.struct({
                  label: Schema.string
                })
              })
            }),
            descriptionSnippet: Schema.struct({
              runs: Schema.array(Schema.struct({
                text: Schema.string,
              }))
            }),
            publishedTimeText: Schema.struct({
              simpleText: Schema.string
            }),
            lengthText: Schema.struct({
              accessibility: Schema.struct({
                accessibilityData: Schema.struct({
                  label: Schema.string
                })
              }),
              simpleText: Schema.string
            }),
            viewCountText: Schema.struct({
              simpleText: Schema.string
            }),
            navigationEndpoint: Schema.struct({
              clickTrackingParams: Schema.string,
              commandMetadata: Schema.struct({
                webCommandMetadata: Schema.struct({
                  url: Schema.string,
                  webPageType: Schema.string,
                  rootVe: Schema.number
                })
              }),
              watchEndpoint: Schema.struct({
                videoId: Schema.string,
                watchEndpointSupportedOnesieConfig: Schema.struct({
                  html5PlaybackOnesieConfig: Schema.struct({
                    commonConfig: Schema.struct({
                      url: Schema.string
                    })
                  })
                })
              })
            }),
            trackingParams: Schema.string,
            showActionMenu: Schema.boolean,
            shortViewCountText: Schema.struct({
              accessibility: Schema.struct({
                accessibilityData: Schema.struct({
                  label: Schema.string
                })
              }),
              simpleText: Schema.string
            }),
            menu: Schema.struct({
              menuRenderer: Schema.struct({
                items: Schema.array(Schema.struct({
                  menuServiceItemRenderer: Schema.struct({
                    text: Schema.struct({
                      runs: Schema.array(Schema.struct({
                        text: Schema.string
                      }))
                    }),
                    icon: Schema.struct({
                      iconType: Schema.string,
                    }),
                    serviceEndpoint: Schema.struct({
                      clickTrackingParams: Schema.string,
                      commandMetadata: Schema.struct({
                        webCommandMetadata: Schema.struct({
                          url: Schema.string,
                          webPageType: Schema.string,
                          rootVe: Schema.number
                        })
                      }),
                      signalServiceEndpoint: Schema.struct({
                        signal: Schema.string,
                        actions: Schema.array(Schema.struct({
                          clickTrackingParams: Schema.string,
                          addToPlaylistCommand: Schema.struct({
                            openMiniplayer: Schema.boolean,
                            videoId: Schema.string,
                            listType: Schema.string,
                            onCreateListCommand: Schema.struct({
                              clickTrackingParams: Schema.string,
                              commandMetadata: Schema.struct({
                                webCommandMetadata: Schema.struct({
                                  url: Schema.string,
                                  webPageType: Schema.string,
                                  rootVe: Schema.number
                                })
                              }),
                              createPlaylistServiceEndpoint: Schema.struct({
                                videoIds: Schema.array(Schema.string),
                                params: Schema.string
                              })
                            }),
                            videoIds: Schema.array(Schema.string),
                          })
                        }))
                      }),
                      shareEntityServiceEndpoint: Schema.struct({
                        signal: Schema.string,
                        actions: Schema.array(Schema.struct({
                          clickTrackingParams: Schema.string,
                          addToPlaylistCommand: Schema.struct({
                            openMiniplayer: Schema.boolean,
                            videoId: Schema.string,
                            listType: Schema.string,
                            onCreateListCommand: Schema.struct({
                              clickTrackingParams: Schema.string,
                              commandMetadata: Schema.struct({
                                webCommandMetadata: Schema.struct({
                                  url: Schema.string,
                                  webPageType: Schema.string,
                                  rootVe: Schema.number
                                })
                              }),
                              createPlaylistServiceEndpoint: Schema.struct({
                                videoIds: Schema.array(Schema.string),
                                params: Schema.string
                              })
                            }),
                            videoIds: Schema.array(Schema.string),
                          })
                        })),
                      })
                    }),
                    trackingParams: Schema.string
                  })
                })),
                trackingParams: Schema.string,
                accessibility: Schema.struct({
                  accessibilityData: Schema.struct({
                    label: Schema.string
                  })
                })
              }),
              thumbnailOverlays: Schema.array(Schema.struct({
                thumbnailOverlayTimeStatusRenderer: Schema.struct({
                  text: Schema.struct({
                    runs: Schema.array(Schema.struct({
                      text: Schema.string
                    }))
                  }),
                  style: Schema.string
                }),
                thumbnailOverlayToggleButtonRenderer: Schema.struct({
                  untoggledIcon: Schema.struct({
                    iconType: Schema.string
                  }),
                  toggledIcon: Schema.struct({
                    iconType: Schema.string
                  }),
                  untoggledTooltip: Schema.string,
                  toggledTooltip: Schema.string,
                  untoggledServiceEndpoint: Schema.struct({
                    clickTrackingParams: Schema.string,
                    commandMetadata: Schema.struct({
                      webCommandMetadata: Schema.struct({
                        url: Schema.string,
                        webPageType: Schema.string,
                        rootVe: Schema.number
                      })
                    }),
                    signalServiceEndpoint: Schema.struct({
                      signal: Schema.string,
                      actions: Schema.array(Schema.struct({
                        clickTrackingParams: Schema.string,
                        addToPlaylistCommand: Schema.struct({
                          openMiniplayer: Schema.boolean,
                          videoId: Schema.string,
                          listType: Schema.string,
                          onCreateListCommand: Schema.struct({
                            clickTrackingParams: Schema.string,
                            commandMetadata: Schema.struct({
                              webCommandMetadata: Schema.struct({
                                url: Schema.string,
                                webPageType: Schema.string,
                                rootVe: Schema.number
                              })
                            }),
                            createPlaylistServiceEndpoint: Schema.struct({
                              videoIds: Schema.array(Schema.string),
                              params: Schema.string
                            })
                          }),
                          videoIds: Schema.array(Schema.string),
                        })
                      }))
                    }),
                    playlistEditEndpoint: Schema.struct({
                      playlistId: Schema.string,
                      actions: Schema.array(Schema.struct({
                        addedVideoId: Schema.string,
                        action: Schema.string
                      }))
                    })
                  }),
                  untoggledAccessibility: Schema.struct({
                    accessibilityData: Schema.struct({
                      label: Schema.string
                    })
                  }),
                  toggledAccessibility: Schema.struct({
                    accessibilityData: Schema.struct({
                      label: Schema.string
                    })
                  }),
                  trackingParams: Schema.string,
                  isToggled: Schema.boolean,
                  toggledServiceEndpoint: Schema.struct({
                    clickTrackingParams: Schema.string,
                    commandMetadata: Schema.struct({
                      webCommandMetadata: Schema.struct({
                        sendPost: Schema.boolean,
                        apiUrl: Schema.string
                      })
                    }),
                    playlistEditEndpoint: Schema.struct({
                      playlistId: Schema.string,
                      actions: Schema.array(Schema.struct({
                        action: Schema.string,
                        removedVideoId: Schema.string
                      }))
                    })
                  })
                }),
                thumbnailOverlayNowPlayingRenderer: Schema.struct({
                  text: Schema.struct({
                    runs: Schema.array(Schema.string)
                  })
                })
              })),
              richThumbnail: Schema.struct({
                movingThumbnailRenderer: Schema.struct({
                  movingThumbnailDetails: Schema.struct({
                    thumbnails: Schema.array(Schema.struct({
                      url: Schema.string,
                      width: Schema.number,
                      height: Schema.number
                    })),
                    logAsMovingThumbnail: Schema.boolean
                  }),
                  enableHoveredLogging: Schema.boolean,
                  enableOverlay: Schema.boolean
                })
              })
            })
          }),
          trackingParams: Schema.string,
        })
      })
    }))
  })
})

export const VideoDetails = Schema.parse(VideoDetailsSchema);

export interface Root {
  data: Data
}

export interface Data {
  user: User
  videos: Video[]
}

export interface User {
  urlCanonical: string
  title: string
  description: string
  thumbnail: Thumbnail
  siteName: string
  appName: string
  androidPackage: string
  iosAppStoreId: string
  iosAppArguments: string
  ogType: string
  urlApplinksWeb: string
  urlApplinksIos: string
  urlApplinksAndroid: string
  urlTwitterIos: string
  urlTwitterAndroid: string
  twitterCardType: string
  twitterSiteHandle: string
  schemaDotOrgType: string
  noindex: boolean
  unlisted: boolean
  familySafe: boolean
  tags: string[]
  availableCountries: string[]
  linkAlternates: LinkAlternate[]
}

export interface Thumbnail {
  thumbnails: Thumbnail2[]
}

export interface Thumbnail2 {
  url: string
  width: number
  height: number
}

export interface LinkAlternate {
  hrefUrl: string
}

export interface Video {
  richItemRenderer: RichItemRenderer
}

export interface RichItemRenderer {
  content: Content
  trackingParams: string
}

export interface Content {
  videoRenderer: VideoRenderer
}

export interface VideoRenderer {
  videoId: string
  thumbnail: Thumbnail3
  title: Title
  descriptionSnippet?: DescriptionSnippet
  publishedTimeText: PublishedTimeText
  lengthText: LengthText
  viewCountText: ViewCountText
  navigationEndpoint: NavigationEndpoint
  trackingParams: string
  showActionMenu: boolean
  shortViewCountText: ShortViewCountText
  menu: Menu
  thumbnailOverlays: ThumbnailOverlay[]
  richThumbnail?: RichThumbnail
}

export interface Thumbnail3 {
  thumbnails: Thumbnail4[]
}

export interface Thumbnail4 {
  url: string
  width: number
  height: number
}

export interface Title {
  runs: Run[]
  accessibility: Accessibility
}

export interface Run {
  text: string
}

export interface Accessibility {
  accessibilityData: AccessibilityData
}

export interface AccessibilityData {
  label: string
}

export interface DescriptionSnippet {
  runs: Run2[]
}

export interface Run2 {
  text: string
}

export interface PublishedTimeText {
  simpleText: string
}

export interface LengthText {
  accessibility: Accessibility2
  simpleText: string
}

export interface Accessibility2 {
  accessibilityData: AccessibilityData2
}

export interface AccessibilityData2 {
  label: string
}

export interface ViewCountText {
  simpleText: string
}

export interface NavigationEndpoint {
  clickTrackingParams: string
  commandMetadata: CommandMetadata
  watchEndpoint: WatchEndpoint
}

export interface CommandMetadata {
  webCommandMetadata: WebCommandMetadata
}

export interface WebCommandMetadata {
  url: string
  webPageType: string
  rootVe: number
}

export interface WatchEndpoint {
  videoId: string
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig
}

export interface WatchEndpointSupportedOnesieConfig {
  html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig
}

export interface Html5PlaybackOnesieConfig {
  commonConfig: CommonConfig
}

export interface CommonConfig {
  url: string
}

export interface ShortViewCountText {
  accessibility: Accessibility3
  simpleText: string
}

export interface Accessibility3 {
  accessibilityData: AccessibilityData3
}

export interface AccessibilityData3 {
  label: string
}

export interface Menu {
  menuRenderer: MenuRenderer
}

export interface MenuRenderer {
  items: Item[]
  trackingParams: string
  accessibility: Accessibility4
}

export interface Item {
  menuServiceItemRenderer: MenuServiceItemRenderer
}

export interface MenuServiceItemRenderer {
  text: Text
  icon: Icon
  serviceEndpoint: ServiceEndpoint
  trackingParams: string
}

export interface Text {
  runs: Run3[]
}

export interface Run3 {
  text: string
}

export interface Icon {
  iconType: string
}

export interface ServiceEndpoint {
  clickTrackingParams: string
  commandMetadata: CommandMetadata2
  signalServiceEndpoint?: SignalServiceEndpoint
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint
}

export interface CommandMetadata2 {
  webCommandMetadata: WebCommandMetadata2
}

export interface WebCommandMetadata2 {
  sendPost: boolean
  apiUrl?: string
}

export interface SignalServiceEndpoint {
  signal: string
  actions: Action[]
}

export interface Action {
  clickTrackingParams: string
  addToPlaylistCommand: AddToPlaylistCommand
}

export interface AddToPlaylistCommand {
  openMiniplayer: boolean
  videoId: string
  listType: string
  onCreateListCommand: OnCreateListCommand
  videoIds: string[]
}

export interface OnCreateListCommand {
  clickTrackingParams: string
  commandMetadata: CommandMetadata3
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint
}

export interface CommandMetadata3 {
  webCommandMetadata: WebCommandMetadata3
}

export interface WebCommandMetadata3 {
  sendPost: boolean
  apiUrl: string
}

export interface CreatePlaylistServiceEndpoint {
  videoIds: string[]
  params: string
}

export interface ShareEntityServiceEndpoint {
  serializedShareEntity: string
  commands: Command[]
}

export interface Command {
  clickTrackingParams: string
  openPopupAction: OpenPopupAction
}

export interface OpenPopupAction {
  popup: Popup
  popupType: string
  beReused: boolean
}

export interface Popup {
  unifiedSharePanelRenderer: UnifiedSharePanelRenderer
}

export interface UnifiedSharePanelRenderer {
  trackingParams: string
  showLoadingSpinner: boolean
}

export interface Accessibility4 {
  accessibilityData: AccessibilityData4
}

export interface AccessibilityData4 {
  label: string
}

export interface ThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer
  thumbnailOverlayToggleButtonRenderer?: ThumbnailOverlayToggleButtonRenderer
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer
}

export interface ThumbnailOverlayTimeStatusRenderer {
  text: Text2
  style: string
}

export interface Text2 {
  accessibility: Accessibility5
  simpleText: string
}

export interface Accessibility5 {
  accessibilityData: AccessibilityData5
}

export interface AccessibilityData5 {
  label: string
}

export interface ThumbnailOverlayToggleButtonRenderer {
  untoggledIcon: UntoggledIcon
  toggledIcon: ToggledIcon
  untoggledTooltip: string
  toggledTooltip: string
  untoggledServiceEndpoint: UntoggledServiceEndpoint
  untoggledAccessibility: UntoggledAccessibility
  toggledAccessibility: ToggledAccessibility
  trackingParams: string
  isToggled?: boolean
  toggledServiceEndpoint?: ToggledServiceEndpoint
}

export interface UntoggledIcon {
  iconType: string
}

export interface ToggledIcon {
  iconType: string
}

export interface UntoggledServiceEndpoint {
  clickTrackingParams: string
  commandMetadata: CommandMetadata4
  signalServiceEndpoint?: SignalServiceEndpoint2
  playlistEditEndpoint?: PlaylistEditEndpoint
}

export interface CommandMetadata4 {
  webCommandMetadata: WebCommandMetadata4
}

export interface WebCommandMetadata4 {
  sendPost: boolean
  apiUrl?: string
}

export interface SignalServiceEndpoint2 {
  signal: string
  actions: Action2[]
}

export interface Action2 {
  clickTrackingParams: string
  addToPlaylistCommand: AddToPlaylistCommand2
}

export interface AddToPlaylistCommand2 {
  openMiniplayer: boolean
  videoId: string
  listType: string
  onCreateListCommand: OnCreateListCommand2
  videoIds: string[]
}

export interface OnCreateListCommand2 {
  clickTrackingParams: string
  commandMetadata: CommandMetadata5
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint2
}

export interface CommandMetadata5 {
  webCommandMetadata: WebCommandMetadata5
}

export interface WebCommandMetadata5 {
  sendPost: boolean
  apiUrl: string
}

export interface CreatePlaylistServiceEndpoint2 {
  videoIds: string[]
  params: string
}

export interface PlaylistEditEndpoint {
  playlistId: string
  actions: Action3[]
}

export interface Action3 {
  addedVideoId: string
  action: string
}

export interface UntoggledAccessibility {
  accessibilityData: AccessibilityData6
}

export interface AccessibilityData6 {
  label: string
}

export interface ToggledAccessibility {
  accessibilityData: AccessibilityData7
}

export interface AccessibilityData7 {
  label: string
}

export interface ToggledServiceEndpoint {
  clickTrackingParams: string
  commandMetadata: CommandMetadata6
  playlistEditEndpoint: PlaylistEditEndpoint2
}

export interface CommandMetadata6 {
  webCommandMetadata: WebCommandMetadata6
}

export interface WebCommandMetadata6 {
  sendPost: boolean
  apiUrl: string
}

export interface PlaylistEditEndpoint2 {
  playlistId: string
  actions: Action4[]
}

export interface Action4 {
  action: string
  removedVideoId: string
}

export interface ThumbnailOverlayNowPlayingRenderer {
  text: Text3
}

export interface Text3 {
  runs: Run4[]
}

export interface Run4 {
  text: string
}

export interface RichThumbnail {
  movingThumbnailRenderer: MovingThumbnailRenderer
}

export interface MovingThumbnailRenderer {
  movingThumbnailDetails: MovingThumbnailDetails
  enableHoveredLogging: boolean
  enableOverlay: boolean
}

export interface MovingThumbnailDetails {
  thumbnails: Thumbnail5[]
  logAsMovingThumbnail: boolean
}

export interface Thumbnail5 {
  url: string
  width: number
  height: number
}
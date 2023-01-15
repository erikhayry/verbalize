import { ExternalUrlObject } from 'spotify-api'

const MOCK_EXTERNAL_URL: SpotifyApi.ExternalUrlObject = {
    spotify: '',
}

const MOCK_EXTERNAL_IDS: SpotifyApi.ExternalIdObject = {}

const MOCK_IMAGE: SpotifyApi.ImageObject = {
    url: 'url',
    width: 100,
    height: 100,
}

const MOCK_ALBUM: SpotifyApi.AlbumObjectSimplified = {
    album_type: 'album',
    artists: [],
    id: '',
    images: [MOCK_IMAGE],
    name: '',
    release_date: '',
    release_date_precision: 'year',
    type: 'album',
    total_tracks: 0,
    href: '',
    external_urls: MOCK_EXTERNAL_URL,
    uri: '',
}

const MOCK_ARTIST_URL: ExternalUrlObject = {
    spotify: 'artist.url',
}

const MOCK_ARTIST_BASE: SpotifyApi.ArtistObjectSimplified = {
    name: 'artist',
    id: '',
    type: 'artist',
    href: '',
    external_urls: MOCK_ARTIST_URL,
    uri: '',
}

const MOCK_TRACK_BASE: SpotifyApi.TrackObjectFull = {
    album: MOCK_ALBUM,
    external_ids: MOCK_EXTERNAL_IDS,
    popularity: 0,
    artists: [],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    external_urls: MOCK_EXTERNAL_URL,
    href: '',
    id: '',
    name: '',
    preview_url: null,
    track_number: 0,
    type: 'track',
    uri: '',
}

export const MOCK_TRACK_NAME_1 = 'MockTrackName1'
export const MOCK_TRACK_1: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_1,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 1',
        },
    ],
}

export const MOCK_TRACK_NAME_2 = 'MockTrackName2'
export const MOCK_TRACK_2: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_2,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 2',
        },
    ],
}

export const MOCK_TRACK_NAME_3 = 'MockTrackName3'
export const MOCK_TRACK_3: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_3,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 3',
        },
    ],
}

export const MOCK_TRACK_NAME_4 = 'MockTrackName4'
export const MOCK_TRACK_4: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_4,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 4',
        },
    ],
}

export const MOCK_TRACK_NAME_5 = 'MockTrackName5'
export const MOCK_TRACK_5: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_5,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 5',
        },
    ],
}

export const MOCK_TRACK_NAME_6 = 'MockTrackName6'
export const MOCK_TRACK_6: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_6,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 6',
        },
    ],
}

export const MOCK_TRACK_NAME_7 = 'MockTrackName7'
export const MOCK_TRACK_7: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_7,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 7',
        },
    ],
}

export const MOCK_TRACK_NAME_8 = 'MockTrackName8'
export const MOCK_TRACK_8: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_8,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 8',
        },
    ],
}

export const MOCK_TRACK_NAME_9 = 'MockTrackName9'
export const MOCK_TRACK_9: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_9,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 9',
        },
    ],
}

export const MOCK_TRACK_NAME_10 = 'MockTrackName10'
export const MOCK_TRACK_10: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_10,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 10',
        },
    ],
}

export const MOCK_TRACK_NAME_11 = 'MockTrackName11'
export const MOCK_TRACK_11: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_11,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 11',
        },
    ],
}

export const MOCK_TRACK_NAME_12 = 'MockTrackName12'
export const MOCK_TRACK_12: SpotifyApi.TrackObjectFull = {
    ...MOCK_TRACK_BASE,
    name: MOCK_TRACK_NAME_12,
    artists: [
        {
            ...MOCK_ARTIST_BASE,
            name: 'artist 12',
        },
    ],
}

const MOCK_PAGING_OBJECT_BASE: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> =
    {
        items: [],
        total: 12,
        offset: 0,
        limit: 3,
        href: '',
        next: null,
        previous: null,
    }

export const MOCK_PAGING_OBJECT_1: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> =
    {
        ...MOCK_PAGING_OBJECT_BASE,
        items: [MOCK_TRACK_1, MOCK_TRACK_2, MOCK_TRACK_3],
        offset: 0,
    }

export const MOCK_TRACK_SEARCH_RESPONSE_1: SpotifyApi.TrackSearchResponse = {
    tracks: MOCK_PAGING_OBJECT_1,
}

export const MOCK_PAGING_OBJECT_2: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> =
    {
        ...MOCK_PAGING_OBJECT_BASE,
        items: [MOCK_TRACK_4, MOCK_TRACK_5, MOCK_TRACK_6],
        offset: 50,
    }

export const MOCK_TRACK_SEARCH_RESPONSE_2: SpotifyApi.TrackSearchResponse = {
    tracks: MOCK_PAGING_OBJECT_2,
}

export const MOCK_PAGING_OBJECT_3: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> =
    {
        ...MOCK_PAGING_OBJECT_BASE,
        items: [MOCK_TRACK_7, MOCK_TRACK_8, MOCK_TRACK_9],
        offset: 100,
    }

export const MOCK_TRACK_SEARCH_RESPONSE_3: SpotifyApi.TrackSearchResponse = {
    tracks: MOCK_PAGING_OBJECT_3,
}

export const MOCK_PAGING_OBJECT_4: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> =
    {
        ...MOCK_PAGING_OBJECT_BASE,
        items: [MOCK_TRACK_10, MOCK_TRACK_11, MOCK_TRACK_12],
        offset: 150,
    }

export const MOCK_TRACK_SEARCH_RESPONSE_4: SpotifyApi.TrackSearchResponse = {
    tracks: MOCK_PAGING_OBJECT_4,
}

export const MOCK_PAGING_OBJECT_5: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> =
    {
        ...MOCK_PAGING_OBJECT_BASE,
        items: [],
        offset: 200,
    }

export const MOCK_TRACK_SEARCH_RESPONSE_5: SpotifyApi.TrackSearchResponse = {
    tracks: MOCK_PAGING_OBJECT_5,
}

export function MOCK_FETCH_RESPONSE_1(): Promise<string> {
    return Promise.resolve(JSON.stringify(MOCK_TRACK_SEARCH_RESPONSE_1))
}

export function MOCK_FETCH_RESPONSE_1_WITH_DELAY(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.stringify(MOCK_TRACK_SEARCH_RESPONSE_1))
        }, 5)
    })
}

export function MOCK_FETCH_RESPONSE_2(): Promise<string> {
    return Promise.resolve(JSON.stringify(MOCK_TRACK_SEARCH_RESPONSE_2))
}

export function MOCK_FETCH_RESPONSE_3(): Promise<string> {
    return Promise.resolve(JSON.stringify(MOCK_TRACK_SEARCH_RESPONSE_3))
}

export function MOCK_FETCH_RESPONSE_4(): Promise<string> {
    return Promise.resolve(JSON.stringify(MOCK_TRACK_SEARCH_RESPONSE_4))
}

import { Image, Playlist, SearchResultItem, Track } from 'verbalize'
import {
    MOCK_TRACK_NAME_1,
    MOCK_TRACK_NAME_2,
    MOCK_TRACK_NAME_3,
} from './spotifyApiMocks'

export const MOCK_IMAGE: Image = {
    src: 'url',
    width: 100,
    height: 100,
}

export const MOCK_TRACK_1: Track = {
    id: '1',
    name: MOCK_TRACK_NAME_1,
    image: MOCK_IMAGE,
    artists: ['artist 1'],
}

export const MOCK_TRACK_2: Track = {
    id: '2',
    name: MOCK_TRACK_NAME_2,
    image: MOCK_IMAGE,
    artists: ['artist 2'],
}

export const MOCK_TRACK_3: Track = {
    id: '3',
    name: MOCK_TRACK_NAME_3,
    image: MOCK_IMAGE,
    artists: ['artist 3'],
}

export const MOCK_SEARCH_RESULT_ITEM_1: SearchResultItem = {
    searchTerm: MOCK_TRACK_NAME_1,
    track: MOCK_TRACK_1,
}

export const MOCK_SEARCH_RESULT_ITEM_2: SearchResultItem = {
    searchTerm: MOCK_TRACK_NAME_2,
    track: MOCK_TRACK_2,
}

export const MOCK_SEARCH_RESULT_ITEM_3: SearchResultItem = {
    searchTerm: MOCK_TRACK_NAME_3,
    track: MOCK_TRACK_3,
}

export const MOCK_PLAYLIST: Playlist = {
    name: 'playlist name',
    url: 'url.to.playlist',
}

export function MOCK_FETCH_PLAYLIST_RESPONSE_1(): Promise<string> {
    return Promise.resolve(JSON.stringify(MOCK_PLAYLIST))
}

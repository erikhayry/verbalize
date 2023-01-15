import { enableFetchMocks } from 'jest-fetch-mock'
import {
    MOCK_FETCH_PLAYLIST_RESPONSE_1,
    MOCK_PLAYLIST,
    MOCK_SEARCH_RESULT_ITEM_1,
    MOCK_SEARCH_RESULT_ITEM_2,
    MOCK_SEARCH_RESULT_ITEM_3,
} from '../../mocks/appMocks'
import { savePLaylist } from './playlistUtils'

enableFetchMocks()

beforeEach(() => {
    fetchMock.mockResponse(MOCK_FETCH_PLAYLIST_RESPONSE_1)
})

afterEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockRestore()
})

describe('playlisyUtils', () => {
    test('', async () => {
        const playlist = await savePLaylist([
            MOCK_SEARCH_RESULT_ITEM_1,
            MOCK_SEARCH_RESULT_ITEM_2,
            MOCK_SEARCH_RESULT_ITEM_3,
        ])

        expect(playlist.name).toEqual(MOCK_PLAYLIST.name)
        expect(playlist.url).toEqual(MOCK_PLAYLIST.url)

        expect(fetchMock).toBeCalledWith(
            '/api/playlist/create?tracks=1,2,3&name= MockTrackName1 MockTrackName2 MockTrackName3... by V E R B A L I Z E'
        )
    })
})

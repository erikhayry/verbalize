import { ApiResponseType } from '@/pages/api/interface/api'
import { enableFetchMocks } from 'jest-fetch-mock'
import { SearchResultItem } from 'verbalize'
import {
    MOCK_FETCH_RESPONSE_1,
    MOCK_FETCH_RESPONSE_1_WITH_DELAY,
    MOCK_FETCH_RESPONSE_2,
    MOCK_FETCH_RESPONSE_3,
    MOCK_FETCH_RESPONSE_4,
    MOCK_TRACK_1,
    MOCK_TRACK_10,
    MOCK_TRACK_2,
    MOCK_TRACK_4,
    MOCK_TRACK_7,
} from '../../mocks/spotifyApiMocks'
import { search } from './searchUtils'

enableFetchMocks()

beforeEach(() => {
    fetchMock
        .mockResponseOnce(MOCK_FETCH_RESPONSE_1)
        .mockResponseOnce(MOCK_FETCH_RESPONSE_2)
        .mockResponseOnce(MOCK_FETCH_RESPONSE_3)
        .mockResponseOnce(MOCK_FETCH_RESPONSE_4)
        .mockResponse(MOCK_FETCH_RESPONSE_1)
})

afterEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockRestore()
})

interface SuccesfulSearchApiResponse {
    type: ApiResponseType.SUCCES
    data: SearchResultItem[]
}

describe('search', () => {
    test('track is empty if no match', async () => {
        const {
            data: [{ track }],
        } = (await search('UNKNOWN')) as SuccesfulSearchApiResponse

        expect(track).toBeUndefined()
    })

    test('track is returend if exact match', async () => {
        const {
            data: [{ track }],
        } = (await search(MOCK_TRACK_2.name)) as SuccesfulSearchApiResponse

        expect(track?.name).toEqual(MOCK_TRACK_2.name)
    })

    test('tracks are returend in order', async () => {
        fetchMock
            .mockResponseOnce(MOCK_FETCH_RESPONSE_1_WITH_DELAY)
            .mockResponseOnce(MOCK_FETCH_RESPONSE_1)

        const {
            data: [{ track: track1 }, { track: track2 }],
        } = (await search(
            `${MOCK_TRACK_2.name} ${MOCK_TRACK_1.name}`
        )) as SuccesfulSearchApiResponse

        expect(track1?.name).toEqual(MOCK_TRACK_2.name)
        expect(track2?.name).toEqual(MOCK_TRACK_1.name)
    })

    test('multiple requets are made to find track', async () => {
        const {
            data: [{ track }],
        } = (await search(MOCK_TRACK_10.name)) as SuccesfulSearchApiResponse

        expect(track?.name).toEqual(MOCK_TRACK_10.name)
    })

    test('search term is alpha numeric', async () => {
        const searchResult = (await search(
            `#"${MOCK_TRACK_1.name} ${MOCK_TRACK_4.name}",${MOCK_TRACK_7.name}!`
        )) as SuccesfulSearchApiResponse
        const [{ track: track1 }, { track: track2 }, { track: track3 }] =
            searchResult.data

        expect(track1?.name).toEqual(MOCK_TRACK_1.name)
        expect(track2?.name).toEqual(MOCK_TRACK_4.name)
        expect(track3?.name).toEqual(MOCK_TRACK_7.name)
    })
})

import { enableFetchMocks } from 'jest-fetch-mock'
import {
    MOCK_FETCH_RESPONSE_1,
    MOCK_FETCH_RESPONSE_1_WITH_DELAY,
    MOCK_FETCH_RESPONSE_2,
    MOCK_FETCH_RESPONSE_3,
    MOCK_FETCH_RESPONSE_4,
    MOCK_TRACK_1,
    MOCK_TRACK_10,
    MOCK_TRACK_2,
} from '../../mocks/spotifyApiMocks'
import { search } from './searchUtils'

enableFetchMocks()

beforeEach(() => {
    fetchMock
        .mockResponseOnce(MOCK_FETCH_RESPONSE_1)
        .mockResponseOnce(MOCK_FETCH_RESPONSE_2)
        .mockResponseOnce(MOCK_FETCH_RESPONSE_3)
        .mockResponseOnce(MOCK_FETCH_RESPONSE_4)
})

afterEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockRestore()
})

describe('search', () => {
    test('track is empty if no match', async () => {
        const [{ track }] = await search('UNKNOWN')

        expect(track).toBeUndefined()
    })

    test('track is returend if exact match', async () => {
        const [{ track }] = await search(MOCK_TRACK_2.name)

        expect(track?.name).toEqual(MOCK_TRACK_2.name)
    })

    test('tracks are returend in order', async () => {
        fetchMock
            .mockResponseOnce(MOCK_FETCH_RESPONSE_1_WITH_DELAY)
            .mockResponseOnce(MOCK_FETCH_RESPONSE_1)

        const [{ track: track1 }, { track: track2 }] = await search(
            `${MOCK_TRACK_2.name} ${MOCK_TRACK_1.name}`
        )

        expect(track1?.name).toEqual(MOCK_TRACK_2.name)
        expect(track2?.name).toEqual(MOCK_TRACK_1.name)
    })

    test('multiple requets are made to find track', async () => {
        const [{ track }] = await search(MOCK_TRACK_10.name)

        expect(track?.name).toEqual(MOCK_TRACK_10.name)
    })
})

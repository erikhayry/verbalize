import { enableFetchMocks } from 'jest-fetch-mock'
import { MOCK_FETCH } from '../../mocks/spotifyApiMocks'
import { search } from './searchUtils'

enableFetchMocks()

beforeEach(() => {
    fetchMock.mockResponse(MOCK_FETCH)
})

test('search', async () => {
    const item = await search('')
    expect(item).toEqual([{ index: 0, searchTerm: '', track: undefined }])
})

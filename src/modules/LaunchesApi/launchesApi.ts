import ky from 'ky'
import type { LaunchesResponse } from '../Launch/Launch'

const LAUNCHES_URL = 'https://kata-spacex.onrender.com/api/launches'

export async function fetchLaunches(
    signal?: AbortSignal,
): Promise<LaunchesResponse['launches']> {
    const data = await ky
        .get(LAUNCHES_URL, {
            signal,
        })
        .json<LaunchesResponse>()

    if (!Array.isArray(data.launches)) {
        throw new Error('Invalid launches response')
    }

    return data.launches
}
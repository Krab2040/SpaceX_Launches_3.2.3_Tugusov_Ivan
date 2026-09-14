import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Launch } from '../Launch/Launch'
import { fetchLaunches } from '../LaunchesApi/launchesApi'
import LaunchesModule from './LaunchesModule'

vi.mock('../LaunchesApi/launchesApi', () => ({
    fetchLaunches: vi.fn(),
}))

const testLaunch: Launch = {
    flight_number: 1,
    mission_name: 'Test mission',
    launch_year: '2020',
    launch_date_utc: '2020-01-01T00:00:00.000Z',
    details: 'Test mission details',
    links: {
        mission_patch_small: 'https://example.com/small.png',
        mission_patch: 'https://example.com/full.png',
    },
    rocket: {
        rocket_name: 'Falcon 9',
    },
}

function renderModule() {
    return render(
        <MantineProvider>
            <LaunchesModule />
        </MantineProvider>,
    )
}

describe('LaunchesModule', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('shows loading state while launches are loading', () => {
        vi.mocked(fetchLaunches).mockImplementation(
            () => new Promise(() => {}),
        )

        renderModule()

        expect(screen.getByText('Loading launches...')).toBeInTheDocument()
    })

    it('renders launches and opens details modal', async () => {
        const user = userEvent.setup()

        vi.mocked(fetchLaunches).mockResolvedValue([testLaunch])

        renderModule()

        expect(
            await screen.findByText('Test mission'),
        ).toBeInTheDocument()

        expect(screen.getByText('Falcon 9')).toBeInTheDocument()

        await user.click(
            screen.getByRole('button', { name: 'See more' }),
        )

        const dialog = screen.getByRole('dialog')

        expect(dialog).toBeInTheDocument()
        expect(document.body).toContainElement(dialog)
        expect(
            screen.getByRole('heading', { name: 'Test mission' }),
        ).toBeInTheDocument()
        expect(screen.getByText('Test mission details')).toBeInTheDocument()

        await user.click(
            screen.getByRole('button', { name: 'Close' }),
        )

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('shows error when API request fails', async () => {
        vi.mocked(fetchLaunches).mockRejectedValue(
            new Error('Network error'),
        )

        renderModule()

        expect(
            await screen.findByText('Network error'),
        ).toBeInTheDocument()
    })
})
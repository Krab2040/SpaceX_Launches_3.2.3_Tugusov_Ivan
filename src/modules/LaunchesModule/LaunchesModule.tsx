import { useEffect, useReducer } from 'react'
import type { Launch } from '../Launch/Launch'
import { fetchLaunches } from '../LaunchesApi/launchesApi'
import LaunchCard from '../../components/LaunchCard/LaunchCard'
import LaunchDetails from '../../components/LaunchDetails/LaunchDetails'
import PortalModal from '../../ui/PortalModal/PortalModal'
import './LaunchesModule.sass'

type State = {
    status: 'idle' | 'loading' | 'success' | 'error'
    launches: Launch[]
    error: string | null
    selectedLaunch: Launch | null
}

type Action =
    | { type: 'loading' }
    | { type: 'success'; launches: Launch[] }
    | { type: 'error'; error: string }
    | { type: 'select'; launch: Launch }
    | { type: 'close' }

const initialState: State = {
    status: 'idle',
    launches: [],
    error: null,
    selectedLaunch: null,
}

function isAbortError(error: unknown): boolean {
    return error instanceof Error && error.name === 'AbortError'
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'loading':
            return {
                status: 'loading',
                launches: [],
                error: null,
                selectedLaunch: null,
            }

        case 'success':
            return {
                status: 'success',
                launches: action.launches,
                error: null,
                selectedLaunch: null,
            }

        case 'error':
            return {
                status: 'error',
                launches: [],
                error: action.error,
                selectedLaunch: null,
            }

        case 'select':
            return {
                ...state,
                selectedLaunch: action.launch,
            }

        case 'close':
            return {
                ...state,
                selectedLaunch: null,
            }

        default:
            return state
    }
}

export default function LaunchesModule() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const controller = new AbortController()

        dispatch({ type: 'loading' })

        fetchLaunches(controller.signal)
            .then((launches) => {
                dispatch({
                    type: 'success',
                    launches,
                })
            })
            .catch((error: unknown) => {
                if (isAbortError(error)) {
                    return
                }

                dispatch({
                    type: 'error',
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Failed to load launches',
                })
            })

        return () => {
            controller.abort()
        }
    }, [])

    if (state.status === 'loading') {
        return <p>Loading launches...</p>
    }

    if (state.status === 'error') {
        return <p role="alert">{state.error}</p>
    }

    return (
        <>
            <div className="launches-grid">
                {state.launches.map((launch) => (
                    <LaunchCard
                        key={launch.flight_number}
                        missionName={launch.mission_name}
                        rocketName={launch.rocket?.rocket_name}
                        missionPatchSmall={launch.links?.mission_patch_small}
                        onDetails={() =>
                            dispatch({
                                type: 'select',
                                launch,
                            })
                        }
                    />
                ))}
            </div>

            <PortalModal
                opened={state.selectedLaunch !== null}
                onClose={() => dispatch({ type: 'close' })}
            >
                {state.selectedLaunch && (
                    <LaunchDetails
                        missionName={state.selectedLaunch.mission_name}
                        rocketName={state.selectedLaunch.rocket?.rocket_name}
                        missionPatch={state.selectedLaunch.links?.mission_patch}
                        details={state.selectedLaunch.details}
                    />
                )}
            </PortalModal>
        </>
    )
}
export type LaunchLinks = {
    mission_patch_small?: string | null
    mission_patch?: string | null
}

export type LaunchRocket = {
    rocket_name?: string | null
}

export type Launch = {
    flight_number: number
    mission_name: string | null
    launch_year?: string | null
    launch_date_utc?: string | null
    details?: string | null
    links?: LaunchLinks | null
    rocket?: LaunchRocket | null
}

export type LaunchesResponse = {
    launches: Launch[]
}
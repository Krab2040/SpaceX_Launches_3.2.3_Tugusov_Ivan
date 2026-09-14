import { Image, Text } from '@mantine/core'
import './LaunchDetails.sass'

type LaunchDetailsProps = {
    missionName: string | null
    rocketName?: string | null
    missionPatch?: string | null
    details?: string | null
}

export default function LaunchDetails({missionName, rocketName, missionPatch, details,}: LaunchDetailsProps) {
    const title = missionName ?? 'Unknown mission'
    const rocket = rocketName ?? 'Unknown rocket'
    const description = details ?? 'No details available'

    return (
        <div className="launch-details">
            <Text
                component="h2"
                className="launch-details__heading"
                fw={400}
            >
                {title}
            </Text>

            {missionPatch ? (
                <Image
                    className="launch-details__image"
                    src={missionPatch}
                    alt={`${title} patch`}
                    h={320}
                    fit="contain"
                />
            ) : (
                <Text c="dimmed">No image</Text>
            )}

            <div>
                <Text fw={500}>Mission name:</Text>
                <Text c="dimmed">{title}</Text>
            </div>

            <div>
                <Text fw={500}>Rocket name:</Text>
                <Text c="dimmed">{rocket}</Text>
            </div>

            <div>
                <Text fw={500}>Details:</Text>
                <Text c="dimmed">{description}</Text>
            </div>
        </div>
    )
}
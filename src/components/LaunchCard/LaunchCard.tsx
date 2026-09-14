import { Button, Card, Image, Text } from '@mantine/core'
import './LaunchCard.sass'

type LaunchCardProps = {
    missionName: string | null
    rocketName?: string | null
    missionPatchSmall?: string | null
    onDetails: () => void
}

export default function LaunchCard({missionName, rocketName, missionPatchSmall, onDetails,}: LaunchCardProps) {
    const title = missionName ?? 'Unknown mission'
    const rocket = rocketName ?? 'Unknown rocket'

    return (
        <Card
            className="launch-card"
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
        >
            <Card.Section className="launch-card__image">
                {missionPatchSmall ? (
                    <Image
                        src={missionPatchSmall}
                        alt={`${title} mission patch`}
                        h={120}
                        fit="contain"
                    />
                ) : (
                    <Text ta="center" py="xl">
                        No image
                    </Text>
                )}
            </Card.Section>

            <Text
                className="launch-card__title"
                fw={500}
                mt="md"
                lineClamp={1}
            >
                {title}
            </Text>

            <Text
                className="launch-card__rocket"
                c="dimmed"
                mt="xs"
            >
                {rocket}
            </Text>

            <Button
                className="launch-card__button"
                fullWidth
                size="sm"
                onClick={onDetails}
            >
                See more
            </Button>
        </Card>
    )
}
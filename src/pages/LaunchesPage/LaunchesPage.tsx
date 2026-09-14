import LaunchesModule from '../../modules/LaunchesModule/LaunchesModule'
import './LaunchesPage.sass'

export default function LaunchesPage() {
    return (
        <main className="launches-page">
            <h1 className="launches-page__title">
                SpaceX Launches
            </h1>

            <LaunchesModule />
        </main>
    )
}
//Next
import Head from 'next/head'

export function ReusableHead(props) {
  return (
    <>
      <Head>
        {/* Meta */}
        <title>{props.title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Vacations.rip is a useful collection of statistics about the current status of the flights and travel sector. By providing a clear, up-to-date picture of the evolution of travel around the world, we aim to empower you to make better decisions about your next holiday." />
        <meta name="keywords" content="Travel, Flights, Vacation, Flight statistics, Traveling, Plan your trip, Trip planning" />
        <meta name="author" content="Signofactory" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Favicon and other sizes */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
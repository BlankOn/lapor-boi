import Head from 'next/head';

export default function CustomHead(){
    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
            <title>Lapor BlankOn</title>
            <meta name="twitter:image" content="/images/512.png"/>
            <meta name="twitter:title" content="Lapor BlankOn"/>
            <meta property="og:image" content="/images/512.png"/>
            <meta name="description" content="Situs Pelaporan BlankOn"/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:description" content="Situs Pelaporan BlankOn"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <link rel="shortcut icon" href="/favicon.png" type="image/x-icon"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/32.png"/>
            <link rel="icon" type="image/png" sizes="64x64" href="/images/64.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/images/96.png"/>
            <link rel="icon" type="image/png" sizes="180x180" href="/images/180.png"/>
            <link rel="icon" type="image/png" sizes="512x512" href="/images/512.png"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans"/>
        </Head>
    )
}
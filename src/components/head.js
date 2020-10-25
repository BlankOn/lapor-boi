import Head from 'next/head';

export default function CustomHead(){
    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
            <title>Lapor BlankOn</title>
            <meta name="twitter:image" content="/vercel.svg"/>
            <meta name="twitter:title" content="Lapor BlankOn"/>
            <meta property="og:image" content="/vercel.svg"/>
            <meta name="description" content="Situs Pelaporan BlankOn"/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:description" content="Situs Pelaporan BlankOn"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/vercel.svg"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/vercel.svg"/>
            <link rel="icon" type="image/png" sizes="563x563" href="/vercel.svg"/>
            <link rel="icon" type="image/png" sizes="600x311" href="/vercel.svg"/>
            <link rel="icon" type="image/png" sizes="1600x1600" href="/vercel.svg"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans"/>
        </Head>
    )
}
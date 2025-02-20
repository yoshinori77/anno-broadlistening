import Head from 'next/head'

type CustomHeaderProps = {
  config: {
    name: string
    description?: string
    question?: string
  }
}

const CustomHeader = ({config}: CustomHeaderProps) => {
  const title = config.name
  const description = config.description || config.question
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>

        {gtmId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
            ></script>
            <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtmId}');
              `
            }}/>
          </>
        )}
      </Head>
    </>
  )
}

export default CustomHeader

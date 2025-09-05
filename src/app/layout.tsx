import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import Script from 'next/script'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: 'Your Store',
  description: 'Your store description',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
        <link rel="stylesheet" href="/assets/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/mobile_menu.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/scroll_button.css" />
        <link rel="stylesheet" href="/assets/css/slick.css" />
        <link rel="stylesheet" href="/assets/css/venobox.min.css" />
        <link rel="stylesheet" href="/assets/css/select2.min.css" />
        <link rel="stylesheet" href="/assets/css/jquery.pwstabs.css" />
        <link rel="stylesheet" href="/assets/css/range_slider.css" />
        <link rel="stylesheet" href="/assets/css/multiple-image-video.css" />
        <link rel="stylesheet" href="/assets/css/animated_barfiller.css" />
        <link rel="stylesheet" href="/assets/css/custom_spacing.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <link rel="stylesheet" href="/assets/css/New.css" />
      </head>
      <body className="home_beauty">
        <main className="relative">{children}</main>
       
      </body>
    </html>
  )
}






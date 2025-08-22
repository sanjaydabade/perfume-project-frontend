import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
// import "styles/globals.css" 

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light"> 
     <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <link rel="icon" type="image/png" href="/assets/images/favicon.png"/>
    <link rel="stylesheet" href="/assets/css/all.min.css"/>
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/assets/css/animate.css"/>
    <link rel="stylesheet" href="/assets/css/mobile_menu.css"/>
    <link rel="stylesheet" href="/assets/css/nice-select.css"/>
    <link rel="stylesheet" href="/assets/css/scroll_button.css"/>
    <link rel="stylesheet" href="/assets/css/slick.css"/>
    <link rel="stylesheet" href="/assets/css/venobox.min.css"/>
    <link rel="stylesheet" href="/assets/css/select2.min.css"/>
    <link rel="stylesheet" href="/assets/css/jquery.pwstabs.css"/>
    <link rel="stylesheet" href="/assets/css/range_slider.css"/>
    <link rel="stylesheet" href="/assets/css/multiple-image-video.css"/>
    <link rel="stylesheet" href="/assets/css/animated_barfiller.css"/>
    <link rel="stylesheet" href="/assets/css/custom_spacing.css"/>
    <link rel="stylesheet" href="/assets/css/style.css"/>
    <link rel="stylesheet" href="/assets/css/responsive.css"/>
    <link rel="stylesheet" href="/assets/css/New.css"/>

        
        

      </head>


      <body className="home_beauty">
  <main className="relative">{props.children}</main>

  {/* jQuery FIRST */}
  <script src="/assets/js/jquery-3.7.1.min.js"></script>

  {/* Bootstrap */}
  <script src="/assets/js/bootstrap.bundle.min.js"></script>

  {/* Slick Slider */}
  <script src="/assets/js/slick.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

  {/* Youtube Background */}
  <script src="/assets/js/jquery.youtube-background.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery.youtube-background/jquery.youtube-background.min.js"></script>

  {/* Venobox */}
  <script src="/assets/js/venobox.min.js"></script>

  {/* Font Awesome */}
  <script src="/assets/js/Font-Awesome.js"></script>

  {/*  plugins */}
  <script src="/assets/js/jquery.waypoints.min.js"></script>
  <script src="/assets/js/jquery.countup.min.js"></script>
  <script src="/assets/js/jquery.nice-select.min.js"></script>
  <script src="/assets/js/select2.min.js"></script>
  <script src="/assets/js/simplyCountdown.js"></script>
  <script src="/assets/js/wow.min.js"></script>
  <script src="/assets/js/jquery.marquee.min.js"></script>
  <script src="/assets/js/jquery.pwstabs.min.js"></script>
  <script src="/assets/js/scroll_button.js"></script>
  <script src="/assets/js/range_slider.js"></script>
  <script src="/assets/js/sticky_sidebar.js"></script>
  <script src="/assets/js/multiple-image-video.js"></script>
  <script src="/assets/js/animated_barfiller.js"></script>

  {/* Custom JS – always LAST */}
  <script src="/assets/js/custom.js"></script>
  <script src="/assets/js/init-slick.js"></script>
</body>

        
     
    </html>
  )
}






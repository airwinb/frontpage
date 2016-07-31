## Introduction
This project is based on the excellent work by Gerard33 from which I forked the code base. I've also used javascript changed
by Aiolos.
What I've done is created another interface so I can use it on my Raspberry Pi with the Pi 7" Touch interface.
It is based on flickity and gallery, two useful javascript libraries.

## Domoticz Frontpage

See http://www.domoticz.com/forum/viewtopic.php?f=8&t=4698.

## Screenshot
page 1
![Alt text](/screenshot/frontpage1.jpg "Frontpage (page 1)")
page 2
![Alt text](/screenshot/frontpage2.jpg "Frontpage (page 2)")

## Introduction

Setting up the frontpage requires some time. Please take a good look at the forum topic mentioned above and the (high level) instructions below.
It will take some time and a lot of trial and error but it is definitely worth it!

## Installation instructions when using domoticz www folder
1) copy the files from the frontpage map to domoticz/www so the frontpage.html and the subfolders file needs to be in domoticz/www

2) edit frontpage_settings.js
   
2a) edit url of domoticz
   
2b) edit switches (idx, descriptions, etc)

## Installation instructions when using webserver (eg Synology)
1) copy the complete frontpage folder to /volume1/web

2) edit frontpage_settings.js

2a) edit url of domoticz
   
2b) edit switches (idx, descriptions, etc)

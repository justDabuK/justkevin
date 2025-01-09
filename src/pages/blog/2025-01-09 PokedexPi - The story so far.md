---
layout: '@layouts/DefaultLayout.astro'
title: "PokedexPi - The story so far"
---

# PokedexPi - The story so far
And so the story unfolds. I sit here, equipped with a Raspberry Pi 5, a HyperPixel 4" square touch display, a Raspberry Pi Camera module 3 and big dreams. 

_Insert pictures_

I asked myself "Wouldn't it be nice to build myself a camera". As although I am not that much of a photographer, I thought that using something I build myself would definitely increase the possibility of me taking pictures. So I imagined myself taking pictures, of birds, of trees of building. And I immediately thought "Well but if I take photos of these things, wouldn't it be nice to know what they are". And as AI is still the hype topic for quite some time know and there is by now not just an AI camera module but also an AI hat for the Raspberry Pi, I thought "Well couldn't I build something that detects what I am taking photos of, and couldn't I then have the photos be grouped by what one can find on them, and couldn't I whenever I have internet connection download some description of what is on those pictures", and the idea of the PokedexPi unfolded itself before my inner eye. 

Fast-forward, I learned that the new raspberry Pi 5 hast a slimmer camera port, which means I couldn't use it until I ordered an appropriate cable. 

_Insert picture of non matching cable_

I therefore now am equipped with a Raspberry Pi ~~5~~ 4, a HyperPixel 4" square touch display, a Raspberry Pi Camera module 3 and still big dreams. Including buying said cable, someday. 

I also after a lot of back and forth and after corrupting and reinitializing the eeprom once, managed to get the HyperPixel and the camera module to work together. Here is what I needed to add to the `/boot/firmware/config.txt` file:

```
 dtoverlay=imx708
 dtoverlay=vc4-kms-dpi-hyperpixel4sq
 disable_poe_fan=1
 force_eeprom_read=0
 camera_auto_detect=0
 ```
splitting this up and analyzing it:
```
dtoverlay=imx708
```
for telling it, you will have a camera module with the sony IMX708 sensor attached. 
```
dtoverlay=vc4-kms-dpi-hyperpixel4sq
```
for telling it, you will have a hyperpixel 4" square display attached. (no extra comments for if it has touch or not)  
```
disable_poe_fan=1
force_eeprom_read=0
camera_auto_detect=0
```
apparently necessary parts for the camera to work. I guess we disable the camera auto detection, as we told it before already what camera is attached. And the other two I have no clue. Hopefully one day I will be patient and motivated enough to look them up. 

Big thanks to this [GitHub thread](https://github.com/pimoroni/hyperpixel4/issues/188), as it helped putting together the assembly you see above. 

I want to finish this up with a picture of how it looks right now (using a QT interface from the camera module documentation)

_insert picture_

As next steps I want to write a website that lets one access the camera stream and take pictures. 

Let's see how long it takes until that happens. 

See ya, 

Kevin
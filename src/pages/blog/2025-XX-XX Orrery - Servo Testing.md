---
layout: "@layouts/DefaultLayout.astro"
title: "Orrery - Servo Testing"
---

# Orrery - Servo Testing

Many many moons ago, I read something about the [DeMoor Orrery](https://demoor-orrery.com/en) in [Issue 114 of the MagPi (Raspberry Pi Official Magazine these days)](https://magazine.raspberrypi.com/issues/114). An [orrery](https://en.wikipedia.org/wiki/Orrery), for all the other uneducated people like me, is something I would call a "planetary clock", that shows the positions of the planets in our solar system, typically with the sun as center point.

And this particular article somewhow burned itself into my brain. While having no greater use at all, it would still be so cool to see at all times, where which planet is currently. And after coming back to this thought time and time again, the urge to build it myself finally became strong enough for me to do something about it.

"Now Kevin", I thought, "if you want to move stuff, you'll need motors. Probably servo motors in case you want to move the planets to specific positions". And fortunately I ordered so far unused servo motors from the robot shop like 2 to 3 years ago.

Namely, continous rotation micro servos and metal gear micro servos

![9g-continuous-rotation-micro-servo.jpg](../../assets/orrery/9g-continuous-rotation-micro-servo.jpg)
![25kg-goteck-metal-gear-micro-servo.jpg](../../assets/orrery/25kg-goteck-metal-gear-micro-servo.jpg)

Now while thinking about what hardware to use in order to power these I realized that I had another piece of hardware that I also ordered ages ago and never used. A [servo 2040 from Pimoroni](https://shop.pimoroni.com/products/servo-2040)

![servo-2040-1_768x768_crop_center.webp](../../assets/orrery/servo-2040.webp)

So having all these components I followed [pimoronis documentation on the servo 2040](https://github.com/pimoroni/pimoroni-pico/tree/main/micropython/modules/servo) in order to see how the servos behave and how I could use them.

I thought of iterating from the max to the min volume fo rboth servos in order to see what they would do. The LEDs on the board indicate where on our way from min to max we are.

**_TODO: insert videos of the testing_**

<details>
<summary>
    Here is the code I used for the continuos servo
</summary>

```python
from plasma import WS2812
from servo import Servo, servo2040
import time

led_bar = WS2812(servo2040.NUM_LEDS, 1, 0, servo2040.LED_DATA)
led_bar.start()

black_servo = Servo(servo2040.SERVO_6)

current_value = -90
delta_value = 1

led_brightness = 130

while True:
    print(f"current value: {current_value} | {delta_value}")
    if -90 <= current_value < -60:
        led_bar.set_rgb(0, 0, led_brightness, led_brightness)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, 0, 0, 0)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, 0, 0)
    elif -60 <= current_value < -30:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, led_brightness, led_brightness)
        led_bar.set_rgb(2, 0, 0, 0)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, 0, 0)
    elif -30 <= current_value < 0:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, 0, led_brightness, led_brightness)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, 0, 0)
    elif 0 <= current_value < 30:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, led_brightness, 0, led_brightness)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, 0, 0)
    elif 30 <= current_value < 60:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, 0, 0, 0)
        led_bar.set_rgb(3, 0, led_brightness, led_brightness)
        led_bar.set_rgb(4, 0, 0, 0)
    elif 60 <= current_value < 90:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, 0, 0, 0)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, led_brightness, led_brightness)
    else:
        print(f"how did we end up here? value: {current_value}")

    black_servo.value(current_value)

    current_value += delta_value
    if current_value >= 90:
        delta_value = -1
    if current_value <= -90:
        delta_value = 1

    time.sleep_ms(100)

```

</details><details>
<summary>
    And here is the code I used for the metal gear one
</summary>

```python
from plasma import WS2812
from servo import Servo, servo2040
import time

led_bar = WS2812(servo2040.NUM_LEDS, 1, 0, servo2040.LED_DATA)
led_bar.start()

black_servo = Servo(servo2040.SERVO_6)

current_value = -90
delta_value = 1

led_brightness = 130

while True:
    print(f"current value: {current_value} | {delta_value}")
    if -90 <= current_value < -60:
        led_bar.set_rgb(0, 0, led_brightness, led_brightness)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, 0, 0, 0)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, 0, 0)
    elif -60 <= current_value < -30:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, led_brightness, led_brightness)
        led_bar.set_rgb(2, 0, 0, 0)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, 0, 0)
    elif -30 <= current_value < 0:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, 0, led_brightness, led_brightness)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, 0, 0)
    elif 0 <= current_value < 30:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, led_brightness, 0, led_brightness)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, 0, 0)
    elif 30 <= current_value < 60:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, 0, 0, 0)
        led_bar.set_rgb(3, 0, led_brightness, led_brightness)
        led_bar.set_rgb(4, 0, 0, 0)
    elif 60 <= current_value < 90:
        led_bar.set_rgb(0, 0, 0, 0)
        led_bar.set_rgb(1, 0, 0, 0)
        led_bar.set_rgb(2, 0, 0, 0)
        led_bar.set_rgb(3, 0, 0, 0)
        led_bar.set_rgb(4, 0, led_brightness, led_brightness)
    else:
        print(f"how did we end up here? value: {current_value}")

    black_servo.value(current_value)

    current_value += delta_value
    if current_value >= 90:
        delta_value = -1
    if current_value <= -90:
        delta_value = 1

    time.sleep_ms(100)

```

</details>

---

Source:

- [9g continous micro servo](https://eu.robotshop.com/de/products/9g-dauerrotations-micro-servo)
- [2,5 kg Goteck metal gear micro servo](https://eu.robotshop.com/de/products/25-kg-goteck-metallgetriebe-micro-servo)
- [Servo 2040](https://shop.pimoroni.com/products/servo-2040)

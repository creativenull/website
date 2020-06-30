---
title: College Projects
description: Couple of projects I did in college, or that I think I did great in? Anyways here they are
date: Jan 22, 2019
author: Arnold Chand
permalink: /posts/2019/01/22/projects.html
isPost: true
---

<PostHeader/>

As an addition to who I am, I will be also posting my projects that I've done during my academic years. Especially
those that were highlights of my years in college. There were a lot of projects that I've done, but there were few that
I completed or am proud of. Below are my list of projects along with their links for more information, which is also
posted to my Github account.

## University of the Southern Caribbean*
### 0. Computer Science Projects
#### Technologies
+ C++

[Link to code][gh-usc-cptr]

## Andrews University
### 1. Reverse engineering models - Hold Down Clamp
Engineering Graphics course, final project was to reverse engineer a real world object in SolidWorks. We (three
students, including me) chose a hold down clamp that was lying around in the materials lab and completed its design
from start to finish. I recreated the big star screw, the bottom screw, the two small pin screws, the nuts, the
threading on each of them as well as the threading on the other components for the screws and nuts to fit comfortably.

#### Technologies
+ SolidWorks
+ Measurement tools - calipers, rulers, etc

[Link to animation and presentation][gh-au-graphics]

### 2. Microprocessor labs
Not really a project to say, but a bunch of assembly codes I wrote during my Microprocessor course. This includes
simple music player, PWM, ADC/DAC, SRAM. Assembly was written for the Freescale HCS12 microcontroller.

#### Technologies
+ Microcontrollers
+ HCS12
+ Assembly
+ LCD
+ SPI
+ MOSI/MISO
+ I2C

[Link to code][gh-au-micro]

### 3. LED Cube Audio Visualizer - Senior Design project
My senior design project. It was fun building such a project as inputting audio and "converting" it into color
representing frequency ranges.

Quick summary, my senior design project was to create a LED cube (4x4x4) and basically the microcontroller will read an
input audio signal and will then filter out into three different frequency ranges - highs, mids, lows. Each range is
that assigned a color (highs = red, mids = green, lows = blue). So when an audio signal is, for example music, given
then it will light up the LED with ever-changing colors in real-time.

#### Technologies
+ Microcontrollers
+ ATMega328
+ C Programming Language
+ PCB Design (NI Ultiboard)
+ Circuit Design (NI Multisim)
+ Logic Design (Hand written logic circuit)
+ Project Managment

[Link to presentation][gh-au-senior]

## Western Michigan University
### 4. Modeling Power - assignments
Assignments that I did in class, you could think of them as projects since they were in total a project workflow. The
first one was done in Python, I was given tower configurations and I was to compute the series impedence and the shunt
admittance matrix using numpy. The second was written in Matlab, I was to first generate a table from a given COMSOL
simulation. Then input the table in a Matlab script to compute the capacitance matrix, and analyze the initial
potential distribution of the matrix.

#### Technologies
+ Python
+ Matlab

[Link to code][gh-wmu-model]

### 5. Power Electronics - Final project
Final project that I did in my Power electronics - dynamic controls class. I was to create a controller for a Buck
converter but show them in two ways. The first way was to show by building an analog circuit that would control the
buck converter. The second way was to use a micro-controller to control the converter - which I used a PID algorithm
for that.

#### Technologies
+ C
+ Algorithms
+ STM32 micro-controller
+ Power-pole board

[Link to code][gh-wmu-power]

### 6. Micro-controllers - Projects
Probably the ony time I ever had to work a lot on a class. This class had me occupied all day and did not let me rest,
there were a lot of things that were covered. But I did enjoy it and it also helped me get used to what it would be
like a fast paced environment. There were 2 projects in total that I had to complete. The first was a simple square
wave oscilloscope and the second was a assembly belt motor control. Both were written in C in the IAR Workbench.

#### Technologies
+ C
+ STM32 micro-controller
+ LCD
+ CAN
+ SPI
+ I2C

[Link to code][gh-wmu-micro]

[gh-usc-cptr]: https://github.com/creativenull/usc-cptr
[gh-au-graphics]: https://github.com/creativenull/au-engr/tree/master/engineering-graphics
[gh-au-micro]: https://github.com/creativenull/au-engr/tree/master/microprocessors
[gh-au-senior]: https://github.com/creativenull/au-engr/tree/master/senior-design-project
[gh-wmu-model]: https://github.com/creativenull/wmu-engr/tree/master/modeling-power
[gh-wmu-power]: https://github.com/creativenull/wmu-engr/tree/master/power-electronics/project-4
[gh-wmu-micro]: https://github.com/creativenull/wmu-engr/tree/master/micro-controllers

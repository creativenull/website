---
title: About github contributions graph
description: Lately, I've been working a lot of contributions on Github
date: Jun 12, 2020
author: Arnold Chand
permalink: /posts/2020/06/12/about-github-contrib-graphs.html
isPost: true
---

<PostHeader />

Lately, I've been working a lot of contributions on Github. Well not a lot, but majority of my time is pushing my commits
to my repo. Whether they are from work or just my hobby projects.

While I have been pushing these commits, I've observed that my contributions graph on my profile pages have a lot of light
green tiles - indicating that there are commits done on that day, but very few. This interested me, in the way that I've been
working the whole day making changes and commiting them to the repo but see that in total there have been an average of
10 - 12 commits per day.

So I decided to do a quick search on how Github contribution graphs work. First, I started with the official Github
help page where it explains how Github adds to the graph, depending on your commits to (in short summary): `master` branch,
`gh-pages` branch, done to a repo not a fork, linked with your email on Github. With this information, I deceided to see
if any other blogs or website have this covered. Unfortunately, there was not much information.

While the Github help page was very clear on how it would count your commits towards the graph, it does not mention
how many commits refer to the color of the graph. Nor do any articles that cover this feature on their post. I would remind
you that this was just a simple search on and I did not really go deep in my search.

::: update
See updated section below...
:::

~~So observing my commits per day, I have compiled a small table below to show you how many commits refer to the color
of the graph.~~

| Commits per Day | Graph Color |
| --------------- | ----------- |
| ~~1 - 19~~          | ~~Lightest Green~~ |
| ~~20 - 39~~         | ~~Light Green~~ |
| ~~40 - 60~~         | ~~Green~~ |
| ~~61 and higher~~   | ~~Dark Green~~ |

While not the best description on the color, I believe this would really help in knowing how many commits to do in order
to reach the dark color.

## Update (2020/06/20)
After looking through other user profiles on Github, it was evident that Github counts the color intensity by what
your maximum contributions are for one day over the course of a year, and then calculates those intensities accordingly.
For example, if you made only 20 contributions for one over the course of a year timeline, then that will be assigned
the most intense color. Whilst, contributing only one for a day with give you the least intense color.

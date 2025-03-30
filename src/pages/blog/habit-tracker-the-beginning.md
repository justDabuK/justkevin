---
layout: "@layouts/DefaultLayout.astro"
title: "Habit Tracker - The beginning"
date: "2025-03-07"
---

# Habit Tracker - The beginning

Like many people before me, I have the idea of tracking my habits. Now while there are many apps and websites for this out there, it's always nicer to use something you've written yourself, isn't it?

Now thinking about how I want to do this my first thought is "Wouldn't this be a nice chance to finally try out [nuxt](https://nuxt.com/)". A bit of research later, asking the void of the internet what database matches good with a nuxt application, unsure yet if I want to self host on a raspberry Pi or if I just go with one of many cloud solutions, I stumble upon [supabase](https://supabase.com).

Half a minute later I gave supabase access to my github account and I supposedly have postgres Database running.

Now the question is, what should I actually put into the database? Some highly detailed wiremocking and database planing later I came up with this:

![habbit-tracker planing](@assets/habbit-tracker/habbit-tracker-planing.jpg)

I should have 2 to 3 tables. One taking care of the tags, optionally also of the value types. And 1 or 2 for taking care of the values and the date they were added. The value types I currently need are float and boolean. And dependent on if I can have a table with the value being either of those types decides if it is one table with all entries or a separate table for every value type I support. Spoiler: supabase didn't allow me to have "any" type inside the value, therefore I went with one table for each type.

Originally I planned on realising this as soon as I also have some UI to show it off with, but since then 2 weeks passed and I didn't make any progress. Therefore, I will release it as it is now: just a supabase DB waiting to be used. We will see when I have some motivation to finally start my deep dive into nuxt.

Until then,

Kevin

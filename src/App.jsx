import { useState } from "react";
/*
  Swim Faster London - club platform
  Build: v2 - 10 Jul 2026
  Coach login: coach@swimfasterlondon.com / coach2026
  Member demo: james@example.com / swim2024
  This banner intentionally shifts line numbers to invalidate
  any cached transpile of an earlier build.
*/

const MEMBERS_DATA = [
  { id:101, name:"James Thornton", nickname:"Marc the Shark", gender:"M", email:"james@example.com", block:"Squad", joined:"Jan 2026", paid:true, age:28, level:"Club swimmer", specialty:"Freestyle", bio:"Competitive club swimmer targeting sub-57s for 100m free.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:03.5",split50:"30.9",strokeCount1:19,strokeCount2:22},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:03.0",split50:"30.7",strokeCount1:19,strokeCount2:22},
    {date:"25 Apr 2026",event:"100m Free",time:"1:02.5",split50:"30.4",strokeCount1:19,strokeCount2:22},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:02.1",split50:"30.2",strokeCount1:18,strokeCount2:21},
    {date:"09 May 2026",event:"100m Free",time:"1:01.9",split50:"30.1",strokeCount1:18,strokeCount2:21},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:01.3",split50:"29.9",strokeCount1:18,strokeCount2:21},
    {date:"23 May 2026",event:"100m Free",time:"1:00.9",split50:"29.7",strokeCount1:18,strokeCount2:21},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:00.6",split50:"29.5",strokeCount1:17,strokeCount2:20},
    {date:"06 Jun 2026",event:"100m Free",time:"1:00.1",split50:"29.3",strokeCount1:17,strokeCount2:20},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"59.9",split50:"29.2",strokeCount1:17,strokeCount2:20},
    {date:"20 Jun 2026",event:"100m Free",time:"59.2",split50:"28.8",strokeCount1:17,strokeCount2:19},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"58.8",split50:"28.6",strokeCount1:16,strokeCount2:19},
    {date:"04 Jul 2026",event:"100m Free",time:"58.4",split50:"28.4",strokeCount1:16,strokeCount2:19},
    {date:"11 Apr 2026",event:"50m Free",time:"29.7"},
    {date:"11 Apr 2026",event:"50m Back",time:"33.4"},
    {date:"11 Apr 2026",event:"50m Breast",time:"39.4"},
    {date:"11 Apr 2026",event:"50m Fly",time:"34.1"},
    {date:"02 May 2026",event:"50m Free",time:"29.2"},
    {date:"02 May 2026",event:"50m Back",time:"32.5"},
    {date:"02 May 2026",event:"50m Breast",time:"39.0"},
    {date:"02 May 2026",event:"50m Fly",time:"33.7"},
    {date:"23 May 2026",event:"50m Free",time:"28.4"},
    {date:"23 May 2026",event:"50m Back",time:"32.3"},
    {date:"23 May 2026",event:"50m Breast",time:"38.4"},
    {date:"23 May 2026",event:"50m Fly",time:"33.1"},
    {date:"13 Jun 2026",event:"50m Free",time:"27.8"},
    {date:"13 Jun 2026",event:"50m Back",time:"31.5"},
    {date:"13 Jun 2026",event:"50m Breast",time:"37.7"},
    {date:"13 Jun 2026",event:"50m Fly",time:"32.2"},
    {date:"04 Jul 2026",event:"50m Free",time:"27.0"},
    {date:"04 Jul 2026",event:"50m Back",time:"31.2"},
    {date:"04 Jul 2026",event:"50m Breast",time:"37.2"},
    {date:"04 Jul 2026",event:"50m Fly",time:"31.8"},
  ]},
  { id:102, name:"Sarah Okafor", gender:"F", email:"sarah@example.com", block:"Squad", joined:"Mar 2026", paid:true, age:24, level:"Masters", specialty:"Freestyle", bio:"Sprint specialist aiming for county medals in 50m and 100m free.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:06.4",split50:"32.5",strokeCount1:20,strokeCount2:23},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:05.9",split50:"32.2",strokeCount1:20,strokeCount2:23},
    {date:"25 Apr 2026",event:"100m Free",time:"1:05.7",split50:"32.1",strokeCount1:20,strokeCount2:23},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:05.0",split50:"31.8",strokeCount1:20,strokeCount2:22},
    {date:"09 May 2026",event:"100m Free",time:"1:04.6",split50:"31.6",strokeCount1:19,strokeCount2:22},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:04.5",split50:"31.5",strokeCount1:19,strokeCount2:22},
    {date:"23 May 2026",event:"100m Free",time:"1:03.9",split50:"31.2",strokeCount1:19,strokeCount2:22},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:03.8",split50:"31.2",strokeCount1:19,strokeCount2:21},
    {date:"06 Jun 2026",event:"100m Free",time:"1:03.3",split50:"31.0",strokeCount1:18,strokeCount2:21},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:03.1",split50:"30.9",strokeCount1:18,strokeCount2:21},
    {date:"20 Jun 2026",event:"100m Free",time:"1:02.7",split50:"30.7",strokeCount1:18,strokeCount2:21},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:02.2",split50:"30.4",strokeCount1:18,strokeCount2:20},
    {date:"04 Jul 2026",event:"100m Free",time:"1:01.6",split50:"30.1",strokeCount1:17,strokeCount2:20},
    {date:"11 Apr 2026",event:"50m Free",time:"30.8"},
    {date:"11 Apr 2026",event:"50m Back",time:"35.1"},
    {date:"11 Apr 2026",event:"50m Breast",time:"41.3"},
    {date:"11 Apr 2026",event:"50m Fly",time:"35.6"},
    {date:"02 May 2026",event:"50m Free",time:"30.3"},
    {date:"02 May 2026",event:"50m Back",time:"34.4"},
    {date:"02 May 2026",event:"50m Breast",time:"40.5"},
    {date:"02 May 2026",event:"50m Fly",time:"35.0"},
    {date:"23 May 2026",event:"50m Free",time:"29.6"},
    {date:"23 May 2026",event:"50m Back",time:"34.0"},
    {date:"23 May 2026",event:"50m Breast",time:"39.9"},
    {date:"23 May 2026",event:"50m Fly",time:"34.7"},
    {date:"13 Jun 2026",event:"50m Free",time:"28.9"},
    {date:"13 Jun 2026",event:"50m Back",time:"33.3"},
    {date:"13 Jun 2026",event:"50m Breast",time:"39.4"},
    {date:"13 Jun 2026",event:"50m Fly",time:"34.0"},
    {date:"04 Jul 2026",event:"50m Free",time:"28.5"},
    {date:"04 Jul 2026",event:"50m Back",time:"32.7"},
    {date:"04 Jul 2026",event:"50m Breast",time:"39.0"},
    {date:"04 Jul 2026",event:"50m Fly",time:"33.6"},
  ]},
  { id:103, name:"Marcus Webb", gender:"M", email:"marcus@example.com", block:"Squad", joined:"Jan 2026", paid:true, age:32, level:"Masters", specialty:"Butterfly", bio:"Former county butterfly swimmer returning after a 3-year break.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:06.9",split50:"32.6",strokeCount1:17,strokeCount2:20},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:06.8",split50:"32.6",strokeCount1:17,strokeCount2:20},
    {date:"25 Apr 2026",event:"100m Free",time:"1:06.3",split50:"32.4",strokeCount1:17,strokeCount2:20},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:05.9",split50:"32.2",strokeCount1:17,strokeCount2:20},
    {date:"09 May 2026",event:"100m Free",time:"1:05.5",split50:"32.0",strokeCount1:16,strokeCount2:19},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:05.0",split50:"31.7",strokeCount1:16,strokeCount2:19},
    {date:"23 May 2026",event:"100m Free",time:"1:04.5",split50:"31.5",strokeCount1:16,strokeCount2:19},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:04.2",split50:"31.3",strokeCount1:16,strokeCount2:19},
    {date:"06 Jun 2026",event:"100m Free",time:"1:03.8",split50:"31.1",strokeCount1:16,strokeCount2:19},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:03.4",split50:"30.9",strokeCount1:15,strokeCount2:18},
    {date:"20 Jun 2026",event:"100m Free",time:"1:03.0",split50:"30.7",strokeCount1:15,strokeCount2:18},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:02.7",split50:"30.6",strokeCount1:15,strokeCount2:18},
    {date:"04 Jul 2026",event:"100m Free",time:"1:02.4",split50:"30.5",strokeCount1:15,strokeCount2:18},
    {date:"11 Apr 2026",event:"50m Free",time:"31.6"},
    {date:"11 Apr 2026",event:"50m Back",time:"34.9"},
    {date:"11 Apr 2026",event:"50m Breast",time:"40.6"},
    {date:"11 Apr 2026",event:"50m Fly",time:"31.0"},
    {date:"02 May 2026",event:"50m Free",time:"31.0"},
    {date:"02 May 2026",event:"50m Back",time:"34.0"},
    {date:"02 May 2026",event:"50m Breast",time:"39.7"},
    {date:"02 May 2026",event:"50m Fly",time:"30.5"},
    {date:"23 May 2026",event:"50m Free",time:"30.3"},
    {date:"23 May 2026",event:"50m Back",time:"33.3"},
    {date:"23 May 2026",event:"50m Breast",time:"39.1"},
    {date:"23 May 2026",event:"50m Fly",time:"30.0"},
    {date:"13 Jun 2026",event:"50m Free",time:"29.8"},
    {date:"13 Jun 2026",event:"50m Back",time:"32.8"},
    {date:"13 Jun 2026",event:"50m Breast",time:"38.6"},
    {date:"13 Jun 2026",event:"50m Fly",time:"29.4"},
    {date:"04 Jul 2026",event:"50m Free",time:"28.8"},
    {date:"04 Jul 2026",event:"50m Back",time:"32.4"},
    {date:"04 Jul 2026",event:"50m Breast",time:"38.2"},
    {date:"04 Jul 2026",event:"50m Fly",time:"29.0"},
  ]},
  { id:104, name:"Chloe Fernandez", gender:"F", email:"chloe@example.com", block:"Squad", joined:"Jan 2026", paid:true, age:19, level:"Club swimmer", specialty:"Backstroke", bio:"Up-and-coming backstroke specialist, recently moved to London.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:11.2",split50:"34.9",strokeCount1:21,strokeCount2:25},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:10.8",split50:"34.7",strokeCount1:21,strokeCount2:25},
    {date:"25 Apr 2026",event:"100m Free",time:"1:10.4",split50:"34.5",strokeCount1:21,strokeCount2:25},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:10.2",split50:"34.4",strokeCount1:21,strokeCount2:24},
    {date:"09 May 2026",event:"100m Free",time:"1:09.8",split50:"34.2",strokeCount1:21,strokeCount2:24},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:09.3",split50:"34.0",strokeCount1:20,strokeCount2:24},
    {date:"23 May 2026",event:"100m Free",time:"1:09.1",split50:"33.9",strokeCount1:20,strokeCount2:23},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:08.7",split50:"33.7",strokeCount1:20,strokeCount2:23},
    {date:"06 Jun 2026",event:"100m Free",time:"1:08.2",split50:"33.4",strokeCount1:20,strokeCount2:23},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:08.0",split50:"33.3",strokeCount1:19,strokeCount2:22},
    {date:"20 Jun 2026",event:"100m Free",time:"1:07.6",split50:"33.1",strokeCount1:19,strokeCount2:22},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:07.1",split50:"32.9",strokeCount1:19,strokeCount2:22},
    {date:"04 Jul 2026",event:"100m Free",time:"1:06.7",split50:"32.7",strokeCount1:19,strokeCount2:22},
    {date:"11 Apr 2026",event:"50m Free",time:"33.5"},
    {date:"11 Apr 2026",event:"50m Back",time:"36.6"},
    {date:"11 Apr 2026",event:"50m Breast",time:"43.1"},
    {date:"11 Apr 2026",event:"50m Fly",time:"37.4"},
    {date:"02 May 2026",event:"50m Free",time:"32.7"},
    {date:"02 May 2026",event:"50m Back",time:"36.2"},
    {date:"02 May 2026",event:"50m Breast",time:"42.6"},
    {date:"02 May 2026",event:"50m Fly",time:"36.7"},
    {date:"23 May 2026",event:"50m Free",time:"32.3"},
    {date:"23 May 2026",event:"50m Back",time:"35.5"},
    {date:"23 May 2026",event:"50m Breast",time:"42.0"},
    {date:"23 May 2026",event:"50m Fly",time:"35.9"},
    {date:"13 Jun 2026",event:"50m Free",time:"31.8"},
    {date:"13 Jun 2026",event:"50m Back",time:"34.8"},
    {date:"13 Jun 2026",event:"50m Breast",time:"41.2"},
    {date:"13 Jun 2026",event:"50m Fly",time:"35.4"},
    {date:"04 Jul 2026",event:"50m Free",time:"30.9"},
    {date:"04 Jul 2026",event:"50m Back",time:"34.3"},
    {date:"04 Jul 2026",event:"50m Breast",time:"40.5"},
    {date:"04 Jul 2026",event:"50m Fly",time:"35.0"},
  ]},
  { id:105, name:"Daniel Park", gender:"M", email:"daniel@example.com", block:"Squad", joined:"Feb 2026", paid:true, age:35, level:"Triathlete", specialty:"Open water", bio:"Experienced triathlete working on pool technique to improve open water pace.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:14.6",split50:"36.7",strokeCount1:22,strokeCount2:27},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:14.0",split50:"36.4",strokeCount1:22,strokeCount2:26},
    {date:"25 Apr 2026",event:"100m Free",time:"1:13.6",split50:"36.2",strokeCount1:22,strokeCount2:26},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:13.3",split50:"36.1",strokeCount1:22,strokeCount2:26},
    {date:"09 May 2026",event:"100m Free",time:"1:12.7",split50:"35.8",strokeCount1:21,strokeCount2:25},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:12.4",split50:"35.6",strokeCount1:21,strokeCount2:25},
    {date:"23 May 2026",event:"100m Free",time:"1:11.9",split50:"35.4",strokeCount1:21,strokeCount2:25},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:11.6",split50:"35.2",strokeCount1:21,strokeCount2:24},
    {date:"06 Jun 2026",event:"100m Free",time:"1:10.8",split50:"34.8",strokeCount1:20,strokeCount2:24},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:10.6",split50:"34.7",strokeCount1:20,strokeCount2:24},
    {date:"20 Jun 2026",event:"100m Free",time:"1:10.0",split50:"34.4",strokeCount1:20,strokeCount2:23},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:09.7",split50:"34.3",strokeCount1:20,strokeCount2:23},
    {date:"04 Jul 2026",event:"100m Free",time:"1:09.3",split50:"34.1",strokeCount1:19,strokeCount2:23},
    {date:"11 Apr 2026",event:"50m Free",time:"34.9"},
    {date:"11 Apr 2026",event:"50m Back",time:"38.3"},
    {date:"11 Apr 2026",event:"50m Breast",time:"44.4"},
    {date:"11 Apr 2026",event:"50m Fly",time:"39.3"},
    {date:"02 May 2026",event:"50m Free",time:"34.1"},
    {date:"02 May 2026",event:"50m Back",time:"37.6"},
    {date:"02 May 2026",event:"50m Breast",time:"43.7"},
    {date:"02 May 2026",event:"50m Fly",time:"38.6"},
    {date:"23 May 2026",event:"50m Free",time:"33.4"},
    {date:"23 May 2026",event:"50m Back",time:"36.9"},
    {date:"23 May 2026",event:"50m Breast",time:"43.2"},
    {date:"23 May 2026",event:"50m Fly",time:"38.1"},
    {date:"13 Jun 2026",event:"50m Free",time:"32.9"},
    {date:"13 Jun 2026",event:"50m Back",time:"36.5"},
    {date:"13 Jun 2026",event:"50m Breast",time:"42.5"},
    {date:"13 Jun 2026",event:"50m Fly",time:"37.3"},
    {date:"04 Jul 2026",event:"50m Free",time:"32.5"},
    {date:"04 Jul 2026",event:"50m Back",time:"35.9"},
    {date:"04 Jul 2026",event:"50m Breast",time:"41.8"},
    {date:"04 Jul 2026",event:"50m Fly",time:"36.8"},
  ]},
  { id:106, name:"Amara Diallo", gender:"F", email:"amara@example.com", block:"Squad", joined:"Feb 2026", paid:true, age:22, level:"Club swimmer", specialty:"Breaststroke", bio:"Breaststroke swimmer adding freestyle speed to her repertoire.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:13.8",split50:"36.1",strokeCount1:21,strokeCount2:24},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:13.4",split50:"35.9",strokeCount1:21,strokeCount2:24},
    {date:"25 Apr 2026",event:"100m Free",time:"1:13.0",split50:"35.7",strokeCount1:21,strokeCount2:24},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:12.6",split50:"35.5",strokeCount1:20,strokeCount2:23},
    {date:"09 May 2026",event:"100m Free",time:"1:11.9",split50:"35.2",strokeCount1:20,strokeCount2:23},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:11.4",split50:"34.9",strokeCount1:20,strokeCount2:23},
    {date:"23 May 2026",event:"100m Free",time:"1:11.0",split50:"34.7",strokeCount1:20,strokeCount2:23},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:10.6",split50:"34.5",strokeCount1:19,strokeCount2:22},
    {date:"06 Jun 2026",event:"100m Free",time:"1:10.3",split50:"34.4",strokeCount1:19,strokeCount2:22},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:10.0",split50:"34.2",strokeCount1:19,strokeCount2:22},
    {date:"20 Jun 2026",event:"100m Free",time:"1:09.4",split50:"33.9",strokeCount1:19,strokeCount2:22},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:08.9",split50:"33.7",strokeCount1:18,strokeCount2:21},
    {date:"04 Jul 2026",event:"100m Free",time:"1:08.5",split50:"33.5",strokeCount1:18,strokeCount2:21},
    {date:"11 Apr 2026",event:"50m Free",time:"34.7"},
    {date:"11 Apr 2026",event:"50m Back",time:"37.8"},
    {date:"11 Apr 2026",event:"50m Breast",time:"40.4"},
    {date:"11 Apr 2026",event:"50m Fly",time:"38.6"},
    {date:"02 May 2026",event:"50m Free",time:"34.1"},
    {date:"02 May 2026",event:"50m Back",time:"37.3"},
    {date:"02 May 2026",event:"50m Breast",time:"39.8"},
    {date:"02 May 2026",event:"50m Fly",time:"37.7"},
    {date:"23 May 2026",event:"50m Free",time:"33.2"},
    {date:"23 May 2026",event:"50m Back",time:"36.4"},
    {date:"23 May 2026",event:"50m Breast",time:"39.0"},
    {date:"23 May 2026",event:"50m Fly",time:"37.2"},
    {date:"13 Jun 2026",event:"50m Free",time:"32.8"},
    {date:"13 Jun 2026",event:"50m Back",time:"35.9"},
    {date:"13 Jun 2026",event:"50m Breast",time:"38.4"},
    {date:"13 Jun 2026",event:"50m Fly",time:"36.8"},
    {date:"04 Jul 2026",event:"50m Free",time:"31.9"},
    {date:"04 Jul 2026",event:"50m Back",time:"35.1"},
    {date:"04 Jul 2026",event:"50m Breast",time:"37.7"},
    {date:"04 Jul 2026",event:"50m Fly",time:"36.0"},
  ]},
  { id:107, name:"Ryan O'Connor", gender:"M", email:"ryan@example.com", block:"Squad", joined:"Jan 2026", paid:true, age:27, level:"Club swimmer", specialty:"IM", bio:"All-rounder aiming to compete in 200m IM at regional masters.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:08.7",split50:"33.5",strokeCount1:19,strokeCount2:22},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:08.1",split50:"33.2",strokeCount1:19,strokeCount2:22},
    {date:"25 Apr 2026",event:"100m Free",time:"1:07.8",split50:"33.0",strokeCount1:19,strokeCount2:22},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:07.5",split50:"32.9",strokeCount1:18,strokeCount2:21},
    {date:"09 May 2026",event:"100m Free",time:"1:06.9",split50:"32.6",strokeCount1:18,strokeCount2:21},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:06.7",split50:"32.5",strokeCount1:18,strokeCount2:21},
    {date:"23 May 2026",event:"100m Free",time:"1:06.3",split50:"32.3",strokeCount1:18,strokeCount2:21},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:05.7",split50:"32.0",strokeCount1:18,strokeCount2:21},
    {date:"06 Jun 2026",event:"100m Free",time:"1:05.2",split50:"31.8",strokeCount1:17,strokeCount2:20},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:04.8",split50:"31.6",strokeCount1:17,strokeCount2:20},
    {date:"20 Jun 2026",event:"100m Free",time:"1:04.5",split50:"31.4",strokeCount1:17,strokeCount2:20},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:04.2",split50:"31.3",strokeCount1:17,strokeCount2:20},
    {date:"04 Jul 2026",event:"100m Free",time:"1:03.6",split50:"31.0",strokeCount1:16,strokeCount2:19},
    {date:"11 Apr 2026",event:"50m Free",time:"31.9"},
    {date:"11 Apr 2026",event:"50m Back",time:"35.5"},
    {date:"11 Apr 2026",event:"50m Breast",time:"41.7"},
    {date:"11 Apr 2026",event:"50m Fly",time:"35.3"},
    {date:"02 May 2026",event:"50m Free",time:"31.4"},
    {date:"02 May 2026",event:"50m Back",time:"34.9"},
    {date:"02 May 2026",event:"50m Breast",time:"41.2"},
    {date:"02 May 2026",event:"50m Fly",time:"34.6"},
    {date:"23 May 2026",event:"50m Free",time:"30.7"},
    {date:"23 May 2026",event:"50m Back",time:"34.1"},
    {date:"23 May 2026",event:"50m Breast",time:"40.5"},
    {date:"23 May 2026",event:"50m Fly",time:"33.8"},
    {date:"13 Jun 2026",event:"50m Free",time:"29.9"},
    {date:"13 Jun 2026",event:"50m Back",time:"33.6"},
    {date:"13 Jun 2026",event:"50m Breast",time:"39.7"},
    {date:"13 Jun 2026",event:"50m Fly",time:"33.5"},
    {date:"04 Jul 2026",event:"50m Free",time:"29.4"},
    {date:"04 Jul 2026",event:"50m Back",time:"33.0"},
    {date:"04 Jul 2026",event:"50m Breast",time:"39.3"},
    {date:"04 Jul 2026",event:"50m Fly",time:"32.8"},
  ]},
  { id:108, name:"Imogen Clarke", gender:"F", email:"imogen@example.com", block:"Squad", joined:"Apr 2026", paid:true, age:31, level:"Recreational", specialty:"Freestyle", bio:"Regular swimmer improving fitness and getting her first competitive time.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:20.3",split50:"39.6",strokeCount1:25,strokeCount2:30},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:19.5",split50:"39.2",strokeCount1:25,strokeCount2:30},
    {date:"25 Apr 2026",event:"100m Free",time:"1:19.1",split50:"39.0",strokeCount1:25,strokeCount2:29},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:18.6",split50:"38.7",strokeCount1:24,strokeCount2:29},
    {date:"09 May 2026",event:"100m Free",time:"1:18.1",split50:"38.5",strokeCount1:24,strokeCount2:29},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:17.7",split50:"38.3",strokeCount1:24,strokeCount2:28},
    {date:"23 May 2026",event:"100m Free",time:"1:17.0",split50:"38.0",strokeCount1:23,strokeCount2:28},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:16.7",split50:"37.8",strokeCount1:23,strokeCount2:28},
    {date:"06 Jun 2026",event:"100m Free",time:"1:16.2",split50:"37.6",strokeCount1:23,strokeCount2:27},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:15.7",split50:"37.3",strokeCount1:22,strokeCount2:27},
    {date:"20 Jun 2026",event:"100m Free",time:"1:15.2",split50:"37.1",strokeCount1:22,strokeCount2:27},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:14.4",split50:"36.7",strokeCount1:22,strokeCount2:26},
    {date:"04 Jul 2026",event:"100m Free",time:"1:14.2",split50:"36.6",strokeCount1:21,strokeCount2:26},
    {date:"11 Apr 2026",event:"50m Free",time:"37.6"},
    {date:"11 Apr 2026",event:"50m Back",time:"41.3"},
    {date:"11 Apr 2026",event:"50m Breast",time:"47.4"},
    {date:"11 Apr 2026",event:"50m Fly",time:"41.9"},
    {date:"02 May 2026",event:"50m Free",time:"36.9"},
    {date:"02 May 2026",event:"50m Back",time:"40.6"},
    {date:"02 May 2026",event:"50m Breast",time:"46.5"},
    {date:"02 May 2026",event:"50m Fly",time:"41.6"},
    {date:"23 May 2026",event:"50m Free",time:"36.2"},
    {date:"23 May 2026",event:"50m Back",time:"39.9"},
    {date:"23 May 2026",event:"50m Breast",time:"46.0"},
    {date:"23 May 2026",event:"50m Fly",time:"40.8"},
    {date:"13 Jun 2026",event:"50m Free",time:"35.4"},
    {date:"13 Jun 2026",event:"50m Back",time:"39.0"},
    {date:"13 Jun 2026",event:"50m Breast",time:"45.0"},
    {date:"13 Jun 2026",event:"50m Fly",time:"40.2"},
    {date:"04 Jul 2026",event:"50m Free",time:"34.7"},
    {date:"04 Jul 2026",event:"50m Back",time:"38.4"},
    {date:"04 Jul 2026",event:"50m Breast",time:"44.0"},
    {date:"04 Jul 2026",event:"50m Fly",time:"39.5"},
  ]},
  { id:109, name:"Ben Adeyemi", gender:"M", email:"ben@example.com", block:"Squad", joined:"Apr 2026", paid:true, age:26, level:"Triathlete", specialty:"Open water", bio:"Triathlete focusing on open water transitions and sighting technique.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:19.0",split50:"38.8",strokeCount1:24,strokeCount2:28},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:18.4",split50:"38.5",strokeCount1:24,strokeCount2:28},
    {date:"25 Apr 2026",event:"100m Free",time:"1:17.6",split50:"38.1",strokeCount1:23,strokeCount2:27},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:17.2",split50:"37.9",strokeCount1:23,strokeCount2:27},
    {date:"09 May 2026",event:"100m Free",time:"1:16.8",split50:"37.7",strokeCount1:23,strokeCount2:27},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:16.0",split50:"37.3",strokeCount1:22,strokeCount2:26},
    {date:"23 May 2026",event:"100m Free",time:"1:15.8",split50:"37.2",strokeCount1:22,strokeCount2:26},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:15.0",split50:"36.8",strokeCount1:22,strokeCount2:26},
    {date:"06 Jun 2026",event:"100m Free",time:"1:14.6",split50:"36.6",strokeCount1:21,strokeCount2:25},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:14.2",split50:"36.4",strokeCount1:21,strokeCount2:25},
    {date:"20 Jun 2026",event:"100m Free",time:"1:13.7",split50:"36.2",strokeCount1:21,strokeCount2:25},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:12.9",split50:"35.8",strokeCount1:20,strokeCount2:24},
    {date:"04 Jul 2026",event:"100m Free",time:"1:12.6",split50:"35.6",strokeCount1:20,strokeCount2:24},
    {date:"11 Apr 2026",event:"50m Free",time:"37.0"},
    {date:"11 Apr 2026",event:"50m Back",time:"40.6"},
    {date:"11 Apr 2026",event:"50m Breast",time:"46.9"},
    {date:"11 Apr 2026",event:"50m Fly",time:"41.4"},
    {date:"02 May 2026",event:"50m Free",time:"36.0"},
    {date:"02 May 2026",event:"50m Back",time:"39.6"},
    {date:"02 May 2026",event:"50m Breast",time:"45.9"},
    {date:"02 May 2026",event:"50m Fly",time:"40.7"},
    {date:"23 May 2026",event:"50m Free",time:"35.3"},
    {date:"23 May 2026",event:"50m Back",time:"39.3"},
    {date:"23 May 2026",event:"50m Breast",time:"45.3"},
    {date:"23 May 2026",event:"50m Fly",time:"40.3"},
    {date:"13 Jun 2026",event:"50m Free",time:"34.6"},
    {date:"13 Jun 2026",event:"50m Back",time:"38.3"},
    {date:"13 Jun 2026",event:"50m Breast",time:"44.3"},
    {date:"13 Jun 2026",event:"50m Fly",time:"39.3"},
    {date:"04 Jul 2026",event:"50m Free",time:"33.9"},
    {date:"04 Jul 2026",event:"50m Back",time:"37.8"},
    {date:"04 Jul 2026",event:"50m Breast",time:"43.4"},
    {date:"04 Jul 2026",event:"50m Fly",time:"38.7"},
  ]},
  { id:110, name:"Natasha Reid", gender:"F", email:"natasha@example.com", block:"Squad", joined:"Mar 2026", paid:true, age:29, level:"Masters", specialty:"Backstroke", bio:"Masters backstroke swimmer. Competed nationally, getting back into form.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:12.4",split50:"35.3",strokeCount1:20,strokeCount2:23},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:12.2",split50:"35.2",strokeCount1:20,strokeCount2:23},
    {date:"25 Apr 2026",event:"100m Free",time:"1:11.4",split50:"34.8",strokeCount1:20,strokeCount2:23},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:11.3",split50:"34.8",strokeCount1:20,strokeCount2:23},
    {date:"09 May 2026",event:"100m Free",time:"1:10.8",split50:"34.6",strokeCount1:19,strokeCount2:22},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:10.3",split50:"34.3",strokeCount1:19,strokeCount2:22},
    {date:"23 May 2026",event:"100m Free",time:"1:09.9",split50:"34.1",strokeCount1:19,strokeCount2:22},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:09.2",split50:"33.8",strokeCount1:19,strokeCount2:22},
    {date:"06 Jun 2026",event:"100m Free",time:"1:09.1",split50:"33.7",strokeCount1:18,strokeCount2:21},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:08.4",split50:"33.4",strokeCount1:18,strokeCount2:21},
    {date:"20 Jun 2026",event:"100m Free",time:"1:08.0",split50:"33.2",strokeCount1:18,strokeCount2:21},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:07.6",split50:"33.0",strokeCount1:18,strokeCount2:21},
    {date:"04 Jul 2026",event:"100m Free",time:"1:07.4",split50:"32.9",strokeCount1:17,strokeCount2:20},
    {date:"11 Apr 2026",event:"50m Free",time:"33.7"},
    {date:"11 Apr 2026",event:"50m Back",time:"37.2"},
    {date:"11 Apr 2026",event:"50m Breast",time:"43.0"},
    {date:"11 Apr 2026",event:"50m Fly",time:"37.4"},
    {date:"02 May 2026",event:"50m Free",time:"33.2"},
    {date:"02 May 2026",event:"50m Back",time:"36.4"},
    {date:"02 May 2026",event:"50m Breast",time:"42.2"},
    {date:"02 May 2026",event:"50m Fly",time:"36.8"},
    {date:"23 May 2026",event:"50m Free",time:"32.5"},
    {date:"23 May 2026",event:"50m Back",time:"35.7"},
    {date:"23 May 2026",event:"50m Breast",time:"41.3"},
    {date:"23 May 2026",event:"50m Fly",time:"36.4"},
    {date:"13 Jun 2026",event:"50m Free",time:"31.7"},
    {date:"13 Jun 2026",event:"50m Back",time:"35.1"},
    {date:"13 Jun 2026",event:"50m Breast",time:"41.0"},
    {date:"13 Jun 2026",event:"50m Fly",time:"35.5"},
    {date:"04 Jul 2026",event:"50m Free",time:"31.2"},
    {date:"04 Jul 2026",event:"50m Back",time:"34.5"},
    {date:"04 Jul 2026",event:"50m Breast",time:"39.9"},
    {date:"04 Jul 2026",event:"50m Fly",time:"35.1"},
  ]},
  { id:111, name:"Tom Whitfield", gender:"M", email:"tomw@example.com", block:"Squad", joined:"Apr 2026", paid:false, age:23, level:"Club swimmer", specialty:"Freestyle", bio:"Recent graduate who swam competitively at university.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:05.8",split50:"32.0",strokeCount1:19,strokeCount2:22},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:05.6",split50:"31.9",strokeCount1:19,strokeCount2:22},
    {date:"25 Apr 2026",event:"100m Free",time:"1:05.2",split50:"31.8",strokeCount1:18,strokeCount2:21},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:04.5",split50:"31.4",strokeCount1:18,strokeCount2:21},
    {date:"09 May 2026",event:"100m Free",time:"1:04.3",split50:"31.3",strokeCount1:18,strokeCount2:21},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:03.8",split50:"31.1",strokeCount1:18,strokeCount2:21},
    {date:"23 May 2026",event:"100m Free",time:"1:03.3",split50:"30.8",strokeCount1:17,strokeCount2:20},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:03.2",split50:"30.8",strokeCount1:17,strokeCount2:20},
    {date:"06 Jun 2026",event:"100m Free",time:"1:02.5",split50:"30.4",strokeCount1:17,strokeCount2:20},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:02.3",split50:"30.3",strokeCount1:17,strokeCount2:20},
    {date:"20 Jun 2026",event:"100m Free",time:"1:01.8",split50:"30.1",strokeCount1:16,strokeCount2:19},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:01.5",split50:"30.0",strokeCount1:16,strokeCount2:19},
    {date:"04 Jul 2026",event:"100m Free",time:"1:01.0",split50:"29.7",strokeCount1:16,strokeCount2:19},
    {date:"11 Apr 2026",event:"50m Free",time:"30.9"},
    {date:"11 Apr 2026",event:"50m Back",time:"34.2"},
    {date:"11 Apr 2026",event:"50m Breast",time:"40.1"},
    {date:"11 Apr 2026",event:"50m Fly",time:"34.9"},
    {date:"02 May 2026",event:"50m Free",time:"30.0"},
    {date:"02 May 2026",event:"50m Back",time:"33.7"},
    {date:"02 May 2026",event:"50m Breast",time:"39.5"},
    {date:"02 May 2026",event:"50m Fly",time:"34.3"},
    {date:"23 May 2026",event:"50m Free",time:"29.4"},
    {date:"23 May 2026",event:"50m Back",time:"33.1"},
    {date:"23 May 2026",event:"50m Breast",time:"39.1"},
    {date:"23 May 2026",event:"50m Fly",time:"33.6"},
    {date:"13 Jun 2026",event:"50m Free",time:"29.0"},
    {date:"13 Jun 2026",event:"50m Back",time:"32.4"},
    {date:"13 Jun 2026",event:"50m Breast",time:"38.3"},
    {date:"13 Jun 2026",event:"50m Fly",time:"33.0"},
    {date:"04 Jul 2026",event:"50m Free",time:"28.3"},
    {date:"04 Jul 2026",event:"50m Back",time:"31.8"},
    {date:"04 Jul 2026",event:"50m Breast",time:"37.8"},
    {date:"04 Jul 2026",event:"50m Fly",time:"32.2"},
  ]},
  { id:112, name:"Fatima Al-Hassan", gender:"F", email:"fatima@example.com", block:"Squad", joined:"Jan 2026", paid:true, age:34, level:"Masters", specialty:"Butterfly", bio:"Masters butterfly swimmer with a water polo background.", benchmarks:[
    {date:"11 Apr 2026",event:"100m Free",time:"1:09.4",split50:"33.9",strokeCount1:18,strokeCount2:21},
    {date:"18 Apr 2026",event:"100m Free",startType:"block",time:"1:09.2",split50:"33.8",strokeCount1:18,strokeCount2:21},
    {date:"25 Apr 2026",event:"100m Free",time:"1:08.6",split50:"33.5",strokeCount1:18,strokeCount2:21},
    {date:"02 May 2026",event:"100m Free",startType:"block",time:"1:08.1",split50:"33.2",strokeCount1:18,strokeCount2:21},
    {date:"09 May 2026",event:"100m Free",time:"1:07.9",split50:"33.1",strokeCount1:17,strokeCount2:20},
    {date:"16 May 2026",event:"100m Free",startType:"block",time:"1:07.1",split50:"32.7",strokeCount1:17,strokeCount2:20},
    {date:"23 May 2026",event:"100m Free",time:"1:06.7",split50:"32.5",strokeCount1:17,strokeCount2:20},
    {date:"30 May 2026",event:"100m Free",startType:"block",time:"1:06.2",split50:"32.3",strokeCount1:17,strokeCount2:20},
    {date:"06 Jun 2026",event:"100m Free",time:"1:05.8",split50:"32.1",strokeCount1:16,strokeCount2:19},
    {date:"13 Jun 2026",event:"100m Free",startType:"block",time:"1:05.3",split50:"31.9",strokeCount1:16,strokeCount2:19},
    {date:"20 Jun 2026",event:"100m Free",time:"1:05.0",split50:"31.7",strokeCount1:16,strokeCount2:19},
    {date:"27 Jun 2026",event:"100m Free",startType:"block",time:"1:04.5",split50:"31.5",strokeCount1:16,strokeCount2:19},
    {date:"04 Jul 2026",event:"100m Free",time:"1:04.4",split50:"31.4",strokeCount1:15,strokeCount2:18},
    {date:"11 Apr 2026",event:"50m Free",time:"32.4"},
    {date:"11 Apr 2026",event:"50m Back",time:"36.2"},
    {date:"11 Apr 2026",event:"50m Breast",time:"41.7"},
    {date:"11 Apr 2026",event:"50m Fly",time:"32.2"},
    {date:"02 May 2026",event:"50m Free",time:"31.7"},
    {date:"02 May 2026",event:"50m Back",time:"35.5"},
    {date:"02 May 2026",event:"50m Breast",time:"41.0"},
    {date:"02 May 2026",event:"50m Fly",time:"31.4"},
    {date:"23 May 2026",event:"50m Free",time:"31.2"},
    {date:"23 May 2026",event:"50m Back",time:"34.9"},
    {date:"23 May 2026",event:"50m Breast",time:"40.7"},
    {date:"23 May 2026",event:"50m Fly",time:"30.8"},
    {date:"13 Jun 2026",event:"50m Free",time:"30.5"},
    {date:"13 Jun 2026",event:"50m Back",time:"34.3"},
    {date:"13 Jun 2026",event:"50m Breast",time:"40.0"},
    {date:"13 Jun 2026",event:"50m Fly",time:"30.3"},
    {date:"04 Jul 2026",event:"50m Free",time:"29.9"},
    {date:"04 Jul 2026",event:"50m Back",time:"33.5"},
    {date:"04 Jul 2026",event:"50m Breast",time:"39.2"},
    {date:"04 Jul 2026",event:"50m Fly",time:"29.8"},
  ]},
];
const SESSIONS_DATA = [
  { id:1,  date:"2026-04-11", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nDrill: 8x50m catch-up @ 1:30\nMain: 8x100m @ 1:20\nSprint: 4x50m all-out\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:2,  date:"2026-04-18", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy + 4x25m build\nDrill: 6x50m fist drill\nMain: 6x100m @ 1:15\nSpeed: 8x25m all-out\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:3,  date:"2026-04-25", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nSighting: 4x200m\nPace: 3x400m aerobic\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:4,  date:"2026-05-02", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nDrill: 8x50m catch-up\nMain: 10x100m @ 1:20\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:5,  date:"2026-05-09", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nMain: 4x200m @ 3:00\nSpeed: 6x50m race pace\nC/D: 300m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:6,  date:"2026-05-16", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nDrill: 6x50m 6-3-6\nMain: 8x100m descend\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:7,  date:"2026-05-23", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 3x400m + 4x50m fast\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:8,  date:"2026-05-30", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nDrill: 4x100m pull\nMain: 6x100m @ 1:15\nSprint: 4x25m max\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:9,  date:"2026-06-06", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 2x800m aerobic\nTechnique: 4x100m drill\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:10, date:"2026-06-13", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nDrill: 8x50m fingertip drag\nMain: 8x100m @ 1:20\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:11, date:"2026-06-20", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 5x200m @ 3:20\nSpeed: 8x25m all-out\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:12, date:"2026-06-27", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nDrill: 6x50m catch-up\nMain: 10x100m @ 1:15\nC/D: 200m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:13, date:"2026-07-04", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nBenchmark: 100m Free time trial (all swimmers)\nDrill: 4x50m technique\nC/D: 300m easy", attendance:{101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true} },
  { id:14, date:"2026-07-11", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 8x100m @ 1:20\nSprint: 6x50m race pace\nC/D: 200m easy", attendance:{} },
  { id:15, date:"2026-07-18", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nDrill: 8x50m fist drill\nMain: 4x200m @ 3:00\nC/D: 200m easy", attendance:{} },
  { id:16, date:"2026-07-25", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 3x400m aerobic\nSpeed: 4x50m max\nC/D: 200m easy", attendance:{} },
];

const INIT = {
  applications: [
    { id:1, name:"Tom Blake",    email:"tom@example.com",   level:"Club swimmer",      message:"Looking to improve my 100m freestyle.", date:"28 Jun 2026", status:"pending" },
    { id:2, name:"Priya Sharma", email:"priya@example.com", level:"Masters",            message:"Targeting county champs in October.",   date:"27 Jun 2026", status:"pending" },
  ],
  members: MEMBERS_DATA,
  sessions: SESSIONS_DATA,
  messages: [],
  // raceResults stored per member via member.raceResults
  hallOfRecords: [
    { id:1,  event:"100m Free",startType:"block",   holder:"James Thornton",   time:"58.4",   gender:"M", date:"27 Jun 2026" },
    { id:2,  event:"200m Free",   holder:"Daniel Park",      time:"2:11.8", gender:"M", date:"27 Jun 2026" },
    { id:3,  event:"50m Free",    holder:"Sarah Okafor",     time:"28.4",   gender:"F", date:"27 Jun 2026" },
    { id:4,  event:"100m Back",   holder:"Chloe Fernandez",  time:"1:04.9", gender:"F", date:"27 Jun 2026" },
    { id:5,  event:"100m Breast", holder:"Amara Diallo",     time:"1:16.9", gender:"F", date:"27 Jun 2026" },
    { id:6,  event:"50m Fly",     holder:"Marcus Webb",      time:"27.6",   gender:"M", date:"27 Jun 2026" },
    { id:7,  event:"100m Fly",    holder:"Fatima Al-Hassan", time:"1:08.4", gender:"F", date:"27 Jun 2026" },
    { id:8,  event:"200m IM",     holder:"Ryan O'Connor",    time:"2:20.8", gender:"M", date:"27 Jun 2026" },
    { id:9,  event:"400m Free",   holder:"Ben Adeyemi",      time:"4:58.2", gender:"M", date:"27 Jun 2026" },
  ],
};

const INDUCTION = {
  etiquette: [
    { title:"Arrive on time", body:"Be poolside and ready to swim at least 5 minutes before the session starts. Lanes are set and briefings begin promptly. Late arrivals disrupt the group." },
    { title:"Cap and goggles are mandatory", body:"You must wear a swimming cap at all sessions. Goggles are strongly recommended. Both must be on before you enter the water." },
    { title:"Know your lane", body:"Lanes are allocated by the coach before each session based on current ability. Do not move lanes without checking with the coach first." },
    { title:"Circle swimming", body:"We always swim anticlockwise in the lane: down the left side, back up the right. If you need to overtake, do so only at the wall and signal your intention by tapping the feet of the swimmer ahead." },
    { title:"Rest at the end walls only", body:"Do not stop mid-lane. Always rest at the wall. Keep the wall clear for incoming swimmers and move to the side immediately on finishing a rep." },
    { title:"Communicate with your lane mates", body:"If you are struggling with a set or need to drop out of a rep, let your lane mates know. Good communication keeps the session safe and efficient for everyone." },
    { title:"No phone poolside", body:"Phones are not permitted on the pool deck during sessions. Keep them in your bag in the changing room." },
    { title:"Respect the equipment", body:"Kickboards, pull buoys, fins and paddles are shared. Rinse and return equipment to the trolley after use. Do not leave kit in the lanes." },
    { title:"Listen to the coach", body:"When the coach is speaking, stop swimming and listen. Technique feedback is given for your benefit. Acknowledge instructions before pushing off." },
    { title:"Illness and injury", body:"If you are unwell or carrying an injury, inform the coach before the session begins. Do not push through pain. The coach will modify your set or advise you to rest." },
  ],
  equipment: [
    { name:"Swimming cap (silicone)", desc:"Mandatory at all sessions. Silicone caps are more durable and comfortable than latex for regular training.", link:"https://swimfasterlondon.com/shop/caps", price:"8-12" },
    { name:"Competition goggles", desc:"A low-profile goggle for speed and clarity. We recommend Swedish-style or racing goggles for pool training.", link:"https://swimfasterlondon.com/shop/goggles", price:"15-35" },
    { name:"Kickboard", desc:"Used in kick sets to isolate leg action. The pool provides these but having your own is recommended for hygiene.", link:"https://swimfasterlondon.com/shop/kickboard", price:"12-18" },
    { name:"Pull buoy", desc:"Placed between the thighs to float the legs during pull sets, isolating arm stroke. Essential for technique work.", link:"https://swimfasterlondon.com/shop/pull-buoy", price:"10-15" },
    { name:"Training fins (short blade)", desc:"Short blade fins build ankle flexibility and leg power. Used in drill sets and kick work. Do not use long scuba fins.", link:"https://swimfasterlondon.com/shop/fins", price:"25-45" },
    { name:"Paddles", desc:"Hand paddles increase resistance and build stroke strength. Start with a smaller paddle to protect shoulders.", link:"https://swimfasterlondon.com/shop/paddles", price:"18-30" },
    { name:"Tempo trainer", desc:"A small metronome worn under the cap to set stroke rate. Advanced tool for race preparation sessions.", link:"https://swimfasterlondon.com/shop/tempo-trainer", price:"35-50" },
    { name:"Swim snorkel", desc:"A centre-mount snorkel allows full focus on stroke mechanics without the breathing pattern. Used in technique sessions.", link:"https://swimfasterlondon.com/shop/snorkel", price:"20-35" },
  ],
};

const DRILLS_DATA = [
  { id:1,  stroke:"Freestyle",    name:"Catch-up drill",                focus:"Timing and stroke length",         desc:"Swim freestyle but keep one arm extended in front until the recovering arm catches up and touches the fingertips before the next pull begins. Develops stroke length and teaches patience at the front of the stroke.", videoUrl:"https://www.youtube.com/embed/m7MeXGRhLrA" },
  { id:2,  stroke:"Freestyle",    name:"Fingertip drag",                focus:"High elbow recovery",              desc:"During the recovery phase, drag your fingertips lightly along the surface of the water from hip to entry. Encourages a high elbow and relaxed arm recovery, preventing over-reach on entry.", videoUrl:"https://www.youtube.com/embed/G5LsGRkuGWo" },
  { id:3,  stroke:"Freestyle",    name:"Fist drill",                    focus:"Forearm catch and feel for water", desc:"Swim with your hands curled into fists. Removes reliance on the palm and forces the forearm to engage in the catch. When you open your hands, the feel for the water is dramatically improved.", videoUrl:"https://www.youtube.com/embed/QaGMNfVUbQo" },
  { id:4,  stroke:"Freestyle",    name:"6-3-6 kick drill",              focus:"Body rotation and balance",        desc:"Take 6 kicks on your side, take 3 strokes, then 6 kicks on the other side. Teaches rotational balance and helps swimmers feel the connection between hip rotation and arm entry.", videoUrl:"https://www.youtube.com/embed/7GNn5zGCHFs" },
  { id:5,  stroke:"Backstroke",   name:"Single arm backstroke",         focus:"High elbow pull and rotation",     desc:"Swim backstroke using one arm only while the other rests at your side or extended overhead. Allows full focus on the catch, pull pattern and hip rotation on one side at a time.", videoUrl:"https://www.youtube.com/embed/MsE9tRB4BPk" },
  { id:6,  stroke:"Backstroke",   name:"Sculling on back",              focus:"Feel for the water and hand pitch", desc:"Float on your back and scull with your hands at your hips, using small figure-of-eight movements to propel yourself head-first. Develops sensitivity to water pressure and efficient hand pitch.", videoUrl:"https://www.youtube.com/embed/NyeWMZfgGrE" },
  { id:7,  stroke:"Backstroke",   name:"Backstroke kick on side",       focus:"Kick technique and ankle flex",    desc:"Lie on your side with the lower arm extended and kick backstroke. Isolates the kick and reveals any imbalance between left and right leg drive. Keep the kick within the body silhouette.", videoUrl:"https://www.youtube.com/embed/4E4PmdNVOVg" },
  { id:8,  stroke:"Breaststroke", name:"2-kicks 1-pull",                focus:"Glide and timing",                 desc:"Perform two breaststroke kicks for every one arm pull. Exaggerates the glide phase and forces swimmers to feel the power of each kick before initiating the pull. Excellent for improving timing.", videoUrl:"https://www.youtube.com/embed/6GEH3JMmSL8" },
  { id:9,  stroke:"Breaststroke", name:"Pull with dolphin kick",        focus:"Upper body mechanics",             desc:"Use the breaststroke arm pull but replace the breaststroke kick with a single dolphin kick on each stroke cycle. Removes timing complexity so you can focus entirely on the pull pattern and hand entry.", videoUrl:"https://www.youtube.com/embed/rA8V01FRDRY" },
  { id:10, stroke:"Breaststroke", name:"Kick on back",                  focus:"Kick symmetry and foot position", desc:"Float on your back with arms at your sides and perform breaststroke kick only. You can see your feet clearly and verify symmetry. Ideal for identifying dropped knees or uneven foot flex.", videoUrl:"https://www.youtube.com/embed/k8f4oDGxLkA" },
  { id:11, stroke:"Butterfly",    name:"Single arm butterfly",          focus:"Catch and pull mechanics",         desc:"Swim butterfly using one arm only while the other arm is extended in front. Allows detailed focus on the catch, pull and push of one arm. Breathe to the side if needed.", videoUrl:"https://www.youtube.com/embed/iSWxhAijMnc" },
  { id:12, stroke:"Butterfly",    name:"3-stroke butterfly to free",    focus:"Rhythm and undulation",            desc:"Take 3 butterfly strokes then switch to 4 freestyle strokes. Gives the body a rest and lets the swimmer feel the contrast in rhythm. Useful for beginners building butterfly stamina.", videoUrl:"https://www.youtube.com/embed/3DMZZ0uGpaU" },
  { id:13, stroke:"Butterfly",    name:"Dolphin kick on side",          focus:"Undulation and core connection",   desc:"Push off the wall on your side and perform dolphin kick underwater. Reveals whether the kick is generating from the hips and core. The kick should undulate through the whole body.", videoUrl:"https://www.youtube.com/embed/8lH5tFGRmv0" },
  { id:14, stroke:"Open Water",   name:"Sighting drill",                focus:"Head position and frequency",      desc:"Swim freestyle and every 6 strokes lift your eyes just above the water line to sight a target, then return to neutral and breathe to the side. Practice sighting without disrupting stroke rhythm.", videoUrl:"https://www.youtube.com/embed/oihlPWlH1Gc" },
  { id:15, stroke:"Open Water",   name:"Bilateral breathing 3-5-7",    focus:"Breathing adaptability",           desc:"Alternate between breathing every 3, 5 and 7 strokes within a single length. Builds adaptability and reduces imbalances caused by always breathing to the same side.", videoUrl:"https://www.youtube.com/embed/IK_NWf3UBxA" },
  { id:16, stroke:"Turns",        name:"Tumble turn progression",       focus:"Flip turn mechanics",              desc:"Break the tumble turn into stages: (1) somersault in open water, (2) somersault approaching wall, (3) feet on wall with push, (4) full turn with streamline. Build each stage before combining.", videoUrl:"https://www.youtube.com/embed/Xt7GHqx9gWQ" },
];

const COACH = { email:"coach@swimfasterlondon.com", password:"coach2026" };
const MEMBERS_AUTH = {
  "james@example.com":  { password:"swim2024",  id:101 },
  "sarah@example.com":  { password:"faster99",  id:102 },
  "marcus@example.com": { password:"marcus123", id:103 },
};

const C = {
  bg:"#0a0a0a", panel:"#111", panel2:"#161616", border:"#1e1e1e",
  red:"#e01a1a", white:"#ffffff", grey:"#888", greyLight:"#bbb",
  greyDark:"#333", green:"#22c55e", amber:"#f59e0b",
};

const BLOCK_COLORS = { "Squad":"#e01a1a" };
const EVENT_COLORS = {
  "100m Free":"#e01a1a", "200m Free":"#f97316", "400m Free":"#eab308",
  "50m Free":"#ec4899",  "100m Back":"#8b5cf6", "50m Back":"#6366f1",
  "100m Breast":"#06b6d4","50m Breast":"#0ea5e9","100m Fly":"#10b981",
  "50m Fly":"#22c55e",   "200m IM":"#a855f7",
};

function toSeconds(t) {
  if (!t) return null;
  const s = String(t).trim();
  if (s.indexOf(":") !== -1) {
    const parts = s.split(":");
    return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
  }
  return parseFloat(s);
}

function fmtTime(s) {
  if (s >= 60) {
    const m = Math.floor(s / 60);
    const sec = (s % 60) < 10 ? "0" + (s % 60).toFixed(1) : (s % 60).toFixed(1);
    return m + ":" + sec;
  }
  return s.toFixed(1);
}

function calcAge(dobStr) {
  if (!dobStr) return null;
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hadBirthdayThisYear = (today.getMonth() > dob.getMonth()) || (today.getMonth()===dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hadBirthdayThisYear) age = age - 1;
  return age;
}

const S = {
  input: { width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit" },
  label: { fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", display:"block", marginBottom:5 },
  btnRed: { background:"#e01a1a", color:"#fff", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" },
  btnGhost: { background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 },
  btnGreen: { background:"#166534", color:"#22c55e", padding:"8px 14px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", border:"1px solid #166534", borderRadius:2, cursor:"pointer" },
  card: { background:"#111", border:"1px solid #1e1e1e", borderRadius:2, padding:"16px", marginBottom:2 },
  eyebrow: { fontSize:10, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#e01a1a", marginBottom:8, display:"block" },
};

function Logo({ height }) {
  const h = height || 36;
  return (
    <div style={{ display:"flex", flexDirection:"column", lineHeight:1, userSelect:"none" }}>
      <span style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:900, fontSize:h*0.52, color:"#fff", letterSpacing:"-0.02em" }}>
        Swim Faster
      </span>
      <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
        <svg width={h*0.85} height={5} viewBox="0 0 50 5">
          <path d="M0 4 Q25 1 50 0" stroke="#e01a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M0 4 Q25 3 50 2" stroke="#e01a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6"/>
        </svg>
        <span style={{ fontFamily:"Arial,sans-serif", fontWeight:700, fontSize:h*0.17, letterSpacing:"0.2em", color:"#fff", textTransform:"uppercase" }}>
          London
        </span>
      </div>
    </div>
  );
}

function Badge({ color, label }) {
  return (
    <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:color, border:"1px solid "+color, padding:"2px 8px", borderRadius:1 }}>
      {label}
    </span>
  );
}

function Avatar({ name, size }) {
  const h = size || 40;
  const initials = name.split(" ").map(function(n){ return n[0]; }).join("").slice(0,2).toUpperCase();
  const color = C.red;
  return (
    <div style={{ width:h, height:h, borderRadius:"50%", background:color+"22", border:"2px solid "+color+"44", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <span style={{ fontSize:h*0.35, fontWeight:700, color:color }}>{initials}</span>
    </div>
  );
}

function BenchmarkChart({ benchmarks, event, color }) {
  const chartColor = color || C.red;
  const [tooltip, setTooltip] = useState(null);

  const pts = benchmarks
    .filter(function(b){ return b.event === event; })
    .map(function(b){ return { date:b.date, time:b.time, secs:toSeconds(b.time) }; })
    .filter(function(b){ return b.secs !== null; })
    .sort(function(a,b){ return new Date(a.date) - new Date(b.date); });

  if (pts.length < 2) {
    return (
      <div style={{ fontSize:12, color:C.grey, padding:"8px 0" }}>
        {pts.length === 1 ? "One result recorded. Add more to see the trend." : ""}
      </div>
    );
  }

  const W = 300, H = 110;
  const PL = 46, PR = 12, PT = 14, PB = 26;
  const cW = W - PL - PR;
  const cH = H - PT - PB;

  const times = pts.map(function(p){ return p.secs; });
  const minT = Math.min.apply(null, times);
  const maxT = Math.max.apply(null, times);
  const rng = maxT - minT || 1;

  const xOf = function(i) { return PL + (i / (pts.length - 1)) * cW; };
  const yOf = function(s) { return PT + ((s - minT) / rng) * cH; };

  const polyPts = pts.map(function(p, i){ return xOf(i) + "," + yOf(p.secs); }).join(" ");

  const fillArr = [xOf(0) + "," + (PT + cH)];
  for (let fi = 0; fi < pts.length; fi++) {
    fillArr.push(xOf(fi) + "," + yOf(pts[fi].secs));
  }
  fillArr.push(xOf(pts.length - 1) + "," + (PT + cH));
  const fillPts = fillArr.join(" ");

  const delta = pts[0].secs - pts[pts.length - 1].secs;
  const improved = delta > 0;
  const gradId = "g" + event.replace(/\W/g, "");

  return (
    <div>
      {Math.abs(delta) > 0.05 && (
        <span style={{ fontSize:11, fontWeight:700, color:improved ? C.green : "#ef4444", background:improved ? "#052e16" : "#2d0a0a", border:"1px solid " + (improved ? "#166534" : "#7f1d1d"), padding:"1px 8px", borderRadius:1, display:"inline-block", marginBottom:8 }}>
          {improved ? "v " : "^ "}{Math.abs(delta).toFixed(1)}s {improved ? "improvement" : "regression"}
        </span>
      )}
      <svg width="100%" viewBox={"0 0 " + W + " " + H} style={{ display:"block", overflow:"visible" }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={chartColor} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[minT, (minT+maxT)/2, maxT].map(function(t, i) {
          return (
            <g key={i}>
              <line x1={PL} y1={yOf(t)} x2={PL+cW} y2={yOf(t)} stroke={C.border} strokeWidth="1" strokeDasharray="3,3"/>
              <text x={PL-4} y={yOf(t)+4} textAnchor="end" fontSize="8" fill={C.grey} fontFamily="monospace">{fmtTime(t)}</text>
            </g>
          );
        })}
        <polygon points={fillPts} fill={"url(#" + gradId + ")"}/>
        <polyline points={polyPts} fill="none" stroke={chartColor} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        {pts.map(function(p, i) {
          return (
            <g key={i}>
              <circle cx={xOf(i)} cy={yOf(p.secs)} r="4" fill={chartColor} stroke={C.bg} strokeWidth="2"/>
              <circle cx={xOf(i)} cy={yOf(p.secs)} r="12" fill="transparent" style={{ cursor:"pointer" }}
                onMouseEnter={function(){ setTooltip({ i:i, p:p, x:xOf(i), y:yOf(p.secs) }); }}
                onMouseLeave={function(){ setTooltip(null); }}/>
              <text x={xOf(i)} y={H-3} textAnchor="middle" fontSize="7" fill={C.grey} fontFamily="system-ui">
                {p.date.split(" ").slice(0,2).join(" ")}
              </text>
            </g>
          );
        })}
        {tooltip && (function(){
          const tx = tooltip.x + (tooltip.x > W * 0.7 ? -68 : 8);
          const ty = Math.max(PT, tooltip.y - 30);
          return (
            <g>
              <rect x={tx} y={ty} width={64} height={32} rx="2" fill={C.panel} stroke={C.border} strokeWidth="1"/>
              <text x={tx+32} y={ty+11} textAnchor="middle" fontSize="8" fill={C.grey} fontFamily="system-ui">{tooltip.p.date}</text>
              <text x={tx+32} y={ty+24} textAnchor="middle" fontSize="12" fill={chartColor} fontWeight="700" fontFamily="monospace">{tooltip.p.time}</text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

function ProgressPanel({ member }) {
  const events = [];
  member.benchmarks.forEach(function(b){
    if (events.indexOf(b.event) === -1) events.push(b.event);
  });
  const [activeEvent, setActiveEvent] = useState(events[0] || "");

  if (member.benchmarks.length === 0) {
    return <p style={{ color:C.greyDark, fontSize:13 }}>No benchmarks yet.</p>;
  }

  const col = EVENT_COLORS[activeEvent] || C.red;

  const filtered = member.benchmarks
    .filter(function(b){ return b.event === activeEvent; })
    .sort(function(a,b){ return new Date(b.date) - new Date(a.date); });

  return (
    <div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
        {events.map(function(ev) {
          const active = activeEvent === ev;
          const evCol = EVENT_COLORS[ev] || C.red;
          return (
            <button key={ev} onClick={function(){ setActiveEvent(ev); }}
              style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 10px", borderRadius:1, border:"1px solid " + (active ? evCol : C.greyDark), background:active ? "rgba(255,255,255,0.05)" : "transparent", color:active ? evCol : C.grey, cursor:"pointer" }}>
              {ev}
            </button>
          );
        })}
      </div>
      <BenchmarkChart benchmarks={member.benchmarks} event={activeEvent} color={col}/>
      <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:1 }}>
        {filtered.map(function(b, i) {
          return (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", background:C.bg, padding:"6px 10px", borderRadius:2 }}>
              <span style={{ fontSize:12, color:C.grey }}>{b.date}</span>
              <strong style={{ color:col, fontSize:13, fontFamily:"monospace" }}>{b.time}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function InductionPage({ acknowledged, onAcknowledge }) {
  const [section, setSection] = useState("welcome");

  const ack = acknowledged || {};

  function accept(key) {
    const next = Object.assign({}, ack);
    next[key] = true;
    if (onAcknowledge) onAcknowledge(next);
  }

  const SECTIONS = [["welcome","Welcome"],["etiquette","Pool Etiquette"],["equipment","Kit List"]];

  return (
    <div>
      <span style={S.eyebrow}>Member Induction</span>
      <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Welcome to Swim Faster London</h2>
      <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Please read each section and confirm you understand what's expected before your first session.</p>

      <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
        {SECTIONS.map(function(t) {
          const active = section === t[0];
          const done = !!ack[t[0]];
          return (
            <button key={t[0]} onClick={function(){ setSection(t[0]); }}
              style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"7px 14px", borderRadius:1, border:"1px solid " + (active ? C.red : (done ? C.green : C.greyDark)), background:active ? "rgba(224,26,26,0.1)" : "transparent", color:active ? C.white : (done ? C.green : C.grey), cursor:"pointer" }}>
              {done && <span>{"\u2713"}</span>}
              {t[1]}
            </button>
          );
        })}
      </div>

      {section === "welcome" && (
        <div>
          <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"20px", marginBottom:16, borderRadius:2 }}>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:12, color:C.white }}>You're in. Here's what happens next.</div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                ["1. Payment confirmed", "Your bank transfer has been received and your place in the squad is secured. You will receive a confirmation email with session details."],
                ["2. Your first session", "Arrive at the pool at least 10 minutes early. Introduce yourself to the coach who will assign you a lane. Bring your kit, a water bottle and your cap and goggles."],
                ["3. Read the etiquette guide", "All swimmers are expected to follow the pool etiquette rules. Please read through the Pool Etiquette section before attending your first session."],
                ["4. Get your kit sorted", "Check the Kit List section for everything you need. Items marked mandatory are required at every session. Optional items are recommended as you progress."],
                ["5. Your member area", "Use the tabs above to view your session plans each week, track your benchmark times and monitor your progress over the block."],
              ].map(function(item) {
                return (
                  <div key={item[0]} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                    <div style={{ width:3, background:C.red, flexShrink:0, alignSelf:"stretch", minHeight:20, borderRadius:2 }}/>
                    <div>
                      <div style={{ fontWeight:700, fontSize:13, color:C.white, marginBottom:3 }}>{item[0]}</div>
                      <div style={{ fontSize:13, color:C.grey, lineHeight:1.65 }}>{item[1]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ background:"#0d2b1a", border:"1px solid #166534", padding:"14px 16px", borderRadius:2, marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.green, marginBottom:4 }}>Questions?</div>
            <div style={{ fontSize:13, color:C.greyLight }}>Contact the coach at <strong>coach@swimfasterlondon.com</strong> - we aim to respond within 24 hours.</div>
          </div>
          {ack.welcome ? (
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px", background:"rgba(34,197,94,0.08)", border:"1px solid "+C.green, borderRadius:2 }}>
              <span style={{ color:C.green, fontWeight:900 }}>{"\u2713"}</span>
              <span style={{ fontSize:13, color:C.green, fontWeight:700 }}>You've confirmed you've read and understood this section.</span>
            </div>
          ) : (
            <button onClick={function(){ accept("welcome"); }} style={{ background:C.red, color:C.white, border:"none", padding:"11px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>
              I've read and understood this
            </button>
          )}
        </div>
      )}

      {section === "etiquette" && (
        <div>
          <div style={{ fontSize:13, color:C.grey, lineHeight:1.7, marginBottom:20, padding:"12px 14px", background:C.panel, borderRadius:2, borderLeft:"3px solid "+C.red }}>
            These rules exist to keep sessions safe, efficient and enjoyable for everyone. All squad members are expected to follow them at every session.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:16 }}>
            {INDUCTION.etiquette.map(function(rule, i) {
              return (
                <div key={i} style={{ background:C.panel, border:"1px solid "+C.border, padding:"16px", borderRadius:2 }}>
                  <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(224,26,26,0.15)", border:"1px solid rgba(224,26,26,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                      <span style={{ fontSize:11, fontWeight:900, color:C.red }}>{i+1}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, marginBottom:5, color:C.white }}>{rule.title}</div>
                      <div style={{ fontSize:13, color:C.grey, lineHeight:1.65 }}>{rule.body}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {ack.etiquette ? (
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px", background:"rgba(34,197,94,0.08)", border:"1px solid "+C.green, borderRadius:2 }}>
              <span style={{ color:C.green, fontWeight:900 }}>{"\u2713"}</span>
              <span style={{ fontSize:13, color:C.green, fontWeight:700 }}>You've confirmed you've read and understood the pool etiquette rules.</span>
            </div>
          ) : (
            <button onClick={function(){ accept("etiquette"); }} style={{ background:C.red, color:C.white, border:"none", padding:"11px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>
              I've read and understood this
            </button>
          )}
        </div>
      )}

      {section === "equipment" && (
        <div>
          <div style={{ fontSize:13, color:C.grey, lineHeight:1.7, marginBottom:20, padding:"12px 14px", background:C.panel, borderRadius:2, borderLeft:"3px solid #f97316" }}>
            Items available in our shop are linked below. Click any item to visit the product page. Prices shown are approximate.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:16 }}>
            {INDUCTION.equipment.map(function(item, i) {
              const mandatory = i < 2;
              return (
                <div key={i} style={{ background:C.panel, border:"1px solid "+C.border, padding:"16px", borderRadius:2 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:8 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{item.name}</div>
                    <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0 }}>
                      {mandatory && <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.red, border:"1px solid "+C.red, padding:"1px 6px", borderRadius:1 }}>Mandatory</span>}
                      <span style={{ fontSize:12, color:C.amber, fontFamily:"monospace", fontWeight:700 }}>{"\u00A3"}{item.price}</span>
                    </div>
                  </div>
                  <div style={{ fontSize:13, color:C.grey, lineHeight:1.65, marginBottom:10 }}>{item.desc}</div>
                  <a href={item.link} target="_blank" rel="noreferrer"
                    style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.amber, textDecoration:"none", border:"1px solid rgba(245,158,11,0.4)", padding:"5px 12px", borderRadius:1, display:"inline-block" }}>
                    Shop now
                  </a>
                </div>
              );
            })}
          </div>
          {ack.equipment ? (
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px", background:"rgba(34,197,94,0.08)", border:"1px solid "+C.green, borderRadius:2 }}>
              <span style={{ color:C.green, fontWeight:900 }}>{"\u2713"}</span>
              <span style={{ fontSize:13, color:C.green, fontWeight:700 }}>You've confirmed you've read and understood the kit requirements.</span>
            </div>
          ) : (
            <button onClick={function(){ accept("equipment"); }} style={{ background:C.red, color:C.white, border:"none", padding:"11px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>
              I've read and understood this
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function DrillLibraryPage({ isCoach, drills, onUpdate }) {
  const strokes = ["All","Freestyle","Backstroke","Breaststroke","Butterfly","Open Water","Turns"];
  const [activeStroke, setActiveStroke] = useState("All");
  const [activeDrill, setActiveDrill] = useState(null);
  const [editingDrill, setEditingDrill] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ stroke:"Freestyle", name:"", focus:"", desc:"", videoUrl:"" });

  const STROKE_COLORS = {
    "Freestyle":"#e01a1a", "Backstroke":"#8b5cf6", "Breaststroke":"#06b6d4",
    "Butterfly":"#10b981", "Open Water":"#3b82f6", "Turns":"#f97316",
  };

  const drillList = drills || DRILLS_DATA;
  const filtered = activeStroke === "All" ? drillList : drillList.filter(function(d){ return d.stroke === activeStroke; });

  function startEdit(drill) {
    setEditingDrill(drill.id);
    setEditForm({ stroke:drill.stroke, name:drill.name, focus:drill.focus, desc:drill.desc, videoUrl:drill.videoUrl });
  }
  function cancelEdit() { setEditingDrill(null); }
  function handleEditField(k, v) { setEditForm(function(f){ const u=Object.assign({},f); u[k]=v; return u; }); }
  function saveEdit() {
    const next = drillList.map(function(d) {
      return d.id === editingDrill ? Object.assign({}, d, editForm) : d;
    });
    if (onUpdate) onUpdate(next);
    setEditingDrill(null);
  }
  function deleteDrill(id) {
    const next = drillList.filter(function(d){ return d.id !== id; });
    if (onUpdate) onUpdate(next);
    setActiveDrill(null);
  }

  function handleAddField(k, v) { setAddForm(function(f){ const u=Object.assign({},f); u[k]=v; return u; }); }
  function toggleAdd() { setShowAdd(!showAdd); }
  function saveAdd() {
    if (!addForm.name.trim()) return;
    const maxId = drillList.reduce(function(m,d){ return d.id>m?d.id:m; }, 0);
    const next = drillList.concat([Object.assign({}, addForm, { id: maxId+1 })]);
    if (onUpdate) onUpdate(next);
    setAddForm({ stroke:"Freestyle", name:"", focus:"", desc:"", videoUrl:"" });
    setShowAdd(false);
  }

  return (
    <div>
      <span style={S.eyebrow}>Reference</span>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
        <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase" }}>Drill Library</h2>
        {isCoach && <button onClick={toggleAdd} style={{ background:"#e01a1a", color:"#fff", padding:"6px 12px", fontWeight:700, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" }}>{showAdd?"Cancel":"+ Add drill"}</button>}
      </div>
      <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>{drillList.length} drills across all strokes. Tap any drill to see the description and video.</p>

      {isCoach && showAdd && (
        <div style={{ background:C.panel, border:"1px solid #3b82f6", padding:16, borderRadius:2, marginBottom:16 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:12 }}>New drill</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <div><label style={S.label}>Stroke</label>
              <select value={addForm.stroke} onChange={function(e){ handleAddField("stroke", e.target.value); }} style={S.input}>
                {["Freestyle","Backstroke","Breaststroke","Butterfly","Open Water","Turns"].map(function(s){ return <option key={s} value={s} style={{background:C.panel}}>{s}</option>; })}
              </select>
            </div>
            <div><label style={S.label}>Drill name</label><input value={addForm.name} onChange={function(e){ handleAddField("name", e.target.value); }} placeholder="e.g. Catch-up drill" style={S.input}/></div>
          </div>
          <div style={{ marginBottom:10 }}>
            <label style={S.label}>Focus</label>
            <input value={addForm.focus} onChange={function(e){ handleAddField("focus", e.target.value); }} placeholder="e.g. Timing and stroke length" style={S.input}/>
          </div>
          <div style={{ marginBottom:10 }}>
            <label style={S.label}>Description</label>
            <textarea value={addForm.desc} onChange={function(e){ handleAddField("desc", e.target.value); }} placeholder="Explain how to perform the drill and what it develops..." rows={3} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical" }}/>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={S.label}>Video URL (YouTube embed link)</label>
            <input value={addForm.videoUrl} onChange={function(e){ handleAddField("videoUrl", e.target.value); }} placeholder="https://www.youtube.com/embed/..." style={S.input}/>
          </div>
          <button onClick={saveAdd} style={S.btnRed}>Save drill</button>
        </div>
      )}

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
        {strokes.map(function(s) {
          const active = activeStroke === s;
          const sc = STROKE_COLORS[s] || C.red;
          return (
            <button key={s} onClick={function(){ setActiveStroke(s); }}
              style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"6px 12px", borderRadius:1, border:"1px solid " + (active ? sc : C.greyDark), background:active ? sc+"22" : "transparent", color:active ? sc : C.grey, cursor:"pointer" }}>
              {s}
            </button>
          );
        })}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {filtered.map(function(drill) {
          const open = activeDrill === drill.id;
          const sc = STROKE_COLORS[drill.stroke] || C.red;
          const isEditing = editingDrill === drill.id;
          return (
            <div key={drill.id} style={{ background:C.panel, border:"1px solid " + (open ? sc+"66" : C.border), borderRadius:2, overflow:"hidden" }}>
              {isEditing ? (
                <div style={{ padding:16 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                    <div><label style={S.label}>Stroke</label>
                      <select value={editForm.stroke} onChange={function(e){ handleEditField("stroke", e.target.value); }} style={S.input}>
                        {["Freestyle","Backstroke","Breaststroke","Butterfly","Open Water","Turns"].map(function(s){ return <option key={s} value={s} style={{background:C.panel}}>{s}</option>; })}
                      </select>
                    </div>
                    <div><label style={S.label}>Drill name</label><input value={editForm.name} onChange={function(e){ handleEditField("name", e.target.value); }} style={S.input}/></div>
                  </div>
                  <div style={{ marginBottom:10 }}>
                    <label style={S.label}>Focus</label>
                    <input value={editForm.focus} onChange={function(e){ handleEditField("focus", e.target.value); }} style={S.input}/>
                  </div>
                  <div style={{ marginBottom:10 }}>
                    <label style={S.label}>Description</label>
                    <textarea value={editForm.desc} onChange={function(e){ handleEditField("desc", e.target.value); }} rows={4} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical" }}/>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={S.label}>Video URL</label>
                    <input value={editForm.videoUrl} onChange={function(e){ handleEditField("videoUrl", e.target.value); }} style={S.input}/>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={saveEdit} style={S.btnRed}>Save</button>
                    <button onClick={cancelEdit} style={S.btnGhost}>Cancel</button>
                    <button onClick={function(){ deleteDrill(drill.id); }} style={{ background:"transparent", border:"1px solid #7f1d1d", color:"#ff6b6b", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, marginLeft:"auto" }}>Delete</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div onClick={function(){ setActiveDrill(open ? null : drill.id); }}
                    style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:3, background:sc, alignSelf:"stretch", flexShrink:0, borderRadius:2, minHeight:20 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                        <span style={{ fontWeight:700, fontSize:14, color:C.white }}>{drill.name}</span>
                        <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:sc, border:"1px solid "+sc+"44", padding:"1px 6px", borderRadius:1 }}>{drill.stroke}</span>
                      </div>
                      <div style={{ fontSize:12, color:C.grey }}>{drill.focus}</div>
                    </div>
                    {isCoach && <button onClick={function(e){ e.stopPropagation(); startEdit(drill); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"4px 10px", fontWeight:700, fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, flexShrink:0 }}>Edit</button>}
                    <div style={{ fontSize:16, color:C.grey, fontWeight:700, flexShrink:0 }}>{open ? "-" : "+"}</div>
                  </div>

                  {open && (
                    <div style={{ borderTop:"1px solid "+C.border }}>
                      <div style={{ padding:"16px", borderBottom:"1px solid "+C.border }}>
                        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:sc, marginBottom:8 }}>Description</div>
                        <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7 }}>{drill.desc}</div>
                      </div>
                      <div style={{ padding:"16px" }}>
                        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:sc, marginBottom:10 }}>Video guide</div>
                        <div style={{ position:"relative", paddingBottom:"56.25%", height:0, overflow:"hidden", borderRadius:2, background:C.bg }}>
                          <iframe
                            src={drill.videoUrl}
                            title={drill.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", border:"none" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


function ProfileField({ label, value }) {
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:14, color:value ? C.white : C.greyDark, lineHeight:1.6 }}>{value || "Not set"}</div>
    </div>
  );
}

function ProfileEditField({ label, value, onChange, type, placeholder, multiline }) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={S.label}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", lineHeight:1.6 }}/>
      ) : (
        <input type={type || "text"} value={value} onChange={onChange} placeholder={placeholder} style={S.input}/>
      )}
    </div>
  );
}

function ProfileTab({ member, raceResults, onUpdate }) {
  const initial = {
    name:          member.name          || "",
    age:           member.age           || "",
    specialty:     member.specialty     || "",
    level:         member.level         || "",
    bio:           member.bio           || "",
    goals:         member.goals         || "",
    competitions:  member.competitions  || "",
    emergencyName: member.emergencyName || "",
    emergencyPhone:member.emergencyPhone|| "",
    medicalNotes:  member.medicalNotes  || "",
    gender:        member.gender         || "",
    nickname:      member.nickname        || "",
  };
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initial);

  function handleFormChange(key, val) {
    setForm(function(f) { const u = Object.assign({}, f); u[key] = val; return u; });
  }
  function handleFormLevel(e) {
    setForm(function(f) { return Object.assign({}, f, { level:e.target.value }); });
  }
  function handleSave() {
    onUpdate(Object.assign({}, member, form, { age: form.age ? parseInt(form.age) : null, nickname: form.nickname || null }));
    setEditing(false);
  }
  function handleCancel() {
    setForm(initial);
    setEditing(false);
  }
  function startEdit() { setEditing(true); }

  const bests = {};
  member.benchmarks.forEach(function(b) {
    if ((b.startType||"push") !== "push") return; // training PBs only
    const s = toSeconds(b.time);
    if (!bests[b.event] || s < bests[b.event].secs) {
      bests[b.event] = { date:b.date, time:b.time, event:b.event, secs:s };
    }
  });
  const raceBests = {};
  (raceResults||[]).forEach(function(r) {
    if (!r.time) return;
    const key = r.distance+" "+r.stroke;
    const s = toSeconds(r.time);
    if (!raceBests[key] || s < raceBests[key].secs) {
      raceBests[key] = { time:r.time, secs:s, venue:r.venue, date:r.date, startType:r.startType };
    }
  });

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
        <Avatar name={member.name} size={56}/>
        <div style={{ flex:1 }}>
          <span style={S.eyebrow}>My Profile</span>
          <h1 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:2 }}>{member.name}</h1>
          <div style={{ fontSize:13, color:C.grey }}>{"Joined "+member.joined}</div>
        </div>
        <button onClick={editing ? handleSave : startEdit} style={{ background:C.red, color:C.white, border:"none", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", padding:"8px 16px", fontSize:11, borderRadius:1 }}>
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      {editing && (
        <div>
          <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"18px", borderRadius:2, marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:14 }}>Personal info</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <ProfileEditField label="Full name" value={form.name} onChange={function(e){ handleFormChange("name",e.target.value); }} placeholder="Your name"/>
              <ProfileEditField label="Age" value={form.age} onChange={function(e){ handleFormChange("age",e.target.value); }} type="number" placeholder="28"/>
            </div>
            <ProfileEditField label="Specialty" value={form.specialty} onChange={function(e){ handleFormChange("specialty",e.target.value); }} placeholder="e.g. Freestyle"/>
            <ProfileEditField label="Nickname / Hall of Fame name" value={form.nickname} onChange={function(e){ handleFormChange("nickname",e.target.value); }} placeholder="e.g. Marc the Shark"/>
            <div style={{ marginBottom:14 }}>
              <label style={S.label}>Level</label>
              <select value={form.level} onChange={handleFormLevel} style={S.input}>
                {["Club swimmer","Masters / competitive","Triathlete / open water","Recreational but serious"].map(function(o) {
                  return <option key={o} value={o} style={{ background:C.panel }}>{o}</option>;
                })}
              </select>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={S.label}>Gender</label>
              <select value={form.gender||""} onChange={function(e){ handleFormChange("gender",e.target.value); }} style={S.input}>
                <option value="" style={{ background:C.panel }}>Select...</option>
                <option value="M" style={{ background:C.panel }}>Male</option>
                <option value="F" style={{ background:C.panel }}>Female</option>
              </select>
            </div>
          </div>
          <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"18px", borderRadius:2, marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:14 }}>About and goals</div>
            <ProfileEditField label="About me" value={form.bio} onChange={function(e){ handleFormChange("bio",e.target.value); }} placeholder="Your swimming background..." multiline={true}/>
            <ProfileEditField label="Goals for this block (one per line)" value={form.goals} onChange={function(e){ handleFormChange("goals",e.target.value); }} placeholder="Goals..." multiline={true}/>
            <ProfileEditField label="Upcoming competitions (one per line)" value={form.competitions} onChange={function(e){ handleFormChange("competitions",e.target.value); }} placeholder="Competitions..." multiline={true}/>
          </div>
          <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"18px", borderRadius:2, marginBottom:12 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:14 }}>Emergency and medical</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <ProfileEditField label="Emergency contact name" value={form.emergencyName} onChange={function(e){ handleFormChange("emergencyName",e.target.value); }} placeholder="Full name"/>
              <ProfileEditField label="Emergency phone" value={form.emergencyPhone} onChange={function(e){ handleFormChange("emergencyPhone",e.target.value); }} placeholder="+44 7700 900000"/>
            </div>
            <ProfileEditField label="Medical notes" value={form.medicalNotes} onChange={function(e){ handleFormChange("medicalNotes",e.target.value); }} placeholder="e.g. Left shoulder impingement" multiline={true}/>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={handleSave} style={S.btnRed}>Save profile</button>
            <button onClick={handleCancel} style={S.btnGhost}>Cancel</button>
          </div>
        </div>
      )}
      {!editing && (
        <div>
          <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"18px", borderRadius:2, marginBottom:2 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:14 }}>Personal info</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
              <ProfileField label="Age" value={member.age ? member.age+" yrs" : null}/>
              <ProfileField label="Level" value={member.level}/>
              <ProfileField label="Specialty" value={member.specialty}/>
            </div>
            {member.bio && (
              <div style={{ marginTop:8, paddingTop:12, borderTop:"1px solid "+C.border }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:6 }}>About</div>
                <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7, fontStyle:"italic" }}>"{member.bio}"</div>
              </div>
            )}
          </div>

          <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"18px", borderRadius:2, marginTop:2, marginBottom:2 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>Goals this block</div>
            {member.goals ? (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {member.goals.split("\n").filter(function(g){ return g.trim(); }).map(function(g,i){
                  return (
                    <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                      <div style={{ width:6, height:6, borderRadius:"50%", background:C.red, flexShrink:0, marginTop:5 }}/>
                      <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>{g.trim()}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize:13, color:C.greyDark }}>No goals set yet. Tap Edit to add some.</div>
            )}
          </div>

          <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"18px", borderRadius:2, marginTop:2, marginBottom:2 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>Upcoming competitions</div>
            {member.competitions ? (
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {member.competitions.split("\n").filter(function(c){ return c.trim(); }).map(function(c,i){
                  return (
                    <div key={i} style={{ display:"flex", gap:12, alignItems:"center", background:C.bg, padding:"10px 12px", borderRadius:2 }}>
                      <div style={{ width:3, background:C.amber, alignSelf:"stretch", borderRadius:2, flexShrink:0, minHeight:20 }}/>
                      <div style={{ fontSize:13, color:C.greyLight }}>{c.trim()}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize:13, color:C.greyDark }}>No competitions listed. Tap Edit to add some.</div>
            )}
          </div>

          {Object.keys(bests).length > 0 && (
            <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"18px", borderRadius:2, marginTop:2, marginBottom:2 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>Training PBs</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:C.border }}>
                {Object.entries(bests).map(function(entry) {
                  const ev = entry[0];
                  const b = entry[1];
                  return (
                    <div key={ev} style={{ background:C.bg, padding:"12px" }}>
                      <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>{ev}</div>
                      <div style={{ fontWeight:900, fontSize:"1.3rem", color:EVENT_COLORS[ev]||C.red, fontFamily:"monospace" }}>{b.time}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(member.prescribedDrills && member.prescribedDrills.length > 0) && (
            <div style={{ background:C.panel, border:"1px solid #1e3a5f", padding:"18px", borderRadius:2, marginTop:2, marginBottom:2 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6", marginBottom:12 }}>
                Your assigned drills ({member.prescribedDrills.length})
              </div>
              <p style={{ fontSize:12, color:C.grey, marginBottom:12, lineHeight:1.5 }}>
                Drills your coach has prescribed. See the Drills tab for full descriptions and videos.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {member.prescribedDrills.map(function(pd) {
                  const drill = DRILLS_DATA.find(function(d){ return d.id === pd.drillId; });
                  if (!drill) return null;
                  const SCOLS = { "Freestyle":"#e01a1a","Backstroke":"#8b5cf6","Breaststroke":"#06b6d4","Butterfly":"#10b981","Open Water":"#3b82f6","Turns":"#f97316" };
                  const sc = SCOLS[drill.stroke] || C.red;
                  return (
                    <div key={pd.drillId} style={{ background:C.bg, padding:"12px 14px", borderRadius:2, border:"1px solid #1e3a5f" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom: pd.note ? 8 : 0 }}>
                        <div style={{ width:3, background:sc, alignSelf:"stretch", borderRadius:2, flexShrink:0, minHeight:16 }}/>
                        <div>
                          <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{drill.name}</div>
                          <div style={{ fontSize:11, color:C.grey }}>{drill.stroke} - {drill.focus}</div>
                        </div>
                      </div>
                      {pd.note && (
                        <div style={{ marginTop:8, padding:"8px 10px", background:"#0d1a2d", borderRadius:2, borderLeft:"2px solid #3b82f6" }}>
                          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6", marginBottom:4 }}>Coach note</div>
                          <div style={{ fontSize:13, color:"#93c5fd", lineHeight:1.6 }}>{pd.note}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {Object.keys(raceBests).length > 0 && (
            <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"18px", borderRadius:2, marginTop:2, marginBottom:2 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6", marginBottom:12 }}>Race PBs</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:C.border }}>
                {Object.entries(raceBests).map(function(entry) {
                  const ev = entry[0];
                  const b = entry[1];
                  return (
                    <div key={ev} style={{ background:C.bg, padding:"12px" }}>
                      <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>{ev}</div>
                      <div style={{ fontWeight:900, fontSize:"1.2rem", color:"#3b82f6", fontFamily:"monospace" }}>{b.time}</div>
                      <div style={{ fontSize:10, color:C.grey, marginTop:2 }}>{b.startType==="block"?"Dive":"Push"} - {b.venue}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {member.emergencyName && (
            <div style={{ background:"#1a1205", border:"1px solid #78350f", padding:"14px 16px", borderRadius:2, marginTop:2 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.amber, marginBottom:8 }}>Emergency contact</div>
              <div style={{ fontSize:13, color:C.greyLight }}>{member.emergencyName} - {member.emergencyPhone}</div>
              {member.medicalNotes && <div style={{ fontSize:12, color:C.grey, marginTop:6, fontStyle:"italic" }}>{member.medicalNotes}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DrillAssignModal({ member, onClose, onSave }) {
  const existing = member.prescribedDrills || [];

  const [selected, setSelected] = useState(
    existing.reduce(function(acc, d) {
      acc[d.drillId] = { assigned: true, note: d.note || "" };
      return acc;
    }, {})
  );

  const strokes = ["All","Freestyle","Backstroke","Breaststroke","Butterfly","Open Water","Turns"];
  const STROKE_COLORS = {
    "Freestyle":"#e01a1a","Backstroke":"#8b5cf6","Breaststroke":"#06b6d4",
    "Butterfly":"#10b981","Open Water":"#3b82f6","Turns":"#f97316",
  };

  const [filterStroke, setFilterStroke] = useState("All");
  const [expandedNote, setExpandedNote] = useState(null);

  const filtered = filterStroke === "All" ? DRILLS_DATA : DRILLS_DATA.filter(function(d) { return d.stroke === filterStroke; });
  const assignedCount = Object.values(selected).filter(function(v) { return v.assigned; }).length;

  function toggleDrill(id) {
    setSelected(function(s) {
      const cur = s[id] || { assigned:false, note:"" };
      const o = Object.assign({}, s); o[id] = { assigned:!cur.assigned, note:cur.note }; return o;
    });
  }

  function setNote(id, note) {
    setSelected(function(s) {
      const cur = s[id] || { assigned:true, note:"" };
      const o2 = Object.assign({}, s); o2[id] = { assigned:cur.assigned, note:note }; return o2;
    });
  }

  function handleFormChange(key, val) {
    setForm(function(f) { const upd = Object.assign({}, f); upd[key] = val; return upd; });
  }
  function handleFormLevel(e) {
    setForm(function(f) { return Object.assign({}, f, { level: e.target.value }); });
  }
  function handleSave() {
    const drills = DRILLS_DATA
      .filter(function(d) { return selected[d.id] && selected[d.id].assigned; })
      .map(function(d) {
        return { drillId:d.id, note: selected[d.id].note || "" };
      });
    onSave(drills);
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, width:"100%", maxWidth:520, maxHeight:"94vh", display:"flex", flexDirection:"column" }}>

        <div style={{ padding:"16px 18px", borderBottom:"1px solid "+C.border, display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexShrink:0 }}>
          <div>
            <span style={S.eyebrow}>Assign drills</span>
            <div style={{ fontWeight:700, fontSize:16 }}>{member.name}</div>
            <div style={{ fontSize:12, color:C.grey, marginTop:2 }}> - {assignedCount} drill{assignedCount!==1?"s":""} assigned</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.grey, fontSize:22, cursor:"pointer", padding:"0 4px" }}>x</button>
        </div>

        <div style={{ padding:"10px 18px", borderBottom:"1px solid "+C.border, flexShrink:0 }}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {strokes.map(function(s) {
              const active = filterStroke === s;
              const sc = STROKE_COLORS[s] || C.red;
              return (
                <button key={s} onClick={function(){ setFilterStroke(s); }}
                  style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 10px", borderRadius:1, border:"1px solid "+(active?sc:C.greyDark), background:active?sc+"22":"transparent", color:active?sc:C.grey, cursor:"pointer" }}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ overflow:"auto", flex:1, padding:"10px 18px" }}>
          {filtered.map(function(drill) {
            const state = selected[drill.id] || { assigned:false, note:"" };
            const sc = STROKE_COLORS[drill.stroke] || C.red;
            const noteOpen = expandedNote === drill.id;

            return (
              <div key={drill.id} style={{ marginBottom:2, background:state.assigned?"#0d1f2d":C.bg, border:"1px solid "+(state.assigned?"#1e3a5f":C.border), borderRadius:2, overflow:"hidden" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", cursor:"pointer" }}
                  onClick={function(){ toggleDrill(drill.id); }}>
                  <div style={{ width:22, height:22, borderRadius:2, border:"2px solid "+(state.assigned?"#3b82f6":C.greyDark), background:state.assigned?"#3b82f6":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {state.assigned && <span style={{ color:"#000", fontSize:13, fontWeight:900, lineHeight:1 }}>OK</span>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:13, color:state.assigned?C.white:C.greyLight, marginBottom:2 }}>{drill.name}</div>
                    <div style={{ fontSize:11, color:C.grey }}>{drill.stroke} - {drill.focus}</div>
                  </div>
                  {state.assigned && (
                    <button
                      onClick={function(e){ e.stopPropagation(); setExpandedNote(noteOpen?null:drill.id); }}
                      style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", background:"none", border:"1px solid "+(noteOpen?"#3b82f6":C.greyDark), color:noteOpen?"#3b82f6":C.grey, padding:"3px 8px", borderRadius:1, cursor:"pointer", flexShrink:0 }}>
                      {state.note ? "Edit note" : "Add note"}
                    </button>
                  )}
                </div>
                {state.assigned && noteOpen && (
                  <div style={{ padding:"0 14px 12px" }}>
                    <textarea
                      value={state.note}
                      onChange={function(e) { setNote(drill.id, e.target.value); }}
                      placeholder={"e.g. Focus on keeping elbow high throughout recovery. Do 2x50m before main set."}
                      rows={3}
                      style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", fontSize:12, resize:"vertical", lineHeight:1.6, borderColor:"#1e3a5f" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ padding:"14px 18px", borderTop:"1px solid "+C.border, display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <span style={{ fontSize:12, color:C.grey }}>{assignedCount} drill{assignedCount!==1?"s":""} selected</span>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={onClose} style={S.btnGhost}>Cancel</button>
            <button onClick={handleSave} style={S.btnRed}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
const MEDAL_COLORS = ["#f59e0b","#9ca3af","#cd7c39"];
const MEDAL_LABELS = ["1st","2nd","3rd"];

function SpeedCoach({ member, targetTime, onSetTarget }) {
  const [inputTarget, setInputTarget] = useState(targetTime || "");
  const [editingTarget, setEditingTarget] = useState(!targetTime);

  const PRINCIPLES = [
    {
      id:1, title:"Stroke rate vs stroke count",
      tagline:"The two levers of speed ' and why you need both.",
      body:"Speed in freestyle is the product of stroke rate (how many strokes per minute) and stroke length (how far you travel per stroke). Most swimmers focus on one at the expense of the other. The goal is to find the optimal combination for your physiology. A high stroke rate with short strokes wastes energy. A long stroke with a low rate loses momentum. Your benchmark data shows your current stroke count per 25m ' we use this to find where you sit on the spectrum.",
      cue:"Count your strokes for one 25m length at race pace. Aim to reduce that count by one stroke while holding the same time.",
      videoUrl:"https://www.youtube.com/embed/7GNn5zGCHFs",
    },
    {
      id:2, title:"Lengthening the stroke",
      tagline:"More distance per stroke means more speed for the same effort.",
      body:"Stroke length is the distance your body travels with each pull. It is improved by three things: a longer reach at entry, a deeper and wider catch, and a full extension through the finish past your hip. Most club swimmers cut their stroke short at the hip, losing the final 20% of propulsion. A longer stroke also gives you a longer glide, which means more rest between efforts.",
      cue:"Drill: catch-up drill. Hold one arm extended until the recovering hand touches the fingertips. Forces you to use the full reach before pulling.",
      videoUrl:"https://www.youtube.com/embed/m7MeXGRhLrA",
    },
    {
      id:3, title:"Chasing speed at the extension",
      tagline:"The front quadrant is where races are won.",
      body:"Elite swimmers swim in the front quadrant ' both hands are always in front of the head at some point during the stroke cycle. This maintains forward momentum and prevents the hips from sinking between strokes. When you delay your pull until the recovering hand passes the head, you eliminate the dead spot in your stroke and maintain a higher average velocity throughout each cycle.",
      cue:"Drill: fingertip drag recovery. Drag your fingertips along the surface during recovery to keep the elbow high and time your entry correctly.",
      videoUrl:"https://www.youtube.com/embed/G5LsGRkuGWo",
    },
    {
      id:4, title:"The catch, the hold, and the finish",
      tagline:"Three distinct phases that most swimmers collapse into one.",
      body:"The pull is not one continuous movement. The catch is the moment your hand anchors in the water ' elbow high, forearm vertical. The hold is the phase where you press back against the water using the full surface area of your hand and forearm together. The finish is the final push past your hip, where your hand accelerates to maximum speed. Missing any phase loses propulsion. Most swimmers rush from catch directly to finish, skipping the hold entirely.",
      cue:"Drill: fist drill. Swim with closed fists so the forearm has to do the work. When you open your hand again, you feel the hold instantly.",
      videoUrl:"https://www.youtube.com/embed/QaGMNfVUbQo",
    },
    {
      id:5, title:"Using the kick to assist the arms",
      tagline:"Your kick is not propulsion ' it is timing and balance.",
      body:"In distance and mid-distance freestyle, the kick exists to balance the rotation, stabilise the hips, and time the power phases. A 6-beat kick (3 kicks per arm stroke) connects the kick to the catch on the opposite side. The downbeat of the left leg fires at the same moment the right hand enters. This creates a full-body power chain. A disconnected kick ' one that is just legs moving independently ' wastes energy and creates drag.",
      cue:"Drill: 6-3-6. Six kicks on your side, three strokes, six kicks on the other side. Feel how the kick and the arm enter together.",
      videoUrl:"https://www.youtube.com/embed/RGTev6CKfW4",
    },
    {
      id:6, title:"Front-end vs back-end speed",
      tagline:"Where do you lose time ' and where do you gain it?",
      body:"Your 50m split reveals everything. If your back 50 is more than 4 seconds slower than your front 50 on a 100m, you are going out too hard or fading on fitness. If your splits are even but your time is slow, the issue is overall speed, not pacing. If your back 50 is faster, you are leaving time in the water at the front. The ideal race profile for a 100m freestyle is a 1-2 second negative split ' back half slightly faster than front.",
      cue:"Target a front 50 that feels controlled. Your back 50 should feel like you are accelerating into the wall, not surviving.",
      videoUrl:"https://www.youtube.com/embed/zFnJeqPInCg",
    },
    {
      id:7, title:"Turns and underwaters",
      tagline:"Up to 30% of a pool race happens underwater.",
      body:"In a 50m pool, a 100m race has one turn. Elite swimmers hold their underwater dolphin kick for 10-15 metres off every wall. Even modest underwater work of 5-7 metres, done with a tight streamline, is faster than any swimmer's surface freestyle. The turn itself ' plant, flip, push ' should be practised as its own skill. A loose or slow turn loses a full second compared to a sharp, compact one.",
      cue:"Drill: push off the wall in a tight streamline, hold your breath, count your dolphin kicks. Try to reach the 5m flag underwater every time.",
      videoUrl:"https://www.youtube.com/embed/Xt7GHqx9gWQ",
    },
  ];

  const free100Benches = member.benchmarks.filter(function(b){ return b.event==="100m Free"; });
  free100Benches.sort(function(a,b){ return new Date(a.date)-new Date(b.date); });

  const latestBench = free100Benches.length > 0 ? free100Benches[free100Benches.length-1] : null;
  const currentSecs = latestBench ? toSeconds(latestBench.time) : null;
  const targetSecs  = targetTime ? toSeconds(targetTime) : null;

  const gapSecs = (currentSecs && targetSecs) ? currentSecs - targetSecs : null;

  function saveTarget() {
    if (!inputTarget.trim()) return;
    onSetTarget(inputTarget.trim());
    setEditingTarget(false);
  }

  function handleTargetInput(e) { setInputTarget(e.target.value); }
  function handleEditTarget() { setEditingTarget(true); }

  function fmt(s) {
    if (s >= 60) { const m=Math.floor(s/60); const sec=s%60; return m+":"+(sec<10?"0":"")+sec.toFixed(1); }
    return s.toFixed(1);
  }

  // Algorithm: analyse the gap and produce ranked recommendations
  function buildAnalysis() {
    if (!gapSecs || gapSecs <= 0 || !latestBench) return null;

    const perLength = gapSecs / 4; // how much to find per 25m
    const split = latestBench.split50 ? toSeconds(latestBench.split50) : null;
    const sc1 = latestBench.strokeCount1 || null;
    const sc2 = latestBench.strokeCount2 || null;

    // Find their best split from all 100m Free benchmarks
    const bestSplit = free100Benches.reduce(function(best, b) {
      if (!b.split50) return best;
      const s = toSeconds(b.split50);
      return (!best || s < best) ? s : best;
    }, null);

    const recommendations = [];

    // 1. Front/back balance
    if (split) {
      const backSplit = currentSecs - split;
      const diff = backSplit - split;
      if (diff > 4) {
        recommendations.push({
          priority:1, area:"Pacing", impact:Math.round(diff * 0.5 * 10)/10,
          headline:"You are going out too fast",
          detail:"Your back 50 (" + fmt(backSplit) + ") is " + diff.toFixed(1) + "s slower than your front 50 (" + latestBench.split50 + "). This is a pacing issue. Slow the front 50 by " + Math.round(diff*0.4*10)/10 + "s and you will likely swim faster overall.",
          principle:6,
        });
      } else if (diff < -2) {
        recommendations.push({
          priority:2, area:"Front-end speed", impact:Math.round(Math.abs(diff)*0.4*10)/10,
          headline:"You have more to give at the front",
          detail:"Your front 50 (" + latestBench.split50 + ") is significantly slower than your back 50 (" + fmt(backSplit) + "). You have untapped speed at the front of the race.",
          principle:6,
        });
      }
    }

    // 2. Stroke count analysis
    if (sc1 && sc2) {
      const avgCount = (sc1 + sc2) / 2;
      const targetCount = Math.max(sc1 - 2, sc2 - 2);
      const strokeSaving = (avgCount - targetCount) * 0.15;
      if (sc2 > sc1 + 2) {
        recommendations.push({
          priority:1, area:"Stroke length", impact:Math.round(strokeSaving * 10)/10,
          headline:"Your stroke shortens significantly in the second 50",
          detail:"1st 50: " + sc1 + " strokes. 2nd 50: " + sc2 + " strokes. A difference of " + (sc2-sc1) + " strokes per length indicates your stroke is collapsing under fatigue. Focus on holding your catch length through the back half.",
          principle:2,
        });
      }
      if (avgCount > 22) {
        recommendations.push({
          priority:2, area:"Stroke length", impact:Math.round((avgCount-20)*0.12*10)/10,
          headline:"Lengthening your stroke will have a large impact",
          detail:"At " + Math.round(avgCount) + " strokes per 25m your stroke is short. Reducing to 20 strokes per length by improving your reach and catch would yield significant time savings without increasing effort.",
          principle:2,
        });
      } else if (avgCount < 16) {
        recommendations.push({
          priority:2, area:"Stroke rate", impact:Math.round(gapSecs*0.3*10)/10,
          headline:"Your stroke is long ' increase your rate",
          detail:"At " + Math.round(avgCount) + " strokes per 25m you have good length. To close the gap to your target, focus on turning your arms over faster rather than lengthening further.",
          principle:1,
        });
      }
    } else if (!sc1 && !sc2) {
      recommendations.push({
        priority:3, area:"Data", impact:null,
        headline:"Add stroke counts to unlock full analysis",
        detail:"Ask your coach to record stroke count for your next 100m Free. With stroke count data the algorithm can give you specific prescriptions for stroke length and rate.",
        principle:1,
      });
    }

    // 3. Overall gap sizing
    if (gapSecs > 8) {
      recommendations.push({
        priority:2, area:"Fitness base", impact:Math.round(gapSecs*0.4*10)/10,
        headline:"Build your aerobic base first",
        detail:"A " + gapSecs.toFixed(1) + "s gap is significant. The fastest gains will come from improving your threshold fitness ' more distance at controlled effort ' before fine-tuning technique.",
        principle:5,
      });
    }

    recommendations.push({
      priority:3, area:"Turns", impact:Math.round(gapSecs*0.15*10)/10,
      headline:"A sharper turn is free speed",
      detail:"In a 50m pool your 100m has one turn. Improving your turn by 1 second requires no extra fitness ' just practice. Work on tighter rotation and a stronger push off the wall with a tight streamline.",
      principle:7,
    });

    // Sort by priority then impact
    recommendations.sort(function(a,b) {
      if (a.priority !== b.priority) return a.priority - b.priority;
      if (b.impact && a.impact) return b.impact - a.impact;
      return 0;
    });

    return {
      gapSecs: gapSecs,
      perLength: perLength,
      split: split,
      sc1: sc1, sc2: sc2,
      recommendations: recommendations,
    };
  }

  const analysis = (currentSecs && targetSecs && gapSecs > 0) ? buildAnalysis() : null;

  const [activeSection, setActiveSection] = useState("gap");
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);

  function setGap()  { setActiveSection("gap"); }
  function setAlgo() { setActiveSection("algo"); }
  function setLearn(){ setActiveSection("learn"); }
  function togglePrinciple(id) { setExpandedPrinciple(expandedPrinciple===id?null:id); }

  const PRIORITY_COLORS = ["","#e01a1a","#f97316","#3b82f6"];
  const PRIORITY_LABELS = ["","High impact","Good gain","Worth doing"];

  return (
    <div>
      <span style={S.eyebrow}>Performance</span>
      <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>How to get faster</h2>
      <p style={{ fontSize:13, color:C.grey, marginBottom:20 }}>Set a target time to unlock your personalised speed plan.</p>

      {/* Target time input */}
      <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16, marginBottom:20 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>Your 100m Free target time</div>
        {editingTarget ? (
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <input value={inputTarget} onChange={handleTargetInput} placeholder="e.g. 58.4 or 1:02.0" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", flex:1, fontFamily:"monospace", fontSize:15 }}/>
            <button onClick={saveTarget} style={S.btnRed}>Set target</button>
          </div>
        ) : (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontWeight:900, fontSize:"2rem", color:C.amber, fontFamily:"monospace" }}>{targetTime}</div>
              {latestBench && (
                <div style={{ fontSize:12, color:C.grey, marginTop:2 }}>
                  Current: <span style={{ color:C.white, fontFamily:"monospace" }}>{latestBench.time}</span>
                  {gapSecs > 0 && <span style={{ color:C.green, marginLeft:8 }}>Gap: {gapSecs.toFixed(1)}s to find</span>}
                </div>
              )}
            </div>
            <button onClick={handleEditTarget} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, fontSize:11, padding:"6px 12px" }}>Change</button>
          </div>
        )}
      </div>

      {targetTime && latestBench && (
        <div>
          {/* Sub-nav */}
          <div style={{ display:"flex", borderBottom:"1px solid "+C.border, marginBottom:20 }}>
            <button onClick={setGap} style={{ background:"none", border:"none", borderBottom:activeSection==="gap"?"2px solid "+C.red:"2px solid transparent", color:activeSection==="gap"?C.white:C.grey, padding:"9px 14px", fontSize:11, fontWeight:activeSection==="gap"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" }}>Your gap</button>
            <button onClick={setAlgo} style={{ background:"none", border:"none", borderBottom:activeSection==="algo"?"2px solid "+C.red:"2px solid transparent", color:activeSection==="algo"?C.white:C.grey, padding:"9px 14px", fontSize:11, fontWeight:activeSection==="algo"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" }}>Speed plan</button>
            <button onClick={setLearn} style={{ background:"none", border:"none", borderBottom:activeSection==="learn"?"2px solid "+C.red:"2px solid transparent", color:activeSection==="learn"?C.white:C.grey, padding:"9px 14px", fontSize:11, fontWeight:activeSection==="learn"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" }}>Principles</button>
          </div>

          {/* YOUR GAP */}
          {activeSection==="gap" && (
            <div>
              <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16, marginBottom:12 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:14 }}>Current vs target</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:C.border, marginBottom:14 }}>
                  <div style={{ background:C.bg, padding:12 }}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Current PB</div>
                    <div style={{ fontWeight:900, fontSize:"1.6rem", color:C.red, fontFamily:"monospace" }}>{latestBench.time}</div>
                    <div style={{ fontSize:11, color:C.grey }}>{latestBench.date}</div>
                  </div>
                  <div style={{ background:C.bg, padding:12 }}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Target time</div>
                    <div style={{ fontWeight:900, fontSize:"1.6rem", color:C.amber, fontFamily:"monospace" }}>{targetTime}</div>
                    <div style={{ fontSize:11, color:C.green }}>-{gapSecs.toFixed(1)}s to find</div>
                  </div>
                </div>

                {/* Per-25m breakdown */}
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>What finding {gapSecs.toFixed(1)}s looks like per 25m</div>
                {[1,2,3,4].map(function(n) {
                  const saving = gapSecs / 4;
                  const currentPerLength = currentSecs / 4;
                  const targetPerLength  = targetSecs  / 4;
                  return (
                    <div key={n} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:n<4?"1px solid "+C.border:"none" }}>
                      <div style={{ fontSize:11, color:C.grey, minWidth:40 }}>L{n} ({(n-1)*25}-{n*25}m)</div>
                      <div style={{ flex:1, position:"relative", height:6, background:C.bg, borderRadius:3, overflow:"hidden" }}>
                        <div style={{ position:"absolute", left:0, top:0, height:"100%", width:"100%", background:C.red, borderRadius:3 }}/>
                        <div style={{ position:"absolute", right:0, top:0, height:"100%", width:((saving/currentPerLength)*100)+"%", background:C.amber, borderRadius:3 }}/>
                      </div>
                      <div style={{ fontSize:11, fontFamily:"monospace", color:C.white, minWidth:36, textAlign:"right" }}>{fmt(targetPerLength)}</div>
                      <div style={{ fontSize:10, color:C.green, minWidth:32, textAlign:"right" }}>-{saving.toFixed(2)}s</div>
                    </div>
                  );
                })}
              </div>

              {/* Split prediction */}
              {latestBench.split50 && (
                <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16, marginBottom:12 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>Target split times</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:C.border }}>
                    <div style={{ background:C.bg, padding:12 }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Current front 50</div>
                      <div style={{ fontWeight:900, fontSize:"1.3rem", color:C.white, fontFamily:"monospace" }}>{latestBench.split50}</div>
                    </div>
                    <div style={{ background:C.bg, padding:12 }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Target front 50</div>
                      <div style={{ fontWeight:900, fontSize:"1.3rem", color:C.amber, fontFamily:"monospace" }}>{fmt(targetSecs/2 + 0.5)}</div>
                    </div>
                    <div style={{ background:C.bg, padding:12 }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Current back 50</div>
                      <div style={{ fontWeight:900, fontSize:"1.3rem", color:C.white, fontFamily:"monospace" }}>{fmt(currentSecs - toSeconds(latestBench.split50))}</div>
                    </div>
                    <div style={{ background:C.bg, padding:12 }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Target back 50</div>
                      <div style={{ fontWeight:900, fontSize:"1.3rem", color:C.amber, fontFamily:"monospace" }}>{fmt(targetSecs/2 - 0.5)}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:11, color:C.grey, marginTop:10, lineHeight:1.6 }}>Target splits assume a slight negative split (back 50 1s faster). Adjust if you prefer even splits.</div>
                </div>
              )}

              {/* Stroke count predictor */}
              {(latestBench.strokeCount1 || latestBench.strokeCount2) && (
                <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>Stroke count to target</div>
                  <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7, marginBottom:12 }}>
                    At {gapSecs.toFixed(1)}s to find, here is what your stroke needs to look like:
                  </div>
                  {[["1st 50", latestBench.strokeCount1], ["2nd 50", latestBench.strokeCount2]].map(function(arr) {
                    if (!arr[1]) return null;
                    const label = arr[0];
                    const current = arr[1];
                    const improvement = Math.ceil(gapSecs / 8);
                    const target = Math.max(current - improvement, 14);
                    return (
                      <div key={label} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid "+C.border }}>
                        <div style={{ fontSize:12, color:C.grey, minWidth:50 }}>{label}</div>
                        <div style={{ fontSize:15, fontFamily:"monospace", color:C.white, minWidth:28 }}>{current}</div>
                        <div style={{ fontSize:11, color:C.grey }}>strokes now</div>
                        <div style={{ flex:1 }}/>
                        <div style={{ fontSize:15, fontFamily:"monospace", color:C.amber, minWidth:28 }}>{target}</div>
                        <div style={{ fontSize:11, color:C.amber }}>strokes target</div>
                      </div>
                    );
                  })}
                  <div style={{ fontSize:11, color:C.grey, marginTop:10, lineHeight:1.6 }}>Fewer strokes per length means more distance per stroke. Focus on a longer reach, a deeper catch, and a full finish past your hip.</div>
                </div>
              )}
            </div>
          )}

          {/* SPEED PLAN */}
          {activeSection==="algo" && (
            <div>
              {!analysis ? (
                <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:20, textAlign:"center" }}>
                  <div style={{ fontSize:13, color:C.grey }}>Add benchmark data (split times and stroke counts) to unlock your personalised speed plan.</div>
                </div>
              ) : (
                <div>
                  <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:14, marginBottom:12 }}>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Algorithm summary</div>
                    <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7 }}>
                      Based on your benchmark data, here are the areas ranked by how much time they are likely to give you. Work from the top down.
                    </div>
                  </div>
                  {analysis.recommendations.map(function(rec, i) {
                    const pc = PRIORITY_COLORS[rec.priority] || C.grey;
                    const pl = PRIORITY_LABELS[rec.priority] || "";
                    return (
                      <div key={i} style={{ background:C.panel, border:"1px solid "+C.border, borderLeft:"3px solid "+pc, borderRadius:2, padding:14, marginBottom:8 }}>
                        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:6 }}>
                          <div>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:pc, marginBottom:3 }}>{pl}{rec.impact?" - up to "+rec.impact+"s":""}</div>
                            <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{rec.headline}</div>
                          </div>
                          <div style={{ fontSize:11, color:C.grey, flexShrink:0 }}>#{i+1}</div>
                        </div>
                        <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7, marginBottom:8 }}>{rec.detail}</div>
                        <button onClick={function(){ setActiveSection("learn"); setExpandedPrinciple(rec.principle); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, fontSize:10, padding:"4px 10px", color:pc, borderColor:pc+"44" }}>Learn: {PRINCIPLES[rec.principle-1] && PRINCIPLES[rec.principle-1].title}</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* PRINCIPLES */}
          {activeSection==="learn" && (
            <div>
              <div style={{ fontSize:13, color:C.grey, lineHeight:1.7, marginBottom:16, padding:"10px 14px", background:C.panel, borderRadius:2, borderLeft:"3px solid "+C.red }}>
                7 principles every freestyle swimmer should understand. Work through them in order or jump to what your speed plan recommends.
              </div>
              {PRINCIPLES.map(function(p) {
                const isOpen = expandedPrinciple===p.id;
                return (
                  <div key={p.id} style={{ background:C.panel, border:"1px solid "+(isOpen?C.red+"66":C.border), borderRadius:2, marginBottom:2, overflow:"hidden" }}>
                    <div onClick={function(){ togglePrinciple(p.id); }} style={{ padding:"13px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:22, height:22, borderRadius:"50%", background:isOpen?"rgba(224,26,26,0.15)":C.bg, border:"1px solid "+(isOpen?C.red:C.greyDark), display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontSize:11, fontWeight:900, color:isOpen?C.red:C.grey }}>{p.id}</span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:14, color:isOpen?C.white:C.greyLight }}>{p.title}</div>
                        <div style={{ fontSize:11, color:C.grey }}>{p.tagline}</div>
                      </div>
                      <div style={{ fontSize:14, color:C.grey, flexShrink:0 }}>{isOpen?"-":"+"}</div>
                    </div>
                    {isOpen && (
                      <div style={{ borderTop:"1px solid "+C.border }}>
                        <div style={{ padding:"14px 16px", borderBottom:"1px solid "+C.border }}>
                          <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.8, marginBottom:14 }}>{p.body}</div>
                          <div style={{ background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"10px 14px" }}>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.green, marginBottom:4 }}>Session cue</div>
                            <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7, fontStyle:"italic" }}>{p.cue}</div>
                          </div>
                        </div>
                        <div style={{ padding:16 }}>
                          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Video guide</div>
                          <div style={{ position:"relative", paddingBottom:"56.25%", height:0, overflow:"hidden", borderRadius:2, background:C.bg }}>
                            <iframe src={p.videoUrl} title={p.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", border:"none" }}/>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {!targetTime && !latestBench && (
        <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"24px 20px", textAlign:"center" }}>
          <div style={{ fontSize:14, color:C.grey, marginBottom:6 }}>No benchmark data yet.</div>
          <div style={{ fontSize:12, color:C.greyDark }}>Your coach will record your 100m Free times after sessions. Come back here once you have at least one benchmark.</div>
        </div>
      )}
    </div>
  );
}

const RACE_EVENTS = [
  { id:1, date:"2026-07-11", name:"Swim England Masters - North West", location:"North West, England", type:"Masters swimming", distances:"All pool events - 50m to 1500m, all strokes", link:"https://www.swimming.org/masters/", deadline:null, org:"Swim England" },
  { id:2, date:"2026-07-12", name:"IRONMAN Wales", location:"Swansea, Wales", type:"IRONMAN", distances:"3.86km swim + 180km bike + 42.2km run", link:"https://www.ironman.com/im-wales", deadline:null, org:"IRONMAN" },
  { id:3, date:"2026-07-12", name:"Swim England Open Water - London", location:"London", type:"Open water", distances:"Various open water distances", link:"https://www.swimming.org/openwater/", deadline:null, org:"Swim England" },
  { id:4, date:"2026-07-18", name:"Swim England Masters - National", location:"National", type:"Masters swimming", distances:"All pool events - 50m to 1500m, all strokes", link:"https://www.swimming.org/masters/", deadline:null, org:"Swim England" },
  { id:5, date:"2026-07-19", name:"Exmouth Aquathlon & Open Water Swim", location:"Exmouth, Devon", type:"Open water", distances:"3km, 1500m, 750m + Sprint Aquathlon", link:"https://sportivaevents.co.uk/open-water-swimming/", deadline:null, org:"Sportiva Events" },
  { id:6, date:"2026-07-25", name:"Swim England Open Water National Age Group Championships", location:"Rother Valley Country Park, South Yorkshire", type:"Open water", distances:"Open water - age group distances", link:"https://www.swimming.org/openwater/open-water-competition-schedule-2026/", deadline:null, org:"Swim England" },
  { id:7, date:"2026-07-26", name:"Swim England Open Water Masters National Championships", location:"Rother Valley Country Park, South Yorkshire", type:"Masters swimming", distances:"Open water - masters distances", link:"https://www.swimming.org/openwater/open-water-competition-schedule-2026/", deadline:null, org:"Swim England" },
  { id:8, date:"2026-07-27", name:"Swim England National Summer Meet (50m)", location:"Ponds Forge International Sports Centre, Sheffield", type:"Masters swimming", distances:"Long course 50m - all events", link:"https://www.swimming.org/sport/swim-england-swimming-competition-schedule-2026/", deadline:null, org:"Swim England" },
  { id:9, date:"2026-08-01", name:"Swim England National Summer Meet - Final Day", location:"Ponds Forge International Sports Centre, Sheffield", type:"Masters swimming", distances:"Long course 50m - finals", link:"https://www.swimming.org/sport/swim-england-swimming-competition-schedule-2026/", deadline:null, org:"Swim England" },
  { id:10, date:"2026-08-01", name:"BLDSA Sandown Bay Swim", location:"Sandown, Isle of Wight", type:"Open water", distances:"1.8 miles (approx 2.9km) - sea swim", link:"https://bldsa.org.uk/", deadline:"31 Jul 2026", org:"BLDSA" },
  { id:11, date:"2026-08-08", name:"Swim England Masters - North West", location:"North West, England", type:"Masters swimming", distances:"All pool events - 50m to 1500m, all strokes", link:"https://www.swimming.org/masters/", deadline:null, org:"Swim England" },
  { id:12, date:"2026-08-16", name:"IRONMAN Copenhagen", location:"Copenhagen, Denmark", type:"IRONMAN", distances:"3.86km swim + 180km bike + 42.2km run", link:"https://www.ironman.com/im-copenhagen", deadline:null, org:"IRONMAN" },
  { id:13, date:"2026-08-29", name:"Wimbleball Lake Open Water Swim", location:"Wimbleball Lake, Somerset", type:"Open water", distances:"5km, 2.5km, 1500m, 750m", link:"https://sportivaevents.co.uk/open-water-swimming/", deadline:null, org:"Sportiva Events" },
  { id:14, date:"2026-09-20", name:"Swim England East Masters Championships", location:"Newmarket Leisure Centre, Newmarket", type:"Masters swimming", distances:"All pool events - 50m to 1500m, all strokes", link:"https://www.eastswimming.org/masters/masters-competitions/", deadline:null, org:"Swim England East" },
  { id:15, date:"2026-09-20", name:"Dawlish Warren Sea Swim", location:"Dawlish Warren, Devon", type:"Open water", distances:"3km, 1500m, 750m", link:"https://sportivaevents.co.uk/open-water-swimming/", deadline:null, org:"Sportiva Events" },
  { id:16, date:"2026-09-27", name:"Poole Harbour Solo Swim", location:"Poole Harbour, Dorset", type:"Open water", distances:"6.5km (4 miles)", link:"https://sportivaevents.co.uk/open-water-swimming/", deadline:null, org:"Sportiva Events" },
  { id:17, date:"2026-10-04", name:"Swim England National County Team Championships", location:"Ponds Forge International Sports Centre, Sheffield", type:"Masters swimming", distances:"All events - team competition", link:"https://www.swimming.org/sport/swim-england-swimming-competition-schedule-2026/", deadline:null, org:"Swim England" },
  { id:18, date:"2026-10-23", name:"Swim England Masters National Championships (25m)", location:"Ponds Forge International Sports Centre, Sheffield", type:"Masters swimming", distances:"Short course 25m - all 17 individual + 5 relay events", link:"https://www.swimming.org/masters/masters-competition-schedule-2026/", deadline:null, org:"Swim England" },
  { id:19, date:"2026-10-25", name:"Swim England Masters Nationals - Final Day", location:"Ponds Forge International Sports Centre, Sheffield", type:"Masters swimming", distances:"Short course 25m - finals", link:"https://www.swimming.org/masters/masters-competition-schedule-2026/", deadline:null, org:"Swim England" },
  { id:20, date:"2026-11-15", name:"Swim England East Region Inter-County Masters", location:"Sportspark, UEA, Norwich", type:"Masters swimming", distances:"Pool - inter-county team event", link:"https://www.eastswimming.org/masters/masters-competitions/", deadline:null, org:"Swim England East" },
  { id:21, date:"2026-12-10", name:"Swim England National Winter Championships (25m)", location:"Ponds Forge International Sports Centre, Sheffield", type:"Masters swimming", distances:"Short course 25m - all events", link:"https://www.swimming.org/sport/swim-england-swimming-competition-schedule-2026/", deadline:null, org:"Swim England" },
  { id:22, date:"2026-12-13", name:"Swim England National Winter Championships - Final Day", location:"Ponds Forge International Sports Centre, Sheffield", type:"Masters swimming", distances:"Short course 25m - finals", link:"https://www.swimming.org/sport/swim-england-swimming-competition-schedule-2026/", deadline:null, org:"Swim England" },
];

const RACE_CATS = ["All events","Masters swimming","Open water","Triathlon","IRONMAN","Other"];

const RACE_TYPE_COLORS = {
  "Masters swimming": "#7c3aed",
  "Open water": "#0ea5e9",
  "Triathlon": "#4ade80",
  "IRONMAN": "#e01a1a",
  "Other": "#6b7280",
};

function fmtRaceDate(dateStr) {
  const d = new Date(dateStr);
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return days[d.getUTCDay()]+" "+d.getUTCDate()+" "+months[d.getUTCMonth()];
}

function raceMonthLabel(dateStr) {
  const d = new Date(dateStr);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return months[d.getUTCMonth()].toUpperCase()+" "+d.getUTCFullYear();
}

function RaceSearch({ member, plannedEvents, onSave, isCoach, allMembers }) {
  const [cat, setCat] = useState("All events");
  const [expanded, setExpanded] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");

  const TODAY_RACE = new Date();

  function handleCat(c) { setCat(c); setExpanded(null); }
  function toggleExpand(id) {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    const existing = (plannedEvents||[]).find(function(p){ return p.eventId===id; });
    setNoteDraft(existing ? existing.note : "");
  }
  function handleNoteDraft(e) { setNoteDraft(e.target.value); }

  function isSignedUp(id) { return (plannedEvents||[]).some(function(p){ return p.eventId===id; }); }

  function swimmersFor(eventId) {
    if (!allMembers) return [];
    const list = [];
    allMembers.forEach(function(m) {
      if (member && m.id === member.id) return;
      (m.plannedEvents||[]).forEach(function(pe) {
        if (pe.eventId === eventId) list.push({ name:m.nickname||m.name.split(" ")[0], note:pe.note });
      });
    });
    return list;
  }

  function toggleSignup(ev) {
    const already = isSignedUp(ev.id);
    if (already) {
      onSave((plannedEvents||[]).filter(function(p){ return p.eventId!==ev.id; }));
    } else {
      const entry = { eventId:ev.id, eventName:ev.name, eventDate:ev.date, note:noteDraft };
      onSave((plannedEvents||[]).concat([entry]));
    }
  }

  function saveNote(ev) {
    const next = (plannedEvents||[]).map(function(p) {
      return p.eventId===ev.id ? Object.assign({}, p, { note:noteDraft }) : p;
    });
    onSave(next);
  }

  const filtered = RACE_EVENTS.filter(function(e) {
    const d = new Date(e.date);
    if (d < TODAY_RACE) return false;
    if (cat === "All events") return true;
    return e.type === cat;
  });

  const groups = [];
  const seenMonths = {};
  filtered.forEach(function(e) {
    const ml = raceMonthLabel(e.date);
    if (!seenMonths[ml]) { seenMonths[ml] = true; groups.push({ label:ml, events:[] }); }
    groups[groups.length-1].events.push(e);
  });

  return (
    <div>
      <span style={S.eyebrow}>{isCoach ? "Squad race calendar" : "Find your next race"}</span>
      <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Race Search</h2>
      <p style={{ fontSize:13, color:C.grey, marginBottom:20 }}>
        {isCoach ? "Upcoming events, and which swimmers are signed up to race them." : "Browse upcoming events and add the ones you're targeting to your profile."}
      </p>

      {isCoach && (plannedEvents && plannedEvents.length > 0) && (
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.amber, marginBottom:10 }}>Squad sign-ups</div>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {plannedEvents.map(function(pe, i) {
              return (
                <div key={i} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"10px 14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{pe.swimmerName}</div>
                      <div style={{ fontSize:12, color:C.grey, marginTop:1 }}>{pe.eventName}</div>
                      <div style={{ fontSize:11, color:C.greyDark, marginTop:1 }}>{pe.eventDate}</div>
                    </div>
                  </div>
                  {pe.note && <div style={{ fontSize:12, color:C.amber, marginTop:6, fontStyle:"italic" }}>{pe.note}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display:"flex", gap:0, overflowX:"auto", marginBottom:20, borderBottom:"1px solid "+C.border }}>
        {RACE_CATS.map(function(c) {
          const active = cat===c;
          return (
            <button key={c} onClick={function(){ handleCat(c); }}
              style={{ background:"none", border:"none", borderBottom:active?"2px solid "+C.red:"2px solid transparent", color:active?C.white:C.grey, padding:"9px 12px 8px", fontSize:11, fontWeight:active?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
              {c}
            </button>
          );
        })}
      </div>

      {filtered.length===0 && (
        <div style={{ padding:"32px 0", textAlign:"center", color:C.greyDark, fontSize:13 }}>No upcoming events in this category.</div>
      )}

      {groups.map(function(g) {
        return (
          <div key={g.label} style={{ marginBottom:24 }}>
            <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.18em", textTransform:"uppercase", color:C.greyDark, marginBottom:10, paddingBottom:6, borderBottom:"1px solid "+C.border }}>{g.label}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {g.events.map(function(ev) {
                const tc = RACE_TYPE_COLORS[ev.type] || RACE_TYPE_COLORS["Other"];
                const isOpen = expanded===ev.id;
                const signedUp = !isCoach && isSignedUp(ev.id);
                return (
                  <div key={ev.id} style={{ background:isOpen?C.panel:C.bg, border:"1px solid "+(isOpen?tc+"66":C.border), borderRadius:2, overflow:"hidden" }}>
                    <div onClick={function(){ toggleExpand(ev.id); }} style={{ padding:"14px 16px", cursor:"pointer" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:11, color:C.greyDark, marginBottom:4 }}>{fmtRaceDate(ev.date)}</div>
                          <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:4, lineHeight:1.3 }}>{ev.name}</div>
                          <div style={{ fontSize:12, color:C.grey }}>{ev.location}</div>
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0 }}>
                          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:tc, border:"1px solid "+tc+"44", padding:"2px 7px", borderRadius:1, whiteSpace:"nowrap" }}>{ev.type}</div>
                          {signedUp && <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.green }}>Signed up</div>}
                          {swimmersFor(ev.id).length > 0 && <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#3b82f6" }}>{swimmersFor(ev.id).length} swimmer{swimmersFor(ev.id).length!==1?"s":""} going</div>}
                          <div style={{ fontSize:13, color:C.grey }}>{isOpen?"-":"+"}</div>
                        </div>
                      </div>
                    </div>

                    {isOpen && (
                      <div style={{ borderTop:"1px solid "+tc+"33", padding:"12px 16px 16px" }}>
                        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
                          {ev.distances && (
                            <div>
                              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.greyDark, marginBottom:3 }}>Distances</div>
                              <div style={{ fontSize:13, color:C.greyLight }}>{ev.distances}</div>
                            </div>
                          )}
                          <div>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.greyDark, marginBottom:3 }}>Organiser</div>
                            <div style={{ fontSize:13, color:C.greyLight }}>{ev.org}</div>
                          </div>
                          {ev.deadline && (
                            <div>
                              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.greyDark, marginBottom:3 }}>Entry deadline</div>
                              <div style={{ fontSize:13, color:C.amber }}>{ev.deadline}</div>
                            </div>
                          )}
                        </div>

                        {swimmersFor(ev.id).length > 0 && (
                          <div style={{ marginBottom:14, background:"#0d1a2d", border:"1px solid #1e3a5f", borderRadius:2, padding:"10px 12px" }}>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6", marginBottom:8 }}>
                              {isCoach ? "Swimmers signed up" : "Also going from the squad"}
                            </div>
                            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                              {swimmersFor(ev.id).map(function(s, i) {
                                return (
                                  <div key={i}>
                                    <span style={{ fontWeight:700, fontSize:13, color:C.white }}>{s.name}</span>
                                    {s.note && <span style={{ fontSize:12, color:"#93c5fd", fontStyle:"italic" }}> - {s.note}</span>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {!isCoach && (
                          <div style={{ marginBottom:12 }}>
                            <label style={{ display:"block", fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.greyDark, marginBottom:6 }}>What are you swimming? (optional)</label>
                            <input value={noteDraft} onChange={handleNoteDraft} placeholder="e.g. 1500m open water, targeting sub-30" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"9px 11px", fontSize:13, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}/>
                          </div>
                        )}

                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          {!isCoach && (
                            <button onClick={function(){ toggleSignup(ev); }} style={{ background:signedUp?"transparent":"#e01a1a", color:signedUp?"#ff6b6b":"#fff", border:signedUp?"1px solid #7f1d1d":"none", padding:"9px 16px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:1, cursor:"pointer" }}>
                              {signedUp ? "Remove from my races" : "I'm swimming this"}
                            </button>
                          )}
                          {!isCoach && signedUp && <button onClick={function(){ saveNote(ev); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"9px 16px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:1, cursor:"pointer" }}>Save note</button>}
                          <a href={ev.link} target="_blank" rel="noreferrer" style={{ display:"inline-block", background:"transparent", border:"1px solid "+tc, color:tc, fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", padding:"9px 16px", borderRadius:1, textDecoration:"none" }}>Official entry</a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{ borderTop:"1px solid "+C.border, paddingTop:16, marginTop:8, fontSize:11, color:C.greyDark, lineHeight:1.7 }}>
        Events sourced from Swim England, IRONMAN, BLDSA and Sportiva Events. Always check official websites for the latest entry information - dates may change.
      </div>
    </div>
  );
}



function RaceReportPage({ member, raceResults:initRaces, onSave }) {
  const EMPTY = {
    id:null, date:"", venue:"", type:"pool", distance:"", stroke:"Freestyle",
    startType:"block", time:"", split50:"", summary:"", conditions:"", goals:""
  };
  const [reports, setReports] = useState(initRaces || []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const TYPES  = ["Pool","Open water","Triathlon","Time trial"];
  const STROKES = ["Freestyle","Backstroke","Breaststroke","Butterfly","IM","Open water"];
  const DISTS  = ["50m","100m","200m","400m","800m","1500m","1km","1.5km","2km","3.8km","Other"];

  function setF(k, v) { setForm(function(f){ const u=Object.assign({},f); u[k]=v; return u; }); }
  function handleType(e)     { setF("type",e.target.value); }
  function handleDist(e)     { setF("distance",e.target.value); }
  function handleStroke(e)   { setF("stroke",e.target.value); }
  function handleStart(e)    { setF("startType",e.target.value); }
  function handleDate(e)     { setF("date",e.target.value); }
  function handleVenue(e)    { setF("venue",e.target.value); }
  function handleTime(e)     { setF("time",e.target.value); }
  function handleSplit(e)    { setF("split50",e.target.value); }
  function handleSummary(e)  { setF("summary",e.target.value); }
  function handleConditions(e){ setF("conditions",e.target.value); }
  function handleGoals(e)    { setF("goals",e.target.value); }

  function openAdd() { setForm(EMPTY); setEditing(null); setShowForm(true); }
  function openEdit(r) { setForm(r); setEditing(r.id); setShowForm(true); }
  function cancelForm() { setShowForm(false); setEditing(null); setForm(EMPTY); }

  function saveForm() {
    if (!form.date || !form.time) return;
    const entry = Object.assign({}, form, { id: editing || Date.now() });
    const next = editing
      ? reports.map(function(r){ return r.id===editing ? entry : r; })
      : [entry].concat(reports);
    setReports(next);
    onSave(next);
    cancelForm();
  }

  function deleteReport(rid) {
    const next = reports.filter(function(r){ return r.id!==rid; });
    setReports(next);
    onSave(next);
  }

  function toggleExpand(rid) { setExpanded(expanded===rid?null:rid); }

  function getProgression(r) {
    const key = r.distance+r.stroke+r.type;
    const all = reports.filter(function(x){ return x.distance+x.stroke+x.type===key && x.time; });
    all.sort(function(a,b){ return a.date.localeCompare(b.date); });
    return all;
  }

  const TYPE_COLORS = { Pool:"#3b82f6", "Open water":"#10b981", Triathlon:"#f97316", "Time trial":"#8b5cf6" };

  return (
    <div>
      <span style={S.eyebrow}>Race log</span>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase" }}>Race Reports</h2>
        {!showForm && <button onClick={openAdd} style={{ background:"#e01a1a", color:"#fff", padding:"8px 14px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" }}>+ Add race</button>}
      </div>

      {showForm && (
        <div style={{ background:C.panel, border:"1px solid #3b82f6", padding:16, borderRadius:2, marginBottom:20 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:14 }}>
            {editing ? "Edit race report" : "New race report"}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <div><label style={S.label}>Date</label><input type="date" value={form.date} onChange={handleDate} style={S.input}/></div>
            <div><label style={S.label}>Venue / event name</label><input value={form.venue} onChange={handleVenue} placeholder="e.g. London Aquatics Centre" style={S.input}/></div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
            <div><label style={S.label}>Type</label>
              <select value={form.type} onChange={handleType} style={S.input}>
                {TYPES.map(function(t){ return <option key={t} value={t} style={{background:C.panel}}>{t}</option>; })}
              </select>
            </div>
            <div><label style={S.label}>Distance</label>
              <select value={form.distance} onChange={handleDist} style={S.input}>
                <option value="" style={{background:C.panel}}>Select...</option>
                {DISTS.map(function(d){ return <option key={d} value={d} style={{background:C.panel}}>{d}</option>; })}
              </select>
            </div>
            <div><label style={S.label}>Stroke</label>
              <select value={form.stroke} onChange={handleStroke} style={S.input}>
                {STROKES.map(function(s){ return <option key={s} value={s} style={{background:C.panel}}>{s}</option>; })}
              </select>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
            <div><label style={S.label}>Time</label><input value={form.time} onChange={handleTime} placeholder="e.g. 58.4 or 1:02.1" style={S.input}/></div>
            <div><label style={S.label}>50m split (if pool)</label><input value={form.split50} onChange={handleSplit} placeholder="e.g. 28.9" style={S.input}/></div>
            <div><label style={S.label}>Start type</label>
              <select value={form.startType} onChange={handleStart} style={S.input}>
                <option value="block" style={{background:C.panel}}>Dive</option>
                <option value="push" style={{background:C.panel}}>Push / in-water</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom:12 }}>
            <label style={S.label}>Goals going in</label>
            <input value={form.goals} onChange={handleGoals} placeholder="e.g. Sub-60s, negative split, strong finish" style={S.input}/>
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={S.label}>Conditions (open water / triathlon)</label>
            <input value={form.conditions} onChange={handleConditions} placeholder="e.g. Choppy, 18C, wetsuit" style={S.input}/>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={S.label}>Race summary</label>
            <textarea value={form.summary} onChange={handleSummary} placeholder={"How did it go? What worked, what did not, what to work on next time..."} rows={4} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", lineHeight:1.6 }}/>
          </div>

          <div style={{ display:"flex", gap:8 }}>
            <button onClick={saveForm} style={S.btnRed}>{editing?"Save changes":"Save report"}</button>
            <button onClick={cancelForm} style={S.btnGhost}>Cancel</button>
          </div>
        </div>
      )}

      {reports.length === 0 && !showForm && (
        <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"32px 20px", textAlign:"center" }}>
          <div style={{ fontSize:14, color:C.grey, marginBottom:8 }}>No race reports yet.</div>
          <div style={{ fontSize:12, color:C.greyDark }}>Log your first race to start tracking your competition progress.</div>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        {reports.map(function(r) {
          const isOpen = expanded === r.id;
          const tc = TYPE_COLORS[r.type] || C.red;
          const progression = getProgression(r);
          const myIdx = progression.findIndex(function(x){ return x.id===r.id; });
          const prev = myIdx > 0 ? progression[myIdx-1] : null;
          const drop = prev ? toSeconds(prev.time) - toSeconds(r.time) : null;

          return (
            <div key={r.id} style={{ background:C.panel, border:"1px solid "+(isOpen?tc+"66":C.border), borderRadius:2, overflow:"hidden" }}>
              <div onClick={function(){ toggleExpand(r.id); }} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:3, background:tc, alignSelf:"stretch", borderRadius:2, flexShrink:0 }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3, flexWrap:"wrap" }}>
                    <span style={{ fontWeight:700, fontSize:14, color:C.white }}>{r.distance} {r.stroke}</span>
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:tc, border:"1px solid "+tc+"44", padding:"1px 6px", borderRadius:1 }}>{r.type}</span>
                    {r.startType==="block" && <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.amber, border:"1px solid "+C.amber+"44", padding:"1px 5px", borderRadius:1 }}>Dive</span>}
                  </div>
                  <div style={{ fontSize:12, color:C.grey }}>{r.venue} - {r.date}</div>
                  {drop !== null && (
                    <div style={{ fontSize:11, color:drop>0?C.green:"#ff6b6b", marginTop:2 }}>
                      {drop>0?"-"+drop.toFixed(1)+"s vs previous":"+"+Math.abs(drop).toFixed(1)+"s vs previous"}
                    </div>
                  )}
                </div>
                <div style={{ fontWeight:900, fontSize:"1.4rem", color:tc, fontFamily:"monospace", flexShrink:0 }}>{r.time}</div>
                <div style={{ fontSize:12, color:C.grey, flexShrink:0 }}>{isOpen?"v":"+"}</div>
              </div>

              {isOpen && (
                <div style={{ borderTop:"1px solid "+C.border }}>
                  {(r.split50 || r.conditions || r.startType) && (
                    <div style={{ padding:"12px 16px", borderBottom:"1px solid "+C.border, display:"flex", gap:10, flexWrap:"wrap" }}>
                      {r.split50 && (
                        <div style={{ background:C.bg, padding:"5px 10px", borderRadius:2 }}>
                          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:2 }}>50m split</div>
                          <div style={{ fontWeight:700, fontSize:13, color:C.white, fontFamily:"monospace" }}>{r.split50}</div>
                        </div>
                      )}
                      <div style={{ background:C.bg, padding:"5px 10px", borderRadius:2 }}>
                        <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:2 }}>Start</div>
                        <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{r.startType==="block"?"Dive":"Push"}</div>
                      </div>
                      {r.conditions && (
                        <div style={{ background:C.bg, padding:"5px 10px", borderRadius:2, flex:1, minWidth:100 }}>
                          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:2 }}>Conditions</div>
                          <div style={{ fontSize:12, color:C.greyLight }}>{r.conditions}</div>
                        </div>
                      )}
                    </div>
                  )}
                  {r.goals && (
                    <div style={{ padding:"10px 16px", borderBottom:"1px solid "+C.border }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Goals going in</div>
                      <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>{r.goals}</div>
                    </div>
                  )}
                  {r.summary && (
                    <div style={{ padding:"10px 16px", borderBottom:"1px solid "+C.border }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Report</div>
                      <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7 }}>{r.summary}</div>
                    </div>
                  )}
                  {progression.length > 1 && (
                    <div style={{ padding:"10px 16px", borderBottom:"1px solid "+C.border }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:8 }}>
                        {r.distance} {r.stroke} progression ({progression.length} races)
                      </div>
                      {progression.map(function(p, pi) {
                        const isCur = p.id===r.id;
                        const pdrop = pi>0 ? toSeconds(progression[pi-1].time)-toSeconds(p.time) : null;
                        return (
                          <div key={p.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"5px 0", borderBottom:pi<progression.length-1?"1px solid "+C.border:"none" }}>
                            <div style={{ fontSize:11, color:C.grey, minWidth:80 }}>{p.date}</div>
                            <div style={{ fontWeight:isCur?900:400, fontSize:14, color:isCur?tc:C.greyLight, fontFamily:"monospace", flex:1 }}>{p.time}</div>
                            {pdrop!==null && <div style={{ fontSize:11, color:pdrop>0?C.green:"#ff6b6b", minWidth:48, textAlign:"right" }}>{pdrop>0?"-":"+"}{Math.abs(pdrop).toFixed(1)}s</div>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div style={{ padding:"10px 16px", display:"flex", gap:8 }}>
                    <button onClick={function(){ openEdit(r); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"6px 12px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>Edit</button>
                    <button onClick={function(){ deleteReport(r.id); }} style={{ background:"transparent", border:"1px solid #7f1d1d", color:"#ff6b6b", padding:"6px 12px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HallOfRecords({ records, members, isCoach, onUpdate, currentMemberId }) {
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addForm, setAddForm] = useState({ event:"100m Free", holder:"", time:"", gender:"M", date:"2026-07-05" });
  const [showAdd, setShowAdd] = useState(false);
  const [expandedRec, setExpandedRec] = useState(null);

  const EVENTS = ["50m Free","100m Free","200m Free","400m Free","50m Back","100m Back","50m Breast","100m Breast","50m Fly","100m Fly","200m IM"];

  function handleEditField(k, v) { setEditForm(function(f){ const u=Object.assign({},f); u[k]=v; return u; }); }
  function handleAddField(k, v)  { setAddForm(function(f){ const u=Object.assign({},f); u[k]=v; return u; }); }
  function startEdit(rec) { setEditing(rec.id); setEditForm({ event:rec.event, holder:rec.holder, time:rec.time, gender:rec.gender||"M", date:rec.date }); }
  function cancelEdit() { setEditing(null); }
  function saveEdit() {
    onUpdate(records.map(function(r){ return r.id===editing ? { id:r.id, event:editForm.event, holder:editForm.holder, time:editForm.time, gender:editForm.gender, date:editForm.date } : r; }));
    setEditing(null);
  }
  function saveAdd() {
    if (!addForm.holder || !addForm.time) return;
    onUpdate(records.concat([{ id:Date.now(), event:addForm.event, holder:addForm.holder, time:addForm.time, gender:addForm.gender, date:addForm.date }]));
    setAddForm({ event:"100m Free", holder:"", time:"", gender:"M", date:"2026-07-05" });
    setShowAdd(false);
  }
  function deleteRecord(rid) { onUpdate(records.filter(function(r){ return r.id!==rid; })); }
  function toggleAdd() { setShowAdd(!showAdd); }

  function parseD(str) {
    if (!str) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(str);
    const mo = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
    const p = str.split(" ");
    return p.length===3 ? new Date(parseInt(p[2]),mo[p[1]],parseInt(p[0])) : null;
  }

  const currentMember = currentMemberId ? (members||[]).find(function(m){ return m.id===currentMemberId; }) : null;
  const currentName = currentMember ? currentMember.name : null;
  const currentGender = currentMember ? (currentMember.gender||"M") : null;

  const free100 = [];
  (members||[]).forEach(function(m) {
    (m.benchmarks||[]).forEach(function(b) {
      if (b.event !== "100m Free") return;
      const d = parseD(b.date);
      free100.push({ name:m.name, display:m.nickname||m.name.split(" ")[0], gender:m.gender||"M", time:b.time, secs:toSeconds(b.time), date:b.date, parsed:d, startType:b.startType||"push" });
    });
  });

  const weekStart = new Date("2026-07-01");
  const weekEnd   = new Date("2026-07-08");
  const thisWeek  = free100.filter(function(e){ return e.parsed && e.parsed>=weekStart && e.parsed<weekEnd; });
  const junEntries = free100.filter(function(e){ return e.parsed && e.parsed.getMonth()===5 && e.parsed.getFullYear()===2026; });
  const weekSource = thisWeek.length > 0 ? thisWeek : junEntries;
  const weekLabel  = thisWeek.length > 0 ? "This week" : "June 2026";

  function topN(arr, g) {
    const byGender = arr.filter(function(e){ return e.gender===g; });
    byGender.sort(function(a,b){ return a.secs-b.secs; });
    const seen = [];
    const result = [];
    byGender.forEach(function(e) {
      if (seen.indexOf(e.name) === -1) { seen.push(e.name); result.push(e); }
    });
    return result;
  }

  const allTopM = topN(weekSource,"M");
  const allTopF = topN(weekSource,"F");

  const currentSpeedEntry = currentName ? (
    currentGender==="M" ? allTopM.find(function(e){ return e.name===currentName; }) :
                          allTopF.find(function(e){ return e.name===currentName; })
  ) : null;
  const currentSpeedRank = currentSpeedEntry ? (
    (currentGender==="M" ? allTopM : allTopF).indexOf(currentSpeedEntry) + 1
  ) : null;

  const weekTopM = allTopM.slice(0,3);
  const weekTopF = allTopF.slice(0,3);

  const blockStart = new Date("2026-01-01");
  const blockEnd   = new Date("2026-08-01");
  const improvements = [];
  (members||[]).forEach(function(m) {
    const entries = free100.filter(function(e){ return e.name===m.name && e.parsed && e.parsed>=blockStart && e.parsed<blockEnd; }).sort(function(a,b){ return a.parsed-b.parsed; });
    if (entries.length < 2) return;
    const drop = entries[0].secs - entries[entries.length-1].secs;
    if (drop > 0) improvements.push({ name:m.name, display:m.nickname||m.name.split(" ")[0], drop:drop, from:entries[0].time, to:entries[entries.length-1].time });
  });
  improvements.sort(function(a,b){ return b.drop-a.drop; });

  const currentImpEntry = currentName ? improvements.find(function(e){ return e.name===currentName; }) : null;
  const currentImpRank  = currentImpEntry ? improvements.indexOf(currentImpEntry)+1 : null;

  const top3Imp = improvements.slice(0,3);

  const MEDAL = ["#f59e0b","#9ca3af","#cd7c39"];

  const menRecs   = records.filter(function(r){ return (r.gender||"M")==="M"; });
  const womenRecs = records.filter(function(r){ return (r.gender||"M")==="F"; });

  function top10ForRecord(rec) {
    const entries = [];
    (members||[]).forEach(function(m) {
      if ((m.gender||"M") !== (rec.gender||"M")) return;
      (m.benchmarks||[]).forEach(function(b) {
        if (b.event !== rec.event) return;
        entries.push({ display:m.nickname||m.name.split(" ")[0], name:m.name, time:b.time, secs:toSeconds(b.time), date:b.date, startType:b.startType||"push" });
      });
    });
    entries.sort(function(a,b){ return a.secs-b.secs; });
    const seen = [];
    const deduped = [];
    entries.forEach(function(e) {
      if (seen.indexOf(e.name)===-1) { seen.push(e.name); deduped.push(e); }
    });
    return deduped.slice(0,10);
  }

  const showSpeedExtra = !!(currentMemberId && currentSpeedEntry && currentSpeedRank > 3);
  const showImpExtra   = !!(currentMemberId && currentImpEntry  && currentImpRank  > 3);

  return (
    <div>
      <span style={S.eyebrow}>Club Records</span>
      <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:20 }}>Hall of Records</h2>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>
          Fastest 100m Free - {weekLabel}
        </div>
        {["M","F"].map(function(g) {
          const top3   = g==="M" ? weekTopM : weekTopF;
          const col    = g==="M" ? "#3b82f6" : "#ec4899";
          const bg     = g==="M" ? "#0d1a2d" : "#2d0a1a";
          const isMine = g===currentGender;
          const myEntry = isMine ? currentSpeedEntry : null;
          const myRank  = isMine ? currentSpeedRank  : null;
          const showExtra = isMine && showSpeedExtra;
          return (
            <div key={g} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, overflow:"hidden", marginBottom:8 }}>
              <div style={{ padding:"8px 12px", background:bg }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:col }}>{g==="M"?"Men":"Women"}</div>
              </div>
              {top3.length===0 ? (
                <div style={{ padding:"12px", fontSize:12, color:C.greyDark }}>No data</div>
              ) : (
                top3.map(function(e,i) {
                  const isCurrent = isMine && e.name===currentName;
                  const gold = isCurrent;
                  return (
                    <div key={i} style={{ padding:"10px 12px", borderTop:"1px solid "+C.border, display:"flex", alignItems:"center", gap:8, background:gold?"rgba(245,158,11,0.08)":"transparent", border:gold?"1px solid #f59e0b":"none" }}>
                      <span style={{ fontSize:11, fontWeight:900, color:MEDAL[i], minWidth:24 }}>{i+1}</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:13, color:gold?"#f59e0b":C.white }}>{e.display}{isCurrent?" (you)":""}</div>
                        <div style={{ fontSize:11, color:C.grey }}>{e.date}</div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <div style={{ fontWeight:900, fontSize:14, color:gold?"#f59e0b":col, fontFamily:"monospace" }}>{e.time}</div>
                        <div style={{ fontSize:10, color:C.grey }}>{e.startType==="block"?"Dive":"Push"}</div>
                      </div>
                    </div>
                  );
                })
              )}
              {showExtra && myEntry && (
                <div style={{ borderTop:"2px dashed "+C.border }}>
                  <div style={{ padding:"10px 12px", display:"flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.08)", border:"1px solid #f59e0b", borderRadius:2, margin:6 }}>
                    <span style={{ fontSize:11, fontWeight:900, color:C.greyDark, minWidth:24 }}>{myRank}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:13, color:"#f59e0b" }}>{myEntry.display} (you)</div>
                      <div style={{ fontSize:11, color:C.grey }}>{myEntry.date}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontWeight:900, fontSize:14, color:"#f59e0b", fontFamily:"monospace" }}>{myEntry.time}</div>
                      <div style={{ fontSize:10, color:C.grey }}>{myEntry.startType==="block"?"Dive":"Push"}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>
          Most improved 100m Free - this block
        </div>
        <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, overflow:"hidden" }}>
          <div style={{ padding:"8px 12px", background:"#052e16" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.green }}>Top improvements</div>
          </div>
          {top3Imp.length===0 ? (
            <div style={{ padding:"14px 12px", fontSize:12, color:C.greyDark }}>Need at least 2 benchmarks per swimmer.</div>
          ) : (
            top3Imp.map(function(e,i) {
              const isCurrent = e.name===currentName;
              const gold = isCurrent;
              return (
                <div key={i} style={{ padding:"12px", borderTop:"1px solid "+C.border, display:"flex", alignItems:"center", gap:10, background:gold?"rgba(245,158,11,0.08)":"transparent", border:gold?"1px solid #f59e0b":"none" }}>
                  <span style={{ fontSize:11, fontWeight:900, color:MEDAL[i], minWidth:24 }}>{i+1}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:13, color:gold?"#f59e0b":C.white }}>{e.display}{isCurrent?" (you)":""}</div>
                    <div style={{ fontSize:11, color:C.grey }}>{e.from} to {e.to}</div>
                  </div>
                  <div style={{ fontWeight:900, fontSize:15, color:C.green, fontFamily:"monospace", flexShrink:0 }}>-{e.drop.toFixed(1)}s</div>
                </div>
              );
            })
          )}
          {showImpExtra && currentImpEntry && (
            <div style={{ borderTop:"2px dashed "+C.border }}>
              <div style={{ padding:"12px", display:"flex", alignItems:"center", gap:10, background:"rgba(245,158,11,0.08)", border:"1px solid #f59e0b", borderRadius:2, margin:6 }}>
                <span style={{ fontSize:11, fontWeight:900, color:C.greyDark, minWidth:24 }}>{currentImpRank}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:13, color:"#f59e0b" }}>{currentImpEntry.display} (you)</div>
                  <div style={{ fontSize:11, color:C.grey }}>{currentImpEntry.from} to {currentImpEntry.to}</div>
                </div>
                <div style={{ fontWeight:900, fontSize:15, color:C.green, fontFamily:"monospace", flexShrink:0 }}>-{currentImpEntry.drop.toFixed(1)}s</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey }}>All-time club records</div>
          {isCoach && <button onClick={toggleAdd} style={{ background:"#e01a1a", color:"#fff", padding:"6px 12px", fontWeight:700, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" }}>{showAdd?"Cancel":"+ Add"}</button>}
        </div>

        {isCoach && showAdd && (
          <div style={{ background:C.panel, border:"1px solid #3b82f6", padding:14, borderRadius:2, marginBottom:12 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6", marginBottom:12 }}>New record</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <div><label style={S.label}>Event</label>
                <select value={addForm.event} onChange={function(e){ handleAddField("event",e.target.value); }} style={S.input}>
                  {EVENTS.map(function(ev){ return <option key={ev} value={ev} style={{background:C.panel}}>{ev}</option>; })}
                </select>
              </div>
              <div><label style={S.label}>Gender</label>
                <select value={addForm.gender} onChange={function(e){ handleAddField("gender",e.target.value); }} style={S.input}>
                  <option value="M" style={{background:C.panel}}>Male</option>
                  <option value="F" style={{background:C.panel}}>Female</option>
                </select>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
              <div><label style={S.label}>Holder</label><input value={addForm.holder} onChange={function(e){ handleAddField("holder",e.target.value); }} placeholder="Name" style={S.input}/></div>
              <div><label style={S.label}>Time</label><input value={addForm.time} onChange={function(e){ handleAddField("time",e.target.value); }} placeholder="58.4" style={S.input}/></div>
              <div><label style={S.label}>Date</label><input type="date" value={addForm.date} onChange={function(e){ handleAddField("date",e.target.value); }} style={S.input}/></div>
            </div>
            <button onClick={saveAdd} style={S.btnRed}>Save</button>
          </div>
        )}

        {[["M","Men","#3b82f6","#0d1a2d",menRecs],["F","Women","#ec4899","#2d0a1a",womenRecs]].map(function(grp) {
          const gKey = grp[0];
          const gLabel = grp[1];
          const gCol = grp[2];
          const gBg = grp[3];
          const recs = grp[4];
          return (
            <div key={gKey} style={{ marginTop:gKey==="F"?16:0 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:gCol, padding:"6px 10px", background:gBg, borderRadius:2, marginBottom:6 }}>{gLabel}</div>
              {recs.length===0 && <div style={{ fontSize:13, color:C.greyDark, padding:"8px 12px", marginBottom:8 }}>No records yet.</div>}
              {recs.map(function(rec) {
                const evCol = EVENT_COLORS[rec.event]||C.red;
                const isOpen = expandedRec===rec.id;
                return (
                  <div key={rec.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, marginBottom:2 }}>
                    {editing===rec.id ? (
                      <div style={{ padding:12 }}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                          <div><label style={S.label}>Event</label>
                            <select value={editForm.event} onChange={function(e){ handleEditField("event",e.target.value); }} style={S.input}>
                              {EVENTS.map(function(ev){ return <option key={ev} value={ev} style={{background:C.panel}}>{ev}</option>; })}
                            </select>
                          </div>
                          <div><label style={S.label}>Gender</label>
                            <select value={editForm.gender} onChange={function(e){ handleEditField("gender",e.target.value); }} style={S.input}>
                              <option value="M" style={{background:C.panel}}>Male</option>
                              <option value="F" style={{background:C.panel}}>Female</option>
                            </select>
                          </div>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:12 }}>
                          <div><label style={S.label}>Holder</label><input value={editForm.holder} onChange={function(e){ handleEditField("holder",e.target.value); }} style={S.input}/></div>
                          <div><label style={S.label}>Time</label><input value={editForm.time} onChange={function(e){ handleEditField("time",e.target.value); }} style={S.input}/></div>
                          <div><label style={S.label}>Date</label><input type="date" value={editForm.date} onChange={function(e){ handleEditField("date",e.target.value); }} style={S.input}/></div>
                        </div>
                        <div style={{ display:"flex", gap:8 }}>
                          <button onClick={saveEdit} style={S.btnRed}>Save</button>
                          <button onClick={cancelEdit} style={S.btnGhost}>Cancel</button>
                          <button onClick={function(){ deleteRecord(rec.id); }} style={{ background:"transparent", border:"1px solid #7f1d1d", color:"#ff6b6b", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, marginLeft:"auto" }}>Delete</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div onClick={function(){ setExpandedRec(isOpen?null:rec.id); }} style={{ padding:"10px 12px", display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                          <div style={{ width:3, background:evCol, alignSelf:"stretch", borderRadius:2, flexShrink:0 }}/>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:evCol }}>{rec.event}</div>
                            <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{rec.holder}</div>
                            <div style={{ fontSize:11, color:C.grey }}>{rec.date}</div>
                          </div>
                          <div style={{ fontWeight:900, fontSize:15, color:C.white, fontFamily:"monospace", flexShrink:0 }}>{rec.time}</div>
                          <div style={{ fontSize:11, color:C.grey, flexShrink:0 }}>{isOpen?"v":"+"}</div>
                          {isCoach && <button onClick={function(e){ e.stopPropagation(); startEdit(rec); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"4px 8px", fontWeight:700, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, flexShrink:0 }}>Edit</button>}
                        </div>
                        {isOpen && (function(){
                          const top10 = top10ForRecord(rec);
                          return (
                            <div style={{ borderTop:"1px solid "+C.border, background:C.bg, padding:"8px 12px" }}>
                              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:evCol, marginBottom:8 }}>Top 10 - {rec.event}</div>
                              {top10.length===0 && <div style={{ fontSize:12, color:C.greyDark }}>No times recorded.</div>}
                              {top10.map(function(e,i){
                                const mc = ["#f59e0b","#9ca3af","#cd7c39"];
                                return (
                                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom:i<top10.length-1?"1px solid "+C.border:"none" }}>
                                    <div style={{ fontSize:11, fontWeight:700, color:i<3?mc[i]:C.greyDark, minWidth:20, textAlign:"right" }}>{i+1}</div>
                                    <div style={{ flex:1, fontSize:13, color:i===0?C.white:C.greyLight, fontWeight:i===0?700:400 }}>{e.display}</div>
                                    <div style={{ fontSize:13, fontFamily:"monospace", color:i===0?evCol:C.greyLight, fontWeight:i===0?900:400, flexShrink:0 }}>{e.time}</div>
                                    <div style={{ fontSize:10, color:C.grey, flexShrink:0 }}>{e.startType==="block"?"Dive":"Push"}</div>
                                    <div style={{ fontSize:10, color:C.grey, minWidth:55, textAlign:"right", flexShrink:0 }}>{e.date}</div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}


function MessagesPage({ currentUserId, currentUserName, isCoach, messages, members, onSend }) {
  const [draft, setDraft] = useState("");
  const [channel, setChannel] = useState("board");
  const [showThreadList, setShowThreadList] = useState(true);
  const [seenCounts, setSeenCounts] = useState({});

  function handleDraft(e) { setDraft(e.target.value); }

  function threadKey(idA, idB) {
    const pair = [String(idA), String(idB)].sort();
    return "dm:"+pair[0]+":"+pair[1];
  }

  // Only current squad members (approved or legacy/undefined status) can appear or be messaged
  const currentMembers = (members||[]).filter(function(m) { return m.memberStatus !== "pending" && m.memberStatus !== "rejected"; });

  const people = currentMembers.map(function(m) {
    return { id: m.id, name: m.nickname||m.name.split(" ")[0], isCoach:false };
  }).filter(function(p){ return String(p.id) !== String(currentUserId); });
  const peopleWithCoach = isCoach ? people : [{ id:"COACH", name:"Coach", isCoach:true }].concat(people);

  function send() {
    if (!draft.trim()) return;
    const chan = channel === "board" ? "board" : threadKey(currentUserId, channel);
    const msg = {
      id: Date.now(),
      channel: chan,
      senderId: currentUserId,
      senderName: currentUserName,
      isCoach: !!isCoach,
      text: draft.trim(),
      timestamp: new Date().toISOString(),
    };
    onSend((messages||[]).concat([msg]));
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function fmtTimestamp(iso) {
    const d = new Date(iso);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    const time = d.getHours()+":"+(d.getMinutes()<10?"0":"")+d.getMinutes();
    if (sameDay) return time;
    return d.getDate()+"/"+(d.getMonth()+1)+" "+time;
  }

  // Only messages from people still on the current squad are visible (board and DMs)
  const currentIds = currentMembers.map(function(m){ return String(m.id); });
  function senderStillCurrent(m) {
    if (m.isCoach) return true;
    return currentIds.indexOf(String(m.senderId)) !== -1;
  }

  const allVisibleMessages = (messages||[]).filter(senderStillCurrent);

  const activeChannelKey = channel === "board" ? "board" : threadKey(currentUserId, channel);
  const visible = allVisibleMessages.filter(function(m) { return (m.channel||"board") === activeChannelKey; });
  const sorted = visible.slice().sort(function(a,b){ return new Date(a.timestamp)-new Date(b.timestamp); });

  function chanCountFromOthers(chanKey) {
    return allVisibleMessages.filter(function(m){ return (m.channel||"board")===chanKey && String(m.senderId)!==String(currentUserId); }).length;
  }

  function unreadForChannel(chanKey) {
    const total = chanCountFromOthers(chanKey);
    const seen = seenCounts[chanKey] || 0;
    return total > seen;
  }

  function unreadFor(personId) {
    return unreadForChannel(threadKey(currentUserId, personId));
  }

  function lastMessageFor(chanKey) {
    const msgs = allVisibleMessages.filter(function(m){ return (m.channel||"board")===chanKey; });
    if (msgs.length===0) return null;
    return msgs.slice().sort(function(a,b){ return new Date(b.timestamp)-new Date(a.timestamp); })[0];
  }

  function openThread(ch) {
    const chanKey = ch === "board" ? "board" : threadKey(currentUserId, ch);
    setSeenCounts(function(prev) {
      const next = Object.assign({}, prev);
      next[chanKey] = chanCountFromOthers(chanKey);
      return next;
    });
    setChannel(ch);
    setShowThreadList(false);
  }
  function backToList() { setShowThreadList(true); }

  const activePerson = channel==="board" ? null : peopleWithCoach.find(function(p){ return p.id===channel; });

  const threadItems = [{ id:"board", isBoard:true, name:"Squad Group", isCoach:false }].concat(
    peopleWithCoach.map(function(p) { return { id:p.id, isBoard:false, name:p.name, isCoach:p.isCoach }; })
  ).map(function(t) {
    const chanKey = t.isBoard ? "board" : threadKey(currentUserId, t.id);
    const last = lastMessageFor(chanKey);
    return Object.assign({}, t, { last: last, sortTime: last ? new Date(last.timestamp).getTime() : -1 });
  });

  const sortedThreads = threadItems.slice().sort(function(a, b) {
    if (a.sortTime === -1 && b.sortTime === -1) return 0;
    return b.sortTime - a.sortTime;
  });

  return (
    <div style={{ marginLeft:-20, marginRight:-20, marginTop:-24 }}>
      {showThreadList ? (
        <div>
          <div style={{ padding:"20px 20px 12px" }}>
            <span style={S.eyebrow}>Messages</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase" }}>Messages</h2>
          </div>

          <div style={{ display:"flex", flexDirection:"column" }}>
            {sortedThreads.map(function(t) {
              if (t.isBoard) {
                return (
                  <div key="board" onClick={function(){ openThread("board"); }} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 20px", borderBottom:"1px solid "+C.border, cursor:"pointer" }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:C.red, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontWeight:900, fontSize:16, color:"#fff" }}>SQ</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                        <div style={{ fontWeight:700, fontSize:15, color:C.white }}>Squad Group</div>
                        {t.last && <div style={{ fontSize:11, color:C.greyDark, flexShrink:0 }}>{fmtTimestamp(t.last.timestamp)}</div>}
                      </div>
                      <div style={{ fontSize:13, color:C.grey, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                        {t.last ? t.last.senderName+": "+t.last.text : "Everyone in the squad can see this"}
                      </div>
                    </div>
                    {unreadForChannel("board") && <div style={{ width:9, height:9, borderRadius:"50%", background:C.red, flexShrink:0 }}/>}
                  </div>
                );
              }
              const p = t;
              const last = t.last;
              const unread = unreadFor(p.id);
              const initials = p.name.split(" ").map(function(w){ return w[0]; }).join("").slice(0,2).toUpperCase();
              return (
                <div key={p.id} onClick={function(){ openThread(p.id); }} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 20px", borderBottom:"1px solid "+C.border, cursor:"pointer" }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:p.isCoach?C.amber:"#3b3b3b", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontWeight:900, fontSize:16, color:p.isCoach?"#000":"#fff" }}>{initials}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                      <div style={{ fontWeight:700, fontSize:15, color:C.white }}>{p.name}{p.isCoach?" (Coach)":""}</div>
                      {last && <div style={{ fontSize:11, color:C.greyDark, flexShrink:0 }}>{fmtTimestamp(last.timestamp)}</div>}
                    </div>
                    <div style={{ fontSize:13, color:C.grey, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {last ? last.text : "No messages yet"}
                    </div>
                  </div>
                  {unread && <div style={{ width:9, height:9, borderRadius:"50%", background:C.red, flexShrink:0 }}/>}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", height:"70vh" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 20px", borderBottom:"1px solid "+C.border, flexShrink:0 }}>
            <button onClick={backToList} style={{ background:"none", border:"none", color:C.red, fontSize:14, fontWeight:700, cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:4 }}>{"<"} Back</button>
            <div style={{ flex:1, textAlign:"center", fontWeight:700, fontSize:15, color:C.white }}>
              {channel==="board" ? "Squad Group" : (activePerson ? activePerson.name+(activePerson.isCoach?" (Coach)":"") : "")}
            </div>
            <div style={{ width:44, flexShrink:0 }}/>
          </div>

          {channel!=="board" && (
            <div style={{ textAlign:"center", fontSize:11, color:C.greyDark, padding:"8px 0 4px", flexShrink:0 }}>Private conversation</div>
          )}
          {channel==="board" && (
            <div style={{ textAlign:"center", fontSize:11, color:C.greyDark, padding:"8px 0 4px", flexShrink:0 }}>Visible to the whole current squad</div>
          )}

          <div style={{ flex:1, overflowY:"auto", padding:"12px 16px", display:"flex", flexDirection:"column", gap:2 }}>
            {sorted.length === 0 && (
              <div style={{ textAlign:"center", color:C.greyDark, fontSize:13, padding:"40px 0" }}>No messages yet. Say hello!</div>
            )}
            {sorted.map(function(m, i) {
              const mine = String(m.senderId) === String(currentUserId);
              const prev = sorted[i-1];
              const showSender = channel==="board" && !mine && (!prev || String(prev.senderId)!==String(m.senderId));
              const bubbleColor = mine ? C.red : (m.isCoach ? "#3a3a3a" : "#2c2c2e");
              return (
                <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems:mine?"flex-end":"flex-start", marginTop: showSender?10:2 }}>
                  {showSender && (
                    <div style={{ fontSize:11, fontWeight:700, color:m.isCoach?C.amber:C.greyDark, marginLeft:12, marginBottom:2 }}>{m.senderName}{m.isCoach?" (Coach)":""}</div>
                  )}
                  <div style={{ background:bubbleColor, color:"#fff", borderRadius:18, padding:"9px 14px", maxWidth:"75%", fontSize:15, lineHeight:1.35, wordBreak:"break-word" }}>
                    {m.text}
                  </div>
                  <div style={{ fontSize:10, color:C.greyDark, marginTop:2, marginLeft:mine?0:4, marginRight:mine?4:0 }}>{fmtTimestamp(m.timestamp)}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display:"flex", gap:8, padding:"10px 16px 16px", flexShrink:0, alignItems:"flex-end" }}>
            <textarea value={draft} onChange={handleDraft} onKeyDown={handleKeyDown} placeholder="Message" rows={1}
              style={{ flex:1, background:"#1c1c1e", border:"1px solid #3a3a3c", color:"#fff", padding:"9px 14px", fontSize:15, borderRadius:18, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"none", maxHeight:100 }}/>
            <button onClick={send} style={{ background:draft.trim()?C.red:"#3a3a3c", color:"#fff", width:32, height:32, borderRadius:"50%", border:"none", cursor:draft.trim()?"pointer":"default", flexShrink:0, fontSize:16, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>{"^"}</button>
          </div>
        </div>
      )}
    </div>
  );
}





function AttendanceModal({ session, members, onClose, onToggle }) {
  const [showAll, setShowAll] = useState(false);
  function handleToggleAll() { setShowAll(!showAll); }

  const eligible = members
    .filter(function(m){ return m.block === session.block; })
    .sort(function(a,b){ return a.name.localeCompare(b.name); });

  const allSorted = members.slice().sort(function(a,b){ return a.name.localeCompare(b.name); });
  const list = showAll ? allSorted : eligible;
  const attended = Object.values(session.attendance || {}).filter(Boolean).length;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, width:"100%", maxWidth:500, maxHeight:"92vh", overflow:"auto" }}>
        <div style={{ padding:"16px 18px", borderBottom:"1px solid "+C.border, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <span style={S.eyebrow}>Attendance Register</span>
            <div style={{ fontWeight:700, fontSize:16 }}>{session.title}</div>
            <div style={{ fontSize:12, color:C.grey, marginTop:2 }}>{session.date} - {session.block}</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.grey, fontSize:22, cursor:"pointer", padding:"0 4px" }}>x</button>
        </div>

        <div style={{ padding:"10px 18px", borderBottom:"1px solid "+C.border, background:C.bg, display:"flex", gap:20, alignItems:"center" }}>
          <div>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, marginBottom:1 }}>Present</div>
            <div style={{ fontWeight:900, fontSize:"1.3rem", color:C.green }}>{attended}</div>
          </div>
          <div>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, marginBottom:1 }}>Absent</div>
            <div style={{ fontWeight:900, fontSize:"1.3rem", color:C.amber }}>{eligible.length - attended}</div>
          </div>
          <div>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, marginBottom:1 }}>Total</div>
            <div style={{ fontWeight:900, fontSize:"1.3rem", color:C.white }}>{eligible.length}</div>
          </div>
          <button onClick={handleToggleAll}
            style={{ marginLeft:"auto", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", background:"none", border:"1px solid "+C.greyDark, color:C.grey, padding:"5px 10px", borderRadius:1, cursor:"pointer" }}>
            {showAll ? "Block only" : "All swimmers"}
          </button>
        </div>

        <div style={{ padding:"10px 18px" }}>
          {list.length === 0 && (
            <p style={{ color:C.grey, fontSize:13, padding:"12px 0" }}>No swimmers in this block.</p>
          )}
          {list.map(function(m) {
            const present = !!(session.attendance && session.attendance[m.id]);
            const inBlock = m.block === session.block;
            return (
              <div key={m.id} onClick={function(){ onToggle(session.id, m.id); }}
                style={{ display:"flex", alignItems:"center", gap:14, padding:"12px", marginBottom:2, background:present ? "#0d2b1a" : C.bg, border:"1px solid " + (present ? "#166534" : inBlock ? C.border : C.greyDark), borderRadius:2, cursor:"pointer", opacity:inBlock ? 1 : 0.6 }}>
                <div style={{ width:26, height:26, borderRadius:3, border:"2px solid " + (present ? C.green : C.greyDark), background:present ? C.green : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {present && <span style={{ color:"#000", fontSize:15, fontWeight:900, lineHeight:1 }}>OK</span>}
                </div>
                <Avatar name={m.name} size={34}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:present ? C.white : C.greyLight }}>{m.name}</div>
                  <div style={{ fontSize:11, color:C.grey }}>{m.block}{!inBlock ? " - different block" : ""}</div>
                </div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:present ? C.green : C.grey }}>
                  {present ? "Present" : "-"}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ padding:"12px 18px", borderTop:"1px solid "+C.border, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12, color:C.grey }}>{attended} of {eligible.length} marked present</span>
          <button onClick={onClose} style={S.btnRed}>Done</button>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onCoach, onMember, onBack, members }) {
  const [email, setEmail] = useState(COACH.email);
  const [password, setPassword] = useState(COACH.password);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleKeyDown(e) { if (e.key === "Enter") handle(); }
  function handle() {
    setError("");
    setLoading(true);
    setTimeout(function() {
      if (email.toLowerCase() === COACH.email && password === COACH.password) {
        onCoach();
      } else {
        const legacy = MEMBERS_AUTH[email.toLowerCase()];
        const live = (members||[]).find(function(m){ return m.email && m.email.toLowerCase()===email.toLowerCase(); });
        if (live && live.password === password) {
          onMember(live.id);
        } else if (legacy && legacy.password === password) {
          onMember(legacy.id);
        } else {
          setError("Email or password not recognised.");
        }
      }
      setLoading(false);
    }, 500);
  }

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white }}>
      <div style={{ padding:"16px 20px", borderBottom:"1px solid "+C.border }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:C.grey, cursor:"pointer", fontSize:13, padding:0 }}>
          Back to site
        </button>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"calc(100vh - 53px)", padding:24 }}>
        <div style={{ width:"100%", maxWidth:360 }}>
          <Logo height={44}/>
          <h1 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", margin:"28px 0 4px" }}>Login</h1>
          <p style={{ color:C.grey, fontSize:13, marginBottom:24 }}>Members and coaches use the same login.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={S.label}>Email</label>
              <input type="email" value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="your@email.com" style={S.input} onKeyDown={handleKeyDown}/>
            </div>
            <div>
              <label style={S.label}>Password</label>
              <input type="password" value={password} onChange={function(e){ setPassword(e.target.value); }} placeholder="..." style={S.input} onKeyDown={handleKeyDown}/>
            </div>
            {error && <div style={{ color:"#ff6b6b", fontSize:13 }}>{error}</div>}
            <button onClick={handle} disabled={loading} style={{ background:"#e01a1a", color:"#fff", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer", opacity:loading ? 0.7 : 1 }}>
              {loading ? "Checking..." : "Sign In"}
            </button>
          </div>
          <div style={{ marginTop:24, padding:14, background:C.panel, border:"1px solid "+C.border, borderRadius:2 }}>
            <div style={{ fontSize:10, color:C.grey, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Demo credentials</div>
            <div style={{ fontSize:12, color:C.greyLight, lineHeight:2 }}>
              <strong style={{ color:C.amber }}>Coach:</strong> coach@swimfasterlondon.com / coach2026<br/>
              james@example.com / swim2024<br/>
              sarah@example.com / faster99
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoachDashboard({ onLogout, sharedData, setSharedData }) {
  const [tab, setTab] = useState("profiles");
  const [localData, setLocalData] = useState(INIT);
  const data = sharedData || localData;
  const setData = setSharedData || setLocalData;
  const [readNotifIds, setReadNotifIds] = useState({});
  const [lastSeenMsgCount, setLastSeenMsgCount] = useState(0);

  function sendCoachMessage(next) {
    setData(function(d) { return Object.assign({}, d, { messages: next }); });
  }

  const unreadMsgCount = Math.max(0, (data.messages||[]).length - lastSeenMsgCount);

  function buildNotifications() {
    const items = [];
    data.applications.forEach(function(a) {
      items.push({ id:"app-"+a.id, kind:"application", icon:"New application", title:a.name+" applied to join", detail:a.swimmerType?a.swimmerType+" - "+(a.pb100||"no PB given"):"", date:a.date, sortKey:a.date, color:C.amber });
    });
    data.members.forEach(function(m) {
      (m.raceResults||[]).forEach(function(r) {
        items.push({ id:"race-"+m.id+"-"+r.id, kind:"race", icon:"Race report", title:(m.nickname||m.name.split(" ")[0])+" logged a race report", detail:r.venue?r.venue+" - "+(r.time||""):(r.time||""), date:r.date, sortKey:r.date, color:"#3b82f6" });
      });
      (m.plannedEvents||[]).forEach(function(pe) {
        items.push({ id:"evt-"+m.id+"-"+pe.eventId, kind:"event", icon:"Race sign-up", title:(m.nickname||m.name.split(" ")[0])+" signed up for "+pe.eventName, detail:pe.note||"", date:pe.eventDate, sortKey:pe.eventDate, color:"#8b5cf6" });
      });
    });
    items.sort(function(a,b){ return (b.sortKey||"").localeCompare(a.sortKey||""); });
    return items;
  }

  const notifications = buildNotifications();
  const unreadCount = notifications.filter(function(n){ return !readNotifIds[n.id]; }).length;

  function markNotifRead(id) {
    setReadNotifIds(function(prev) { const next = Object.assign({}, prev); next[id] = true; return next; });
  }
  function markAllNotifsRead() {
    const next = {};
    notifications.forEach(function(n) { next[n.id] = true; });
    setReadNotifIds(next);
  }
  const [attendanceSession, setAttendanceSession] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [bankRef, setBankRef] = useState("");
  const [bankSent, setBankSent] = useState({});
  const [benchForm, setBenchForm] = useState({ memberId:"", event:"100m Free", time:"", strokeCount1:"", strokeCount2:"", split50:"", startType:"push", date:new Date().toISOString().slice(0,10) });
  const [calMonth, setCalMonth] = useState(new Date(2026,6,1));
  const [sessForm, setSessForm] = useState({ date:"", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"" });
  const [editSess, setEditSess] = useState(null);
  const [blockFilter, setBlockFilter] = useState("All");
  const [graphMember, setGraphMember] = useState(null);
  const [drillAssignMember, setDrillAssignMember] = useState(null);
  const [viewingAsId, setViewingAsId] = useState(null);
  const [pairingSessionId, setPairingSessionId] = useState("");

  function setTab_(t) { setTab(t); }
  function handleLogout() { onLogout(); }

  function approveApp(app) {
    setData(function(d) {
      return Object.assign({}, d, {
        applications: d.applications.map(function(a) {
          return a.id === app.id ? Object.assign({}, a, { status:"approved" }) : a;
        }),
        members: d.members.map(function(m) {
          return (m.applicationId === app.id || m.email === app.email) ? Object.assign({}, m, { memberStatus:"approved" }) : m;
        })
      });
    });
  }

  function rejectApp(app) {
    setData(function(d) {
      return Object.assign({}, d, {
        applications: d.applications.map(function(a) {
          return a.id === app.id ? Object.assign({}, a, { status:"rejected" }) : a;
        }),
        members: d.members.map(function(m) {
          return (m.applicationId === app.id || m.email === app.email) ? Object.assign({}, m, { memberStatus:"rejected" }) : m;
        })
      });
    });
  }

  function handleSendBank(app) {
    if (!bankRef) return;
    const sid = app.id;
    setBankSent(function(prev) {
      const next = Object.assign({}, prev);
      next[sid] = true;
      return next;
    });
  }

  function addBenchmark() {
    if (!benchForm.memberId || !benchForm.time) return;
    const mid = parseInt(benchForm.memberId);
    const entry = {
      date: new Date(benchForm.date).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),
      event: benchForm.event,
      time: benchForm.time,
      strokeCount1: benchForm.strokeCount1 ? parseInt(benchForm.strokeCount1) : null,
      strokeCount2: benchForm.strokeCount2 ? parseInt(benchForm.strokeCount2) : null,
      split50: benchForm.split50 || null,
      startType: benchForm.startType || "push",
    };
    setData(function(d) {
      return Object.assign({}, d, {
        members: d.members.map(function(m) {
          return m.id === mid ? Object.assign({}, m, { benchmarks: [entry].concat(m.benchmarks) }) : m;
        })
      });
    });
    setBenchForm(function(f) { return Object.assign({}, f, { time:"", strokeCount1:"", strokeCount2:"", split50:"" }); }); // keep startType
  }

  function saveSession() {
    if (!sessForm.date || !sessForm.title) return;
    if (editSess) {
      setData(function(d) {
        return Object.assign({}, d, {
          sessions: d.sessions.map(function(s) {
            return s.id === editSess ? Object.assign({}, s, sessForm) : s;
          })
        });
      });
      setEditSess(null);
    } else {
      const newSess = Object.assign({}, sessForm, { id:Date.now(), attendance:{} });
      setData(function(d) { return Object.assign({}, d, { sessions: d.sessions.concat([newSess]) }); });
    }
    setSessForm({ date:"", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"" });
  }

  function toggleAttendance(sessionId, memberId) {
    setData(function(d) {
      return Object.assign({}, d, {
        sessions: d.sessions.map(function(s) {
          if (s.id !== sessionId) return s;
          const cur = !!(s.attendance && s.attendance[memberId]);
          const newAtt = Object.assign({}, s.attendance);
          newAtt[memberId] = !cur;
          return Object.assign({}, s, { attendance: newAtt });
        })
      });
    });
    setAttendanceSession(function(prev) {
      if (!prev || prev.id !== sessionId) return prev;
      const cur = !!(prev.attendance && prev.attendance[memberId]);
      const newAtt = Object.assign({}, prev.attendance);
      newAtt[memberId] = !cur;
      return Object.assign({}, prev, { attendance: newAtt });
    });
  }

  function updateHallOfRecords(records) {
    setData(function(d) { return Object.assign({}, d, { hallOfRecords: records }); });
  }
  function updateDrills(next) {
    setData(function(d) { return Object.assign({}, d, { drillLibrary: next }); });
  }
  function savePrescribedDrills(drills) {
    const mid = drillAssignMember.id;
    setData(function(d) {
      return Object.assign({}, d, {
        members: d.members.map(function(m) {
          return m.id === mid ? Object.assign({}, m, { prescribedDrills: drills }) : m;
        })
      });
    });
    setDrillAssignMember(null);
  }

  function togglePayment(memberId) {
    setData(function(d) {
      return Object.assign({}, d, {
        members: d.members.map(function(m) {
          return m.id === memberId ? Object.assign({}, m, { paid: !m.paid }) : m;
        })
      });
    });
  }

  function deleteSession(sid) {
    setData(function(d) {
      return Object.assign({}, d, {
        sessions: d.sessions.filter(function(s) { return s.id !== sid; })
      });
    });
  }

  function startEditSession(s) {
    setEditSess(s.id);
    setSessForm({ date:s.date, title:s.title, block:s.block, plan:s.plan });
  }

  function cancelEdit() {
    setEditSess(null);
    setSessForm({ date:"", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"" });
  }

  function setGraphMember_(id) { setGraphMember(id === graphMember ? null : id); }
  function setBlockFilter_(b) { setBlockFilter(b); }
  function openProfile(id) { setSelectedProfile(id); }
  function closeProfile() { setSelectedProfile(null); }
  function openAttendance(s) { setAttendanceSession(s); }
  function closeAttendance() { setAttendanceSession(null); }
  function openDrillAssign() { setDrillAssignMember(profileMember); }
  function closeDrillAssign() { setDrillAssignMember(null); }

  function handleSessDate(e) { setSessForm(function(f) { return Object.assign({}, f, { date:e.target.value }); }); }
  function handleSessBlock(e) { setSessForm(function(f) { return Object.assign({}, f, { block:e.target.value }); }); }
  function handleSessTitle(e) { setSessForm(function(f) { return Object.assign({}, f, { title:e.target.value }); }); }
  function handleSessPlan(e) { setSessForm(function(f) { return Object.assign({}, f, { plan:e.target.value }); }); }
  function handleBenchMember(e) { setBenchForm(function(f) { return Object.assign({}, f, { memberId:e.target.value }); }); }
  function handleBenchEvent(e) { setBenchForm(function(f) { return Object.assign({}, f, { event:e.target.value }); }); }
  function handleBenchTime(e) { setBenchForm(function(f) { return Object.assign({}, f, { time:e.target.value }); }); }
  function handleBenchDate(e) { setBenchForm(function(f) { return Object.assign({}, f, { date:e.target.value }); }); }
  function handleBenchStrokeCount1(e) { setBenchForm(function(f) { return Object.assign({}, f, { strokeCount1:e.target.value }); }); }
  function handleBenchStrokeCount2(e) { setBenchForm(function(f) { return Object.assign({}, f, { strokeCount2:e.target.value }); }); }
  function handleBenchSplit50(e) { setBenchForm(function(f) { return Object.assign({}, f, { split50:e.target.value }); }); }
  function handleBenchStartType(e) { setBenchForm(function(f) { return Object.assign({}, f, { startType:e.target.value }); }); }
  function handlePairingSession(e) { setPairingSessionId(e.target.value); }
  function handleBankRef(e) { setBankRef(e.target.value); }
  function handleCalPrev() { setCalMonth(function(m) { return new Date(m.getFullYear(), m.getMonth()-1, 1); }); }
  function handleCalNext() { setCalMonth(function(m) { return new Date(m.getFullYear(), m.getMonth()+1, 1); }); }
  function setTabApps() { setTab("applications"); }
  function setTabProfiles() { setTab("profiles"); }
  function setTabCalendar() { setTab("calendar"); }
  function setTabSessions() { setTab("sessions"); }
  function setTabBenchmarks() { setTab("benchmarks"); }
  function setTabDrills() { setTab("drills"); }
  function setTabRecords() { setTab("records"); }
  function setTabNotifications() { setTab("notifications"); }
  function setTabMessages() { setTab("messages"); setLastSeenMsgCount((data.messages||[]).length); }
  function setTabPizza() { setTab("pizza"); }

  const pending = data.applications.filter(function(a) { return a.status === "pending"; }).length;
  const filtered = blockFilter === "All" ? data.members : data.members.filter(function(m) { return m.block === blockFilter; });

  const daysInMonth = function(y,mo) { return new Date(y,mo+1,0).getDate(); };
  const firstDayOfMonth = function(y,mo) { return new Date(y,mo,1).getDay(); };
  const sessionsByDate = {};
  data.sessions.forEach(function(s) {
    if (!sessionsByDate[s.date]) sessionsByDate[s.date] = [];
    sessionsByDate[s.date].push(s);
  });

  const profileMember = selectedProfile ? data.members.find(function(m) { return m.id === selectedProfile; }) : null;

  if (viewingAsId) {
    return (
      <div style={{ position:"fixed", inset:0, zIndex:500, overflowY:"auto", background:C.bg }}>
        <div style={{ background:"#1a0a0a", borderBottom:"2px solid "+C.red, padding:"8px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:10 }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.red }}>Coach - viewing as athlete</span>
          <button onClick={function(){ setViewingAsId(null); }} style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", background:"none", border:"1px solid "+C.red, color:C.red, padding:"4px 12px", borderRadius:1, cursor:"pointer" }}>Back to coach</button>
        </div>
        <MemberDashboard memberId={viewingAsId} allData={data} setAllData={setData} onLogout={function(){ setViewingAsId(null); }}/>
      </div>
    );
  }

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white }}>

      {attendanceSession && (
        <AttendanceModal
          session={attendanceSession}
          members={data.members}
          onClose={closeAttendance}
          onToggle={toggleAttendance}
        />
      )}

      {drillAssignMember && (
        <DrillAssignModal
          member={drillAssignMember}
          onClose={closeDrillAssign}
          onSave={savePrescribedDrills}
        />
      )}

      {profileMember && (
        <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, width:"100%", maxWidth:520, maxHeight:"92vh", overflow:"auto" }}>
            <div style={{ padding:"16px 18px", borderBottom:"1px solid "+C.border, display:"flex", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <Avatar name={profileMember.name} size={48}/>
                <div>
                  <div style={{ fontWeight:700, fontSize:18 }}>{profileMember.name}</div>
                  <div style={{ fontSize:12, color:C.grey, marginTop:2 }}>{profileMember.block} - {profileMember.specialty} - Age {profileMember.age || "-"}</div>
                </div>
              </div>
              <button onClick={closeProfile} style={{ background:"none", border:"none", color:C.grey, fontSize:22, cursor:"pointer", padding:"0 4px" }}>x</button>
            </div>
            <div style={{ padding:"12px 18px", borderBottom:"1px solid "+C.border, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:C.bg }}>
              <div style={{ background:C.panel, padding:"10px 12px" }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Joined</div>
                <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{profileMember.joined}</div>
              </div>
              <div style={{ background:C.panel, padding:"10px 12px" }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Sessions</div>
                <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{data.sessions.filter(function(s){ return s.attendance && s.attendance[profileMember.id]; }).length}</div>
              </div>
              <div style={{ background:C.panel, padding:"10px 12px" }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Payment</div>
                <div style={{ fontWeight:700, fontSize:14, color:profileMember.paid ? C.green : C.amber }}>{profileMember.paid ? "Paid" : "Pending"}</div>
              </div>
            </div>
            {profileMember.bio && (
              <div style={{ padding:"12px 18px", borderBottom:"1px solid "+C.border, fontSize:13, color:C.greyLight, lineHeight:1.65, fontStyle:"italic" }}>
                "{profileMember.bio}"
              </div>
            )}
            {profileMember.benchmarks.length >= 2 && (
              <div style={{ padding:"14px 18px", borderBottom:"1px solid "+C.border }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>Progress charts</div>
                <ProgressPanel member={profileMember}/>
              </div>
            )}
            {(profileMember.prescribedDrills && profileMember.prescribedDrills.length > 0) && (
              <div style={{ padding:"14px 18px", borderBottom:"1px solid "+C.border }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6", marginBottom:12 }}>Assigned drills ({profileMember.prescribedDrills.length})</div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {profileMember.prescribedDrills.map(function(pd) {
                    const drill = DRILLS_DATA.find(function(d) { return d.id === pd.drillId; });
                    if (!drill) return null;
                    return (
                      <div key={pd.drillId} style={{ background:C.bg, padding:"10px 12px", borderRadius:2, border:"1px solid #1e3a5f" }}>
                        <div style={{ fontWeight:700, fontSize:13, color:C.white, marginBottom:2 }}>{drill.name}</div>
                        <div style={{ fontSize:11, color:C.grey, marginBottom: pd.note ? 6 : 0 }}>{drill.stroke} - {drill.focus}</div>
                        {pd.note && <div style={{ fontSize:12, color:"#93c5fd", fontStyle:"italic", lineHeight:1.5 }}>{pd.note}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {(function() {
              const ack = profileMember.inductionAck || {};
              const sections = [["welcome","Welcome"],["etiquette","Pool Etiquette"],["equipment","Kit List"]];
              const doneCount = sections.filter(function(s){ return ack[s[0]]; }).length;
              return (
                <div style={{ padding:"14px 18px", borderBottom:"1px solid "+C.border }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey }}>Induction status</div>
                    <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:doneCount===3?C.green:C.amber, border:"1px solid "+(doneCount===3?C.green:C.amber), padding:"2px 7px", borderRadius:1 }}>{doneCount}/3</span>
                  </div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {sections.map(function(s) {
                      const done = !!ack[s[0]];
                      return (
                        <span key={s[0]} style={{ fontSize:11, fontWeight:700, color:done?C.green:C.greyDark, display:"flex", alignItems:"center", gap:4 }}>
                          {done ? "✓" : "○"} {s[1]}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            <div style={{ padding:"12px 18px", borderTop:"1px solid "+C.border, display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button onClick={function() { setViewingAsId(profileMember.id); setSelectedProfile(null); }} style={{ background:"transparent", border:"1px solid #1e3a5f", color:"#3b82f6", padding:"8px 14px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>View as athlete</button>
              <button onClick={function() { togglePayment(profileMember.id); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"8px 14px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>Toggle payment</button>
              <button onClick={openDrillAssign} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, fontSize:11, padding:"8px 14px", color:"#3b82f6", borderColor:"#1e3a5f" }}>Assign drills</button>
              <button onClick={closeProfile} style={S.btnRed}>Close</button>
            </div>
          </div>
        </div>
      )}

      <nav style={{ background:C.panel, borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <Logo height={30}/>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.amber, border:"1px solid "+C.amber, padding:"2px 8px", borderRadius:1 }}>Coach</span>
          </div>
          <button onClick={handleLogout} style={{ background:"none", border:"none", color:C.grey, fontSize:12, cursor:"pointer", textTransform:"uppercase", letterSpacing:"0.08em" }}>Sign Out</button>
        </div>
        <div style={{ display:"flex", gap:0, marginTop:8, overflowX:"auto" }}>
          <button onClick={setTabApps} style={{ background:"none", border:"none", borderBottom:tab==="applications" ? "2px solid "+C.red : "2px solid transparent", color:tab==="applications" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="applications"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>
            Applications{pending > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{pending}</span>}
          </button>
          <button onClick={setTabNotifications} style={{ background:"none", border:"none", borderBottom:tab==="notifications" ? "2px solid "+C.red : "2px solid transparent", color:tab==="notifications" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="notifications"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Notifications{unreadCount > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{unreadCount}</span>}</button>
          <button onClick={setTabProfiles} style={{ background:"none", border:"none", borderBottom:tab==="profiles" ? "2px solid "+C.red : "2px solid transparent", color:tab==="profiles" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="profiles"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Profiles</button>
          <button onClick={setTabCalendar} style={{ background:"none", border:"none", borderBottom:tab==="calendar" ? "2px solid "+C.red : "2px solid transparent", color:tab==="calendar" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="calendar"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Calendar</button>
          <button onClick={setTabSessions} style={{ background:"none", border:"none", borderBottom:tab==="sessions" ? "2px solid "+C.red : "2px solid transparent", color:tab==="sessions" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="sessions"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Sessions</button>
          <button onClick={setTabBenchmarks} style={{ background:"none", border:"none", borderBottom:tab==="benchmarks" ? "2px solid "+C.red : "2px solid transparent", color:tab==="benchmarks" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="benchmarks"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Benchmarks</button>
          <button onClick={setTabDrills} style={{ background:"none", border:"none", borderBottom:tab==="drills" ? "2px solid "+C.red : "2px solid transparent", color:tab==="drills" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="drills"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Drills</button>
          <button onClick={setTabRecords} style={{ background:"none", border:"none", borderBottom:tab==="records" ? "2px solid "+C.amber : "2px solid transparent", color:tab==="records" ? C.amber : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="records"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Records</button>
          <button onClick={setTabMessages} style={{ background:"none", border:"none", borderBottom:tab==="messages" ? "2px solid "+C.red : "2px solid transparent", color:tab==="messages" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="messages"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Messages{unreadMsgCount > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{unreadMsgCount}</span>}</button>
          <button onClick={setTabPizza} style={{ background:"none", border:"none", borderBottom:tab==="pizza" ? "2px solid "+C.red : "2px solid transparent", color:tab==="pizza" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="pizza"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Pizza Night</button>
        </div>
      </nav>

      <div style={{ padding:"24px 20px" }}>

        {tab === "applications" && (
          <div>
            <span style={S.eyebrow}>Inbox</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:20 }}>Applications</h2>
            {data.applications.length === 0 && <p style={{ color:C.grey }}>No applications yet.</p>}
            {data.applications.map(function(app) {
              const borderColor = app.status==="pending" ? C.amber : app.status==="approved" ? C.green : C.greyDark;
              return (
                <div key={app.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"16px", marginBottom:2, borderLeft:"3px solid "+borderColor }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:10 }}>
                    <div onClick={function(){ setSelectedApplication(app); }} style={{ cursor:"pointer" }}>
                      <div style={{ fontWeight:700, fontSize:15, marginBottom:2, color:C.white, textDecoration:"underline", textDecorationColor:C.border }}>{app.name}</div>
                      <div style={{ fontSize:12, color:C.grey }}>{app.email} - {app.date}</div>
                    </div>
                    <Badge color={borderColor} label={app.status}/>
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                    {app.swimmerType && <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.grey, border:"1px solid "+C.border, padding:"3px 8px", borderRadius:1 }}>{app.swimmerType}</span>}
                    {app.pb100 && <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.red, border:"1px solid "+C.border, padding:"3px 8px", borderRadius:1, fontFamily:"monospace" }}>PB {app.pb100}{app.pbEstimated?" (est.)":""}</span>}
                    {app.timesPerWeek && <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.grey, border:"1px solid "+C.border, padding:"3px 8px", borderRadius:1 }}>{app.timesPerWeek}x/week</span>}
                  </div>
                  {app.goals && <div style={{ fontSize:13, color:C.grey, fontStyle:"italic", margin:"8px 0", padding:"8px 12px", background:C.bg, borderRadius:2 }}>"{app.goals}"</div>}
                  {app.status === "pending" && (
                    <div style={{ display:"flex", gap:8, marginTop:12 }}>
                      <button onClick={function() { approveApp(app); }} style={S.btnGreen}>Approve</button>
                      <button onClick={function() { rejectApp(app); }} style={{ background:"transparent", border:"1px solid #7f1d1d", color:"#ff6b6b", padding:"8px 14px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>Reject</button>
                    </div>
                  )}
                  {app.status === "approved" && (
                    <div style={{ marginTop:12 }}>
                      {!bankSent[app.id] ? (
                        <div>
                          <div style={{ fontSize:11, color:C.grey, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>Send bank transfer details</div>
                          <div style={{ display:"flex", gap:8 }}>
                            <input value={bankRef} onChange={handleBankRef} placeholder="Reference e.g. SFL-JUL-A1" style={{ background:"#161616", border:"1px solid #333", color:"#fff", padding:"8px 10px", fontSize:12, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", flex:1 }}/>
                            <button onClick={function() { handleSendBank(app); }} style={{ background:"#e01a1a", color:"#fff", padding:"8px 14px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" }}>Send</button>
                          </div>
                        </div>
                      ) : (
                        <span style={{ color:C.green, fontSize:13 }}>Payment details sent - Added to profiles</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {selectedApplication && (
          <div onClick={function(){ setSelectedApplication(null); }} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200, display:"flex", alignItems:"flex-start", justifyContent:"center", overflowY:"auto", padding:"20px 16px" }}>
            <div onClick={function(e){ e.stopPropagation(); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, maxWidth:560, width:"100%", marginTop:20, marginBottom:20 }}>
              <div style={{ padding:"18px 20px", borderBottom:"1px solid "+C.border, display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ fontWeight:900, fontSize:"1.3rem", color:C.white, marginBottom:2 }}>{selectedApplication.name}</div>
                  <div style={{ fontSize:12, color:C.grey }}>{selectedApplication.email} - Applied {selectedApplication.date}</div>
                </div>
                <button onClick={function(){ setSelectedApplication(null); }} style={{ background:"none", border:"none", color:C.grey, fontSize:20, cursor:"pointer", lineHeight:1, padding:0 }}>&times;</button>
              </div>

              <div style={{ padding:"20px" }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Personal details</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>Mobile</div><div style={{ fontSize:13, color:C.white }}>{selectedApplication.mobile||"-"}</div></div>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>Date of birth</div><div style={{ fontSize:13, color:calcAge(selectedApplication.dob)!==null && calcAge(selectedApplication.dob)<18 ? "#ff6b6b" : C.white }}>{selectedApplication.dob||"-"}{calcAge(selectedApplication.dob)!==null ? " ("+calcAge(selectedApplication.dob)+" yrs)"+(calcAge(selectedApplication.dob)<18?" - under 18":"") : ""}</div></div>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>Emergency contact</div><div style={{ fontSize:13, color:C.white }}>{selectedApplication.emergencyName||"-"}</div></div>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>Emergency number</div><div style={{ fontSize:13, color:C.white }}>{selectedApplication.emergencyPhone||"-"}</div></div>
                </div>

                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Swimming background</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>Swimmer type</div><div style={{ fontSize:13, color:C.white }}>{selectedApplication.swimmerType||"-"}</div></div>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>Times per week</div><div style={{ fontSize:13, color:C.white }}>{selectedApplication.timesPerWeek||"-"}</div></div>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>Swimming since</div><div style={{ fontSize:13, color:C.white }}>{selectedApplication.swimmingSince||"-"}</div></div>
                </div>

                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Current ability</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>100m Free PB</div><div style={{ fontSize:13, color:C.red, fontFamily:"monospace" }}>{selectedApplication.pb100||"-"}{selectedApplication.pbEstimated?" (estimate)":""}</div></div>
                  <div style={{ gridColumn:"1 / -1" }}>
                    <div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Stroke ranking (strongest to weakest)</div>
                    <div style={{ fontSize:13, color:C.white }}>
                      {[selectedApplication.strokeRank1,selectedApplication.strokeRank2,selectedApplication.strokeRank3,selectedApplication.strokeRank4].filter(Boolean).join(" -> ") || "-"}
                    </div>
                  </div>
                  <div><div style={{ fontSize:9, color:C.greyDark, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>Kick rating</div><div style={{ fontSize:13, color:C.white }}>{selectedApplication.kickRating?selectedApplication.kickRating+"/10":"-"}</div></div>
                </div>

                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>6x100m benchmark set</div>
                <div style={{ marginBottom:20 }}>
                  {selectedApplication.benchmarkDNF ? (
                    <div style={{ fontSize:13, color:C.amber }}>Applicant was unable to complete this set.</div>
                  ) : selectedApplication.benchmarkMode==="average" ? (
                    <div style={{ fontSize:13, color:C.white, fontFamily:"monospace" }}>Average: {selectedApplication.benchmarkAvg||"-"}</div>
                  ) : (
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                      {[selectedApplication.benchmark1,selectedApplication.benchmark2,selectedApplication.benchmark3,selectedApplication.benchmark4,selectedApplication.benchmark5,selectedApplication.benchmark6].map(function(b,i){
                        return (
                          <div key={i} style={{ background:C.bg, padding:"8px 10px", borderRadius:2, textAlign:"center" }}>
                            <div style={{ fontSize:9, color:C.greyDark, marginBottom:2 }}>#{i+1}</div>
                            <div style={{ fontSize:13, color:C.white, fontFamily:"monospace" }}>{b||"-"}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Goals</div>
                <div style={{ marginBottom:20 }}>
                  {selectedApplication.goals && <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7, marginBottom:8 }}>{selectedApplication.goals}</div>}
                  {selectedApplication.targetEvent && <div style={{ fontSize:13, color:C.grey }}>Target: <span style={{ color:C.white }}>{selectedApplication.targetEvent}</span></div>}
                  {!selectedApplication.goals && !selectedApplication.targetEvent && <div style={{ fontSize:13, color:C.greyDark }}>No goals provided.</div>}
                </div>

                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Medical information</div>
                <div style={{ marginBottom:20 }}>
                  {selectedApplication.medical ? (
                    <div style={{ fontSize:13, color:"#ff6b6b", lineHeight:1.7 }}>{selectedApplication.medical}</div>
                  ) : (
                    <div style={{ fontSize:13, color:C.greyDark }}>None reported.</div>
                  )}
                </div>

                {selectedApplication.extra && (
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Anything else</div>
                    <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7 }}>{selectedApplication.extra}</div>
                  </div>
                )}
              </div>

              <div style={{ padding:"16px 20px", borderTop:"1px solid "+C.border, display:"flex", gap:8 }}>
                {selectedApplication.status === "pending" && (
                  <button onClick={function(){ approveApp(selectedApplication); setSelectedApplication(null); }} style={S.btnGreen}>Approve</button>
                )}
                {selectedApplication.status === "pending" && (
                  <button onClick={function(){ rejectApp(selectedApplication); setSelectedApplication(null); }} style={{ background:"transparent", border:"1px solid #7f1d1d", color:"#ff6b6b", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>Reject</button>
                )}
                <button onClick={function(){ setSelectedApplication(null); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, marginLeft:"auto" }}>Close</button>
              </div>
            </div>
          </div>
        )}

        {tab === "profiles" && (
          <div>
            <span style={S.eyebrow}>Squad</span>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase" }}>Swimmer Profiles</h2>
              <span style={{ fontSize:12, color:C.grey }}>{filtered.length} swimmers</span>
            </div>
            <div style={{ display:"flex", gap:6, marginBottom:20 }}>
              {["All","Squad"].map(function(b) {
                const active = blockFilter === b;
                const bc = BLOCK_COLORS[b] || C.red;
                return (
                  <button key={b} onClick={function() { setBlockFilter_(b); }}
                    style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"6px 12px", borderRadius:1, border:"1px solid "+(active?bc:C.greyDark), background:active?"rgba(255,255,255,0.05)":"transparent", color:active?bc:C.grey, cursor:"pointer" }}>
                    {b}
                  </button>
                );
              })}
            </div>
            {filtered.map(function(m) {
              const sessCount = data.sessions.filter(function(s) { return s.attendance && s.attendance[m.id]; }).length;
              const latestPB = m.benchmarks.length > 0 ? m.benchmarks.reduce(function(best,b) { return toSeconds(b.time) < toSeconds(best.time) ? b : best; }, m.benchmarks[0]) : null;
              return (
                <div key={m.id} onClick={function() { openProfile(m.id); }}
                  style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px", marginBottom:2, display:"flex", alignItems:"center", gap:14, cursor:"pointer" }}>
                  <Avatar name={m.name} size={44}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                      <span style={{ fontWeight:700, fontSize:15 }}>{m.name}</span>
                      {!m.paid && <Badge color={C.amber} label="Awaiting payment"/>}
                    </div>
                    <div style={{ fontSize:12, color:C.grey }}>{m.block} - {m.specialty || m.level} - Age {m.age || "-"}</div>
                    <div style={{ fontSize:12, color:C.greyDark, marginTop:2 }}>
                      {sessCount} session{sessCount !== 1 ? "s" : ""} attended
                      {latestPB && <span> - PB: <span style={{ color:EVENT_COLORS[latestPB.event]||C.red, fontFamily:"monospace", fontWeight:700 }}>{latestPB.time}</span> {latestPB.event}</span>}
                    </div>
                  </div>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:BLOCK_COLORS[m.block]||C.red, flexShrink:0 }}/>
                </div>
              );
            })}
          </div>
        )}

        {tab === "calendar" && (
          <div>
            <span style={S.eyebrow}>Schedule</span>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase" }}>
                {calMonth.toLocaleDateString("en-GB",{month:"long",year:"numeric"})}
              </h2>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={handleCalPrev} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 12px" }}>Prev</button>
                <button onClick={handleCalNext} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 12px" }}>Next</button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1, background:C.border, marginBottom:1 }}>
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(function(d) {
                return <div key={d} style={{ background:C.panel, padding:"6px 4px", textAlign:"center", fontSize:10, fontWeight:700, color:C.grey }}>{d}</div>;
              })}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1, background:C.border }}>
              {Array.from({length:firstDayOfMonth(calMonth.getFullYear(),calMonth.getMonth())}).map(function(_,i) {
                return <div key={"e"+i} style={{ background:C.bg, minHeight:52 }}/>;
              })}
              {Array.from({length:daysInMonth(calMonth.getFullYear(),calMonth.getMonth())}).map(function(_,i) {
                const day = i+1;
                const mm = calMonth.getMonth()+1; const mmStr = mm<10?"0"+mm:String(mm);
                const ddStr = day<10?"0"+day:String(day);
                const dateStr = calMonth.getFullYear()+"-"+mmStr+"-"+ddStr;
                const daySessions = sessionsByDate[dateStr] || [];
                const isToday = dateStr === "2026-07-04";
                return (
                  <div key={day} style={{ background:C.panel, minHeight:52, padding:"4px 5px", borderTop:isToday?"2px solid "+C.red:"none" }}>
                    <div style={{ fontSize:11, fontWeight:isToday?900:400, color:isToday?C.red:C.grey, marginBottom:3 }}>{day}</div>
                    {daySessions.map(function(s) {
                      const ac = Object.values(s.attendance||{}).filter(Boolean).length;
                      return (
                        <div key={s.id} onClick={function() { openAttendance(s); }}
                          style={{ fontSize:9, fontWeight:700, color:C.white, background:BLOCK_COLORS[s.block]||C.red, padding:"3px 5px", borderRadius:1, marginBottom:2, lineHeight:1.3, cursor:"pointer", overflow:"hidden" }}>
                          <div style={{ whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden" }}>{s.title}</div>
                          {ac > 0 && <div style={{ color:"rgba(255,255,255,0.8)", fontWeight:400 }}>OK {ac}</div>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop:20 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Sessions - tap to take register</div>
              {data.sessions.slice().sort(function(a,b) { return a.date.localeCompare(b.date); }).map(function(s) {
                const ac = Object.values(s.attendance||{}).filter(Boolean).length;
                const el = data.members.filter(function(m) { return m.block===s.block; }).length;
                return (
                  <div key={s.id} onClick={function() { openAttendance(s); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"16px", marginBottom:2, display:"flex", alignItems:"center", gap:14, cursor:"pointer" }}>
                    <div style={{ background:BLOCK_COLORS[s.block]||C.red, color:C.white, fontWeight:900, fontSize:13, padding:"6px 10px", borderRadius:2, textAlign:"center", minWidth:40, flexShrink:0 }}>
                      {new Date(s.date).getDate()}<br/>
                      <span style={{ fontSize:9, fontWeight:400 }}>{new Date(s.date).toLocaleDateString("en-GB",{month:"short"})}</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{s.title}</div>
                      <div style={{ fontSize:12, color:C.grey }}>{s.block}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontWeight:700, fontSize:16, color:ac>0?C.green:C.greyDark }}>{ac}/{el}</div>
                      <div style={{ fontSize:10, color:C.grey, textTransform:"uppercase", letterSpacing:"0.08em" }}>present</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "sessions" && (
          <div>
            <span style={S.eyebrow}>Session Builder</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:20 }}>Sessions</h2>
            <div style={{ background:C.panel, border:"1px solid "+C.border, padding:18, marginBottom:20, borderRadius:2 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:14 }}>{editSess ? "Edit Session" : "New Session"}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                <div><label style={S.label}>Date</label><input type="date" value={sessForm.date} onChange={handleSessDate} style={S.input}/></div>
                <div><label style={S.label}>Block</label>
                  <select value={sessForm.block} onChange={handleSessBlock} style={S.input}>
                    {["Squad"].map(function(b) { return <option key={b} value={b} style={{ background:C.panel }}>{b}</option>; })}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:12 }}><label style={S.label}>Title</label><input value={sessForm.title} onChange={handleSessTitle} placeholder="e.g. Threshold Friday" style={S.input}/></div>
              <div style={{ marginBottom:14 }}><label style={S.label}>Session plan</label><textarea value={sessForm.plan} onChange={handleSessPlan} placeholder="W/U: 400m easy" rows={6} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", fontFamily:"monospace", fontSize:13 }}/></div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={saveSession} style={S.btnRed}>{editSess ? "Save changes" : "Add session"}</button>
                {editSess && <button onClick={cancelEdit} style={S.btnGhost}>Cancel</button>}
              </div>
            </div>
            {data.sessions.slice().sort(function(a,b) { return a.date.localeCompare(b.date); }).map(function(s) {
              return (
                <div key={s.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"16px", marginBottom:2 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:10 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15, marginBottom:2 }}>{s.title}</div>
                      <div style={{ fontSize:12, color:C.grey }}>{s.date} - {s.block}</div>
                    </div>
                    <div style={{ display:"flex", gap:6 }}>
                      <button onClick={function() { openAttendance(s); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 12px", fontSize:11, color:C.green, borderColor:"#166534" }}>Register</button>
                      <button onClick={function() { startEditSession(s); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 12px", fontSize:11 }}>Edit</button>
                      <button onClick={function() { deleteSession(s.id); }} style={{ fontSize:11, background:"none", border:"none", color:"#ff6b6b", cursor:"pointer" }}>X</button>
                    </div>
                  </div>
                  <pre style={{ fontFamily:"monospace", fontSize:12, color:C.greyLight, whiteSpace:"pre-wrap", margin:0, background:C.bg, padding:"10px 12px", borderRadius:2, lineHeight:1.6 }}>{s.plan}</pre>
                </div>
              );
            })}
          </div>
        )}

        {tab === "benchmarks" && (
          <div>
            <span style={S.eyebrow}>Times</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:20 }}>Benchmark Session</h2>

            {/* '' Lane Pairings '' */}
            <div style={{ background:C.panel, border:"1px solid #3b82f6", borderRadius:2, padding:18, marginBottom:20 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#3b82f6", marginBottom:14 }}>Lane pairings</div>
              <div style={{ fontSize:13, color:C.grey, marginBottom:12 }}>Select today's session to build speed-matched pairs from attending swimmers.</div>
              <select value={pairingSessionId} onChange={handlePairingSession} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", marginBottom:0 }}>
                <option value="" style={{ background:C.panel }}>Select session...</option>
                {data.sessions.filter(function(s){ return s.date <= new Date().toISOString().slice(0,10); }).sort(function(a,b){ return b.date.localeCompare(a.date); }).map(function(s) {
                  const cnt = Object.values(s.attendance||{}).filter(Boolean).length;
                  return <option key={s.id} value={s.id} style={{ background:C.panel }}>{s.date} - {s.title} ({cnt} attending)</option>;
                })}
              </select>

              {(function() {
                if (!pairingSessionId) return null;
                const sess = data.sessions.find(function(s){ return String(s.id)===String(pairingSessionId); });
                if (!sess) return null;
                const presentIds = Object.keys(sess.attendance||{}).filter(function(k){ return sess.attendance[k]; }).map(Number);
                if (presentIds.length === 0) return (
                  <div style={{ marginTop:14, fontSize:13, color:C.grey }}>No swimmers marked as attending yet. Use the Attendance button on the Calendar tab.</div>
                );
                // Get each present swimmer with their latest 100m Free time
                const swimmers = presentIds.map(function(id) {
                  const m = data.members.find(function(x){ return x.id===id; });
                  if (!m) return null;
                  const free = (m.benchmarks||[]).filter(function(b){ return b.event==="100m Free"; });
                  free.sort(function(a,b){ return new Date(b.date)-new Date(a.date); });
                  const latest = free.length > 0 ? free[0] : null;
                  const secs = latest ? toSeconds(latest.time) : 9999;
                  return { id:m.id, name:m.name, display:m.nickname||m.name.split(" ")[0], time:latest?latest.time:null, secs:secs, gender:m.gender||"M" };
                }).filter(Boolean);
                // Sort by time ascending
                swimmers.sort(function(a,b){ return a.secs-b.secs; });
                // Build pairs - adjacent swimmers by speed
                const pairs = Array.from({ length: Math.floor(swimmers.length/2) }, function(_, i) {
                  return [swimmers[i*2], swimmers[i*2+1]];
                });
                const solo = swimmers.length % 2 !== 0 ? swimmers[swimmers.length-1] : null;
                return (
                  <div style={{ marginTop:16 }}>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>
                      {presentIds.length} swimmers present - {pairs.length} pair{pairs.length!==1?"s":""}
                    </div>
                    {pairs.map(function(pair, i) {
                      const a = pair[0];
                      const b = pair[1];
                      const diff = Math.abs(a.secs - b.secs);
                      const matchQuality = diff < 1 ? "Identical pace" : diff < 3 ? "Excellent match" : diff < 6 ? "Good match" : "Acceptable match";
                      const matchColor = diff < 1 ? C.green : diff < 3 ? C.green : diff < 6 ? "#3b82f6" : C.amber;
                      return (
                        <div key={i} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, marginBottom:8, overflow:"hidden" }}>
                          <div style={{ background:"#0a1628", padding:"6px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6" }}>Lane pair {i+1}</div>
                            <div style={{ fontSize:10, fontWeight:700, color:matchColor }}>{matchQuality} {diff>0?"("+diff.toFixed(1)+"s gap)":""}</div>
                          </div>
                          <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", padding:"12px 14px", gap:8 }}>
                            <div>
                              <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{a.display}</div>
                              <div style={{ fontFamily:"monospace", fontSize:13, color:C.red, marginTop:2 }}>{a.time||"No time"}</div>
                              <div style={{ fontSize:10, color:C.grey, marginTop:1 }}>Lane 1</div>
                            </div>
                            <div style={{ fontWeight:900, fontSize:12, color:C.greyDark, letterSpacing:"0.1em" }}>VS</div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{b.display}</div>
                              <div style={{ fontFamily:"monospace", fontSize:13, color:C.red, marginTop:2 }}>{b.time||"No time"}</div>
                              <div style={{ fontSize:10, color:C.grey, marginTop:1 }}>Lane 2</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {solo && (
                      <div style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div>
                          <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{solo.display}</div>
                          <div style={{ fontFamily:"monospace", fontSize:13, color:C.red, marginTop:2 }}>{solo.time||"No time"}</div>
                        </div>
                        <div style={{ fontSize:11, color:C.grey }}>Solo - odd swimmer out</div>
                      </div>
                    )}
                    {swimmers.some(function(s){ return !s.time; }) && (
                      <div style={{ fontSize:11, color:C.amber, marginTop:8 }}>Swimmers with no benchmark time are placed at the end. Record a 100m Free time to include them in speed matching.</div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* '' Record benchmark '' */}
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>Record a time</div>
            <div style={{ background:C.panel, border:"1px solid "+C.border, padding:18, marginBottom:24, borderRadius:2 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                <div><label style={S.label}>Swimmer</label>
                  <select value={benchForm.memberId} onChange={handleBenchMember} style={S.input}>
                    <option value="" style={{ background:C.panel }}>Select swimmer...</option>
                    {data.members.map(function(m) { return <option key={m.id} value={m.id} style={{ background:C.panel }}>{m.name}</option>; })}
                  </select>
                </div>
                <div><label style={S.label}>Event</label>
                  <select value={benchForm.event} onChange={handleBenchEvent} style={S.input}>
                    {["50m Free","100m Free","200m Free","400m Free","50m Back","100m Back","50m Breast","100m Breast","50m Fly","100m Fly","200m IM"].map(function(ev) { return <option key={ev} value={ev} style={{ background:C.panel }}>{ev}</option>; })}
                  </select>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                <div><label style={S.label}>Time (e.g. 58.4 or 1:02.1)</label><input value={benchForm.time} onChange={handleBenchTime} placeholder="58.4" style={S.input}/></div>
                <div><label style={S.label}>Date</label><input type="date" value={benchForm.date} onChange={handleBenchDate} style={S.input}/></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10, marginBottom:14 }}>
                <div><label style={S.label}>Strokes (1st 50)</label><input value={benchForm.strokeCount1} onChange={handleBenchStrokeCount1} placeholder="e.g. 18" type="number" style={S.input}/></div>
                <div><label style={S.label}>Strokes (2nd 50)</label><input value={benchForm.strokeCount2} onChange={handleBenchStrokeCount2} placeholder="e.g. 20" type="number" style={S.input}/></div>
                <div><label style={S.label}>50m split</label><input value={benchForm.split50} onChange={handleBenchSplit50} placeholder="e.g. 28.9" style={S.input}/></div>
                <div><label style={S.label}>Start type</label>
                  <select value={benchForm.startType} onChange={handleBenchStartType} style={S.input}>
                    <option value="push" style={{background:C.panel}}>Push</option>
                    <option value="block" style={{background:C.panel}}>Dive</option>
                  </select>
                </div>
              </div>
              <button onClick={addBenchmark} style={S.btnRed}>Record time</button>
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>View progress chart</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {data.members.map(function(m) {
                  const active = graphMember === m.id;
                  return (
                    <button key={m.id} onClick={function() { setGraphMember_(m.id); }}
                      style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"6px 12px", borderRadius:1, border:"1px solid "+(active?C.red:C.greyDark), background:active?"rgba(224,26,26,0.1)":"transparent", color:active?C.white:C.grey, cursor:"pointer" }}>
                      {m.name.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
            {graphMember && (function() {
              const m = data.members.find(function(x) { return x.id === graphMember; });
              if (!m) return null;
              return (
                <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"16px", marginBottom:20, borderRadius:2 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <Avatar name={m.name} size={32}/>
                    <span style={{ fontWeight:700, fontSize:14 }}>{m.name}</span>
                  </div>
                  <ProgressPanel member={m}/>
                </div>
              );
            })()}
            {data.members.map(function(m) {
              return (
                <div key={m.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"16px", marginBottom:2 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <Avatar name={m.name} size={32}/>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14 }}>{m.name}</div>
                      <div style={{ fontSize:12, color:C.grey }}>{m.block}</div>
                    </div>
                  </div>
                  {m.benchmarks.length === 0 ? (
                    <p style={{ color:C.greyDark, fontSize:13 }}>No benchmarks yet.</p>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                      {m.benchmarks.map(function(b, i) {
                        return (
                          <div key={i} style={{ display:"flex", justifyContent:"space-between", background:C.bg, padding:"7px 10px", borderRadius:2 }}>
                            <span style={{ fontSize:12, color:C.greyLight }}>{b.event}</span>
                            <span style={{ display:"flex", gap:14 }}>
                              <strong style={{ color:EVENT_COLORS[b.event]||C.red, fontSize:13, fontFamily:"monospace" }}>{b.time}</strong>
                              <span style={{ fontSize:10, color:C.grey }}>({(b.startType||"push")==="block"?"Dive":"Push"})</span>
                              <span style={{ fontSize:12, color:C.grey }}>{b.date}</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "drills" && <DrillLibraryPage isCoach={true} onUpdate={updateDrills} drills={data.drillLibrary || DRILLS_DATA}/>}
        {tab === "records" && <HallOfRecords records={data.hallOfRecords || []} members={data.members} isCoach={true} onUpdate={updateHallOfRecords} currentMemberId={null}/>}

        {tab === "notifications" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <div>
                <span style={S.eyebrow}>Activity</span>
                <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase" }}>Notifications</h2>
              </div>
              {unreadCount > 0 && <button onClick={markAllNotifsRead} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"8px 14px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>Mark all read</button>}
            </div>

            {notifications.length === 0 && <p style={{ color:C.grey }}>No activity yet.</p>}

            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {notifications.map(function(n) {
                const isUnread = !readNotifIds[n.id];
                return (
                  <div key={n.id} onClick={function(){ markNotifRead(n.id); }}
                    style={{ background:isUnread?C.panel:C.bg, border:"1px solid "+(isUnread?n.color+"44":C.border), borderLeft:"3px solid "+(isUnread?n.color:C.greyDark), borderRadius:2, padding:"12px 16px", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:isUnread?n.color:C.greyDark, marginBottom:3 }}>{n.icon}</div>
                        <div style={{ fontWeight:isUnread?700:400, fontSize:14, color:isUnread?C.white:C.grey }}>{n.title}</div>
                        {n.detail && <div style={{ fontSize:12, color:C.grey, marginTop:2 }}>{n.detail}</div>}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                        <div style={{ fontSize:11, color:C.greyDark }}>{n.date}</div>
                        {isUnread && <div style={{ width:8, height:8, borderRadius:"50%", background:n.color }}/>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {tab === "messages" && (
          <MessagesPage currentUserId="COACH" currentUserName="Coach" isCoach={true} messages={data.messages} members={data.members} onSend={sendCoachMessage}/>
        )}

        {tab === "pizza" && (
          <div style={{ textAlign:"center", padding:"20px 10px" }}>
            <div style={{ fontSize:52, marginBottom:12 }}>&#127829;&#129412;&#127881;</div>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:8 }}>Pizza Night</h2>
            <p style={{ color:C.grey, fontSize:14, lineHeight:1.7, maxWidth:380, margin:"0 auto 24px" }}>
              Share the Pizza Night link with your squad after Friday's session. Orders and payment tracking happen on that page - no login needed for swimmers.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}


function MemberDashboard({ memberId, allData, setAllData, onLogout }) {
  const baseM = allData.members.find(function(m){ return m.id===memberId; });
  const [tab, setTab] = useState("profile");
  const [memberEdits, setMemberEdits] = useState({});
  const member = baseM ? Object.assign({}, baseM, memberEdits) : null;
  const [raceResults, setRaceResultsLocal] = useState(baseM ? (baseM.raceResults || []) : []);
  const [plannedEvents, setPlannedEventsLocal] = useState(baseM ? (baseM.plannedEvents || []) : []);
  const [targetTime, setTargetTimeLocal] = useState(baseM ? (baseM.targetTime || null) : null);
  const [inductionAck, setInductionAckLocal] = useState(baseM ? (baseM.inductionAck || {}) : {});
  const [showInduction, setShowInduction] = useState(false);
  const [showSessionPlan, setShowSessionPlan] = useState(false);
  const [showDrillLibrary, setShowDrillLibrary] = useState(false);
  const [progressSub, setProgressSub] = useState("charts");
  const [eventsSub, setEventsSub] = useState("log");
  const [progressTargetInput, setProgressTargetInput] = useState("");

  function persistField(field, value) {
    if (!setAllData) return;
    setAllData(function(d) {
      return Object.assign({}, d, {
        members: d.members.map(function(m) {
          return m.id === memberId ? Object.assign({}, m, (function(){ const o = {}; o[field] = value; return o; })()) : m;
        })
      });
    });
  }

  function setRaceResults(next) { setRaceResultsLocal(next); persistField("raceResults", next); }
  function setPlannedEvents(next) { setPlannedEventsLocal(next); persistField("plannedEvents", next); }
  function setTargetTime(next) { setTargetTimeLocal(next); persistField("targetTime", next); }
  function setInductionAck(next) { setInductionAckLocal(next); persistField("inductionAck", next); }

  function sendMemberMessage(next) {
    if (!setAllData) return;
    setAllData(function(d) { return Object.assign({}, d, { messages: next }); });
  }

  const [lastSeenMsgCount, setLastSeenMsgCount] = useState(0);
  const unreadMsgCount = Math.max(0, (allData.messages||[]).filter(function(m){ return String(m.senderId)!==String(memberId); }).length - lastSeenMsgCount);


  if (!member) {
    return <div style={{ padding:40, color:C.grey }}>Member not found.</div>;
  }

  const isPending = member.memberStatus === "pending"; // undefined/approved = full access

  if (isPending) {
    return (
      <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white }}>
        <nav style={{ background:C.panel, borderBottom:"1px solid "+C.border, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Logo height={30}/>
          <button onClick={onLogout} style={{ background:"none", border:"none", color:C.grey, fontSize:12, cursor:"pointer", letterSpacing:"0.08em", textTransform:"uppercase" }}>Sign Out</button>
        </nav>
        <div style={{ padding:"32px 20px 60px", maxWidth:520, margin:"0 auto" }}>
          <div style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"18px 20px", marginBottom:24 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.amber, marginBottom:6 }}>Application pending</div>
            <div style={{ fontSize:14, color:C.white, lineHeight:1.6, marginBottom:4 }}>Hi {member.name.split(" ")[0]}, thanks for applying to SwimFasterLondon.</div>
            <div style={{ fontSize:13, color:"#c9a876", lineHeight:1.7 }}>Your coach is reviewing your application. Once approved, you'll get full access to training plans, benchmarks, the drill library and everything else in the members' area. In the meantime, here's some free content to get you started.</div>
          </div>

          <span style={S.eyebrow}>While you wait</span>
          <h2 style={{ fontWeight:900, fontSize:"1.5rem", textTransform:"uppercase", marginBottom:16 }}>Free Resources</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {[
              ["Welcome to SwimFasterLondon","What to expect from your first few sessions, club etiquette and how coaching works here."],
              ["Getting Started guide","New to the squad? Start here for pool etiquette, kit basics and session structure."],
              ["Basic swimming tips","Simple technique pointers on body position, breathing and pacing to build on early."],
              ["Beginner conditioning plan","A gentle 4-week plan to build aerobic base and confidence in the water."],
              ["Club news & announcements","Upcoming events, schedule changes and squad updates."],
            ].map(function(r, i) {
              return (
                <div key={i} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>{r[0]}</div>
                  <div style={{ fontSize:12, color:C.grey, lineHeight:1.5 }}>{r[1]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const mySession = allData.sessions
    .sort(function(a,b){ return b.date.localeCompare(a.date); })[0];

  const bests = {};
  member.benchmarks.forEach(function(b){
    const s = toSeconds(b.time);
    if (!bests[b.event] || s < bests[b.event].secs) {
      bests[b.event] = Object.assign({}, b, { secs:s });
    }
  });

  const TABS = [["profile","Profile"],["resources","Resources"],["progress","Progress"],["events","Events"],["records","Records"],["messages","Messages"],["pizza","Pizza Night"]];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white }}>
      <nav style={{ background:C.panel, borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:12 }}>
          <Logo height={30}/>
          <button onClick={onLogout} style={{ background:"none", border:"none", color:C.grey, fontSize:12, cursor:"pointer", letterSpacing:"0.08em", textTransform:"uppercase" }}>Sign Out</button>
        </div>
        <div style={{ display:"flex", gap:0, marginTop:8, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          {TABS.map(function(t){
            return (
              <button key={t[0]} onClick={function(){ setTab(t[0]); if(t[0]==="messages"){ setLastSeenMsgCount((allData.messages||[]).filter(function(m){ return String(m.senderId)!==String(memberId); }).length); } }}
                style={{ background:"none", border:"none", borderBottom:tab===t[0] ? "2px solid "+C.red : "2px solid transparent", color:tab===t[0] ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab===t[0]?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                {t[1]}{t[0]==="messages" && unreadMsgCount > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{unreadMsgCount}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      <div style={{ padding:"24px 20px" }}>
        {tab === "profile" && (
          <ProfileTab member={member} raceResults={raceResults} onUpdate={function(updated){ setMemberEdits(updated); }}/>
        )}

        {tab === "progress" && (
          <div>
            <span style={S.eyebrow}>Your Progress</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Progress</h2>
            <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Set targets, track every event, and see how far you've come.</p>

            <div style={{ display:"flex", borderBottom:"1px solid "+C.border, marginBottom:20, overflowX:"auto" }}>
              {[["charts","Charts"],["history","History"],["target","Target & gap"]].map(function(s) {
                const active = progressSub===s[0];
                return (
                  <button key={s[0]} onClick={function(){ setProgressSub(s[0]); }} style={{ background:"none", border:"none", borderBottom:active?"2px solid "+C.red:"2px solid transparent", color:active?C.white:C.grey, padding:"9px 14px", fontSize:11, fontWeight:active?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>{s[1]}</button>
                );
              })}
            </div>

            {progressSub === "target" && (
              <SpeedCoach member={member} targetTime={targetTime} onSetTarget={function(t){ setTargetTime(t); }}/>
            )}

            {progressSub === "charts" && (
              <div>
                {member.benchmarks.length < 2 ? (
                  <p style={{ color:C.grey }}>At least 2 benchmarks needed to show a chart. Keep training!</p>
                ) : (
                  <div style={{ background:C.panel, border:"1px solid "+C.border, padding:"16px", marginBottom:16 }}>
                    <ProgressPanel member={member}/>
                  </div>
                )}

                {targetTime && (function() {
                  const free100 = member.benchmarks.filter(function(b){ return b.event==="100m Free"; });
                  const latest = free100.length > 0 ? free100[free100.length-1] : null;
                  const curSecs = latest ? toSeconds(latest.time) : null;
                  const tgtSecs = toSeconds(targetTime);
                  const gap = curSecs ? curSecs - tgtSecs : null;
                  return (
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Target time - 100m Free</div>
                      <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, overflow:"hidden", marginBottom:4 }}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:C.border }}>
                          <div style={{ background:C.bg, padding:14 }}>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Current PB</div>
                            <div style={{ fontWeight:900, fontSize:"1.5rem", color:C.red, fontFamily:"monospace" }}>{latest ? latest.time : "-"}</div>
                            {latest && <div style={{ fontSize:11, color:C.grey, marginTop:2 }}>{latest.date}</div>}
                          </div>
                          <div style={{ background:C.bg, padding:14 }}>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Target</div>
                            <div style={{ fontWeight:900, fontSize:"1.5rem", color:C.amber, fontFamily:"monospace" }}>{targetTime}</div>
                            {gap !== null && <div style={{ fontSize:11, color:gap>0?C.green:C.amber, marginTop:2 }}>{gap>0?"-"+gap.toFixed(1)+"s to find":"Target reached!"}</div>}
                          </div>
                        </div>
                        {gap > 0 && (
                          <div style={{ padding:"10px 14px", borderTop:"1px solid "+C.border }}>
                            <div style={{ fontSize:11, color:C.grey, marginBottom:6 }}>Per 25m you need to find <span style={{ color:C.white, fontWeight:700, fontFamily:"monospace" }}>{(gap/4).toFixed(2)}s</span> per length.</div>
                            <div style={{ height:6, background:C.bg, borderRadius:3, overflow:"hidden", position:"relative" }}>
                              <div style={{ position:"absolute", left:0, top:0, height:"100%", width:((tgtSecs/curSecs)*100)+"%", background:C.amber, borderRadius:3 }}/>
                            </div>
                            <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                              <span style={{ fontSize:10, color:C.amber }}>{targetTime}</span>
                              <span style={{ fontSize:10, color:C.grey }}>{latest.time}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ display:"flex", gap:8, marginTop:8 }}>
                        <button onClick={function(){ setProgressSub("target"); }} style={S.btnRed}>Get faster</button>
                        <button onClick={function(){ setTargetTime(null); setProgressTargetInput(""); }} style={S.btnGhost}>Change target</button>
                      </div>
                    </div>
                  );
                })()}

                {!targetTime && (
                  <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16 }}>
                    <div style={{ fontSize:13, color:C.grey, marginBottom:12 }}>Set a target time under "Target & gap" to see your progress towards it here.</div>
                    <button onClick={function(){ setProgressSub("target"); }} style={S.btnRed}>Set a target</button>
                  </div>
                )}
              </div>
            )}

            {progressSub === "history" && (
              <div>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, display:"block", marginBottom:12 }}>Your Record</span>
                {member.benchmarks.length === 0 ? (
                  <p style={{ color:C.grey }}>No benchmarks yet. Your coach will add them after sessions.</p>
                ) : (
                  member.benchmarks.map(function(b, i){
                    return (
                      <div key={i} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px", marginBottom:2 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom: (b.strokeCount1||b.strokeCount2||b.split50) ? 10 : 0 }}>
                          <div>
                            <div style={{ fontWeight:600, fontSize:14, marginBottom:2 }}>{b.event}</div>
                            <div style={{ fontSize:12, color:C.grey }}>{b.date}</div>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                            <span style={{ fontSize:10, fontWeight:700, color:C.grey }}>({(b.startType||"push")==="block"?"Dive":"Push"})</span>
                            <div style={{ fontWeight:900, fontSize:"1.4rem", color:EVENT_COLORS[b.event]||C.red, fontFamily:"monospace" }}>{b.time}</div>
                          </div>
                        </div>
                        {(b.strokeCount1 || b.strokeCount2 || b.split50) && (
                          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                            {b.strokeCount1 && (
                              <div style={{ background:C.bg, padding:"4px 10px", borderRadius:2, border:"1px solid "+C.border }}>
                                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:2 }}>1st 50</div>
                                <div style={{ fontWeight:700, fontSize:13, color:"#8b5cf6", fontFamily:"monospace" }}>{b.strokeCount1} str</div>
                              </div>
                            )}
                            {b.strokeCount2 && (
                              <div style={{ background:C.bg, padding:"4px 10px", borderRadius:2, border:"1px solid "+C.border }}>
                                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:2 }}>2nd 50</div>
                                <div style={{ fontWeight:700, fontSize:13, color:"#8b5cf6", fontFamily:"monospace" }}>{b.strokeCount2} str</div>
                              </div>
                            )}
                            {b.split50 && (
                              <div style={{ background:C.bg, padding:"4px 10px", borderRadius:2, border:"1px solid "+C.border }}>
                                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:2 }}>50m split</div>
                                <div style={{ fontWeight:700, fontSize:13, color:"#3b82f6", fontFamily:"monospace" }}>{b.split50}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}

        {tab === "events" && (
          <div>
            <span style={S.eyebrow}>Racing</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Events</h2>
            <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Log your race results and find what's coming up next.</p>

            <div style={{ display:"flex", borderBottom:"1px solid "+C.border, marginBottom:20 }}>
              {[["log","My race log"],["search","Find events"]].map(function(s) {
                const active = eventsSub===s[0];
                return (
                  <button key={s[0]} onClick={function(){ setEventsSub(s[0]); }} style={{ background:"none", border:"none", borderBottom:active?"2px solid "+C.red:"2px solid transparent", color:active?C.white:C.grey, padding:"9px 14px", fontSize:11, fontWeight:active?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" }}>{s[1]}</button>
                );
              })}
            </div>

            {eventsSub === "log" && (
              <RaceReportPage member={member} raceResults={raceResults} onSave={function(next){ setRaceResults(next); }}/>
            )}

            {eventsSub === "search" && (
              <RaceSearch member={member} plannedEvents={plannedEvents} onSave={function(next){ setPlannedEvents(next); }} isCoach={false} allMembers={allData.members}/>
            )}
          </div>
        )}

        {tab === "resources" && (
          <div>
            <span style={S.eyebrow}>Members' Area</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Resources</h2>
            <p style={{ fontSize:13, color:C.grey, marginBottom:20 }}>Everything you need to get started, plus premium content as you progress.</p>

            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.green, marginBottom:10 }}>Free for all members</div>

            {(function() {
              const ackCount = Object.keys(inductionAck).filter(function(k){ return inductionAck[k]; }).length;
              const allDone = ackCount >= 3;
              return (
                <div style={{ background:C.panel, border:"1px solid "+(allDone?C.green:C.border), borderRadius:2, marginBottom:2, overflow:"hidden" }}>
                  <div onClick={function(){ setShowInduction(!showInduction); }} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>Member Induction</div>
                      <div style={{ fontSize:12, color:C.grey, lineHeight:1.5 }}>Club etiquette, kit list and what to expect - read and confirm each section.</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                      {allDone ? (
                        <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.green, border:"1px solid "+C.green, padding:"2px 7px", borderRadius:1 }}>{"\u2713"} Complete</span>
                      ) : (
                        <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.amber, border:"1px solid "+C.amber, padding:"2px 7px", borderRadius:1 }}>{ackCount}/3</span>
                      )}
                      <span style={{ fontSize:13, color:C.grey }}>{showInduction?"-":"+"}</span>
                    </div>
                  </div>
                  {showInduction && (
                    <div style={{ borderTop:"1px solid "+C.border, padding:"18px 16px" }}>
                      <InductionPage acknowledged={inductionAck} onAcknowledge={function(next){ setInductionAck(next); }}/>
                    </div>
                  )}
                </div>
              );
            })()}

            <div onClick={function(){ setShowSessionPlan(!showSessionPlan); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, marginTop:2, marginBottom:2, overflow:"hidden", cursor:"pointer" }}>
              <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>This Week's Session Plan</div>
                  <div style={{ fontSize:12, color:C.grey, lineHeight:1.5 }}>What's planned for Friday - set, structure and focus for the week.</div>
                </div>
                <span style={{ fontSize:13, color:C.grey, flexShrink:0 }}>{showSessionPlan?"-":"+"}</span>
              </div>
              {showSessionPlan && (
                <div onClick={function(e){ e.stopPropagation(); }} style={{ borderTop:"1px solid "+C.border, padding:"16px" }}>
                  {!mySession ? (
                    <p style={{ color:C.grey, margin:0 }}>No session plan posted yet. Check back soon.</p>
                  ) : (
                    <div>
                      <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>{mySession.title}</div>
                      <div style={{ fontSize:12, color:C.grey, marginBottom:12 }}>{mySession.date}</div>
                      <pre style={{ fontFamily:"monospace", fontSize:13, color:C.greyLight, whiteSpace:"pre-wrap", background:C.bg, padding:"14px 16px", borderRadius:2, lineHeight:1.7, margin:0 }}>{mySession.plan}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:24, marginTop:2 }}>
              {[
                ["Basic swimming tips","Simple technique pointers on body position, breathing and pacing to build on early.",function(){ setTab("progress"); setProgressSub("target"); }],
                ["Beginner conditioning plan","A gentle 4-week plan to build aerobic base and confidence in the water.",null],
                ["Club news & announcements","Upcoming events, schedule changes and squad updates.",null],
              ].map(function(r, i) {
                return (
                  <div key={i} onClick={r[2] || function(){}} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px", cursor:r[2]?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>{r[0]}</div>
                      <div style={{ fontSize:12, color:C.grey, lineHeight:1.5 }}>{r[1]}</div>
                    </div>
                    {r[2] && <div style={{ fontSize:13, color:C.grey, flexShrink:0 }}>{"->"}</div>}
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.amber, marginBottom:10 }}>Premium - included in your membership</div>

            <div onClick={function(){ setShowDrillLibrary(!showDrillLibrary); }} style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, marginBottom:2, overflow:"hidden", cursor:"pointer" }}>
              <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>Full drill library</div>
                  <div style={{ fontSize:12, color:"#c99", lineHeight:1.5 }}>Stroke-by-stroke drill videos with coach notes, assigned personally by your coach.</div>
                </div>
                <span style={{ fontSize:13, color:C.amber, flexShrink:0 }}>{showDrillLibrary?"-":"+"}</span>
              </div>
              {showDrillLibrary && (
                <div onClick={function(e){ e.stopPropagation(); }} style={{ borderTop:"1px solid #78350f", padding:"18px 16px", background:C.bg }}>
                  <DrillLibraryPage isCoach={false} drills={allData.drillLibrary || DRILLS_DATA}/>
                </div>
              )}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:2, marginTop:2 }}>
              {[
                ["Detailed training plans & speed coach","Your personalised gap analysis, target splits and stroke prescriptions.",function(){ setTab("progress"); setProgressSub("target"); }],
                ["Online coaching sessions","Book 1:1 video review sessions with your coach for detailed technique feedback.",null],
              ].map(function(r, i) {
                return (
                  <div key={i} onClick={r[2] || function(){}} style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"14px 16px", cursor:r[2]?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>{r[0]}</div>
                      <div style={{ fontSize:12, color:"#c99", lineHeight:1.5 }}>{r[1]}</div>
                    </div>
                    {r[2] && <div style={{ fontSize:13, color:C.amber, flexShrink:0 }}>{"->"}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "records" && (
          <HallOfRecords records={allData.hallOfRecords || []} members={allData.members} isCoach={false} onUpdate={function(){}} currentMemberId={memberId}/>
        )}

        {tab === "messages" && (
          <MessagesPage currentUserId={memberId} currentUserName={member.nickname||member.name.split(" ")[0]} isCoach={false} messages={allData.messages} members={allData.members} onSend={sendMemberMessage}/>
        )}

        {tab === "pizza" && (
          <div style={{ textAlign:"center", padding:"20px 10px" }}>
            <div style={{ fontSize:52, marginBottom:12 }}>&#127829;&#129412;&#127881;</div>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:8 }}>Pizza Night Is On!</h2>
            <p style={{ color:C.grey, fontSize:14, lineHeight:1.7, maxWidth:380, margin:"0 auto 24px" }}>
              You survived Friday's set - now refuel the right way. Order your pizza, drag along a mate, and get it paid before the deadline. No login needed, just tap through.
            </p>
            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"20px", maxWidth:360, margin:"0 auto" }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>How it works</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10, textAlign:"left" }}>
                <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>1. Open the Pizza Night link shared by your coach</div>
                <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>2. Add your name, plus-ones, pizzas, drinks and extras</div>
                <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>3. Pay before the deadline - unpaid orders get dropped</div>
              </div>
            </div>
            <p style={{ color:C.greyDark, fontSize:12, marginTop:20 }}>Ask your coach for this week's Pizza Night link if you don't have it.</p>
          </div>
        )}

      </div>
    </div>
  );
}

function ApplicationForm({ onSubmit }) {
  const EMPTY = {
    name:"Swimz Swimmer", email:"swimz.swimmer@example.com", mobile:"07700 900123", dob:"1996-04-12",
    password:"swimfast2026", confirmPassword:"swimfast2026",
    emergencyName:"Alex Swimmer", emergencyPhone:"07700 900456",
    swimmerType:"Club swimmer", timesPerWeek:"3", swimmingSince:"1-3 years",
    pb100:"1:12.0", pbEstimated:true, strokeRank1:"Freestyle", strokeRank2:"Backstroke", strokeRank3:"Breaststroke", strokeRank4:"Butterfly", kickRating:"6",
    benchmarkMode:"average", benchmark1:"1:18.0", benchmark2:"1:19.0", benchmark3:"1:19.5",
    benchmark4:"1:20.0", benchmark5:"1:20.5", benchmark6:"1:21.0", benchmarkAvg:"1:19.7", benchmarkDNF:false,
    goals:"Improve my 100m freestyle technique and build towards a county-level time.", targetEvent:"Sub-70s 100m Free by end of the block",
    medical:"", extra:"Looking forward to joining the squad!",
  };
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY);

  const STEPS = ["Your details","Swimming background","Current ability","Benchmark set","Goals & health","Review"];

  function setF(k, v) { setForm(function(f){ const u=Object.assign({},f); u[k]=v; return u; }); }
  function next() { setStep(function(s){ return Math.min(s+1, STEPS.length-1); }); }
  function back() { setStep(function(s){ return Math.max(s-1, 0); }); }

  function handleName(e) { setF("name", e.target.value); }
  function handleEmail(e) { setF("email", e.target.value); }
  function handlePassword(e) { setF("password", e.target.value); }
  function handleConfirmPassword(e) { setF("confirmPassword", e.target.value); }
  function handleMobile(e) { setF("mobile", e.target.value); }
  function handleDob(e) { setF("dob", e.target.value); }
  function handleEmName(e) { setF("emergencyName", e.target.value); }
  function handleEmPhone(e) { setF("emergencyPhone", e.target.value); }
  function handleSwimmerType(e) { setF("swimmerType", e.target.value); }
  function handleTimesPerWeek(e) { setF("timesPerWeek", e.target.value); }
  function handleSwimmingSince(e) { setF("swimmingSince", e.target.value); }
  function handlePb100(e) { setF("pb100", e.target.value); }
  function handlePbEstimated() { setF("pbEstimated", !form.pbEstimated); }
  function handleStrokeRank(rank, e) { setF("strokeRank"+rank, e.target.value); }
  function handleKickRating(e) { setF("kickRating", e.target.value); }
  function handleBenchMode(mode) { setF("benchmarkMode", mode); }
  function handleBenchAvg(e) { setF("benchmarkAvg", e.target.value); }
  function handleBenchDNF() { setF("benchmarkDNF", !form.benchmarkDNF); }
  function handleGoals(e) { setF("goals", e.target.value); }
  function handleTargetEvent(e) { setF("targetEvent", e.target.value); }
  function handleMedical(e) { setF("medical", e.target.value); }
  function handleExtra(e) { setF("extra", e.target.value); }

  const SWIMMER_TYPES = ["Masters","Pool","Open Water","Triathlete","Fitness Swimmer","Beginner","Returning to Swimming","Public Lane Swimmer","Former Competitive Swimmer","Other"];
  const STROKES = ["Freestyle","Backstroke","Breaststroke","Butterfly","IM / mixed"];

  const inputStyle = { width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };
  const labelStyle = { display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#888", marginBottom:6 };
  const btnRed = { background:"#e01a1a", color:"#fff", padding:"11px 22px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" };
  const btnGhost = { background:"transparent", border:"1px solid #333", color:"#bbb", padding:"11px 22px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 };

  function isStepValid() {
    if (step===0) return form.name.trim() && form.email.trim() && form.mobile.trim() && form.dob.trim() && (calcAge(form.dob)===null || calcAge(form.dob)>=18) && form.password.length>=6 && form.password===form.confirmPassword;
    if (step===1) return form.swimmerType && form.timesPerWeek && form.swimmingSince;
    if (step===2) return form.pb100.trim() && form.strokeRank1 && form.strokeRank2 && form.strokeRank3 && form.strokeRank4;
    return true;
  }

  function handleNext() {
    if (!isStepValid()) return;
    next();
  }

  function handleSubmitForm() {
    onSubmit(form);
  }

  const benchFields = [
    ["benchmark1","1"],["benchmark2","2"],["benchmark3","3"],
    ["benchmark4","4"],["benchmark5","5"],["benchmark6","6"],
  ];

  return (
    <div>
      <div style={{ display:"flex", gap:4, marginBottom:20 }}>
        {STEPS.map(function(s,i) {
          return <div key={s} style={{ flex:1, height:3, background:i<=step?"#e01a1a":"#262626", borderRadius:2 }}/>;
        })}
      </div>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#e01a1a", marginBottom:4 }}>
        Step {step+1} of {STEPS.length}
      </div>
      <h3 style={{ fontWeight:900, fontSize:"1.3rem", textTransform:"uppercase", marginBottom:20 }}>{STEPS[step]}</h3>

      {step===0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={labelStyle}>Full name</label>
            <input value={form.name} onChange={handleName} placeholder="Your full name" style={inputStyle}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={labelStyle}>Email address</label>
              <input type="email" value={form.email} onChange={handleEmail} placeholder="your@email.com" style={inputStyle}/>
            </div>
            <div>
              <label style={labelStyle}>Mobile number</label>
              <input type="tel" value={form.mobile} onChange={handleMobile} placeholder="07..." style={inputStyle}/>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Date of birth</label>
            <input type="date" value={form.dob} onChange={handleDob} style={inputStyle}/>
            <div style={{ fontSize:11, color:"#666", marginTop:6, lineHeight:1.6 }}>SwimFasterLondon is open to adult swimmers only (18+).</div>
            {form.dob && calcAge(form.dob)!==null && calcAge(form.dob)<18 && (
              <div style={{ fontSize:12, color:"#ff6b6b", marginTop:6, lineHeight:1.6 }}>You must be 18 or older to apply. Please check the date entered.</div>
            )}
          </div>
          <div style={{ borderTop:"1px solid #262626", paddingTop:14, marginTop:4 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:10 }}>Set up your account</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" value={form.password} onChange={handlePassword} placeholder="Choose a password" style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Confirm password</label>
                <input type="password" value={form.confirmPassword} onChange={handleConfirmPassword} placeholder="Re-enter password" style={inputStyle}/>
              </div>
            </div>
            <div style={{ fontSize:11, color:"#666", marginTop:6, lineHeight:1.6 }}>You'll use this to log in and check your application status straight away - even before your coach approves it.</div>
            {form.password && form.password.length<6 && <div style={{ fontSize:11, color:"#f97316", marginTop:6 }}>Password should be at least 6 characters.</div>}
            {form.confirmPassword && form.password!==form.confirmPassword && <div style={{ fontSize:11, color:"#ff6b6b", marginTop:6 }}>Passwords do not match.</div>}
          </div>
          <div style={{ borderTop:"1px solid #262626", paddingTop:14 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:10 }}>Emergency contact</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={labelStyle}>Contact name</label>
                <input value={form.emergencyName} onChange={handleEmName} placeholder="Name" style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Contact number</label>
                <input type="tel" value={form.emergencyPhone} onChange={handleEmPhone} placeholder="Phone" style={inputStyle}/>
              </div>
            </div>
          </div>
        </div>
      )}

      {step===1 && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={labelStyle}>What type of swimmer are you?</label>
            <select value={form.swimmerType} onChange={handleSwimmerType} style={inputStyle}>
              <option value="" style={{background:"#161616"}}>Select...</option>
              {SWIMMER_TYPES.map(function(t){ return <option key={t} value={t} style={{background:"#161616"}}>{t}</option>; })}
            </select>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={labelStyle}>Times you swim per week</label>
              <select value={form.timesPerWeek} onChange={handleTimesPerWeek} style={inputStyle}>
                <option value="" style={{background:"#161616"}}>Select...</option>
                {["0 - just starting out","1","2","3","4","5+"].map(function(o){ return <option key={o} value={o} style={{background:"#161616"}}>{o}</option>; })}
              </select>
            </div>
            <div>
              <label style={labelStyle}>How long have you been swimming?</label>
              <select value={form.swimmingSince} onChange={handleSwimmingSince} style={inputStyle}>
                <option value="" style={{background:"#161616"}}>Select...</option>
                {["Just starting","Under 1 year","1-3 years","3-5 years","5-10 years","10+ years"].map(function(o){ return <option key={o} value={o} style={{background:"#161616"}}>{o}</option>; })}
              </select>
            </div>
          </div>
        </div>
      )}

      {step===2 && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={labelStyle}>Current 100m Freestyle personal best</label>
            <input value={form.pb100} onChange={handlePb100} placeholder="e.g. 1:12.0 (or your best estimate)" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"monospace" }}/>
            <div onClick={handlePbEstimated} style={{ display:"flex", alignItems:"center", gap:8, marginTop:8, cursor:"pointer" }}>
              <div style={{ width:16, height:16, border:"1px solid #555", borderRadius:2, background:form.pbEstimated?"#e01a1a":"transparent", flexShrink:0 }}/>
              <span style={{ fontSize:12, color:"#999" }}>This is an estimate, not a timed result</span>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Rank the four strokes from strongest to weakest</label>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:4 }}>
              {[1,2,3,4].map(function(rank) {
                const rankLabel = rank===1?"1st - Strongest":rank===2?"2nd":rank===3?"3rd":"4th - Weakest";
                const fieldKey = "strokeRank"+rank;
                return (
                  <div key={rank} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ fontSize:11, color:"#888", minWidth:96, flexShrink:0 }}>{rankLabel}</div>
                    <select value={form[fieldKey]} onChange={function(e){ handleStrokeRank(rank, e); }} style={inputStyle}>
                      <option value="" style={{background:"#161616"}}>Select...</option>
                      {["Freestyle","Backstroke","Breaststroke","Butterfly"].map(function(s){ return <option key={s} value={s} style={{background:"#161616"}}>{s}</option>; })}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Rate your kick out of 10</label>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <input type="range" min="1" max="10" value={form.kickRating} onChange={handleKickRating} style={{ flex:1 }}/>
              <div style={{ width:36, height:36, borderRadius:"50%", background:"#e01a1a", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:15, flexShrink:0 }}>{form.kickRating}</div>
            </div>
            <div style={{ fontSize:11, color:"#666", marginTop:6 }}>Be honest - this helps your coach plan technique work.</div>
          </div>
        </div>
      )}

      {step===3 && (
        <div>
          <div style={{ background:"#111", border:"1px solid #262626", borderRadius:2, padding:"14px 16px", marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:14, color:"#fff", marginBottom:4 }}>6 x 100m Freestyle, leaving every 2:00</div>
            <div style={{ fontSize:12, color:"#888", lineHeight:1.6 }}>This helps us place you in the right lane. If you have not done this exact set, just give us your best estimate - or let us know you were unable to complete it.</div>
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <button onClick={function(){ handleBenchMode("individual"); }} style={form.benchmarkMode==="individual" ? btnRed : btnGhost}>Individual times</button>
            <button onClick={function(){ handleBenchMode("average"); }} style={form.benchmarkMode==="average" ? btnRed : btnGhost}>Average time</button>
          </div>

          {form.benchmarkMode==="individual" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
              {benchFields.map(function(bf) {
                return (
                  <div key={bf[0]}>
                    <label style={labelStyle}>#{bf[1]}</label>
                    <input value={form[bf[0]]} onChange={function(e){ setF(bf[0], e.target.value); }} placeholder="1:15.0" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"monospace" }}/>
                  </div>
                );
              })}
            </div>
          )}

          {form.benchmarkMode==="average" && (
            <div style={{ marginBottom:14 }}>
              <label style={labelStyle}>Average 100m time across the set</label>
              <input value={form.benchmarkAvg} onChange={handleBenchAvg} placeholder="e.g. 1:16.0" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"monospace" }}/>
            </div>
          )}

          <div onClick={handleBenchDNF} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
            <div style={{ width:16, height:16, border:"1px solid #555", borderRadius:2, background:form.benchmarkDNF?"#e01a1a":"transparent", flexShrink:0 }}/>
            <span style={{ fontSize:12, color:"#999" }}>I was unable to complete this set - that's okay, we'll work it out together</span>
          </div>
        </div>
      )}

      {step===4 && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={labelStyle}>What are your main swimming goals?</label>
            <textarea value={form.goals} onChange={handleGoals} placeholder="e.g. Improve my technique, get faster for open water, build fitness..." rows={3} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical" }}/>
          </div>
          <div>
            <label style={labelStyle}>Is there a race, event, or target time you're working towards? (optional)</label>
            <input value={form.targetEvent} onChange={handleTargetEvent} placeholder="e.g. Sub-60s 100m Free by October" style={inputStyle}/>
          </div>
          <div style={{ borderTop:"1px solid #262626", paddingTop:14 }}>
            <label style={labelStyle}>Injuries, medical conditions or physical limitations</label>
            <textarea value={form.medical} onChange={handleMedical} placeholder="Please let us know anything your coach should be aware of. Leave blank if none." rows={3} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical" }}/>
          </div>
          <div>
            <label style={labelStyle}>Anything else you'd like your coach to know? (optional)</label>
            <textarea value={form.extra} onChange={handleExtra} placeholder="Anything at all before your first session..." rows={2} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical" }}/>
          </div>
        </div>
      )}

      {step===5 && (
        <div>
          <div style={{ background:"#111", border:"1px solid #262626", borderRadius:2, padding:16, marginBottom:16 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              <div><div style={labelStyle}>Name</div><div style={{ fontSize:14, color:"#fff" }}>{form.name}</div></div>
              <div><div style={labelStyle}>Email</div><div style={{ fontSize:14, color:"#fff" }}>{form.email}</div></div>
              <div><div style={labelStyle}>Mobile</div><div style={{ fontSize:14, color:"#fff" }}>{form.mobile}</div></div>
              <div><div style={labelStyle}>Date of birth</div><div style={{ fontSize:14, color:"#fff" }}>{form.dob}</div></div>
              <div><div style={labelStyle}>Swimmer type</div><div style={{ fontSize:14, color:"#fff" }}>{form.swimmerType}</div></div>
              <div><div style={labelStyle}>100m Free PB</div><div style={{ fontSize:14, color:"#fff", fontFamily:"monospace" }}>{form.pb100}{form.pbEstimated?" (est.)":""}</div></div>
            </div>
            {form.goals && (
              <div style={{ borderTop:"1px solid #262626", paddingTop:12 }}>
                <div style={labelStyle}>Goals</div>
                <div style={{ fontSize:13, color:"#ccc", lineHeight:1.6 }}>{form.goals}</div>
              </div>
            )}
          </div>
          <div style={{ fontSize:12, color:"#666", lineHeight:1.7, marginBottom:4 }}>
            By submitting, you confirm the information above is accurate to the best of your knowledge. We'll be in touch within a few days to discuss next steps.
          </div>
        </div>
      )}

      <div style={{ display:"flex", gap:10, marginTop:24 }}>
        {step > 0 && <button onClick={back} style={btnGhost}>Back</button>}
        {step < STEPS.length-1 && <button onClick={handleNext} style={{ background:"#e01a1a", color:"#fff", padding:"11px 22px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer", opacity:isStepValid()?1:0.4 }}>Continue</button>}
        {step === STEPS.length-1 && <button onClick={handleSubmitForm} style={btnRed}>Submit application</button>}
      </div>
    </div>
  );
}

function PublicSite({ onLogin, onApply }) {
  const [submitted, setSubmitted] = useState(false);
  const [showApply, setShowApply] = useState(false);

  function openApply() { setShowApply(true); }
  function closeApply() { setShowApply(false); setSubmitted(false); }

  function handleSubmit(formData) {
    const appPayload = {
      name: formData.name, email: formData.email, mobile: formData.mobile, dob: formData.dob,
      password: formData.password,
      emergencyName: formData.emergencyName, emergencyPhone: formData.emergencyPhone,
      swimmerType: formData.swimmerType, timesPerWeek: formData.timesPerWeek, swimmingSince: formData.swimmingSince,
      pb100: formData.pb100, pbEstimated: formData.pbEstimated,
      strokeRank1: formData.strokeRank1, strokeRank2: formData.strokeRank2, strokeRank3: formData.strokeRank3, strokeRank4: formData.strokeRank4, kickRating: formData.kickRating,
      benchmarkMode: formData.benchmarkMode, benchmarkAvg: formData.benchmarkAvg, benchmarkDNF: formData.benchmarkDNF,
      benchmark1: formData.benchmark1, benchmark2: formData.benchmark2, benchmark3: formData.benchmark3,
      benchmark4: formData.benchmark4, benchmark5: formData.benchmark5, benchmark6: formData.benchmark6,
      goals: formData.goals, targetEvent: formData.targetEvent, medical: formData.medical, extra: formData.extra,
      level: formData.swimmerType,
      message: formData.extra || formData.goals || "",
    };
    if (onApply) onApply(appPayload);
    setSubmitted(true);
  }

  if (showApply) {
    return (
      <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", fontSize:14, minHeight:"100vh" }}>
        <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,10,0.97)", borderBottom:"1px solid "+C.border, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px" }}>
          <Logo height={36}/>
          <button onClick={closeApply} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"8px 14px", fontSize:11 }}>Close</button>
        </nav>
        <div style={{ padding:"32px 20px 60px", maxWidth:560, margin:"0 auto" }}>
          <span style={S.eyebrow}>Membership Application</span>
          <h2 style={{ fontWeight:900, fontSize:"1.8rem", textTransform:"uppercase", marginBottom:8 }}>Apply for a Spot</h2>
          <p style={{ color:C.grey, lineHeight:1.7, marginBottom:24 }}>Takes about 5 minutes. This helps us understand your swimming background and place you in the right squad from day one.</p>
          {submitted ? (
            <div style={{ background:C.panel, border:"1px solid "+C.border, padding:28, borderRadius:2, textAlign:"center" }}>
              <div style={{ color:C.red, fontWeight:900, fontSize:20, marginBottom:8 }}>Application received</div>
              <p style={{ color:C.grey, lineHeight:1.7, maxWidth:360, margin:"0 auto 20px" }}>Thank you for applying to SwimFasterLondon. Your coach will review your application and be in touch within a few days. You can log in now with the email and password you just set to check your status.</p>
              <button onClick={closeApply} style={{ background:"#e01a1a", color:"#fff", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" }}>Back to homepage</button>
            </div>
          ) : (
            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:20 }}>
              <ApplicationForm onSubmit={handleSubmit}/>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", fontSize:14 }}>
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,10,0.97)", borderBottom:"1px solid "+C.border, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px" }}>
        <Logo height={36}/>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={openApply} style={{ background:"transparent", border:"1px solid "+C.red, color:C.red, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"8px 14px", fontSize:11 }}>Apply for a Spot</button>
          <button onClick={onLogin} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"8px 14px", fontSize:11 }}>Member Login</button>
        </div>
      </nav>

      <section style={{ padding:"56px 20px 48px", borderBottom:"2px solid "+C.red }}>
        <span style={S.eyebrow}>Friday Night Sessions - London</span>
        <h1 style={{ fontWeight:900, fontSize:"clamp(2.4rem,10vw,4.5rem)", lineHeight:0.92, textTransform:"uppercase", margin:"0 0 20px" }}>
          Train Hard.<br/><span style={{ color:C.red }}>Swim Faster.</span>
        </h1>
        <p style={{ color:C.grey, maxWidth:380, lineHeight:1.7, marginBottom:32 }}>
          Technique-led, data-driven squad sessions for competitive swimmers who want to see real progress.
        </p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button onClick={openApply} style={{ background:"#e01a1a", color:"#fff", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" }}>Apply for a Spot</button>
          <a href="#sessions" style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, textDecoration:"none", display:"inline-block" }}>View Sessions</a>
        </div>
      </section>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:"1px solid "+C.border }}>
        {[["12","Per block"],["3mo","Blocks"],["100%","Tracked"]].map(function(item, i){
          return (
            <div key={item[0]} style={{ padding:"24px 16px", borderRight:i<2 ? "1px solid "+C.border : "none" }}>
              <div style={{ fontWeight:900, fontSize:"2rem", color:C.red, lineHeight:1 }}>{item[0]}</div>
              <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginTop:4 }}>{item[1]}</div>
            </div>
          );
        })}
      </div>

      <section id="sessions" style={{ padding:"48px 20px", borderBottom:"1px solid "+C.border }}>
        <span style={S.eyebrow}>What We Offer</span>
        <h2 style={{ fontWeight:900, fontSize:"1.8rem", textTransform:"uppercase", marginBottom:20 }}>Sessions</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:2, background:C.border }}>
          {[
            ["Squad","Endurance, Speed & Technique","Sessions tailored to your current training phase and goals.","All levels"],
          ].map(function(item){
            const bc = C.red;
            return (
              <div key={item[0]} style={{ background:C.panel, padding:"20px" }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:bc, border:"1px solid "+bc, padding:"2px 8px", display:"inline-block", marginBottom:10 }}>{item[0]}</span>
                <h3 style={{ fontWeight:700, fontSize:"1rem", textTransform:"uppercase", marginBottom:6 }}>{item[1]}</h3>
                <p style={{ color:C.grey, lineHeight:1.6, marginBottom:8 }}>{item[2]}</p>
                <div style={{ fontSize:12, color:C.greyLight }}>Level: {item[3]} - Friday evenings - 90 min</div>
              </div>
            );
          })}
        </div>
      </section>

      <footer style={{ padding:"28px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <Logo height={32}/>
        <span style={{ color:C.greyDark, fontSize:12 }}>&copy; 2026 Swim Faster London</span>
      </footer>
    </div>
  );
}


export default function App() {
  const [view, setView] = useState("site");
  const [memberId, setMemberId] = useState(null);
  const [data, setData] = useState(INIT);

  function addApplication(appData) {
    const appId = Date.now();
    const newApp = Object.assign({}, appData, {
      id: appId,
      date: new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),
      status: "pending"
    });
    const newMember = {
      id: appId, applicationId: appId, name: appData.name, email: appData.email,
      password: appData.password,
      memberStatus: "pending",
      joined: new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}),
      paid: false, age: null, level: appData.swimmerType||"", specialty: appData.strokeRank1||"",
      bio: appData.goals||"", goals: appData.goals||"", competitions: appData.targetEvent||"",
      medicalNotes: appData.medical||"", emergencyName: appData.emergencyName||"", emergencyPhone: appData.emergencyPhone||"",
      mobile: appData.mobile||"", dob: appData.dob||"",
      benchmarks: [], prescribedDrills: [], raceResults: [], plannedEvents: [], inductionAck: {}
    };
    setData(function(d) {
      return Object.assign({}, d, {
        applications: d.applications.concat([newApp]),
        members: d.members.concat([newMember])
      });
    });
    return newMember.id;
  }

  if (view === "login") {
    return (
      <LoginPage
        onCoach={function(){ setView("coach"); }}
        onMember={function(id){ setMemberId(id); setView("member"); }}
        onBack={function(){ setView("site"); }}
        members={data.members}
      />
    );
  }

  if (view === "coach") {
    return <CoachDashboard onLogout={function(){ setView("site"); }} sharedData={data} setSharedData={setData}/>;
  }

  if (view === "member") {
    return (
      <MemberDashboard
        memberId={memberId}
        allData={data}
        setAllData={setData}
        onLogout={function(){ setMemberId(null); setView("site"); }}
      />
    );
  }

  return <PublicSite onLogin={function(){ setView("login"); }} onApply={addApplication}/>;
}

import { useState, useRef, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import * as api from "./lib/api";
/*
  Swim Faster London - club platform
  Build: v16 - 05 Aug 2026
  Coach login: henryfincher@gmail.com / Coach2026
  Swimmer login: katie.uob@gmail.com / Swimmer2026
  All fake demo members and applicants removed - only real swimmers remain
  (Marc, Esme, Irene, Matty, Tamsin, Jet, Yoav, Oliver, Nico, Bruno, Jenny,
  Jesse, Katie), all with blank/incomplete profiles pending their real
  application.
  This banner intentionally shifts line numbers to invalidate
  any cached transpile of an earlier build.
*/

const SESSIONS_DATA = [
  { id:1,  date:"2026-04-11", title:"Swim Faster Friday", focus:"Catch-up drill & sprint speed", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nDrill: 8x50m catch-up @ 1:30\nMain: 8x100m @ 1:20\nSprint: 4x50m all-out\nC/D: 200m easy", attendance:{} },
  { id:2,  date:"2026-04-18", title:"Swim Faster Friday", focus:"Fist drill & speed work", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy + 4x25m build\nDrill: 6x50m fist drill\nMain: 6x100m @ 1:15\nSpeed: 8x25m all-out\nC/D: 200m easy", attendance:{} },
  { id:3,  date:"2026-04-25", title:"Swim Faster Friday", focus:"Open water sighting", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nSighting: 4x200m\nPace: 3x400m aerobic\nC/D: 200m easy", attendance:{} },
  { id:4,  date:"2026-05-02", title:"Swim Faster Friday", focus:"Catch-up drill & aerobic", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nDrill: 8x50m catch-up\nMain: 10x100m @ 1:20\nC/D: 200m easy", attendance:{} },
  { id:5,  date:"2026-05-09", title:"Swim Faster Friday", focus:"Race pace & speed", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nMain: 4x200m @ 3:00\nSpeed: 6x50m race pace\nC/D: 300m easy", attendance:{} },
  { id:6,  date:"2026-05-16", title:"Swim Faster Friday", focus:"6-3-6 drill & descending pace", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nDrill: 6x50m 6-3-6\nMain: 8x100m descend\nC/D: 200m easy", attendance:{} },
  { id:7,  date:"2026-05-23", title:"Swim Faster Friday", focus:"Aerobic endurance & sprint", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 3x400m + 4x50m fast\nC/D: 200m easy", attendance:{} },
  { id:8,  date:"2026-05-30", title:"Swim Faster Friday", focus:"Pull technique & sprint", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nDrill: 4x100m pull\nMain: 6x100m @ 1:15\nSprint: 4x25m max\nC/D: 200m easy", attendance:{} },
  { id:9,  date:"2026-06-06", title:"Swim Faster Friday", focus:"Aerobic endurance & technique", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 2x800m aerobic\nTechnique: 4x100m drill\nC/D: 200m easy", attendance:{} },
  { id:10, date:"2026-06-13", title:"Swim Faster Friday", focus:"Fingertip drag drill", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nDrill: 8x50m fingertip drag\nMain: 8x100m @ 1:20\nC/D: 200m easy", attendance:{} },
  { id:11, date:"2026-06-20", title:"Swim Faster Friday", focus:"Pace & speed", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 5x200m @ 3:20\nSpeed: 8x25m all-out\nC/D: 200m easy", attendance:{} },
  { id:12, date:"2026-06-27", title:"Swim Faster Friday", focus:"Catch-up drill & endurance", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nDrill: 6x50m catch-up\nMain: 10x100m @ 1:15\nC/D: 200m easy", attendance:{} },
  { id:13, date:"2026-07-04", title:"Swim Faster Friday", focus:"100m Free benchmark", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nBenchmark: 100m Free time trial (all swimmers)\nDrill: 4x50m technique\nC/D: 300m easy", attendance:{} },
  { id:14, date:"2026-07-11", title:"Swim Faster Friday", focus:"Aerobic & race pace sprint", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 8x100m @ 1:20\nSprint: 6x50m race pace\nC/D: 200m easy", attendance:{} },
  { id:15, date:"2026-07-18", title:"Swim Faster Friday", focus:"Fist drill & pace work", block:"Squad", time:"18:30-20:30", plan:"W/U: 300m easy\nDrill: 8x50m fist drill\nMain: 4x200m @ 3:00\nC/D: 200m easy", attendance:{} },
  { id:16, date:"2026-07-25", title:"Swim Faster Friday", block:"Squad", time:"18:30-20:30", plan:"W/U: 400m easy\nMain: 3x400m aerobic\nSpeed: 4x50m max\nC/D: 200m easy", attendance:{} },

  { id:17, date:"2026-08-07", title:"Swim Faster Friday", focus:"General squad session (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:18, date:"2026-08-14", title:"Swim Faster Friday", focus:"Technique & drill work (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:19, date:"2026-08-21", title:"Swim Faster Friday", focus:"Aerobic endurance (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:20, date:"2026-08-28", title:"Swim Faster Friday", focus:"Sprint & speed work (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:21, date:"2026-09-04", title:"Swim Faster Friday", focus:"Race pace sets (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:22, date:"2026-09-11", title:"Swim Faster Friday", focus:"Open water preparation (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:23, date:"2026-09-18", title:"Swim Faster Friday", focus:"Recovery & aerobic swim (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:24, date:"2026-09-25", title:"Swim Faster Friday", focus:"Mixed strokes & drills (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:25, date:"2026-10-02", title:"Swim Faster Friday", focus:"General squad session (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:26, date:"2026-10-09", title:"Swim Faster Friday", focus:"Technique & drill work (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:27, date:"2026-10-16", title:"Swim Faster Friday", focus:"Aerobic endurance (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:28, date:"2026-10-23", title:"Swim Faster Friday", focus:"Sprint & speed work (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:29, date:"2026-10-30", title:"Swim Faster Friday", focus:"Race pace sets (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:30, date:"2026-11-06", title:"Swim Faster Friday", focus:"Open water preparation (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:31, date:"2026-11-13", title:"Swim Faster Friday", focus:"Recovery & aerobic swim (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
  { id:32, date:"2026-11-20", title:"Swim Faster Friday", focus:"Mixed strokes & drills (placeholder - update with real session plan)", block:"Squad", time:"18:30-20:30", plan:"", attendance:{} },
];

const BLOCKS = [
  { id:"2026-q2", label:"Apr-Jun 2026", startDate:"2026-04-01", endDate:"2026-06-30", priceFull:270, isOpen:false },
  { id:"2026-q3", label:"Jul-Sep 2026", startDate:"2026-07-01", endDate:"2026-09-30", priceFull:270, isOpen:true },
  { id:"2026-q4", label:"Oct-Dec 2026", startDate:"2026-10-01", endDate:"2026-12-31", priceFull:270, isOpen:true },
  { id:"2027-q1", label:"Jan-Mar 2027", startDate:"2027-01-01", endDate:"2027-03-31", priceFull:280, isOpen:true },
];

const YEAR_PLAN = { label:"Full Year", discountPercent:15 };
const SESSION_PACK_10 = { sessions:10, price:200 }; // £20/session
const SESSION_PACK_PER_SESSION_PRICE = 25;
const SPECIAL_PER_SESSION_RATES = {
  "ocparkes@gmail.com": 20, // Oliver's real email - his placeholder has been replaced now his real address is known
};

function perSessionRateForEmail(email) {
  const emailLower = (email||"").trim().toLowerCase();
  if (SPECIAL_PER_SESSION_RATES[emailLower] !== undefined) return SPECIAL_PER_SESSION_RATES[emailLower];
  return SESSION_PACK_PER_SESSION_PRICE;
}

function pack10PriceForEmail(email) {
  const rate = perSessionRateForEmail(email);
  return rate < 20 ? rate * SESSION_PACK_10.sessions : SESSION_PACK_10.price;
}

const BANK_DETAILS = {
  accountName: "Henry Fincher trading as SwimFasterLondon",
  sortCode: "04-00-03",
  accountNumber: "13806784",
};



// No real enrolment history exists yet - this is a safe pass-through until real
// swimmers actually sign up for blocks. Kept as a function (rather than removed)
// so real historical enrolments can be wired back in later without restructuring.
function applyExistingEnrolments(members) {
  return members;
}

function deriveApplicantMembers(applicants) {
  return applicants.map(function(a) {
    return {
      id: a.id, applicationId: a.id, name: a.name, email: a.email,
      password: "demo1234",
      memberStatus: "pending",
      joined: "Jul 2026",
      paid: false, age: null, level: a.swimmerType||"", specialty: a.strokeRank1||"",
      bio: a.goals||"", goals: a.goals||"", competitions: a.targetEvent||"",
      medicalNotes: a.medical||"", emergencyName:"", emergencyPhone:"",
      mobile: a.mobile||"", dob: a.dob||"",
      benchmarks: [], prescribedDrills: [], raceResults: [], plannedEvents: [], inductionAck: {},
      blockEnrolments: a.blockEnrolment ? [a.blockEnrolment] : []
    };
  });
}

const CAKE_BAKES = [
  { id:1, name:"Double Chocolate Chip Cookies", description:"Rich cocoa cookies loaded with dark and milk chocolate chips.", bakerName:"Esme", date:"13 Mar 2026", photo:null, ratings:{} },
  { id:2, name:"Lemon Drizzle Muffins", description:"Zesty lemon muffins with a sweet lemon glaze on top.", bakerName:"Esme", date:"20 Mar 2026", photo:null, ratings:{} },
  { id:3, name:"Banana Bread Squares", description:"Moist banana bread with a hint of cinnamon, cut into squares.", bakerName:"Esme", date:"27 Mar 2026", photo:null, ratings:{} },
  { id:4, name:"Salted Caramel Brownies", description:"Fudgy brownies with a salted caramel swirl through the middle.", bakerName:"Esme", date:"03 Apr 2026", photo:null, ratings:{} },
  { id:5, name:"Blueberry Oat Muffins", description:"Wholesome oat muffins packed with fresh blueberries.", bakerName:"Esme", date:"10 Apr 2026", photo:null, ratings:{} },
  { id:6, name:"Ginger Nut Cookies", description:"Crunchy spiced ginger cookies with a golden syrup kick.", bakerName:"Esme", date:"17 Apr 2026", photo:null, ratings:{} },
  { id:7, name:"Carrot Cake Muffins", description:"Individual carrot cake muffins topped with cream cheese frosting.", bakerName:"Esme", date:"24 Apr 2026", photo:null, ratings:{} },
  { id:8, name:"White Chocolate & Raspberry Cookies", description:"Soft cookies with white chocolate chunks and dried raspberries.", bakerName:"Esme", date:"01 May 2026", photo:null, ratings:{} },
  { id:9, name:"Coffee Walnut Muffins", description:"Coffee-flavoured sponge muffins with toasted walnut pieces.", bakerName:"Esme", date:"08 May 2026", photo:null, ratings:{} },
  { id:10, name:"Peanut Butter Cookies", description:"Classic criss-cross peanut butter cookies, chewy in the middle.", bakerName:"Esme", date:"15 May 2026", photo:null, ratings:{} },
  { id:11, name:"Apple Cinnamon Muffins", description:"Diced apple and warm cinnamon in a soft muffin base.", bakerName:"Esme", date:"22 May 2026", photo:null, ratings:{} },
  { id:12, name:"Millionaire's Shortbread Bites", description:"Buttery shortbread, caramel, and chocolate in bite-sized squares.", bakerName:"Esme", date:"29 May 2026", photo:null, ratings:{} },
  { id:13, name:"Oatmeal Raisin Cookies", description:"Chewy oat cookies with plump raisins throughout.", bakerName:"Esme", date:"05 Jun 2026", photo:null, ratings:{} },
  { id:14, name:"Chocolate Orange Muffins", description:"Rich chocolate muffins with a subtle orange zest.", bakerName:"Esme", date:"12 Jun 2026", photo:null, ratings:{} },
  { id:15, name:"Rocky Road Bites", description:"No-bake bites with marshmallow, biscuit, and chocolate.", bakerName:"Esme", date:"19 Jun 2026", photo:null, ratings:{} },
  { id:16, name:"Cherry Bakewell Muffins", description:"Almond sponge muffins with a cherry jam centre and icing drizzle.", bakerName:"Esme", date:"26 Jun 2026", photo:null, ratings:{} },
  { id:17, name:"Triple Chocolate Cookies", description:"White, milk, and dark chocolate all in one soft-baked cookie.", bakerName:"Esme", date:"03 Jul 2026", photo:null, ratings:{} },
  { id:18, name:"Sticky Toffee Muffins", description:"Date sponge muffins with a sticky toffee glaze.", bakerName:"Esme", date:"10 Jul 2026", photo:null, ratings:{} },
  { id:19, name:"Lemon & Poppy Seed Cookies", description:"Light, zesty cookies with a delicate poppy seed crunch.", bakerName:"Esme", date:"17 Jul 2026", photo:null, ratings:{} },
  { id:20, name:"Nutella Stuffed Muffins", description:"Chocolate muffins with a molten Nutella centre.", bakerName:"Esme", date:"24 Jul 2026", photo:null, ratings:{} },
];

const COACHES_DATA = [
  { id:"c1", name:"Henry", subtitle:"Head Coach", email:"henryfincher@gmail.com", password:"Coach2026", role:"head", photo:null, bio:"" },
];

const INCOMPLETE_SWIMMERS = [
  { id:201, name:'Marc', nickname:"", email:"marcjkb@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:202, name:'Esme', nickname:"", email:"esmep95@gmail.com", password:"changeme", memberStatus:"incomplete", isBaker:true, block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:203, name:'Irene', nickname:"", email:"irene.delprincipe@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:204, name:'Matty', nickname:"", email:"matthewpw@outlook.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:205, name:'Tamsin', nickname:"", email:"tamsin@galeandhayes.co.uk", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:206, name:'Jet', nickname:"", email:"shaojie27@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:207, name:'Yoav', nickname:"", email:"yoav.ginat22@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:208, name:'Oliver', nickname:"", email:"ocparkes@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:209, name:'Nico', nickname:"", email:"nicolacortese92@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:210, name:'Bruno', nickname:"", email:"bgolls@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:211, name:'Jenny', nickname:"", email:"jenny.g.gross@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:212, name:'Jesse', nickname:"", email:"jesse@swimfasterlondon-pending.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:213, name:'Katie', nickname:"", email:"katie.uob@gmail.com", password:"Swimmer2026", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:214, name:'Eve', nickname:"", email:"eve.dm@yahoo.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:215, name:'Sofia', nickname:"", email:"sofia.klimkowski@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
  { id:216, name:'Theo', nickname:"", email:"theojessel@gmail.com", password:"changeme", memberStatus:"incomplete", block:"Squad", joined:new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}), paid:false, age:null, gender:"", dob:"", level:"", specialty:"", bio:"", goals:"", competitions:"", medicalNotes:"", emergencyName:"", emergencyPhone:"", mobile:"", benchmarks:[], prescribedDrills:[], raceResults:[], plannedEvents:[], inductionAck:{}, blockEnrolments:[] },
];

const INIT = {
  applications: [], // no fake demo applications - the real pending queue starts empty
  members: INCOMPLETE_SWIMMERS, // only real swimmers remain - no fake demo members or applicants
  sessions: SESSIONS_DATA,
  messages: [],
  coaches: COACHES_DATA,
  bakes: CAKE_BAKES,
  blocks: BLOCKS,
  sessionPacks: [],
  shopItems: [
    { id:1, name:"Finis Long Floating Fins - Size M", description:"Great for kick sets and building ankle flexibility. Barely used, still in excellent condition.", price:18, condition:"used", category:"Fins", photo:null, status:"available", reservedBy:null, createdDate:"2026-07-20" },
    { id:2, name:"Speedo Hand Paddles - Size L", description:"Classic finger-strap paddles for building pull strength. A couple of small scuffs but fully functional.", price:8, condition:"used", category:"Paddles", photo:null, status:"available", reservedBy:null, createdDate:"2026-07-20" },
    { id:3, name:"Arena Powerfin Pro - Size S (New)", description:"Brand new, still in original packaging. Great short-blade fin for technique and sprint work.", price:22, condition:"new", category:"Fins", photo:null, status:"available", reservedBy:null, createdDate:"2026-07-22" },
    { id:4, name:"Speedo Endurance+ Jammer - Size 32", description:"Sourced new, unworn. Chlorine-resistant fabric, great for regular training.", price:26, condition:"new", category:"Swimwear", photo:null, status:"available", reservedBy:null, createdDate:"2026-07-24" },
  ],
  pizzaOrders: [],
  pizzaDeadline: "2026-08-08T18:00:00",
  pizzaDeliveryFee: 5,
  discountCodes: [
    { code:"WELCOME10", type:"percent", value:10, appliesTo:"block", active:true },
  ],
  // raceResults stored per member via member.raceResults
  // hallOfRecords is not seeded here - the real list lives in Supabase and
  // is populated by the coach via the "+ Add" button on the Records tab.
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

function firstNameOf(fullName) {
  if (!fullName) return "";
  return fullName.split(" ")[0];
}

function displayNameFor(fullName, nickname) {
  const first = firstNameOf(fullName);
  if (nickname && nickname.trim()) return first + " (" + nickname.trim() + ")";
  return first;
}

function displayName(member) {
  if (!member) return "";
  return displayNameFor(member.name, member.nickname);
}

// Looks up a member by their stored full name string (used for legacy fields
// like Hall of Records "holder" which store a plain name, not a member id)
// and formats it the same way. Falls back to just the first name of the
// string itself if no matching member is found.
function displayNameByFullName(fullName, members) {
  if (!fullName) return "";
  const m = (members||[]).find(function(x){ return x.name === fullName; });
  if (m) return displayNameFor(m.name, m.nickname);
  return firstNameOf(fullName);
}

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
    <img src="/logo.png" alt="Swim Faster London" style={{ height:h, width:"auto", display:"block", userSelect:"none" }}/>
  );
}

function Badge({ color, label }) {
  return (
    <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:color, border:"1px solid "+color, padding:"2px 8px", borderRadius:1 }}>
      {label}
    </span>
  );
}

function Avatar({ name, size, photo }) {
  const h = size || 40;
  const initials = name.split(" ").map(function(n){ return n[0]; }).join("").slice(0,2).toUpperCase();
  const color = C.red;
  if (photo) {
    return (
      <div style={{ width:h, height:h, borderRadius:"50%", flexShrink:0, overflow:"hidden", border:"2px solid "+color+"44" }}>
        <img src={photo} alt={name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
      </div>
    );
  }
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

const CONDITIONING_PLAN = [
  {
    week: 1, focus: "Building comfort and consistency",
    sessions: [
      { day:"Session 1", content:"4 x 50m easy freestyle (rest 30s), 4 x 50m easy backstroke (rest 30s), 200m easy mixed strokes to finish" },
      { day:"Session 2", content:"6 x 50m easy freestyle (rest 20s), 100m kick with board, 200m easy to finish" },
      { day:"Session 3", content:"8 x 50m easy freestyle (rest 20s), 4 x 25m any stroke drill, 100m easy to finish" },
    ],
  },
  {
    week: 2, focus: "Adding a little more volume",
    sessions: [
      { day:"Session 1", content:"200m easy warm-up, 6 x 75m easy freestyle (rest 30s), 200m easy mixed to finish" },
      { day:"Session 2", content:"200m easy warm-up, 8 x 50m freestyle building pace (rest 20s), 150m kick, 100m easy" },
      { day:"Session 3", content:"200m easy warm-up, 4 x 100m easy freestyle (rest 30s), 200m easy mixed to finish" },
    ],
  },
  {
    week: 3, focus: "Introducing some pace variation",
    sessions: [
      { day:"Session 1", content:"200m easy warm-up, 6 x 100m freestyle - alternate easy/moderate (rest 30s), 200m easy to finish" },
      { day:"Session 2", content:"200m easy warm-up, 10 x 50m freestyle building pace (rest 20s), 200m kick/pull mixed, 100m easy" },
      { day:"Session 3", content:"200m easy warm-up, 3 x 200m easy freestyle (rest 45s), 200m easy mixed to finish" },
    ],
  },
  {
    week: 4, focus: "Consolidating - ready for the squad",
    sessions: [
      { day:"Session 1", content:"200m easy warm-up, 8 x 100m freestyle - moderate effort (rest 30s), 200m easy mixed to finish" },
      { day:"Session 2", content:"200m easy warm-up, 12 x 50m freestyle building pace (rest 15s), 200m kick/pull mixed, 100m easy" },
      { day:"Session 3", content:"200m easy warm-up, 400m continuous easy freestyle, 200m easy mixed to finish" },
    ],
  },
];

function ConditioningPlanPage() {
  const [openWeek, setOpenWeek] = useState(1);

  function toggleWeek(w) { setOpenWeek(openWeek === w ? null : w); }

  return (
    <div>
      <div style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px", marginBottom:20 }}>
        <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7 }}>
          A gentle four-week plan to build your aerobic base and confidence in the water before joining the squad set. Do these at whatever pace feels comfortable - the goal is consistency, not speed. Aim for 3 sessions a week, with a rest day between where you can.
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {CONDITIONING_PLAN.map(function(w) {
          const isOpen = openWeek === w.week;
          return (
            <div key={w.week} style={{ background:isOpen?C.panel:C.bg, border:"1px solid "+(isOpen?C.red+"66":C.border), borderRadius:2, overflow:"hidden" }}>
              <div onClick={function(){ toggleWeek(w.week); }} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.red, marginBottom:2 }}>Week {w.week}</div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{w.focus}</div>
                </div>
                <span style={{ fontSize:13, color:C.grey, flexShrink:0 }}>{isOpen?"-":"+"}</span>
              </div>
              {isOpen && (
                <div style={{ borderTop:"1px solid "+C.border, padding:"6px 16px 14px" }}>
                  {w.sessions.map(function(s, si) {
                    return (
                      <div key={si} style={{ padding:"10px 0", borderBottom:si<w.sessions.length-1?"1px solid "+C.border:"none" }}>
                        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.amber, marginBottom:4 }}>{s.day}</div>
                        <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7 }}>{s.content}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
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

function ProfileTab({ member, raceResults, sessionPacks, onUpdate, onSaveSettings, onDeleteAccount }) {
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
  const [showSettingsCard, setShowSettingsCard] = useState(false);
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

  function handlePhotoChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      onUpdate(Object.assign({}, member, { photo: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }
  function removePhoto() {
    onUpdate(Object.assign({}, member, { photo: null }));
  }

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
        <label style={{ position:"relative", cursor:"pointer", display:"inline-block" }}>
          <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display:"none" }}/>
          <Avatar name={member.name} size={56} photo={member.photo}/>
          <div style={{ position:"absolute", bottom:-2, right:-2, width:20, height:20, borderRadius:"50%", background:C.red, border:"2px solid "+C.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:10, color:"#fff" }}>+</span>
          </div>
        </label>
        <div style={{ flex:1 }}>
          <span style={S.eyebrow}>My Profile</span>
          <h1 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:2 }}>{member.name}</h1>
          <div style={{ fontSize:13, color:C.grey }}>{"Joined "+member.joined}</div>
          {member.photo && <button onClick={removePhoto} style={{ background:"none", border:"none", color:C.grey, fontSize:11, textDecoration:"underline", cursor:"pointer", padding:0, marginTop:4 }}>Remove photo</button>}
        </div>
        <button onClick={editing ? handleSave : startEdit} style={{ background:C.red, color:C.white, border:"none", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", padding:"8px 16px", fontSize:11, borderRadius:1 }}>
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      {(function() {
        const pack = (sessionPacks||[]).filter(function(p){ return p.memberId === member.id; }).slice().sort(function(a,b){ return b.purchaseDate.localeCompare(a.purchaseDate); })[0];
        if (!pack) return null;
        const daysLeft = Math.ceil((new Date(pack.expiryDate) - new Date()) / (1000*60*60*24));
        const sessionsLeft = pack.sessionsTotal - pack.sessionsUsed;
        const expired = daysLeft < 0 || sessionsLeft <= 0;
        return (
          <div style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"14px 16px", marginBottom:16 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#f59e0b", marginBottom:8 }}>Session Pack</div>
            {expired ? (
              <div style={{ fontSize:13, color:C.greyDark }}>Your session pack has run out or expired. Speak to your coach to top up.</div>
            ) : (
              <div style={{ display:"flex", gap:20 }}>
                <div>
                  <div style={{ fontWeight:900, fontSize:20, color:C.white }}>{sessionsLeft}</div>
                  <div style={{ fontSize:11, color:C.grey }}>session{sessionsLeft!==1?"s":""} left</div>
                </div>
                <div>
                  <div style={{ fontWeight:900, fontSize:20, color:daysLeft<=7?"#ff6b6b":C.white }}>{daysLeft}</div>
                  <div style={{ fontSize:11, color:C.grey }}>day{daysLeft!==1?"s":""} left</div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

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

          <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, marginTop:16, overflow:"hidden" }}>
            <div onClick={function(){ setShowSettingsCard(!showSettingsCard); }} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontWeight:700, fontSize:14, color:C.white }}>Account settings</div>
              <span style={{ fontSize:13, color:C.grey }}>{showSettingsCard?"-":"+"}</span>
            </div>
            {showSettingsCard && (
              <div onClick={function(e){ e.stopPropagation(); }} style={{ borderTop:"1px solid "+C.border }}>
                <SettingsModal
                  inline={true}
                  currentEmail={member.email}
                  currentPassword={member.password}
                  notifPrefs={member.notifPrefs}
                  onSave={onSaveSettings}
                  onDeleteAccount={onDeleteAccount}
                  onClose={function(){ setShowSettingsCard(false); }}
                  exportData={Object.assign({}, member, { password:"[hidden]" })}
                />
              </div>
            )}
          </div>
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
            <div style={{ fontWeight:700, fontSize:16 }}>{displayName(member)}</div>
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

function loyaltyDiscountForCount(consecutiveBlocks) {
  if (consecutiveBlocks >= 4) return 15;
  if (consecutiveBlocks >= 2) return 10;
  if (consecutiveBlocks >= 1) return 5;
  return 0;
}

// A member's account locks if they've been marked as attended (present in the coach's
// register) for a session that's only covered by a pack or block enrolment still
// awaiting payment confirmation from the head coach. This deliberately does NOT lock
// someone just for having an unpaid pack sitting unused - only once they've actually
// used it to attend a session while it's unpaid.
function memberPaymentLockInfo(member, allData) {
  const sessions = allData.sessions || [];
  const packs = (allData.sessionPacks || []).filter(function(p) { return p.memberId === member.id; });
  const pendingPacks = packs.filter(function(p) { return p.paymentStatus === "pending"; });
  const enrolments = member.blockEnrolments || [];
  const pendingEnrolments = enrolments.filter(function(e) { return e.paymentStatus === "pending"; });

  const attendedSessionIds = sessions.filter(function(s) { return s.attendance && s.attendance[member.id]; }).map(function(s) { return s.id; });

  const unpaidPackAttendance = pendingPacks.filter(function(p) {
    if (p.allowedSessionIds) return p.allowedSessionIds.some(function(sid) { return attendedSessionIds.indexOf(sid) !== -1; });
    // Generic (non date-tied) pending pack: locked if any session was attended after purchase while pack has sessions used.
    return p.sessionsUsed > 0;
  });

  const unpaidBlockAttendance = pendingEnrolments.filter(function(e) {
    const block = (allData.blocks || BLOCKS).find(function(b) { return b.id === e.blockId; });
    if (!block) return false;
    return sessions.some(function(s) {
      return s.date >= block.startDate && s.date <= block.endDate && attendedSessionIds.indexOf(s.id) !== -1;
    });
  });

  const locked = unpaidPackAttendance.length > 0 || unpaidBlockAttendance.length > 0;
  return { locked: locked, unpaidPacks: unpaidPackAttendance, unpaidEnrolments: unpaidBlockAttendance };
}

function computeBlockReportStats(member, block, allSessions) {
  const blockSessions = (allSessions||[]).filter(function(s) { return s.date >= block.startDate && s.date <= block.endDate; });
  const ranSessions = blockSessions.filter(function(s) { return s.status !== "cancelled"; });
  let attended = 0;
  ranSessions.forEach(function(s) { if (s.attendance && s.attendance[member.id]) attended += 1; });
  const attendanceRate = ranSessions.length > 0 ? Math.round((attended/ranSessions.length)*100) : 0;

  const benchInBlock = (member.benchmarks||[]).filter(function(b) {
    const t = new Date(b.date.split(" ").reverse().join("-").replace(/^(\d{4})-(\w+)-(\d+)$/, function(_,y,mo,d){
      const months = {Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"};
      return y+"-"+(months[mo]||"01")+"-"+(d.length<2?"0"+d:d);
    }));
    return !isNaN(t.getTime()) && t >= new Date(block.startDate) && t <= new Date(block.endDate);
  });

  const byEvent = {};
  benchInBlock.forEach(function(b) {
    if (!byEvent[b.event]) byEvent[b.event] = [];
    byEvent[b.event].push(b);
  });
  const improvements = [];
  Object.keys(byEvent).forEach(function(ev) {
    const arr = byEvent[ev].slice().sort(function(a,b){ return a.date.localeCompare(b.date); });
    if (arr.length < 2) return;
    const first = toSeconds(arr[0].time);
    const last = toSeconds(arr[arr.length-1].time);
    improvements.push({ event:ev, from:arr[0].time, to:arr[arr.length-1].time, drop: first-last });
  });

  const enrolment = (member.blockEnrolments||[]).find(function(e) { return e.blockId===block.id || e.type==="year"; });

  return { attended:attended, totalSessions:ranSessions.length, attendanceRate:attendanceRate, improvements:improvements, benchmarkCount:benchInBlock.length, enrolment:enrolment };
}

function AthleteBlockReport({ member, block, stats, report, isCoach, onSaveNotes, onPublish }) {
  const [draftNotes, setDraftNotes] = useState(report ? report.notes : "");
  const [editing, setEditing] = useState(false);

  function startEdit() { setDraftNotes(report ? report.notes : ""); setEditing(true); }
  function cancelEdit() { setEditing(false); }
  function saveNotes() { onSaveNotes(draftNotes); setEditing(false); }

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
        <div style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px" }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Attendance</div>
          <div style={{ fontWeight:900, fontSize:18, color:stats.attendanceRate>=75?C.green:C.amber }}>{stats.attendanceRate}%</div>
          <div style={{ fontSize:11, color:C.greyDark, marginTop:2 }}>{stats.attended} of {stats.totalSessions} sessions</div>
        </div>
        <div style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px" }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Times recorded</div>
          <div style={{ fontWeight:900, fontSize:18, color:C.white }}>{stats.benchmarkCount}</div>
        </div>
      </div>

      {stats.improvements.length > 0 && (
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:8 }}>Progress this block</div>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {stats.improvements.map(function(imp, i) {
              return (
                <div key={i} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white }}>{imp.event}</div>
                    <div style={{ fontSize:11, color:C.grey }}>{imp.from} {"\u2192"} {imp.to}</div>
                  </div>
                  <div style={{ fontWeight:900, fontSize:14, color:imp.drop>0?C.green:"#ff6b6b", fontFamily:"monospace" }}>{imp.drop>0?"-":"+"}{Math.abs(imp.drop).toFixed(1)}s</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:8 }}>Coach's notes</div>
        {isCoach ? (
          editing ? (
            <div>
              <textarea value={draftNotes} onChange={function(e){ setDraftNotes(e.target.value); }} rows={5} placeholder="How did this swimmer get on this block? Technique, effort, areas to work on next..." style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:13, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", marginBottom:10 }}/>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={saveNotes} style={S.btnRed}>Save notes</button>
                <button onClick={cancelEdit} style={S.btnGhost}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              {report && report.notes ? (
                <div style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px", marginBottom:10, fontSize:13, color:C.greyLight, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{report.notes}</div>
              ) : (
                <div style={{ fontSize:13, color:C.greyDark, marginBottom:10 }}>No notes added yet.</div>
              )}
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <button onClick={startEdit} style={S.btnGhost}>{report && report.notes ? "Edit notes" : "Add notes"}</button>
                {report && report.notes && (
                  <button onClick={onPublish} style={{ background:report.published?"transparent":"#e01a1a", border:report.published?"1px solid #166534":"none", color:report.published?C.green:"#fff", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", padding:"11px 20px", borderRadius:2, cursor:"pointer" }}>{report.published ? "\u2713 Published to athlete" : "Publish to athlete"}</button>
                )}
              </div>
            </div>
          )
        ) : (
          report && report.published && report.notes ? (
            <div style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px", fontSize:13, color:C.greyLight, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{report.notes}</div>
          ) : (
            <div style={{ fontSize:13, color:C.greyDark }}>Your coach hasn't published notes for this block yet.</div>
          )
        )}
      </div>
    </div>
  );
}


const THE_BAKER = "Esme";

function SettingsModal({ currentEmail, currentPassword, notifPrefs, onSave, onDeleteAccount, onClose, isCoachSettings, currentName, onSaveName, canDeleteAccount, inline, exportData }) {
  const [email, setEmail] = useState(currentEmail);
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(currentName||"");
  const defaultPrefs = isCoachSettings
    ? { applications:true, raceReports:true, eventSignups:true, blockSignups:true }
    : { feedback:true, comments:true, blockReports:true, cancellations:true };
  const [prefs, setPrefs] = useState(notifPrefs || defaultPrefs);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const notifOptions = isCoachSettings
    ? [["applications","New applications"],["raceReports","Race reports logged"],["eventSignups","Race/event sign-ups"],["blockSignups","Block sign-ups"]]
    : [["feedback","Session feedback"],["comments","Coach comments"],["blockReports","Block progress reports"],["cancellations","Cancelled sessions"]];

  function togglePref(key) {
    setPrefs(function(p) { const u = Object.assign({}, p); u[key] = !u[key]; return u; });
  }

  function handleSave() {
    setError("");
    if (newPassword || confirmPassword || currentPasswordInput) {
      if (currentPasswordInput !== currentPassword) { setError("Current password is incorrect."); return; }
      if (newPassword.length < 6) { setError("New password must be at least 6 characters."); return; }
      if (newPassword !== confirmPassword) { setError("New passwords don't match."); return; }
    }
    if (!email.trim()) { setError("Email can't be empty."); return; }
    onSave({
      email: email.trim(),
      password: newPassword || currentPassword,
      notifPrefs: prefs
    });
    if (isCoachSettings && onSaveName) onSaveName(name.trim());
    setCurrentPasswordInput(""); setNewPassword(""); setConfirmPassword("");
    setSaved(true);
    setTimeout(function(){ setSaved(false); }, 2500);
  }

  const body = (
    <div>
      <div style={{ padding:inline?"16px":"20px" }}>
          {isCoachSettings && (
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey }}>Display name</div>
                {editingField!=="name" && <button onClick={function(){ setEditingField("name"); }} style={{ background:"none", border:"none", color:"#3b82f6", fontSize:11, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", cursor:"pointer" }}>Edit</button>}
              </div>
              {editingField==="name" ? (
                <input value={name} onChange={function(e){ setName(e.target.value); }} autoFocus style={S.input}/>
              ) : (
                <div style={{ fontSize:14, color:C.greyLight }}>{name || "-"}</div>
              )}
            </div>
          )}

          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey }}>Email address</div>
              {editingField!=="email" && <button onClick={function(){ setEditingField("email"); }} style={{ background:"none", border:"none", color:"#3b82f6", fontSize:11, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", cursor:"pointer" }}>Edit</button>}
            </div>
            {editingField==="email" ? (
              <input type="email" autoComplete="email" value={email} onChange={function(e){ setEmail(e.target.value); }} autoFocus style={S.input}/>
            ) : (
              <div style={{ fontSize:14, color:C.greyLight }}>{email}</div>
            )}
          </div>

          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Change password</div>
            <div style={{ marginBottom:10 }}>
              <label style={S.label}>Current password</label>
              <input type="password" autoComplete="current-password" value={currentPasswordInput} onChange={function(e){ setCurrentPasswordInput(e.target.value); }} style={S.input}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div>
                <label style={S.label}>New password</label>
                <input type="password" autoComplete="new-password" value={newPassword} onChange={function(e){ setNewPassword(e.target.value); }} style={S.input}/>
              </div>
              <div>
                <label style={S.label}>Confirm new password</label>
                <input type="password" autoComplete="new-password" value={confirmPassword} onChange={function(e){ setConfirmPassword(e.target.value); }} style={S.input}/>
              </div>
            </div>
            <div style={{ fontSize:11, color:C.greyDark, marginTop:6 }}>Leave blank to keep your current password.</div>
          </div>

          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Notifications</div>
            {notifOptions.map(function(p) {
              return (
                <div key={p[0]} onClick={function(){ togglePref(p[0]); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid "+C.border, cursor:"pointer" }}>
                  <span style={{ fontSize:13, color:C.greyLight }}>{p[1]}</span>
                  <div style={{ width:38, height:20, borderRadius:10, background:prefs[p[0]]?C.green:"#333", position:"relative", flexShrink:0 }}>
                    <div style={{ width:16, height:16, borderRadius:"50%", background:"#fff", position:"absolute", top:2, left:prefs[p[0]]?20:2, transition:"left 0.15s" }}/>
                  </div>
                </div>
              );
            })}
          </div>

          {error && <div style={{ fontSize:12, color:"#ff6b6b", marginBottom:14 }}>{error}</div>}
          {saved && <div style={{ fontSize:12, color:C.green, marginBottom:14 }}>{"\u2713"} Settings saved.</div>}

          <button onClick={handleSave} style={{ display:"block", width:"100%", background:"#e01a1a", color:"#fff", border:"none", padding:"12px 16px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer", marginBottom:20 }}>Save changes</button>

          {exportData && (
            <div style={{ borderTop:"1px solid "+C.border, paddingTop:16, marginBottom:20 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:8 }}>Your data</div>
              <div style={{ fontSize:12, color:C.greyDark, marginBottom:10, lineHeight:1.6 }}>Download a copy of everything we hold about you, in a plain text file.</div>
              <button onClick={function(){
                const blob = new Blob([JSON.stringify(exportData, null, 2)], { type:"application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "swimfasterlondon-my-data.json";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px" }}>Download my data</button>
            </div>
          )}

          <div style={{ borderTop:"1px solid #7f1d1d", paddingTop:16 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#ff6b6b", marginBottom:10 }}>Danger zone</div>
            {canDeleteAccount === false ? (
              <div style={{ fontSize:12, color:C.greyDark }}>The head coach account can't be deleted from here. Contact another head coach or manage this from Manage Coaches instead.</div>
            ) : confirmDelete ? (
              <div style={{ background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"14px" }}>
                <div style={{ fontSize:13, color:"#ff6b6b", marginBottom:10, fontWeight:700 }}>Are you sure? This permanently deletes your account and all your data. This can't be undone.</div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={onDeleteAccount} style={{ background:"#7f1d1d", border:"none", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px" }}>Yes, delete my account</button>
                  <button onClick={function(){ setConfirmDelete(false); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={function(){ setConfirmDelete(true); }} style={{ background:"none", border:"1px solid #7f1d1d", color:"#ff6b6b", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px" }}>Delete my account</button>
            )}
          </div>
      </div>
    </div>
  );

  if (inline) {
    return body;
  }

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:200, display:"flex", alignItems:"flex-start", justifyContent:"center", overflowY:"auto", padding:"20px 16px" }}>
      <div onClick={function(e){ e.stopPropagation(); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, maxWidth:480, width:"100%", marginTop:20, marginBottom:20 }}>
        <div style={{ padding:"18px 20px", borderBottom:"1px solid "+C.border, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontWeight:900, fontSize:"1.1rem", textTransform:"uppercase" }}>Settings</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.grey, fontSize:20, cursor:"pointer", lineHeight:1, padding:0 }}>&times;</button>
        </div>
        {body}
      </div>
    </div>
  );
}

function VoiceRecorder({ audio, onChange }) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  function startRecording() {
    setError("");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Voice recording isn't supported on this device/browser.");
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = function(e) { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = function() {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onload = function(ev) { onChange(ev.target.result); };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(function(t) { t.stop(); });
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
    }).catch(function() {
      setError("Microphone access was denied or unavailable.");
    });
  }

  function stopRecording() {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setRecording(false);
  }

  function removeAudio() {
    onChange(null);
  }

  return (
    <div>
      {audio ? (
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <audio controls src={audio} style={{ height:32, flex:1 }}/>
          <button onClick={removeAudio} style={{ background:"none", border:"1px solid #333", color:"#ff6b6b", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 10px" }}>Remove</button>
        </div>
      ) : recording ? (
        <button onClick={stopRecording} style={{ background:"#7f1d1d", border:"none", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#fff", display:"inline-block" }}/>
            Stop recording
        </button>
      ) : (
        <button onClick={startRecording} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px" }}>{"\u25CF"} Record a voice note</button>
      )}
      {error && <div style={{ fontSize:11, color:"#ff6b6b", marginTop:6 }}>{error}</div>}
    </div>
  );
}

function StarRating({ value, onRate, size }) {
  const s = size || 22;
  return (
    <div style={{ display:"flex", gap:4 }}>
      {[1,2,3,4,5].map(function(n) {
        const filled = value >= n;
        return (
          <span key={n} onClick={onRate ? function(){ onRate(n); } : undefined}
            style={{ fontSize:s, color:filled?C.amber:"#3a3a3a", cursor:onRate?"pointer":"default", lineHeight:1 }}>
            {"\u2605"}
          </span>
        );
      })}
    </div>
  );
}

function CakeYourMarksPage({ member, allMembers, bakes, isCoach, onAddBake, onDeleteBake, onRate, onUpdateBakePhoto, onSkipBake }) {
  const [expandedBakeId, setExpandedBakeId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name:"", description:"", date:new Date().toISOString().slice(0,10), photo:null });
  const [commentDraft, setCommentDraft] = useState("");
  const [lookupMemberId, setLookupMemberId] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const latestBake = bakes.length > 0 ? bakes.slice().sort(function(a,b) { return b.id - a.id; })[0] : null;
  const myLatestRating = latestBake && member ? (latestBake.ratings||{})[member.id] : null;
  const [showPrompt, setShowPrompt] = useState(!isCoach && !!latestBake && !myLatestRating);
  const [promptStars, setPromptStars] = useState(0);
  const [promptComment, setPromptComment] = useState("");

  function toggleBake(id) {
    setExpandedBakeId(expandedBakeId === id ? null : id);
    const b = bakes.find(function(x) { return x.id === id; });
    const myRating = b && b.ratings[member ? member.id : ""];
    setCommentDraft(myRating && !myRating.skipped ? (myRating.comment||"") : "");
  }

  function avgRating(bake) {
    const vals = Object.values(bake.ratings||{}).filter(function(r) { return !r.skipped && typeof r.stars === "number"; }).map(function(r) { return r.stars; });
    if (vals.length === 0) return null;
    return vals.reduce(function(a,b){ return a+b; }, 0) / vals.length;
  }

  function myRatingFor(bake) {
    return member ? (bake.ratings||{})[member.id] : null;
  }

  function rate(bakeId, stars) {
    onRate(bakeId, stars, commentDraft);
  }

  function saveComment(bakeId) {
    const b = bakes.find(function(x) { return x.id === bakeId; });
    const existing = myRatingFor(b);
    if (existing && !existing.skipped) onRate(bakeId, existing.stars, commentDraft);
  }

  function submitPromptRating() {
    if (promptStars === 0) return;
    onRate(latestBake.id, promptStars, promptComment);
    setShowPrompt(false);
  }

  function dismissPromptAsSkipped() {
    onSkipBake(latestBake.id);
    setShowPrompt(false);
  }

  const sorted = bakes.slice().sort(function(a,b) { return b.date.localeCompare(a.date); });
  const leaderboard = bakes.slice()
    .map(function(b) { return { bake:b, avg:avgRating(b), count:Object.keys(b.ratings||{}).length }; })
    .filter(function(x) { return x.avg !== null; })
    .sort(function(a,b) { return b.avg - a.avg; })
    .slice(0, 5);

  return (
    <div>
      {showPrompt && latestBake && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px 16px" }}>
          <div style={{ background:C.panel, border:"1px solid "+C.red, borderRadius:2, maxWidth:380, width:"100%", padding:"24px 20px" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.red, marginBottom:8, textAlign:"center" }}>This Friday's Bake</div>
            {latestBake.photo && (
              <div style={{ width:"100%", height:140, borderRadius:2, overflow:"hidden", marginBottom:14 }}>
                <img src={latestBake.photo} alt={latestBake.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              </div>
            )}
            <div style={{ fontWeight:900, fontSize:"1.2rem", color:C.white, textAlign:"center", marginBottom:6 }}>{latestBake.name}</div>
            {latestBake.description && <div style={{ fontSize:13, color:C.grey, textAlign:"center", lineHeight:1.6, marginBottom:16 }}>{latestBake.description}</div>}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
              <StarRating value={promptStars} onRate={setPromptStars} size={28}/>
            </div>
            <textarea value={promptComment} onChange={function(e){ setPromptComment(e.target.value); }} placeholder="Any comments? (optional)" rows={2} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"9px 11px", fontSize:13, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", marginBottom:14 }}/>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <button onClick={submitPromptRating} style={{ background:promptStars>0?"#e01a1a":"#3a3a3a", color:"#fff", border:"none", padding:"11px 16px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:promptStars>0?"pointer":"default" }}>Submit rating</button>
              <button onClick={dismissPromptAsSkipped} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"11px 16px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>I wasn't there</button>
            </div>
          </div>
        </div>
      )}

      <span style={S.eyebrow}>Friday Treats</span>
      <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Cake Your Marks</h2>
      <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Rate Esme's weekly Friday bake, see who else loved it, and check the all-time leaderboard.</p>

      {isCoach && (
        <div style={{ marginBottom:20 }}>
          <button onClick={function(){ setShowAdd(!showAdd); }} style={{ background:showAdd?C.panel:"#e01a1a", color:showAdd?C.white:"#fff", border:showAdd?"1px solid "+C.border:"none", padding:"10px 16px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>{showAdd?"Cancel":"+ Add this week's bake"}</button>
          {showAdd && (
            <div style={{ background:C.panel, border:"1px solid #3b82f6", borderRadius:2, padding:16, marginTop:10 }}>
              <div style={{ marginBottom:10 }}>
                <label style={S.label}>Name</label>
                <input value={addForm.name} onChange={function(e){ setAddForm(function(f){ return Object.assign({}, f, { name:e.target.value }); }); }} placeholder="e.g. Lemon Drizzle Muffins" style={S.input}/>
              </div>
              <div style={{ marginBottom:10 }}>
                <label style={S.label}>Description</label>
                <textarea value={addForm.description} onChange={function(e){ setAddForm(function(f){ return Object.assign({}, f, { description:e.target.value }); }); }} rows={2} placeholder="What's in it, anything special about this week's bake..." style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical" }}/>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={S.label}>Friday date</label>
                <input type="date" value={addForm.date} onChange={function(e){ setAddForm(function(f){ return Object.assign({}, f, { date:e.target.value }); }); }} style={S.input}/>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={S.label}>Photo (optional)</label>
                {addForm.photo && (
                  <div style={{ width:100, height:100, borderRadius:2, overflow:"hidden", marginBottom:8 }}>
                    <img src={addForm.photo} alt="Preview" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                  </div>
                )}
                <label style={{ display:"inline-block", cursor:"pointer" }}>
                  <input type="file" accept="image/*" onChange={function(e){
                    const file = e.target.files && e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = function(ev){ setAddForm(function(f){ return Object.assign({}, f, { photo: ev.target.result }); }); };
                    reader.readAsDataURL(file);
                  }} style={{ display:"none" }}/>
                  <span style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"9px 16px", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:2, display:"inline-block" }}>{addForm.photo?"Change photo":"Upload photo"}</span>
                </label>
              </div>
              <button onClick={function(){
                if (!addForm.name.trim()) return;
                onAddBake(addForm);
                setAddForm({ name:"", description:"", date:new Date().toISOString().slice(0,10), photo:null });
                setShowAdd(false);
              }} style={S.btnRed}>Save bake</button>
            </div>
          )}
        </div>
      )}

      {isCoach && (function() {
        const swimmerList = (allMembers||[]).filter(function(m) { return m.memberStatus !== "pending" && m.memberStatus !== "rejected"; });
        const lookupMember = swimmerList.find(function(m) { return String(m.id) === lookupMemberId; });

        function nextBirthday(dobStr) {
          if (!dobStr) return null;
          const dob = new Date(dobStr);
          const today = new Date();
          let next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
          if (next < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            next = new Date(today.getFullYear()+1, dob.getMonth(), dob.getDate());
          }
          const daysAway = Math.round((next - today) / (1000*60*60*24));
          return { date: next, daysAway: daysAway };
        }

        const FAVOURITE_WORDS = ["favourite","favorite","best yet","the best","best one","loved this","obsessed","incredible","amazing","perfect"];
        const NEGATIVE_WORDS = ["too sweet","too dry","dry","bland","disappointing","not great","didn't enjoy","wouldn't","won't","overcooked","undercooked","stale"];
        const NEGATION_WORDS = ["not","n't","no","never","hardly","barely"];

        function commentSignal(comment) {
          if (!comment) return 0;
          const lower = comment.toLowerCase();

          // Check each strong positive phrase - if a negation word appears in the
          // few words immediately before it, the phrase is being negated
          // (e.g. "not my favourite", "wasn't the best") and shouldn't count as positive.
          function isNegated(phraseIndex) {
            const before = lower.slice(Math.max(0, phraseIndex-25), phraseIndex);
            return NEGATION_WORDS.some(function(neg) { return before.indexOf(neg) !== -1; });
          }

          let hasGenuinePositive = false;
          FAVOURITE_WORDS.forEach(function(w) {
            const idx = lower.indexOf(w);
            if (idx !== -1 && !isNegated(idx)) hasGenuinePositive = true;
          });
          if (hasGenuinePositive) return 2;

          const hasNegative = NEGATIVE_WORDS.some(function(w) { return lower.indexOf(w) !== -1; });
          if (hasNegative) return -1;

          return 1;
        }

        const favourites = lookupMember ? bakes
          .map(function(b) {
            const r = (b.ratings||{})[lookupMember.id];
            return r && !r.skipped && typeof r.stars === "number" ? { bake:b, stars:r.stars, comment:r.comment, signal:commentSignal(r.comment) } : null;
          })
          .filter(Boolean)
          .sort(function(a,b) {
            if (b.stars !== a.stars) return b.stars - a.stars;
            return b.signal - a.signal;
          }) : [];

        const bday = lookupMember ? nextBirthday(lookupMember.dob) : null;

        return (
          <div style={{ background:C.panel, border:"1px solid #78350f", borderRadius:2, padding:16, marginBottom:24 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.amber, marginBottom:12 }}>Birthday bake lookup</div>
            <div style={{ marginBottom:14 }}>
              <label style={S.label}>Swimmer (current or previous)</label>
              <select value={lookupMemberId} onChange={function(e){ setLookupMemberId(e.target.value); setShowAllReviews(false); }} style={S.input}>
                <option value="" style={{ background:C.panel }}>Select swimmer...</option>
                {swimmerList.map(function(m) { return <option key={m.id} value={m.id} style={{ background:C.panel }}>{m.name}</option>; })}
              </select>
            </div>

            {lookupMember && (
              <div>
                <div style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px", marginBottom:14 }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Birthday</div>
                  {lookupMember.dob ? (
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{new Date(lookupMember.dob).toLocaleDateString("en-GB",{day:"2-digit",month:"long"})}</div>
                      {bday && <div style={{ fontSize:12, color:bday.daysAway<=14?C.green:C.grey, marginTop:2 }}>{bday.daysAway===0?"Today!":bday.daysAway+" day"+(bday.daysAway!==1?"s":"")+" away"}</div>}
                    </div>
                  ) : (
                    <div style={{ fontSize:13, color:C.greyDark }}>No date of birth on file.</div>
                  )}
                </div>

                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:8 }}>Their favourite bakes</div>
                {favourites.length === 0 ? (
                  <div style={{ fontSize:13, color:C.greyDark }}>{lookupMember.nickname||lookupMember.name.split(" ")[0]} hasn't rated any bakes yet.</div>
                ) : (
                  <div>
                    <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:showAllReviews||favourites.length<=5?0:10 }}>
                      {(showAllReviews ? favourites : favourites.slice(0,5)).map(function(f, i) {
                        return (
                          <div key={f.bake.id} style={{ background:C.bg, border:"1px solid "+(f.signal===2?C.amber:C.border), borderRadius:2, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
                            <span style={{ fontWeight:900, fontSize:13, color:i===0?C.amber:C.greyDark, minWidth:16 }}>{i+1}</span>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                                <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{f.bake.name}</div>
                                {f.signal===2 && <span style={{ fontSize:8, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.amber, border:"1px solid "+C.amber, padding:"1px 5px", borderRadius:1 }}>Called out as favourite</span>}
                                {f.signal===-1 && <span style={{ fontSize:8, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#ff6b6b", border:"1px solid #7f1d1d", padding:"1px 5px", borderRadius:1 }}>Mixed feedback</span>}
                              </div>
                              <div style={{ fontSize:11, color:C.greyDark, marginTop:1 }}>{f.bake.date}</div>
                              {f.comment && <div style={{ fontSize:11, color:C.grey, fontStyle:"italic", marginTop:2 }}>{f.comment}</div>}
                            </div>
                            <StarRating value={f.stars} size={13}/>
                          </div>
                        );
                      })}
                    </div>
                    {favourites.length > 5 && (
                      <button onClick={function(){ setShowAllReviews(!showAllReviews); }} style={{ background:"none", border:"none", color:"#3b82f6", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", padding:0 }}>
                        {showAllReviews ? "Show top 5 only" : "Show all "+favourites.length+" reviews"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })()}

      {leaderboard.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.amber, marginBottom:10 }}>Leaderboard - top rated</div>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {leaderboard.map(function(l, i) {
              return (
                <div key={l.bake.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"10px 14px", display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontWeight:900, fontSize:14, color:i===0?C.amber:C.greyDark, minWidth:16 }}>{i+1}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{l.bake.name}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontWeight:900, fontSize:14, color:C.amber }}>{l.avg.toFixed(1)} {"\u2605"}</div>
                    <div style={{ fontSize:10, color:C.greyDark }}>{l.count} rating{l.count!==1?"s":""}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>All bakes</div>
      {sorted.length === 0 && (
        <div style={{ padding:"32px 0", textAlign:"center", color:C.greyDark, fontSize:13 }}>No bakes logged yet.</div>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {sorted.map(function(bake) {
          const isOpen = expandedBakeId === bake.id;
          const avg = avgRating(bake);
          const myRating = myRatingFor(bake);
          const ratingsList = Object.keys(bake.ratings||{})
            .filter(function(mid) { return !bake.ratings[mid].skipped; })
            .map(function(mid) {
              const m = (allMembers||[]).find(function(x) { return String(x.id) === String(mid); });
              return { name: m ? displayName(m) : "Swimmer", stars: bake.ratings[mid].stars, comment: bake.ratings[mid].comment };
            });
          return (
            <div key={bake.id} style={{ background:isOpen?C.panel:C.bg, border:"1px solid "+(isOpen?C.red+"66":C.border), borderRadius:2, overflow:"hidden" }}>
              <div onClick={function(){ toggleBake(bake.id); }} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
                {bake.photo && (
                  <div style={{ width:48, height:48, borderRadius:2, overflow:"hidden", flexShrink:0 }}>
                    <img src={bake.photo} alt={bake.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                  </div>
                )}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:11, color:C.greyDark, marginBottom:2 }}>{bake.date}</div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{bake.name}</div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  {avg !== null ? (
                    <div style={{ fontWeight:900, fontSize:14, color:C.amber }}>{avg.toFixed(1)} {"\u2605"}</div>
                  ) : (
                    <div style={{ fontSize:11, color:C.greyDark }}>No ratings</div>
                  )}
                  <div style={{ fontSize:13, color:C.grey }}>{isOpen?"-":"+"}</div>
                </div>
              </div>
              {isOpen && (
                <div style={{ borderTop:"1px solid "+C.border, padding:"14px 16px" }}>
                  {bake.description && <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6, marginBottom:14 }}>{bake.description}</div>}

                  {member && (
                    <div style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px", marginBottom:14 }}>
                      <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:8 }}>Your rating</div>
                      {myRating && myRating.skipped ? (
                        <div>
                          <div style={{ fontSize:13, color:C.greyDark, marginBottom:8 }}>You said you weren't there for this one.</div>
                          <button onClick={function(){ onRate(bake.id, null, ""); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"7px 14px", fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>Actually, let me rate it</button>
                        </div>
                      ) : (
                        <div>
                          <div style={{ marginBottom:10 }}><StarRating value={myRating?myRating.stars:0} onRate={function(n){ rate(bake.id, n); }}/></div>
                          <textarea value={commentDraft} onChange={function(e){ setCommentDraft(e.target.value); }} placeholder="Any comments? (optional)" rows={2} style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"9px 11px", fontSize:13, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", marginBottom:8 }}/>
                          {myRating && <button onClick={function(){ saveComment(bake.id); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"7px 14px", fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>Update comment</button>}
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:8 }}>{ratingsList.length} rating{ratingsList.length!==1?"s":""}</div>
                  {ratingsList.length === 0 ? (
                    <div style={{ fontSize:13, color:C.greyDark }}>No one's rated this yet.</div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {ratingsList.map(function(r, i) {
                        return (
                          <div key={i} style={{ borderBottom:i<ratingsList.length-1?"1px solid "+C.border:"none", paddingBottom:8 }}>
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginBottom:2 }}>
                              <span style={{ fontSize:13, fontWeight:700, color:C.white }}>{r.name}</span>
                              <StarRating value={r.stars} size={13}/>
                            </div>
                            {r.comment && <div style={{ fontSize:12, color:C.grey, fontStyle:"italic" }}>{r.comment}</div>}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {isCoach && (
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginTop:14, flexWrap:"wrap" }}>
                      <label style={{ cursor:"pointer" }}>
                        <input type="file" accept="image/*" onChange={function(e){
                          const file = e.target.files && e.target.files[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = function(ev){ onUpdateBakePhoto(bake.id, ev.target.result); };
                          reader.readAsDataURL(file);
                        }} style={{ display:"none" }}/>
                        <span style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"7px 14px", fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:2, display:"inline-block" }}>{bake.photo?"Change photo":"Add photo"}</span>
                      </label>
                      <button onClick={function(){ onDeleteBake(bake.id); }} style={{ background:"none", border:"none", color:"#ff6b6b", fontSize:11, cursor:"pointer" }}>Delete this bake</button>
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


function BlocksCalendarPage({ member, allData, onSignUp, onSetAttendanceIntent, onBuySessionPack }) {
  const [openBlockId, setOpenBlockId] = useState(null);
  const [showArchive, setShowArchive] = useState(false);
  const [confirmSignupBlock, setConfirmSignupBlock] = useState(null);
  const [showBuyPack, setShowBuyPack] = useState(false);
  const [buyPackType, setBuyPackType] = useState("persession");
  const [buySelectedSessionIds, setBuySelectedSessionIds] = useState([]);
  const blocks = allData.blocks || BLOCKS;
  const sessions = allData.sessions || [];
  const today = new Date();
  const todayStr = today.toISOString().slice(0,10);

  const enrolments = member.blockEnrolments||[];
  const enrolledBlockIds = enrolments.map(function(e) { return e.blockId; });
  const isYearEnrolled = enrolments.some(function(e) { return e.type==="year"; });
  const priorBlockCount = enrolments.filter(function(e) { return e.type==="block"; }).length;
  const nextDiscountPercent = loyaltyDiscountForCount(priorBlockCount);

  function isEnrolled(blockId) {
    return isYearEnrolled || enrolledBlockIds.indexOf(blockId) !== -1;
  }

  function sessionsForBlock(blockId) {
    const b = blocks.find(function(x) { return x.id===blockId; });
    if (!b) return [];
    return sessions.filter(function(s) { return s.date >= b.startDate && s.date <= b.endDate; })
      .slice().sort(function(a,b2) { return a.date.localeCompare(b2.date); });
  }

  const currentBlock = blocks.find(function(b) { return b.startDate <= todayStr && todayStr <= b.endDate; });
  const futureBlocks = blocks.filter(function(b) { return b.startDate > todayStr; }).sort(function(a,b) { return a.startDate.localeCompare(b.startDate); });
  const pastBlocks = blocks.filter(function(b) { return b.endDate < todayStr; }).sort(function(a,b) { return b.startDate.localeCompare(a.startDate); });

  function toggleBlock(id) { setOpenBlockId(openBlockId === id ? null : id); }

  function discountedPrice(block) {
    if (nextDiscountPercent === 0) return block.priceFull;
    return Math.round(block.priceFull * (1 - nextDiscountPercent/100) * 100) / 100;
  }

  function requestSignup(block) { setConfirmSignupBlock(block); }
  function cancelSignup() { setConfirmSignupBlock(null); }
  function confirmSignup() {
    onSignUp(confirmSignupBlock, nextDiscountPercent);
    setConfirmSignupBlock(null);
  }

  function upcomingFridaySessionsForMember() {
    return sessions
      .filter(function(s) { return s.date >= todayStr && s.status !== "cancelled"; })
      .sort(function(a,b) { return a.date.localeCompare(b.date); });
  }

  function toggleBuySessionDate(sessionId) {
    setBuySelectedSessionIds(function(cur) {
      return cur.indexOf(sessionId) !== -1 ? cur.filter(function(id){ return id !== sessionId; }) : cur.concat([sessionId]);
    });
  }

  const myPerSessionRate = perSessionRateForEmail(member.email);
  const myPack10Price = pack10PriceForEmail(member.email);

  function buyPackTotal() {
    if (buyPackType === "pack10") return myPack10Price;
    return buySelectedSessionIds.length * myPerSessionRate;
  }

  function confirmBuyPack() {
    if (buyPackType === "pack10") {
      onBuySessionPack("pack10", null);
    } else {
      if (buySelectedSessionIds.length === 0) return;
      onBuySessionPack("persession", buySelectedSessionIds);
    }
    setShowBuyPack(false);
    setBuySelectedSessionIds([]);
    setBuyPackType("persession");
  }

  function myAttendanceStatus(sessionId) {
    const rec = (member.sessionAttendanceIntent||{})[sessionId];
    return rec || null;
  }

  function setAttendanceIntent(sessionId, status) {
    const cur = member.sessionAttendanceIntent||{};
    const next = Object.assign({}, cur);
    next[sessionId] = (cur[sessionId] === status) ? null : status;
    if (next[sessionId] === null) delete next[sessionId];
    onSetAttendanceIntent(next);
  }

  function renderSessionRow(s, isPast) {
    const cancelled = s.status === "cancelled";
    const myStatus = myAttendanceStatus(s.id);
    const attendedRegister = !!(s.attendance && s.attendance[member.id]);

    if (isPast) {
      return (
        <div key={s.id} style={{ padding:"10px 0", borderBottom:"1px solid "+C.border }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:11, color:C.greyDark, marginBottom:2 }}>{fmtRaceDate(s.date)}</div>
              <div style={{ fontWeight:700, fontSize:14, color:cancelled?C.greyDark:C.white, textDecoration:cancelled?"line-through":"none" }}>{s.focus || s.title}</div>
            </div>
            {cancelled ? (
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#ff6b6b", border:"1px solid #7f1d1d", padding:"2px 7px", borderRadius:1, flexShrink:0 }}>Cancelled</div>
            ) : attendedRegister ? (
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.green, border:"1px solid #166534", padding:"2px 7px", borderRadius:1, flexShrink:0 }}>Attended</div>
            ) : (
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.greyDark, border:"1px solid "+C.greyDark, padding:"2px 7px", borderRadius:1, flexShrink:0 }}>Not marked present</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={s.id} style={{ padding:"10px 0", borderBottom:"1px solid "+C.border }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:cancelled?0:8 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:11, color:C.greyDark, marginBottom:2 }}>{fmtRaceDate(s.date)}</div>
            <div style={{ fontWeight:700, fontSize:14, color:cancelled?C.greyDark:C.white, textDecoration:cancelled?"line-through":"none" }}>{s.focus || s.title}</div>
          </div>
          {cancelled && (
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#ff6b6b", border:"1px solid #7f1d1d", padding:"2px 7px", borderRadius:1, flexShrink:0 }}>Cancelled</div>
          )}
        </div>
        {!cancelled && (
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <button onClick={function(){ setAttendanceIntent(s.id, "attending"); }} style={{ background: myStatus==="attending" ? "rgba(34,197,94,0.12)" : "transparent", border:"1px solid "+(myStatus==="attending"?"#166534":"#333"), color: myStatus==="attending" ? C.green : C.grey, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"5px 10px", borderRadius:2, cursor:"pointer" }}>{myStatus==="attending" ? "\u2713 Attending" : "Attending"}</button>
            <button onClick={function(){ setAttendanceIntent(s.id, "maybe"); }} style={{ background: myStatus==="maybe" ? "rgba(245,158,11,0.12)" : "transparent", border:"1px solid "+(myStatus==="maybe"?"#78350f":"#333"), color: myStatus==="maybe" ? C.amber : C.grey, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"5px 10px", borderRadius:2, cursor:"pointer" }}>{myStatus==="maybe" ? "\u2713 Maybe" : "Maybe"}</button>
            <button onClick={function(){ setAttendanceIntent(s.id, "not_attending"); }} style={{ background: myStatus==="not_attending" ? "rgba(255,107,107,0.1)" : "transparent", border:"1px solid "+(myStatus==="not_attending"?"#7f1d1d":"#333"), color: myStatus==="not_attending" ? "#ff6b6b" : C.grey, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"5px 10px", borderRadius:2, cursor:"pointer" }}>{myStatus==="not_attending" ? "\u2713 Not attending" : "Not attending"}</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <span style={S.eyebrow}>Training Blocks</span>
      <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Blocks</h2>
      <p style={{ fontSize:13, color:C.grey, marginBottom:20 }}>Your current block's sessions, plus what's coming up next.</p>

      {nextDiscountPercent > 0 && (
        <div style={{ background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"10px 14px", marginBottom:20, fontSize:12, color:C.green }}>
          Loyalty discount active - you'll get {nextDiscountPercent}% off your next block for staying enrolled.
        </div>
      )}

      {(function() {
        const myPacks = (allData.sessionPacks||[]).filter(function(p){ return p.memberId === member.id; }).slice().sort(function(a,b){ return b.purchaseDate.localeCompare(a.purchaseDate); });
        const pendingPacks = myPacks.filter(function(p){ return p.paymentStatus === "pending"; });
        const pendingEnrolments = (member.blockEnrolments||[]).filter(function(e){ return e.paymentStatus === "pending"; });
        const hasAnyPending = pendingPacks.length > 0 || pendingEnrolments.length > 0;

        return (
          <div style={{ marginBottom:24 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#f59e0b" }}>Pay As You Go</div>
              <button onClick={function(){ setShowBuyPack(!showBuyPack); }} style={{ background:"transparent", border:"1px solid #f59e0b", color:"#f59e0b", fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"5px 10px", borderRadius:2, cursor:"pointer" }}>{showBuyPack ? "Cancel" : "+ Buy sessions"}</button>
            </div>

            {hasAnyPending && (
              <div style={{ background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"12px 14px", marginBottom:12 }}>
                <div style={{ fontWeight:700, fontSize:13, color:"#ff6b6b", marginBottom:4 }}>Payment reminder</div>
                <div style={{ fontSize:12, color:"#ffb4b4", lineHeight:1.6 }}>You have {pendingPacks.length + pendingEnrolments.length} purchase{(pendingPacks.length+pendingEnrolments.length)!==1?"s":""} awaiting payment confirmation. Please pay by bank transfer using the details below - your coach will confirm once received.</div>
                <div style={{ fontSize:12, color:"#ccc", lineHeight:1.8, marginTop:8 }}>
                  <div><span style={{ color:"#888" }}>Account name:</span> {BANK_DETAILS.accountName}</div>
                  <div><span style={{ color:"#888" }}>Sort code:</span> {BANK_DETAILS.sortCode}</div>
                  <div><span style={{ color:"#888" }}>Account number:</span> {BANK_DETAILS.accountNumber}</div>
                </div>
              </div>
            )}

            {showBuyPack && (
              <div style={{ background:C.panel, border:"1px solid #78350f", borderRadius:2, padding:16, marginBottom:14 }}>
                <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                  <button onClick={function(){ setBuyPackType("persession"); }} style={{ flex:1, background: buyPackType==="persession" ? "rgba(245,158,11,0.12)" : "transparent", border:"1px solid "+(buyPackType==="persession"?"#f59e0b":"#333"), color: buyPackType==="persession" ? "#f59e0b" : C.grey, fontWeight:700, fontSize:11, letterSpacing:"0.04em", textTransform:"uppercase", padding:"8px 10px", borderRadius:2, cursor:"pointer" }}>Pay per session</button>
                  <button onClick={function(){ setBuyPackType("pack10"); }} style={{ flex:1, background: buyPackType==="pack10" ? "rgba(245,158,11,0.12)" : "transparent", border:"1px solid "+(buyPackType==="pack10"?"#f59e0b":"#333"), color: buyPackType==="pack10" ? "#f59e0b" : C.grey, fontWeight:700, fontSize:11, letterSpacing:"0.04em", textTransform:"uppercase", padding:"8px 10px", borderRadius:2, cursor:"pointer" }}>10 sessions</button>
                </div>

                {buyPackType === "persession" ? (
                  <div>
                    <label style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.grey, display:"block", marginBottom:8 }}>Select the Fridays you want to pay for ({"\u00A3"}{myPerSessionRate.toFixed(2)} each)</label>
                    {upcomingFridaySessionsForMember().length===0 ? (
                      <div style={{ fontSize:13, color:C.greyDark, padding:"10px 0" }}>No upcoming sessions are scheduled yet.</div>
                    ) : (
                      <div style={{ display:"flex", flexDirection:"column", gap:6, maxHeight:260, overflowY:"auto", marginBottom:10 }}>
                        {upcomingFridaySessionsForMember().map(function(s) {
                          const checked = buySelectedSessionIds.indexOf(s.id) !== -1;
                          return (
                            <div key={s.id} onClick={function(){ toggleBuySessionDate(s.id); }}
                              style={{ display:"flex", alignItems:"center", gap:10, background: checked ? "rgba(245,158,11,0.1)" : "#161616", border:"1px solid "+(checked?"#f59e0b":"#333"), borderRadius:2, padding:"9px 12px", cursor:"pointer" }}>
                              <div style={{ width:16, height:16, borderRadius:3, border:"2px solid "+(checked?"#f59e0b":"#555"), background:checked?"#f59e0b":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                {checked && <span style={{ color:"#000", fontSize:10, fontWeight:900, lineHeight:1 }}>{"\u2713"}</span>}
                              </div>
                              <div style={{ fontSize:13, color:"#fff", fontWeight:700 }}>{s.date}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize:12, color:C.grey, marginBottom:10, lineHeight:1.6 }}>10 sessions to use whenever you like, valid for 12 weeks - {"\u00A3"}{myPack10Price.toFixed(2)} ({"\u00A3"}{(myPack10Price/10).toFixed(2)}/session).</div>
                )}

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"10px 12px", marginBottom:10 }}>
                  <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.grey }}>Total</span>
                  <span style={{ fontWeight:900, fontSize:16, color:"#22c55e" }}>{"\u00A3"}{buyPackTotal().toFixed(2)}</span>
                </div>

                <button onClick={confirmBuyPack} disabled={buyPackType==="persession" && buySelectedSessionIds.length===0} style={{ display:"block", width:"100%", background: (buyPackType==="persession" && buySelectedSessionIds.length===0) ? "#333" : "#e01a1a", color:"#fff", border:"none", padding:"11px 16px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor: (buyPackType==="persession" && buySelectedSessionIds.length===0) ? "default" : "pointer" }}>Confirm purchase</button>
              </div>
            )}

            {myPacks.length === 0 ? (
              <div style={{ fontSize:13, color:C.greyDark }}>You haven't bought any pay-as-you-go sessions yet.</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {myPacks.map(function(pack) {
                  const daysLeft = Math.ceil((new Date(pack.expiryDate) - new Date()) / (1000*60*60*24));
                  const sessionsLeft = pack.sessionsTotal - pack.sessionsUsed;
                  const expired = daysLeft < 0 || sessionsLeft <= 0;
                  const pending = pack.paymentStatus === "pending";
                  const packSessions = pack.allowedSessionIds
                    ? pack.allowedSessionIds.map(function(sid){ return sessions.find(function(s){ return s.id===sid; }); }).filter(Boolean).sort(function(a,b){ return a.date.localeCompare(b.date); })
                    : null;
                  return (
                    <div key={pack.id} style={{ background:"#1a1205", border:"1px solid "+(pending?"#7f1d1d":"#78350f"), borderRadius:2, padding:"14px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginBottom:8 }}>
                        <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{pack.allowedSessionIds ? pack.sessionsTotal+" selected Fridays" : pack.sessionsTotal+" session pack"}</div>
                        {pending ? (
                          <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#ff6b6b", border:"1px solid #7f1d1d", padding:"2px 7px", borderRadius:1, flexShrink:0 }}>Awaiting payment</span>
                        ) : expired ? (
                          <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.greyDark, border:"1px solid "+C.greyDark, padding:"2px 7px", borderRadius:1, flexShrink:0 }}>Expired/used up</span>
                        ) : (
                          <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.green, border:"1px solid #166534", padding:"2px 7px", borderRadius:1, flexShrink:0 }}>Paid</span>
                        )}
                      </div>
                      {!expired && (
                        <div style={{ display:"flex", gap:24, marginBottom:packSessions?10:0 }}>
                          <div>
                            <div style={{ fontWeight:900, fontSize:20, color:C.white }}>{sessionsLeft}</div>
                            <div style={{ fontSize:11, color:C.grey }}>session{sessionsLeft!==1?"s":""} left</div>
                          </div>
                          <div>
                            <div style={{ fontWeight:900, fontSize:20, color:daysLeft<=7?"#ff6b6b":C.white }}>{daysLeft}</div>
                            <div style={{ fontSize:11, color:C.grey }}>day{daysLeft!==1?"s":""} left</div>
                          </div>
                        </div>
                      )}
                      {packSessions && packSessions.length > 0 && (
                        <div style={{ fontSize:12, color:C.greyLight, lineHeight:1.7 }}>
                          {packSessions.map(function(s){ return s.date; }).join(", ")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {currentBlock && (
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.red, marginBottom:10 }}>Current block</div>
          <div style={{ background:"rgba(224,26,26,0.06)", border:"1px solid "+C.red, borderRadius:2, padding:"16px", marginBottom:4 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginBottom:4 }}>
              <span style={{ fontWeight:900, fontSize:16, color:C.white }}>{currentBlock.label}</span>
              {isEnrolled(currentBlock.id) && (
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.green, border:"1px solid #166534", padding:"2px 7px", borderRadius:1 }}>Signed up</span>
              )}
            </div>
            <div style={{ fontSize:12, color:C.grey, marginBottom:isEnrolled(currentBlock.id)?0:12 }}>{currentBlock.startDate} to {currentBlock.endDate}</div>
            {!isEnrolled(currentBlock.id) && (
              confirmSignupBlock && confirmSignupBlock.id === currentBlock.id ? (
                <div style={{ background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"12px 14px", marginTop:8 }}>
                  <div style={{ fontSize:12, color:"#ff6b6b", marginBottom:8, fontWeight:700 }}>Sign up for {currentBlock.label} - {"\u00A3"}{discountedPrice(currentBlock).toFixed(2)}?</div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    <button onClick={confirmSignup} style={{ background:"#7f1d1d", border:"none", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>Yes, sign me up</button>
                    <button onClick={cancelSignup} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>No, not yet</button>
                  </div>
                </div>
              ) : (
                <button onClick={function(){ requestSignup(currentBlock); }} style={{ background:"#e01a1a", color:"#fff", border:"none", padding:"9px 16px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>Sign up now - {"\u00A3"}{discountedPrice(currentBlock).toFixed(2)}</button>
              )
            )}
          </div>
          {sessionsForBlock(currentBlock.id).length === 0 ? (
            <div style={{ padding:"20px 0", textAlign:"center", color:C.greyDark, fontSize:13 }}>No sessions scheduled in this block yet.</div>
          ) : (
            <div>{sessionsForBlock(currentBlock.id).map(function(s){ return renderSessionRow(s, false); })}</div>
          )}
        </div>
      )}

      {futureBlocks.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Upcoming blocks</div>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {futureBlocks.map(function(b) {
              const enrolled = isEnrolled(b.id);
              const isOpen = openBlockId === b.id;
              const confirming = confirmSignupBlock && confirmSignupBlock.id === b.id;
              return (
                <div key={b.id} style={{ background:enrolled?C.panel:"#0d0d0d", border:"1px solid "+(enrolled?C.border:"#262626"), borderRadius:2, overflow:"hidden", opacity:enrolled?1:0.75 }}>
                  <div onClick={function(){ if (enrolled) toggleBlock(b.id); }} style={{ padding:"14px 16px", cursor:enrolled?"pointer":"default" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:enrolled?C.white:C.grey }}>{b.label}</div>
                        <div style={{ fontSize:11, color:C.greyDark, marginTop:2 }}>{b.startDate} to {b.endDate}</div>
                      </div>
                      {enrolled ? (
                        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                          <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.green, border:"1px solid #166534", padding:"2px 7px", borderRadius:1 }}>Signed up</span>
                          <span style={{ fontSize:13, color:C.grey }}>{isOpen?"-":"+"}</span>
                        </div>
                      ) : b.isOpen && !confirming ? (
                        <button onClick={function(e){ e.stopPropagation(); requestSignup(b); }} style={{ background:"#e01a1a", color:"#fff", border:"none", padding:"7px 14px", fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:2, cursor:"pointer", flexShrink:0 }}>Sign up - {"\u00A3"}{discountedPrice(b).toFixed(2)}</button>
                      ) : !b.isOpen ? (
                        <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.greyDark, flexShrink:0 }}>Not yet open</span>
                      ) : null}
                    </div>
                    {confirming && (
                      <div onClick={function(e){ e.stopPropagation(); }} style={{ background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"12px 14px", marginTop:10 }}>
                        <div style={{ fontSize:12, color:"#ff6b6b", marginBottom:8, fontWeight:700 }}>Sign up for {b.label} - {"\u00A3"}{discountedPrice(b).toFixed(2)}?</div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          <button onClick={confirmSignup} style={{ background:"#7f1d1d", border:"none", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>Yes, sign me up</button>
                          <button onClick={cancelSignup} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>No, not yet</button>
                        </div>
                      </div>
                    )}
                  </div>
                  {enrolled && isOpen && (
                    <div style={{ borderTop:"1px solid "+C.border, padding:"4px 16px 8px" }}>
                      {sessionsForBlock(b.id).length === 0 ? (
                        <div style={{ fontSize:13, color:C.greyDark, padding:"8px 0" }}>No sessions scheduled yet.</div>
                      ) : (
                        sessionsForBlock(b.id).map(function(s){ return renderSessionRow(s, false); })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {pastBlocks.length > 0 && (
        <div style={{ borderTop:"1px solid "+C.border, paddingTop:20 }}>
          <div onClick={function(){ setShowArchive(!showArchive); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", marginBottom:showArchive?14:0 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey }}>Archive - past blocks</div>
            <span style={{ fontSize:13, color:C.grey }}>{showArchive?"-":"+"}</span>
          </div>
          {showArchive && (
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {pastBlocks.map(function(b) {
                const isOpen = openBlockId === b.id;
                return (
                  <div key={b.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, overflow:"hidden" }}>
                    <div onClick={function(){ toggleBlock(b.id); }} style={{ padding:"12px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                      <div>
                        <div style={{ fontWeight:700, fontSize:13, color:C.greyLight }}>{b.label}</div>
                        <div style={{ fontSize:11, color:C.greyDark, marginTop:2 }}>{b.startDate} to {b.endDate}</div>
                      </div>
                      <span style={{ fontSize:13, color:C.grey }}>{isOpen?"-":"+"}</span>
                    </div>
                    {isOpen && (
                      <div style={{ borderTop:"1px solid "+C.border, padding:"4px 16px 8px" }}>
                        {sessionsForBlock(b.id).length === 0 ? (
                          <div style={{ fontSize:13, color:C.greyDark, padding:"8px 0" }}>No sessions recorded.</div>
                        ) : (
                          sessionsForBlock(b.id).map(function(s){ return renderSessionRow(s, true); })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}




function countdownParts(dateStr) {
  const target = new Date(dateStr+"T00:00:00");
  const now = new Date();
  const diffMs = target - now;
  if (diffMs <= 0) return null;
  const totalDays = Math.floor(diffMs / (1000*60*60*24));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  const hours = Math.floor((diffMs % (1000*60*60*24)) / (1000*60*60));
  return { totalDays: totalDays, weeks: weeks, days: days, hours: hours };
}

function MyEventsPage({ member, plannedEvents, onSave, allMembers, raceLogContent }) {
  const [openEventId, setOpenEventId] = useState(null);

  const TODAY_MY = new Date();

  function commitmentsFor(eventId) {
    if (!allMembers) return [];
    const list = [];
    allMembers.forEach(function(m) {
      (m.plannedEvents||[]).forEach(function(pe) {
        if (pe.eventId === eventId) list.push({ name:displayName(m), note:pe.note, isMe: member && m.id===member.id });
      });
    });
    return list;
  }

  const myUpcoming = (plannedEvents||[])
    .filter(function(pe) { return new Date(pe.eventDate) >= TODAY_MY; })
    .slice()
    .sort(function(a,b) { return a.eventDate.localeCompare(b.eventDate); });

  const nextEvent = myUpcoming.length > 0 ? myUpcoming[0] : null;
  const cd = nextEvent ? countdownParts(nextEvent.eventDate) : null;

  function toggleOpen(id) { setOpenEventId(openEventId === id ? null : id); }

  return (
    <div>
      <div>
        <span style={S.eyebrow}>Racing</span>
        <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>My Events</h2>
        <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>The races you've committed to, and how the countdown is looking.</p>

        {nextEvent && cd && (
          <div style={{ background:"linear-gradient(135deg, #1a0505, #0d0d0d)", border:"1px solid "+C.red, borderRadius:2, padding:"20px", marginBottom:24, textAlign:"center" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.amber, marginBottom:8 }}>Up next</div>
            <div style={{ fontWeight:700, fontSize:16, color:C.white, marginBottom:2 }}>{nextEvent.eventName}</div>
            <div style={{ fontSize:12, color:C.grey, marginBottom:16 }}>{nextEvent.eventDate}</div>
            <div style={{ display:"flex", justifyContent:"center", gap:16 }}>
              {[[cd.weeks,"weeks"],[cd.days,"days"],[cd.hours,"hrs"]].map(function(part) {
                return (
                  <div key={part[1]} style={{ textAlign:"center" }}>
                    <div style={{ fontWeight:900, fontSize:"1.8rem", color:C.red, fontFamily:"monospace", lineHeight:1 }}>{part[0]}</div>
                    <div style={{ fontSize:9, color:C.grey, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:4 }}>{part[1]}</div>
                  </div>
                );
              })}
            </div>
            {commitmentsFor(nextEvent.eventId).length > 1 && (
              <div style={{ fontSize:11, color:"#3b82f6", marginTop:14 }}>{commitmentsFor(nextEvent.eventId).length} swimmers from the squad committed</div>
            )}
          </div>
        )}

        {myUpcoming.length === 0 && (
          <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"28px 20px", textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:14, color:C.grey, marginBottom:6 }}>No events committed yet.</div>
            <div style={{ fontSize:12, color:C.greyDark }}>Use Find Events below to find your next race.</div>
          </div>
        )}

        {myUpcoming.length > 0 && (
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>All my committed events</div>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {myUpcoming.map(function(pe) {
                const isOpen = openEventId === pe.eventId;
                const commits = commitmentsFor(pe.eventId);
                const evCd = countdownParts(pe.eventDate);
                return (
                  <div key={pe.eventId} style={{ background:isOpen?C.panel:C.bg, border:"1px solid "+(isOpen?C.red+"66":C.border), borderRadius:2, overflow:"hidden" }}>
                    <div onClick={function(){ toggleOpen(pe.eventId); }} style={{ padding:"14px 16px", cursor:"pointer" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:11, color:C.greyDark, marginBottom:4 }}>{pe.eventDate}</div>
                          <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{pe.eventName}</div>
                          {pe.note && <div style={{ fontSize:12, color:C.amber, marginTop:3, fontStyle:"italic" }}>{pe.note}</div>}
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0 }}>
                          {evCd && <div style={{ fontSize:11, fontWeight:700, color:C.amber, fontFamily:"monospace" }}>{evCd.totalDays}d</div>}
                          {commits.length > 0 && <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#3b82f6" }}>{commits.length} committed</div>}
                          <div style={{ fontSize:13, color:C.grey }}>{isOpen?"-":"+"}</div>
                        </div>
                      </div>
                    </div>
                    {isOpen && (
                      <div style={{ borderTop:"1px solid "+C.border, padding:"12px 16px 16px" }}>
                        <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6", marginBottom:8 }}>Who else is going</div>
                        {commits.length === 0 ? (
                          <div style={{ fontSize:13, color:C.greyDark }}>Just you so far.</div>
                        ) : (
                          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                            {commits.map(function(c, i) {
                              return (
                                <div key={i}>
                                  <span style={{ fontWeight:700, fontSize:13, color:c.isMe?C.amber:C.white }}>{c.name}{c.isMe?" (you)":""}</span>
                                  {c.note && <span style={{ fontSize:12, color:"#93c5fd", fontStyle:"italic" }}> - {c.note}</span>}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop:"1px solid "+C.border, marginTop:32, paddingTop:32 }}>
        {raceLogContent}
      </div>

      <div style={{ borderTop:"1px solid "+C.border, marginTop:32, paddingTop:32 }}>
        <RaceSearch member={member} plannedEvents={plannedEvents} onSave={onSave} isCoach={false} allMembers={allMembers}/>
      </div>
    </div>
  );
}



function RaceSearch({ member, plannedEvents, onSave, isCoach, allMembers }) {
  const [cat, setCat] = useState("All events");
  const [expanded, setExpanded] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [filterScrollState, setFilterScrollState] = useState({ left:false, right:false });
  const filterBarRef = useRef(null);
  function checkFilterScroll(el) {
    if (!el) return;
    const nextLeft = el.scrollLeft > 2;
    const nextRight = el.scrollLeft < (el.scrollWidth - el.clientWidth - 2);
    setFilterScrollState(function(prev) {
      if (prev.left === nextLeft && prev.right === nextRight) return prev;
      return { left: nextLeft, right: nextRight };
    });
  }
  useEffect(function() {
    checkFilterScroll(filterBarRef.current);
  }, []);

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
        if (pe.eventId === eventId) list.push({ name:displayName(m), note:pe.note });
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

      <div style={{ position:"relative", marginBottom:20 }}>
        <div ref={filterBarRef} onScroll={function(e){ checkFilterScroll(e.target); }} style={{ display:"flex", gap:0, overflowX:"auto", borderBottom:"1px solid "+C.border }}>
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
        {filterScrollState.right && (
          <div onClick={function(){ if (filterBarRef.current) { filterBarRef.current.scrollTo({ left: filterBarRef.current.scrollWidth, behavior:"smooth" }); } }} style={{ position:"absolute", top:0, right:0, bottom:1, width:44, background:"linear-gradient(to right, transparent, "+C.bg+" 65%)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:6 }}>
            <span style={{ color:C.grey, fontSize:16, fontWeight:700 }}>{"\u203A"}</span>
          </div>
        )}
        {filterScrollState.left && (
          <div onClick={function(){ if (filterBarRef.current) { filterBarRef.current.scrollTo({ left:0, behavior:"smooth" }); } }} style={{ position:"absolute", top:0, left:0, bottom:1, width:44, background:"linear-gradient(to left, transparent, "+C.bg+" 65%)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"flex-start", paddingLeft:6 }}>
            <span style={{ color:C.grey, fontSize:16, fontWeight:700 }}>{"\u2039"}</span>
          </div>
        )}
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
  const [showReports, setShowReports] = useState(false);
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
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
        <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase" }}>Race Reports</h2>
        {!showForm && <button onClick={openAdd} style={{ background:"#e01a1a", color:"#fff", padding:"9px 16px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer", flexShrink:0 }}>+ Add race</button>}
      </div>
      <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Log how your races go and track your progress over time.</p>

      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        <button onClick={function(){ setShowReports(!showReports); }} style={{ background:showReports?C.panel:"transparent", border:"1px solid "+(showReports?C.border:"#3b82f6"), color:showReports?C.grey:"#3b82f6", padding:"8px 14px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>{showReports?"Hide reports":"View reports ("+reports.length+")"}</button>
      </div>

      {showForm && (
        <div style={{ background:C.panel, border:"1px solid #3b82f6", padding:16, borderRadius:2, marginBottom:20 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:14 }}>
            {editing ? "Edit race report" : "Add a race report"}
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

      {showReports && (
        <div>
          {reports.length === 0 && (
            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"32px 20px", textAlign:"center", marginBottom:4 }}>
              <div style={{ fontSize:14, color:C.grey, marginBottom:8 }}>No race reports yet.</div>
              <div style={{ fontSize:12, color:C.greyDark }}>Tap + Add race above to log your first result.</div>
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
      )}
    </div>
  );
}

function HallOfRecords({ members, blocks, isCoach, currentMemberId }) {
  const [expandedRec, setExpandedRec] = useState(null);

  const EVENTS = ["50m Free","100m Free","200m Free","400m Free","50m Back","100m Back","50m Breast","100m Breast","50m Fly","100m Fly","200m IM"];

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

  // Test accounts (coach-only, used to try out the swimmer flow before a real
  // swimmer logs in) never count toward club records or leaderboards, even
  // for the coach viewing their own test data via "View as".
  const recordMembers = (members||[]).filter(function(m){ return !m.isTest; });

  const free100 = [];
  recordMembers.forEach(function(m) {
    (m.benchmarks||[]).forEach(function(b) {
      if (b.event !== "100m Free") return;
      const d = parseD(b.date);
      free100.push({ name:m.name, display:displayName(m), gender:m.gender||"M", time:b.time, secs:toSeconds(b.time), date:b.date, parsed:d, startType:b.startType||"push" });
    });
  });

  // Rolling last 7 days ending today, not a fixed calendar week - this used
  // to be hardcoded to a specific week in July 2026, which meant it silently
  // stopped matching any real data once that week passed. Falls back to
  // all-time fastest (rather than a fixed stale month) if nobody's swum yet
  // in the last 7 days.
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayStr = today.toISOString().slice(0,10);
  const weekStart = new Date(today); weekStart.setDate(weekStart.getDate()-6);
  const weekEndExclusive = new Date(today); weekEndExclusive.setDate(weekEndExclusive.getDate()+1);
  const thisWeek  = free100.filter(function(e){ return e.parsed && e.parsed>=weekStart && e.parsed<weekEndExclusive; });
  const weekSource = thisWeek.length > 0 ? thisWeek : free100;
  const weekLabel  = thisWeek.length > 0 ? "This week" : "All-time";

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

  // Scoped to the real current training block (from the coach's Blocks tab),
  // not a fixed date range - this used to be hardcoded to Jan-Aug 2026,
  // which silently excluded every benchmark logged after 1 Aug regardless
  // of which block was actually running.
  const activeBlock = (blocks||[]).find(function(b){ return b.startDate<=todayStr && todayStr<=b.endDate; })
    || (blocks||[]).slice().sort(function(a,b){ return b.startDate.localeCompare(a.startDate); })[0]
    || null;
  const blockStart = activeBlock ? new Date(activeBlock.startDate) : new Date(today.getFullYear(),0,1);
  const blockEnd   = activeBlock ? new Date(new Date(activeBlock.endDate).getTime()+86400000) : new Date(today.getTime()+86400000);
  const improvements = [];
  recordMembers.forEach(function(m) {
    const entries = free100.filter(function(e){ return e.name===m.name && e.parsed && e.parsed>=blockStart && e.parsed<blockEnd; }).sort(function(a,b){ return a.parsed-b.parsed; });
    if (entries.length < 2) return;
    const drop = entries[0].secs - entries[entries.length-1].secs;
    if (drop > 0) improvements.push({ name:m.name, display:displayName(m), drop:drop, from:entries[0].time, to:entries[entries.length-1].time });
  });
  improvements.sort(function(a,b){ return b.drop-a.drop; });

  const currentImpEntry = currentName ? improvements.find(function(e){ return e.name===currentName; }) : null;
  const currentImpRank  = currentImpEntry ? improvements.indexOf(currentImpEntry)+1 : null;

  const top3Imp = improvements.slice(0,3);

  const MEDAL = ["#f59e0b","#9ca3af","#cd7c39"];

  // Club records aren't manually entered - each one is just whoever
  // currently holds the fastest recorded benchmark time for that event,
  // per gender. One row per event that has at least one time logged.
  function bestRecordsForGender(g) {
    const out = [];
    EVENTS.forEach(function(ev) {
      const top = top10ForRecord({ event:ev, gender:g });
      if (top.length === 0) return;
      const best = top[0];
      out.push({ id:ev+"-"+g, event:ev, gender:g, holder:best.name, time:best.time, date:best.date, startType:best.startType });
    });
    return out;
  }
  const menRecs   = bestRecordsForGender("M");
  const womenRecs = bestRecordsForGender("F");

  function top10ForRecord(rec) {
    const entries = [];
    recordMembers.forEach(function(m) {
      if ((m.gender||"M") !== (rec.gender||"M")) return;
      (m.benchmarks||[]).forEach(function(b) {
        if (b.event !== rec.event) return;
        entries.push({ display:displayName(m), name:m.name, time:b.time, secs:toSeconds(b.time), date:b.date, startType:b.startType||"push" });
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
          Most improved 100m Free - {activeBlock ? activeBlock.label : "this block"}
        </div>
        <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, overflow:"hidden" }}>
          <div style={{ padding:"8px 12px", background:"#052e16" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.green }}>Top improvements</div>
          </div>
          {top3Imp.length===0 ? (
            <div style={{ padding:"14px 12px", fontSize:12, color:C.greyDark }}>Needs at least 2 recorded 100m Free times within {activeBlock ? activeBlock.label : "this block"} to show improvement - swimmers with only one time so far will appear here once they have a second.</div>
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
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>All-time club records</div>
        <div style={{ fontSize:12, color:C.greyDark, marginBottom:12 }}>Each record is simply the fastest time logged for that event - it updates automatically as new benchmarks come in.</div>

        {[["M","Men","#3b82f6","#0d1a2d",menRecs],["F","Women","#ec4899","#2d0a1a",womenRecs]].map(function(grp) {
          const gKey = grp[0];
          const gLabel = grp[1];
          const gCol = grp[2];
          const gBg = grp[3];
          const recs = grp[4];
          return (
            <div key={gKey} style={{ marginTop:gKey==="F"?16:0 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:gCol, padding:"6px 10px", background:gBg, borderRadius:2, marginBottom:6 }}>{gLabel}</div>
              {recs.length===0 && <div style={{ fontSize:13, color:C.greyDark, padding:"8px 12px", marginBottom:8 }}>No times recorded yet.</div>}
              {recs.map(function(rec) {
                const evCol = EVENT_COLORS[rec.event]||C.red;
                const isOpen = expandedRec===rec.id;
                return (
                  <div key={rec.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, marginBottom:2 }}>
                    <div onClick={function(){ setExpandedRec(isOpen?null:rec.id); }} style={{ padding:"10px 12px", display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                      <div style={{ width:3, background:evCol, alignSelf:"stretch", borderRadius:2, flexShrink:0 }}/>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:evCol }}>{rec.event}</div>
                        <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{displayNameByFullName(rec.holder, members)}</div>
                        <div style={{ fontSize:11, color:C.grey }}>{rec.date}</div>
                      </div>
                      <div style={{ fontWeight:900, fontSize:15, color:C.white, fontFamily:"monospace", flexShrink:0 }}>{rec.time}</div>
                      <div style={{ fontSize:11, color:C.grey, flexShrink:0 }}>{isOpen?"v":"+"}</div>
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
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}


function MessagesPage({ currentUserId, currentUserName, isCoach, messages, members, coaches, onSend }) {
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
    return { id: m.id, name: displayName(m), isCoach:false };
  }).filter(function(p){ return String(p.id) !== String(currentUserId); });
  const coachList = (coaches||COACHES_DATA).map(function(c) {
    return { id: c.id, name: "Coach "+c.name, isCoach:true };
  }).filter(function(c){ return String(c.id) !== String(currentUserId); });
  const peopleWithCoach = isCoach ? people.concat(coachList) : coachList.concat(people);

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
        <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", flexDirection:"column", background:C.bg }}>
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





function AttendanceModal({ session, members, sessionPacks, onClose, onToggle }) {
  const [showAll, setShowAll] = useState(false);
  function handleToggleAll() { setShowAll(!showAll); }

  const eligible = members
    .filter(function(m){ return m.block === session.block; })
    .sort(function(a,b){ return a.name.localeCompare(b.name); });

  const allSorted = members.slice().sort(function(a,b){ return a.name.localeCompare(b.name); });
  const list = showAll ? allSorted : eligible;
  const attended = Object.values(session.attendance || {}).filter(Boolean).length;

  function activePackFor(memberId) {
    return (sessionPacks||[]).find(function(p) {
      return p.memberId === memberId && p.sessionsUsed < p.sessionsTotal && new Date(p.expiryDate) >= new Date();
    });
  }

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
            const pack = activePackFor(m.id);
            return (
              <div key={m.id} onClick={function(){ onToggle(session.id, m.id); }}
                style={{ display:"flex", alignItems:"center", gap:14, padding:"12px", marginBottom:2, background:present ? "#0d2b1a" : C.bg, border:"1px solid " + (present ? "#166534" : inBlock ? C.border : C.greyDark), borderRadius:2, cursor:"pointer", opacity:inBlock ? 1 : 0.6 }}>
                <div style={{ width:26, height:26, borderRadius:3, border:"2px solid " + (present ? C.green : C.greyDark), background:present ? C.green : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {present && <span style={{ color:"#000", fontSize:15, fontWeight:900, lineHeight:1 }}>OK</span>}
                </div>
                <Avatar name={m.name} size={34} photo={m.photo}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:present ? C.white : C.greyLight }}>{displayName(m)}</div>
                  <div style={{ fontSize:11, color:C.grey }}>{m.block}{!inBlock ? " - different block" : ""}{pack ? " - on session pack ("+(pack.sessionsTotal-pack.sessionsUsed)+" left)" : ""}</div>
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

function LoginPage({ onSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleKeyDown(e) { if (e.key === "Enter") handle(); }
  function handle() {
    setError("");
    setLoading(true);
    api.signIn(email, password).then(function() {
      return onSuccess();
    }).catch(function(err) {
      setLoading(false);
      setError(err.message === "Invalid login credentials" ? "Email or password not recognised." : (err.message || "Something went wrong signing in."));
    });
  }

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white }}>
      <div style={{ padding:"16px 20px", borderBottom:"1px solid "+C.border }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:C.grey, cursor:"pointer", fontSize:13, padding:0 }}>
          Back to site
        </button>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"calc(100vh - 53px)", padding:24 }}>
        <div style={{ width:"100%", maxWidth:360, textAlign:"center" }}>
          <div style={{ marginLeft:24 }}><Logo height={210}/></div>
          <h1 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", margin:"36px 0 4px" }}>Login</h1>
          <p style={{ color:C.grey, fontSize:13, marginBottom:24 }}>Members and coaches use the same login.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={S.label}>Email</label>
              <input type="email" autoComplete="email" value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="your@email.com" style={S.input} onKeyDown={handleKeyDown}/>
            </div>
            <div>
              <label style={S.label}>Password</label>
              <input type="password" autoComplete="current-password" value={password} onChange={function(e){ setPassword(e.target.value); }} placeholder="..." style={S.input} onKeyDown={handleKeyDown}/>
            </div>
            {error && <div style={{ color:"#ff6b6b", fontSize:13 }}>{error}</div>}
            <button onClick={handle} disabled={loading} style={{ background:"#e01a1a", color:"#fff", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer", opacity:loading ? 0.7 : 1 }}>
              {loading ? "Checking..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForcePasswordChange({ memberId, onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSave() {
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords don't match."); return; }
    setSaving(true);
    api.changeMyPassword(password).then(function() {
      return api.updateMemberFields(memberId, { mustChangePassword: false });
    }).then(function() {
      setSaving(false);
      onDone();
    }).catch(function(err) {
      setSaving(false);
      setError(err.message || "Couldn't update your password. Please try again.");
    });
  }

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:360 }}>
        <Logo height={44}/>
        <h1 style={{ fontWeight:900, fontSize:"1.4rem", textTransform:"uppercase", margin:"28px 0 4px" }}>Set a new password</h1>
        <p style={{ color:C.grey, fontSize:13, marginBottom:24 }}>You're signed in with a temporary password. Choose a new one to continue.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={S.label}>New password</label>
            <input type="password" autoComplete="new-password" value={password} onChange={function(e){ setPassword(e.target.value); }} style={S.input}/>
          </div>
          <div>
            <label style={S.label}>Confirm new password</label>
            <input type="password" autoComplete="new-password" value={confirm} onChange={function(e){ setConfirm(e.target.value); }} style={S.input}/>
          </div>
          {error && <div style={{ color:"#ff6b6b", fontSize:13 }}>{error}</div>}
          <button onClick={handleSave} disabled={saving} style={{ background:"#e01a1a", color:"#fff", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer", opacity:saving?0.7:1 }}>
            {saving ? "Saving..." : "Save & continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CoachDashboard({ onLogout, sharedData, setSharedData, refreshData, coachId }) {
  const [tab, setTab] = useState("profiles");
  const [localData, setLocalData] = useState(INIT);
  const data = sharedData || localData;
  const setData = setSharedData || setLocalData;
  const currentCoach = (data.coaches||COACHES_DATA).find(function(c){ return c.id === coachId; }) || (data.coaches||COACHES_DATA)[0];
  const isHeadCoach = currentCoach.role === "head";
  const [readNotifIds, setReadNotifIds] = useState({});

  function sendCoachMessage(next) {
    const msg = next[next.length - 1];
    if (!msg) return;
    setData(function(d) { return Object.assign({}, d, { messages: next }); });
    api.sendMessage(msg.channel, String(msg.senderId), msg.senderName, msg.isCoach, msg.text).then(refreshData).catch(function(err) { window.alert("Couldn't send message: " + err.message); refreshData(); });
  }

  // As head coach, RLS lets this account see every message in every channel (for moderation) -
  // the unread badge must only count messages from others, in a channel this coach is actually part of.
  function messageIsUnreadByCoach(m) {
    if (String(m.senderId) === String(coachId)) return false;
    const chan = m.channel || "board";
    if (chan === "board") return true;
    const parts = chan.split(":");
    return parts[1] === String(coachId) || parts[2] === String(coachId);
  }
  // Persisted on the coach row (not local state) so the badge survives a page reload
  // instead of treating every message ever sent as newly unread on every fresh load.
  const messagesSeenAt = currentCoach.messagesSeenAt;
  const coachUnseenMessages = (data.messages||[]).filter(function(m) {
    return messageIsUnreadByCoach(m) && (!messagesSeenAt || new Date(m.timestamp) > new Date(messagesSeenAt));
  });
  const unreadMsgCount = coachUnseenMessages.length;

  function buildNotifications() {
    const items = [];
    const prefs = currentCoach.notifPrefs || { applications:true, raceReports:true, eventSignups:true, blockSignups:true };
    if (prefs.applications !== false) {
      data.applications.forEach(function(a) {
        items.push({ id:"app-"+a.id, kind:"application", icon:"New application", title:a.name+" applied to join", detail:a.swimmerType?a.swimmerType+" - "+(a.pb100||"no PB given"):"", date:a.date, sortKey:a.date, color:C.amber });
      });
    }
    data.members.forEach(function(m) {
      if (prefs.raceReports !== false) {
        (m.raceResults||[]).forEach(function(r) {
          items.push({ id:"race-"+m.id+"-"+r.id, kind:"race", icon:"Race report", title:displayName(m)+" logged a race report", detail:r.venue?r.venue+" - "+(r.time||""):(r.time||""), date:r.date, sortKey:r.date, color:"#3b82f6" });
        });
      }
      if (prefs.eventSignups !== false) {
        (m.plannedEvents||[]).forEach(function(pe) {
          items.push({ id:"evt-"+m.id+"-"+pe.eventId, kind:"event", icon:"Race sign-up", title:displayName(m)+" signed up for "+pe.eventName, detail:pe.note||"", date:pe.eventDate, sortKey:pe.eventDate, color:"#8b5cf6" });
        });
      }
      if (prefs.blockSignups !== false) {
        (m.blockEnrolments||[]).forEach(function(e, ei) {
          if (!e.signedUpDate) return;
          items.push({ id:"block-"+m.id+"-"+ei, kind:"block", icon:"Block sign-up", title:displayName(m)+" signed up for "+e.blockLabel, detail:"\u00A3"+e.pricePaid.toFixed(2)+(e.discountCode?" (discount applied)":""), date:e.signedUpDate, sortKey:e.signedUpDate, color:C.green });
        });
      }
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
  const [blocksValueFlash, setBlocksValueFlash] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [bankRef, setBankRef] = useState("");
  const [bankSent, setBankSent] = useState({});
  const [benchForm, setBenchForm] = useState({ memberId:"", event:"100m Free", time:"", detailLevel:"time", splits:["","","","","","",""], strokeCounts:["","","","","","",""], strokeCount1:"", strokeCount2:"", split50:"", startType:"push", date:new Date().toISOString().slice(0,10) });
  const [calMonth, setCalMonth] = useState(new Date(2026,6,1));
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  const [newCodeForm, setNewCodeForm] = useState({ code:"", type:"percent", value:"", appliesTo:"block" });
  const [showAddCoach, setShowAddCoach] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState("");
  const [showSettingsCard, setShowSettingsCard] = useState(false);
  const [newCoachForm, setNewCoachForm] = useState({ name:"", email:"", password:"" });
  const [showSessionPacks, setShowSessionPacks] = useState(false);
  const [showAddShopItem, setShowAddShopItem] = useState(false);
  const [shopItemForm, setShopItemForm] = useState({ name:"", description:"", price:"", condition:"used", category:"", newCategory:"", photo:null });
  const [expandedShopItem, setExpandedShopItem] = useState(null);
  const [packForm, setPackForm] = useState({ memberMode:"existing", memberId:"", newName:"", newEmail:"", sessionsTotal:"10", pricePerSession:"", expiryWeeks:"12", discountCode:"" });
  const [justCreatedPackId, setJustCreatedPackId] = useState(null);
  const [benchmarkFeedback, setBenchmarkFeedback] = useState(null);
  const [editingPackId, setEditingPackId] = useState(null);
  const [editPackForm, setEditPackForm] = useState({ sessionsTotal:"", sessionsUsed:"", pricePerSession:"", expiryDate:"" });
  const [confirmDeletePackId, setConfirmDeletePackId] = useState(null);
  const [expandedBlockRoster, setExpandedBlockRoster] = useState(null);
  const [expandedBlockReport, setExpandedBlockReport] = useState(null);
  const [reportingMemberId, setReportingMemberId] = useState("");
  const [reportingSub, setReportingSub] = useState("sessions");
  const [feedbackSessionId, setFeedbackSessionId] = useState("");
  const [feedbackDraft, setFeedbackDraft] = useState("");
  const [feedbackAudio, setFeedbackAudio] = useState(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [commentAudio, setCommentAudio] = useState(null);
  const [reportingBlockId, setReportingBlockId] = useState("");
  const [navScrollState, setNavScrollState] = useState({ left:false, right:false });
  const navBarRef = useRef(null);
  function checkNavScroll(el) {
    if (!el) return;
    const nextLeft = el.scrollLeft > 2;
    const nextRight = el.scrollLeft < (el.scrollWidth - el.clientWidth - 2);
    setNavScrollState(function(prev) {
      if (prev.left === nextLeft && prev.right === nextRight) return prev;
      return { left: nextLeft, right: nextRight };
    });
  }
  useEffect(function() {
    checkNavScroll(navBarRef.current);
  }, []);
  const [justDeletedIds, setJustDeletedIds] = useState([]);
  const [blockFilter, setBlockFilter] = useState("All");
  const [expandedBenchMember, setExpandedBenchMember] = useState(null);
  const [editingBenchmark, setEditingBenchmark] = useState(null);
  function startEditBenchmark(b) {
    setEditingBenchmark({ id:b.id, date:b.date, event:b.event, time:b.time, startType:b.startType||"push" });
  }
  function cancelEditBenchmark() { setEditingBenchmark(null); }
  function saveEditBenchmark() {
    if (!editingBenchmark) return;
    const eb = editingBenchmark;
    api.updateBenchmark(eb.id, { date:eb.date, event:eb.event, time:eb.time, startType:eb.startType }).then(function() {
      setEditingBenchmark(null);
      return refreshData();
    }).catch(function(err) { window.alert("Couldn't update benchmark: " + err.message); });
  }
  function deleteBenchmarkRow(b) {
    if (!window.confirm("Delete this "+b.event+" time ("+b.time+" on "+b.date+")? This can't be undone.")) return;
    api.deleteBenchmark(b.id).then(refreshData).catch(function(err) { window.alert("Couldn't delete benchmark: " + err.message); });
  }
  const [drillAssignMember, setDrillAssignMember] = useState(null);
  const [viewingAsId, setViewingAsId] = useState(null);
  const [pairingSessionId, setPairingSessionId] = useState("");

  function setTab_(t) { setTab(t); }
  function handleLogout() { onLogout(); }

  function approveApp(app) {
    api.approveApplication(app.id).then(refreshData).catch(function(err) { window.alert("Couldn't approve application: " + err.message); });
  }

  function rejectApp(app) {
    api.rejectApplication(app.id).then(refreshData).catch(function(err) { window.alert("Couldn't reject application: " + err.message); });
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
    const mid = benchForm.memberId;
    const wantSplits = benchForm.detailLevel === "splits" || benchForm.detailLevel === "full";
    const wantStrokes = benchForm.detailLevel === "full";
    const cleanSplits = wantSplits ? benchForm.splits.filter(function(s){ return s && s.trim(); }) : [];
    const cleanStrokes = wantStrokes ? benchForm.strokeCounts.filter(function(s){ return s && s.trim(); }).map(function(s){ return parseInt(s); }) : [];
    const entry = {
      date: benchForm.date,
      event: benchForm.event,
      time: benchForm.time,
      splits: cleanSplits.length > 0 ? benchForm.splits.slice(0, Math.max(1, Math.round((parseInt((benchForm.event.match(/^(\d+)m/)||[])[1]) || 0)/50))) : null,
      strokeCounts: cleanStrokes.length > 0 ? benchForm.strokeCounts.slice(0, Math.max(1, Math.round((parseInt((benchForm.event.match(/^(\d+)m/)||[])[1]) || 0)/50))).map(function(s){ return s ? parseInt(s) : null; }) : null,
      strokeCount1: (benchForm.event==="100m Free" && wantStrokes && benchForm.strokeCounts[0]) ? parseInt(benchForm.strokeCounts[0]) : null,
      strokeCount2: (benchForm.event==="100m Free" && wantStrokes && benchForm.strokeCounts[1]) ? parseInt(benchForm.strokeCounts[1]) : null,
      split50: (benchForm.event==="100m Free" && wantSplits && benchForm.splits[0]) ? benchForm.splits[0] : null,
      startType: benchForm.startType || "push",
    };
    api.addBenchmarkForMember(mid, entry).then(function(recorded) {
      return refreshData().then(function() { return recorded; });
    }).then(function(recorded) {
      setBenchmarkFeedback(recorded ? "recorded" : "kept-existing");
      setTimeout(function(){ setBenchmarkFeedback(null); }, 4000);
    }).catch(function(err) { window.alert("Couldn't add benchmark: " + err.message); });
    setBenchForm(function(f) { return Object.assign({}, f, { time:"", strokeCount1:"", strokeCount2:"", split50:"", splits:["","","","","","",""], strokeCounts:["","","","","","",""] }); }); // keep startType and detailLevel
  }

  function toggleAttendance(sessionId, memberId) {
    setAttendanceSession(function(prev) {
      if (!prev || prev.id !== sessionId) return prev;
      const cur = !!(prev.attendance && prev.attendance[memberId]);
      const newAtt = Object.assign({}, prev.attendance);
      newAtt[memberId] = !cur;
      return Object.assign({}, prev, { attendance: newAtt });
    });
    api.toggleAttendance(sessionId, memberId).then(refreshData).catch(function(err) {
      window.alert("Couldn't update attendance: " + err.message);
      setAttendanceSession(function(prev) {
        if (!prev || prev.id !== sessionId) return prev;
        const cur = !!(prev.attendance && prev.attendance[memberId]);
        const newAtt = Object.assign({}, prev.attendance);
        newAtt[memberId] = !cur;
        return Object.assign({}, prev, { attendance: newAtt });
      });
    });
  }

  function updateHallOfRecords(records) {
    api.replaceHallOfRecords(records).then(refreshData).catch(function(err) { window.alert("Couldn't update hall of records: " + err.message); });
  }
  function updateBlockPrice(blockId, price) {
    api.updateBlockPrice(blockId, price).then(refreshData).catch(function(err) { window.alert("Couldn't update block price: " + err.message); });
  }
  function saveBlockReportNotes(memberId, blockId, notes) {
    api.saveBlockReportNotes(memberId, blockId, notes).then(refreshData).catch(function(err) { window.alert("Couldn't save report notes: " + err.message); });
  }
  function publishBlockReport(memberId, blockId) {
    const member = data.members.find(function(m) { return m.id === memberId; });
    const cur = member && member.blockReports && member.blockReports[blockId];
    api.toggleBlockReportPublished(memberId, blockId, !!(cur && cur.published)).then(refreshData).catch(function(err) { window.alert("Couldn't publish report: " + err.message); });
  }
  function addSessionFeedback(memberId, sessionId, sessionDate, text, audio) {
    api.addSessionFeedback(memberId, sessionId, sessionDate, text, audio).then(refreshData).catch(function(err) { window.alert("Couldn't add feedback: " + err.message); });
  }
  function deleteSessionFeedback(memberId, feedbackId) {
    api.deleteSessionFeedback(feedbackId).then(refreshData).catch(function(err) { window.alert("Couldn't delete feedback: " + err.message); });
  }
  function addGeneralComment(memberId, text, audio) {
    api.addGeneralComment(memberId, text, audio).then(refreshData).catch(function(err) { window.alert("Couldn't add comment: " + err.message); });
  }
  function deleteGeneralComment(memberId, commentId) {
    api.deleteGeneralComment(commentId).then(refreshData).catch(function(err) { window.alert("Couldn't delete comment: " + err.message); });
  }
  function toggleBlockOpen(blockId) {
    const block = (data.blocks||BLOCKS).find(function(b) { return b.id === blockId; });
    api.toggleBlockOpen(blockId, block && block.isOpen).then(refreshData).catch(function(err) { window.alert("Couldn't update block: " + err.message); });
  }
  function addDiscountCode(code) {
    api.addDiscountCode(code).then(refreshData).catch(function(err) { window.alert("Couldn't add discount code: " + err.message); });
  }
  function toggleDiscountCode(codeStr) {
    const code = (data.discountCodes||[]).find(function(c) { return c.code === codeStr; });
    api.toggleDiscountCode(codeStr, code && code.active).then(refreshData).catch(function(err) { window.alert("Couldn't update discount code: " + err.message); });
  }
  function deleteDiscountCode(codeStr) {
    api.deleteDiscountCode(codeStr).then(refreshData).catch(function(err) { window.alert("Couldn't delete discount code: " + err.message); });
  }
  function updateDrills(next) {
    api.syncDrillLibrary(next, data.drillLibrary || DRILLS_DATA).then(refreshData).catch(function(err) { window.alert("Couldn't save drills: " + err.message); });
  }
  function handleCoachPhotoChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      api.updateCoachFields(currentCoach.id, { photo: ev.target.result }).then(refreshData).catch(function(err) { window.alert("Couldn't update photo: " + err.message); });
    };
    reader.readAsDataURL(file);
  }
  function removeCoachPhoto() {
    api.updateCoachFields(currentCoach.id, { photo: null }).then(refreshData).catch(function(err) { window.alert("Couldn't remove photo: " + err.message); });
  }
  function addAssistantCoach(name, email, password) {
    if (!isHeadCoach) return;
    api.addAssistantCoach(name, email, password).then(refreshData).catch(function(err) { window.alert("Couldn't add coach: " + err.message); });
  }
  function removeCoach(coachIdToRemove) {
    if (!isHeadCoach || coachIdToRemove === currentCoach.id) return;
    api.removeCoach(coachIdToRemove).then(refreshData).catch(function(err) { window.alert("Couldn't remove coach: " + err.message); });
  }
  function saveCoachSettings(next) {
    if (next.email) api.updateCoachFields(currentCoach.id, { email: next.email }).then(refreshData).catch(function(err) { window.alert("Couldn't update email: " + err.message); });
    if (next.password) api.changeMyPassword(next.password).catch(function(err) { window.alert("Couldn't update password: " + err.message); });
    setShowSettingsCard(false);
  }
  function saveCoachName(name) {
    if (!name) return;
    api.updateCoachFields(currentCoach.id, { name: name }).then(refreshData).catch(function(err) { window.alert("Couldn't update name: " + err.message); });
  }
  function saveCoachBio(bio) {
    api.updateCoachFields(currentCoach.id, { bio: bio }).then(refreshData).catch(function(err) { window.alert("Couldn't update bio: " + err.message); });
  }
  function deleteMyCoachAccount() {
    if (currentCoach.role === "head") return; // never let the head coach delete themselves out of the app
    api.removeCoach(currentCoach.id).then(function() { return api.signOut(); }).then(onLogout).catch(function(err) { window.alert("Couldn't delete account: " + err.message); });
    setShowSettingsCard(false);
  }
  function submitPizzaOrder(order) {
    api.submitPizzaOrder(order).then(refreshData).catch(function(err) { window.alert("Couldn't submit order: " + err.message); });
  }
  function markPizzaPaid(orderId) {
    api.markPizzaPaid(orderId).then(refreshData).catch(function(err) { window.alert("Couldn't update payment: " + err.message); });
  }
  function clearUnpaidPizzaOrders() {
    api.clearUnpaidPizzaOrders().then(refreshData).catch(function(err) { window.alert("Couldn't clear orders: " + err.message); });
  }
  function createSessionPack() {
    if (!isHeadCoach) return;
    const total = parseInt(packForm.sessionsTotal)||0;
    const perSession = parseFloat(packForm.pricePerSession)||0;
    if (total <= 0 || perSession <= 0) return;
    if (packForm.memberMode==="existing" && !packForm.memberId) return;
    if (packForm.memberMode==="new") {
      window.alert("Creating a brand-new swimmer here isn't supported anymore - swimmers need a real account first (they apply via the public site, or you create their login in Supabase). Pick them from the existing-member list once their account exists.");
      return;
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (parseInt(packForm.expiryWeeks)||12)*7);

    const code = (data.discountCodes||[]).find(function(c){ return c.active && c.code===packForm.discountCode; });
    const validCode = code ? code.code : null;

    api.createSessionPackForMember(packForm.memberId, {
      sessionsTotal: total, pricePerSession: perSession, discountCode: validCode,
      expiryDate: expiryDate.toISOString().slice(0,10), createdBy: currentCoach.id, paymentStatus: "confirmed",
    }).then(function(newPack) {
      refreshData();
      setPackForm({ memberMode:"existing", memberId:"", newName:"", newEmail:"", sessionsTotal:"10", pricePerSession:"", expiryWeeks:"12", discountCode:"" });
      setJustCreatedPackId(newPack.id);
      setTimeout(function(){ setJustCreatedPackId(null); }, 5000);
    }).catch(function(err) { window.alert("Couldn't create session pack: " + err.message); });
  }
  function openEditPack(pack) {
    setEditingPackId(pack.id);
    setEditPackForm({ sessionsTotal:String(pack.sessionsTotal), sessionsUsed:String(pack.sessionsUsed), pricePerSession:String(pack.pricePerSession), expiryDate:pack.expiryDate });
  }
  function closeEditPack() {
    setEditingPackId(null);
  }
  function saveEditPack() {
    if (!isHeadCoach || !editingPackId) return;
    const total = parseInt(editPackForm.sessionsTotal)||0;
    const used = parseInt(editPackForm.sessionsUsed)||0;
    const perSession = parseFloat(editPackForm.pricePerSession)||0;
    api.updateSessionPack(editingPackId, { sessionsTotal: total, sessionsUsed: Math.min(used,total), pricePerSession: perSession, expiryDate: editPackForm.expiryDate })
      .then(refreshData).catch(function(err) { window.alert("Couldn't save pack: " + err.message); });
    setEditingPackId(null);
  }
  function deleteSessionPack(packId) {
    if (!isHeadCoach) return;
    api.deleteSessionPack(packId).then(refreshData).catch(function(err) { window.alert("Couldn't delete pack: " + err.message); });
    setEditingPackId(null);
    setConfirmDeletePackId(null);
  }
  function savePrescribedDrills(drills) {
    const mid = drillAssignMember.id;
    api.savePrescribedDrillsForMember(mid, drills).then(refreshData).catch(function(err) { window.alert("Couldn't save drills: " + err.message); });
    setDrillAssignMember(null);
  }

  function togglePayment(memberId) {
    const member = data.members.find(function(m) { return m.id === memberId; });
    api.togglePaymentFlag(memberId, !(member && member.paid)).then(refreshData).catch(function(err) { window.alert("Couldn't update payment status: " + err.message); });
  }

  function confirmPackPayment(packId) {
    if (!isHeadCoach) return;
    api.confirmPackPayment(packId).then(refreshData).catch(function(err) { window.alert("Couldn't confirm payment: " + err.message); });
  }

  function confirmEnrolmentPayment(memberId, enrolmentSignedUpDate, enrolmentBlockId) {
    if (!isHeadCoach) return;
    const member = data.members.find(function(m) { return m.id === memberId; });
    const enrolment = member && (member.blockEnrolments||[]).find(function(e) { return e.signedUpDate === enrolmentSignedUpDate && e.blockId === enrolmentBlockId; });
    if (!enrolment) return;
    api.confirmEnrolmentPayment(enrolment.id).then(refreshData).catch(function(err) { window.alert("Couldn't confirm payment: " + err.message); });
  }

  function deleteSession(sid) {
    api.deleteSession(sid).then(refreshData).catch(function(err) { window.alert("Couldn't delete session: " + err.message); });
    setConfirmDeleteId(null);
    setJustDeletedIds(function(prev) { return prev.concat([sid]); });
  }

  function requestDeleteSession(sid) { setConfirmDeleteId(sid); }
  function cancelDeleteSession() { setConfirmDeleteId(null); }

  function toggleCancelled(sid) {
    const session = data.sessions.find(function(s) { return s.id === sid; });
    api.toggleSessionCancelled(sid, session && session.status).then(refreshData).catch(function(err) { window.alert("Couldn't update session: " + err.message); });
  }

  function setBlockFilter_(b) { setBlockFilter(b); }
  function openProfile(id) { setSelectedProfile(id); }
  function closeProfile() { setSelectedProfile(null); }
  function openAttendance(s) { setAttendanceSession(s); }
  function closeAttendance() { setAttendanceSession(null); }
  function openDrillAssign() { setDrillAssignMember(profileMember); }
  function closeDrillAssign() { setDrillAssignMember(null); }

  function handleBenchMember(e) { setBenchForm(function(f) { return Object.assign({}, f, { memberId:e.target.value }); }); }
  function handleBenchEvent(e) { setBenchForm(function(f) { return Object.assign({}, f, { event:e.target.value }); }); }
  function handleBenchTime(e) { setBenchForm(function(f) { return Object.assign({}, f, { time:e.target.value }); }); }
  function handleBenchDate(e) { setBenchForm(function(f) { return Object.assign({}, f, { date:e.target.value }); }); }
  function handleBenchStrokeCount1(e) { setBenchForm(function(f) { return Object.assign({}, f, { strokeCount1:e.target.value }); }); }
  function handleBenchStrokeCount2(e) { setBenchForm(function(f) { return Object.assign({}, f, { strokeCount2:e.target.value }); }); }
  function handleBenchSplit50(e) { setBenchForm(function(f) { return Object.assign({}, f, { split50:e.target.value }); }); }
  function handleBenchStartType(e) { setBenchForm(function(f) { return Object.assign({}, f, { startType:e.target.value }); }); }
  function handleBenchDetailLevel(e) { setBenchForm(function(f) { return Object.assign({}, f, { detailLevel:e.target.value }); }); }
  function handleBenchSplitAt(idx, e) {
    setBenchForm(function(f) {
      const next = f.splits.slice();
      next[idx] = e.target.value;
      return Object.assign({}, f, { splits: next });
    });
  }
  function handleBenchStrokeCountAt(idx, e) {
    setBenchForm(function(f) {
      const next = f.strokeCounts.slice();
      next[idx] = e.target.value;
      return Object.assign({}, f, { strokeCounts: next });
    });
  }
  function handlePairingSession(e) { setPairingSessionId(e.target.value); }
  function handleBankRef(e) { setBankRef(e.target.value); }
  function handleCalPrev() { setCalMonth(function(m) { return new Date(m.getFullYear(), m.getMonth()-1, 1); }); }
  function handleCalNext() { setCalMonth(function(m) { return new Date(m.getFullYear(), m.getMonth()+1, 1); }); }
  function setTabApps() { setTab("applications"); }
  function setTabProfiles() { setTab("profiles"); }
  function setTabCalendar() { setTab("calendar"); }
  function setTabBlocks() { setTab("blocks"); }
  function setTabBenchmarks() { setTab("benchmarks"); }
  function setTabReporting() { setTab("reporting"); }
  function setTabDrills() { setTab("drills"); }
  function setTabRecords() { setTab("records"); }
  function setTabNotifications() { setTab("notifications"); }
  function setTabMessages() {
    setTab("messages");
    const seenAt = new Date().toISOString();
    setData(function(d) { return Object.assign({}, d, { coaches: (d.coaches||[]).map(function(c){ return c.id===coachId ? Object.assign({}, c, { messagesSeenAt: seenAt }) : c; }) }); });
    api.markCoachMessagesSeen(coachId).catch(function(err) { console.error("Couldn't mark messages seen", err); });
  }
  function setTabPizza() { setTab("pizza"); }
  function setTabCake() { setTab("cake"); }
  function setTabShop() { setTab("shop"); }

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
  const blocksValueRef = useRef(null);

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
          sessionPacks={data.sessionPacks}
          onClose={closeAttendance}
          onToggle={toggleAttendance}
        />
      )}

      {editingPackId && (function() {
        const pack = (data.sessionPacks||[]).find(function(p){ return p.id===editingPackId; });
        if (!pack) return null;
        const m = data.members.find(function(x){ return x.id===pack.memberId; });
        return (
          <div onClick={closeEditPack} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px 16px" }}>
            <div onClick={function(e){ e.stopPropagation(); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, maxWidth:420, width:"100%" }}>
              <div style={{ padding:"18px 20px", borderBottom:"1px solid "+C.border, display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Session Pack</div>
                  <div style={{ fontWeight:900, fontSize:"1.1rem", color:C.white }}>{m ? m.name : "Unknown swimmer"}</div>
                </div>
                <button onClick={closeEditPack} style={{ background:"none", border:"none", color:C.grey, fontSize:20, cursor:"pointer", lineHeight:1, padding:0 }}>&times;</button>
              </div>
              <div style={{ padding:"20px" }}>
                {confirmDeletePackId === editingPackId ? (
                  <div style={{ background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"14px" }}>
                    <div style={{ fontSize:13, color:"#ff6b6b", marginBottom:10, fontWeight:700 }}>Delete this session pack? This can't be undone.</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={function(){ deleteSessionPack(editingPackId); }} style={{ background:"#7f1d1d", border:"none", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px" }}>Yes, delete</button>
                      <button onClick={function(){ setConfirmDeletePackId(null); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px" }}>No, keep it</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                      <div>
                        <label style={S.label}>Total sessions</label>
                        <input type="number" value={editPackForm.sessionsTotal} onChange={function(e){ setEditPackForm(function(f){ return Object.assign({}, f, { sessionsTotal:e.target.value }); }); }} style={S.input}/>
                      </div>
                      <div>
                        <label style={S.label}>Sessions used</label>
                        <input type="number" value={editPackForm.sessionsUsed} onChange={function(e){ setEditPackForm(function(f){ return Object.assign({}, f, { sessionsUsed:e.target.value }); }); }} style={S.input}/>
                      </div>
                    </div>
                    <div style={{ marginBottom:10 }}>
                      <label style={S.label}>Price per session</label>
                      <input type="number" value={editPackForm.pricePerSession} onChange={function(e){ setEditPackForm(function(f){ return Object.assign({}, f, { pricePerSession:e.target.value }); }); }} style={S.input}/>
                    </div>
                    <div style={{ marginBottom:16 }}>
                      <label style={S.label}>Expiry date</label>
                      <input type="date" value={editPackForm.expiryDate} onChange={function(e){ setEditPackForm(function(f){ return Object.assign({}, f, { expiryDate:e.target.value }); }); }} style={S.input}/>
                    </div>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      <button onClick={saveEditPack} style={S.btnRed}>Save changes</button>
                      <button onClick={function(){ setConfirmDeletePackId(editingPackId); }} style={{ background:"none", border:"1px solid #7f1d1d", color:"#ff6b6b", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"9px 16px" }}>Delete pack</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

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
              <div onClick={function(){
                const app = profileMember.applicationId ? data.applications.find(function(a){ return a.id === profileMember.applicationId; }) : data.applications.find(function(a){ return a.email === profileMember.email; });
                if (app) { setSelectedApplication(app); setSelectedProfile(null); }
              }} style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer" }}>
                <Avatar name={profileMember.name} size={48} photo={profileMember.photo}/>
                <div>
                  <div style={{ fontWeight:700, fontSize:18 }}>{displayName(profileMember)}</div>
                  <div style={{ fontSize:12, color:C.grey, marginTop:2 }}>{profileMember.block} - {profileMember.specialty} - Age {profileMember.age || "-"}</div>
                  {(profileMember.applicationId ? data.applications.find(function(a){ return a.id === profileMember.applicationId; }) : data.applications.find(function(a){ return a.email === profileMember.email; })) && (
                    <div style={{ fontSize:10, color:"#3b82f6", marginTop:3, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase" }}>Tap to view application {"\u2192"}</div>
                  )}
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
              <div onClick={function(){
                if (blocksValueRef.current) { blocksValueRef.current.scrollIntoView({ behavior:"smooth", block:"start" }); }
                setBlocksValueFlash(true);
                setTimeout(function(){ setBlocksValueFlash(false); }, 1500);
              }} style={{ background:C.panel, padding:"10px 12px", cursor:"pointer" }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Payment</div>
                <div style={{ fontWeight:700, fontSize:14, color:profileMember.paid ? C.green : C.amber }}>{profileMember.paid ? "Paid" : "Pending"}</div>
                {(function() {
                  const today = new Date();
                  const enrolments = profileMember.blockEnrolments||[];
                  const current = enrolments.find(function(e) {
                    if (e.type==="year") return true;
                    const b = (data.blocks||BLOCKS).find(function(x) { return x.id===e.blockId; });
                    return b && new Date(b.startDate) <= today && today <= new Date(b.endDate);
                  });
                  if (!current) return <div style={{ fontSize:10, color:C.greyDark, marginTop:2 }}>No current block</div>;
                  return <div style={{ fontSize:10, color:C.greyLight, marginTop:2 }}>{current.blockLabel}</div>;
                })()}
                <div style={{ fontSize:9, color:"#3b82f6", marginTop:4, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase" }}>See details {"\u2193"}</div>
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
            {(function() {
              const enrolments = (profileMember.blockEnrolments||[]).slice().sort(function(a,b) {
                const ad = a.signedUpDate || "0000-00-00";
                const bd = b.signedUpDate || "0000-00-00";
                return bd.localeCompare(ad);
              });
              const totalValue = enrolments.reduce(function(sum, e) { return sum + (e.pricePaid||0); }, 0);
              if (enrolments.length === 0) {
                return (
                  <div ref={blocksValueRef} style={{ padding:"14px 18px", borderBottom:"1px solid "+C.border, background:blocksValueFlash?"rgba(59,130,246,0.12)":"transparent", transition:"background 0.3s" }}>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:6 }}>Blocks &amp; Value</div>
                    <div style={{ fontSize:12, color:C.greyDark }}>Not signed up to any block or session pack yet.</div>
                  </div>
                );
              }
              return (
                <div ref={blocksValueRef} style={{ padding:"14px 18px", borderBottom:"1px solid "+C.border, background:blocksValueFlash?"rgba(59,130,246,0.12)":"transparent", transition:"background 0.3s" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey }}>Blocks &amp; Value</div>
                    <span style={{ fontSize:13, fontWeight:900, color:C.green }}>{"\u00A3"}{totalValue.toFixed(2)}</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                    {enrolments.map(function(e, i) {
                      const b = (data.blocks||BLOCKS).find(function(x) { return x.id===e.blockId; });
                      const isPast = b && new Date(b.endDate) < new Date();
                      const pending = e.paymentStatus === "pending";
                      return (
                        <div key={i} style={{ background:C.bg, borderRadius:2, padding:"8px 12px", opacity:isPast?0.7:1 }}>
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                            <div>
                              <span style={{ fontSize:12, color:C.white, fontWeight:700 }}>{e.blockLabel}</span>
                              {e.type==="year" && <span style={{ fontSize:9, color:C.amber, marginLeft:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Year plan</span>}
                              {isPast && <span style={{ fontSize:9, color:C.greyDark, marginLeft:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Past</span>}
                              {pending && <span style={{ fontSize:9, color:"#ff6b6b", marginLeft:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Awaiting payment</span>}
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                              <span style={{ fontSize:12, color:C.greyLight, fontFamily:"monospace" }}>{"\u00A3"}{(e.pricePaid||0).toFixed(2)}</span>
                            </div>
                          </div>
                          {pending && isHeadCoach && (
                            <button onClick={function(){ confirmEnrolmentPayment(profileMember.id, e.signedUpDate, e.blockId); }} style={{ display:"block", width:"100%", background:"transparent", border:"1px solid #166534", color:C.green, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"6px 10px", borderRadius:2, cursor:"pointer", marginTop:8 }}>{"\u2713"} Confirm payment received</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            {(function() {
              const memberPacks = (data.sessionPacks||[]).filter(function(p){ return p.memberId === profileMember.id; }).slice().sort(function(a,b){ return b.purchaseDate.localeCompare(a.purchaseDate); });
              if (memberPacks.length === 0) return null;
              return (
                <div style={{ padding:"14px 18px", borderBottom:"1px solid "+C.border }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#f59e0b", marginBottom:10 }}>Session Packs</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                    {memberPacks.map(function(p, i) {
                      const daysLeft = Math.ceil((new Date(p.expiryDate) - new Date()) / (1000*60*60*24));
                      const sessionsLeft = p.sessionsTotal - p.sessionsUsed;
                      const expired = daysLeft < 0 || sessionsLeft <= 0;
                      const pending = p.paymentStatus === "pending";
                      return (
                        <div key={p.id} style={{ background:"#1a1205", border:"1px solid "+(pending?"#7f1d1d":"#78350f"), borderRadius:2, padding:"10px 12px", opacity:expired?0.6:1 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                            <span style={{ fontSize:12, color:C.white, fontWeight:700 }}>{p.allowedSessionIds ? p.sessionsTotal+" selected Fridays" : p.sessionsTotal+" session pack"}</span>
                            {pending ? (
                              <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#ff6b6b", border:"1px solid #7f1d1d", padding:"2px 7px", borderRadius:1 }}>Awaiting payment</span>
                            ) : expired ? (
                              <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.greyDark }}>Expired/used up</span>
                            ) : (
                              <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.green }}>Paid</span>
                            )}
                          </div>
                          <div style={{ fontSize:11, color:C.grey }}>{sessionsLeft} of {p.sessionsTotal} sessions left - {"\u00A3"}{p.pricePerSession.toFixed(2)}/session{p.discountCode?" - code "+p.discountCode:""}</div>
                          {p.allowedSessionIds && (
                            <div style={{ fontSize:11, color:C.grey, marginTop:2 }}>{p.allowedSessionIds.map(function(sid){ const s=(data.sessions||[]).find(function(x){return x.id===sid;}); return s ? s.date : null; }).filter(Boolean).join(", ")}</div>
                          )}
                          <div style={{ fontSize:11, color:daysLeft<=7&&daysLeft>=0?"#ff6b6b":C.grey, marginTop:2 }}>{daysLeft >= 0 ? daysLeft+" day"+(daysLeft!==1?"s":"")+" left" : "Expired "+p.expiryDate}</div>
                          {pending && isHeadCoach && (
                            <button onClick={function(){ confirmPackPayment(p.id); }} style={{ display:"block", width:"100%", background:"transparent", border:"1px solid #166534", color:C.green, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"6px 10px", borderRadius:2, cursor:"pointer", marginTop:8 }}>{"\u2713"} Confirm payment received</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            <div style={{ padding:"14px 18px", borderTop:"1px solid "+C.border }}>
              {(function() {
                const app = profileMember.applicationId ? data.applications.find(function(a){ return a.id === profileMember.applicationId; }) : data.applications.find(function(a){ return a.email === profileMember.email; });
                return app ? (
                  <button onClick={function(){ setSelectedApplication(app); setSelectedProfile(null); }} style={{ display:"block", width:"100%", background:"transparent", border:"1px solid #78350f", color:C.amber, padding:"10px 12px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, marginBottom:8 }}>View original application</button>
                ) : null;
              })()}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                <button onClick={function() { setViewingAsId(profileMember.id); setSelectedProfile(null); }} style={{ background:"transparent", border:"1px solid #1e3a5f", color:"#3b82f6", padding:"10px 12px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>View as athlete</button>
                <button onClick={openDrillAssign} style={{ background:"transparent", border:"1px solid #1e3a5f", color:"#3b82f6", padding:"10px 12px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>Assign drills</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                <button onClick={function() { togglePayment(profileMember.id); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"10px 12px", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>Toggle payment</button>
                <button onClick={closeProfile} style={S.btnRed}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav style={{ background:C.panel, borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <Logo height={44}/>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.amber, border:"1px solid "+C.amber, padding:"2px 8px", borderRadius:1 }}>Coach</span>
          </div>
          <button onClick={handleLogout} style={{ background:"none", border:"none", color:C.grey, fontSize:12, cursor:"pointer", textTransform:"uppercase", letterSpacing:"0.08em" }}>Sign Out</button>
        </div>
        <div style={{ position:"relative" }}>
          <div ref={navBarRef} onScroll={function(e){ checkNavScroll(e.target); }} style={{ display:"flex", gap:0, marginTop:8, overflowX:"auto" }}>
          <button onClick={setTabApps} style={{ background:"none", border:"none", borderBottom:tab==="applications" ? "2px solid "+C.red : "2px solid transparent", color:tab==="applications" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="applications"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>
            Applications{pending > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{pending}</span>}
          </button>
          <button onClick={setTabNotifications} style={{ background:"none", border:"none", borderBottom:tab==="notifications" ? "2px solid "+C.red : "2px solid transparent", color:tab==="notifications" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="notifications"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Notifications{unreadCount > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{unreadCount}</span>}</button>
          <button onClick={setTabProfiles} style={{ background:"none", border:"none", borderBottom:tab==="profiles" ? "2px solid "+C.red : "2px solid transparent", color:tab==="profiles" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="profiles"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Profiles</button>
          <button onClick={setTabCalendar} style={{ background:"none", border:"none", borderBottom:tab==="calendar" ? "2px solid "+C.red : "2px solid transparent", color:tab==="calendar" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="calendar"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Calendar</button>
          <button onClick={setTabBlocks} style={{ background:"none", border:"none", borderBottom:tab==="blocks" ? "2px solid "+C.red : "2px solid transparent", color:tab==="blocks" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="blocks"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Blocks</button>
          <button onClick={setTabBenchmarks} style={{ background:"none", border:"none", borderBottom:tab==="benchmarks" ? "2px solid "+C.red : "2px solid transparent", color:tab==="benchmarks" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="benchmarks"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Benchmarks</button>
          <button onClick={setTabReporting} style={{ background:"none", border:"none", borderBottom:tab==="reporting" ? "2px solid "+C.red : "2px solid transparent", color:tab==="reporting" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="reporting"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Reporting</button>
          <button onClick={setTabDrills} style={{ background:"none", border:"none", borderBottom:tab==="drills" ? "2px solid "+C.red : "2px solid transparent", color:tab==="drills" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="drills"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Drills</button>
          <button onClick={setTabRecords} style={{ background:"none", border:"none", borderBottom:tab==="records" ? "2px solid "+C.amber : "2px solid transparent", color:tab==="records" ? C.amber : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="records"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Records</button>
          <button onClick={setTabMessages} style={{ background:"none", border:"none", borderBottom:tab==="messages" ? "2px solid "+C.red : "2px solid transparent", color:tab==="messages" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="messages"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Messages{unreadMsgCount > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{unreadMsgCount}</span>}</button>
          <button onClick={setTabCake} style={{ background:"none", border:"none", borderBottom:tab==="cake" ? "2px solid "+C.red : "2px solid transparent", color:tab==="cake" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="cake"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Cake Your Marks</button>
          <button onClick={setTabShop} style={{ background:"none", border:"none", borderBottom:tab==="shop" ? "2px solid "+C.red : "2px solid transparent", color:tab==="shop" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="shop"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Shop</button>
          <button onClick={setTabPizza} style={{ background:"none", border:"none", borderBottom:tab==="pizza" ? "2px solid "+C.red : "2px solid transparent", color:tab==="pizza" ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab==="pizza"?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>Pizza Night</button>
          </div>
          {navScrollState.right && (
            <div onClick={function(){ if (navBarRef.current) { navBarRef.current.scrollTo({ left: navBarRef.current.scrollWidth, behavior:"smooth" }); } }} style={{ position:"absolute", top:0, right:0, bottom:0, width:44, background:"linear-gradient(to right, transparent, "+C.panel+" 65%)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:6 }}>
              <span style={{ color:C.grey, fontSize:16, fontWeight:700 }}>{"\u203A"}</span>
            </div>
          )}
          {navScrollState.left && (
            <div onClick={function(){ if (navBarRef.current) { navBarRef.current.scrollTo({ left:0, behavior:"smooth" }); } }} style={{ position:"absolute", top:0, left:0, bottom:0, width:44, background:"linear-gradient(to left, transparent, "+C.panel+" 65%)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"flex-start", paddingLeft:6 }}>
              <span style={{ color:C.grey, fontSize:16, fontWeight:700 }}>{"\u2039"}</span>
            </div>
          )}
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

                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>6x100m Freestyle benchmark</div>
                <div style={{ marginBottom:20 }}>
                  {selectedApplication.benchmarkResponse==="completed" && (
                    <div style={{ fontSize:13, color:C.white }}>Completed - average time: <span style={{ fontFamily:"monospace", color:C.green }}>{selectedApplication.benchmarkAvg||"-"}</span></div>
                  )}
                  {selectedApplication.benchmarkResponse==="confident" && (
                    <div style={{ fontSize:13, color:C.amber }}>Didn't test - confident they can complete it easily.</div>
                  )}
                  {selectedApplication.benchmarkResponse==="notcompleted" && (
                    <div>
                      <div style={{ fontSize:13, color:"#ff6b6b", marginBottom:4 }}>Attempted but did not complete the set.</div>
                      {selectedApplication.benchmarkStoppedAt && <div style={{ fontSize:12, color:C.grey }}>Note: {selectedApplication.benchmarkStoppedAt}</div>}
                    </div>
                  )}
                  {!selectedApplication.benchmarkResponse && (
                    <div style={{ fontSize:13, color:C.greyDark }}>No response given.</div>
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
            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px", marginBottom:2, display:"flex", alignItems:"center", gap:14 }}>
              <label style={{ position:"relative", cursor:"pointer", display:"inline-block" }}>
                <input type="file" accept="image/*" onChange={handleCoachPhotoChange} style={{ display:"none" }}/>
                <Avatar name={currentCoach.name} size={48} photo={currentCoach.photo}/>
                <div style={{ position:"absolute", bottom:-2, right:-2, width:18, height:18, borderRadius:"50%", background:C.red, border:"2px solid "+C.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:9, color:"#fff" }}>+</span>
                </div>
              </label>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:C.white }}>Coach {currentCoach.name}</div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:currentCoach.role==="head"?C.amber:"#3b82f6", marginTop:2 }}>{currentCoach.subtitle}</div>
                <div style={{ fontSize:12, color:C.grey, marginTop:4 }}>Shown to swimmers in Messages and around the app.</div>
                {currentCoach.photo && <button onClick={removeCoachPhoto} style={{ background:"none", border:"none", color:C.grey, fontSize:11, textDecoration:"underline", cursor:"pointer", padding:0, marginTop:4 }}>Remove photo</button>}
              </div>
            </div>

            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px", marginBottom:2 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey }}>About me</div>
                {!editingBio && <button onClick={function(){ setBioDraft(currentCoach.bio||""); setEditingBio(true); }} style={{ background:"none", border:"none", color:"#3b82f6", fontSize:11, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", cursor:"pointer" }}>Edit</button>}
              </div>
              {editingBio ? (
                <div>
                  <textarea value={bioDraft} onChange={function(e){ setBioDraft(e.target.value); }} rows={3} placeholder="A little about your coaching background, experience, approach..." style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", marginBottom:10 }}/>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={function(){ saveCoachBio(bioDraft.trim()); setEditingBio(false); }} style={S.btnRed}>Save</button>
                    <button onClick={function(){ setEditingBio(false); }} style={S.btnGhost}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize:13, color:currentCoach.bio?C.greyLight:C.greyDark, lineHeight:1.6, fontStyle:currentCoach.bio?"normal":"italic" }}>{currentCoach.bio || "No bio added yet."}</div>
              )}
            </div>

            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, marginBottom:20, overflow:"hidden" }}>
              <div onClick={function(){ setShowSettingsCard(!showSettingsCard); }} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ fontWeight:700, fontSize:14, color:C.white }}>Account settings</div>
                <span style={{ fontSize:13, color:C.grey }}>{showSettingsCard?"-":"+"}</span>
              </div>
              {showSettingsCard && (
                <div onClick={function(e){ e.stopPropagation(); }} style={{ borderTop:"1px solid "+C.border }}>
                  <SettingsModal
                    inline={true}
                    currentEmail={currentCoach.email}
                    currentPassword={currentCoach.password}
                    notifPrefs={currentCoach.notifPrefs}
                    isCoachSettings={true}
                    currentName={currentCoach.name}
                    onSaveName={saveCoachName}
                    onSave={saveCoachSettings}
                    onDeleteAccount={deleteMyCoachAccount}
                    canDeleteAccount={currentCoach.role !== "head"}
                    onClose={function(){ setShowSettingsCard(false); }}
                    exportData={Object.assign({}, currentCoach, { password:"[hidden]" })}
                  />
                </div>
              )}
            </div>

            {isHeadCoach && (
              <div style={{ background:C.panel, border:"1px solid #78350f", borderRadius:2, marginBottom:20, overflow:"hidden" }}>
                <div onClick={function(){ setShowAddCoach(!showAddCoach); }} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>Manage Coaches</div>
                    <div style={{ fontSize:12, color:C.grey }}>{(data.coaches||COACHES_DATA).length} coach{(data.coaches||COACHES_DATA).length!==1?"es":""} - add or remove assistant coaches.</div>
                  </div>
                  <span style={{ fontSize:13, color:C.grey, flexShrink:0 }}>{showAddCoach?"-":"+"}</span>
                </div>
                {showAddCoach && (
                  <div onClick={function(e){ e.stopPropagation(); }} style={{ borderTop:"1px solid #78350f", padding:"16px" }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:16 }}>
                      {(data.coaches||COACHES_DATA).map(function(c) {
                        return (
                          <div key={c.id} style={{ background:C.bg, borderRadius:2, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
                            <Avatar name={c.name} size={32} photo={c.photo}/>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontWeight:700, fontSize:13, color:C.white }}>Coach {c.name}</div>
                              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:c.role==="head"?C.amber:"#3b82f6" }}>{c.subtitle}</div>
                            </div>
                            {c.id !== currentCoach.id && c.role !== "head" && (
                              <button onClick={function(){ removeCoach(c.id); }} style={{ background:"none", border:"none", color:"#ff6b6b", fontSize:11, cursor:"pointer", flexShrink:0 }}>Remove</button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:10 }}>Add assistant coach</div>
                    <div style={{ marginBottom:10 }}>
                      <label style={S.label}>Name</label>
                      <input value={newCoachForm.name} onChange={function(e){ setNewCoachForm(function(f){ return Object.assign({}, f, { name:e.target.value }); }); }} placeholder="e.g. Priya" style={S.input}/>
                    </div>
                    <div style={{ marginBottom:10 }}>
                      <label style={S.label}>Email</label>
                      <input value={newCoachForm.email} onChange={function(e){ setNewCoachForm(function(f){ return Object.assign({}, f, { email:e.target.value }); }); }} placeholder="coach.priya@example.com" style={S.input}/>
                    </div>
                    <div style={{ marginBottom:14 }}>
                      <label style={S.label}>Password</label>
                      <input type="password" autoComplete="new-password" value={newCoachForm.password} onChange={function(e){ setNewCoachForm(function(f){ return Object.assign({}, f, { password:e.target.value }); }); }} placeholder="Set a password for them" style={S.input}/>
                    </div>
                    <button onClick={function(){
                      if (!newCoachForm.name.trim() || !newCoachForm.email.trim() || !newCoachForm.password.trim()) return;
                      addAssistantCoach(newCoachForm.name.trim(), newCoachForm.email.trim(), newCoachForm.password.trim());
                      setNewCoachForm({ name:"", email:"", password:"" });
                    }} style={S.btnRed}>Add assistant coach</button>
                  </div>
                )}
              </div>
            )}
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
                  <Avatar name={m.name} size={44} photo={m.photo}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2, flexWrap:"wrap" }}>
                      <span style={{ fontWeight:700, fontSize:15 }}>{displayName(m)}</span>
                      {!m.paid && <Badge color={C.amber} label="Awaiting payment"/>}
                      {m.memberStatus==="incomplete" && <Badge color="#3b82f6" label="Incomplete profile"/>}
                    </div>
                    {m.memberStatus==="incomplete" ? (
                      <div style={{ fontSize:12, color:C.grey }}>Login: <span style={{ color:C.greyLight, fontFamily:"monospace" }}>{m.email}</span> / <span style={{ color:C.greyLight, fontFamily:"monospace" }}>{m.password}</span></div>
                    ) : (
                      <div style={{ fontSize:12, color:C.grey }}>{m.block} - {m.specialty || m.level} - Age {m.age || "-"}</div>
                    )}
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
                <button onClick={handleCalPrev} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 12px" }}>Prev</button>
                <button onClick={handleCalNext} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 12px" }}>Next</button>
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
                      const cancelled = s.status==="cancelled";
                      return (
                        <div key={s.id} onClick={function() { if(!cancelled) openAttendance(s); }}
                          style={{ fontSize:9, fontWeight:700, color:cancelled?"#888":C.white, background:cancelled?"#3a1a1a":(BLOCK_COLORS[s.block]||C.red), padding:"3px 5px", borderRadius:1, marginBottom:2, lineHeight:1.3, cursor:cancelled?"default":"pointer", overflow:"hidden", textDecoration:cancelled?"line-through":"none" }}>
                          <div style={{ whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden" }}>{s.title}{cancelled?" (Cancelled)":""}</div>
                          {!cancelled && ac > 0 && <div style={{ color:"rgba(255,255,255,0.8)", fontWeight:400 }}>OK {ac}</div>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop:8 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Sessions - most recent first</div>
              {data.sessions.slice().sort(function(a,b) { return b.date.localeCompare(a.date); }).map(function(s) {
                const ac = Object.values(s.attendance||{}).filter(Boolean).length;
                const el = data.members.filter(function(m) { return m.block===s.block; }).length;
                const cancelled = s.status==="cancelled";
                return (
                  <div key={s.id} style={{ background:C.panel, border:"1px solid "+(cancelled?"#7f1d1d":C.border), borderRadius:2, padding:"16px", marginBottom:2, opacity:cancelled?0.7:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
                      <div style={{ background:cancelled?"#3a1a1a":(BLOCK_COLORS[s.block]||C.red), color:cancelled?"#ff6b6b":C.white, fontWeight:900, fontSize:13, padding:"6px 10px", borderRadius:2, textAlign:"center", minWidth:40, flexShrink:0 }}>
                        {new Date(s.date).getDate()}<br/>
                        <span style={{ fontSize:9, fontWeight:400 }}>{new Date(s.date).toLocaleDateString("en-GB",{month:"short"})}</span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }} onClick={function() { if(!cancelled) openAttendance(s); }}>
                        <div style={{ fontWeight:700, fontSize:14, cursor:cancelled?"default":"pointer", textDecoration:cancelled?"line-through":"none", color:cancelled?C.greyDark:C.white }}>{s.title}</div>
                        <div style={{ fontSize:12, color:C.grey }}>{s.block}{cancelled && <span style={{ color:"#ff6b6b", fontWeight:700 }}> - Cancelled</span>}</div>
                      </div>
                      {!cancelled && (
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontWeight:700, fontSize:16, color:ac>0?C.green:C.greyDark }}>{ac}/{el}</div>
                          <div style={{ fontSize:10, color:C.grey, textTransform:"uppercase", letterSpacing:"0.08em" }}>present</div>
                        </div>
                      )}
                    </div>
                    {confirmDeleteId === s.id ? (
                      <div style={{ background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"12px 14px" }}>
                        <div style={{ fontSize:12, color:"#ff6b6b", marginBottom:8, fontWeight:700 }}>Delete this session? This can't be undone.</div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          <button onClick={function() { deleteSession(s.id); }} style={{ background:"#7f1d1d", border:"none", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>Yes, delete</button>
                          <button onClick={cancelDeleteSession} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>No, keep it</button>
                        </div>
                      </div>
                    ) : confirmCancelId === s.id ? (
                      <div style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"12px 14px" }}>
                        <div style={{ fontSize:12, color:C.amber, marginBottom:8, fontWeight:700 }}>Cancel this session? Swimmers will see it marked as not running.</div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          <button onClick={function() { toggleCancelled(s.id); setConfirmCancelId(null); }} style={{ background:"#78350f", border:"none", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>Yes, cancel it</button>
                          <button onClick={function() { setConfirmCancelId(null); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>No, keep it on</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
                        {!cancelled && <button onClick={function() { openAttendance(s); }} style={{ background:"transparent", border:"1px solid #166534", color:C.green, fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 12px" }}>Register</button>}
                        {isHeadCoach && (
                          <button onClick={function() { if (cancelled) { toggleCancelled(s.id); } else { setConfirmCancelId(s.id); } }} style={{ background:"transparent", border:"1px solid "+(cancelled?"#166534":"#78350f"), color:cancelled?C.green:C.amber, fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"6px 12px" }}>{cancelled ? "Restore" : "Cancel"}</button>
                        )}
                        {isHeadCoach && (
                          <button onClick={function() { requestDeleteSession(s.id); }} style={{ background:"none", border:"none", color:"#ff6b6b", fontSize:11, cursor:"pointer", marginLeft:"auto" }}>Delete</button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {justDeletedIds.length > 0 && (
                <div style={{ background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"10px 14px", marginTop:8, fontSize:12, color:C.green, fontWeight:700 }}>
                  {justDeletedIds.length} session{justDeletedIds.length!==1?"s":""} deleted. This message will clear when you refresh the page.
                </div>
              )}
            </div>
          </div>
        )}


        {tab === "blocks" && (
          <div>
            <span style={S.eyebrow}>Membership</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Blocks &amp; Pricing</h2>
            <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Set prices and open blocks for new sign-ups. Blocks run quarterly - Jan-Mar, Apr-Jun, Jul-Sep, Oct-Dec.</p>

            {(function() {
              const pendingPacks = (data.sessionPacks||[]).filter(function(p){ return p.paymentStatus === "pending"; });
              const pendingEnrolments = [];
              data.members.forEach(function(m) {
                (m.blockEnrolments||[]).forEach(function(e) {
                  if (e.paymentStatus === "pending") pendingEnrolments.push({ member:m, enrolment:e });
                });
              });
              const total = pendingPacks.length + pendingEnrolments.length;
              if (total === 0) return null;
              return (
                <div style={{ background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"16px", marginBottom:24 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#ff6b6b", marginBottom:12 }}>Payments Awaiting Confirmation ({total})</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {pendingPacks.map(function(p) {
                      const m = data.members.find(function(x){ return x.id === p.memberId; });
                      return (
                        <div key={p.id} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexWrap:"wrap" }}>
                          <div>
                            <span style={{ fontSize:13, color:C.white, fontWeight:700 }}>{m ? (m.nickname||m.name) : "Unknown"}</span>
                            <span style={{ fontSize:12, color:C.grey, marginLeft:8 }}>{p.allowedSessionIds ? p.sessionsTotal+" selected Fridays" : p.sessionsTotal+" session pack"} - {"\u00A3"}{(p.pricePaid!==undefined ? p.pricePaid : p.pricePerSession*p.sessionsTotal).toFixed(2)}</span>
                          </div>
                          {isHeadCoach && (
                            <button onClick={function(){ confirmPackPayment(p.id); }} style={{ background:"transparent", border:"1px solid #166534", color:C.green, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"6px 10px", borderRadius:2, cursor:"pointer", flexShrink:0 }}>{"\u2713"} Confirm received</button>
                          )}
                        </div>
                      );
                    })}
                    {pendingEnrolments.map(function(pe, i) {
                      return (
                        <div key={"enr"+i} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexWrap:"wrap" }}>
                          <div>
                            <span style={{ fontSize:13, color:C.white, fontWeight:700 }}>{pe.member.nickname||pe.member.name}</span>
                            <span style={{ fontSize:12, color:C.grey, marginLeft:8 }}>{pe.enrolment.blockLabel} - {"\u00A3"}{(pe.enrolment.pricePaid||0).toFixed(2)}</span>
                          </div>
                          {isHeadCoach && (
                            <button onClick={function(){ confirmEnrolmentPayment(pe.member.id, pe.enrolment.signedUpDate, pe.enrolment.blockId); }} style={{ background:"transparent", border:"1px solid #166534", color:C.green, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"6px 10px", borderRadius:2, cursor:"pointer", flexShrink:0 }}>{"\u2713"} Confirm received</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Blocks</div>
            <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:24 }}>
              {(data.blocks||BLOCKS).map(function(b) {
                const today = new Date();
                const isPast = new Date(b.endDate) < today;
                const isCurrent = new Date(b.startDate) <= today && today <= new Date(b.endDate);
                return (
                  <div key={b.id} style={{ background:C.panel, border:"1px solid "+(isCurrent?C.red:C.border), borderRadius:2, padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginBottom:10 }}>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontWeight:700, fontSize:14, color:C.white }}>{b.label}</span>
                          {isCurrent && <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.red, border:"1px solid "+C.red, padding:"2px 7px", borderRadius:1 }}>Current</span>}
                          {isPast && <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.greyDark, border:"1px solid "+C.greyDark, padding:"2px 7px", borderRadius:1 }}>Past</span>}
                        </div>
                        <div style={{ fontSize:11, color:C.grey, marginTop:2 }}>{b.startDate} to {b.endDate}</div>
                      </div>
                      {!isPast && (
                        isHeadCoach ? (
                          <button onClick={function(){ toggleBlockOpen(b.id); }} style={{ background:"transparent", border:"1px solid "+(b.isOpen?"#166534":"#78350f"), color:b.isOpen?C.green:C.amber, fontWeight:700, fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", padding:"5px 10px", borderRadius:2, cursor:"pointer", flexShrink:0 }}>{b.isOpen?"Open":"Closed"}</button>
                        ) : (
                          <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:b.isOpen?C.green:C.amber, flexShrink:0 }}>{b.isOpen?"Open":"Closed"}</span>
                        )
                      )}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <span style={{ fontSize:12, color:C.grey }}>Price:</span>
                      <span style={{ fontSize:14, color:C.amber, fontWeight:700 }}>{"\u00A3"}</span>
                      {isHeadCoach ? (
                        <input type="number" defaultValue={b.priceFull} key={b.id+"-"+b.priceFull} onBlur={function(e){ const next = parseFloat(e.target.value)||0; if (next !== b.priceFull) updateBlockPrice(b.id, next); }} style={{ width:80, background:"#161616", border:"1px solid #333", color:"#fff", padding:"6px 10px", fontSize:13, borderRadius:2, outline:"none" }}/>
                      ) : (
                        <span style={{ fontSize:14, color:C.white, fontWeight:700 }}>{b.priceFull}</span>
                      )}
                      <span style={{ fontSize:11, color:C.greyDark }}>per swimmer, full block</span>
                    </div>
                    {(function() {
                      const signedUp = data.members.filter(function(m) {
                        return (m.blockEnrolments||[]).some(function(e) { return e.blockId===b.id || e.type==="year"; }) && m.memberStatus !== "pending" && m.memberStatus !== "rejected";
                      });
                      const pendingApps = data.applications.filter(function(a) {
                        return a.status==="pending" && a.blockEnrolment && (a.blockEnrolment.blockId===b.id || a.blockEnrolment.type==="year");
                      });
                      if (signedUp.length===0 && pendingApps.length===0) return null;
                      const isExpanded = expandedBlockRoster === b.id;
                      return (
                        <div style={{ borderTop:"1px solid "+C.border, paddingTop:10 }}>
                          <div onClick={function(){ setExpandedBlockRoster(isExpanded ? null : b.id); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
                            <div style={{ display:"flex", gap:14 }}>
                              {signedUp.length > 0 && <span style={{ fontSize:12, fontWeight:700, color:C.green }}>{signedUp.length} signed up</span>}
                              {pendingApps.length > 0 && <span style={{ fontSize:12, fontWeight:700, color:C.amber }}>{pendingApps.length} pending</span>}
                            </div>
                            <span style={{ fontSize:13, color:C.grey }}>{isExpanded?"-":"+"}</span>
                          </div>
                          {isExpanded && (
                            <div style={{ marginTop:12 }}>
                              {signedUp.length > 0 && (
                                <div style={{ marginBottom:pendingApps.length>0?14:0 }}>
                                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.green, marginBottom:6 }}>Signed up</div>
                                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                                    {signedUp.map(function(m) {
                                      return (
                                        <div key={m.id} onClick={function(){ setSelectedProfile(m.id); }} style={{ display:"flex", alignItems:"center", gap:10, background:C.bg, padding:"10px 12px", borderRadius:2, cursor:"pointer", border:"1px solid "+C.border }}>
                                          <Avatar name={m.name} size={28} photo={m.photo}/>
                                          <span style={{ fontSize:14, color:C.white, fontWeight:700, flex:1 }}>{displayName(m)}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {pendingApps.length > 0 && (
                                <div>
                                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.amber, marginBottom:6 }}>Applied - pending</div>
                                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                                    {pendingApps.map(function(a) {
                                      return (
                                        <div key={a.id} onClick={function(){ setSelectedApplication(a); }} style={{ display:"flex", alignItems:"center", gap:10, background:"#1a1205", padding:"10px 12px", borderRadius:2, cursor:"pointer", border:"1px solid #78350f" }}>
                                          <Avatar name={a.name} size={28}/>
                                          <span style={{ fontSize:14, color:C.amber, fontWeight:700 }}>{firstNameOf(a.name)}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                    {isPast && (
                      <div style={{ borderTop:"1px solid "+C.border, paddingTop:10, marginTop:10 }}>
                        <button onClick={function(){ setExpandedBlockReport(expandedBlockReport===b.id ? null : b.id); }} style={{ background:"transparent", border:"1px solid #3b82f6", color:"#3b82f6", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", padding:"7px 14px", borderRadius:2, cursor:"pointer" }}>{expandedBlockReport===b.id ? "Hide report" : "View block report"}</button>
                        {expandedBlockReport===b.id && (function() {
                          const blockSessions = data.sessions.filter(function(s) { return s.date >= b.startDate && s.date <= b.endDate; });
                          const ranSessions = blockSessions.filter(function(s) { return s.status !== "cancelled"; });
                          const cancelledCount = blockSessions.length - ranSessions.length;
                          const enrolledMembers = data.members.filter(function(m) {
                            return (m.blockEnrolments||[]).some(function(e) { return e.blockId===b.id || e.type==="year"; }) && m.memberStatus !== "pending" && m.memberStatus !== "rejected";
                          });
                          const revenue = enrolledMembers.reduce(function(sum, m) {
                            const e = (m.blockEnrolments||[]).find(function(x) { return x.blockId===b.id || x.type==="year"; });
                            return sum + (e ? (e.pricePaid||0) : 0);
                          }, 0);
                          let totalPossible = 0, totalPresent = 0;
                          ranSessions.forEach(function(s) {
                            enrolledMembers.forEach(function(m) {
                              totalPossible += 1;
                              if (s.attendance && s.attendance[m.id]) totalPresent += 1;
                            });
                          });
                          const attendanceRate = totalPossible > 0 ? Math.round((totalPresent/totalPossible)*100) : 0;
                          return (
                            <div style={{ marginTop:12, background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px" }}>
                              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                                <div>
                                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Revenue</div>
                                  <div style={{ fontWeight:900, fontSize:18, color:C.green }}>{"\u00A3"}{revenue.toFixed(2)}</div>
                                </div>
                                <div>
                                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Swimmers enrolled</div>
                                  <div style={{ fontWeight:900, fontSize:18, color:C.white }}>{enrolledMembers.length}</div>
                                </div>
                                <div>
                                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Sessions run</div>
                                  <div style={{ fontWeight:900, fontSize:18, color:C.white }}>{ranSessions.length}{cancelledCount > 0 && <span style={{ fontSize:12, color:C.greyDark, fontWeight:400 }}> ({cancelledCount} cancelled)</span>}</div>
                                </div>
                                <div>
                                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:3 }}>Avg attendance</div>
                                  <div style={{ fontWeight:900, fontSize:18, color:attendanceRate>=75?C.green:C.amber }}>{attendanceRate}%</div>
                                </div>
                              </div>
                              <div style={{ fontSize:11, color:C.greyDark, borderTop:"1px solid "+C.border, paddingTop:10 }}>More detailed reporting (per-swimmer breakdowns, trends across blocks) coming soon.</div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px", marginBottom:24 }}>
              <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:4 }}>{YEAR_PLAN.label}</div>
              <div style={{ fontSize:12, color:C.grey }}>Sign up for all four blocks in a rolling year and save {YEAR_PLAN.discountPercent}% automatically - applied at application or renewal.</div>
            </div>

            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Discount codes</div>
            <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:16 }}>
              {(data.discountCodes||[]).length === 0 && (
                <div style={{ fontSize:13, color:C.greyDark, padding:"12px 0" }}>No discount codes yet.</div>
              )}
              {(data.discountCodes||[]).map(function(c) {
                return (
                  <div key={c.code} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:13, color:C.white, fontFamily:"monospace" }}>{c.code}</div>
                      <div style={{ fontSize:11, color:C.grey, marginTop:2 }}>{c.type==="percent" ? c.value+"% off" : "\u00A3"+c.value+" off"} - {c.appliesTo}</div>
                    </div>
                    {isHeadCoach ? (
                      <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                        <button onClick={function(){ toggleDiscountCode(c.code); }} style={{ background:"transparent", border:"1px solid "+(c.active?"#166534":"#78350f"), color:c.active?C.green:C.amber, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"5px 10px", borderRadius:2, cursor:"pointer" }}>{c.active?"Active":"Disabled"}</button>
                        <button onClick={function(){ deleteDiscountCode(c.code); }} style={{ background:"none", border:"none", color:"#ff6b6b", fontSize:11, cursor:"pointer" }}>Delete</button>
                      </div>
                    ) : (
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:c.active?C.green:C.amber, flexShrink:0 }}>{c.active?"Active":"Disabled"}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {isHeadCoach && (
              <div style={{ background:C.panel, border:"1px solid #3b82f6", borderRadius:2, padding:16 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:12 }}>New discount code</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                  <div>
                    <label style={S.label}>Code</label>
                    <input value={newCodeForm.code} onChange={function(e){ setNewCodeForm(function(f){ return Object.assign({}, f, { code:e.target.value.toUpperCase() }); }); }} placeholder="e.g. SUMMER25" style={S.input}/>
                  </div>
                  <div>
                    <label style={S.label}>Applies to</label>
                    <select value={newCodeForm.appliesTo} onChange={function(e){ setNewCodeForm(function(f){ return Object.assign({}, f, { appliesTo:e.target.value }); }); }} style={S.input}>
                      <option value="block" style={{background:C.panel}}>Single block</option>
                      <option value="year" style={{background:C.panel}}>Full year</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                  <div>
                    <label style={S.label}>Type</label>
                    <select value={newCodeForm.type} onChange={function(e){ setNewCodeForm(function(f){ return Object.assign({}, f, { type:e.target.value }); }); }} style={S.input}>
                      <option value="percent" style={{background:C.panel}}>Percent off</option>
                      <option value="fixed" style={{background:C.panel}}>Fixed amount off</option>
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>Value</label>
                    <input type="number" value={newCodeForm.value} onChange={function(e){ setNewCodeForm(function(f){ return Object.assign({}, f, { value:e.target.value }); }); }} placeholder={newCodeForm.type==="percent"?"e.g. 10":"e.g. 20"} style={S.input}/>
                  </div>
                </div>
                <button onClick={function(){
                  if (!newCodeForm.code.trim() || !newCodeForm.value) return;
                  addDiscountCode({ code:newCodeForm.code.trim(), type:newCodeForm.type, value:parseFloat(newCodeForm.value), appliesTo:newCodeForm.appliesTo, active:true });
                  setNewCodeForm({ code:"", type:"percent", value:"", appliesTo:"block" });
                }} style={S.btnRed}>Add code</button>
              </div>
            )}

            {isHeadCoach && (
              <div style={{ marginTop:24, borderTop:"1px solid "+C.border, paddingTop:20 }}>
                <button onClick={function(){ setShowSessionPacks(!showSessionPacks); }} style={{ display:"block", width:"100%", background:"#e01a1a", color:"#fff", border:"none", padding:"14px 16px", fontWeight:900, fontSize:13, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer", textAlign:"center" }}>
                  {showSessionPacks ? "Hide Session Packs" : "Session Packs (Pay-As-You-Go)"} {showSessionPacks?"\u2212":"+"}
                </button>
                {showSessionPacks && (
                  <div style={{ marginTop:14 }}>
                    <p style={{ fontSize:12, color:C.grey, lineHeight:1.6, marginBottom:16 }}>For swimmers who pay per session instead of joining a block - useful for loyal swimmers who've always used this method, or trials.</p>

                    {(data.sessionPacks||[]).length > 0 && (
                      <div style={{ marginBottom:20 }}>
                        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:8 }}>Existing packs</div>
                        <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                          {data.sessionPacks.slice().sort(function(a,b){ return b.purchaseDate.localeCompare(a.purchaseDate); }).map(function(p) {
                            const m = data.members.find(function(x){ return x.id===p.memberId; });
                            const daysLeft = Math.ceil((new Date(p.expiryDate) - new Date()) / (1000*60*60*24));
                            const sessionsLeft = p.sessionsTotal - p.sessionsUsed;
                            const expired = daysLeft < 0 || sessionsLeft <= 0;
                            const justCreated = justCreatedPackId === p.id;
                            return (
                              <div key={p.id} onClick={function(){ openEditPack(p); }} style={{ background:justCreated?"#0d2b1a":C.bg, border:"1px solid "+(justCreated?C.green:C.border), borderRadius:2, padding:"10px 12px", opacity:expired?0.6:1, cursor:"pointer" }}>
                                {justCreated && (
                                  <div style={{ fontSize:9, fontWeight:900, letterSpacing:"0.08em", textTransform:"uppercase", color:C.green, marginBottom:4 }}>{"\u2713"} Created</div>
                                )}
                                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                                  <div>
                                    <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{m ? m.name : "Unknown swimmer"}</div>
                                    <div style={{ fontSize:11, color:C.grey, marginTop:2 }}>{sessionsLeft}/{p.sessionsTotal} sessions left - {daysLeft>=0?daysLeft+" days left":"expired"}</div>
                                  </div>
                                  <span style={{ fontSize:10, color:"#3b82f6", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", flexShrink:0 }}>Edit</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div style={{ background:C.panel, border:"1px solid #3b82f6", borderRadius:2, padding:16 }}>
                      <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:12 }}>Create a session pack</div>

                      <div style={{ marginBottom:10 }}>
                        <label style={S.label}>Swimmer</label>
                        <select value={packForm.memberMode==="new"?"__new__":packForm.memberId} onChange={function(e){
                          if (e.target.value === "__new__") { setPackForm(function(f){ return Object.assign({}, f, { memberMode:"new", memberId:"" }); }); }
                          else { setPackForm(function(f){ return Object.assign({}, f, { memberMode:"existing", memberId:e.target.value }); }); }
                        }} style={S.input}>
                          <option value="" style={{background:C.panel}}>Select swimmer...</option>
                          {data.members.filter(function(m){ return m.memberStatus !== "pending" && m.memberStatus !== "rejected"; }).map(function(m) {
                            return <option key={m.id} value={m.id} style={{background:C.panel}}>{m.name}</option>;
                          })}
                          <option value="__new__" style={{background:C.panel}}>+ Add a new swimmer...</option>
                        </select>
                      </div>

                      {packForm.memberMode==="new" && (
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                          <div>
                            <label style={S.label}>Full name</label>
                            <input value={packForm.newName} onChange={function(e){ setPackForm(function(f){ return Object.assign({}, f, { newName:e.target.value }); }); }} placeholder="e.g. Priya Anand" style={S.input}/>
                          </div>
                          <div>
                            <label style={S.label}>Email</label>
                            <input value={packForm.newEmail} onChange={function(e){ setPackForm(function(f){ return Object.assign({}, f, { newEmail:e.target.value }); }); }} placeholder="priya@example.com" style={S.input}/>
                          </div>
                        </div>
                      )}

                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                        <div>
                          <label style={S.label}>Number of sessions</label>
                          <input type="number" value={packForm.sessionsTotal} onChange={function(e){ setPackForm(function(f){ return Object.assign({}, f, { sessionsTotal:e.target.value }); }); }} placeholder="e.g. 10" style={S.input}/>
                        </div>
                        <div>
                          <label style={S.label}>Price per session</label>
                          <input type="number" value={packForm.pricePerSession} onChange={function(e){ setPackForm(function(f){ return Object.assign({}, f, { pricePerSession:e.target.value }); }); }} placeholder="e.g. 12.50" style={S.input}/>
                        </div>
                      </div>

                      <div style={{ marginBottom:10 }}>
                        <label style={S.label}>Expires in</label>
                        <select value={packForm.expiryWeeks} onChange={function(e){ setPackForm(function(f){ return Object.assign({}, f, { expiryWeeks:e.target.value }); }); }} style={S.input}>
                          <option value="4" style={{background:C.panel}}>4 weeks</option>
                          <option value="8" style={{background:C.panel}}>8 weeks</option>
                          <option value="12" style={{background:C.panel}}>12 weeks</option>
                          <option value="26" style={{background:C.panel}}>26 weeks</option>
                          <option value="52" style={{background:C.panel}}>52 weeks</option>
                        </select>
                      </div>

                      <div style={{ marginBottom:14 }}>
                        <label style={S.label}>Discount code (optional)</label>
                        <input value={packForm.discountCode} onChange={function(e){ setPackForm(function(f){ return Object.assign({}, f, { discountCode:e.target.value.toUpperCase() }); }); }} placeholder="e.g. WELCOME10" style={S.input}/>
                      </div>

                      {(function() {
                        const total = parseInt(packForm.sessionsTotal)||0;
                        const perSession = parseFloat(packForm.pricePerSession)||0;
                        let price = total * perSession;
                        const code = (data.discountCodes||[]).find(function(c){ return c.active && c.code===packForm.discountCode; });
                        if (code) {
                          price = code.type==="percent" ? price*(1-code.value/100) : Math.max(0, price-code.value);
                        }
                        return (total>0 && perSession>0) ? (
                          <div style={{ background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"10px 14px", marginBottom:14 }}>
                            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.grey, marginBottom:2 }}>Total price</div>
                            <div style={{ fontWeight:900, fontSize:18, color:C.green }}>{"\u00A3"}{price.toFixed(2)}</div>
                          </div>
                        ) : null;
                      })()}

                      <button onClick={function(){ createSessionPack(); }} style={S.btnRed}>Create session pack</button>
                    </div>
                  </div>
                )}
              </div>
            )}
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
                const presentIds = Object.keys(sess.attendance||{}).filter(function(k){ return sess.attendance[k]; });
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
                  return { id:m.id, name:m.name, display:displayName(m), time:latest?latest.time:null, secs:secs, gender:m.gender||"M" };
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
                <div><label style={S.label}>Time (m:ss.hh, e.g. 58.40 or 1:02.10)</label><input value={benchForm.time} onChange={handleBenchTime} placeholder="0:58.40" style={S.input}/></div>
                <div><label style={S.label}>Date</label><input type="date" value={benchForm.date} onChange={handleBenchDate} style={S.input}/></div>
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={S.label}>Detail level</label>
                <select value={benchForm.detailLevel} onChange={handleBenchDetailLevel} style={S.input}>
                  <option value="time" style={{background:C.panel}}>Just the time</option>
                  <option value="splits" style={{background:C.panel}}>Add 50m splits</option>
                  <option value="full" style={{background:C.panel}}>Add splits + stroke counts</option>
                </select>
              </div>

              {(function() {
                const dist = benchForm.event.match(/^(\d+)m/);
                const distNum = dist ? parseInt(dist[1]) : 0;
                const numLengths = Math.max(1, Math.round(distNum / 50));
                const wantSplits = benchForm.detailLevel === "splits" || benchForm.detailLevel === "full";
                const wantStrokes = benchForm.detailLevel === "full";

                if (!wantSplits) {
                  return (
                    <div style={{ marginBottom:14 }}>
                      <label style={S.label}>Start type</label>
                      <select value={benchForm.startType} onChange={handleBenchStartType} style={{ width:"100%", maxWidth:200, background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}>
                        <option value="push" style={{background:C.panel}}>Push</option>
                        <option value="block" style={{background:C.panel}}>Dive</option>
                      </select>
                    </div>
                  );
                }

                return (
                  <div style={{ marginBottom:14 }}>
                    <label style={S.label}>{wantStrokes ? "50m splits + strokes per length" : "50m splits per length"}</label>
                    <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
                      {Array.from({length:numLengths}).map(function(_, i) {
                        return (
                          <div key={i} style={{ display:"grid", gridTemplateColumns: wantStrokes ? "40px 1fr 1fr" : "40px 1fr", gap:8, alignItems:"center" }}>
                            <div style={{ fontSize:11, color:C.grey }}>L{i+1}</div>
                            <input value={benchForm.splits[i]||""} onChange={function(e){ handleBenchSplitAt(i, e); }} placeholder="e.g. 28.9" style={S.input}/>
                            {wantStrokes && <input value={benchForm.strokeCounts[i]||""} onChange={function(e){ handleBenchStrokeCountAt(i, e); }} placeholder="strokes" type="number" style={S.input}/>}
                          </div>
                        );
                      })}
                    </div>
                    <label style={S.label}>Start type</label>
                    <select value={benchForm.startType} onChange={handleBenchStartType} style={{ width:"100%", maxWidth:200, background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}>
                      <option value="push" style={{background:C.panel}}>Push</option>
                      <option value="block" style={{background:C.panel}}>Dive</option>
                    </select>
                  </div>
                );
              })()}
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <button onClick={addBenchmark} style={S.btnRed}>Record time</button>
                {benchmarkFeedback === "recorded" && (
                  <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.green }}>{"✓"} Time recorded</span>
                )}
                {benchmarkFeedback === "kept-existing" && (
                  <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:C.amber }}>Kept existing faster time for this day</span>
                )}
              </div>
            </div>
            {data.members.map(function(m) {
              const isOpen = expandedBenchMember === m.id;
              return (
                <div key={m.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, marginBottom:2, overflow:"hidden" }}>
                  <div onClick={function(){ setExpandedBenchMember(isOpen ? null : m.id); }} style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px", cursor:"pointer" }}>
                    <Avatar name={m.name} size={32} photo={m.photo}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:14 }}>{displayName(m)}</div>
                      <div style={{ fontSize:12, color:C.grey }}>{m.block} - {m.benchmarks.length} time{m.benchmarks.length!==1?"s":""} recorded</div>
                    </div>
                    <div style={{ fontSize:16, color:C.grey, fontWeight:700, flexShrink:0 }}>{isOpen ? "-" : "+"}</div>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop:"1px solid "+C.border, padding:"12px 16px 16px" }}>
                      {m.benchmarks.length === 0 ? (
                        <p style={{ color:C.greyDark, fontSize:13, margin:0 }}>No benchmarks yet.</p>
                      ) : (
                        <div>
                          <div style={{ display:"flex", flexDirection:"column", gap:1, marginBottom:16 }}>
                            {m.benchmarks.slice().sort(function(a,b){ return b.date.localeCompare(a.date); }).map(function(b, i) {
                              if (editingBenchmark && editingBenchmark.id === b.id) {
                                const eb = editingBenchmark;
                                return (
                                  <div key={i} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"10px" }}>
                                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                                      <select value={eb.event} onChange={function(e){ setEditingBenchmark(Object.assign({}, eb, { event:e.target.value })); }} style={S.input}>
                                        {["50m Free","100m Free","200m Free","400m Free","50m Back","100m Back","50m Breast","100m Breast","50m Fly","100m Fly","200m IM"].map(function(ev) { return <option key={ev} value={ev} style={{ background:C.panel }}>{ev}</option>; })}
                                      </select>
                                      <input value={eb.time} onChange={function(e){ setEditingBenchmark(Object.assign({}, eb, { time:e.target.value })); }} placeholder="0:58.40" style={S.input}/>
                                      <input type="date" value={eb.date} onChange={function(e){ setEditingBenchmark(Object.assign({}, eb, { date:e.target.value })); }} style={S.input}/>
                                      <select value={eb.startType} onChange={function(e){ setEditingBenchmark(Object.assign({}, eb, { startType:e.target.value })); }} style={S.input}>
                                        <option value="push" style={{ background:C.panel }}>Push start</option>
                                        <option value="block" style={{ background:C.panel }}>Dive start</option>
                                      </select>
                                    </div>
                                    <div style={{ display:"flex", gap:8 }}>
                                      <button onClick={saveEditBenchmark} style={S.btnGreen}>Save</button>
                                      <button onClick={cancelEditBenchmark} style={S.btnGhost}>Cancel</button>
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:C.bg, padding:"7px 10px", borderRadius:2 }}>
                                  <span style={{ fontSize:12, color:EVENT_COLORS[b.event]||C.red }}>{b.event}</span>
                                  <span style={{ display:"flex", alignItems:"center", gap:14 }}>
                                    <strong style={{ color:C.white, fontSize:13, fontFamily:"monospace" }}>{b.time}</strong>
                                    <span style={{ fontSize:10, color:C.grey }}>({(b.startType||"push")==="block"?"Dive":"Push"})</span>
                                    <span style={{ fontSize:12, color:C.grey }}>{b.date}</span>
                                    <button onClick={function(){ startEditBenchmark(b); }} style={{ background:"none", border:"none", color:"#3b82f6", fontSize:11, fontWeight:700, cursor:"pointer", padding:0 }}>Edit</button>
                                    <button onClick={function(){ deleteBenchmarkRow(b); }} style={{ background:"none", border:"none", color:"#ff6b6b", fontSize:11, fontWeight:700, cursor:"pointer", padding:0 }}>Delete</button>
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <ProgressPanel member={m}/>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "reporting" && (
          <div>
            <span style={S.eyebrow}>Feedback</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Reporting</h2>
            <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Give feedback on sessions, ongoing comments, and block progress reports - all in one place.</p>

            {(function() {
              const todayStr = new Date().toISOString().slice(0,10);
              const activeMembers = data.members.filter(function(m) { return m.memberStatus !== "pending" && m.memberStatus !== "rejected"; });
              const awaiting = [];
              activeMembers.forEach(function(m) {
                (data.blocks||BLOCKS).forEach(function(b) {
                  const enrolled = (m.blockEnrolments||[]).some(function(e) { return e.blockId===b.id || e.type==="year"; });
                  if (!enrolled || b.endDate >= todayStr) return;
                  const rep = (m.blockReports||{})[b.id];
                  if (!rep || !rep.published) awaiting.push({ member:m, block:b });
                });
              });
              if (awaiting.length === 0) return null;
              return (
                <div style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"14px 16px", marginBottom:20 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.amber, marginBottom:10 }}>{awaiting.length} report{awaiting.length!==1?"s":""} awaiting review</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                    {awaiting.map(function(a, i) {
                      return (
                        <div key={i} onClick={function(){ setReportingMemberId(String(a.member.id)); setReportingSub("blocks"); setReportingBlockId(a.block.id); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, background:C.bg, padding:"9px 12px", borderRadius:2, cursor:"pointer" }}>
                          <span style={{ fontSize:13, color:C.white, fontWeight:700 }}>{displayName(a.member)}</span>
                          <span style={{ fontSize:11, color:C.amber }}>{a.block.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <div style={{ marginBottom:16 }}>
              <label style={S.label}>Swimmer</label>
              <select value={reportingMemberId} onChange={function(e){ setReportingMemberId(e.target.value); setFeedbackSessionId(""); setReportingBlockId(""); }} style={S.input}>
                <option value="" style={{ background:C.panel }}>Select swimmer...</option>
                {data.members.filter(function(m) { return m.memberStatus !== "pending" && m.memberStatus !== "rejected"; }).map(function(m) { return <option key={m.id} value={m.id} style={{ background:C.panel }}>{m.name}</option>; })}
              </select>
            </div>

            {reportingMemberId && (function() {
              const rm = data.members.find(function(x) { return x.id === reportingMemberId; });
              if (!rm) return null;

              return (
                <div>
                  <div style={{ display:"flex", borderBottom:"1px solid "+C.border, marginBottom:20 }}>
                    {[["sessions","Session feedback"],["blocks","Block reports"]].map(function(s) {
                      const active = reportingSub===s[0];
                      return (
                        <button key={s[0]} onClick={function(){ setReportingSub(s[0]); }} style={{ background:"none", border:"none", borderBottom:active?"2px solid "+C.red:"2px solid transparent", color:active?C.white:C.grey, padding:"9px 14px", fontSize:11, fontWeight:active?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer" }}>{s[1]}</button>
                      );
                    })}
                  </div>

                  {reportingSub === "sessions" && (
                    <div>
                      <div style={{ background:C.panel, border:"1px solid #3b82f6", borderRadius:2, padding:16, marginBottom:20 }}>
                        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:12 }}>Give feedback on a specific session</div>
                        <div style={{ marginBottom:12 }}>
                          <label style={S.label}>Session</label>
                          <select value={feedbackSessionId} onChange={function(e){ setFeedbackSessionId(e.target.value); }} style={S.input}>
                            <option value="" style={{ background:C.panel }}>Select session...</option>
                            {data.sessions.slice().sort(function(a,b) { return b.date.localeCompare(a.date); }).map(function(s) {
                              return <option key={s.id} value={s.id} style={{ background:C.panel }}>{s.date} - {s.focus||s.title}</option>;
                            })}
                          </select>
                        </div>
                        <div style={{ marginBottom:12 }}>
                          <label style={S.label}>Feedback</label>
                          <textarea value={feedbackDraft} onChange={function(e){ setFeedbackDraft(e.target.value); }} rows={3} placeholder="e.g. Great effort on the sprint set - keep that head position on the last 25m." style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", marginBottom:10 }}/>
                          <VoiceRecorder audio={feedbackAudio} onChange={setFeedbackAudio}/>
                        </div>
                        <button onClick={function(){
                          if (!feedbackSessionId || (!feedbackDraft.trim() && !feedbackAudio)) return;
                          const s = data.sessions.find(function(x) { return x.id === feedbackSessionId; });
                          addSessionFeedback(rm.id, feedbackSessionId, s ? s.date : "", feedbackDraft.trim(), feedbackAudio);
                          setFeedbackDraft(""); setFeedbackSessionId(""); setFeedbackAudio(null);
                        }} style={S.btnRed}>Save feedback</button>
                      </div>

                      <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16, marginBottom:20 }}>
                        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:12 }}>General comment (not tied to a session)</div>
                        <textarea value={commentDraft} onChange={function(e){ setCommentDraft(e.target.value); }} rows={3} placeholder="Ongoing thoughts, progress notes, things to keep an eye on..." style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical", marginBottom:10 }}/>
                        <div style={{ marginBottom:12 }}>
                          <VoiceRecorder audio={commentAudio} onChange={setCommentAudio}/>
                        </div>
                        <button onClick={function(){
                          if (!commentDraft.trim() && !commentAudio) return;
                          addGeneralComment(rm.id, commentDraft.trim(), commentAudio);
                          setCommentDraft(""); setCommentAudio(null);
                        }} style={S.btnRed}>Save comment</button>
                      </div>

                      <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>History for {displayName(rm)}</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                        {(rm.sessionFeedback||[]).slice().sort(function(a,b) { return b.createdDate.localeCompare(a.createdDate); }).map(function(f) {
                          return (
                            <div key={f.id} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:6 }}>
                                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#3b82f6" }}>Session - {f.date}</span>
                                <button onClick={function(){ deleteSessionFeedback(rm.id, f.id); }} style={{ background:"none", border:"none", color:"#ff6b6b", fontSize:11, cursor:"pointer" }}>Delete</button>
                              </div>
                              <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>{f.text}</div>
                              {f.audio && <audio controls src={f.audio} style={{ height:32, width:"100%", marginTop:8 }}/>}
                            </div>
                          );
                        })}
                        {(rm.generalComments||[]).slice().sort(function(a,b) { return b.createdDate.localeCompare(a.createdDate); }).map(function(c) {
                          return (
                            <div key={c.id} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:6 }}>
                                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.grey }}>General comment - {c.createdDate}</span>
                                <button onClick={function(){ deleteGeneralComment(rm.id, c.id); }} style={{ background:"none", border:"none", color:"#ff6b6b", fontSize:11, cursor:"pointer" }}>Delete</button>
                              </div>
                              <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>{c.text}</div>
                              {c.audio && <audio controls src={c.audio} style={{ height:32, width:"100%", marginTop:8 }}/>}
                            </div>
                          );
                        })}
                        {(rm.sessionFeedback||[]).length===0 && (rm.generalComments||[]).length===0 && (
                          <div style={{ fontSize:13, color:C.greyDark, padding:"12px 0" }}>No feedback or comments yet for this swimmer.</div>
                        )}
                      </div>
                    </div>
                  )}

                  {reportingSub === "blocks" && (function() {
                    const todayStr = new Date().toISOString().slice(0,10);
                    const completedBlocks = (data.blocks||BLOCKS).filter(function(b) {
                      const enrolled = (rm.blockEnrolments||[]).some(function(e) { return e.blockId===b.id || e.type==="year"; });
                      return enrolled && b.endDate < todayStr;
                    });
                    if (completedBlocks.length === 0) {
                      return <div style={{ fontSize:13, color:C.greyDark, padding:"12px 0" }}>This swimmer hasn't finished a block yet - reports become available once a block ends.</div>;
                    }
                    return (
                      <div>
                        <div style={{ marginBottom:16 }}>
                          <label style={S.label}>Completed block</label>
                          <select value={reportingBlockId} onChange={function(e){ setReportingBlockId(e.target.value); }} style={S.input}>
                            <option value="" style={{ background:C.panel }}>Select a finished block...</option>
                            {completedBlocks.map(function(b) { return <option key={b.id} value={b.id} style={{ background:C.panel }}>{b.label}</option>; })}
                          </select>
                        </div>
                        {reportingBlockId && (function() {
                          const b = completedBlocks.find(function(x) { return x.id===reportingBlockId; });
                          const stats = computeBlockReportStats(rm, b, data.sessions);
                          const report = (rm.blockReports||{})[b.id] || null;
                          return (
                            <div>
                              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>{displayName(rm)} - {b.label} progress report</div>
                              <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16 }}>
                                <AthleteBlockReport
                                  member={rm} block={b} stats={stats} report={report} isCoach={true}
                                  onSaveNotes={function(notes){ saveBlockReportNotes(rm.id, b.id, notes); }}
                                  onPublish={function(){ publishBlockReport(rm.id, b.id); }}
                                />
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}
                </div>
              );
            })()}
          </div>
        )}



        {tab === "drills" && <DrillLibraryPage isCoach={isHeadCoach} onUpdate={updateDrills} drills={data.drillLibrary || DRILLS_DATA}/>}
        {tab === "records" && <HallOfRecords records={data.hallOfRecords || []} members={data.members} blocks={data.blocks || BLOCKS} isCoach={true} onUpdate={updateHallOfRecords} currentMemberId={null}/>}

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
          <MessagesPage currentUserId={currentCoach.id} currentUserName={"Coach "+currentCoach.name} isCoach={true} messages={data.messages} members={data.members} coaches={data.coaches} onSend={sendCoachMessage}/>
        )}

        {tab === "cake" && (
          <CakeYourMarksPage
            member={null}
            allMembers={data.members}
            bakes={data.bakes||[]}
            isCoach={true}
            onAddBake={function(form){
              api.addBake(form, THE_BAKER).then(refreshData).catch(function(err) { window.alert("Couldn't add bake: " + err.message); });
            }}
            onDeleteBake={function(bakeId){
              api.deleteBake(bakeId).then(refreshData).catch(function(err) { window.alert("Couldn't delete bake: " + err.message); });
            }}
            onRate={function(){}}
            onUpdateBakePhoto={function(bakeId, photo){
              api.updateBakePhoto(bakeId, photo).then(refreshData).catch(function(err) { window.alert("Couldn't update photo: " + err.message); });
            }}
            onSkipBake={function(){}}
          />
        )}

        {tab === "shop" && (
          <div>
            <span style={S.eyebrow}>Public Shop</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Shop</h2>
            <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Visible to everyone, no login needed. List kit for sale, mark it sold, and see who's reserved what.</p>

            <button onClick={function(){ setShowAddShopItem(!showAddShopItem); }} style={{ display:"block", width:"100%", background:showAddShopItem?C.panel:"#e01a1a", color:showAddShopItem?C.white:"#fff", border:showAddShopItem?"1px solid "+C.border:"none", padding:"12px 16px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer", marginBottom:16 }}>{showAddShopItem?"Cancel":"+ Add item for sale"}</button>

            {showAddShopItem && (
              <div style={{ background:C.panel, border:"1px solid #3b82f6", borderRadius:2, padding:16, marginBottom:20 }}>
                <div style={{ marginBottom:10 }}>
                  <label style={S.label}>Item name</label>
                  <input value={shopItemForm.name} onChange={function(e){ setShopItemForm(function(f){ return Object.assign({}, f, { name:e.target.value }); }); }} placeholder="e.g. Finis Long Floating Fins - Size M" style={S.input}/>
                </div>
                <div style={{ marginBottom:10 }}>
                  <label style={S.label}>Description</label>
                  <textarea value={shopItemForm.description} onChange={function(e){ setShopItemForm(function(f){ return Object.assign({}, f, { description:e.target.value }); }); }} rows={3} placeholder="Condition, size, any wear and tear worth mentioning..." style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical" }}/>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                  <div>
                    <label style={S.label}>Price ({"\u00A3"})</label>
                    <input type="number" value={shopItemForm.price} onChange={function(e){ setShopItemForm(function(f){ return Object.assign({}, f, { price:e.target.value }); }); }} placeholder="e.g. 15" style={S.input}/>
                  </div>
                  <div>
                    <label style={S.label}>Condition</label>
                    <select value={shopItemForm.condition} onChange={function(e){ setShopItemForm(function(f){ return Object.assign({}, f, { condition:e.target.value }); }); }} style={S.input}>
                      <option value="used" style={{background:C.panel}}>Used</option>
                      <option value="new" style={{background:C.panel}}>New</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={S.label}>Category</label>
                  {(function() {
                    const existingCats = Array.from(new Set((data.shopItems||[]).map(function(i){ return i.category; }))).sort();
                    return (
                      <select value={shopItemForm.category==="__new__" ? "__new__" : (existingCats.indexOf(shopItemForm.category)!==-1 ? shopItemForm.category : "")} onChange={function(e){
                        setShopItemForm(function(f){ return Object.assign({}, f, { category: e.target.value }); });
                      }} style={S.input}>
                        <option value="" style={{background:C.panel}}>Select category...</option>
                        {existingCats.map(function(cat) { return <option key={cat} value={cat} style={{background:C.panel}}>{cat}</option>; })}
                        <option value="__new__" style={{background:C.panel}}>+ Add new category...</option>
                      </select>
                    );
                  })()}
                  {shopItemForm.category==="__new__" && (
                    <input value={shopItemForm.newCategory||""} onChange={function(e){ setShopItemForm(function(f){ return Object.assign({}, f, { newCategory:e.target.value }); }); }} placeholder="Name the new category" style={Object.assign({}, S.input, { marginTop:8 })}/>
                  )}
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={S.label}>Photo</label>
                  {shopItemForm.photo && (
                    <div style={{ width:100, height:100, borderRadius:2, overflow:"hidden", marginBottom:8 }}>
                      <img src={shopItemForm.photo} alt="Preview" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                    </div>
                  )}
                  <label style={{ display:"inline-block", cursor:"pointer" }}>
                    <input type="file" accept="image/*" onChange={function(e){
                      const file = e.target.files && e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = function(ev){ setShopItemForm(function(f){ return Object.assign({}, f, { photo: ev.target.result }); }); };
                      reader.readAsDataURL(file);
                    }} style={{ display:"none" }}/>
                    <span style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"9px 16px", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:2, display:"inline-block" }}>{shopItemForm.photo?"Change photo":"Upload photo"}</span>
                  </label>
                </div>
                <button onClick={function(){
                  if (!shopItemForm.name.trim() || !shopItemForm.price) return;
                  const finalCategory = shopItemForm.category==="__new__" ? (shopItemForm.newCategory||"").trim() : shopItemForm.category;
                  if (!finalCategory) return;
                  api.addShopItem({ name:shopItemForm.name.trim(), description:shopItemForm.description.trim(), price:parseFloat(shopItemForm.price), condition:shopItemForm.condition, category:finalCategory, photo:shopItemForm.photo||null })
                    .then(refreshData).catch(function(err) { window.alert("Couldn't add item: " + err.message); });
                  setShopItemForm({ name:"", description:"", price:"", condition:"used", category:"", newCategory:"", photo:null });
                  setShowAddShopItem(false);
                }} style={S.btnRed}>Add item</button>
              </div>
            )}

            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>{(data.shopItems||[]).length} item{(data.shopItems||[]).length!==1?"s":""} listed</div>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {(data.shopItems||[]).slice().sort(function(a,b){ return b.createdDate.localeCompare(a.createdDate); }).map(function(item) {
                const isOpen = expandedShopItem === item.id;
                return (
                  <div key={item.id} style={{ background:isOpen?C.panel:C.bg, border:"1px solid "+(isOpen?C.red+"66":C.border), borderRadius:2, overflow:"hidden" }}>
                    <div onClick={function(){ setExpandedShopItem(isOpen?null:item.id); }} style={{ padding:"12px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:44, height:44, borderRadius:2, overflow:"hidden", flexShrink:0, background:"#161616" }}>
                        {item.photo && <img src={item.photo} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:13, color:C.white }}>{item.name}</div>
                        <div style={{ fontSize:11, color:C.grey, marginTop:2 }}>{"\u00A3"}{item.price} - {item.category}{item.status==="reserved" && <span style={{ color:C.amber }}> - Reserved</span>}{item.status==="sold" && <span style={{ color:C.greyDark }}> - Sold</span>}</div>
                      </div>
                      <span style={{ fontSize:13, color:C.grey }}>{isOpen?"-":"+"}</span>
                    </div>
                    {isOpen && (
                      <div style={{ borderTop:"1px solid "+C.border, padding:"14px" }}>
                        {item.reservedBy && (
                          <div style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"10px 12px", marginBottom:12 }}>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.amber, marginBottom:4 }}>Reserved by</div>
                            <div style={{ fontSize:13, color:C.white, fontWeight:700 }}>{item.reservedBy.name}</div>
                            <div style={{ fontSize:12, color:C.greyLight }}>{item.reservedBy.contact}</div>
                            <div style={{ fontSize:11, color:C.grey, marginTop:2 }}>Reserved on {item.reservedBy.date}</div>
                          </div>
                        )}
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          {item.status==="reserved" && (
                            <button onClick={function(){ api.updateShopItemStatus(item.id, "sold").then(refreshData).catch(function(err) { window.alert("Couldn't update item: " + err.message); }); }} style={{ background:"transparent", border:"1px solid #166534", color:C.green, fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"7px 12px", borderRadius:2, cursor:"pointer" }}>Mark sold</button>
                          )}
                          {item.status!=="available" && (
                            <button onClick={function(){ api.updateShopItemStatus(item.id, "available").then(refreshData).catch(function(err) { window.alert("Couldn't update item: " + err.message); }); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", padding:"7px 12px", borderRadius:2, cursor:"pointer" }}>Make available again</button>
                          )}
                          <button onClick={function(){ api.deleteShopItem(item.id).then(refreshData).catch(function(err) { window.alert("Couldn't delete item: " + err.message); }); }} style={{ background:"none", border:"none", color:"#ff6b6b", fontSize:11, cursor:"pointer", marginLeft:"auto" }}>Delete listing</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "pizza" && (
          <div>
            <span style={S.eyebrow}>Post-Session Tradition</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Pizza Night</h2>
            <p style={{ color:C.grey, fontSize:13, marginBottom:20 }}>Public and open to anyone, no login needed - swimmers can also order from their own Pizza Night tab.</p>

            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16, marginBottom:20 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Ordering deadline</div>
              <input type="datetime-local" defaultValue={(data.pizzaDeadline||"").slice(0,16)} key={"deadline-"+data.pizzaDeadline} onBlur={function(e){ if (e.target.value && e.target.value !== (data.pizzaDeadline||"").slice(0,16)) api.updateClubSettings({ pizzaDeadline: e.target.value }).then(refreshData).catch(function(err) { window.alert("Couldn't update deadline: " + err.message); }); }} style={S.input}/>
            </div>

            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:16, marginBottom:20 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:10 }}>Delivery charge (split across the whole order)</div>
              <input type="number" defaultValue={data.pizzaDeliveryFee||""} key={"deliveryFee-"+data.pizzaDeliveryFee} onBlur={function(e){ const next = parseFloat(e.target.value)||0; if (next !== (data.pizzaDeliveryFee||0)) api.updateClubSettings({ pizzaDeliveryFee: next }).then(refreshData).catch(function(err) { window.alert("Couldn't update fee: " + err.message); }); }} placeholder="e.g. 5.00" style={S.input}/>
              <div style={{ fontSize:11, color:C.greyDark, marginTop:6 }}>Added once to the group total, not per person - covers whatever the delivery/collection fee ends up being.</div>
            </div>

            <PizzaNightPage orders={data.pizzaOrders||[]} deadline={data.pizzaDeadline} deliveryFee={data.pizzaDeliveryFee||0} onSubmitOrder={submitPizzaOrder} onMarkPaid={markPizzaPaid} onClearUnpaid={clearUnpaidPizzaOrders} embedded={true}/>
          </div>
        )}

      </div>
    </div>
  );
}


function MemberDashboard({ memberId, allData, setAllData, refreshData, onLogout }) {
  const baseM = allData.members.find(function(m){ return m.id===memberId; });
  const [tab, setTab] = useState("profile");
  const [memberEdits, setMemberEdits] = useState({});
  const member = baseM ? Object.assign({}, baseM, memberEdits) : null;
  const [raceResults, setRaceResultsLocal] = useState(baseM ? (baseM.raceResults || []) : []);
  const [plannedEvents, setPlannedEventsLocal] = useState(baseM ? (baseM.plannedEvents || []) : []);
  const [targetTime, setTargetTimeLocal] = useState(baseM ? (baseM.targetTime || null) : null);
  const [inductionAck, setInductionAckLocal] = useState(baseM ? (baseM.inductionAck || {}) : {});
  const [showInduction, setShowInduction] = useState(false);
  const [showCoachFeedback, setShowCoachFeedback] = useState(false);
  const [showDrillLibrary, setShowDrillLibrary] = useState(false);
  const [showConditioningPlan, setShowConditioningPlan] = useState(false);
  const [navScrollState, setNavScrollState] = useState({ left:false, right:false });
  const navBarRef = useRef(null);
  function checkNavScroll(el) {
    if (!el) return;
    const nextLeft = el.scrollLeft > 2;
    const nextRight = el.scrollLeft < (el.scrollWidth - el.clientWidth - 2);
    setNavScrollState(function(prev) {
      if (prev.left === nextLeft && prev.right === nextRight) return prev;
      return { left: nextLeft, right: nextRight };
    });
  }
  useEffect(function() {
    checkNavScroll(navBarRef.current);
  }, []);
  const [progressSub, setProgressSub] = useState("charts");
  const [progressTargetInput, setProgressTargetInput] = useState("");

  function persistField(field, value) {
    if (!refreshData) return;
    api.updateMemberFields(memberId, (function(){ const o = {}; o[field] = value; return o; })())
      .then(refreshData)
      .catch(function(err) { window.alert("Couldn't save: " + err.message); });
  }

  function saveSettings(next) {
    if (next.email) api.updateMemberFields(memberId, { email: next.email }).then(refreshData).catch(function(err) { window.alert("Couldn't update email: " + err.message); });
    if (next.password) api.changeMyPassword(next.password).catch(function(err) { window.alert("Couldn't update password: " + err.message); });
    if (next.notifPrefs) api.updateMemberFields(memberId, { notifPrefs: next.notifPrefs }).then(refreshData).catch(function(err) { window.alert("Couldn't save notification preferences: " + err.message); });
    setShowSettingsCard(false);
  }

  function deleteMyAccount() {
    api.deleteMember(memberId).then(function() { return api.signOut(); }).then(onLogout)
      .catch(function(err) { window.alert("Couldn't delete account: " + err.message); });
    setShowSettingsCard(false);
  }

  function completeApplication(formData) {
    // The disabled fieldset stops re-clicks visually, but state updates don't
    // apply until the next render - two clicks fired in the same tick (a fast
    // double-click on a slow connection, with nothing else to signal the first
    // one registered) both read the same stale completeAppSubmitting value and
    // both got through, creating duplicate session packs/enrolments. A ref
    // mutates immediately, so it actually blocks the second call.
    if (completeAppSubmittingRef.current) return;
    completeAppSubmittingRef.current = true;
    const enrolment = formData.blockEnrolment;
    setCompleteAppSubmitting(true);
    setCompleteAppError("");
    api.completeMemberApplication(memberId, formData).then(function() {
      // Flip the gate immediately on the one write that actually matters (this
      // is what un-gates the account), rather than waiting for refreshData's
      // full ~20-table refetch to land before the screen moves anywhere. That
      // full refetch can take a real few seconds on an actual mobile
      // connection (invisible on localhost, where this always looked instant)
      // - previously the "Submitting..." state sat through all of it, which
      // read as a hang and led to reloading and resubmitting. The enrolment
      // write and full refresh still happen right after, in the background.
      if (setAllData) {
        setAllData(function(d) {
          return Object.assign({}, d, { members: (d.members||[]).map(function(m) {
            if (m.id !== memberId) return m;
            return Object.assign({}, m, { memberStatus:"approved", name:formData.name, email:formData.email, mobile:formData.mobile, dob:formData.dob, gender:formData.gender, emergencyName:formData.emergencyName, emergencyPhone:formData.emergencyPhone, level:formData.swimmerType, specialty:formData.strokeRank1, goals:formData.goals, competitions:formData.targetEvent, medicalNotes:formData.medical, bio:formData.goals });
          }) });
        });
      }
      if (!enrolment) return;
      if (enrolment.type === "pack" && enrolment.packSessionCount) {
        const isDateTied = !!(enrolment.packSelectedSessionIds && enrolment.packSelectedSessionIds.length);
        let expiryDate;
        if (isDateTied) {
          const selectedSessions = enrolment.packSelectedSessionIds
            .map(function(sid){ return (allData.sessions||[]).find(function(s){ return s.id === sid; }); })
            .filter(Boolean)
            .sort(function(a,b){ return a.date.localeCompare(b.date); });
          const lastSession = selectedSessions[selectedSessions.length-1];
          expiryDate = lastSession ? new Date(lastSession.date) : new Date();
          expiryDate.setDate(expiryDate.getDate() + 1);
        } else {
          expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 12*7);
        }
        return api.createSessionPackForMember(memberId, {
          sessionsTotal: enrolment.packSessionCount, pricePerSession: enrolment.packPricePerSession || SESSION_PACK_PER_SESSION_PRICE,
          discountCode: enrolment.discountCode||null, expiryDate: expiryDate.toISOString().slice(0,10),
          createdBy: "application", allowedSessionIds: isDateTied ? enrolment.packSelectedSessionIds : null, paymentStatus: "pending",
        });
      }
      return api.createBlockEnrolment(memberId, enrolment);
    }).then(refreshData).then(function() {
      completeAppSubmittingRef.current = false;
      setCompleteAppSubmitting(false);
    }).catch(function(err) {
      completeAppSubmittingRef.current = false;
      setCompleteAppSubmitting(false);
      setCompleteAppError(err.message || "Couldn't complete application. Please try again.");
    });
  }

  function setRaceResults(next) { setRaceResultsLocal(next); api.replaceRaceResults(memberId, next).then(refreshData).catch(function(err) { window.alert("Couldn't save race results: " + err.message); }); }
  function setPlannedEvents(next) { setPlannedEventsLocal(next); api.replacePlannedEvents(memberId, next).then(refreshData).catch(function(err) { window.alert("Couldn't save events: " + err.message); }); }
  function setTargetTime(next) { setTargetTimeLocal(next); persistField("targetTime", next); }
  function setInductionAck(next) { setInductionAckLocal(next); persistField("inductionAck", next); }

  function signUpForBlock(block, discountPercent) {
    const finalPrice = discountPercent ? Math.round(block.priceFull * (1 - discountPercent/100) * 100) / 100 : block.priceFull;
    const enrolment = { type:"block", blockId: block.id, blockLabel: block.label, pricePaid: finalPrice, discountCode: discountPercent ? "LOYALTY"+discountPercent : null, joinedMidway:false, signedUpDate: new Date().toISOString().slice(0,10), paymentStatus:"pending" };
    api.createBlockEnrolment(memberId, enrolment).then(refreshData).catch(function(err) { window.alert("Couldn't sign up for block: " + err.message); });
  }

  function buySessionPack(packType, selectedSessionIds) {
    if (!refreshData) return;
    const rate = perSessionRateForEmail(member.email);
    const isDateTied = packType === "persession";
    const sessionCount = isDateTied ? (selectedSessionIds||[]).length : SESSION_PACK_10.sessions;
    if (sessionCount <= 0) return;
    const price = isDateTied ? sessionCount * rate : pack10PriceForEmail(member.email);
    let expiryDate;
    if (isDateTied) {
      const selectedSessions = (selectedSessionIds||[])
        .map(function(sid){ return (allData.sessions||[]).find(function(s){ return s.id === sid; }); })
        .filter(Boolean)
        .sort(function(a,b){ return a.date.localeCompare(b.date); });
      const lastSession = selectedSessions[selectedSessions.length-1];
      expiryDate = lastSession ? new Date(lastSession.date) : new Date();
      expiryDate.setDate(expiryDate.getDate() + 1);
    } else {
      expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 12*7);
    }
    api.createSessionPackForMember(memberId, {
      sessionsTotal: sessionCount, pricePerSession: isDateTied ? rate : (price/sessionCount), pricePaid: price,
      expiryDate: expiryDate.toISOString().slice(0,10), createdBy: "member",
      allowedSessionIds: isDateTied ? selectedSessionIds : null, paymentStatus: "pending",
    }).then(refreshData).catch(function(err) { window.alert("Couldn't buy session pack: " + err.message); });
  }

  function persistAttendanceIntent(next) {
    persistField("sessionAttendanceIntent", next);
  }

  function rateBake(bakeId, stars, comment) {
    if (!refreshData) return;
    api.rateBake(bakeId, memberId, stars, comment).then(refreshData).catch(function(err) { window.alert("Couldn't save rating: " + err.message); });
  }

  function skipBake(bakeId) {
    if (!refreshData) return;
    api.skipBake(bakeId, memberId).then(refreshData).catch(function(err) { window.alert("Couldn't skip: " + err.message); });
  }

  function reserveShopItemAsMember(itemId, name, contact) {
    if (!refreshData) return;
    api.reserveShopItem(itemId, name, contact).then(refreshData).catch(function(err) { window.alert("Couldn't reserve item: " + err.message); });
  }

  function submitPizzaOrderAsMember(order) {
    if (!refreshData) return;
    api.submitPizzaOrder(order).then(refreshData).catch(function(err) { window.alert("Couldn't submit pizza order: " + err.message); });
  }
  function markPizzaPaidAsMember(orderId) {
    if (!refreshData) return;
    api.markPizzaPaid(orderId).then(refreshData).catch(function(err) { window.alert("Couldn't update payment: " + err.message); });
  }

  function sendMemberMessage(next) {
    if (!refreshData) return;
    const msg = next[next.length - 1];
    if (!msg) return;
    if (setAllData) setAllData(function(d) { return Object.assign({}, d, { messages: next }); });
    api.sendMessage(msg.channel, String(msg.senderId), msg.senderName, msg.isCoach, msg.text).then(refreshData).catch(function(err) { window.alert("Couldn't send message: " + err.message); refreshData(); });
  }

  // A member's own `messages` list is already scoped by RLS to channels they're
  // actually part of, but board messages from before this member existed, or a
  // stale local cache, could in principle include others' DMs - so scope
  // explicitly here too, the same way the coach-side badge does.
  function messageIsUnreadByMember(m) {
    if (String(m.senderId) === String(memberId)) return false;
    const chan = m.channel || "board";
    if (chan === "board") return true;
    const parts = chan.split(":");
    return parts[1] === String(memberId) || parts[2] === String(memberId);
  }
  // Persisted on the member row (not local state) so the badge survives a page reload.
  const memberMessagesSeenAt = member && member.messagesSeenAt;
  const unreadMsgCount = (allData.messages||[]).filter(function(m){
    return messageIsUnreadByMember(m) && (!memberMessagesSeenAt || new Date(m.timestamp) > new Date(memberMessagesSeenAt));
  }).length;
  function markMemberMessagesSeenNow() {
    const seenAt = new Date().toISOString();
    if (setAllData) setAllData(function(d) { return Object.assign({}, d, { members: (d.members||[]).map(function(m){ return m.id===memberId ? Object.assign({}, m, { messagesSeenAt: seenAt }) : m; }) }); });
    api.markMemberMessagesSeen(memberId).catch(function(err) { console.error("Couldn't mark messages seen", err); });
  }

  const [lastSeenNotifCount, setLastSeenNotifCount] = useState(0);
  function buildMyNotifications() {
    const items = [];
    const prefs = member.notifPrefs || { feedback:true, comments:true, blockReports:true, cancellations:true };
    if (prefs.feedback !== false) {
      (member.sessionFeedback||[]).forEach(function(f) {
        items.push({ id:"fb-"+f.id, icon:"Session feedback", title:"Your coach left feedback on "+f.date, detail:f.text||(f.audio?"Voice note - tap to listen":""), date:f.createdDate, sortKey:f.createdDate, color:"#3b82f6" });
      });
    }
    if (prefs.comments !== false) {
      (member.generalComments||[]).forEach(function(c) {
        items.push({ id:"cm-"+c.id, icon:"Coach comment", title:"Your coach added a comment", detail:c.text||(c.audio?"Voice note - tap to listen":""), date:c.createdDate, sortKey:c.createdDate, color:C.grey });
      });
    }
    if (prefs.blockReports !== false) {
      Object.keys(member.blockReports||{}).forEach(function(bid) {
        const r = member.blockReports[bid];
        if (!r.published) return;
        const b = (allData.blocks||BLOCKS).find(function(x) { return x.id===bid; });
        items.push({ id:"rpt-"+bid, icon:"Block report", title:"Your "+(b?b.label:"block")+" report is ready", detail:"See it under Resources", date:r.publishedDate, sortKey:r.publishedDate, color:C.green });
      });
    }
    if (prefs.cancellations !== false) {
      (allData.sessions||[]).forEach(function(s) {
        if (s.status === "cancelled") {
          items.push({ id:"cancel-"+s.id, icon:"Session cancelled", title:(s.focus||s.title)+" on "+s.date+" isn't running", detail:"", date:s.date, sortKey:s.date, color:"#ff6b6b" });
        }
      });
    }
    items.sort(function(a,b){ return (b.sortKey||"").localeCompare(a.sortKey||""); });
    return items;
  }
  // member can be transiently missing from allData.members (e.g. mid-refetch
  // after a background update) on a render before the "Member not found" guard
  // below is reached - buildMyNotifications reads member.* unconditionally, so
  // without this guard that render throws instead of falling through cleanly.
  const myNotifications = member ? buildMyNotifications() : [];
  const unreadNotifCount = Math.max(0, myNotifications.length - lastSeenNotifCount);


  if (!member) {
    return <div style={{ padding:40, color:C.grey }}>Member not found.</div>;
  }

  const isPending = member.memberStatus === "pending"; // undefined/approved = full access
  const needsCompleteApplication = member.memberStatus === "incomplete";
  const paymentLock = memberPaymentLockInfo(member, allData);
  const [testerStep, setTesterStep] = useState("welcome");
  const [completeAppSubmitting, setCompleteAppSubmitting] = useState(false);
  const [completeAppError, setCompleteAppError] = useState("");
  const completeAppSubmittingRef = useRef(false);

  if (isPending) {
    return (
      <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white }}>
        <nav style={{ background:C.panel, borderBottom:"1px solid "+C.border, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Logo height={44}/>
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

  if (needsCompleteApplication) {
    // Pre-fill from whatever's already on the member record, plus the same
    // sensible defaults used throughout testing for anything that isn't
    // persisted anywhere yet (times/week, stroke ranking, membership choice) -
    // so re-testing the submit flow is just "click through and hit submit"
    // instead of retyping seven steps every time.
    const completeAppBlocks = allData.blocks || BLOCKS;
    const completeAppBestFree100 = (member.benchmarks||[]).filter(function(b){ return b.event==="100m Free"; }).sort(function(a,b){ return toSeconds(a.time)-toSeconds(b.time); })[0];
    const completeAppInitialValues = {
      name: member.name || "", email: member.email || "",
      mobile: member.mobile || "07700900000", dob: member.dob || "1995-01-01", gender: member.gender || "M",
      emergencyName: member.emergencyName || "Emergency Contact", emergencyPhone: member.emergencyPhone || "07700900001",
      swimmerType: member.level || "Pool", timesPerWeek: "3", swimmingSince: "1-3 years",
      pb100: completeAppBestFree100 ? completeAppBestFree100.time : "1:30.0",
      strokeRank1: member.specialty || "Freestyle", strokeRank2: "Backstroke", strokeRank3: "Breaststroke", strokeRank4: "Butterfly",
      benchmarkResponse: "confident",
      goals: member.goals || "", targetEvent: member.competitions || "", medical: member.medicalNotes || "",
      membershipType: "block", selectedBlockId: completeAppBlocks.length ? completeAppBlocks[0].id : "",
    };
    if (testerStep === "welcome") {
      return (
        <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", fontSize:14, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 20px" }}>
          <div style={{ maxWidth:480, width:"100%" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:24 }}>
              <Logo height={54}/>
            </div>
            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"28px 24px" }}>
              <span style={S.eyebrow}>A quick word first</span>
              <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:16 }}>Hi {member.name}!</h2>
              <p style={{ color:C.greyLight, lineHeight:1.8, marginBottom:16 }}>You're one of the first people trying out this new app for SwimFasterLondon - thank you for being part of it.</p>
              <p style={{ color:C.greyLight, lineHeight:1.8, marginBottom:16 }}>Think of yourself as a tester. If anything looks broken, feels confusing, or you spot something that could just be better, please tell your coach directly - that feedback genuinely shapes what gets built next.</p>
              <p style={{ color:C.greyLight, lineHeight:1.8, marginBottom:24 }}>Before you get full access, we just need a few details from you - it takes about 5 minutes.</p>
              <button onClick={function(){ setTesterStep("form"); }} style={{ display:"block", width:"100%", background:"#e01a1a", color:"#fff", border:"none", padding:"14px 16px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>Continue</button>
            </div>
            <div style={{ textAlign:"center", marginTop:16 }}>
              <button onClick={onLogout} style={{ background:"none", border:"none", color:C.grey, fontSize:12, cursor:"pointer", letterSpacing:"0.06em", textTransform:"uppercase" }}>Sign Out</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", fontSize:14, minHeight:"100vh" }}>
        <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,10,0.97)", borderBottom:"1px solid "+C.border, padding:"12px 20px" }}>
          <Logo height={50}/>
        </nav>
        <div style={{ padding:"32px 20px 60px", maxWidth:560, margin:"0 auto" }}>
          <span style={S.eyebrow}>Complete Your Profile</span>
          <h2 style={{ fontWeight:900, fontSize:"1.8rem", textTransform:"uppercase", marginBottom:8 }}>Just a Few Details</h2>
          <p style={{ color:C.grey, lineHeight:1.7, marginBottom:24 }}>Fill this in to get full access to your training plans, benchmarks, and everything else in the app.</p>
          <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:20 }}>
            {completeAppError && <div style={{ background:"rgba(224,26,26,0.1)", border:"1px solid #e01a1a", color:"#ff6b6b", padding:"10px 12px", borderRadius:2, fontSize:13, marginBottom:16 }}>{completeAppError}</div>}
            <fieldset disabled={completeAppSubmitting} style={{ border:"none", padding:0, margin:0, opacity:completeAppSubmitting?0.6:1 }}>
              {/* Pre-fill only applies to coach-created test accounts (is_test) -
                  a real swimmer must never see fabricated defaults (fake DOB,
                  gender, emergency contact) silently sitting in their own
                  safety-relevant fields. */}
              <ApplicationForm onSubmit={completeApplication} blocks={allData.blocks||BLOCKS} sessions={allData.sessions||[]} discountCodes={allData.discountCodes||[]} initialValues={member.isTest ? completeAppInitialValues : undefined}/>
            </fieldset>
            {completeAppSubmitting && <div style={{ textAlign:"center", fontSize:12, color:C.grey, marginTop:12 }}>Submitting...</div>}
          </div>
        </div>
      </div>
    );
  }

  if (paymentLock.locked) {
    return (
      <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white }}>
        <nav style={{ background:C.panel, borderBottom:"1px solid "+C.border, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Logo height={44}/>
          <button onClick={onLogout} style={{ background:"none", border:"none", color:C.grey, fontSize:12, cursor:"pointer", letterSpacing:"0.08em", textTransform:"uppercase" }}>Sign Out</button>
        </nav>
        <div style={{ padding:"32px 20px 60px", maxWidth:520, margin:"0 auto" }}>
          <div style={{ background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"20px 22px", marginBottom:24 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#ff6b6b", marginBottom:8 }}>Account locked - payment needed</div>
            <div style={{ fontSize:14, color:C.white, lineHeight:1.6, marginBottom:10 }}>Hi {member.name.split(" ")[0]}, you attended a session that hasn't been paid for yet, so your account is locked until payment is confirmed.</div>
            {paymentLock.unpaidPacks.map(function(p) {
              return (
                <div key={p.id} style={{ fontSize:13, color:"#ffb4b4", lineHeight:1.6, marginBottom:4 }}>
                  {"\u2022"} {p.allowedSessionIds ? p.sessionsTotal+" selected Fridays" : p.sessionsTotal+" session pack"} - {"\u00A3"}{(p.pricePaid!==undefined ? p.pricePaid : (p.pricePerSession*p.sessionsTotal)).toFixed(2)}
                </div>
              );
            })}
            {paymentLock.unpaidEnrolments.map(function(e, i) {
              return (
                <div key={i} style={{ fontSize:13, color:"#ffb4b4", lineHeight:1.6, marginBottom:4 }}>
                  {"\u2022"} {e.blockLabel} - {"\u00A3"}{e.pricePaid.toFixed(2)}
                </div>
              );
            })}
            <div style={{ fontSize:13, color:"#ccc", lineHeight:1.8, marginTop:14 }}>
              <div style={{ fontWeight:700, marginBottom:6 }}>Pay by bank transfer:</div>
              <div><span style={{ color:"#888" }}>Account name:</span> {BANK_DETAILS.accountName}</div>
              <div><span style={{ color:"#888" }}>Sort code:</span> {BANK_DETAILS.sortCode}</div>
              <div><span style={{ color:"#888" }}>Account number:</span> {BANK_DETAILS.accountNumber}</div>
            </div>
            <div style={{ fontSize:12, color:"#c9a876", marginTop:14, lineHeight:1.6 }}>Once your coach confirms payment has been received, your account will unlock automatically - no need to do anything else here.</div>
          </div>
        </div>
      </div>
    );
  }

  const bests = {};
  member.benchmarks.forEach(function(b){
    const s = toSeconds(b.time);
    if (!bests[b.event] || s < bests[b.event].secs) {
      bests[b.event] = Object.assign({}, b, { secs:s });
    }
  });

  const TABS = [["profile","Profile"],["notifications","Notifications"],["resources","Resources"],["progress","Progress"],["events","Events"],["calendar","Blocks"],["records","Records"],["messages","Messages"],["cake","Cake Your Marks"],["shop","Shop"],["pizza","Pizza Night"]];

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", color:C.white }}>
      <nav style={{ background:C.panel, borderBottom:"1px solid "+C.border, padding:"0 20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:12 }}>
          <Logo height={44}/>
          <button onClick={onLogout} style={{ background:"none", border:"none", color:C.grey, fontSize:12, cursor:"pointer", letterSpacing:"0.08em", textTransform:"uppercase" }}>Sign Out</button>
        </div>
        <div style={{ position:"relative" }}>
          <div ref={navBarRef} onScroll={function(e){ checkNavScroll(e.target); }} style={{ display:"flex", gap:0, marginTop:8, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
            {TABS.map(function(t){
              return (
                <button key={t[0]} onClick={function(){ setTab(t[0]); if(t[0]==="messages"){ markMemberMessagesSeenNow(); } if(t[0]==="notifications"){ setLastSeenNotifCount(myNotifications.length); } }}
                  style={{ background:"none", border:"none", borderBottom:tab===t[0] ? "2px solid "+C.red : "2px solid transparent", color:tab===t[0] ? C.white : C.grey, padding:"10px 12px 8px", fontSize:11, fontWeight:tab===t[0]?700:400, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                  {t[1]}{t[0]==="messages" && unreadMsgCount > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{unreadMsgCount}</span>}{t[0]==="notifications" && unreadNotifCount > 0 && <span style={{ marginLeft:5, background:C.red, color:C.white, borderRadius:"50%", fontSize:9, fontWeight:900, padding:"1px 5px" }}>{unreadNotifCount}</span>}
                </button>
              );
            })}
          </div>
          {navScrollState.right && (
            <div onClick={function(){ if (navBarRef.current) { navBarRef.current.scrollTo({ left: navBarRef.current.scrollWidth, behavior:"smooth" }); } }} style={{ position:"absolute", top:0, right:0, bottom:0, width:44, background:"linear-gradient(to right, transparent, "+C.panel+" 65%)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:6 }}>
              <span style={{ color:C.grey, fontSize:16, fontWeight:700 }}>{"\u203A"}</span>
            </div>
          )}
          {navScrollState.left && (
            <div onClick={function(){ if (navBarRef.current) { navBarRef.current.scrollTo({ left:0, behavior:"smooth" }); } }} style={{ position:"absolute", top:0, left:0, bottom:0, width:44, background:"linear-gradient(to left, transparent, "+C.panel+" 65%)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"flex-start", paddingLeft:6 }}>
              <span style={{ color:C.grey, fontSize:16, fontWeight:700 }}>{"\u2039"}</span>
            </div>
          )}
        </div>
      </nav>

      <div style={{ padding:"24px 20px" }}>
        {(function() {
          const pendingPacks = (allData.sessionPacks||[]).filter(function(p){ return p.memberId === member.id && p.paymentStatus === "pending"; });
          const pendingEnrolments = (member.blockEnrolments||[]).filter(function(e){ return e.paymentStatus === "pending"; });
          const count = pendingPacks.length + pendingEnrolments.length;
          if (count === 0) return null;
          return (
            <div onClick={function(){ setTab("calendar"); }} style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"12px 16px", marginBottom:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
              <div style={{ fontSize:13, color:"#f59e0b", fontWeight:700 }}>{"\u26A0"} You have {count} payment{count!==1?"s":""} awaiting confirmation - tap to view and pay</div>
              <span style={{ fontSize:13, color:"#f59e0b" }}>{"\u203A"}</span>
            </div>
          );
        })()}
        {tab === "profile" && (
          <ProfileTab member={member} raceResults={raceResults} sessionPacks={allData.sessionPacks} onUpdate={function(updated){
            setMemberEdits(updated);
            if (refreshData) api.updateMemberFields(memberId, updated).then(refreshData).catch(function(err) { window.alert("Couldn't save profile: " + err.message); });
          }} onSaveSettings={saveSettings} onDeleteAccount={deleteMyAccount}/>
        )}

        {tab === "notifications" && (
          <div>
            <span style={S.eyebrow}>Activity</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:20 }}>Notifications</h2>
            {myNotifications.length === 0 ? (
              <p style={{ color:C.grey }}>Nothing new yet.</p>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                {myNotifications.map(function(n) {
                  return (
                    <div key={n.id} style={{ background:C.panel, border:"1px solid "+C.border, borderLeft:"3px solid "+n.color, borderRadius:2, padding:"12px 16px" }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:n.color, marginBottom:3 }}>{n.icon}</div>
                      <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:n.detail?2:0 }}>{n.title}</div>
                      {n.detail && <div style={{ fontSize:12, color:C.grey, lineHeight:1.5 }}>{n.detail}</div>}
                      <div style={{ fontSize:11, color:C.greyDark, marginTop:4 }}>{n.date}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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
                  member.benchmarks.slice().sort(function(a,b){ return b.date.localeCompare(a.date); }).map(function(b, i){
                    return (
                      <div key={i} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px", marginBottom:2 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom: (b.strokeCount1||b.strokeCount2||b.split50) ? 10 : 0 }}>
                          <div>
                            <div style={{ fontWeight:600, fontSize:14, marginBottom:2, color:EVENT_COLORS[b.event]||C.red }}>{b.event}</div>
                            <div style={{ fontSize:12, color:C.grey }}>{b.date}</div>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                            <span style={{ fontSize:10, fontWeight:700, color:C.grey }}>({(b.startType||"push")==="block"?"Dive":"Push"})</span>
                            <div style={{ fontWeight:900, fontSize:"1.4rem", color:C.white, fontFamily:"monospace" }}>{b.time}</div>
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
                        {(b.splits && b.splits.length > 0) && (
                          <div style={{ marginTop:10 }}>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:6 }}>Splits by length</div>
                            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                              {b.splits.map(function(sp, si) {
                                if (!sp) return null;
                                const sc = (b.strokeCounts && b.strokeCounts[si]) ? b.strokeCounts[si] : null;
                                return (
                                  <div key={si} style={{ background:C.bg, padding:"4px 10px", borderRadius:2, border:"1px solid "+C.border, textAlign:"center" }}>
                                    <div style={{ fontSize:9, color:C.grey, marginBottom:2 }}>L{si+1}</div>
                                    <div style={{ fontWeight:700, fontSize:13, color:"#3b82f6", fontFamily:"monospace" }}>{sp}</div>
                                    {sc && <div style={{ fontSize:10, color:"#8b5cf6", marginTop:1 }}>{sc} str</div>}
                                  </div>
                                );
                              })}
                            </div>
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
          <MyEventsPage
            member={member}
            plannedEvents={plannedEvents}
            onSave={function(next){ setPlannedEvents(next); }}
            allMembers={allData.members}
            raceLogContent={<RaceReportPage member={member} raceResults={raceResults} onSave={function(next){ setRaceResults(next); }}/>}
          />
        )}

        {tab === "calendar" && (
          <BlocksCalendarPage member={member} allData={allData} onSignUp={signUpForBlock} onSetAttendanceIntent={persistAttendanceIntent} onBuySessionPack={buySessionPack}/>
        )}


        {tab === "resources" && (
          <div>
            <span style={S.eyebrow}>Members' Area</span>
            <h2 style={{ fontWeight:900, fontSize:"1.6rem", textTransform:"uppercase", marginBottom:4 }}>Resources</h2>
            <p style={{ fontSize:13, color:C.grey, marginBottom:20 }}>Everything you need to get started.</p>

            {(function() {
              const publishedReports = Object.keys(member.blockReports||{}).filter(function(bid) { return member.blockReports[bid].published; });
              const feedbackCount = (member.sessionFeedback||[]).length + (member.generalComments||[]).length;
              if (publishedReports.length===0 && feedbackCount===0) return null;
              return (
                <div style={{ background:C.panel, border:"1px solid #3b82f6", borderRadius:2, marginBottom:2, overflow:"hidden" }}>
                  <div onClick={function(){ setShowCoachFeedback(!showCoachFeedback); }} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>Coach Feedback &amp; Reports</div>
                      <div style={{ fontSize:12, color:C.grey, lineHeight:1.5 }}>Session feedback, comments, and your block progress reports.</div>
                    </div>
                    <span style={{ fontSize:13, color:C.grey, flexShrink:0 }}>{showCoachFeedback?"-":"+"}</span>
                  </div>
                  {showCoachFeedback && (
                    <div onClick={function(e){ e.stopPropagation(); }} style={{ borderTop:"1px solid "+C.border, padding:"18px 16px" }}>
                      {(member.sessionFeedback||[]).length > 0 || (member.generalComments||[]).length > 0 ? (
                        <div style={{ marginBottom: publishedReports.length>0 ? 20 : 0 }}>
                          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#3b82f6", marginBottom:10 }}>Feedback &amp; comments</div>
                          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                            {(member.sessionFeedback||[]).slice().sort(function(a,b){ return b.createdDate.localeCompare(a.createdDate); }).map(function(f) {
                              return (
                                <div key={f.id} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px" }}>
                                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#3b82f6", marginBottom:5 }}>Session - {f.date}</div>
                                  <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>{f.text}</div>
                                  {f.audio && <audio controls src={f.audio} style={{ height:32, width:"100%", marginTop:8 }}/>}
                                </div>
                              );
                            })}
                            {(member.generalComments||[]).slice().sort(function(a,b){ return b.createdDate.localeCompare(a.createdDate); }).map(function(c) {
                              return (
                                <div key={c.id} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"12px 14px" }}>
                                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.grey, marginBottom:5 }}>{c.createdDate}</div>
                                  <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.6 }}>{c.text}</div>
                                  {c.audio && <audio controls src={c.audio} style={{ height:32, width:"100%", marginTop:8 }}/>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                      {publishedReports.length > 0 && (
                        <div>
                          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.green, marginBottom:10 }}>Block progress reports</div>
                          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                            {publishedReports.map(function(bid) {
                              const b = (allData.blocks||BLOCKS).find(function(x) { return x.id===bid; });
                              if (!b) return null;
                              const stats = computeBlockReportStats(member, b, allData.sessions);
                              const report = member.blockReports[bid];
                              return (
                                <div key={bid} style={{ background:C.bg, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px" }}>
                                  <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:10 }}>{b.label}</div>
                                  <AthleteBlockReport member={member} block={b} stats={stats} report={report} isCoach={false}/>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

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

            <div onClick={function(){ setShowDrillLibrary(!showDrillLibrary); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, marginTop:2, marginBottom:2, overflow:"hidden", cursor:"pointer" }}>
              <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>Drill library</div>
                  <div style={{ fontSize:12, color:C.grey, lineHeight:1.5 }}>Stroke-by-stroke drill videos with coach notes, assigned personally by your coach.</div>
                </div>
                <span style={{ fontSize:13, color:C.grey, flexShrink:0 }}>{showDrillLibrary?"-":"+"}</span>
              </div>
              {showDrillLibrary && (
                <div onClick={function(e){ e.stopPropagation(); }} style={{ borderTop:"1px solid "+C.border, padding:"18px 16px" }}>
                  <DrillLibraryPage isCoach={false} drills={allData.drillLibrary || DRILLS_DATA}/>
                </div>
              )}
            </div>

            <div onClick={function(){ setShowConditioningPlan(!showConditioningPlan); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, marginTop:2, marginBottom:2, overflow:"hidden", cursor:"pointer" }}>
              <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white, marginBottom:3 }}>Beginner conditioning plan</div>
                  <div style={{ fontSize:12, color:C.grey, lineHeight:1.5 }}>A gentle 4-week plan to build aerobic base and confidence in the water.</div>
                </div>
                <span style={{ fontSize:13, color:C.grey, flexShrink:0 }}>{showConditioningPlan?"-":"+"}</span>
              </div>
              {showConditioningPlan && (
                <div onClick={function(e){ e.stopPropagation(); }} style={{ borderTop:"1px solid "+C.border, padding:"18px 16px" }}>
                  <ConditioningPlanPage/>
                </div>
              )}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:2, marginTop:2 }}>
              {[
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
          </div>
        )}

        {tab === "records" && (
          <HallOfRecords records={allData.hallOfRecords || []} members={allData.members} blocks={allData.blocks || BLOCKS} isCoach={false} onUpdate={function(){}} currentMemberId={memberId}/>
        )}

        {tab === "messages" && (
          <MessagesPage currentUserId={memberId} currentUserName={displayName(member)} isCoach={false} messages={allData.messages} members={allData.members} coaches={allData.coaches} onSend={sendMemberMessage}/>
        )}

        {tab === "cake" && (
          <CakeYourMarksPage
            member={member}
            allMembers={allData.members}
            bakes={allData.bakes||[]}
            isCoach={!!member.isBaker}
            onAddBake={function(form){
              if (!member.isBaker || !refreshData) return;
              api.addBake(form, THE_BAKER).then(refreshData).catch(function(err) { window.alert("Couldn't add bake: " + err.message); });
            }}
            onDeleteBake={function(bakeId){
              if (!member.isBaker || !refreshData) return;
              api.deleteBake(bakeId).then(refreshData).catch(function(err) { window.alert("Couldn't delete bake: " + err.message); });
            }}
            onUpdateBakePhoto={function(bakeId, photo){
              if (!member.isBaker || !refreshData) return;
              api.updateBakePhoto(bakeId, photo).then(refreshData).catch(function(err) { window.alert("Couldn't update photo: " + err.message); });
            }}
            onRate={rateBake}
            onSkipBake={skipBake}
          />
        )}

        {tab === "shop" && (
          <div>
            <ShopPage items={allData.shopItems||[]} onReserve={reserveShopItemAsMember} embedded={true} defaultName={member.name} defaultContact={member.email}/>
          </div>
        )}

        {tab === "pizza" && (
          <PizzaNightPage orders={allData.pizzaOrders||[]} deadline={allData.pizzaDeadline} deliveryFee={allData.pizzaDeliveryFee||0} onSubmitOrder={submitPizzaOrderAsMember} onMarkPaid={markPizzaPaidAsMember} onClearUnpaid={function(){}} embedded={true} defaultName={member.name}/>
        )}

      </div>

    </div>
  );
}

function ApplicationForm({ onSubmit, blocks, sessions, discountCodes, initialValues }) {
  const EMPTY = {
    name:"", email:"", mobile:"", dob:"", gender:"",
    password:"", confirmPassword:"",
    emergencyName:"", emergencyPhone:"",
    swimmerType:"", timesPerWeek:"", swimmingSince:"",
    pb100:"", pbEstimated:false, strokeRank1:"", strokeRank2:"", strokeRank3:"", strokeRank4:"", kickRating:"",
    benchmarkResponse:"", benchmarkAvg:"", benchmarkConfident:false, benchmarkStoppedAt:"",
    goals:"", targetEvent:"",
    medical:"", extra:"",
    membershipType:"block", selectedBlockId:"", discountCodeInput:"", privacyConsent:false,
    packType:"persession", selectedSessionDates:[],
  };
  const [step, setStep] = useState(0);
  // initialValues lets a caller pre-fill the form (used only for the
  // "Complete Your Profile" test-swimmer flow, so re-testing submission
  // doesn't mean re-typing all seven steps every time) - the public
  // "Apply for a Spot" signup never passes this, so real applicants still
  // always start from a blank form.
  const [form, setForm] = useState(function() { return Object.assign({}, EMPTY, initialValues||{}); });

  const STEPS = ["Try the benchmark","Your details","Swimming background","Current ability","Membership","Goals & health","Review"];

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
  function handleBenchResponse(resp) { setF("benchmarkResponse", resp); }
  function handleBenchAvg(e) { setF("benchmarkAvg", e.target.value); }
  function handleBenchStoppedAt(e) { setF("benchmarkStoppedAt", e.target.value); }
  function handleGoals(e) { setF("goals", e.target.value); }
  function handleTargetEvent(e) { setF("targetEvent", e.target.value); }
  function handleMedical(e) { setF("medical", e.target.value); }
  function handleExtra(e) { setF("extra", e.target.value); }
  function handleMembershipType(t) { setF("membershipType", t); }
  function handlePackType(t) { setF("packType", t); }
  function toggleSessionDate(sessionId) {
    setF("selectedSessionDates", form.selectedSessionDates.indexOf(sessionId) !== -1
      ? form.selectedSessionDates.filter(function(id){ return id !== sessionId; })
      : form.selectedSessionDates.concat([sessionId]));
  }
  function handleSelectedBlock(id) { setF("selectedBlockId", id); }
  function handleDiscountInput(e) { setF("discountCodeInput", e.target.value.toUpperCase()); }

  const openBlocks = (blocks||[]).filter(function(b) { return b.isOpen; });

  function sessionsForBlock(blockId) {
    const b = (blocks||[]).find(function(x) { return x.id===blockId; });
    if (!b) return { total:0, remaining:0 };
    const inRange = (sessions||[]).filter(function(s) {
      return s.date >= b.startDate && s.date <= b.endDate && s.status !== "cancelled";
    });
    const today = new Date().toISOString().slice(0,10);
    const remaining = inRange.filter(function(s) { return s.date >= today; });
    return { total: inRange.length || 1, remaining: remaining.length };
  }

  function findDiscountCode(codeStr) {
    return (discountCodes||[]).find(function(c) { return c.active && c.code === codeStr; });
  }

  function calcBlockPrice(blockId) {
    const b = (blocks||[]).find(function(x) { return x.id===blockId; });
    if (!b) return 0;
    const { total, remaining } = sessionsForBlock(blockId);
    const isMidway = remaining < total && remaining > 0;
    let price = isMidway ? (b.priceFull / total) * remaining : b.priceFull;
    return { price: Math.round(price * 100) / 100, isMidway: isMidway, remaining: remaining, total: total };
  }

  function calcYearPrice() {
    const fullYearTotal = (blocks||[]).reduce(function(sum, b) { return sum + b.priceFull; }, 0);
    const discounted = fullYearTotal * (1 - YEAR_PLAN.discountPercent/100);
    return Math.round(discounted * 100) / 100;
  }

  function perSessionRate() {
    const emailLower = (form.email||"").trim().toLowerCase();
    if (SPECIAL_PER_SESSION_RATES[emailLower] !== undefined) return SPECIAL_PER_SESSION_RATES[emailLower];
    return SESSION_PACK_PER_SESSION_PRICE;
  }

  function upcomingFridaySessions() {
    const today = new Date().toISOString().slice(0,10);
    return (sessions||[])
      .filter(function(s) { return s.date >= today && s.status !== "cancelled"; })
      .sort(function(a,b) { return a.date.localeCompare(b.date); });
  }

  function calcPackExpiryDate() {
    if (form.packType === "persession") {
      if (form.selectedSessionDates.length === 0) return null;
      const selectedSessions = form.selectedSessionDates
        .map(function(id){ return (sessions||[]).find(function(s){ return s.id === id; }); })
        .filter(Boolean)
        .sort(function(a,b){ return a.date.localeCompare(b.date); });
      if (selectedSessions.length === 0) return null;
      const lastSession = selectedSessions[selectedSessions.length-1];
      const d = new Date(lastSession.date);
      d.setDate(d.getDate() + 1);
      return d.toISOString().slice(0,10);
    }
    const d = new Date();
    d.setDate(d.getDate() + 12*7);
    return d.toISOString().slice(0,10);
  }

  function calcPackPrice() {
    if (form.packType === "pack10") {
      // The 10x£200 bundle already reflects a £20/session rate - if someone qualifies
      // for an even better special rate, honour that instead of the flat bundle price.
      const rate = perSessionRate();
      return rate < 20 ? rate * SESSION_PACK_10.sessions : SESSION_PACK_10.price;
    }
    return form.selectedSessionDates.length * perSessionRate();
  }

  function calcFinalPrice() {
    let base = form.membershipType === "year" ? calcYearPrice() : (form.membershipType === "pack" ? calcPackPrice() : (calcBlockPrice(form.selectedBlockId).price || 0));
    const code = findDiscountCode(form.discountCodeInput);
    if (code && (code.appliesTo === form.membershipType)) {
      base = code.type === "percent" ? base * (1 - code.value/100) : Math.max(0, base - code.value);
    }
    return Math.round(base * 100) / 100;
  }

  const SWIMMER_TYPES = ["Masters","Pool","Open Water","Triathlete","Fitness Swimmer","Beginner","Returning to Swimming","Public Lane Swimmer","Former Competitive Swimmer","Other"];
  const STROKES = ["Freestyle","Backstroke","Breaststroke","Butterfly","IM / mixed"];

  const inputStyle = { width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };
  const labelStyle = { display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#888", marginBottom:6 };
  const btnRed = { background:"#e01a1a", color:"#fff", padding:"11px 22px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" };
  const btnGhost = { background:"transparent", border:"1px solid #333", color:"#bbb", padding:"11px 22px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 };

  function isStepValid() {
    if (step===0) return !!form.benchmarkResponse;
    if (step===1) return form.name.trim() && form.email.trim() && form.mobile.trim() && form.dob.trim() && !!form.gender && (calcAge(form.dob)===null || calcAge(form.dob)>=18) && form.password.length>=6 && form.password===form.confirmPassword;
    if (step===2) return form.swimmerType && form.timesPerWeek && form.swimmingSince;
    if (step===3) return form.pb100.trim() && form.strokeRank1 && form.strokeRank2 && form.strokeRank3 && form.strokeRank4;
    if (step===4) return form.membershipType==="year" || (form.membershipType==="block" && !!form.selectedBlockId) || (form.membershipType==="pack" && (form.packType==="pack10" || form.selectedSessionDates.length>0));
    return true;
  }

  function handleNext() {
    if (!isStepValid()) return;
    next();
  }

  function handleSubmitForm() {
    if (!form.privacyConsent) return;
    const code = findDiscountCode(form.discountCodeInput);
    const validCode = code && code.appliesTo === form.membershipType ? code.code : null;
    const isDateTied = form.membershipType==="pack" && form.packType==="persession";
    const packSessionCount = form.membershipType==="pack" ? (form.packType==="pack10" ? SESSION_PACK_10.sessions : form.selectedSessionDates.length) : null;
    const packLabel = form.packType==="pack10" ? (packSessionCount+" session pack") : (packSessionCount+" selected Friday"+(packSessionCount!==1?"s":""));
    const enrolment = {
      type: form.membershipType,
      blockId: form.membershipType==="block" ? form.selectedBlockId : null,
      blockLabel: form.membershipType==="year" ? YEAR_PLAN.label : (form.membershipType==="pack" ? packLabel : (((blocks||[]).find(function(b){ return b.id===form.selectedBlockId; })||{}).label || "")),
      pricePaid: calcFinalPrice(),
      discountCode: validCode,
      joinedMidway: form.membershipType==="block" ? calcBlockPrice(form.selectedBlockId).isMidway : false,
      packType: form.membershipType==="pack" ? form.packType : null,
      packSessionCount: packSessionCount,
      packPricePerSession: form.membershipType==="pack" ? perSessionRate() : null,
      packSelectedSessionIds: isDateTied ? form.selectedSessionDates : null,
      paymentStatus: "pending",
      signedUpDate: new Date().toISOString().slice(0,10),
    };
    onSubmit(Object.assign({}, form, { blockEnrolment: enrolment }));
  }

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
        <div>
          <div style={{ background:"#111", border:"1px solid #262626", borderRadius:2, padding:"16px 18px", marginBottom:14 }}>
            <div style={{ fontWeight:700, fontSize:15, color:"#fff", marginBottom:8 }}>Before we start - try this quick test</div>
            <div style={{ fontSize:13, color:"#aaa", lineHeight:1.7, marginBottom:10 }}>
              The set is <strong style={{ color:"#fff" }}>6 x 100m Freestyle, leaving every 2 minutes</strong>. It helps us understand your current fitness so we can place you in the right lane from day one.
            </div>
            <div style={{ fontSize:13, color:"#aaa", lineHeight:1.7 }}>
              We'd really encourage you to give it a go if you can - head to the pool and try it before finishing this application. There's no rush and no pressure, and it's completely fine if you don't finish it. If you already know you can comfortably do this set, you can let us know that below instead.
            </div>
          </div>

          <div style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"14px 16px", marginBottom:20 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.amber, marginBottom:5 }}>A pacing tip</div>
            <div style={{ fontSize:13, color:"#c9a876", lineHeight:1.7 }}>
              Don't go out too fast on the first one - you'll likely pay for it later in the set. Aim for a pace you can hold steady across all six, rather than a fast first rep followed by a struggle to finish.
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
            <div onClick={function(){ handleBenchResponse("completed"); }}
              style={{ background: form.benchmarkResponse==="completed" ? "rgba(224,26,26,0.08)" : "#111", border:"1px solid "+(form.benchmarkResponse==="completed" ? "#e01a1a" : "#262626"), borderRadius:2, padding:"14px 16px", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:form.benchmarkResponse==="completed"?10:0 }}>
                <div style={{ width:18, height:18, borderRadius:"50%", border:"1px solid #666", background:form.benchmarkResponse==="completed"?"#e01a1a":"transparent", flexShrink:0 }}/>
                <span style={{ fontWeight:700, fontSize:14, color:"#fff" }}>I completed it</span>
              </div>
              {form.benchmarkResponse==="completed" && (
                <div onClick={function(e){ e.stopPropagation(); }} style={{ marginTop:4 }}>
                  <label style={labelStyle}>Average 100m time across the set</label>
                  <input value={form.benchmarkAvg} onChange={handleBenchAvg} placeholder="e.g. 1:16.0" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"monospace" }}/>
                </div>
              )}
            </div>

            <div onClick={function(){ handleBenchResponse("confident"); }}
              style={{ background: form.benchmarkResponse==="confident" ? "rgba(224,26,26,0.08)" : "#111", border:"1px solid "+(form.benchmarkResponse==="confident" ? "#e01a1a" : "#262626"), borderRadius:2, padding:"14px 16px", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:18, height:18, borderRadius:"50%", border:"1px solid #666", background:form.benchmarkResponse==="confident"?"#e01a1a":"transparent", flexShrink:0 }}/>
                <span style={{ fontWeight:700, fontSize:14, color:"#fff" }}>Easy, no problem</span>
              </div>
              <div style={{ fontSize:12, color:"#888", marginTop:4, marginLeft:28 }}>I know I can comfortably do this set - no need for me to test it.</div>
            </div>

            <div onClick={function(){ handleBenchResponse("notcompleted"); }}
              style={{ background: form.benchmarkResponse==="notcompleted" ? "rgba(224,26,26,0.08)" : "#111", border:"1px solid "+(form.benchmarkResponse==="notcompleted" ? "#e01a1a" : "#262626"), borderRadius:2, padding:"14px 16px", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:form.benchmarkResponse==="notcompleted"?10:0 }}>
                <div style={{ width:18, height:18, borderRadius:"50%", border:"1px solid #666", background:form.benchmarkResponse==="notcompleted"?"#e01a1a":"transparent", flexShrink:0 }}/>
                <span style={{ fontWeight:700, fontSize:14, color:"#fff" }}>I couldn't complete it</span>
              </div>
              {form.benchmarkResponse==="notcompleted" && (
                <div onClick={function(e){ e.stopPropagation(); }} style={{ marginTop:4 }}>
                  <label style={labelStyle}>Which repeat did you get to? (optional)</label>
                  <input value={form.benchmarkStoppedAt} onChange={handleBenchStoppedAt} placeholder="e.g. Made it through 4 of the 6" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}/>
                  <div style={{ fontSize:11, color:"#666", marginTop:6, lineHeight:1.6 }}>That's completely fine - it just helps us understand where to start with you.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {step===1 && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={labelStyle}>Full name</label>
            <input value={form.name} onChange={handleName} placeholder="Your full name" style={inputStyle}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={labelStyle}>Email address</label>
              <input type="email" autoComplete="email" value={form.email} onChange={handleEmail} placeholder="your@email.com" style={inputStyle}/>
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
          <div>
            <label style={labelStyle}>Gender</label>
            <div style={{ display:"flex", gap:8 }}>
              <button type="button" onClick={function(){ setF("gender","M"); }} style={form.gender==="M" ? btnRed : btnGhost}>Male</button>
              <button type="button" onClick={function(){ setF("gender","F"); }} style={form.gender==="F" ? btnRed : btnGhost}>Female</button>
            </div>
            <div style={{ fontSize:11, color:"#666", marginTop:6, lineHeight:1.6 }}>Used for gender-specific leaderboards and records.</div>
          </div>
          <div style={{ borderTop:"1px solid #262626", paddingTop:14, marginTop:4 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:10 }}>Set up your account</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" autoComplete="new-password" value={form.password} onChange={handlePassword} placeholder="Choose a password" style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Confirm password</label>
                <input type="password" autoComplete="new-password" value={form.confirmPassword} onChange={handleConfirmPassword} placeholder="Re-enter password" style={inputStyle}/>
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

      {step===2 && (
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

      {step===3 && (
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

      {step===4 && (
        <div>
          <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
            <button onClick={function(){ handleMembershipType("block"); }} style={form.membershipType==="block" ? btnRed : btnGhost}>Single block</button>
            <button onClick={function(){ handleMembershipType("year"); }} style={form.membershipType==="year" ? btnRed : btnGhost}>Full year (save {YEAR_PLAN.discountPercent}%)</button>
            <button onClick={function(){ handleMembershipType("pack"); }} style={form.membershipType==="pack" ? btnRed : btnGhost}>Pay as you go</button>
          </div>

          {form.membershipType==="pack" && (
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Choose how you'd like to pay</label>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
                <div onClick={function(){ handlePackType("persession"); }}
                  style={{ background: form.packType==="persession" ? "rgba(224,26,26,0.08)" : "#111", border:"1px solid "+(form.packType==="persession"?"#e01a1a":"#262626"), borderRadius:2, padding:"14px 16px", cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginBottom:form.packType==="persession"?12:0 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:"#fff" }}>Pay per session</div>
                      <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{"\u00A3"}{perSessionRate().toFixed(2)} per session - pick the Fridays you're coming</div>
                    </div>
                  </div>
                  {form.packType==="persession" && (
                    <div onClick={function(e){ e.stopPropagation(); }}>
                      <label style={labelStyle}>Select the Fridays you want to pay for</label>
                      {upcomingFridaySessions().length===0 ? (
                        <div style={{ fontSize:13, color:"#888", padding:"12px 0" }}>No upcoming sessions are scheduled yet. Please check back soon or contact the coach.</div>
                      ) : (
                        <div style={{ display:"flex", flexDirection:"column", gap:6, maxHeight:280, overflowY:"auto" }}>
                          {upcomingFridaySessions().map(function(s) {
                            const checked = form.selectedSessionDates.indexOf(s.id) !== -1;
                            return (
                              <div key={s.id} onClick={function(){ toggleSessionDate(s.id); }}
                                style={{ display:"flex", alignItems:"center", gap:10, background: checked ? "rgba(224,26,26,0.08)" : "#161616", border:"1px solid "+(checked?"#e01a1a":"#333"), borderRadius:2, padding:"10px 12px", cursor:"pointer" }}>
                                <div style={{ width:18, height:18, borderRadius:3, border:"2px solid "+(checked?"#e01a1a":"#555"), background:checked?"#e01a1a":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                  {checked && <span style={{ color:"#fff", fontSize:11, fontWeight:900, lineHeight:1 }}>{"\u2713"}</span>}
                                </div>
                                <div style={{ flex:1 }}>
                                  <div style={{ fontSize:13, color:"#fff", fontWeight:700 }}>{s.date}</div>
                                  {s.focus && <div style={{ fontSize:11, color:"#888" }}>{s.focus}</div>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {form.selectedSessionDates.length > 0 && (
                        <div style={{ fontSize:12, color:"#22c55e", marginTop:10 }}>{form.selectedSessionDates.length} session{form.selectedSessionDates.length!==1?"s":""} selected - {"\u00A3"}{(form.selectedSessionDates.length*perSessionRate()).toFixed(2)}</div>
                      )}
                    </div>
                  )}
                </div>
                <div onClick={function(){ handlePackType("pack10"); }}
                  style={{ background: form.packType==="pack10" ? "rgba(224,26,26,0.08)" : "#111", border:"1px solid "+(form.packType==="pack10"?"#e01a1a":"#262626"), borderRadius:2, padding:"14px 16px", cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:"#fff" }}>10 sessions</div>
                      <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{"\u00A3"}{(perSessionRate()<20?perSessionRate():20).toFixed(2)} per session</div>
                    </div>
                    <div style={{ fontWeight:900, fontSize:16, color:"#f59e0b" }}>{"\u00A3"}{(perSessionRate()<20 ? perSessionRate()*SESSION_PACK_10.sessions : SESSION_PACK_10.price).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {form.membershipType==="block" && (
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Choose your block</label>
              {openBlocks.length===0 ? (
                <div style={{ fontSize:13, color:"#888", padding:"12px 0" }}>No blocks are currently open for sign-up. Please check back soon or contact the coach.</div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {openBlocks.map(function(b) {
                    const { price, isMidway, remaining, total } = calcBlockPrice(b.id);
                    const selected = form.selectedBlockId === b.id;
                    return (
                      <div key={b.id} onClick={function(){ handleSelectedBlock(b.id); }}
                        style={{ background: selected ? "rgba(224,26,26,0.08)" : "#111", border:"1px solid "+(selected?"#e01a1a":"#262626"), borderRadius:2, padding:"14px 16px", cursor:"pointer" }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                          <div>
                            <div style={{ fontWeight:700, fontSize:14, color:"#fff" }}>{b.label}</div>
                            <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{b.startDate} to {b.endDate}</div>
                          </div>
                          <div style={{ textAlign:"right" }}>
                            <div style={{ fontWeight:900, fontSize:16, color:"#f59e0b" }}>{"\u00A3"}{price.toFixed(2)}</div>
                            {isMidway && <div style={{ fontSize:10, color:"#3b82f6", marginTop:2 }}>Pro-rata - {remaining}/{total} sessions left</div>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {form.membershipType==="year" && (
            <div style={{ background:"#111", border:"1px solid #262626", borderRadius:2, padding:"14px 16px", marginBottom:16 }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#fff", marginBottom:4 }}>{YEAR_PLAN.label}</div>
              <div style={{ fontSize:12, color:"#888", marginBottom:10 }}>All four quarterly blocks, {YEAR_PLAN.discountPercent}% off the combined price.</div>
              <div style={{ fontWeight:900, fontSize:18, color:"#f59e0b" }}>{"\u00A3"}{calcYearPrice().toFixed(2)}</div>
            </div>
          )}

          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>Discount code (optional)</label>
            <input value={form.discountCodeInput} onChange={handleDiscountInput} placeholder="e.g. WELCOME10" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", textTransform:"uppercase" }}/>
            {form.discountCodeInput && !findDiscountCode(form.discountCodeInput) && (
              <div style={{ fontSize:11, color:"#ff6b6b", marginTop:6 }}>That code isn't valid or has expired.</div>
            )}
            {form.discountCodeInput && findDiscountCode(form.discountCodeInput) && findDiscountCode(form.discountCodeInput).appliesTo !== form.membershipType && (
              <div style={{ fontSize:11, color:"#ff6b6b", marginTop:6 }}>That code doesn't apply to this membership type.</div>
            )}
            {form.discountCodeInput && findDiscountCode(form.discountCodeInput) && findDiscountCode(form.discountCodeInput).appliesTo === form.membershipType && (
              <div style={{ fontSize:11, color:"#22c55e", marginTop:6 }}>Code applied!</div>
            )}
          </div>

          {(form.membershipType==="year" || (form.membershipType==="block" && form.selectedBlockId) || (form.membershipType==="pack" && (form.packType==="pack10" || form.selectedSessionDates.length>0))) && (
            <div style={{ background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"14px 16px", marginBottom:16, display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:14, flexWrap:"wrap" }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#888", marginBottom:4 }}>Total due</div>
                <div style={{ fontWeight:900, fontSize:22, color:"#22c55e" }}>{"\u00A3"}{calcFinalPrice().toFixed(2)}</div>
              </div>
              {form.membershipType==="pack" && calcPackExpiryDate() && (
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#888", marginBottom:4 }}>Expires</div>
                  <div style={{ fontWeight:700, fontSize:14, color:"#ccc" }}>{calcPackExpiryDate()}</div>
                </div>
              )}
            </div>
          )}

          <div style={{ background:"#111", border:"1px solid #262626", borderRadius:2, padding:"14px 16px" }}>
            <div style={labelStyle}>Payment - by bank transfer</div>
            <div style={{ fontSize:13, color:"#ccc", lineHeight:1.8 }}>
              <div><span style={{ color:"#888" }}>Account name:</span> {BANK_DETAILS.accountName}</div>
              <div><span style={{ color:"#888" }}>Sort code:</span> {BANK_DETAILS.sortCode}</div>
              <div><span style={{ color:"#888" }}>Account number:</span> {BANK_DETAILS.accountNumber}</div>
            </div>
            <div style={{ fontSize:11, color:"#666", marginTop:8, lineHeight:1.6 }}>Please use your name as the payment reference. We'll confirm your spot once payment is received.</div>
          </div>
        </div>
      )}

      {step===5 && (
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

      {step===6 && (
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

          <div style={{ background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:16, marginBottom:16 }}>
            <div style={labelStyle}>Membership</div>
            <div style={{ fontSize:14, color:"#fff", marginBottom:6 }}>
              {form.membershipType==="year" ? YEAR_PLAN.label : (form.membershipType==="pack" ? (form.packType==="pack10" ? (SESSION_PACK_10.sessions+" session pack") : (form.selectedSessionDates.length+" selected Friday"+(form.selectedSessionDates.length!==1?"s":""))) : ((blocks||[]).find(function(b){ return b.id===form.selectedBlockId; })||{}).label)}
            </div>
            {form.discountCodeInput && findDiscountCode(form.discountCodeInput) && findDiscountCode(form.discountCodeInput).appliesTo === form.membershipType && (
              <div style={{ fontSize:12, color:"#3b82f6", marginBottom:6 }}>Discount code {form.discountCodeInput} applied</div>
            )}
            <div style={{ fontWeight:900, fontSize:20, color:"#22c55e" }}>{"\u00A3"}{calcFinalPrice().toFixed(2)}</div>
          </div>

          <div style={{ fontSize:12, color:"#666", lineHeight:1.7, marginBottom:16 }}>
            By submitting, you confirm the information above is accurate to the best of your knowledge. We'll be in touch within a few days to discuss next steps.
          </div>

          <div onClick={function(){ setF("privacyConsent", !form.privacyConsent); }} style={{ display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer", background:"#111", border:"1px solid "+(form.privacyConsent?"#166534":"#333"), borderRadius:2, padding:"12px 14px" }}>
            <div style={{ width:18, height:18, borderRadius:3, border:"2px solid "+(form.privacyConsent?"#22c55e":"#555"), background:form.privacyConsent?"#22c55e":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
              {form.privacyConsent && <span style={{ color:"#000", fontSize:12, fontWeight:900, lineHeight:1 }}>{"\u2713"}</span>}
            </div>
            <div style={{ fontSize:12, color:"#ccc", lineHeight:1.6 }}>I have read and agree to SwimFasterLondon's <span style={{ color:"#3b82f6", textDecoration:"underline" }}>Terms & Conditions of Membership</span>, <span style={{ color:"#3b82f6", textDecoration:"underline" }}>Privacy Policy</span>, <span style={{ color:"#3b82f6", textDecoration:"underline" }}>Health Disclaimer & Participation Waiver</span>, and <span style={{ color:"#3b82f6", textDecoration:"underline" }}>Code of Conduct</span>, including how my medical and emergency contact details are used for safety purposes.</div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", gap:10, marginTop:24 }}>
        {step > 0 && <button onClick={back} style={btnGhost}>Back</button>}
        {step < STEPS.length-1 && <button onClick={handleNext} style={{ background:"#e01a1a", color:"#fff", padding:"11px 22px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer", opacity:isStepValid()?1:0.4 }}>Continue</button>}
        {step === STEPS.length-1 && <button onClick={handleSubmitForm} style={Object.assign({}, btnRed, { opacity: form.privacyConsent?1:0.4, cursor: form.privacyConsent?"pointer":"default" })} disabled={!form.privacyConsent}>Submit application</button>}
      </div>
    </div>
  );
}

const PIZZAS = [
  { id:"marg", name:"Margherita", desc:"Extra virgin olive oil & basil leaves", price12:10.5, price18:20.5, emoji:"\uD83C\uDF55" },
  { id:"mangalone", name:"The Mangal One", desc:"Turkish green peppers, lamb kofte, aleppo pepper sauce, garlic sauce drizzle", price12:16.2, price18:31.9, emoji:"\uD83C\uDF55" },
  { id:"nymarg", name:"NY Marg", desc:"Provolone picante, NYC sprinkle (parmesan, oregano, garlic, chilli flakes), olive oil", price12:12.7, price18:24.9, emoji:"\uD83C\uDF55" },
  { id:"tsb", name:"TSB", desc:"Tenderstem broccoli, parmesan, pine nuts, garlic & olive oil", price12:13.3, price18:26.1, emoji:"\uD83C\uDF55" },
  { id:"holypep", name:"Holy Pepperoni", desc:"Regular pepperoni, smoky gyula pepperoni & spicy nduja", price12:13.8, price18:27.1, emoji:"\uD83C\uDF55" },
  { id:"aubergine", name:"Aubergine 2.0", desc:"Aubergines, provolone picante, parmesan, breadcrumbs, basil, garlic oil", price12:13.7, price18:26.9, emoji:"\uD83C\uDF55" },
  { id:"fullhouse", name:"Full House", desc:"Pepperoni, spicy ground beef, sausage, mushrooms, mixed peppers, black olives", price12:15.7, price18:30.9, emoji:"\uD83C\uDF55" },
  { id:"sloppyg", name:"Sloppy G", desc:"Spicy ground beef, red onions, guindilla chillies", price12:13.7, price18:26.9, emoji:"\uD83C\uDF55" },
  { id:"newporker", name:"New Porker", desc:"Sicilian sausage, guindilla chillies, garlic, oregano, fresh basil", price12:14.2, price18:27.9, emoji:"\uD83C\uDF55" },
  { id:"guindillas", name:"Guindillas in the Mist", desc:"Guindilla chillies, garlic oil, red onion, parmesan", price12:12.7, price18:24.9, emoji:"\uD83C\uDF55" },
  { id:"unholypep", name:"Unholy Pepperoni", desc:"Double pepperoni (regular & smoky gyula), hot honey, parmesan", price12:16.2, price18:31.9, emoji:"\uD83C\uDF55" },
  { id:"lavalava", name:"Mr Lava Lava", desc:"Mushrooms, mixed peppers, black olives, guindilla chillies, chilli flakes", price12:13.2, price18:25.9, emoji:"\uD83C\uDF55" },
  { id:"veganmarg", name:"Vegan Margherita", desc:"Olive oil, basil leaves, vegan mozzarella", price12:11.7, price18:22.9, emoji:"\uD83C\uDF31" },
  { id:"americannot", name:"American Not (Vegan)", desc:"Vegan mozzarella, vegan pepperoni, guindilla chillies", price12:13.7, price18:26.9, emoji:"\uD83C\uDF31" },
  { id:"veganlava", name:"Vegan Mr Lava Lava", desc:"Vegan mozzarella, mushrooms, mixed peppers, black olives, guindilla chillies, chilli flakes", price12:13.7, price18:26.9, emoji:"\uD83C\uDF31" },
];

// NOTE: drink prices below were not confirmed from the real menu (the site listed
// names but not prices for Drinks) - these are placeholders and should be checked
// against the actual menu or a receipt before relying on them for real orders.
const PIZZA_DRINKS = [
  { id:"lordswaterstill", name:"Lords of Water Still", price:2.2, emoji:"\uD83D\uDCA7" },
  { id:"lordswatersparkling", name:"Lords of Water Sparkling", price:2.2, emoji:"\uD83D\uDCA7" },
  { id:"botivo", name:"Botivo", desc:"Sparkling non-alcoholic botanical aperitivo", price:3.5, emoji:"\uD83E\uDD64" },
  { id:"cola", name:"Coke (33cl)", price:2.5, emoji:"\uD83E\uDD64" },
  { id:"dietcola", name:"Diet Coke (33cl)", price:2.5, emoji:"\uD83E\uDD64" },
  { id:"pellegrinoblood", name:"San Pellegrino Blood Orange (33cl)", price:3.0, emoji:"\uD83E\uDD64" },
  { id:"pellegrinolemon", name:"San Pellegrino Lemon (33cl)", price:3.0, emoji:"\uD83E\uDD64" },
  { id:"sparklingwater", name:"Sparkling Water", price:2.0, emoji:"\uD83D\uDCA7" },
  { id:"stillwater", name:"Still Water", price:2.0, emoji:"\uD83D\uDCA7" },
  { id:"lyckysaint", name:"Lucky Saint", desc:"Superior Unfiltered Lager, Alcohol Free, 0.5% ABV, 330ml", price:5.0, emoji:"\uD83C\uDF7A" },
  { id:"pyramid", name:"Pyramid Scheme Lager", desc:"House lager brewed with Gipsy Hill Brewery, 4.2%, 330ml", price:5.0, emoji:"\uD83C\uDF7A" },
  { id:"sliceworldcup", name:"Slice World Cup", desc:"Cold IPA collab with Gipsy Hill, 4.5%, 330ml, limited run", price:5.0, emoji:"\uD83C\uDF7A" },
  { id:"sliceworldcup4pack", name:"Slice World Cup 4 Pack", desc:"4x Slice World Cup Cold IPAs", price:18.0, emoji:"\uD83C\uDF7A" },
  { id:"gipsyhill", name:"Gipsy Hill Hepcat", desc:"IPA 4.6%, 330ml", price:5.5, emoji:"\uD83C\uDF7A" },
];

const PIZZA_WINES = [
  { id:"adarastinto", name:"Adaras Aldea Tinto", desc:"Syrah, Garnacha Tintorera / Spain / Organic", price:17.0, emoji:"\uD83C\uDF77" },
  { id:"adarasblanco", name:"Adaras Lluvia Blanco", desc:"Verdejo, Sauvignon Blanc / Spain / Organic", price:17.0, emoji:"\uD83C\uDF77" },
  { id:"lovebite", name:"Love Bite - New Theory", desc:"Chilled Red, Cinsault - bright red fruits, a proper pizza wine", price:22.5, emoji:"\uD83C\uDF77" },
  { id:"potluck", name:"Pot Luck - New Theory", desc:"Pet Nat, Pinotage - natural fizz with ripe red fruits", price:23.5, emoji:"\uD83C\uDF77" },
];

const PIZZA_SIDES = [
  { id:"olives", name:"Gordal Olives", desc:"Large, fleshy pitted olives with a gentle kick from guindilla chilli", price:4.5, emoji:"\uD83E\uDED2" },
  { id:"garlicbread", name:"Garlic Pizza Bread", desc:"With rosemary and sea salt", price:5.5, emoji:"\uD83E\uDD56" },
  { id:"garlicbreadcheese", name:"Garlic Pizza Bread with Cheese", price:6.7, emoji:"\uD83E\uDD56" },
  { id:"garlicbreadcheesemarmite", name:"Garlic Pizza Bread with Cheese & Marmite", price:7.5, emoji:"\uD83E\uDD56" },
  { id:"garlicbreadvegan", name:"Garlic Bread with Vegan Cheese", price:6.7, emoji:"\uD83E\uDD56" },
  { id:"garlicbreadveganmarmite", name:"Garlic Bread with Vegan Cheese & Marmite", price:7.5, emoji:"\uD83E\uDD56" },
  { id:"gfgarlicbreadcheese", name:"Gluten-Free Garlic Bread with Cheese", price:8.5, emoji:"\uD83E\uDD56" },
  { id:"gfgarlicbreadvegan", name:"Gluten-Free Garlic Bread with Vegan Cheese", price:8.5, emoji:"\uD83E\uDD56" },
];

// Dip bundle deal: any 3 dips cost £5.50 as a bundle, instead of full individual price.
// For orders that aren't an exact multiple of 3, we apply as many £5.50 bundles as
// possible, then charge the leftover 1 or 2 dips at their own individual price -
// this is always the cheapest valid combination, since the bundle price never
// changes regardless of which 3 dips are chosen.
const DIP_BUNDLE_SIZE = 3;
const DIP_BUNDLE_PRICE = 5.5;

const PIZZA_DIPS = [
  { id:"xlgarlicherb", name:"XL Garlic & Herb Dip", price:3.5, emoji:"\uD83E\uDD64" },
  { id:"ranch", name:"Ranch", price:2.4, emoji:"\uD83E\uDD64" },
  { id:"chillioil", name:"Chilli Oil", price:1.5, emoji:"\uD83C\uDF36\uFE0F" },
  { id:"veganholyfck", name:"Vegan Holy F*ck Mayo", price:1.5, emoji:"\uD83E\uDD64" },
  { id:"chimichurri", name:"Chimichurri", price:2.4, emoji:"\uD83C\uDF3F" },
  { id:"hickorybbq", name:"Hickory Smoked BBQ", price:2.0, emoji:"\uD83E\uDD64" },
  { id:"ribman", name:"The Ribman Holy F**k Hot Sauce", price:2.4, emoji:"\uD83C\uDF36\uFE0F" },
];

function fmtMoney(n) { return "\u00A3" + n.toFixed(2); }

function calcDipsTotal(dipQty) {
  const ids = Object.keys(dipQty||{});
  let totalDips = 0;
  let fullPriceSum = 0;
  ids.forEach(function(id) {
    const dip = PIZZA_DIPS.find(function(d){ return d.id===id; });
    if (!dip) return;
    const qty = dipQty[id];
    totalDips += qty;
    fullPriceSum += dip.price * qty;
  });
  if (totalDips === 0) return 0;
  const bundleCount = Math.floor(totalDips / DIP_BUNDLE_SIZE);
  const leftover = totalDips % DIP_BUNDLE_SIZE;
  if (bundleCount === 0) return fullPriceSum;
  // Charge bundles at the flat bundle price, then the leftover dips at their average
  // individual price (since which specific dips are "in" the bundle vs "leftover"
  // doesn't change the total - the bundle price is fixed regardless of which 3 dips).
  const avgPricePerDip = fullPriceSum / totalDips;
  return (bundleCount * DIP_BUNDLE_PRICE) + (leftover * avgPricePerDip);
}

function PizzaOrderForm({ onSubmit, defaultName }) {
  const [name, setName] = useState(defaultName||"");
  const [plusOnes, setPlusOnes] = useState([]);
  const [pizzaQty, setPizzaQty] = useState({});
  const [drinkQty, setDrinkQty] = useState({});
  const [sideQty, setSideQty] = useState({});
  const [dipQty, setDipQty] = useState({});
  const [wineQty, setWineQty] = useState({});
  const [error, setError] = useState("");

  function handleName(e) { setName(e.target.value); }
  function addPlusOne() { setPlusOnes(plusOnes.concat([""])); }
  function removePlusOne(i) { setPlusOnes(plusOnes.filter(function(_, idx){ return idx!==i; })); }
  function updatePlusOne(i, val) {
    setPlusOnes(plusOnes.map(function(p, idx){ return idx===i ? val : p; }));
  }

  function bump(setter, qty, id, delta) {
    setter(function(q) {
      const next = Object.assign({}, q);
      const current = next[id] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) { delete next[id]; } else { next[id] = updated; }
      return next;
    });
  }

  const totalDipCount = Object.values(dipQty).reduce(function(a,b){ return a+b; }, 0);

  function total() {
    let sum = 0;
    Object.keys(pizzaQty).forEach(function(key) {
      const parts = key.split("_");
      const id = parts[0]; const size = parts[1];
      const p = PIZZAS.find(function(x){ return x.id===id; });
      if (p) sum += (size==="18" ? p.price18 : p.price12) * pizzaQty[key];
    });
    Object.keys(drinkQty).forEach(function(id) {
      const d = PIZZA_DRINKS.find(function(x){ return x.id===id; });
      if (d) sum += d.price * drinkQty[id];
    });
    Object.keys(sideQty).forEach(function(id) {
      const s = PIZZA_SIDES.find(function(x){ return x.id===id; });
      if (s) sum += s.price * sideQty[id];
    });
    Object.keys(wineQty).forEach(function(id) {
      const w = PIZZA_WINES.find(function(x){ return x.id===id; });
      if (w) sum += w.price * wineQty[id];
    });
    sum += calcDipsTotal(dipQty);
    return sum;
  }

  function handleSubmit() {
    if (!name.trim()) { setError("Tell us who's ordering!"); return; }
    const itemCount = Object.keys(pizzaQty).length + Object.keys(drinkQty).length + Object.keys(sideQty).length + Object.keys(dipQty).length + Object.keys(wineQty).length;
    if (itemCount === 0) { setError("Your order's looking a bit empty - add something tasty!"); return; }
    setError("");
    onSubmit({
      name: name.trim(),
      plusOnes: plusOnes.filter(function(p){ return p.trim(); }),
      pizzaQty: pizzaQty, drinkQty: drinkQty, sideQty: sideQty, dipQty: dipQty, wineQty: wineQty,
      total: total(),
      paid: false,
      id: Date.now(),
    });
  }

  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <label style={S.label}>Your name</label>
        <input value={name} onChange={handleName} placeholder="e.g. James Thornton" style={S.input}/>
      </div>

      <div style={{ marginBottom:24 }}>
        <label style={S.label}>Bringing anyone else? Add a plus-one</label>
        {plusOnes.map(function(p, i) {
          return (
            <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
              <input value={p} onChange={function(e){ updatePlusOne(i, e.target.value); }} placeholder="Plus-one name" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", flex:1 }}/>
              <button onClick={function(){ removePlusOne(i); }} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"11px 14px" }}>{"\u2715"}</button>
            </div>
          );
        })}
        <button onClick={addPlusOne} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", padding:"9px 16px", fontWeight:700, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2 }}>+ Add a plus-one</button>
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.red, marginBottom:10 }}>{"\uD83C\uDF55"} Pizzas</div>
        <div style={{ fontSize:11, color:C.grey, marginBottom:10, lineHeight:1.5 }}>12" feeds one person, 18" feeds two hungry people.</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {PIZZAS.map(function(p) {
            const qty12 = pizzaQty[p.id+"_12"] || 0;
            const qty18 = pizzaQty[p.id+"_18"] || 0;
            const anyQty = qty12 + qty18;
            return (
              <div key={p.id} style={{ background:C.panel, border:"1px solid "+(anyQty>0?C.red:C.border), borderRadius:2, padding:"12px 14px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:10 }}>
                  <div style={{ fontSize:22 }}>{p.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{p.name}</div>
                    <div style={{ fontSize:11, color:C.grey, lineHeight:1.4 }}>{p.desc}</div>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:12, color:C.amber, fontWeight:700, width:76, flexShrink:0 }}>12" {fmtMoney(p.price12)}</span>
                    <button onClick={function(){ bump(setPizzaQty, pizzaQty, p.id+"_12", -1); }} style={{ width:26, height:26, borderRadius:"50%", border:"1px solid #333", background:"transparent", color:C.grey, fontSize:15, cursor:"pointer" }}>-</button>
                    <span style={{ fontWeight:900, fontSize:14, color:C.white, minWidth:14, textAlign:"center" }}>{qty12}</span>
                    <button onClick={function(){ bump(setPizzaQty, pizzaQty, p.id+"_12", 1); }} style={{ width:26, height:26, borderRadius:"50%", border:"none", background:C.red, color:C.white, fontSize:15, cursor:"pointer" }}>+</button>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:12, color:C.amber, fontWeight:700, width:76, flexShrink:0 }}>18" {fmtMoney(p.price18)}</span>
                    <button onClick={function(){ bump(setPizzaQty, pizzaQty, p.id+"_18", -1); }} style={{ width:26, height:26, borderRadius:"50%", border:"1px solid #333", background:"transparent", color:C.grey, fontSize:15, cursor:"pointer" }}>-</button>
                    <span style={{ fontWeight:900, fontSize:14, color:C.white, minWidth:14, textAlign:"center" }}>{qty18}</span>
                    <button onClick={function(){ bump(setPizzaQty, pizzaQty, p.id+"_18", 1); }} style={{ width:26, height:26, borderRadius:"50%", border:"none", background:C.red, color:C.white, fontSize:15, cursor:"pointer" }}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b82f6", marginBottom:10 }}>{"\uD83E\uDD64"} Drinks</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {PIZZA_DRINKS.map(function(d) {
            const qty = drinkQty[d.id] || 0;
            return (
              <div key={d.id} style={{ background:C.panel, border:"1px solid "+(qty>0?"#3b82f6":C.border), borderRadius:2, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:22 }}>{d.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{d.name}</div>
                  {d.desc && <div style={{ fontSize:11, color:C.grey, lineHeight:1.4 }}>{d.desc}</div>}
                  <div style={{ fontSize:12, color:C.amber, fontWeight:700, marginTop:2 }}>{fmtMoney(d.price)}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                  <button onClick={function(){ bump(setDrinkQty, drinkQty, d.id, -1); }} style={{ width:28, height:28, borderRadius:"50%", border:"1px solid #333", background:"transparent", color:C.grey, fontSize:16, cursor:"pointer" }}>-</button>
                  <span style={{ fontWeight:900, fontSize:15, color:C.white, minWidth:16, textAlign:"center" }}>{qty}</span>
                  <button onClick={function(){ bump(setDrinkQty, drinkQty, d.id, 1); }} style={{ width:28, height:28, borderRadius:"50%", border:"none", background:"#3b82f6", color:C.white, fontSize:16, cursor:"pointer" }}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.amber, marginBottom:10 }}>{"\uD83E\uDD56"} Sides</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {PIZZA_SIDES.map(function(s) {
            const qty = sideQty[s.id] || 0;
            return (
              <div key={s.id} style={{ background:C.panel, border:"1px solid "+(qty>0?C.amber:C.border), borderRadius:2, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:22 }}>{s.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{s.name}</div>
                  {s.desc && <div style={{ fontSize:11, color:C.grey, lineHeight:1.4 }}>{s.desc}</div>}
                  <div style={{ fontSize:12, color:C.amber, fontWeight:700, marginTop:2 }}>{fmtMoney(s.price)}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                  <button onClick={function(){ bump(setSideQty, sideQty, s.id, -1); }} style={{ width:28, height:28, borderRadius:"50%", border:"1px solid #333", background:"transparent", color:C.grey, fontSize:16, cursor:"pointer" }}>-</button>
                  <span style={{ fontWeight:900, fontSize:15, color:C.white, minWidth:16, textAlign:"center" }}>{qty}</span>
                  <button onClick={function(){ bump(setSideQty, sideQty, s.id, 1); }} style={{ width:28, height:28, borderRadius:"50%", border:"none", background:C.amber, color:"#000", fontSize:16, cursor:"pointer" }}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#a855f7", marginBottom:10 }}>{"\uD83C\uDF77"} Wine List</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {PIZZA_WINES.map(function(w) {
            const qty = wineQty[w.id] || 0;
            return (
              <div key={w.id} style={{ background:C.panel, border:"1px solid "+(qty>0?"#a855f7":C.border), borderRadius:2, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:22 }}>{w.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{w.name}</div>
                  {w.desc && <div style={{ fontSize:11, color:C.grey, lineHeight:1.4 }}>{w.desc}</div>}
                  <div style={{ fontSize:12, color:"#a855f7", fontWeight:700, marginTop:2 }}>{fmtMoney(w.price)}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                  <button onClick={function(){ bump(setWineQty, wineQty, w.id, -1); }} style={{ width:28, height:28, borderRadius:"50%", border:"1px solid #333", background:"transparent", color:C.grey, fontSize:16, cursor:"pointer" }}>-</button>
                  <span style={{ fontWeight:900, fontSize:15, color:C.white, minWidth:16, textAlign:"center" }}>{qty}</span>
                  <button onClick={function(){ bump(setWineQty, wineQty, w.id, 1); }} style={{ width:28, height:28, borderRadius:"50%", border:"none", background:"#a855f7", color:C.white, fontSize:16, cursor:"pointer" }}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#22c55e", marginBottom:10 }}>{"\uD83E\uDD64"} Dips</div>
        <div style={{ fontSize:11, color:C.grey, lineHeight:1.5, marginBottom:10 }}>Any 3 dips for {fmtMoney(DIP_BUNDLE_PRICE)} - we'll automatically apply as many bundles as your order qualifies for.</div>
        {totalDipCount > 0 && (
          <div style={{ background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"8px 12px", marginBottom:10, fontSize:12, color:"#22c55e" }}>
            {totalDipCount} dip{totalDipCount!==1?"s":""} so far - {Math.floor(totalDipCount/DIP_BUNDLE_SIZE)} bundle{Math.floor(totalDipCount/DIP_BUNDLE_SIZE)!==1?"s":""} of 3 applied{totalDipCount%DIP_BUNDLE_SIZE>0?", "+(totalDipCount%DIP_BUNDLE_SIZE)+" at normal price":""}. {(DIP_BUNDLE_SIZE - (totalDipCount%DIP_BUNDLE_SIZE))%DIP_BUNDLE_SIZE!==0 && "Add "+((DIP_BUNDLE_SIZE - (totalDipCount%DIP_BUNDLE_SIZE))%DIP_BUNDLE_SIZE)+" more for another bundle deal!"}
          </div>
        )}
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {PIZZA_DIPS.map(function(d) {
            const qty = dipQty[d.id] || 0;
            return (
              <div key={d.id} style={{ background:C.panel, border:"1px solid "+(qty>0?"#22c55e":C.border), borderRadius:2, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:22 }}>{d.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{d.name}</div>
                  <div style={{ fontSize:12, color:"#22c55e", fontWeight:700, marginTop:2 }}>{fmtMoney(d.price)}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                  <button onClick={function(){ bump(setDipQty, dipQty, d.id, -1); }} style={{ width:28, height:28, borderRadius:"50%", border:"1px solid #333", background:"transparent", color:C.grey, fontSize:16, cursor:"pointer" }}>-</button>
                  <span style={{ fontWeight:900, fontSize:15, color:C.white, minWidth:16, textAlign:"center" }}>{qty}</span>
                  <button onClick={function(){ bump(setDipQty, dipQty, d.id, 1); }} style={{ width:28, height:28, borderRadius:"50%", border:"none", background:"#22c55e", color:"#000", fontSize:16, cursor:"pointer" }}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background:C.panel, border:"1px solid "+C.red, borderRadius:2, padding:"16px 18px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:13, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.grey }}>Your total</div>
        <div style={{ fontWeight:900, fontSize:"1.8rem", color:C.red, fontFamily:"monospace" }}>{fmtMoney(total())}</div>
      </div>

      {error && <div style={{ color:"#ff6b6b", fontSize:13, marginBottom:12 }}>{error}</div>}

      <button onClick={handleSubmit} style={{ background:"#e01a1a", color:"#fff", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer", width:"100%", fontSize:14, padding:"14px 20px" }}>
        Lock in my order {"\uD83C\uDF55"}
      </button>
    </div>
  );
}

function PizzaNightPage({ orders, deadline, deliveryFee, onSubmitOrder, onMarkPaid, onClearUnpaid, onBack, embedded, defaultName }) {
  const [view, setView] = useState("order");
  const [justSubmittedId, setJustSubmittedId] = useState(null);

  const now = new Date();
  const DEADLINE = new Date(deadline);
  const deadlinePassed = now > DEADLINE;

  function handleNewOrder(order) {
    onSubmitOrder(order);
    setJustSubmittedId(order.id);
    setView("confirmed");
  }

  function orderAgain() {
    setView("order");
    setJustSubmittedId(null);
  }

  const activeOrders = deadlinePassed ? orders.filter(function(o){ return o.paid; }) : orders;
  const foodSubtotal = activeOrders.reduce(function(sum, o){ return sum + o.total; }, 0);
  const deliveryFeeAmount = deliveryFee||0;
  const grandTotal = foodSubtotal + (activeOrders.length > 0 ? deliveryFeeAmount : 0);
  const totalPeople = activeOrders.reduce(function(sum, o){ return sum + 1 + o.plusOnes.length; }, 0);
  const unpaidCount = orders.filter(function(o){ return !o.paid; }).length;

  function timeRemaining() {
    const diff = DEADLINE - now;
    if (diff <= 0) return "Deadline has passed";
    const hours = Math.floor(diff / (1000*60*60));
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    if (days > 0) return days + "d " + remHours + "h left to order";
    return remHours + "h left to order";
  }

  const justSubmitted = orders.find(function(o){ return o.id === justSubmittedId; });

  const content = (
    <div style={{ padding: embedded ? "0" : "32px 20px 60px", maxWidth:520, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ fontSize:44, marginBottom:8 }}>{"\uD83C\uDF55\uD83E\uDD64\uD83C\uDF89"}</div>
        <h1 style={{ fontWeight:900, fontSize:"1.9rem", textTransform:"uppercase", lineHeight:1.05, marginBottom:8 }}>Post-Session<br/><span style={{ color:C.red }}>Pizza Night</span></h1>
        <p style={{ color:C.grey, fontSize:13, lineHeight:1.7, maxWidth:380, margin:"0 auto" }}>
          You survived Friday's set - now refuel the right way. Order your pizza, drag along a mate, and pay before the deadline so we can get the order in.
        </p>
      </div>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:24, padding:"10px 16px", background:deadlinePassed?"#2d0a0a":"#1a1205", border:"1px solid "+(deadlinePassed?"#7f1d1d":"#78350f"), borderRadius:2 }}>
        <span style={{ fontSize:16 }}>{"\u23F0"}</span>
        <span style={{ fontSize:12, fontWeight:700, color:deadlinePassed?"#ff6b6b":C.amber, letterSpacing:"0.03em" }}>{timeRemaining()}</span>
      </div>

      {view === "order" && (
        <PizzaOrderForm onSubmit={handleNewOrder} defaultName={defaultName}/>
      )}

      {view === "confirmed" && justSubmitted && (
        <div>
          <div style={{ background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"24px 20px", textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:36, marginBottom:10 }}>{"\uD83C\uDF89"}</div>
            <div style={{ fontWeight:900, fontSize:18, color:C.green, marginBottom:8 }}>Order locked in, {justSubmitted.name}!</div>
            <div style={{ fontSize:13, color:C.greyLight, lineHeight:1.7, marginBottom:16 }}>
              Now pay <strong style={{ color:C.white }}>{fmtMoney(justSubmitted.total)}</strong> to the coach before the deadline to secure your spot. Unpaid orders get dropped when time's up - don't be that person.
            </div>
            {!justSubmitted.paid ? (
              <button onClick={function(){ onMarkPaid(justSubmitted.id); }} style={{ background:"#e01a1a", color:"#fff", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer", width:"100%", padding:"11px 20px" }}>I've paid - mark as paid {"\uD83D\uDCB0"}</button>
            ) : (
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, color:C.green, fontWeight:700 }}>
                <span>{"\u2713"}</span> Payment confirmed - you're on the list!
              </div>
            )}
          </div>
          <button onClick={orderAgain} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, width:"100%", padding:"11px 20px" }}>Add another order</button>
        </div>
      )}

      <div style={{ marginTop:32, borderTop:"1px solid "+C.border, paddingTop:24 }}>
        <div onClick={function(){ setView(view==="list"?"order":"list"); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", marginBottom:view==="list"?16:0 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.grey }}>Who's in so far {"\uD83D\uDC40"}</div>
          <div style={{ fontSize:13, color:C.grey }}>{view==="list"?"-":"+"}</div>
        </div>

        {view === "list" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:C.border, marginBottom:8, borderRadius:2, overflow:"hidden" }}>
              <div style={{ background:C.panel, padding:"14px" }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Swimmers coming</div>
                <div style={{ fontWeight:900, fontSize:"1.5rem", color:C.white }}>{totalPeople}</div>
              </div>
              <div style={{ background:C.panel, padding:"14px" }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:4 }}>Total tab</div>
                <div style={{ fontWeight:900, fontSize:"1.5rem", color:C.red, fontFamily:"monospace" }}>{fmtMoney(grandTotal)}</div>
              </div>
            </div>
            {deliveryFeeAmount > 0 && activeOrders.length > 0 && (
              <div style={{ fontSize:11, color:C.grey, marginBottom:16, textAlign:"right" }}>Food: {fmtMoney(foodSubtotal)} + Delivery: {fmtMoney(deliveryFeeAmount)}</div>
            )}

            {unpaidCount > 0 && !deadlinePassed && (
              <div style={{ background:"#1a1205", border:"1px solid #78350f", borderRadius:2, padding:"10px 14px", marginBottom:12, fontSize:12, color:C.amber }}>
                {unpaidCount} order{unpaidCount!==1?"s":""} still unpaid - get that money in before the deadline!
              </div>
            )}

            {deadlinePassed && orders.some(function(o){ return !o.paid; }) && (
              <div style={{ background:"#2d0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"10px 14px", marginBottom:12, fontSize:12, color:"#ff6b6b" }}>
                Deadline's passed - unpaid orders have been dropped from the list.
              </div>
            )}

            {activeOrders.length === 0 && (
              <div style={{ textAlign:"center", color:C.greyDark, fontSize:13, padding:"20px 0" }}>No orders yet - be the first!</div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {activeOrders.map(function(o) {
                const itemsList = [];
                Object.keys(o.pizzaQty||{}).forEach(function(key) {
                  const parts = key.split("_");
                  const id = parts[0]; const size = parts[1];
                  const p = PIZZAS.find(function(x){ return x.id===id; });
                  if (p) itemsList.push(o.pizzaQty[key]+"x "+p.name+" ("+size+"\")");
                });
                Object.keys(o.drinkQty||{}).forEach(function(id) {
                  const d = PIZZA_DRINKS.find(function(x){ return x.id===id; });
                  if (d) itemsList.push(o.drinkQty[id]+"x "+d.name);
                });
                Object.keys(o.sideQty||{}).forEach(function(id) {
                  const s = PIZZA_SIDES.find(function(item){ return item.id===id; });
                  if (s) itemsList.push(o.sideQty[id]+"x "+s.name);
                });
                Object.keys(o.dipQty||{}).forEach(function(id) {
                  const dp = PIZZA_DIPS.find(function(item){ return item.id===id; });
                  if (dp) itemsList.push(o.dipQty[id]+"x "+dp.name);
                });
                Object.keys(o.wineQty||{}).forEach(function(id) {
                  const w = PIZZA_WINES.find(function(item){ return item.id===id; });
                  if (w) itemsList.push(o.wineQty[id]+"x "+w.name);
                });
                return (
                  <div key={o.id} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"14px 16px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:6 }}>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:C.white }}>{o.name}{o.plusOnes.length>0?" + "+o.plusOnes.join(", "):""}</div>
                        <div style={{ fontSize:12, color:C.grey, marginTop:2 }}>{itemsList.join(", ")}</div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <div style={{ fontWeight:900, fontSize:14, color:C.amber, fontFamily:"monospace" }}>{fmtMoney(o.total)}</div>
                        <div style={{ fontSize:10, fontWeight:700, color:o.paid?C.green:"#ff6b6b", marginTop:2 }}>{o.paid?"Paid \u2713":"Unpaid"}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {deadlinePassed && unpaidCount > 0 && (
              <button onClick={onClearUnpaid} style={{ background:"transparent", border:"1px solid #7f1d1d", color:"#ff6b6b", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, width:"100%", marginTop:12, padding:"11px 20px" }}>Clear unpaid orders</button>
            )}
          </div>
        )}
      </div>

      <div style={{ textAlign:"center", marginTop:32, fontSize:11, color:C.greyDark, lineHeight:1.7 }}>
        Payments go straight to the coach. Chase them at coach@swimfasterlondon.com if you're stuck. See you Friday {"\uD83C\uDF7D\uFE0F"}
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", minHeight:"100vh", fontSize:14 }}>
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,10,0.97)", borderBottom:"1px solid "+C.border, padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Logo height={50}/>
        <button onClick={onBack} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"8px 14px", fontSize:11 }}>Back to site</button>
      </nav>
      {content}
    </div>
  );
}


function ShopPage({ items, onReserve, onBack, embedded, defaultName, defaultContact }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [reserveForm, setReserveForm] = useState({ name:defaultName||"", contact:defaultContact||"" });
  const [reserved, setReserved] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All"].concat(Array.from(new Set(items.map(function(i){ return i.category; }))));
  const visibleItems = items
    .filter(function(i){ return categoryFilter==="All" || i.category===categoryFilter; })
    .slice()
    .sort(function(a,b){ return b.createdDate.localeCompare(a.createdDate); });

  function openItem(item) {
    setSelectedItem(item);
    setReserveForm({ name:defaultName||"", contact:defaultContact||"" });
    setReserved(false);
  }
  function closeItem() { setSelectedItem(null); }

  function submitReservation() {
    if (!reserveForm.name.trim() || !reserveForm.contact.trim()) return;
    onReserve(selectedItem.id, reserveForm.name.trim(), reserveForm.contact.trim());
    setReserved(true);
  }

  const content = (
    <div>
      <div style={{ padding: embedded ? "0" : "32px 20px 60px", maxWidth:900, margin:"0 auto" }}>
        <span style={S.eyebrow}>Kit &amp; Gear</span>
        <h2 style={{ fontWeight:900, fontSize:"1.8rem", textTransform:"uppercase", marginBottom:8 }}>Shop</h2>
        <p style={{ color:C.grey, lineHeight:1.7, marginBottom:24, maxWidth:520 }}>Pre-loved and new swimming kit - fins, paddles, and the occasional bit of swimwear. Reserve an item below and we'll be in touch to arrange payment and collection. No account needed - open to anyone.</p>

        <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
          {categories.map(function(cat) {
            const active = categoryFilter===cat;
            return (
              <button key={cat} onClick={function(){ setCategoryFilter(cat); }} style={{ background:active?"#e01a1a":"transparent", border:"1px solid "+(active?"#e01a1a":"#333"), color:active?"#fff":"#bbb", fontWeight:700, fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"7px 14px" }}>{cat}</button>
            );
          })}
        </div>

        {visibleItems.length === 0 && (
          <div style={{ padding:"40px 0", textAlign:"center", color:"#666" }}>No items available in this category right now - check back soon.</div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {visibleItems.map(function(item) {
            const isReserved = item.status === "reserved";
            const isSold = item.status === "sold";
            return (
              <div key={item.id} onClick={function(){ if (!isSold) openItem(item); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, overflow:"hidden", cursor:isSold?"default":"pointer", opacity:isSold?0.5:1 }}>
                <div style={{ width:"100%", aspectRatio:"1", background:"#161616", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                  {item.photo ? (
                    <img src={item.photo} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                  ) : (
                    <span style={{ color:"#444", fontSize:11, textTransform:"uppercase", letterSpacing:"0.06em" }}>No photo</span>
                  )}
                </div>
                <div style={{ padding:"10px 12px" }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:item.condition==="new"?C.green:C.amber, marginBottom:4 }}>{item.condition==="new"?"New":"Used"}</div>
                  <div style={{ fontWeight:700, fontSize:13, color:"#fff", marginBottom:4, lineHeight:1.3 }}>{item.name}</div>
                  <div style={{ fontWeight:900, fontSize:16, color:"#f59e0b" }}>{"\u00A3"}{item.price}</div>
                  {isReserved && <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#ff6b6b", marginTop:4 }}>Reserved</div>}
                  {isSold && <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#666", marginTop:4 }}>Sold</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <div onClick={closeItem} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:200, display:"flex", alignItems:"flex-start", justifyContent:"center", overflowY:"auto", padding:"20px 16px" }}>
          <div onClick={function(e){ e.stopPropagation(); }} style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, maxWidth:440, width:"100%", marginTop:20, marginBottom:20 }}>
            <div style={{ width:"100%", aspectRatio:"1", background:"#161616", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
              {selectedItem.photo ? (
                <img src={selectedItem.photo} alt={selectedItem.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              ) : (
                <span style={{ color:"#444", fontSize:12, textTransform:"uppercase", letterSpacing:"0.06em" }}>No photo</span>
              )}
            </div>
            <div style={{ padding:"20px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:selectedItem.condition==="new"?C.green:C.amber }}>{selectedItem.condition==="new"?"New":"Used"} - {selectedItem.category}</div>
                <button onClick={closeItem} style={{ background:"none", border:"none", color:"#888", fontSize:20, cursor:"pointer", lineHeight:1, padding:0 }}>&times;</button>
              </div>
              <div style={{ fontWeight:900, fontSize:"1.2rem", color:"#fff", marginBottom:6 }}>{selectedItem.name}</div>
              <div style={{ fontWeight:900, fontSize:22, color:"#f59e0b", marginBottom:14 }}>{"\u00A3"}{selectedItem.price}</div>
              <div style={{ fontSize:13, color:"#ccc", lineHeight:1.6, marginBottom:20 }}>{selectedItem.description}</div>

              {selectedItem.status === "reserved" ? (
                <div style={{ fontSize:13, color:"#ff6b6b", background:"#1a0a0a", border:"1px solid #7f1d1d", borderRadius:2, padding:"12px 14px" }}>This item has just been reserved by someone else. Check back in case it becomes available again.</div>
              ) : reserved ? (
                <div style={{ fontSize:13, color:"#22c55e", background:"#0d2b1a", border:"1px solid #166534", borderRadius:2, padding:"12px 14px" }}>Reserved! We'll be in touch using the contact details you gave us to arrange payment and collection.</div>
              ) : (
                <div>
                  <div style={{ fontSize:11, color:"#888", marginBottom:14, lineHeight:1.6 }}>Reserve this item and we'll contact you directly to arrange payment and collection. No account or online payment needed.</div>
                  <div style={{ marginBottom:10 }}>
                    <label style={S.label}>Your name</label>
                    <input value={reserveForm.name} onChange={function(e){ setReserveForm(function(f){ return Object.assign({}, f, { name:e.target.value }); }); }} style={S.input}/>
                  </div>
                  <div style={{ marginBottom:16 }}>
                    <label style={S.label}>Email or mobile number</label>
                    <input value={reserveForm.contact} onChange={function(e){ setReserveForm(function(f){ return Object.assign({}, f, { contact:e.target.value }); }); }} placeholder="So we can reach you" style={S.input}/>
                  </div>
                  <button onClick={submitReservation} style={{ display:"block", width:"100%", background:"#e01a1a", color:"#fff", border:"none", padding:"12px 16px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer" }}>Reserve this item</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", fontSize:14, minHeight:"100vh" }}>
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,10,0.97)", borderBottom:"1px solid "+C.border, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px" }}>
        <Logo height={50}/>
        <button onClick={onBack} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"8px 14px", fontSize:11 }}>Back to site</button>
      </nav>
      {content}
    </div>
  );
}


function PublicSite({ onLogin, onApply, blocks, sessions, discountCodes, shopItems, onReserveItem, pizzaOrders, pizzaDeadline, pizzaDeliveryFee, onSubmitPizzaOrder, onMarkPizzaPaid, onClearUnpaidPizza }) {
  const [submitted, setSubmitted] = useState(false);
  const [applySubmitting, setApplySubmitting] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [showApply, setShowApply] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showPizza, setShowPizza] = useState(false);
  const [showPizzaCodeEntry, setShowPizzaCodeEntry] = useState(false);
  const [pizzaCodeInput, setPizzaCodeInput] = useState("");
  const [pizzaCodeError, setPizzaCodeError] = useState("");
  const PIZZA_ACCESS_CODE = "PIZZA2026";

  function openApply() { setShowApply(true); }
  function closeApply() { setShowApply(false); setSubmitted(false); }

  function handleSubmit(formData) {
    const appPayload = {
      name: formData.name, email: formData.email, mobile: formData.mobile, dob: formData.dob, gender: formData.gender,
      password: formData.password,
      emergencyName: formData.emergencyName, emergencyPhone: formData.emergencyPhone,
      swimmerType: formData.swimmerType, timesPerWeek: formData.timesPerWeek, swimmingSince: formData.swimmingSince,
      pb100: formData.pb100, pbEstimated: formData.pbEstimated,
      strokeRank1: formData.strokeRank1, strokeRank2: formData.strokeRank2, strokeRank3: formData.strokeRank3, strokeRank4: formData.strokeRank4, kickRating: formData.kickRating,
      benchmarkResponse: formData.benchmarkResponse, benchmarkAvg: formData.benchmarkAvg, benchmarkStoppedAt: formData.benchmarkStoppedAt,
      goals: formData.goals, targetEvent: formData.targetEvent, medical: formData.medical, extra: formData.extra,
      level: formData.swimmerType,
      message: formData.extra || formData.goals || "",
      blockEnrolment: formData.blockEnrolment,
    };
    if (!onApply) { setSubmitted(true); return; }
    setApplyError("");
    setApplySubmitting(true);
    onApply(appPayload).then(function() {
      setApplySubmitting(false);
      setSubmitted(true);
    }).catch(function(err) {
      setApplySubmitting(false);
      setApplyError(err.message || "Something went wrong submitting your application. Please try again.");
    });
  }

  if (showApply) {
    return (
      <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", fontSize:14, minHeight:"100vh" }}>
        <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,10,0.97)", borderBottom:"1px solid "+C.border, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px" }}>
          <Logo height={50}/>
          <button onClick={closeApply} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"8px 14px", fontSize:11 }}>Close</button>
        </nav>
        <div style={{ padding:"32px 20px 60px", maxWidth:560, margin:"0 auto" }}>
          <span style={S.eyebrow}>Membership Application</span>
          <h2 style={{ fontWeight:900, fontSize:"1.8rem", textTransform:"uppercase", marginBottom:8 }}>Apply for a Spot</h2>
          <p style={{ color:C.grey, lineHeight:1.7, marginBottom:24 }}>Takes about 5 minutes. This helps us understand your swimming background and place you in the right squad from day one.</p>
          {submitted ? (
            <div style={{ background:C.panel, border:"1px solid "+C.border, padding:28, borderRadius:2, textAlign:"center" }}>
              <div style={{ color:C.red, fontWeight:900, fontSize:20, marginBottom:8 }}>Application received</div>
              <p style={{ color:C.grey, lineHeight:1.7, maxWidth:360, margin:"0 auto 20px" }}>Thank you for applying to SwimFasterLondon. First, check your inbox for a confirmation link to activate your account. Your coach will then review your application and be in touch - you can log in any time with the email and password you just set to check your status.</p>
              <button onClick={closeApply} style={{ background:"#e01a1a", color:"#fff", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" }}>Back to homepage</button>
            </div>
          ) : (
            <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:20 }}>
              {applyError && <div style={{ background:"rgba(224,26,26,0.1)", border:"1px solid #e01a1a", color:"#ff6b6b", padding:"10px 12px", borderRadius:2, fontSize:13, marginBottom:16 }}>{applyError}</div>}
              <fieldset disabled={applySubmitting} style={{ border:"none", padding:0, margin:0, opacity:applySubmitting?0.6:1 }}>
                <ApplicationForm onSubmit={handleSubmit} blocks={blocks||BLOCKS} sessions={sessions||[]} discountCodes={discountCodes||[]}/>
              </fieldset>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showShop) {
    return <ShopPage items={shopItems||[]} onReserve={onReserveItem} onBack={function(){ setShowShop(false); }}/>;
  }

  if (showPizzaCodeEntry) {
    return (
      <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", fontSize:14, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 20px" }}>
        <div style={{ maxWidth:340, width:"100%" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:24 }}>
            <Logo height={54}/>
          </div>
          <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, padding:"24px 20px" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.grey, marginBottom:14, textAlign:"center" }}>Enter access code</div>
            <input value={pizzaCodeInput} onChange={function(e){ setPizzaCodeInput(e.target.value); }} onKeyDown={function(e){ if (e.key==="Enter") {
              if (pizzaCodeInput.trim().toUpperCase()===PIZZA_ACCESS_CODE) { setShowPizzaCodeEntry(false); setShowPizza(true); setPizzaCodeError(""); }
              else { setPizzaCodeError("That code isn't right."); }
            } }} placeholder="Code from your coach" style={{ width:"100%", background:"#161616", border:"1px solid #333", color:"#fff", padding:"11px 12px", fontSize:14, borderRadius:2, outline:"none", boxSizing:"border-box", fontFamily:"inherit", textAlign:"center", marginBottom:12 }}/>
            {pizzaCodeError && <div style={{ fontSize:12, color:"#ff6b6b", textAlign:"center", marginBottom:12 }}>{pizzaCodeError}</div>}
            <button onClick={function(){
              if (pizzaCodeInput.trim().toUpperCase()===PIZZA_ACCESS_CODE) { setShowPizzaCodeEntry(false); setShowPizza(true); setPizzaCodeError(""); }
              else { setPizzaCodeError("That code isn't right."); }
            }} style={{ display:"block", width:"100%", background:"#e01a1a", color:"#fff", border:"none", padding:"11px 16px", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:2, cursor:"pointer", marginBottom:10 }}>Continue</button>
            <button onClick={function(){ setShowPizzaCodeEntry(false); setPizzaCodeInput(""); setPizzaCodeError(""); }} style={{ display:"block", width:"100%", background:"none", border:"none", color:"#888", fontSize:12, cursor:"pointer" }}>Back to site</button>
          </div>
        </div>
      </div>
    );
  }

  if (showPizza) {
    return <PizzaNightPage orders={pizzaOrders||[]} deadline={pizzaDeadline} deliveryFee={pizzaDeliveryFee||0} onSubmitOrder={onSubmitPizzaOrder} onMarkPaid={onMarkPizzaPaid} onClearUnpaid={onClearUnpaidPizza} onBack={function(){ setShowPizza(false); }}/>;
  }

  return (
    <div style={{ background:C.bg, color:C.white, fontFamily:"system-ui,sans-serif", fontSize:14 }}>
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,10,0.97)", borderBottom:"1px solid "+C.border, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px" }}>
        <Logo height={50}/>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <button onClick={function(){ setShowShop(true); }} style={{ background:"none", border:"none", color:"#999", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer", fontSize:12, padding:0 }}>Shop</button>
          <button onClick={onLogin} style={{ background:"transparent", border:"1px solid #333", color:"#bbb", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:2, padding:"8px 22px", fontSize:11, lineHeight:1.5, textAlign:"center" }}>Member<br/>Login</button>
        </div>
      </nav>

      <section style={{ padding:"56px 20px 48px", borderBottom:"2px solid "+C.red }}>
        <span style={S.eyebrow}>Friday Night Sessions - London Fields</span>
        <h1 style={{ fontWeight:900, fontSize:"clamp(2.4rem,10vw,4.5rem)", lineHeight:0.92, textTransform:"uppercase", margin:"0 0 20px" }}>
          Train Hard.<br/><span style={{ color:C.red }}>Swim Faster.</span>
        </h1>
        <p style={{ color:C.grey, maxWidth:380, lineHeight:1.7, marginBottom:32, margin:"0 auto 32px" }}>
          Technique-led, data-driven squad sessions for swimmers chasing speed who want to see real progress.
        </p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
          <button onClick={openApply} style={{ background:"#e01a1a", color:"#fff", padding:"10px 20px", fontWeight:700, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", border:"none", borderRadius:2, cursor:"pointer" }}>Apply for a Spot</button>
        </div>
      </section>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:"1px solid "+C.border }}>
        {[["12","Swimmers per block"],["3mo","Blocks"],["100%","Tracked"]].map(function(item, i){
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
        <h2 style={{ fontWeight:900, fontSize:"1.8rem", textTransform:"uppercase", marginBottom:16 }}>What We Offer</h2>
        <p style={{ color:C.grey, lineHeight:1.7, maxWidth:480, margin:"0 auto 14px" }}>
          Technique-led, data-driven coaching designed to help you swim faster.
        </p>
        <p style={{ color:C.grey, lineHeight:1.7, maxWidth:480, margin:"0 auto 28px" }}>
          Every Friday you'll train with expert coaches in a structured, supportive environment focused on speed, efficiency and measurable progress.
        </p>

        <div style={{ marginBottom:28 }}>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.red, display:"block", marginBottom:12 }}>Session Format</span>
          <div style={{ background:C.panel, border:"1px solid "+C.border, borderRadius:2, overflow:"hidden" }}>
            <div style={{ padding:"14px 18px", borderBottom:"1px solid "+C.border, display:"flex", justifyContent:"space-between", gap:12 }}>
              <span style={{ color:C.greyLight }}>Guided land warm-up</span>
              <span style={{ color:C.white, fontWeight:700, fontFamily:"monospace", flexShrink:0 }}>6:30-7:00pm</span>
            </div>
            <div style={{ padding:"14px 18px", display:"flex", justifyContent:"space-between", gap:12 }}>
              <span style={{ color:C.greyLight }}>90-minute coached pool session</span>
              <span style={{ color:C.white, fontWeight:700, fontFamily:"monospace", flexShrink:0 }}>7:00-8:30pm</span>
            </div>
          </div>
        </div>

        <div>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.red, display:"block", marginBottom:12 }}>What You'll Get</span>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {[
              "Expert technical coaching",
              "Structured speed-focused training",
              "Personal feedback",
              "Performance tracking",
              "Exclusive drills and resources",
            ].map(function(item, i){
              return (
                <div key={i} style={{ background:C.panel, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ color:C.red, fontWeight:900 }}>+</span>
                  <span style={{ color:C.greyLight }}>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding:"48px 20px", borderBottom:"1px solid "+C.border }}>
        <span style={S.eyebrow}>A Swim Faster London Programme</span>
        <h2 style={{ fontWeight:900, fontSize:"1.8rem", textTransform:"uppercase", marginBottom:6 }}>Project<span style={{ color:C.red }}>100</span></h2>
        <p style={{ color:C.amber, fontWeight:700, fontSize:13, letterSpacing:"0.06em", marginBottom:20 }}>Track it. Measure it. Improve it.</p>
        <p style={{ color:C.grey, lineHeight:1.7, maxWidth:480, margin:"0 auto 14px" }}>
          Project100 is our unique performance programme, built around regular 100m freestyle benchmarking. Monitor your progress, analyse your technique and race data, and see your improvements over time.
        </p>
        <p style={{ color:C.grey, lineHeight:1.7, maxWidth:480, margin:"0 auto" }}>
          Every benchmark brings you one step closer to your next personal best.
        </p>
      </section>

      <footer style={{ padding:"28px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <Logo height={45}/>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ color:C.greyDark, fontSize:12 }}>&copy; 2026 Swim Faster London</span>
          <button onClick={function(){ setShowPizzaCodeEntry(true); }} style={{ background:"none", border:"none", color:C.greyDark, fontSize:11, cursor:"pointer", padding:0, opacity:0.6 }}>{"\uD83C\uDF55"}</button>
        </div>
      </footer>
    </div>
  );
}


export default function App() {
  const [view, setView] = useState("boot");
  const [memberId, setMemberId] = useState(null);
  const [coachId, setCoachId] = useState(null);
  const [data, setData] = useState(INIT);
  const [passwordGate, setPasswordGate] = useState(false);

  async function refreshData() {
    const fetched = await api.fetchAllData();
    setData(fetched);
    return fetched;
  }

  async function loadPublicData() {
    try {
      const fetched = await api.fetchPublicData();
      setData(fetched);
    } catch (err) {
      console.error("Failed to load public data", err);
    }
  }

  async function resolveSession(authUser) {
    const [profile, fetched] = await Promise.all([api.getProfileForAuthUser(authUser.id), api.fetchAllData()]);
    setData(fetched);
    if (profile && profile.role === "coach") {
      setCoachId(profile.coach.id);
      setView("coach");
    } else if (profile && profile.role === "member") {
      setMemberId(profile.member.id);
      setPasswordGate(!!profile.member.mustChangePassword);
      setView("member");
    } else {
      // Signed in but no matching coach/member row (shouldn't normally happen) - fall back to public site.
      await api.signOut();
      await loadPublicData();
      setView("site");
    }
  }

  useEffect(function() {
    let cancelled = false;
    supabase.auth.getSession().then(function(res) {
      if (cancelled) return;
      const session = res.data && res.data.session;
      if (session && session.user) {
        resolveSession(session.user).then(function() {
          if (!cancelled && view === "boot") { /* view already set inside resolveSession */ }
        }).catch(function(err) {
          console.error("Failed to resolve session", err);
          loadPublicData().then(function(){ if (!cancelled) setView("site"); });
        });
      } else {
        loadPublicData().then(function(){ if (!cancelled) setView("site"); });
      }
    });
    return function() { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLoginSuccess() {
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session && sessionData.session.user) {
      await resolveSession(sessionData.session.user);
    }
  }

  async function handleLogoutCoach() {
    await api.signOut();
    setCoachId(null);
    await loadPublicData();
    setView("site");
  }

  async function handleLogoutMember() {
    await api.signOut();
    setMemberId(null);
    setPasswordGate(false);
    await loadPublicData();
    setView("site");
  }

  async function reserveShopItem(itemId, name, contact) {
    await api.reserveShopItem(itemId, name, contact);
    await (coachId ? refreshData() : loadPublicData());
  }

  async function submitPizzaOrder(order) {
    await api.submitPizzaOrder(order);
    await loadPublicData();
  }
  async function markPizzaPaid(orderId) {
    await api.markPizzaPaid(orderId);
    await loadPublicData();
  }
  async function clearUnpaidPizzaOrders() {
    await api.clearUnpaidPizzaOrders();
    await loadPublicData();
  }

  async function addApplication(appData) {
    const signUpResult = await api.signUp(appData.email, appData.password);
    const authUser = signUpResult.user;
    if (!authUser) {
      throw new Error("Check your inbox to confirm your email, then log in to finish your application.");
    }
    await api.createApplicationAndMember(appData, authUser.id);
    if (signUpResult.session) {
      // Email confirmation is off (or already satisfied) - the new user is signed in immediately.
      await resolveSession(authUser);
    }
  }

  if (view === "boot") {
    return <div style={{ background:C.bg, minHeight:"100vh" }}/>;
  }

  if (view === "login") {
    return <LoginPage onSuccess={handleLoginSuccess} onBack={function(){ setView("site"); }}/>;
  }

  if (view === "coach") {
    return <CoachDashboard onLogout={handleLogoutCoach} sharedData={data} setSharedData={setData} refreshData={refreshData} coachId={coachId}/>;
  }

  if (view === "member") {
    if (passwordGate) {
      return <ForcePasswordChange memberId={memberId} onDone={function(){ setPasswordGate(false); }}/>;
    }
    return (
      <MemberDashboard
        memberId={memberId}
        allData={data}
        setAllData={setData}
        refreshData={refreshData}
        onLogout={handleLogoutMember}
      />
    );
  }

  return <PublicSite onLogin={function(){ setView("login"); }} onApply={addApplication} blocks={data.blocks||BLOCKS} sessions={data.sessions} discountCodes={data.discountCodes||[]} shopItems={data.shopItems||[]} onReserveItem={reserveShopItem} pizzaOrders={data.pizzaOrders||[]} pizzaDeadline={data.pizzaDeadline} pizzaDeliveryFee={data.pizzaDeliveryFee||0} onSubmitPizzaOrder={submitPizzaOrder} onMarkPizzaPaid={markPizzaPaid} onClearUnpaidPizza={clearUnpaidPizzaOrders}/>;
}

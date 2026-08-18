import { supabase } from "./supabaseClient";

// ---------------------------------------------------------------------------
// Mapping helpers: DB rows are snake_case; the rest of App.jsx expects the
// same camelCase shape it always has (built from INIT). Keeping the mapping
// in one place means the giant render tree below doesn't need to change.
// ---------------------------------------------------------------------------

function mapMember(m, related) {
  return {
    id: m.id,
    authUserId: m.auth_user_id,
    applicationId: m.application_id,
    name: m.name,
    nickname: m.nickname || "",
    email: m.email,
    memberStatus: m.member_status,
    isBaker: !!m.is_baker,
    mobile: m.mobile || "",
    dob: m.dob || "",
    gender: m.gender || "",
    emergencyName: m.emergency_name || "",
    emergencyPhone: m.emergency_phone || "",
    level: m.level || "",
    specialty: m.specialty || "",
    bio: m.bio || "",
    goals: m.goals || "",
    competitions: m.competitions || "",
    medicalNotes: m.medical_notes || "",
    paid: !!m.paid,
    age: m.age,
    joined: m.joined || "",
    block: m.block || "",
    inductionAck: m.induction_ack || {},
    photo: m.photo || null,
    sessionAttendanceIntent: m.session_attendance_intent || {},
    notifPrefs: m.notif_prefs || {},
    mustChangePassword: !!m.must_change_password,
    targetTime: m.target_time || null,
    messagesSeenAt: m.messages_seen_at,
    isTest: !!m.is_test,
    isGuest: !!m.is_guest,
    benchmarks: (related.benchmarks || []).filter(function (b) { return b.member_id === m.id; }).map(mapBenchmark),
    raceResults: (related.raceResults || []).filter(function (r) { return r.member_id === m.id; }).map(mapRaceResult),
    plannedEvents: (related.plannedEvents || []).filter(function (e) { return e.member_id === m.id; }).map(mapPlannedEvent),
    prescribedDrills: (related.prescribedDrills || []).filter(function (p) { return p.member_id === m.id; }).map(mapPrescribedDrill),
    blockEnrolments: (related.blockEnrolments || []).filter(function (e) { return e.member_id === m.id; }).map(mapBlockEnrolment),
    blockReports: blockReportsMapForMember(related.blockReports, m.id),
    sessionFeedback: (related.sessionFeedback || []).filter(function (f) { return f.member_id === m.id; }).map(mapSessionFeedback),
    generalComments: (related.generalComments || []).filter(function (c) { return c.member_id === m.id; }).map(mapGeneralComment),
  };
}

function mapBenchmark(b) {
  return {
    id: b.id,
    date: b.date,
    event: b.event,
    time: b.time,
    startType: b.start_type,
    split50: b.split_50,
    strokeCount1: b.stroke_count_1,
    strokeCount2: b.stroke_count_2,
    splits: b.splits,
    strokeCounts: b.stroke_counts,
    createdDate: b.created_at ? b.created_at.slice(0, 10) : b.date,
  };
}

function mapRaceResult(r) {
  return {
    id: r.id,
    date: r.date,
    venue: r.venue,
    type: r.type,
    distance: r.distance,
    stroke: r.stroke,
    startType: r.start_type,
    time: r.time,
    split50: r.split_50,
    summary: r.summary,
    conditions: r.conditions,
    goals: r.goals,
  };
}

function mapPlannedEvent(e) {
  return { id: e.id, eventId: e.event_id, eventName: e.event_name, eventDate: e.event_date, note: e.note };
}

function mapPrescribedDrill(p) {
  return { id: p.id, drillId: p.drill_id, note: p.note };
}

function mapBlockEnrolment(e) {
  return {
    id: e.id,
    type: e.type,
    blockId: e.block_id,
    blockLabel: e.block_label,
    pricePaid: e.price_paid == null ? null : Number(e.price_paid),
    discountCode: e.discount_code,
    joinedMidway: !!e.joined_midway,
    paymentStatus: e.payment_status,
    signedUpDate: e.signed_up_date,
    endDate: e.end_date,
  };
}

function mapBlockReport(r) {
  return { id: r.id, blockId: r.block_id, notes: r.notes, published: !!r.published, publishedDate: r.published_date };
}

// The original app keeps blockReports as an object keyed by blockId
// (member.blockReports[blockId] = {notes, published, publishedDate}), not an
// array - block_reports is a proper one-row-per-member-per-block table, so
// rebuild that same keyed shape here to avoid touching every render call site.
function blockReportsMapForMember(rows, memberId) {
  const map = {};
  (rows || []).filter(function (r) { return r.member_id === memberId; }).forEach(function (r) {
    map[r.block_id] = mapBlockReport(r);
  });
  return map;
}

function mapSessionFeedback(f) {
  return { id: f.id, sessionId: f.session_id, sessionDate: f.session_date, text: f.text, audio: f.audio, createdDate: f.created_date };
}

function mapGeneralComment(c) {
  return { id: c.id, text: c.text, audio: c.audio, createdDate: c.created_date };
}

function mapCoach(c) {
  return { id: c.id, authUserId: c.auth_user_id, name: c.name, subtitle: c.subtitle || "", email: c.email, role: c.role, photo: c.photo || null, bio: c.bio || "", messagesSeenAt: c.messages_seen_at };
}

function mapApplication(a) {
  return {
    id: a.id,
    name: a.name,
    email: a.email,
    mobile: a.mobile,
    dob: a.dob,
    gender: a.gender,
    emergencyName: a.emergency_name,
    emergencyPhone: a.emergency_phone,
    swimmerType: a.swimmer_type,
    timesPerWeek: a.times_per_week,
    swimmingSince: a.swimming_since,
    pb100: a.pb_100,
    pbEstimated: !!a.pb_estimated,
    strokeRank1: a.stroke_rank_1,
    strokeRank2: a.stroke_rank_2,
    strokeRank3: a.stroke_rank_3,
    strokeRank4: a.stroke_rank_4,
    kickRating: a.kick_rating,
    benchmarkResponse: a.benchmark_response,
    benchmarkAvg: a.benchmark_avg,
    benchmarkStoppedAt: a.benchmark_stopped_at,
    goals: a.goals,
    targetEvent: a.target_event,
    medical: a.medical,
    extra: a.extra,
    membershipType: a.membership_type,
    blockEnrolmentBlockId: a.block_enrolment_block_id,
    pricePaid: a.price_paid,
    discountCode: a.discount_code,
    packType: a.pack_type,
    packSessionCount: a.pack_session_count,
    packPricePerSession: a.pack_price_per_session,
    packSelectedSessionIds: a.pack_selected_session_ids,
    paymentStatus: a.payment_status,
    status: a.status,
    date: a.created_at ? new Date(a.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "",
  };
}

function mapSession(s) {
  return { id: s.id, date: s.date, title: s.title, focus: s.focus, plan: s.plan, block: s.block, time: s.time, status: s.status, attendance: s.attendance || {} };
}

function mapBlock(b) {
  return { id: b.id, label: b.label, startDate: b.start_date, endDate: b.end_date, priceFull: Number(b.price_full), isOpen: !!b.is_open };
}

function mapSessionPack(p) {
  return {
    id: p.id,
    memberId: p.member_id,
    sessionsTotal: p.sessions_total,
    sessionsUsed: p.sessions_used,
    pricePerSession: Number(p.price_per_session),
    pricePaid: p.price_paid == null ? null : Number(p.price_paid),
    discountCode: p.discount_code,
    purchaseDate: p.purchase_date,
    expiryDate: p.expiry_date,
    allowedSessionIds: p.allowed_session_ids,
    createdBy: p.created_by,
    paymentStatus: p.payment_status,
  };
}

function mapMessage(m) {
  return { id: m.id, channel: m.channel, senderId: m.sender_id, senderName: m.sender_name, isCoach: !!m.is_coach, text: m.text, timestamp: m.created_at };
}

function mapDiscountCode(c) {
  return { code: c.code, type: c.type, value: Number(c.value), appliesTo: c.applies_to, active: !!c.active };
}

function mapBake(b, ratingsRows) {
  const ratings = {};
  (ratingsRows || []).filter(function (r) { return r.bake_id === b.id; }).forEach(function (r) {
    // A rating row belongs to either a member or a coach (bake_ratings_exactly_one_actor) -
    // keyed on whichever id is set, so the ratings map works the same regardless of who rated.
    const raterId = r.member_id || r.coach_id;
    ratings[raterId] = r.skipped ? { skipped: true } : { stars: r.stars, comment: r.comment || "" };
  });
  return { id: b.id, name: b.name, description: b.description || "", bakerName: b.baker_name, date: b.date, photo: b.photo || null, ratings: ratings };
}

function mapShopItem(i) {
  return {
    id: i.id,
    name: i.name,
    description: i.description || "",
    price: Number(i.price),
    condition: i.condition,
    category: i.category,
    photo: i.photo || null,
    status: i.status,
    reservedBy: i.reserved_by_name ? { name: i.reserved_by_name, contact: i.reserved_by_contact, date: i.reserved_date } : null,
    createdDate: i.created_date,
  };
}

function mapPizzaOrder(o) {
  return {
    id: o.id,
    name: o.name,
    plusOnes: o.plus_ones || [],
    pizzaQty: o.pizza_qty || {},
    drinkQty: o.drink_qty || {},
    sideQty: o.side_qty || {},
    dipQty: o.dip_qty || {},
    wineQty: o.wine_qty || {},
    total: Number(o.total),
    paid: !!o.paid,
  };
}

function mapHallOfRecord(r) {
  return { id: r.id, event: r.event, holder: r.holder, time: r.time, gender: r.gender, date: r.date, startType: r.start_type };
}

function mapDrill(d) {
  return { id: d.id, stroke: d.stroke, name: d.name, focus: d.focus || "", description: d.description || "", videoUrl: d.video_url || null };
}

// ---------------------------------------------------------------------------
// Public (logged-out) hydration - only the tables the public site and the
// application form need, all readable by the anon role per RLS. Kept
// separate from fetchAllData() because that one assumes an authenticated
// coach/member and will hit RLS denials on anon-restricted tables.
// ---------------------------------------------------------------------------

export async function fetchPublicData() {
  const [blocksRes, sessionsRes, discountCodesRes, shopItemsRes, clubSettingsRes, hallOfRecordsRes, drillLibraryRes] = await Promise.all([
    supabase.from("blocks").select("*"),
    supabase.from("sessions").select("*").order("date"),
    supabase.from("discount_codes").select("*").eq("active", true),
    supabase.from("shop_items").select("*"),
    supabase.from("club_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("hall_of_records").select("*"),
    supabase.from("drill_library").select("*"),
  ]);
  const firstError = [blocksRes, sessionsRes, discountCodesRes, shopItemsRes, clubSettingsRes, hallOfRecordsRes, drillLibraryRes]
    .find(function (r) { return r.error; });
  if (firstError) throw firstError.error;

  return {
    members: [], coaches: [], applications: [], sessionPacks: [], messages: [], bakes: [],
    pizzaOrders: [],
    blocks: blocksRes.data.map(mapBlock),
    sessions: sessionsRes.data.map(mapSession),
    discountCodes: discountCodesRes.data.map(mapDiscountCode),
    shopItems: shopItemsRes.data.map(mapShopItem),
    pizzaDeadline: clubSettingsRes.data ? clubSettingsRes.data.pizza_deadline : null,
    pizzaDeliveryFee: clubSettingsRes.data ? Number(clubSettingsRes.data.pizza_delivery_fee || 0) : 0,
    hallOfRecords: hallOfRecordsRes.data.map(mapHallOfRecord),
    drillLibrary: drillLibraryRes.data.map(mapDrill),
  };
}

export async function fetchAllData() {
  const [
    membersRes, coachesRes, applicationsRes, sessionsRes, blocksRes, sessionPacksRes,
    blockEnrolmentsRes, benchmarksRes, raceResultsRes, plannedEventsRes, prescribedDrillsRes,
    blockReportsRes, sessionFeedbackRes, generalCommentsRes, messagesRes, discountCodesRes,
    bakesRes, bakeRatingsRes, shopItemsRes, pizzaOrdersRes, clubSettingsRes, drillLibraryRes,
    hallOfRecordsRes,
  ] = await Promise.all([
    supabase.from("members").select("*"),
    supabase.from("coaches").select("*"),
    supabase.from("applications").select("*"),
    supabase.from("sessions").select("*").order("date"),
    supabase.from("blocks").select("*"),
    supabase.from("session_packs").select("*"),
    supabase.from("block_enrolments").select("*"),
    supabase.from("benchmarks").select("*"),
    supabase.from("race_results").select("*"),
    supabase.from("planned_events").select("*"),
    supabase.from("prescribed_drills").select("*"),
    supabase.from("block_reports").select("*"),
    supabase.from("session_feedback").select("*"),
    supabase.from("general_comments").select("*"),
    supabase.from("messages").select("*").order("created_at"),
    supabase.from("discount_codes").select("*"),
    supabase.from("bakes").select("*"),
    supabase.from("bake_ratings").select("*"),
    supabase.from("shop_items").select("*"),
    supabase.from("pizza_orders").select("*"),
    supabase.from("club_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("drill_library").select("*"),
    supabase.from("hall_of_records").select("*"),
  ]);

  const firstError = [
    membersRes, coachesRes, applicationsRes, sessionsRes, blocksRes, sessionPacksRes,
    blockEnrolmentsRes, benchmarksRes, raceResultsRes, plannedEventsRes, prescribedDrillsRes,
    blockReportsRes, sessionFeedbackRes, generalCommentsRes, messagesRes, discountCodesRes,
    bakesRes, bakeRatingsRes, shopItemsRes, pizzaOrdersRes, clubSettingsRes, drillLibraryRes,
    hallOfRecordsRes,
  ].find(function (r) { return r.error; });
  if (firstError) throw firstError.error;

  const related = {
    benchmarks: benchmarksRes.data,
    raceResults: raceResultsRes.data,
    plannedEvents: plannedEventsRes.data,
    prescribedDrills: prescribedDrillsRes.data,
    blockEnrolments: blockEnrolmentsRes.data,
    blockReports: blockReportsRes.data,
    sessionFeedback: sessionFeedbackRes.data,
    generalComments: generalCommentsRes.data,
  };

  return {
    members: membersRes.data.map(function (m) { return mapMember(m, related); }),
    coaches: coachesRes.data.map(mapCoach),
    applications: applicationsRes.data.map(mapApplication),
    sessions: sessionsRes.data.map(mapSession),
    blocks: blocksRes.data.map(mapBlock),
    sessionPacks: sessionPacksRes.data.map(mapSessionPack),
    messages: messagesRes.data.map(mapMessage),
    discountCodes: discountCodesRes.data.map(mapDiscountCode),
    bakes: bakesRes.data.map(function (b) { return mapBake(b, bakeRatingsRes.data); }),
    shopItems: shopItemsRes.data.map(mapShopItem),
    pizzaOrders: pizzaOrdersRes.data.map(mapPizzaOrder),
    pizzaDeadline: clubSettingsRes.data ? clubSettingsRes.data.pizza_deadline : null,
    pizzaDeliveryFee: clubSettingsRes.data ? Number(clubSettingsRes.data.pizza_delivery_fee || 0) : 0,
    hallOfRecords: hallOfRecordsRes.data.map(mapHallOfRecord),
    drillLibrary: drillLibraryRes.data.map(mapDrill),
  };
}

function unwrap(result) {
  if (result.error) throw result.error;
  return result.data;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email: email, password: password });
  if (error) throw error;
  return data;
}

export async function changeMyPassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

export async function getProfileForAuthUser(authUserId) {
  const [coachRes, memberRes] = await Promise.all([
    supabase.from("coaches").select("*").eq("auth_user_id", authUserId).maybeSingle(),
    supabase.from("members").select("*").eq("auth_user_id", authUserId).maybeSingle(),
  ]);
  if (coachRes.error) throw coachRes.error;
  if (memberRes.error) throw memberRes.error;
  if (coachRes.data) return { role: "coach", coach: mapCoach(coachRes.data) };
  if (memberRes.data) return { role: "member", member: mapMember(memberRes.data, {}) };
  return null;
}

// ---------------------------------------------------------------------------
// Applications
// ---------------------------------------------------------------------------

export async function createApplicationAndMember(appData, authUserId) {
  // applications has no "select own row back" RLS policy (only coaches can SELECT
  // applications), so insert().select() would fail for a brand-new applicant.
  // Generate the id client-side instead, so we never need to read the row back.
  const applicationId = crypto.randomUUID();
  const appRow = {
    id: applicationId,
    name: appData.name, email: appData.email, mobile: appData.mobile || null, dob: appData.dob || null,
    gender: appData.gender || null, emergency_name: appData.emergencyName || null, emergency_phone: appData.emergencyPhone || null,
    swimmer_type: appData.swimmerType || null, times_per_week: appData.timesPerWeek || null, swimming_since: appData.swimmingSince || null,
    pb_100: appData.pb100 || null, pb_estimated: !!appData.pbEstimated,
    stroke_rank_1: appData.strokeRank1 || null, stroke_rank_2: appData.strokeRank2 || null,
    stroke_rank_3: appData.strokeRank3 || null, stroke_rank_4: appData.strokeRank4 || null,
    kick_rating: appData.kickRating || null, benchmark_response: appData.benchmarkResponse || null,
    benchmark_avg: appData.benchmarkAvg || null, benchmark_stopped_at: appData.benchmarkStoppedAt || null,
    goals: appData.goals || null, target_event: appData.targetEvent || null, medical: appData.medical || null,
    extra: appData.extra || null,
    membership_type: appData.blockEnrolment ? appData.blockEnrolment.type : null,
    block_enrolment_block_id: appData.blockEnrolment ? appData.blockEnrolment.blockId : null,
    price_paid: appData.blockEnrolment ? appData.blockEnrolment.pricePaid : null,
    discount_code: appData.blockEnrolment ? appData.blockEnrolment.discountCode : null,
    pack_type: appData.blockEnrolment ? appData.blockEnrolment.packType : null,
    pack_session_count: appData.blockEnrolment ? appData.blockEnrolment.packSessionCount : null,
    pack_price_per_session: appData.blockEnrolment ? appData.blockEnrolment.packPricePerSession : null,
    pack_selected_session_ids: appData.blockEnrolment ? appData.blockEnrolment.packSelectedSessionIds : null,
    end_date: appData.blockEnrolment ? appData.blockEnrolment.endDate || null : null,
    payment_status: "pending",
    status: "pending",
  };
  const { error: appError } = await supabase.from("applications").insert(appRow);
  if (appError) throw appError;

  // Same reasoning as applications above: if email confirmation is required,
  // the new user has no session yet at this point (auth.uid() is still null),
  // so a select-back guarded by "auth_user_id = auth.uid()" would also fail.
  const memberId = crypto.randomUUID();
  const memberRow = {
    id: memberId,
    auth_user_id: authUserId,
    application_id: applicationId,
    name: appData.name,
    email: appData.email,
    member_status: "pending",
    mobile: appData.mobile || null,
    dob: appData.dob || null,
    gender: appData.gender || null,
    emergency_name: appData.emergencyName || null,
    emergency_phone: appData.emergencyPhone || null,
    level: appData.swimmerType || null,
    specialty: appData.strokeRank1 || null,
    bio: appData.goals || null,
    goals: appData.goals || null,
    competitions: appData.targetEvent || null,
    medical_notes: appData.medical || null,
    joined: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    paid: false,
  };
  const { error: memberError } = await supabase.from("members").insert(memberRow);
  if (memberError) throw memberError;

  return { applicationId: applicationId, memberId: memberId };
}

export async function createCommunityMember(formData, authUserId) {
  const memberId = crypto.randomUUID();
  const memberRow = {
    id: memberId,
    auth_user_id: authUserId,
    name: formData.name,
    email: formData.email,
    member_status: "community",
    bio: formData.goals || null,
    goals: formData.goals || null,
    joined: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    paid: false,
  };
  const { error } = await supabase.from("members").insert(memberRow);
  if (error) throw error;
  return { memberId: memberId };
}

export async function applyForFridaysFromCommunity(memberId, appData) {
  const applicationId = crypto.randomUUID();
  const appRow = {
    id: applicationId,
    name: appData.name, email: appData.email, mobile: appData.mobile || null, dob: appData.dob || null,
    gender: appData.gender || null, emergency_name: appData.emergencyName || null, emergency_phone: appData.emergencyPhone || null,
    swimmer_type: appData.swimmerType || null, times_per_week: appData.timesPerWeek || null, swimming_since: appData.swimmingSince || null,
    pb_100: appData.pb100 || null, pb_estimated: !!appData.pbEstimated,
    stroke_rank_1: appData.strokeRank1 || null, stroke_rank_2: appData.strokeRank2 || null,
    stroke_rank_3: appData.strokeRank3 || null, stroke_rank_4: appData.strokeRank4 || null,
    kick_rating: appData.kickRating || null, benchmark_response: appData.benchmarkResponse || null,
    benchmark_avg: appData.benchmarkAvg || null, benchmark_stopped_at: appData.benchmarkStoppedAt || null,
    goals: appData.goals || null, target_event: appData.targetEvent || null, medical: appData.medical || null,
    extra: appData.extra || null,
    membership_type: appData.blockEnrolment ? appData.blockEnrolment.type : null,
    block_enrolment_block_id: appData.blockEnrolment ? appData.blockEnrolment.blockId : null,
    price_paid: appData.blockEnrolment ? appData.blockEnrolment.pricePaid : null,
    discount_code: appData.blockEnrolment ? appData.blockEnrolment.discountCode : null,
    pack_type: appData.blockEnrolment ? appData.blockEnrolment.packType : null,
    pack_session_count: appData.blockEnrolment ? appData.blockEnrolment.packSessionCount : null,
    pack_price_per_session: appData.blockEnrolment ? appData.blockEnrolment.packPricePerSession : null,
    pack_selected_session_ids: appData.blockEnrolment ? appData.blockEnrolment.packSelectedSessionIds : null,
    end_date: appData.blockEnrolment ? appData.blockEnrolment.endDate || null : null,
    payment_status: "pending",
    status: "pending",
  };
  const { error: appError } = await supabase.from("applications").insert(appRow);
  if (appError) throw appError;

  const memberRow = {
    application_id: applicationId,
    name: appData.name,
    email: appData.email,
    member_status: "pending",
    mobile: appData.mobile || null,
    dob: appData.dob || null,
    gender: appData.gender || null,
    emergency_name: appData.emergencyName || null,
    emergency_phone: appData.emergencyPhone || null,
    level: appData.swimmerType || null,
    specialty: appData.strokeRank1 || null,
    bio: appData.goals || null,
    goals: appData.goals || null,
    competitions: appData.targetEvent || null,
    medical_notes: appData.medical || null,
  };
  const { error: memberError } = await supabase.from("members").update(memberRow).eq("id", memberId);
  if (memberError) throw memberError;

  return { applicationId: applicationId };
}

export async function approveApplication(applicationId) {
  const { error } = await supabase.rpc("approve_application", { p_application_id: applicationId });
  if (error) throw error;
}

export async function rejectApplication(applicationId) {
  const { error } = await supabase.rpc("reject_application", { p_application_id: applicationId });
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Sessions / attendance / register
// ---------------------------------------------------------------------------

export async function toggleAttendance(sessionId, memberId) {
  const { error } = await supabase.rpc("toggle_attendance", { p_session_id: sessionId, p_member_id: memberId });
  if (error) throw error;
}

export async function deleteSession(sessionId) {
  const { error } = await supabase.from("sessions").delete().eq("id", sessionId);
  if (error) throw error;
}

export async function toggleSessionCancelled(sessionId, currentStatus) {
  const { error } = await supabase.from("sessions").update({ status: currentStatus === "cancelled" ? null : "cancelled" }).eq("id", sessionId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Blocks / session packs
// ---------------------------------------------------------------------------

export async function updateBlockPrice(blockId, price) {
  const { error } = await supabase.from("blocks").update({ price_full: price }).eq("id", blockId);
  if (error) throw error;
}

export async function createSessionPackForMember(memberId, pack) {
  const row = {
    member_id: memberId,
    sessions_total: pack.sessionsTotal,
    sessions_used: 0,
    price_per_session: pack.pricePerSession,
    price_paid: pack.pricePaid != null ? pack.pricePaid : null,
    discount_code: pack.discountCode || null,
    purchase_date: new Date().toISOString().slice(0, 10),
    expiry_date: pack.expiryDate,
    allowed_session_ids: pack.allowedSessionIds || null,
    created_by: pack.createdBy,
    payment_status: pack.paymentStatus || "pending",
  };
  const newPack = unwrap(await supabase.from("session_packs").insert(row).select().single());
  return mapSessionPack(newPack);
}

export async function updateSessionPack(packId, fields) {
  const row = {};
  if (fields.sessionsTotal !== undefined) row.sessions_total = fields.sessionsTotal;
  if (fields.sessionsUsed !== undefined) row.sessions_used = fields.sessionsUsed;
  if (fields.pricePerSession !== undefined) row.price_per_session = fields.pricePerSession;
  if (fields.expiryDate !== undefined) row.expiry_date = fields.expiryDate;
  const { error } = await supabase.from("session_packs").update(row).eq("id", packId);
  if (error) throw error;
}

export async function deleteSessionPack(packId) {
  const { error } = await supabase.from("session_packs").delete().eq("id", packId);
  if (error) throw error;
}

export async function confirmPackPayment(packId) {
  const { error } = await supabase.from("session_packs").update({ payment_status: "confirmed" }).eq("id", packId);
  if (error) throw error;
}

export async function confirmEnrolmentPayment(enrolmentId, endDate) {
  const row = { payment_status: "confirmed" };
  if (endDate) row.end_date = endDate;
  const { error } = await supabase.from("block_enrolments").update(row).eq("id", enrolmentId);
  if (error) throw error;
}

export async function createBlockEnrolment(memberId, enrolment) {
  const row = {
    member_id: memberId,
    type: enrolment.type,
    block_id: enrolment.blockId || null,
    block_label: enrolment.blockLabel,
    price_paid: enrolment.pricePaid,
    discount_code: enrolment.discountCode || null,
    joined_midway: !!enrolment.joinedMidway,
    payment_status: enrolment.paymentStatus || "pending",
    signed_up_date: enrolment.signedUpDate || new Date().toISOString().slice(0, 10),
    end_date: enrolment.endDate || null,
  };
  const newRow = unwrap(await supabase.from("block_enrolments").insert(row).select().single());
  return mapBlockEnrolment(newRow);
}

export async function deleteBlockEnrolment(enrolmentId) {
  const { error } = await supabase.from("block_enrolments").delete().eq("id", enrolmentId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Block reports / session feedback / general comments (coach -> roster)
// ---------------------------------------------------------------------------

export async function saveBlockReportNotes(memberId, blockId, notes) {
  const { error } = await supabase.from("block_reports").upsert(
    { member_id: memberId, block_id: blockId, notes: notes },
    { onConflict: "member_id,block_id" }
  );
  if (error) throw error;
}

export async function toggleBlockReportPublished(memberId, blockId, currentlyPublished) {
  const row = { member_id: memberId, block_id: blockId, published: !currentlyPublished };
  if (!currentlyPublished) row.published_date = new Date().toISOString().slice(0, 10);
  const { error } = await supabase.from("block_reports").upsert(row, { onConflict: "member_id,block_id" });
  if (error) throw error;
}

export async function addSessionFeedback(memberId, sessionId, sessionDate, text, audio) {
  const row = { member_id: memberId, session_id: sessionId || null, session_date: sessionDate || null, text: text || "", audio: audio || null };
  const { error } = await supabase.from("session_feedback").insert(row);
  if (error) throw error;
}

export async function deleteSessionFeedback(feedbackId) {
  const { error } = await supabase.from("session_feedback").delete().eq("id", feedbackId);
  if (error) throw error;
}

export async function addGeneralComment(memberId, text, audio) {
  const row = { member_id: memberId, text: text || "", audio: audio || null };
  const { error } = await supabase.from("general_comments").insert(row);
  if (error) throw error;
}

export async function deleteGeneralComment(commentId) {
  const { error } = await supabase.from("general_comments").delete().eq("id", commentId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Member profile completion / roster edits
// ---------------------------------------------------------------------------

export async function completeMemberApplication(memberId, formData) {
  const row = {
    name: formData.name || undefined,
    email: formData.email || undefined,
    mobile: formData.mobile || "",
    dob: formData.dob || null,
    gender: formData.gender || null,
    emergency_name: formData.emergencyName || "",
    emergency_phone: formData.emergencyPhone || "",
    level: formData.swimmerType || "",
    specialty: formData.strokeRank1 || "",
    bio: formData.goals || "",
    goals: formData.goals || "",
    competitions: formData.targetEvent || "",
    medical_notes: formData.medical || "",
    member_status: "approved",
  };
  const { error } = await supabase.from("members").update(row).eq("id", memberId);
  if (error) throw error;
}

export async function updateMemberFields(memberId, camelFields) {
  const map = {
    raceResults: null, // handled via dedicated child-table functions, not a column
    name: "name", nickname: "nickname", mobile: "mobile", dob: "dob", gender: "gender",
    emergencyName: "emergency_name", emergencyPhone: "emergency_phone", level: "level",
    specialty: "specialty", bio: "bio", goals: "goals", competitions: "competitions",
    medicalNotes: "medical_notes", paid: "paid", age: "age", block: "block",
    inductionAck: "induction_ack", photo: "photo", sessionAttendanceIntent: "session_attendance_intent",
    notifPrefs: "notif_prefs", isBaker: "is_baker", mustChangePassword: "must_change_password",
    targetTime: "target_time", email: "email",
  };
  // dob is a date column (rejects "") and gender has a CHECK ('M'/'F'/null) that
  // an empty-string placeholder from an unset <select> would violate.
  const emptyStringToNullColumns = { dob: true, gender: true };
  const row = {};
  Object.keys(camelFields).forEach(function (k) {
    const col = map[k];
    if (!col) return;
    const value = camelFields[k];
    row[col] = emptyStringToNullColumns[col] && value === "" ? null : value;
  });
  if (Object.keys(row).length === 0) return;
  const { error } = await supabase.from("members").update(row).eq("id", memberId);
  if (error) throw error;
}

export async function togglePaymentFlag(memberId, nextPaid) {
  const { error } = await supabase.from("members").update({ paid: nextPaid }).eq("id", memberId);
  if (error) throw error;
}

export async function deleteMember(memberId) {
  const { error } = await supabase.from("members").delete().eq("id", memberId);
  if (error) throw error;
}

// Guests are a lightweight members row (no auth_user_id, no real login) for a
// swimmer who needs to be on a register or have a time recorded without going
// through a full application/profile - a trial swimmer or one-off guest.
// Runs through an RPC (not a direct insert) since any coach should be able to
// add one, not just the head coach, and members RLS otherwise restricts a
// direct approved-status insert to the head coach.
export async function createGuestMember(name, block) {
  const { data, error } = await supabase.rpc("create_guest_member", { p_name: name, p_block: block || null });
  if (error) throw error;
  return data;
}

export async function deleteGuestMember(memberId) {
  const { error } = await supabase.rpc("delete_guest_member", { p_member_id: memberId });
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Benchmarks / drills / race results / planned events
// ---------------------------------------------------------------------------

// Keeps only the fastest time per swimmer per event per calendar date -
// multiple attempts in one session can all be submitted, only the quickest
// sticks, and it never compares across different dates (see
// upsert_best_benchmark in the DB). Returns true if this time was recorded,
// false if a faster one already existed for that day and this was discarded.
export async function addBenchmarkForMember(memberId, entry) {
  const { data, error } = await supabase.rpc("upsert_best_benchmark", {
    p_member_id: memberId, p_event: entry.event, p_date: entry.date, p_time: entry.time,
    p_start_type: entry.startType || "push", p_split_50: entry.split50 || null,
    p_stroke_count_1: entry.strokeCount1 || null, p_stroke_count_2: entry.strokeCount2 || null,
    p_splits: entry.splits || null, p_stroke_counts: entry.strokeCounts || null,
  });
  if (error) throw error;
  return data;
}

export async function updateBenchmark(benchmarkId, entry) {
  const row = {
    date: entry.date, event: entry.event, time: entry.time, start_type: entry.startType || "push",
    split_50: entry.split50 || null, stroke_count_1: entry.strokeCount1 || null, stroke_count_2: entry.strokeCount2 || null,
    splits: entry.splits || null, stroke_counts: entry.strokeCounts || null,
  };
  const { error } = await supabase.from("benchmarks").update(row).eq("id", benchmarkId);
  if (error) throw error;
}

export async function deleteBenchmark(benchmarkId) {
  const { error } = await supabase.from("benchmarks").delete().eq("id", benchmarkId);
  if (error) throw error;
}

export async function savePrescribedDrillsForMember(memberId, drills) {
  const { error: delError } = await supabase.from("prescribed_drills").delete().eq("member_id", memberId);
  if (delError) throw delError;
  if (drills.length === 0) return;
  const rows = drills.map(function (d) { return { member_id: memberId, drill_id: d.drillId, note: d.note || null }; });
  const { error } = await supabase.from("prescribed_drills").insert(rows);
  if (error) throw error;
}

export async function addRaceResult(memberId, result) {
  const row = {
    member_id: memberId, date: result.date, venue: result.venue || null, type: result.type || null,
    distance: result.distance || null, stroke: result.stroke || null, start_type: result.startType || null,
    time: result.time || null, split_50: result.split50 || null, summary: result.summary || null,
    conditions: result.conditions || null, goals: result.goals || null,
  };
  const { error } = await supabase.from("race_results").insert(row);
  if (error) throw error;
}

// The member-facing race log / events editors manage a full local array and
// call onSave(nextArray) - mirror that "replace the whole list" semantic by
// deleting and re-inserting rather than diffing, same approach as
// replaceHallOfRecords. Fine at this scale (a handful of rows per swimmer).
export async function replaceRaceResults(memberId, results) {
  const { error: delError } = await supabase.from("race_results").delete().eq("member_id", memberId);
  if (delError) throw delError;
  if (results.length === 0) return;
  const rows = results.map(function (r) {
    return {
      member_id: memberId, date: r.date, venue: r.venue || null, type: r.type || null,
      distance: r.distance || null, stroke: r.stroke || null, start_type: r.startType || null,
      time: r.time || null, split_50: r.split50 || null, summary: r.summary || null,
      conditions: r.conditions || null, goals: r.goals || null,
    };
  });
  const { error } = await supabase.from("race_results").insert(rows);
  if (error) throw error;
}

export async function addPlannedEvent(memberId, event) {
  const row = { member_id: memberId, event_id: event.eventId, event_name: event.eventName, event_date: event.eventDate, note: event.note || null };
  const { error } = await supabase.from("planned_events").insert(row);
  if (error) throw error;
}

export async function replacePlannedEvents(memberId, events) {
  const { error: delError } = await supabase.from("planned_events").delete().eq("member_id", memberId);
  if (delError) throw delError;
  if (events.length === 0) return;
  const rows = events.map(function (e) { return { member_id: memberId, event_id: e.eventId, event_name: e.eventName, event_date: e.eventDate, note: e.note || null }; });
  const { error } = await supabase.from("planned_events").insert(rows);
  if (error) throw error;
}

export async function deletePlannedEvent(id) {
  const { error } = await supabase.from("planned_events").delete().eq("id", id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export async function sendMessage(channel, senderId, senderName, isCoach, text) {
  const row = { channel: channel, sender_id: senderId, sender_name: senderName, is_coach: isCoach, text: text };
  const { error } = await supabase.from("messages").insert(row);
  if (error) throw error;
}

// Persisted server-side (rather than local component state) so the
// Messages tab badge doesn't reset to "everything unread" on every reload.
export async function markCoachMessagesSeen(coachId) {
  const { error } = await supabase.from("coaches").update({ messages_seen_at: new Date().toISOString() }).eq("id", coachId);
  if (error) throw error;
}
export async function markMemberMessagesSeen(memberId) {
  const { error } = await supabase.from("members").update({ messages_seen_at: new Date().toISOString() }).eq("id", memberId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Bakes / Cake Your Marks
// ---------------------------------------------------------------------------

export async function rateBake(bakeId, memberId, stars, comment) {
  if (stars === null) {
    const { error } = await supabase.from("bake_ratings").delete().eq("bake_id", bakeId).eq("member_id", memberId);
    if (error) throw error;
    return;
  }
  const { error } = await supabase.from("bake_ratings").upsert({ bake_id: bakeId, member_id: memberId, stars: stars, comment: comment || "", skipped: false }, { onConflict: "bake_id,member_id" });
  if (error) throw error;
}

export async function skipBake(bakeId, memberId) {
  const { error } = await supabase.from("bake_ratings").upsert({ bake_id: bakeId, member_id: memberId, skipped: true, stars: null }, { onConflict: "bake_id,member_id" });
  if (error) throw error;
}

export async function rateBakeAsCoach(bakeId, coachId, stars, comment) {
  if (stars === null) {
    const { error } = await supabase.from("bake_ratings").delete().eq("bake_id", bakeId).eq("coach_id", coachId);
    if (error) throw error;
    return;
  }
  const { error } = await supabase.from("bake_ratings").upsert({ bake_id: bakeId, coach_id: coachId, stars: stars, comment: comment || "", skipped: false }, { onConflict: "bake_id,coach_id" });
  if (error) throw error;
}

export async function skipBakeAsCoach(bakeId, coachId) {
  const { error } = await supabase.from("bake_ratings").upsert({ bake_id: bakeId, coach_id: coachId, skipped: true, stars: null }, { onConflict: "bake_id,coach_id" });
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Drill library - unlike hall_of_records, drills are referenced by
// prescribed_drills.drill_id, so a delete-all-and-reinsert would orphan
// existing prescriptions. Diff against the current list instead.
// ---------------------------------------------------------------------------

export async function syncDrillLibrary(nextDrills, currentDrills) {
  const currentIds = new Set(currentDrills.map(function (d) { return d.id; }));
  const nextIds = new Set(nextDrills.filter(function (d) { return currentIds.has(d.id); }).map(function (d) { return d.id; }));
  const toDelete = currentDrills.filter(function (d) { return !nextIds.has(d.id); });
  const toAdd = nextDrills.filter(function (d) { return !currentIds.has(d.id); });
  const toUpdate = nextDrills.filter(function (d) { return currentIds.has(d.id); });

  for (const d of toDelete) {
    const { error } = await supabase.from("drill_library").delete().eq("id", d.id);
    if (error) throw error;
  }
  for (const d of toUpdate) {
    const { error } = await supabase.from("drill_library").update({
      stroke: d.stroke, name: d.name, focus: d.focus || null, description: d.desc || d.description || null, video_url: d.videoUrl || null,
    }).eq("id", d.id);
    if (error) throw error;
  }
  if (toAdd.length > 0) {
    const rows = toAdd.map(function (d) { return { stroke: d.stroke, name: d.name, focus: d.focus || null, description: d.desc || d.description || null, video_url: d.videoUrl || null }; });
    const { error } = await supabase.from("drill_library").insert(rows);
    if (error) throw error;
  }
}

// ---------------------------------------------------------------------------
// Blocks / discount codes (coach admin)
// ---------------------------------------------------------------------------

export async function toggleBlockOpen(blockId, currentlyOpen) {
  const { error } = await supabase.from("blocks").update({ is_open: !currentlyOpen }).eq("id", blockId);
  if (error) throw error;
}

export async function addDiscountCode(code) {
  const row = { code: code.code, type: code.type, value: code.value, applies_to: code.appliesTo, active: code.active !== false };
  const { error } = await supabase.from("discount_codes").insert(row);
  if (error) throw error;
}

export async function toggleDiscountCode(codeStr, currentlyActive) {
  const { error } = await supabase.from("discount_codes").update({ active: !currentlyActive }).eq("code", codeStr);
  if (error) throw error;
}

export async function deleteDiscountCode(codeStr) {
  const { error } = await supabase.from("discount_codes").delete().eq("code", codeStr);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Coach profile / account management
// ---------------------------------------------------------------------------

export async function updateCoachFields(coachId, camelFields) {
  const map = { name: "name", subtitle: "subtitle", email: "email", photo: "photo", bio: "bio" };
  const row = {};
  Object.keys(camelFields).forEach(function (k) { if (map[k]) row[map[k]] = camelFields[k]; });
  if (Object.keys(row).length === 0) return;
  const { error } = await supabase.from("coaches").update(row).eq("id", coachId);
  if (error) throw error;
}

export async function addAssistantCoach(name, email, password) {
  const authData = await signUp(email, password);
  if (!authData.user) throw new Error("Check the inbox for " + email + " to confirm the account before they can log in.");
  // coaches.id is a plain text primary key with no default (unlike the
  // uuid-keyed tables) - the original app generated its own ids for this
  // ("c"+Date.now()), so this needs an explicit value too.
  const { error } = await supabase.from("coaches").insert({ id: crypto.randomUUID(), name: name, email: email, subtitle: "Assistant Coach", role: "assistant", auth_user_id: authData.user.id });
  if (error) throw error;
}

export async function removeCoach(coachId) {
  const { error } = await supabase.from("coaches").delete().eq("id", coachId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Shop
// ---------------------------------------------------------------------------

export async function addShopItem(item) {
  const row = {
    name: item.name, description: item.description || null, price: item.price, condition: item.condition,
    category: item.category, photo: item.photo || null, status: "available",
  };
  const { error } = await supabase.from("shop_items").insert(row);
  if (error) throw error;
}

export async function reserveShopItem(itemId, name, contact) {
  const { error } = await supabase.from("shop_items").update({
    status: "reserved", reserved_by_name: name, reserved_by_contact: contact, reserved_date: new Date().toISOString().slice(0, 10),
  }).eq("id", itemId).eq("status", "available");
  if (error) throw error;
}

export async function updateShopItemStatus(itemId, status) {
  const row = { status: status };
  if (status === "available") { row.reserved_by_name = null; row.reserved_by_contact = null; row.reserved_date = null; }
  const { error } = await supabase.from("shop_items").update(row).eq("id", itemId);
  if (error) throw error;
}

export async function deleteShopItem(itemId) {
  const { error } = await supabase.from("shop_items").delete().eq("id", itemId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Pizza night
// ---------------------------------------------------------------------------

export async function submitPizzaOrder(order) {
  const row = {
    name: order.name, plus_ones: order.plusOnes || [], pizza_qty: order.pizzaQty || {},
    drink_qty: order.drinkQty || {}, side_qty: order.sideQty || {}, dip_qty: order.dipQty || {},
    wine_qty: order.wineQty || {}, total: order.total, paid: false,
  };
  const { error } = await supabase.from("pizza_orders").insert(row);
  if (error) throw error;
}

export async function markPizzaPaid(orderId) {
  const { error } = await supabase.from("pizza_orders").update({ paid: true }).eq("id", orderId);
  if (error) throw error;
}

export async function clearUnpaidPizzaOrders() {
  const { error } = await supabase.from("pizza_orders").delete().eq("paid", false);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Hall of records / drills
// ---------------------------------------------------------------------------

export async function replaceHallOfRecords(records) {
  const { error: delError } = await supabase.from("hall_of_records").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delError) throw delError;
  if (records.length === 0) return;
  const rows = records.map(function (r) {
    return { event: r.event, holder: r.holder, time: r.time, gender: r.gender || null, date: r.date, start_type: r.startType || null };
  });
  const { error } = await supabase.from("hall_of_records").insert(rows);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Bakes / Cake Your Marks (creation, not rating - see rateBake/skipBake above)
// ---------------------------------------------------------------------------

export async function addBake(form, bakerName) {
  const row = {
    name: form.name, description: form.description || null, baker_name: bakerName,
    date: new Date(form.date).toISOString().slice(0, 10), photo: form.photo || null,
  };
  const { error } = await supabase.from("bakes").insert(row);
  if (error) throw error;
}

export async function deleteBake(bakeId) {
  const { error } = await supabase.from("bakes").delete().eq("id", bakeId);
  if (error) throw error;
}

export async function updateBakePhoto(bakeId, photo) {
  const { error } = await supabase.from("bakes").update({ photo: photo }).eq("id", bakeId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Club settings (pizza night deadline / delivery fee)
// ---------------------------------------------------------------------------

export async function updateClubSettings(fields) {
  const row = {};
  if (fields.pizzaDeadline !== undefined) row.pizza_deadline = fields.pizzaDeadline;
  if (fields.pizzaDeliveryFee !== undefined) row.pizza_delivery_fee = fields.pizzaDeliveryFee;
  const { error } = await supabase.from("club_settings").update(row).eq("id", 1);
  if (error) throw error;
}

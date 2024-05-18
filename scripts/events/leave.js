module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Nayan",
	description: "notify leave.",
};

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "꧌꧍᪥{name}᪥꧌꧍\n━━━━━━━━━━━━━━━━\n\nলিভ নেউয়ার জন্য ধন্যবাদ 🤢" : "Kicked by Administrator\n\n━━━━━━━━━━━━━━━━";
	const path = join(__dirname, "nayan", "leaveGif");
	const gifPath = join(path, `l.gif`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = "꧌꧍᪥{name}᪥꧌꧍\n━━━━━━━━━━━━━━━━\n তুই Facebook users গ্রুপে থাকার যোগ্য না আবাল\n┏•━••━•━•━ ◎ ━•━•━••━•┓\n🔥 𝗚𝗢𝗢𝗗 𝗕𝗔𝗬 🔥\n┗•━•━••━•━ ◎ ━•━•━••━•┛ \n তর মত মেম্বার আমার BOSS এর দরকার নাই \n⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n┏•━•━•━ ◎ ━•━•━•┓\n🔥 𝗕𝗢𝗧  𝗢𝗪𝗡𝗘𝗥🔥\n┗•━•━•━ ◎ ━•━•━•┛\n╭────────────────╮\n✜ 𝗠𝗢𝗛𝗔𝗠𝗠𝗔𝗗 𝗞𝗔𝗪𝗦𝗘𝗥 ✜\n╰────────────────╯. " : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}

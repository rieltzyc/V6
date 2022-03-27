"use strict";
process.on('uncaughtException', console.error)
const { WAConnection: _WAConnection, MessageType } = require("@adiwajshing/baileys");
const WAConnection = require('./action/other/simple').WAConnection(_WAConnection);
const RzLModz = new WAConnection()
const qrcode = require("qrcode-terminal")
const fs = require("fs")
const figlet = require('figlet')
const CFonts  = require('cfonts')
const Options = JSON.parse(fs.readFileSync('./action/other/setting/options.json'))
const term = require('terminal-kit').terminal 
const moment = require("moment-timezone")
const chatUpdate = require('./command/xm.js')
const { getBuffer, getRandom } = require('./action/tools')
const { exec } = require('child_process')
const { groupUpdate } = require("./action/response/group.js")
const { updateGroup } = require("./action/response/updateGroup")
const { batteryAsyncOBB } = require("./action/response/BatteryValue");
const { start, waiting, close, success } = require('./action/other/function') 
const { chalk, color, bgcolor, ConsoleLog, biocolor } = require('./action/other/color')
  
const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net",   "remoteJid": "6289523258649-1604595598@g.us"  }, "message": {orderMessage: {itemCount: 10,status: 200, thumbnail: fs.readFileSync(`./storage/image/thumb.jpg`), surface: 200, message: `)-----[XM BOT]-----(`, orderTitle: 'LordRzLModz', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
       
const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms))
}
   


nocache('./command/xm.js', module => console.log(color(`New`, 'red'), color(`${module} is now updated!`, 'teal')))
nocache('./start.js', module => console.log(color(`New`, 'red'), color(`${module} is now updated!`, 'teal')))
nocache('./action/other/setting/options.json', module => console.log(color(`New`, 'red'), color(`${module} is now updated!`, 'teal')))
nocache('./action/tools.js', module => console.log(color(`New`, 'red'), color(`${module} is now updated!`, 'teal')))

const starts = async (RzLModz = new WAConnection()) => {
console.log(color('Halo, please subscribe yt RzLModz', 'purple'))
RzLModz.logger.level = 'warn'
RzLModz.version = [2, 2143, 3]
CFonts.say('RzL Modz\nWhatsAppBot', {
  font: 'chrome',
  align: 'center',
  gradient: ['yellow', 'white']
})
CFonts.say(`@RzLModz`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})
RzLModz.browserDescription = [ 'YT RzLModz', 'windows', '3.0' ]
    

RzLModz.on('qr', async (qr) => { 
console.log({qr})
console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan tod jgn dilihat doang')) })
      

fs.existsSync('./action/connection/qrcode.json') && RzLModz.loadAuthInfo('./action/connection/qrcode.json')

RzLModz.on('connecting', async (connecting) => {
start('2', 'Mengkoneksikan ke WhatsApp_Web...')
})
//
RzLModz.on('open', async (open) => {
console.log({open})
success('2', 'Tersambung✔️')
setTimeout( () => {
}, 1500)
})
//
await RzLModz.connect({timeoutMs: 30*1000})
fs.writeFileSync('./action/connection/qrcode.json', JSON.stringify(RzLModz.base64EncodedAuthInfo(), null, '\t'))
//   

console.log(bgcolor('XILVER - MOODS ©WhatsApp_Bot • Created By > [ ®Lord_RzLModz ]\n-------> Ready to use❗', 'gray'))
//
await sleep(3000)

RzLModz.on('ws-close', () => {
console.log(ConsoleLog('Koneksi terputus, mencoba mengkoneksikan ulang..'))})
 
//
RzLModz.on('CB:action,,battery', async (json) => {  
  global.batteryLevelStr = json[2][0][1].value
  global.batterylevel = parseInt(batteryLevelStr)
  const battery = batterylevel 
  global.baterai = battery
   batteryAsyncOBB(RzLModz, json);
   } );
//
RzLModz.on('chat-update', async (message) => {
chatUpdate(RzLModz, message)})   
RzLModz.on('group-participants-update', async (anu) => {				
groupUpdate(RzLModz, anu, MessageType)})	   
//
RzLModz.on('group-update', async (anu) => {
updateGroup(RzLModz, anu, MessageType)
//  
})
//
RzLModz.on('CB:action,,call', async json => {
console.log({json})
const callerId = json[2][0][1].from;
var vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + `${Options.NamaOwner}` + '\n' + `ORG:Developer ${Options.NamaBot}\n` + 'TEL;type=CELL;type=VOICE;waid=' + `${Options.NomorOwner}` + ':+' + `${Options.NomorOwner}` + '\n' + 'END:VCARD'
RzLModz.sendMessage(callerId, "\`\`\`[ ! ] TERDETEKSI CALL [ ! ]\`\`\`\n\n\`\`\`Gua blok asw !. ingin membuka silahkan hubungi owner!", MessageType.text)
RzLModz.sendMessage(callerId, { displayname: `${Options.NamaOwner}`, vcard: vcard}, MessageType.contact, {contextInfo: { externalAdReply:{title: `Creator ${Options.NamaBot}`,body:"",previewType:"PHOTO",thumbnail:fs.readFileSync(`./storage/image/thumb.jpg`),sourceUrl:`https://wa.me/6288277562022?text=Assalamualaikum`}}})
await sleep(5000)
await RzLModz.blockUser(callerId, "add")
})
//
}
function nocache(module, cb = () => { }) {
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)})}
function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)}})}
starts()   
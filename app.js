// const  { default: WAConnection, DisconnectReason ,useSingleFileAuthState, makeInMemoryStore} =  require('@adiwajshing/baileys')
const { 
    default: WAConnection,
    downloadContentFromMessage, 
    emitGroupParticipantsUpdate, 
    emitGroupUpdate,
    generateWAMessageContent, 
    generateWAMessage, 
    makeInMemoryStore, 
    prepareWAMessageMedia, 
    MediaType, 
    areJidsSameUser, 
    WAMessageStatus, 
    AuthenticationState, 
    GroupMetadata, 
    initInMemoryKeyStore,
    getContentType, 
    MiscMessageGenerationOptions, 
    useSingleFileAuthState, 
    BufferJSON, 
    WAMessageProto, 
    MessageOptions, 
    WAFlag, WANode,	
    WAMetric,	
    ChatModification, 
    MessageTypeProto, 
    WALocationMessage, 
    ReconnectMode, 
    WAContextInfo, 
    proto,	
    WAGroupMetadata, 
    ProxyAgent,	
    waChatKey, 
    MimetypeMap, 
    MediaPathMap, 
    WAContactMessage, 
    WAContactsArrayMessage, 
    WAGroupInviteMessage, 
    WATextMessage, 
    WAMessageContent, 
    WAMessage, 
    BaileysError, 
    WA_MESSAGE_STATUS_TYPE, 
    MediaConnInfo, 
    URL_REGEX, 
    WAUrlInfo, 
    WA_DEFAULT_EPHEMERAL, 
    WAMediaUpload, 
    mentionedJid, 
    processTime, 
    Browser, 
    MessageType, 
    Presence, 
    WA_MESSAGE_STUB_TYPES, 
    Mimetype, 
    relayWAMessage,	
    Browsers, 
    GroupSettingChange, 
    delay, 
    DisconnectReason, 
    WASocket, 
    getStream, 
    WAProto, 
    isBaileys, 
    AnyMessageContent, 
    fetchLatestBaileysVersion ,
    useMultiFileAuthState
    
    
    } = require('@adiwajshing/baileys');
const cfonts = require('cfonts')
const P = require('pino')
// const server = require('./express')

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()


// Modulos a usar

app.use(cors())
app.use('/css', express.static(path.resolve(__dirname, './')))
app.use(bodyParser.urlencoded({ extended: true }));

// Login Rutas

    // Manejador de Rutas
    const messageRouter = express.Router();

    messageRouter.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname + '\\index.html'))
    })
    // Agregarlo al App 
    app.use('/', messageRouter)

    // Dashboard
        // Ruta Sing In
        const helloSay = express.Router()
        helloSay.post('/dashboard', (req, res) => {  
            if (req.body.name && req.body.password || req.body.home){
                let name = req.body.name
                let password = req.body.password
                // if (name === "Zud0k4t0" && password === "$Y@r1s$754819"){
                if (name === "juan" && password === "1234" || req.body.home){
                    res.sendFile(__dirname + '\\response.html')
                    // console.log(req.params.name)
                    // console.log( `${name} y ${password}`)
                    // console.log(`
                    // Your User is\n\t==> ${name}
                    // and
                    // Your Password is\n\t==> ${password}
                    // `)
                } else {
                    let fallo = encodeURI("Algo Fallo! :(")
                    res.redirect(301, `/?mensaje=¡${fallo}!`)
                }
                
            } else {
                res.redirect(301, '/?mensaje=¡No%20te%20has%20logueado!')
            }
    
        })
        app.use(helloSay)

// const texto  = cfonts.render("hola", {'color': 'white'})
const banner = cfonts.render(('H4ck3r|S4urio'), {
    font : "block",
    align: "center",
    colors: ["red","white"]
    })

console.log(banner.string)
async function  connectToWhatsApp () {

    const {state, saveCreds } = await useMultiFileAuthState('./cache/botSession.json')
    // console.log(global.state)
    const store = makeInMemoryStore({ logger: P().child({ level: 'debug', stream: 'linhaDoTempo'}) })
    const conexion = WAConnection({
        // can provide additional config here
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ['H4k3r-S4urio', 'Bot', '1.0.0'],
    })
  
    store.bind(conexion.ev)
    // console.log("Almacenamiento")
    // console.log(store)
    conexion.ev.on ("creds.update", saveCreds)
    conexion.ev.on('connection.update', (update) => {

        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            if(true) {
                connectToWhatsApp()
                // console.log("Close ?")
                // console.log(connection)
            }
        } else if(connection === 'open') {
            console.log('opened connection')
            // console.log("Open ?")
            // console.log(connection)
        }
    })
    conexion.ev.on('messages.upsert', m => {
        // console.log('replying to', m.messages[0].key.remoteJid)
        // conexion.sendMessage(m., { text: 'Hello there!' }).then((data) => {
        //     console.log(data)
        // })

        // console.log(m)
        console.log(m.messages[0].key.remoteJid)
        if (m.messages[0].message.conversation === "!type"){
            console.log(typeof m.messages[0].key.remoteJid)
            console.log(typeof m.messages[0].message.conversation)
            conexion.sendMessage(m.messages[0].key.remoteJid, { text: 'Hello'})
        }
        // conexion.sendMessage(m.messages[0].key.remoteJid, { text: "Hello mi pana"})
    })
        // Send Message 
        const message = express.Router()
        message.post('/message', (req, res, next) => {
            if (req.body.number && req.body.message && req.body.code){
                let n = req.body.number.length
                let m = req.body.message
                let c = req.body.code
                if (n <= 9){
                    res.sendFile(__dirname + '\\sendMessage.html')
                    console.log("Datos a enviar:")
                    let number = c+req.body.number+"@s.whatsapp.net"
                    console.log(typeof number)
                    console.log(typeof m)
                    console.log(number, m)
                    conexion.sendMessage(number, { text: m})

                } else {
                    res.sendFile(__dirname + '\\response.html')
                }
                
            } else {
                res.sendFile(__dirname + '\\response.html')
            }
        })
        app.use(message)
        // 404
        app.use((req, res, next) => {
            res.status(404).send("<h1 style='text-align: center; color: red; justify-content: center; margin-top: 50px'>Pagina no encontrada</h1>")
        })
}
connectToWhatsApp()
let locale = 'es'
let d = new Date(new Date + 3600000)
let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
console.log(time)
app.listen(3000, () => {
    console.log('Servidor web iniciado en el puerto 3000');
    });
// run in main file

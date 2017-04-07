const config = require('./config');

var admins = [
  17648054,    // Chip
  244042170,   // Rania
  62781319,    // Andreecy
  126723061,   // Sofyan 
  14455205,     // Herbanu
  120789542     //akmal
]

var commands = {
  
    pawang : [
      244042170, // Rania  
    ],
  
    manualSource : [
      -1001063396772, // Gimpscape
      -166485265 // kamar verina
    ],
  
    controlGroup : [
      -166485265
    ],

    handleMessage(ctx) {
      
        if (ctx.updateType == 'message') {

            let subType = ctx.updateSubType

            switch (ctx.updateSubType) {

                case 'text':
                    this.handleTextMessage(ctx)
                    break

                case 'new_chat_member':
                    this.handleGreetings(ctx)
                    break

                case 'left_chat_member':
                    console.log(ctx)
                    break

            }

        } else if (ctx.updateType == 'inline_query') {

            console.log('Inline query :D')
            console.log(ctx)

        }

    },

    handleTextMessage(ctx) {

        console.log(`${ctx.message.chat.title} (${ctx.message.chat.id}) : @ ${ctx.from.first_name} => ${ctx.message.text}`)

        if (ctx.chat.type == 'group' || ctx.chat.type == 'supergroup') {

            this.handleGroupText(ctx)

        } else if (ctx.chat.type == "private") {

            this.handlePrivate(ctx)

        }

    },

    handleGreetings(ctx) {

        let member = ctx.message.new_chat_member
        let group = ctx.chat

        let greetings = `Hai kak, <b>${member.first_name}</b>!\n\nSelamat datang  di Kontrakan <b>${group.title}</b>`

        ctx.replyWithHTML(greetings)

    },

    handleGroupText(ctx) {
        //console.log(ctx.update)

        let message = ctx.message.text

        switch (message) {
            case "!info":

                ctx.replyWithHTML(
                  '<b>Info Grup</b>\n\nBiar lebih nyaman, silakan baca-baca dulu😊: \n\ <a href="https://telegra.ph/GimpScape-01-06">Peraturan</a>',
                  {'reply_to_message_id':ctx.message.message_id}
                )
            
                break;
            
            case "Verina sudah makan?":

                ctx.replyWithHTML(
                  'Idih, nanya-nanya, mau traktir?',
                  {'reply_to_message_id':ctx.message.message_id}
                )
            
                break;

            case "!ping":
            
                ctx.replyWithMarkdown('*oit😳!!!*',{'reply_to_message_id':ctx.message.message_id})
            
                break
                
            case "!source":
                ctx.replyWithHTML('Silakan main ke rumah 😊, \n\ https://github.com/gimpscape/')
                break;

            case "!members":

                ctx.getChatMembersCount()
                    .then((data) => {
                        ctx.replyWithMarkdown(`*Jumlah Anggota*: ${data}`,{'reply_to_message_id':ctx.message.message_id})
                    })

                break
                
            case "!ss":
                
                if(ctx.message.reply_to_message != null){
                  
                  let idToReply = ctx.message.reply_to_message.message_id
                  ctx.replyWithMarkdown('Duh, perlu _Screenshot_ ini biar Verina juga paham 😄',{'reply_to_message_id':idToReply})
                  
                }
            
                break
                
            case "!setor":
                
                if(ctx.message.reply_to_message != null){
                  
                  let idToReply = ctx.message.reply_to_message.message_id
                  ctx.replyWithMarkdown('Kak setoran kak 😄',{'reply_to_message_id':idToReply})
                  
                }
            
                break
          
            case "!report":
                
                if(ctx.message.reply_to_message != null){
                  
                  let idToReply = ctx.message.reply_to_message.message_id
                  ctx.replyWithMarkdown('*Siap!* \nSudah Verina laporkan ke Kak Admin, Terimakasih laporanya 👩🏻‍✈️ ',{'reply_to_message_id':idToReply})
                  ctx.telegram.sendMessage(
                    '-1001097847357', // Admin Gimpscape
                    `👩🏻‍✈️ <b>Bapak-bapak, ada laporan!</b>\n\nPelapor: <b>${ctx.message.from.first_name}</b>\nPesan yang dilaporkan: <a href="https://t.me/${ctx.chat.username}/${idToReply}">Reported Message</a>`,
                    {'parse_mode':'HTML'}
                  )
                  
                }
            
                break
                
         //   case "!pin":
                
       //         if(ctx.message.reply_to_message != null){
                  
      //            let idToReply = ctx.message.reply_to_message.message_id
        //          ctx.replyWithMarkdown('Pined Message',{'reply_to_pinned_message':idToReply})                   
        //        }
            
          //      break
            
            case "!post":
                
                let isAdmin = false
                                
                if(admins.indexOf(ctx.message.from.id) >= 0){
                  
                  isAdmin = true
                  
                }else{
                  
                  ctx.reply('Eit! Perintah ini khusus Kak Admin😆 \n\ Maaf ya...',{'reply_to_message_id':ctx.message.message_id})
                  return
                  
                }
                
                if(ctx.message.reply_to_message != null){
                  
                  //console.log(ctx.message)
                  
                  let message = ctx.message.reply_to_message.text
                  let image = ctx.message.reply_to_message.photo
                  let document = ctx.message.reply_to_message.document
                  
                  if(message != null){
                    //ctx.telegram.sendMessage('@chanel_purapura',message)  
                    ctx.reply('Maunya repost foto doank 😋',{'reply_to_message_id':ctx.message.message_id})
                  }else if(image != null){
                    
                    let caption = ctx.message.reply_to_message.caption
                    
                    ctx.telegram.sendPhoto(
                      '@gimpscape_ruang_karya',
                      ctx.message.reply_to_message.photo[2].file_id, 
                      {
                        'caption':caption,
                        'reply_markup': 
                           {'inline_keyboard':
                            [
                              [{text: '😍', callback_data: '1'},{text: '😮', callback_data: '2'},{text: '😳', callback_data: '3'},{text: '😐', callback_data: '4'}]
                            ]
                           }
                      }
                    )
                    
                  }else if(document != null){
                    
                    let caption = ctx.message.reply_to_message.caption
                    
                    ctx.telegram.sendDocument(
                      '@gimpscape_ruang_karya',
                      document.file_id, 
                      {
                        'caption':caption,
                        'reply_markup': 
                           {'inline_keyboard':
                            [
                              [{text: '😍', callback_data: '1'},{text: '😮', callback_data: '2'},{text: '😳', callback_data: '3'},{text: '😐', callback_data: '4'}]
                            ]
                           }
                      }
                    )
                  }
                  
                }
            
                
                break
            case "!key":
            
                ctx.reply(
                  'Check',
                  {'reply_markup': 
                     {'inline_keyboard':
                      [
                        [{text: '😍', callback_data: '1'},{text: '😯', callback_data: '2'},{text: '😳', callback_data: '3'},{text: '😐', callback_data: '4'}]
                      ]
                     }
                  })
            
                break
                
            case "!id":
            
              ctx.replyWithMarkdown(`*👮 Permintaan Info ID! 👮* \nID: ${ctx.message.from.id} \nNama: ${ctx.message.from.first_name} `,{'reply_to_message_id':ctx.message.message_id})
              break
              
            default:
                this.handleManual(ctx)
                break

        }

    },

    handlePrivate(ctx) {
        ctx.replyWithHTML('Maaf, lagi sibuk ngurusin group 😚')
    },
    handleManual(ctx){
      
        //console.log(ctx.message)
        
        let isAdmin = false
      
        // Only Allow from list Manual Group
        if(this.manualSource.indexOf(ctx.message.chat.id) == -1){
          //console.log("Bukan dari group whitelist manual, Skip!")
          return
        }
      
        // Only allow mimin
        if(this.pawang.indexOf(ctx.message.from.id) == -1){
          //console.log("Non pawang 🙄")
        }else{
          isAdmin = true
        }
        
        
        let message = ctx.message.text
        
        // Control your bot 😼
        if(config.manual){
          
          if(isAdmin && message == '!auto' && this.controlGroup.indexOf(ctx.message.chat.id) > -1){
            
            ctx.reply("Autopilot : ON")
            
            config.manual = false
            config.save()
            return
            
          }
          
          // Forward to control group
          if(this.controlGroup.indexOf(ctx.message.chat.id) == -1){
            ctx.telegram.sendMessage('-166485265', `${ctx.message.from.first_name} : ${ctx.message.text}`)
          }
          
          // If pawang send reply to group 
          if(isAdmin && this.controlGroup.indexOf(ctx.message.chat.id) > -1){
            ctx.telegram.sendMessage('-1001063396772', ctx.message.text)
          }
          
        }else{
          
          if(isAdmin && message == '!manual' && this.controlGroup.indexOf(ctx.message.chat.id) > -1){
            ctx.reply('Autopilot : OFF')
            
            config.manual = true
            config.save()
          }
          
        }
      
        //console.log(`Manual mode? ${config.manual}`)
        //console.log(`Kuliah mode? ${ctx.session.kuliah}`)
        
        //ctx.telegram.sendMessage('-1001085483555', `From: ${ctx.chat.title}\nMsg ID:${ctx.message.message_id}\nMessage: ${ctx.message.text}`)
    },
  
//     handleLogger(ctx){
//       if(ctx.session.kuliah){
        
//         //console.log(ctx.message)
        
//         let fileName = `./storage/kulgram-${moment().tz("Asia/Jakarta").format('YYYYMMDD')}.txt`
//         let logMessage = `${moment.unix(ctx.message.date).tz("Asia/Jakarta").format('YY-MM-DD hh:mm:ss')}: ${ctx.message.from.first_name} > ${ctx.message.text}\n`
        
//         console.log(logMessage)
        
//         fs.appendFile(fileName, logMessage, function (err) {
//           if (err) throw err;
//           console.log('Log Saved!');
//         });
        
//       }else{
//         console.log('LOGER: Sedang tidak kuliah')
//       }
//     }
}



module.exports = commands
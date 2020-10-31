// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import FormData from "form-data"

export const config = {
  api : {
    bodyParser: false
  }
}

const { BOT_TOKEN, GROUP_ID, DEPLOY_MODE } = process.env
const BOT_URL = "https://api.telegram.org/bot" + BOT_TOKEN

if (DEPLOY_MODE == "serverless"){
  import formidable from 'formidable-serverless'
}else{
  import formidable from 'formidable'
}

const sendMessage = async (messages) => {
  const ENDPOINT = BOT_URL + "/sendMessage"
  let payload = {
    chat_id: GROUP_ID,
    text: messages,
    parse_mode: "HTML"
  }
  return await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
}

const sendDocument = async (messages, files) => {
  const ENDPOINT = BOT_URL + "/sendDocument"
  const payload = new FormData()
  payload.append('chat_id', GROUP_ID)
  payload.append('document', fs.createReadStream(files.path), files.name)
  payload.append('caption', messages)
  payload.append('parse_mode','HTML')

  return await fetch(ENDPOINT, {
    method: 'POST',
    body: payload
  })
}

export default async function handler (req, res){
  return new Promise( resolve => {
    switch (req.method){
      case "POST": {
        const form = new formidable.IncomingForm()
        // mengupload di projectdir/upload
        form.uploadDir = "./uploads/"
        form.keepExtensions = true
        form.parse(req, async (err, fields, files) => {
          const MESSAGES = `#TiketBaru untuk <strong>${fields.tim}</strong>

<strong>Judul Laporan:</strong> 
${fields.judul}

<strong>Deskripsi:</strong>
${fields.deskripsi}

---
<strong>Pelapor</strong>: 
${fields.nama} (${fields.email})  
Github: https://github.com/${fields.github}

#${fields.tipe_laporan} #${fields.layanan} #PriorityUnknown
<i>--Kurir LaporBoi!</i>
`
        if (files.lampiran){
          try {
            const results = await sendDocument(MESSAGES, files.lampiran)
            const responses = await results.json()
            if (responses.ok){
              fs.unlink(files.lampiran.path, (err) => {
                if (err){
                  console.error("error saat menghapus file: ", err)
                  res.status(500).end()
                  return resolve()
                }
              })
              res.status(200).json({error: false, pesan: "Sukses mengirim laporan"})
              return resolve()
            }
            res.statusCode = responses.error_code
            res.status(responses.error_code).json({error: true, pesan: responses.description})
            return resolve()

          } catch (error) {
            console.log("pas di files lampiran", error)
            res.status(500).end()
            return resolve()
          }
        }
        else {
          try {
            const results = await sendMessage(MESSAGES)
            const responses = await results.json()
            if (responses.ok){
              res.statusCode = 200
              res.status(200).json({error: false, pesan: "Sukses mengirim laporan"})
              return resolve()
            }
            res.statusCode = responses.error_code
            res.status(responses.error_code).json({error: true, pesan: responses.description})
            return resolve()
          } catch (error) {
            console.error("pas di bawah response", error)
            res.status(500).end()
            return resolve()
          }
          // end block sendmessage
        }
        // end lampiran
      })

      }
    }
  })
}

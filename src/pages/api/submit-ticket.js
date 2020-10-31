// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable'
import fs from 'fs'
import FormData from "form-data"

export const config = {
  api : {
    bodyParser: false
  }
}

const { BOT_TOKEN, GROUP_ID } = process.env
const BOT_URL = "https://api.telegram.org/bot" + BOT_TOKEN

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
  payload.append('document', fs.createReadStream(files))
  payload.append('caption', messages)
  payload.append('parse_mode','HTML')

  return await fetch(ENDPOINT, {
    method: 'POST',
    body: payload
  })
}

export default async (req, res) => {
  const form = new formidable.IncomingForm()
  // mengupload di projectdir/upload
  form.uploadDir = "./uploads/"
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    console.log(files)
    
    const MESSAGES = `Ada laporan masuk nih:
Pelapor: ${fields.nama} - \(${fields.email}\)
Username Github: ${fields.github}\n
Judul: ${fields.judul}
Deskripsi:
<pre>${fields.deskripsi}</pre>
`
    if (files.lampiran){
      try {
        const results = await sendDocument(MESSAGES, files.lampiran.path)
        const responses = await results.json()
        if (responses.ok){
          fs.unlink(files.lampiran.path, (err) => {
            if (err){
              console.log("error saat menghapus file: ", err)
            }
          })
          res.statusCode = 200
          return res.status(200).json({error: false, pesan: "Sukses mengirim laporan"})
        }
        res.statusCode = responses.error_code
        return res.status(responses.error_code).json({error: true, pesan: responses.description})

      } catch (error) {
        console.log("pas di files lampiran", error)
      }
    }
    else {
      try {
        const results = await sendMessage(MESSAGES)
        const responses = await results.json()
        if (responses.ok){
          res.statusCode = 200
          return res.status(200).json({error: false, pesan: "Sukses mengirim laporan"})
        }
        res.statusCode = responses.error_code
        return res.status(responses.error_code).json({error: true, pesan: responses.description})
      } catch (error) {
        console.log("pas di bawah response", error)
      }
      // end block sendmessage
    }
    // end lampiran
  })
}

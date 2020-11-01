import { Fragment, Component } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import FormLapor from "../components/form"
import CustomHead from "../components/head"
import Tiket from "../components/tiket"
import styles from "../styles/Home.module.css"


const teks_header = "Halaman untuk melaporkan kutu pada layanan BlankOn atau pengajuan permintaan fitur dan kerjasama"
const TEKS_HEADING = "Lapor BOI!"
const ISSUE_URL = "https://github.com/" + process.env.REPOSITORY + "/issues"

class Home extends Component {
  
  static async getInitialProps(ctx){
    const res = await fetch(`https://api.github.com/repos/${process.env.REPOSITORY}/issues`)
    const errorCode = res.ok ? false : res.statusCode
    const json = await res.json()
    return { openIssues: json.slice(0,3) }
  }
  

  render() {
    return (
      <Fragment>
        <CustomHead />
        {/* header */}
        <header className={styles.header}>
          <Container className={styles.container}>
            <h1>{TEKS_HEADING}</h1>
            <p>{teks_header}</p>
          </Container>
        </header>
        {/* end header */}

        {/* main */}
        <main className={styles.main}>
          <Container>
            <Row>
              {/* the form */}
              <Col lg={8}>
                <FormLapor />
              </Col>
              {/* end the form */}

              {/* sidebar */}
              <Col lg={4}>
                <h3>Laporan Terkini</h3>
                {/* list of tickets */}
                {this.props.openIssues.map( (issue) => {
                  let ddiff = (Date.now()) - (new Date(issue.created_at).getTime())
                  let data = {
                      days: Math.floor(ddiff / (1000 * 60 * 60 * 24) ),
                      hour: Math.floor((ddiff / (1000 * 60 * 60))),
                      minute: Math.floor((ddiff / (1000 * 60)) % 60),
                      second: Math.floor((ddiff / 1000 ) % 60)
                  }
                  let timestring = ""
                  if (data.second > 0){
                    timestring = `${data.second} detik lalu`
                  }
                  if (data.minute > 0){
                    timestring = `${data.minute} menit lalu`
                  }
                  if (data.hour > 0){
                    timestring = `${data.hour} jam lalu`
                  }
                  if (data.days > 0){
                    timestring = `${data.days} hari lalu`
                  }
                  return (
                    <Tiket key={issue.id} nomor_tiket={`#${issue.number}`} judul_tiket={issue.title} status_tiket={issue.state} waktu_tiket={timestring} tiket_url={issue.html_url}/>
                  )
                })}
                
                <Button type="link" href={ISSUE_URL} className="rounded-0 mt-3" block>Lihat Laporan Lainnya</Button>
                <br></br>
                {/* <h3 className="mt-3">Daftar Tim BlankOn</h3>
                <ul>
                  <li>Tim Infrastruktur</li>
                  <li>Tim Pemaket</li>
                  <li>Tim Riset</li>
                  <li>Tim Dokumentasi</li>
                  <li>Tim Jaminan Kualitas</li>
                  <li>Tim Kesenian</li>
                  <li>Tim Humas</li>
                </ul>
                <br></br> */}
                <h5 className="mt-3"><strong>Panduan Ringkas Format Penulisan</strong></h5>
                <div styles="font-size:1rem !important;">Penulisan format laporan mendukung format markdown versi 2. Berikut ini adalah beberapa formating yang dapat Anda gunakan:</div>
                <ul>
                  <li><strong>*Teks Tebal*</strong> </li>
                  <li><i>_Cetak Miring_</i></li>
                  <li><u>__Garis Bawah__</u></li>
                  <li><strike>~Coret Teks~</strike></li>
                  <li><a href="https://blankonlinux.or.id/">[Tautan](https://blankonlinux.or.id/)</a> </li>
                  <li><pre>`Inline Preformated`</pre></li>
                  <li> Preformated Block</li>
                  <div>
                    <pre>
                    ```bash <br></br>
                    echo "Your Code" <br></br>
                    ```</pre>
                  </div>
                </ul>
                <di>
                  Penulisan format yang tidak sesuai dengan gaya format Markdown V2 mungkin dapat menyebabkan laporan gagal dikirim.
                </di>
              </Col>
              {/* end sidebar */}
            </Row>
          </Container>
        </main>  
        {/* end main */}
      </Fragment>
    )
  }
}


export default Home
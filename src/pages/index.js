import { Fragment, Component } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import FormLapor from "../components/form"
import CustomHead from "../components/head"
import Tiket from "../components/tiket"
import styles from "../styles/Home.module.css"


const teks_header = "Halaman untuk melaporkan kutu pada layanan BlankOn atau pengajuan permintaan fitur dan kerjasama"
const TEKS_HEADING = "Lapor BOI!"
const ISSUE_URL = "https://github.com/artemtech/lapor-boi/issues"

class Home extends Component {
  
  static async getInitialProps(ctx){
    const res = await fetch("https://api.github.com/repos/BlankOn/Verbeek/issues")
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
                  console.log(issue.created_at, new Date().toISOString())
                  let ddiff = (Date.now()) - (new Date(issue.created_at).getTime())
                  console.log(ddiff)
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
                
                <Button className="rounded-0 mt-3" block>Lihat Laporan Lainnya</Button>
                <h3 className="mt-3">Daftar Tim BlankOn</h3>
                <ul>
                  <li>Tim Infrastruktur</li>
                  <li>Tim Pemaket</li>
                  <li>Tim Riset</li>
                  <li>Tim Dokumentasi</li>
                  <li>Tim Jaminan Kualitas</li>
                  <li>Tim Kesenian</li>
                  <li>Tim Humas</li>
                </ul>
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
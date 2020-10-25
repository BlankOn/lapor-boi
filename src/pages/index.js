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
                <Tiket nomor_tiket="#12345" judul_tiket="Hello World 1" status_tiket="open" waktu_tiket="asdf" tiket_url="https://github.com/BlankOn/Verbeek/issues/1"/>
                <Tiket nomor_tiket="#12346" judul_tiket="Hello World 2" status_tiket="open" waktu_tiket="asdf" tiket_url="https://github.com/BlankOn/Verbeek/issues/2"/>
                <Tiket nomor_tiket="#12347" judul_tiket="Hello World 3" status_tiket="open" waktu_tiket="asdf" tiket_url="https://github.com/BlankOn/Verbeek/issues/3"/>
                <Tiket nomor_tiket="#12348" judul_tiket="Hello World 4" status_tiket="open" waktu_tiket="asdf" tiket_url="https://github.com/BlankOn/Verbeek/issues/4"/>
                
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
import { Fragment, Component } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import CustomHead from "../components/head"
import Tiket from "../components/tiket"
import styles from "../styles/Home.module.css"


const teks_header = "Halaman untuk melaporkan kutu pada layanan BlankOn atau pengajuan permintaan fitur dan kerjasama"
const ISSUE_URL = "https://github.com/artemtech/lapor-boi/issues"

class Home extends Component {
  render() {
    return (
      <Fragment>
        <CustomHead />
        {/* header */}
        <header className={styles.header}>
          <Container className={styles.container}>
            <h1>Lapor BOI!</h1>
            <p>{teks_header}</p>
          </Container>
        </header>
        {/* end header */}

        {/* main */}
        <main className={styles.main}>
          <Container>
            <Row>
              <Col md={8}>
              {/* the form */}
                <h3>Informasi Laporan</h3>
                <Card className={styles.card}>
                  <Row>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <label htmlFor="nama">Nama Anda</label>
                      <input type="text" name="nama" className="form-control"></input>
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <label htmlFor="nama">Alamat Email</label>
                      <input type="text" name="email" className="form-control"></input>
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <label htmlFor="nama">Username Github</label>
                      <input type="text" name="github" className="form-control"></input>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <label htmlFor="nama">Tipe Laporan</label>
                      <select name="tipe_laporan" className="form-control">
                        <option value="satu">satu</option>
                        <option value="dua">dua</option>
                        <option value="tiga">tiga</option>
                      </select>
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <label htmlFor="nama">Layanan/Fitur</label>
                      <input type="text" name="layanan" className="form-control"></input>
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <label htmlFor="nama">Tim BlankOn</label>
                      <input type="text" name="tim" className="form-control"></input>
                    </Col>
                  </Row>
                </Card>
                <h3>Rincian Laporan</h3>
                <Card className={styles.card}>
                  <Row>
                    <Col lg={12}>
                      <label htmlFor="judul">Judul Laporan</label>
                      <input type="text" name="judul" className="form-control"></input>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <label htmlFor="deskripsi">Deskripsi Laporan</label>
                      <textarea name="deskripsi" rows={10} className="form-control"></textarea>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <label htmlFor="lampiran">Unggah Lampiran</label>
                      <input type="file" name="lampiran" className="form-control"></input>
                    </Col>
                  </Row>
                </Card>
                <Row>
                  <Col>
                    <Button>Kirim Laporan</Button>
                  </Col>
                </Row>
              {/* end the form */}
              </Col>

              {/* sidebar */}
              <Col md={4}>
                <h3>Laporan Terkini</h3>
                <Tiket nomor_tiket="#12345" judul_tiket="Hello World 1" status_tiket="open" waktu_tiket="asdf" tiket_url="https://github.com/BlankOn/Verbeek/issues/1"/>
                <Tiket nomor_tiket="#12346" judul_tiket="Hello World 2" status_tiket="open" waktu_tiket="asdf" tiket_url="https://github.com/artemtech/lapor-boi/issues/2"/>
                <Tiket nomor_tiket="#12347" judul_tiket="Hello World 3" status_tiket="open" waktu_tiket="asdf" tiket_url="https://github.com/artemtech/lapor-boi/issues/3"/>
                <Tiket nomor_tiket="#12348" judul_tiket="Hello World 4" status_tiket="open" waktu_tiket="asdf" tiket_url="https://github.com/artemtech/lapor-boi/issues/4"/>
                
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
              {/* list of tickets */}
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
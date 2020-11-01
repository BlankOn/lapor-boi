import { Component } from 'react'
import {Card, Row, Col, Button, Form} from 'react-bootstrap'

const TEMPLATE_LAPORAN = `*Deskripsi Ringkas*:\r\n\r\n
*Hal yang diharapkan*:\r\n\r\n
*Hal yang terjadi*:\r\n\r\n
*Langkah-langkah yang dilakukan*:
1. 
2. 
3. \r\n\r\n
Apakah hal ini selalu terjadi? (Ya/Tidak)\r\n\r\n
`

const TIMEOUT_RELOAD_FORM = 2000

class FormLapor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lampiran: null,
            nama: null,
            email: null,
            github: null,
            tipe_laporan: "LaporanKutu",
            layanan: "Lain-lain",
            tim: "Semua Tim",
            judul: null,
            deskripsi: TEMPLATE_LAPORAN,
            isSubmitting: false,
            afterSubmit: false,
            errors: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onFieldChanged = this.onFieldChanged.bind(this)
        this.doUploadForm = this.doUploadForm.bind(this)
        this.handleResetForm = this.handleResetForm.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault()
        let newState = this.state
        newState.isSubmitting = true
        this.setState(newState)
        this.doUploadForm().then((response) => {
            newState = {
                lampiran: null,
                nama: null,
                email: null,
                github: null,
                tipe_laporan: "LaporanKutu",
                layanan: "Lain-lain",
                tim: "Semua Tim",
                judul: null,
                deskripsi: TEMPLATE_LAPORAN,
                isSubmitting: false,
                afterSubmit: true,
                errors: null
            }
            if (response.error){
                newState.errors = response.pesan
            }
            setTimeout(() => {
                this.setState(newState)
            }, TIMEOUT_RELOAD_FORM);
        })
    }

    handleResetForm(){
      console.log("Adfdfafdssfd")
      let newState = this.state
      newState = {
        lampiran: null,
        nama: null,
        email: null,
        github: null,
        tipe_laporan: "LaporanKutu",
        layanan: "Lain-lain",
        tim: "Semua Tim",
        judul: null,
        deskripsi: TEMPLATE_LAPORAN,
        isSubmitting: false,
        afterSubmit: false,
        errors: null
      }
      this.setState(newState)
    }

    onFieldChanged(e) {
        let newState = this.state
        if (e.target.name == "lampiran"){
            newState.lampiran = e.target.files[0]
        }else{
            newState[e.target.name] = e.target.value
        }
        this.setState(newState)
    }

    async doUploadForm(){
      const url = '/api/submit-ticket'
      const data = new FormData()
      if (this.state.lampiran){
        data.append('lampiran',this.state.lampiran)
      }
      data.append('nama',this.state.nama)
      data.append('email',this.state.email)
      data.append('github',this.state.github)
      data.append('tipe_laporan',this.state.tipe_laporan)
      data.append('layanan',this.state.layanan)
      data.append('tim',this.state.tim)
      data.append('judul',this.state.judul)
      data.append('deskripsi',this.state.deskripsi)
      const response = await fetch(url, {
        method: 'POST',
        body: data
      })
      return await response.json()
    }

    showLogStatus(){
        if (!this.state.afterSubmit) return
        
        if (this.state.errors === null || this.state.errors === undefined){
            return (
                <div className="alert alert-success">Sukses!</div>
            )
        }
        return (
            <div className="alert alert-danger">{this.state.errors}</div>
        )
    }

    render() {
      if (this.state.isSubmitting) {
        // ditampilkan ketika submit form
          return (<div><p class="text-center">Sedang Mengirim Laporan Anda ...</p></div>)
      }
      if (this.state.afterSubmit) {
        // ditampilkan ketika submit form
          return (<div className="container text-center">
            <Row>
              <Col lg={12}>
                <img className="img-fluid" alt="done" src="/images/img-done.svg"/>
              </Col>
              <Col className="mt-3" lg={12}>
                {this.showLogStatus()}
              </Col>
              <Col className="mt-3" lg={12}>
                <Button onClick={this.handleResetForm} className="rounded-0">Kirim Laporan Lain</Button>
              </Col>
            </Row>

            </div>)
        }

        return (
            <Form onSubmit={this.onFormSubmit}>
                <h3>Informasi Laporan</h3>
                <Card className="FormLapor">
                  <Form.Row>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="nama">Nama Anda</Form.Label>
                      <Form.Control required onChange={this.onFieldChanged} type="text" name="nama" />
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="email">Alamat Email</Form.Label>
                      <Form.Control required onChange={this.onFieldChanged} type="email" name="email" />
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="github">Username Github</Form.Label>
                      <Form.Control onChange={this.onFieldChanged} type="text" name="github" />
                    </Col>
                  </Form.Row>
                  <Form.Row className="mt-3">
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="tipe_laporan">Tipe Laporan</Form.Label>
                      <Form.Control onChange={this.onFieldChanged} value={this.state.tipe_laporan} name="tipe_laporan" as="select">
                        <option value="LaporanKutu">Laporan Kutu</option>
                        <option value="PermintaanFitur">Permintaan Fitur</option>
                        <option value="PermintaanKerjasama">Permintaan Kerjasama</option>
                        <option value="Lain-lain">Lain-lain</option>
                      </Form.Control>
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="layanan">Layanan/Fitur</Form.Label>
                      <Form.Control onChange={this.onFieldChanged} as="select" value={this.state.layanan} name="layanan">
                        <option value="Manokwari">Manokwari</option>
                        <option value="DistroBlankon">Distro Blankon</option>
                        <option value="PanduanBlankOn">Panduan BlankOn</option>
                        <option value="Website ">Website </option>
                        <option value="Kerjasama">Kerjasama</option>
                        <option value="Lain-lain">Lain-lain</option>
                      </Form.Control>
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="tim">Tim BlankOn</Form.Label>
                      <Form.Control onChange={this.onFieldChanged} as="select" value={this.state.tim} name="tim">
                        <option value="Semua Tim">Semua</option>
                        <option value="Tim Infrastruktur">Tim Infrastruktur</option>
                        <option value="Tim Pemaket">Tim Pemaket</option>
                        <option value="Tim Riset">Tim Riset</option>
                        <option value="Tim Dokumentasi">Tim Dokumentasi</option>
                        <option value="Tim Jaminan Kualitas">Tim Jaminan Kualitas</option>
                        <option value="Tim Kesenian">Tim Kesenian</option>
                        <option value="Tim Humas">Tim Humas</option>
                      </Form.Control>
                    </Col>
                  </Form.Row>
                </Card>
                <h3>Rincian Laporan</h3>
                <Card className="FormLapor">
                  <Form.Row>
                    <Col>
                      <Form.Label htmlFor="judul">Judul Laporan</Form.Label>
                      <Form.Control required onChange={this.onFieldChanged} type="text" name="judul" />
                    </Col>
                  </Form.Row>
                  <Form.Row className="mt-3">
                    <Col>
                      <Form.Label htmlFor="deskripsi">Deskripsi Laporan</Form.Label>
                      <Form.Control required onChange={this.onFieldChanged} value={this.state.deskripsi} name="deskripsi" rows={10} as="textarea" />
                    </Col>
                  </Form.Row>
                  <Form.Row className="mt-3">
                    <Col>
                      <Form.Label htmlFor="lampiran">Unggah Lampiran</Form.Label>
                      <Form.Control onChange={this.onFieldChanged} type="file" name="lampiran" />
                    </Col>
                  </Form.Row>
                </Card>
                <Form.Row>
                  <Col>
                    <Button type="submit" className="rounded-0">Kirim Laporan</Button>
                  </Col>
                </Form.Row>
            </Form>
        )
    }
}

export default FormLapor
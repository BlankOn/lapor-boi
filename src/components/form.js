import { Component } from 'react'
import {Card, Row, Col, Button, Form} from 'react-bootstrap'

class FormLapor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lampiran: null,
            nama: null,
            email: null,
            github: null,
            tipe_laporan: null,
            layanan: null,
            tim: null,
            judul: null,
            deskripsi: null,
            isSubmitting: false,
            afterSubmit: false,
            errors: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onFieldChanged = this.onFieldChanged.bind(this)
        this.doUploadForm = this.doUploadForm.bind(this)
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
                // tipe_laporan: null,
                // layanan: null,
                // tim: null,
                judul: null,
                deskripsi: null,
                isSubmitting: false,
                afterSubmit: true,
                errors: null
            }
            if (response.error){
                newState.errors = response.pesan
            }
            setTimeout(() => {
                this.setState(newState)
            }, 2000);
        })
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
      const url = process.env.SITE_URL + '/api/submit-ticket'
      const data = new FormData()
      if (this.state.lampiran){
        data.append('lampiran',this.state.lampiran)
      }
      data.append('nama',this.state.nama)
      data.append('email',this.state.email)
      data.append('github',this.state.github)
      // data.append('tipe_laporan',this.state.tipe_laporan)
      // data.append('layanan',this.state.layanan)
      // data.append('tim',this.state.tim)
      data.append('judul',this.state.judul)
      data.append('deskripsi',this.state.deskripsi)
      return await fetch(url, {
        method: 'POST',
        body: data
      })
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
            return (<div>Mengirimkan laporan tiket...</div>)
        }

        return (
            <Form onSubmit={this.onFormSubmit}>
                {this.showLogStatus()}
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
                      <Form.Control required onChange={this.onFieldChanged} type="text" name="github" />
                    </Col>
                  </Form.Row>
                  {/* <Form.Row className="mt-3">
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="tipe_laporan">Tipe Laporan</Form.Label>
                      <Form.Control onChange={this.onFieldChanged} name="tipe_laporan" as="select">
                        <option>satu</option>
                        <option>dua</option>
                        <option>tiga</option>
                      </Form.Control>
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="layanan">Layanan/Fitur</Form.Label>
                      <Form.Control onChange={this.onFieldChanged} type="text" name="layanan" />
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="tim">Tim BlankOn</Form.Label>
                      <Form.Control onChange={this.onFieldChanged} type="text" name="tim" />
                    </Col>
                  </Form.Row> */}
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
                      <Form.Control required onChange={this.onFieldChanged} name="deskripsi" rows={10} as="textarea" />
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
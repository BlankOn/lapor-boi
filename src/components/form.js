import { Component } from 'react'
import {Card, Row, Col, Button, Form} from 'react-bootstrap'

class FormLapor extends Component {
    render() {
        return (
            <Form>
                <h3>Informasi Laporan</h3>
                <Card className="FormLapor">
                  <Form.Row>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="nama">Nama Anda</Form.Label>
                      <Form.Control type="text" name="nama" />
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="email">Alamat Email</Form.Label>
                      <Form.Control type="text" name="email" />
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="github">Username Github</Form.Label>
                      <Form.Control type="text" name="github" />
                    </Col>
                  </Form.Row>
                  <Form.Row className="mt-3">
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="tipe_laporan">Tipe Laporan</Form.Label>
                      <Form.Control name="tipe_laporan" as="select">
                        <option>satu</option>
                        <option>dua</option>
                        <option>tiga</option>
                      </Form.Control>
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="layanan">Layanan/Fitur</Form.Label>
                      <Form.Control type="text" name="layanan" />
                    </Col>
                    <Col lg={4} className="mb-2 mb-lg-0">
                      <Form.Label htmlFor="tim">Tim BlankOn</Form.Label>
                      <Form.Control type="text" name="tim" />
                    </Col>
                  </Form.Row>
                </Card>
                <h3>Rincian Laporan</h3>
                <Card className="FormLapor">
                  <Form.Row>
                    <Col>
                      <Form.Label htmlFor="judul">Judul Laporan</Form.Label>
                      <Form.Control type="text" name="judul" />
                    </Col>
                  </Form.Row>
                  <Form.Row className="mt-3">
                    <Col>
                      <Form.Label htmlFor="deskripsi">Deskripsi Laporan</Form.Label>
                      <Form.Control name="deskripsi" rows={10} as="textarea" />
                    </Col>
                  </Form.Row>
                  <Form.Row className="mt-3">
                    <Col>
                      <Form.Label htmlFor="lampiran">Unggah Lampiran</Form.Label>
                      <Form.Control type="file" name="lampiran" />
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
const { Component } = require("react");

class Tiket extends Component {
    constructor(props) {
        super(props)
        this.onClickHandler = this.clickHandler.bind(this)
    }

    clickHandler(event){
        // bawa user ke halaman tiket di github
        window.location.assign(event.currentTarget.dataset.tiketurl)
    }

    render() {
        return (
            <div className="Tiket" onClick={this.onClickHandler} data-tiketurl={this.props.tiket_url}>
                <p className="Tiket__NomorTiket">{this.props.nomor_tiket}</p>
                <p className="Tiket__JudulTiket">{this.props.judul_tiket}</p>
                <small className="Tiket__StatusTiket">{this.props.status_tiket}</small>
                <small className="Tiket__WaktuTiket">{this.props.waktu_tiket}</small>
            </div>
        )
    }
}

export default Tiket
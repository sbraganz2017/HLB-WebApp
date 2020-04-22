import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge, message } from 'antd';
import { RobotOutlined, UserOutlined } from '@ant-design/icons';
import SinResultados from '../Componentes/SinResultados'
import Axios from '../Servicios/AxiosTipo';
import { Link } from 'react-router-dom';
const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleEquipo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: "",
            nserie: "",
            bspi: "",
            asignado: "",
            dpto: "",
            tipo: "",
            marca: "",
            estado: "",
            modelo: "",
            descripcion: "",
            componente: "",
            ip: "",
            registro: "",
            nodata: false,
            campo1: undefined,
            campo2: undefined,
            label1: "",
            label2: ""
        }
    }

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined' &&
            typeof this.props.location.state !== 'undefined') {
            const { info } = this.props.location.state;
            this.inicializar_datos(info);
        } else {
            this.setState({ nodata: true });
        }
    }

    inicializar_datos(info) {
        let empleado = "";
        let registro = {};
        Axios.equipo_id(info.key).then(res => {
            res.data.forEach(function (dato) {
                if (dato.empleado !== null) {
                    empleado = dato.empleado.concat(" ", dato.apellido);
                }
                registro.ip = dato.direccion_ip;
                registro.codigo = dato.codigo;
                registro.nserie = dato.numero_serie;
                registro.bspi = dato.bspi_punto
                registro.asignado = empleado;
                registro.departamento = dato.departamento;
                registro.tipo = dato.tipo_equipo;
                registro.marca = dato.marca;
                registro.estado = dato.estado_operativo;
                registro.modelo = dato.modelo;
                registro.descripcion = dato.descripcion;
                registro.componente = dato.componente_principal;
            });
            registro.key= info.key;
            this.cargar_datos(registro);
        }).catch(err => {
            message.error('Problemas de conexión con el servidor, inténtelo más tarde', 4);
        });


    }

    cargar_datos(info) {
        this.setState({
            codigo: info.codigo,
            nserie: info.nserie,
            bspi: info.bspi,
            asignado: info.asignado,
            dpto: info.dpto,
            tipo: info.tipo,
            marca: info.marca,
            estado: info.estado,
            modelo: info.modelo,
            descripcion: info.descripcion,
            componente: info.componente,
        })
        info.ip === " " || info.ip == null ? this.setState({ ip: "No asignada" }) :
            this.setState({ ip: info.ip })

        if (info.tipo === 'memoria_ram' || info.tipo === 'disco_duro' || info.tipo === 'ram'
            || info.tipo === 'procesador') {
              
             Axios.info_extra(info.key).then(res => {
                 let registro={}
                res.data.forEach(function (dato) {
                    if (dato.campo === "capacidad") {
                        registro.campo1= "Capacidad"
                        registro.dato1= dato.dato
                    }
                    if (dato.campo === "tipo") {
                        registro.campo2= "Tipo"
                        registro.dato2= dato.dato
                       
                    }
                    if (dato.campo === "nucleos") {
                        registro.campo1= "Núcleos"
                        registro.dato1= dato.dato
                    }
                    if (dato.campo === "frecuencia") {
                        registro.campo2= "Frecuencia"
                        registro.dato2= dato.dato
                    }
                });

                this.setState({ 
                    label1: registro.campo1,
                    campo1: registro.dato1,
                    label2: registro.campo2,
                    campo2: registro.dato2
                 })
            }) 
        }
    }

    render() {
        if (this.state.nodata) {
            return (<SinResultados></SinResultados>)
        } else {
            return (
                <div className="div-container-title">
                    <Row>
                        <Col span={12}>
                            <Title level={2}>Detalle equipo informático</Title>
                        </Col>
                        <Col className='flexbox'>
                            <Link to={{ pathname: '/otrosequipos' }}>
                                <Button type="primary" icon="left">Volver</Button>
                            </Link>
                        </Col>
                    </Row>

                    <div className="div-container">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><RobotOutlined />General</span>} key="1">
                                <Descriptions title="Datos generales del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                    <Descriptions.Item label="Código equipo" span={3}>{this.state.codigo}</Descriptions.Item>
                                    <Descriptions.Item label="Marca" >{this.state.marca}</Descriptions.Item>
                                    <Descriptions.Item label="Modelo">{this.state.modelo}</Descriptions.Item>
                                    <Descriptions.Item label="Número de serie">{this.state.nserie}</Descriptions.Item>
                                    <Descriptions.Item label="Tipo de equipo" span={3}>{this.state.tipo}</Descriptions.Item>
                                    <Descriptions.Item label="Estado">
                                        <Badge status="processing" text={this.state.estado} /> </Descriptions.Item>
                                    <Descriptions.Item label="Componente principal">{this.state.componente}</Descriptions.Item>
                                    <Descriptions.Item label="Dirección Ip">{this.state.ip}</Descriptions.Item>
                                    <Descriptions.Item label="Descripción" span={3}>{this.state.descripcion}</Descriptions.Item>
                                    {(this.state.tipo === 'memoria_ram') || (this.state.tipo === 'disco_duro') || (this.state.tipo === 'ram') || (this.state.tipo === 'procesador') ?
                                        <>
                                            <Descriptions.Item label={this.state.label1}>{this.state.campo1} </Descriptions.Item>
                                            <Descriptions.Item label={this.state.label2} >{this.state.campo2} </Descriptions.Item>
                                        </>
                                        : null
                                    }
                                </Descriptions>
                            </TabPane>


                            <TabPane tab={<span><UserOutlined />Asignación</span>} key="2">
                                <Descriptions title="Información de la asignación" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                    <Descriptions.Item label="Asignado a" span={3}>{this.state.asignado}</Descriptions.Item>
                                    <Descriptions.Item label="BSPI punto">{this.state.bspi}</Descriptions.Item>
                                    <Descriptions.Item label="Departamento">{this.state.dpto}</Descriptions.Item>
                                </Descriptions>
                            </TabPane>
                        </Tabs>
                    </div>
                </div >
            )
        }
    }

}

export default DetalleEquipo;
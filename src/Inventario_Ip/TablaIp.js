import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
    Input,
    Icon
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
/* import getColumnSearchProps from '../Componentes/SearchInput'
 */
const ip = [
    {
        key: '1',
        ip: '192.168.1.1',
        estado: 'En uso',
        asignacion: '2020-01-01',
        hostname: 'Procyon',
        subred: '192.168.0.0',
        fortigate: 'Recepcion',
        maquinas: 5,
        asignado: 'Fermín Romero',
        encargado: 'admin',
        observacion: 'ninguna'

    },
    {
        key: '2',
        ip: '192.168.1.2',
        estado: 'Libre',
        asignacion: '2020-01-02',
        hostname: 'Antares',
        subred: '192.168.0.0',
        fortigate: 'Recepcion',
        maquinas: 1,
        asignado: 'Juan Sempere',
        encargado: 'yo',
        observacion: 'ninguna'

    },
    {
        key: '3',
        ip: '192.168.1.3',
        estado: 'Libre',
        asignacion: '2020-01-02',
        hostname: 'Antares',
        subred: '192.168.0.0',
        fortigate: 'Recepcion',
        maquinas: 7,
        asignado: 'Alicia Sempere',
        encargado: 'yo',
        observacion: 'ninguna'

    }


]


class TablaIp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            data: [],
            pagination: {},
            loading: false,
            searchText: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            showComponent: true,
            showTable: false,
        });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node }
                    }
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Buscar
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        }
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };



    render() {
        const columns = [
            {
                title: 'Ip',
                dataIndex: 'ip',
                key: 'ip',
                /*                 ...getColumnSearchProps('ip', this.handleSearch, this.handleReset) */
                ...this.getColumnSearchProps('ip')

            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                filters: [
                    {
                        text: 'En uso',
                        value: 'En uso',
                    },
                    {
                        text: 'Libre',
                        value: 'Libre',
                    }
                ],
                onFilter: (value, record) => record.estado.indexOf(value) === 0,
                sorter: (a, b) => a.estado.length - b.estado.length
            },
            {
                title: 'Fecha asignación',
                dataIndex: 'asignacion',
                key: 'asignacion'
            },
            {
                title: 'Hostname',
                dataIndex: 'hostname',
                key: 'hostname',
                sorter: (a, b) => a.hostname.length - b.hostname.length

            },
            {
                title: 'Subred',
                dataIndex: 'subred',
                key: 'subred'
            },
            {
                title: 'Fortigate',
                dataIndex: 'fortigate',
                key: 'fortigate'
            },
            {
                title: 'Máquinas adicionales',
                dataIndex: 'maquinas',
                key: 'maquinas',
                sorter: (a, b) => a.maquinas.length - b.maquinas.length

            },
            {
                title: 'Asignado',
                dataIndex: 'asignado',
                key: 'asignado',
                sorter: (a, b) => a.asignado.length - b.asignado.length

            },
            {
                title: 'Encargado',
                dataIndex: 'encargado',
                key: 'encargado',
                sorter: (a, b) => a.encargado.length - b.encargado.length
            },
            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion'
            },
            {
                title: 'Acción',
                key: 'accion',
                render: (text, record) => (
                    <div>
                        <Button style={{ marginRight: '7px' }} type="success" icon="eye" />
                        <Button style={{ marginRight: '7px' }} type="info" icon="edit" />
                        <Button type="error" icon="delete" />
                    </div>
                ),
            },
        ];

        return (
            <div className="div-container">
                <div >
                    <Row>
                        <Col className='flexbox'>
                            <ButtonGroup style={{ align: 'right' }}>
                                <Button type="primary" icon="import">Importar</Button>
                                <Button type="primary" icon="cloud-download">Exportar</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </div>
                <br />
                <Table size="medium" columns={columns} dataSource={ip}></Table>
            </div>
        );
    }
}

export default TablaIp;
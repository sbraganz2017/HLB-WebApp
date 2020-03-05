import React from 'react';
import SelectComponent from './SelectComponent'

class IpSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: []
        };
    }

    componentDidMount = () => {
        var ips = ["192.168.175.0", "192.178.0.1"];
        this.setState({ ip: ips });
    }

    render() {
        return (
           <SelectComponent decorator={this.props.decorator} datos={this.state.ip}></SelectComponent>
        )
    }
}
export default IpSelect;
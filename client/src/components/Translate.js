import React from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../actions'


class Translate extends React.Component {

    componentDidMount() {
        this.props.fetchLang();
    }

    render(){
        return (
            <div className='collection'>
                <h3>{this.props.lang}</h3>
                <Link to='translate/new'>Request Translation</Link>
            </div>
        )
}


}

function mapStateToProps(state) {
    return { lang: state.lang };
}

export default connect(mapStateToProps, actions)(Translate)

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchRequest} from '../actions'


class ShowRequest extends Component {

    componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                {this.props.trans ? this.props.trans.single.title : null }
            </div>
        )
    }
}
function mapStateToProps({ trans }) {
    return { trans }
}


export default connect(mapStateToProps, {fetchRequest})(ShowRequest)

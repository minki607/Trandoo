import React, { Component } from 'react'
import UserDetailForm from './UserDetailForm'
import PrefLangForm from './PrefLangForm'


class UserForm extends Component {
    state = {page: 0}
    nextPage = () => {
        this.setState({page: this.state.page + 1 })
    }
    previousPage = () => {
        this.setState({page: this.state.page - 1})
    }
    render() {
        const {onSubmit} = this.props
        const {page} = this.state

        return (
            <div>
                {page === 0 && <UserDetailForm onSubmit={this.nextPage} />}
                {page === 1 && (<PrefLangForm previousPage={this.previousPage} onSubmit={this.nextPage}/>)}
            </div>
        )
    }
}

export default UserForm





// import axios from 'axios'
import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'
import swal from 'sweetalert'
import PropTypes from 'prop-types'
import Button from './Button'

const Logout = props => {
    
	const handleSubmit = (e) => {
		localStorage.clear()
		
		e.preventDefault()
		axios.post('http://localhost:3333/logout')
		.then(res => {
			if(res.data.status === 'success') {
					swal('Success', res.data.message, res.data.status)
						.then(() => {
							window.location.reload(false)
						})
				}
			})
	}

	return (
		<form onSubmit={handleSubmit}>
			<Button type='submit' className={props.className}>Logout</Button>
		</form>
	)
}

Logout.propTypes = {
	className: PropTypes.string
}

export default Logout
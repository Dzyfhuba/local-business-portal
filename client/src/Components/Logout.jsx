// import axios from 'axios'
import axios from 'axios'
import React from 'react'
import swal from 'sweetalert'
import PropTypes from 'prop-types'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Logout = props => {
	const navigate = useNavigate()
    
	const handleSubmit = (e) => {
		localStorage.clear()
		
		e.preventDefault()
		axios.post('http://localhost:3333/logout')
		.then(res => {
			if(res.data.status === 'success') {
					swal('Success', res.data.message, res.data.status)
						.then(() => {
							window.location.href = '/'
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
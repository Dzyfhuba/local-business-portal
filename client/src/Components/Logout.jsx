// import axios from 'axios'
import axios from 'axios'
import React from 'react'
import swal from 'sweetalert'
import PropTypes from 'prop-types'
import Button from './Button'
import Auth from '../Config/Auth'
import Hosts from '../Config/Hosts'

const Logout = props => {

	const handleSubmit = (e) => {
		localStorage.clear()

		e.preventDefault()

		swal('Yakin logout?', {
			content: {
				element: 'checkbox',
			},
			buttons: {
				cancel: 'Batal',
				agree: {
					text: 'Setuju',
					className: 'bg-green-500 text-black'
				},
			}
		}).then(val => {
			if (val === 'agree') {
				axios.post(Hosts.main + '/logout')
					.then(res => {
						if (res.data.status === 'success') {
							swal('Success', res.data.message, res.data.status)
								.then(() => {
									window.location.href = '/'
									Auth.setUser({ role: 'guest' })
								})
						}
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
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Button from '../../../Components/Button'
import anime from 'animejs'
import Select from 'react-select'
import ButtonAnchor from '../../../Components/ButtonAnchor'
import Label from '../../../Components/Label'
import Modal from '../../../Components/Modal'
import Hosts from '../../../Config/Hosts'
import Admin from '../../../Layouts/Admin'
import { RequiredStar } from '../../../Components/RequiredStar'
import Input from '../../../Components/Input'
import Auth from '../../../Config/Auth'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [suspendUser, setSuspendUser] = useState(null)
  const [suspendDuration, setSuspendDuration] = useState(null)
  const [suspendDurationUpdate, setSuspendDurationUpdate] = useState(null)
  const [roles, setRoles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(Hosts.main + '/control/user-management')
      .then(res => {
        const mapped = res.data.data.map(item => {
          const suspend_end = item.remaining_suspension > 0 ? item.suspend_end : null
          return {
            ...item,
            suspend_end,
          }
        })
        console.log(res.data.data);
        setUsers(mapped)
      })
    axios.get(Hosts.main + '/control/user-management/roles')
      .then(res => {
        setRoles(res.data.data)
      })
  }, [])
  console.log(roles);

  const handleDelete = async (target, id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Setelah dihapus, Anda tidak akan dapat memulihkan post ini!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(Hosts.main + '/control/user-management/' + id)
            .then(res => {
              if (res.data.status === 'success') {
                swal('Success', 'Berhasil dihapus', 'success')
                  .then(() => {
                    // console.log(target);
                    target.closest('tr').remove()
                  })
              } else if (res.data.status === 'error') {
                swal('Error', 'Gagal dihapus', 'error')
              } else {
                swal('Warning', res.data.message, res.data.status)
              }
              console.log(res.data);
            })
        } else {
          swal("Penghapusan dibatalkan");
        }
      });
  }

  const suspendFormSubmit = e => {
    e.preventDefault()

    const data = {
      username: suspendUser.value,
      suspend: suspendDuration.value,
    }

    data.suspend = moment().add(data.suspend.split(' ')[0], data.suspend.split(' ')[1])

    axios.post(Hosts.main + '/control/suspend', data)
      .then(res => {
        if (res.data.status === 'success') {
          swal('Success', `${res.data.data.name} Telah ditangguhkan hingga ${(new Date(res.data.data.suspend_end)).toLocaleString()}`, 'success')
            .then(() => {
              anime({
                targets: '.modal-core',
                top: '-50%'
              })
              setTimeout(() => {
                navigate(0)
              }, 300);
            })
        } else if (res.data.status === 'error') {
          swal('Success', `Gagal Ditangguhkan.\n${res.data.data.error}`, 'error')
        } else {
          swal('Warning', res.data.message, res.data.status)
        }
        console.log(res.data);
      })
  }

  const suspendForm = (
    <form onSubmit={suspendFormSubmit}>
      <Label for='username'>Pengguna<RequiredStar /></Label>
      <Select id='username'
        value={suspendUser}
        onChange={setSuspendUser}
        styles={{
          container: (base) => ({
            ...base,
            minWidth: 160,
            minHeight: 44
          }),
        }}
        options={
          users.filter(user => !user.suspend_end)
            .map(user => {
              if (user.suspend_end) console.log(user.suspend_end)
              return {
                value: user.username,
                label: user.username
              }
            })
        }
        required
      />
      <Label for='duration'>Durasi<RequiredStar /></Label>
      <Select id='duration'
        value={suspendDuration}
        onChange={setSuspendDuration}
        styles={{
          container: (base) => ({
            ...base,
            minWidth: 160,
            minHeight: 44
          }),
        }}
        options={
          [
            { label: '1 Hari', value: '1 d' },
            { label: '1 Minggu', value: '1 w' },
            { label: '1 Bulan', value: '1 M' },
            { label: '6 Bulan', value: '6 M' },
            { label: '1 Tahun', value: '1 Y' },
            { label: 'Permanen', value: '100 Y' },
          ]
        }
        className={'mb-3'}
        required
      />
      <div className="text-end">
        <Button type='submit' className='bg-secondary  px-5 py-2.5 rounded'>Submit</Button>
      </div>
    </form>
  )

  const suspendFormSubmitUpdate = e => {
    e.preventDefault()

    const before = e.target.querySelector('#suspend_end').value

    const data = {
      username: null,
      suspend: null
    }

    if (before === 'Tidak Ditangguhkan') {
      data.suspend = suspendDurationUpdate.value
      data.username = e.target.querySelector('#username').value
      data.suspend = moment().add(data.suspend.split(' ')[0], data.suspend.split(' ')[1]).toISOString()
    } else {
      data.username = e.target.querySelector('#username').value
      data.suspend = suspendDurationUpdate.value

      data.suspend = moment(before, 'DD/MM/YYYY HH:mm:ss')
        .add(data.suspend.split(' ')[0], data.suspend.split(' ')[1])
        .toISOString()
    }

    console.log(data);

    axios.post(Hosts.main + '/control/suspend', data)
      .then(res => {
        if (res.data.status === 'success') {
          swal('Success', `${res.data.data.name} Telah ditangguhkan hingga ${(new Date(res.data.data.suspend_end)).toLocaleString()}`, 'success')
            .then(() => {
              anime({
                targets: '.modal-core',
                top: '-50%'
              })
              setTimeout(() => {
                navigate(0)
              }, 300);
            })
        } else if (res.data.status === 'error') {
          swal('Success', `Gagal Ditangguhkan.\n${res.data.data.error}`, 'error')
        } else {
          swal('Warning', res.data.message, res.data.status)
        }
        console.log(res.data);
      })
  }

  const removeSuspend = id => {
    axios.delete(Hosts.main + '/control/suspend/' + id)
      .then(res => {
        if (res.data.status === 'success') {
          swal('Success', `Penangguhan ${res.data.data.name} telah dihapus`, 'success')
            .then(() => {
              anime({
                targets: '.modal-core',
                top: '-50%'
              })
              setTimeout(() => {
                navigate(0)
              }, 300);
            })
        } else if (res.data.status === 'error') {
          swal('Success', `Gagal menghapus penangguhan.\n${res.data.data.error}`, 'error')
        } else {
          swal('Warning', res.data.message, res.data.status)
        }
        console.log(res.data);
      })
  }

  const handleRoleChange = e => {
    const { value, user_id, username, label } = e

    swal({
      title: "Apakah Anda Yakin?",
      icon: "warning",
      buttons: true,
    })
      .then((willChange) => {
        if (willChange) {
          axios.put(Hosts.main + '/control/user-management/roles/' + user_id, {
            user_id,
            value,
          }).then(res => {
            console.log(res.data)
            if (res.data.status === 'success') {
              swal(`Peran ${username} telah menjadi ${label}`, {
                icon: "success",
              });
            } else {
              swal(`Mengganti peran ${username} gagal`);
            }
          })
        } else {
          swal(`Mengganti peran ${username} gagal`);
        }
      });
  }

  return (
    <Admin>
      <div id="container" className='mx-5 my-6'>
        <Modal
          triggerClassName={'bg-secondary px-5 py-2.5 w-full text-white rounded mb-3 shadow-2xl sticky top-16 z-10'}
          head={'Tangguhkan Pengguna'}
          triggerBody={'Tangguhkan Pengguna'}
          body={suspendForm}
        />

        <div id="table-container" className='overflow-x-scroll pb-24'>
          <table className='w-full table-auto'>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead className='bg-primary '>
              <tr className={`h-11`}>
                <th>Nama</th>
                <th>Username</th>
                <th>Peran</th>
                <th>Ditangguhkan</th>
                <th>Terakhir Diubah</th>
              </tr>
            </thead>
            <tbody>
              {
                users.length > 0 ?
                  (
                    users.map((user) => (
                      <tr key={user.id} className={`${user.suspend_end ? ' bg-red-300' : null}`}>
                        <td className='table-cell border p-3'>
                          <Link to={`/stall/${user.username}`}
                            className='text-blue-700 underline whitespace-nowrap'
                          >{user.name}</Link>
                        </td>
                        <td className='table-cell border p-3'>
                          <Link to={`/stall/${user.username}`}
                            className='text-blue-700 underline whitespace-nowrap'
                          >{user.username}</Link>
                        </td>
                        <td className='table-cell border p-3'>
                          <Select
                            isSearchable={false}
                            styles={{
                              container: (base) => ({
                                ...base,
                                minWidth: 160,
                                minHeight: 44,
                              }),
                            }}
                            defaultValue={{
                              label: user.role,
                              value: user.role_id,
                            }}
                            onChange={handleRoleChange}
                            options={
                              roles.map(role => {
                                return {
                                  value: role.id,
                                  label: role.role,
                                  user_id: user.id,
                                  username: user.username
                                }
                              })
                            }
                            isDisabled={Auth.getRole() !== 'superadmin'}
                          />
                        </td>
                        <td className='whitespace-nowrap table-cell border p-1 text-center'>
                          <Modal
                            head={'Atur Penangguhan'}
                            triggerBody={user.suspend_end ? (new Date(user.suspend_end)).toLocaleString('id-ID', {hour12: false}) : 'Tidak Ditangguhkan'}
                            triggerClassName={'shadow-md px-5 py-2.5 w-min bg-secondary text-white'}
                            body={
                              (
                                <form onSubmit={suspendFormSubmitUpdate}>
                                  <Label for='username'>Pengguna<RequiredStar /></Label>
                                  <Input id='username'
                                    defaultValue={user.username}
                                    readOnly
                                  />
                                  <Label for='suspend_end'>Penangguhan Berakhir</Label>
                                  <Input
                                    id='suspend_end'
                                    defaultValue={user.suspend_end ? (new Date(user.suspend_end)).toLocaleString('id-ID', {hour12: false}) : 'Tidak Ditangguhkan'}
                                    readOnly
                                  />

                                  <Label for='duration'>Tambahkan Durasi</Label>
                                  <Select id='duration'
                                    value={suspendDurationUpdate}
                                    onChange={setSuspendDurationUpdate}
                                    styles={{
                                      container: (base) => ({
                                        ...base,
                                        minHeight: 44
                                      })
                                    }}
                                    options={
                                      [
                                        { label: '1 Hari', value: '1 d' },
                                        { label: '1 Minggu', value: '1 w' },
                                        { label: '1 Bulan', value: '1 M' },
                                        { label: '6 Bulan', value: '6 M' },
                                        { label: '1 Tahun', value: '1 Y' },
                                        { label: 'Permanen', value: '100 Y' },
                                      ]
                                    }
                                    className={'mb-3'}
                                  />
                                  <div className="text-end">
                                    <Button type='submit' className='bg-secondary text-white px-5 py-2.5 rounded'>Submit</Button>
                                  </div>
                                </form>
                              )
                            }
                            foot={(
                              <Button
                                className='px-5 py-2.5 bg-red-600 text-white rounded w-full'
                                onClick={() => removeSuspend(user.id)}
                              >Hapus Penangguhan</Button>
                            )}
                          />
                        </td>
                        <td className='whitespace-nowrap table-cell border p-3'>{new Date(user.updated_at).toLocaleString('id-ID', {hour12: false})}</td>
                      </tr>
                    ))
                  ) : null
              }
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  )
}

export default UserManagement
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading/Loading';

const AllUsers = () => {
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = res.json();
            return data
        }
    })
    const makeAdmin = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ role: 'Admin' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('add admin successful.')
                    refetch()
                }
            })

    }
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`deleted successful`)
                }
            })

    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='mb-36'>
            <h2 className="text-3xl text-center bg-slate-900 text-white py-6">Total User: {users?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr
                                key={user._id}
                            >
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-11 rounded-full">
                                            <img src={user.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'Admin' ?
                                            <label
                                                onClick={() => makeAdmin(user._id)}
                                                className="btn btn-sm bg-green-500 text-white"
                                            >
                                                Admin</label>
                                            :
                                            <label
                                                onClick={() => makeAdmin(user._id)}
                                                className="btn btn-sm btn-primary bg-gradient-to-r from-primary to-secondary text-white"
                                            >
                                                Make Admin</label>
                                    }

                                </td>
                                <td>
                                    <label
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
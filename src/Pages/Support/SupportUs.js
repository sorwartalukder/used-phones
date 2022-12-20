import React from 'react';
import emailjs from 'emailjs-com';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const SupportUs = () => {
    const handleSupport = e => {
        e.preventDefault()
        emailjs.sendForm('mD.sorwaR4039', 'template_f603otr', e.target, 'S4ou50DBMf_kQTmhl')
            .then(() => {
                toast.success(`Mail send successfully.`)
                e.target.reset()
            },
                (err) => {
                    console.error(err)
                });
    }
    return (
        <div className='min-h-screen py-14 max-w-[1480px] mx-auto'>
            <h1 className='text-5xl text-center mb-6 font-semibold'>SUPPORT US</h1>
            <div className='xl:flex justify-center items-center mx-4'>
                <form
                    className='xl:w-1/2  max-w-[600px] mx-auto bg-white shadow-md shadow-slate-900 p-4 rounded-md'
                    onSubmit={handleSupport}>
                    {/* name  */}
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Your Name</span></label>
                        <input
                            type="text"
                            name='name'
                            required
                            placeholder="Enter Your Name"
                            className="input input-bordered w-full"
                        />
                    </div>
                    {/* email  */}
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Your Email</span></label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="input input-bordered w-full "
                            name='email'
                            required
                        />
                    </div>
                    {/* Subject line  */}
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Subject</span></label>
                        <input
                            type="text"
                            placeholder="Enter Your Subject"
                            className="input input-bordered w-full "
                            name='subject'
                            required
                        />
                    </div>

                    {/* Message */}
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Message</span></label>
                        <textarea
                            className="textarea textarea-bordered"
                            rows="8"
                            placeholder="Enter Your Message"
                            name='message'
                            required
                        ></textarea>

                    </div>

                    <input className="bg-blue-700 hover:bg-slate-900 text-white text-xl px-6 py-4 mt-5 hover:shadow-md hover:shadow-yellow-500 p-4 rounded-md" value='Send Mail' type="submit" />

                </form>
                <div className='xl:w-1/2 mx-auto max-w-[600px] my-10  text-lg xl:pl-4'>
                    {/* phone */}
                    <div className='flex items-center px-7 py-9 bg-white shadow-md shadow-slate-900 rounded-md'>
                        <div className='text-4xl border-4 p-4 border-gray-400 bg-slate-900 text-white'>
                            <FaPhoneAlt />
                        </div>
                        <div className='ml-5 font-semibold'>
                            <p>Phone / WhatsApp</p>
                            <p>+880 1742554039</p>
                        </div>
                    </div>
                    {/* email */}
                    <div className='flex items-center px-7 py-9 my-7 bg-white shadow-md shadow-slate-900 rounded-md'>
                        <div className='text-4xl border-4 p-4 border-gray-400 bg-slate-900 text-white'>
                            <HiOutlineMail />
                        </div>
                        <div className='ml-5 font-semibold'>
                            <p>Email</p>
                            <p>mdsorwar4039@gmail.com</p>
                        </div>
                    </div>
                    {/* address */}
                    <div className='flex items-center px-7 py-9 bg-white shadow-md shadow-slate-900 rounded-md'>
                        <div className='text-4xl border-4 p-4 border-gray-400 bg-slate-900 text-white'>
                            <HiOutlineLocationMarker />
                        </div>
                        <div className='ml-5 font-semibold'>
                            <p>Address</p>
                            <p>+880 1742554039</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportUs;
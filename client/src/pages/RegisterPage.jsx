import { NavLink } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="w-1/2 p-3 bg-white rounded shadow">
                    <h1 className="mb-2 text-3xl font-bold text-center">Register</h1>
                    <p className="mb-8 text-center text-gray-600">Create your new account with TDList</p>
                    
                    <div className="mb-4">
                        <label htmlFor="userName" className="block mb-1 font-medium">User Name</label>
                        <input type="text" id="userName" placeholder="Enter Your New UserName" className="w-full p-2 border rounded-md" />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
                        <input type="email" id="email" placeholder="Enter Your E-mail" className="w-full p-2 border rounded-md" />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                        <input type="password" id="password" placeholder="Create Your Password" className="w-full p-2 border rounded-md" />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block mb-1 font-medium">Confirm Password</label>
                        <input type="password" id="confirm-password" placeholder="Confirm Password" className="w-full p-2 border rounded-md" />
                    </div>
                    
                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="keep-signed-in" className="mr-2" />
                        <label htmlFor="keep-signed-in">Remember my password</label>
                    </div>
                    
                    <button className="w-full px-4 py-2 mt-8 text-white bg-[#B1C98D] rounded-md">Register</button>
                    
                    <h3 className="mt-4">Already have an Account?</h3>
                    <NavLink to={'/logIn'}>
                        <button className="w-full px-4 py-2 mt-2 rounded-md bg-[#C087BF] hover:bg-[#B1C98D] text-white">Log In</button>
                    </NavLink>
                    <button
                    className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="-0.5 0 48 48"
                        version="1.1"
                    >
                        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                <g id="Google" transform="translate(401.000000, 860.000000)">
                                    <path
                                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                        id="Fill-1"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                        id="Fill-2"
                                        fill="#EB4335"
                                    />
                                    <path
                                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                        id="Fill-3"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                        id="Fill-4"
                                        fill="#4285F4"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span>Continue with Google</span>
                </button>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;

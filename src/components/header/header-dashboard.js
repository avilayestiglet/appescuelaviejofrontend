import React from "react";
import logo from '../../assets/images/logo.png';


const HeaderDashboard = ({ user }) => {
    const HeaderNav = ({ user }) => <div className="d-flex flex-column align-items-end p-2">
        <p className="my-name m-0 text-white">{user?.full_name}</p>
        <label className="my-label m-0 text-white">{user?.email}</label>
        <label className="my-label m-0 text-white">{user?.tipo && `(${user?.tipo})`}</label>
    </div>


    return (<div className="nav theme-bg-primary mb-4">
    <div className="container-fluid">
        <div className="navbar-brand">
            <div className='row w-100 d-flex justify-content-between'>
                <div className='col-lg-6'>
                    <div className='row d-flex align-items-end'>
                        <div className='col-lg-2'>
                            <img src={logo} className='img' alt=""  style={{width: '55px', height: '55px'}}/>
                        </div>
                        <div className='col-lg-6'>
                            <h3 className='title-primary-font text-white'>U.E "Rafael Maria Baralt"</h3>
                            {/* <h5 className="text-white m-0">{name}</h5> */}
                        </div>
                        
                    </div>
                </div>
                <div className='col-lg-6 d-flex justify-content-end align-items-end'>
                    <HeaderNav user={user}/>
                </div>
            </div>
        </div>
    </div>
</div>);
};

export default HeaderDashboard;
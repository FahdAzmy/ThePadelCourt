import React from 'react';
import { NavLink } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserCircleIcon, TicketIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function UserSidebar(){

    return (
        <ListGroup>
            <NavLink 
                to="accountsettings" 
                className={({ isActive }) => 
                `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                }
            >
                <UserCircleIcon className="w-8 h-10 d-inline"/>
                <span>  Account Settings</span>
            </NavLink>
            <NavLink 
                to="changepassword" 
                className={({ isActive }) => 
                `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                }
            >
                <EyeIcon className="w-8 h-10 d-inline"/>
                <span>  Change Password</span>
            </NavLink>
            <NavLink 
                to="reservations" 
                className={({ isActive }) => 
                `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                }
            >
                <TicketIcon className="w-8 h-10 d-inline"/>
                <span>  Your Reservations</span>
            </NavLink>
        </ListGroup>
    );
}
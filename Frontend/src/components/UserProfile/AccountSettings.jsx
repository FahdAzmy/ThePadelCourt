import { useEffect, useState } from "react";

export default function AccountSettings(){
    const [userData, setUserData] = useState({ name: "", email: "" });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(""); 
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container-fluid py-5">
            <h1 className="text-center mb-4">Personal Information</h1>
            <form className="row g-3 justify-content-center">
                <div className="col-12 col-md-6">
                <label htmlFor="name" className="form-label">
                    Your Name 
                </label>
                <input type="text" className="form-control" id="name" name="name" value={userData.name} disabled />
                </div>
                <div className="col-12 col-md-6">
                <label htmlFor="email" className="form-label">
                    Email 
                </label>
                <input type="email" className="form-control" id="email" name="email" value={userData.email} disabled />
                </div>
            </form>
        </div>
    )
}
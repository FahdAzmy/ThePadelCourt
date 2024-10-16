import { useUser } from "./UserContext"; // Adjust the import path as needed
import { User, Mail, Star } from "lucide-react"; // Assuming you're using lucide-react for icons

export default function AccountSettings() {
  const { userData, loading } = useUser();

  if (loading) {
    return <div className="max-w-2xl mx-auto p-6">Loading...</div>;
  }

  return (
    
    <div className="max-w-2xl mx-36 p-6">
      <br/><br/>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Personal Information
      </h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center">
            <User className="text-blue-500 mr-3" size={24} />
            <span className="text-gray-600 font-medium">Name</span>
          </div>
          <span className="text-gray-800">{userData.name}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center">
            <Mail className="text-blue-500 mr-3" size={24} />
            <span className="text-gray-600 font-medium">Email</span>
          </div>
          <span className="text-gray-800">{userData.email}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center">
            <Star className="text-blue-500 mr-3" size={24} />
            <span className="text-gray-600 font-medium">Role</span>
          </div>
          <span className="text-gray-800">
            {userData.role || "Not specified"}
          </span>
        </div>
      </div>
    </div>
  );
}

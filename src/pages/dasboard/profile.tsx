import EditProfile from '@/components/module/editProfileDialouge';
import { useGetMeQuery } from '@/redux/features/users/userApi';
import { TUserData } from '@/types';
import { Edit } from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
    const { data: userData } = useGetMeQuery([{}]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState<TUserData | null>(null);

    const handleEditClick = (user: TUserData) => {
        setUserToUpdate(user);
        setEditDialogOpen(true);
    };

    return (
        <div className="container py-10 mx-auto flex justify-center">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border">
                <div className="flex items-center justify-center relative">
                    <h2 className="text-2xl font-semibold">My Profile</h2>
                    <button 
                        className="absolute right-0 bg-gray-200 hover:bg-gray-300 p-2 rounded-full" 
                        onClick={() => handleEditClick(userData as TUserData)}
                    >
                        <Edit size={20} />
                    </button>
                </div>
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <strong>Registration Date:</strong>
                        <span>{new Date(userData?.createdAt as Date).toDateString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <strong>Name:</strong>
                        <span className='capitalize'>{userData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <strong>Email:</strong>
                        <span>{userData?.email}</span>
                    </div>
                </div>
            </div>
            <EditProfile
                user={userToUpdate}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
        </div>
    );
};

export default Profile;

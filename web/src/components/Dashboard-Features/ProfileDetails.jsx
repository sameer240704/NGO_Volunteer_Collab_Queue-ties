import React from 'react';
import { User, Mail, Phone, MapPin, Building, Image, LogOut, Settings } from 'lucide-react';

const ProfileDetails = ({ user, onLogout }) => {
  const isAdmin = user.role === 'admin';

  console.log(user.user);
  

  return (
    <div className="max-h-screen">
      {/* Header */}
      <header className="">
        <div className="mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-end items-center">
          <div className="flex items-center space-x-4">
            
            <button onClick={onLogout} className="flex items-center text-red-600 hover:text-red-800">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="">
          {/* Profile card */}
          <div className=" overflow-hidden sm:rounded-lg font-harmonique">
            <div className="w-1/4 px-4 py-5 sm:px-6 flex justify-start flex-col-reverse items-center p-4 rounded-lg">
              <div className='flex flex-col items-center justify-center mt-2'>
                <h3 className="text-2xl leading-6 font-medium text-gray-900">
                  {user.user.name}
                </h3>
                <p className="mt-1 max-w-2xl text-lg text-gray-500">
                  {user.user.role === "admin" ? "NGO" : "Volunteer"}
                </p>
              </div>
              <img
                className="h-32 w-32 rounded-full object-cover"
                src={user.user.primaryImage}
                alt={user.user.name}
              />
          </div>
          <div className=" mt-5 px-4 py-5 sm:px-6 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                    <dt className="text-xl font-medium text-gray-500 flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Email
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">{user.user.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xl font-medium text-gray-500 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Phone
                  </dt>
                  <dd className="mt-1 text-lg text-gray-900">{user.user.phone}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xl font-medium text-gray-500 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Location
                  </dt>
                  <dd className="mt-1 text-lg text-gray-900">{`${user.user.city}, ${user.user.state}`}</dd>
                </div>
                {user.user.role=== 'admin' && (
                  <div className="sm:col-span-2">
                    <dt className="text-xl font-medium text-gray-500 flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      Address
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      <p>{user.user.address1}</p>
                      {user.user.address2 && <p>{user.user.address2}</p>}
                    </dd>
                  </div>
                )}
                {user.user.role === 'admin' && user.user.ngoImages && user.user.ngoImages.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-xl font-medium text-gray-500 flex items-center mb-2">
                      <Image className="w-5 h-5 mr-2" />
                      NGO Images
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <div className="grid grid-cols-3 gap-4 justify-center items-center">
                        {user.user.ngoImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`NGO Image ${index + 1}`}
                            className="h-60 w-full object-contain rounded-lg"
                          />
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDetails;
import React from 'react';

const EditProfile = ({ onCancel }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
          <div className="card p-4">
            <div className="nav flex flex-col">
              <a href="#" className="py-2 text-blue-300" onClick={onCancel}>Back To Profile</a>
              <a href="#" className="py-2">Settings</a>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="card">
            <div className="card-body">
              <div className="e-profile">
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <div className="mb-4 sm:mb-0">
                    <div className="w-36 h-36 bg-gray-300 rounded flex items-center justify-center">
                      <span className="text-gray-500 font-bold">140x140</span>
                    </div>
                    <button className="text-xl mt-3 bg-black hover:bg-gray-700 hover:shadow-2xl bg-opacity-30 text-white py-2 px-4 rounded duration-150">Upload your avater</button>
                  </div>
                  
                </div>  
                <div className="tab-content">
                  <div className="tab-pane active">
                    <form className="form">
                      <div className="mb-4">
                        <label className="block mb-2">Username</label>
                        <input className="form-control w-full px-3 py-2 text-gray-600" type="text" placeholder="Elon Musk" />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2">About</label>
                        <textarea className="form-control w-full px-3 py-2 text-gray-600" rows="5" placeholder="This is Elon Musk, Tesla's co founder and CEO, Elon is an inventor, a maverick and an entrepreneur, one of americas youngest billionaires"></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button className="btn btn-primary" onClick={onCancel}>Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 absolute bottom-0">
            <div className="card mt-4">
              <div className="card-body">
                <h6 className="font-bold">Support</h6>
                <p>Get fast, free help from our friendly assistants.</p>
                <button type="button" className="btn btn-primary">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

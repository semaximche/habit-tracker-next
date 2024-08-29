import React from 'react';

const FavoriteGroup = () => {
    return (
        <div className="bg-blue-900 p-5 rounded-lg mb-5">
            {/* Title of the Favorite Group Section */}
            <h2 className="text-xl font-bold">Favorite Group</h2>
            
            <div className="flex items-center mt-3">
                {/* Group Image */}
                <img
                    src="path_to_group_image" // Replace with actual image path
                    alt="Group" // Alternative text for the image
                    className="w-16 h-16 rounded-full" // Circle-shaped image
                />
                
                <div className="ml-4">
                    {/* Group Name */}
                    <h3 className="text-lg font-bold">GachiRunners</h3>
                    
                    {/* Group Description */}
                    <p>Welcome, we like to run in Haifa and eat bananas!</p>
                    
                    <div className="flex">
                        {/* Group Statistics */}
                        <div>2,388 Members</div>
                        <div>651 Online</div>
                        <div>262 In Chat</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteGroup;

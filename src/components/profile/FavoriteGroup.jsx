import React from 'react';

const FavoriteGroup = () => {
    return (
        <div className="bg-blue-900 p-5 rounded-lg mb-5">
            <h2 className="text-xl font-bold">Favorite Group</h2>
            <div className="flex items-center mt-3">
                <img
                    src="path_to_group_image"
                    alt="Group"
                    className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                    <h3 className="text-lg font-bold">GachiRunners</h3>
                    <p>Welcome, we like to run in Haifa and eat bananas!</p>
                    <div className="flex">
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

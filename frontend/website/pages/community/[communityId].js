import React from 'react';
import { Button } from '@mui/material';
import { East, Group, Pin, PushPin } from '@mui/icons-material';
import { BASE_URL_SERVER } from '../../static/constants';

export default function CommunityHomepage({ props }) {
    const name = "Sample Community";
    const description = "This is a sample community for demonstration purposes.";
    const isFollowing = false;
    const numUsers = 100;
    const numSubs = 50;
    const isMember = false;
    const requestToJoin = () => {
        console.log("Request to join sent.");
    };
    const pinnedPosts = [
        { title: "Post 1", content: "Content of post 1" },
        { title: "Post 2", content: "Content of post 2" },
        { title: "Post 3", content: "Content of post 3" }
    ];

    return (
        <div className="container mx-auto p-4">
            <header className="mb-4 flex justify-between items-center">
                <div>
                    {console.log(props)}
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-gray-600">{description}</p>
                    <div className="flex mt-2 items-center text-gray-600">
                        <div className="mr-4 flex items-center">
                            <Group className="w-5 h-5 mr-1 text-gray-500" />
                            <p className="flex-shrink-0">{numUsers} Users</p>
                        </div>
                        <div className="flex items-center">
                            <East className="w-5 h-5 mr-1 text-gray-500" />
                            <p className="flex-shrink-0">{numSubs} Subscriptions</p>
                        </div>
                    </div>

                </div>
                <div>
                    {!isMember && (
                        <button
                            onClick={requestToJoin}
                            disabled={isMember}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-4"
                        >
                            Request to Join
                        </button>
                    )}
                    {isMember && !isFollowing && (
                        <button
                            onClick={() => { }}
                            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-4"
                        >
                            Follow
                        </button>
                    )}
                </div>
            </header>

            <section className="pinned-posts">
                <h2 className="text-2xl font-semibold mb-2">Pinned Posts</h2>
                {pinnedPosts.map((post, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <PushPin className="text-yellow-500" />
                        </div>
                        <p className="text-gray-700">{post.content}</p>
                    </div>
                ))}
            </section>

        </div>
    );
}

export async function getServerSideProps(context) {

    const { communityId } = context.params;

    if (
        context.req.cookies.token === "" ||
        context.req.cookies.token === undefined
    ) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    } else {
        try {

            var communityHomePageURL = BASE_URL_SERVER + "community/" + communityId;
            const res = await fetch(communityHomePageURL,
                {
                    method: "GET",
                    headers: new Headers({
                        Authorization: context.req.cookies.token,
                        "Content-Type": "application/json",
                    }),
                }
            );
            const data = await res.json();

            if (res.status === 200) {
                return {
                    props: {
                        community: data,
                    },
                };
            } else {
                return {
                    props: {
                        error: data.message,
                    },
                };
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return { props: { error: "Error fetching data. Please try again later" } };
        }
    }
}

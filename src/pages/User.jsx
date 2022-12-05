import { FaCode, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../component/layout/Spinner";
import GithubContext from "../context/github/GithubContext";
import RepoList from "../component/repos/RepoList";

const User = () => {
    const { user, getUser, loading, repos, getRepos } =
        useContext(GithubContext);

    const { login } = useParams();

    useEffect(() => {
        getUser(login);
        getRepos(login);
        //eslink-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user;

    // console.log(login, user, repos);

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <>
                <div className='w-full mx-auto lg:w-10/12'>
                    <Link to='/' className='btn btn-ghost'>
                        Back To Search
                    </Link>
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
                    <div className='custom-card-image mb-6 md:mb-0'>
                        <div className='rounded-lg shadow-xl card image-full'>
                            <figure>
                                <img src={avatar_url} alt={name} />
                            </figure>

                            <div className='card-body justify-end'>
                                <h2 className='card-title mb-0'>{name}</h2>
                                <p>{login}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className='mb-6'>
                            <h1 className='text-3xl card-title'>
                                {name}
                                <div className='ml-2 mr-1 badge badge-sucess'>
                                    {type}
                                </div>
                                {hireable && (
                                    <div className='mx-1 badge badge-info'></div>
                                )}
                            </h1>
                            <p>{bio}</p>
                            <div className='mt-4 card-actions'>
                                <a
                                    href={html_url}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='btn btn-outline'>
                                    Go to Github Profile
                                </a>
                            </div>
                        </div>
                        <div className='w-full rounded-lg shadow-md bg-case-100 stats'>
                            {location && (
                                <div className='stat'>
                                    <div className='stat-title text-md'>
                                        Location
                                    </div>
                                    <div className='text-lg stat-value'>
                                        {location}
                                    </div>
                                </div>
                            )}
                            {blog && (
                                <div className='stat'>
                                    <div className='stat-title text-md'>
                                        Website
                                    </div>
                                    <div className='text-lg stat-value'>
                                        <a
                                            href={blog}
                                            target='_blank'
                                            rel='noreferrer'>
                                            {blog}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
                            <div className='stat'>
                                <div className='stat-figure text-secondary'>
                                    <FaUsers className='text-3xl md:text-5xl' />
                                </div>
                                <div className='stat-title pr-5'>Followers</div>
                                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                    {followers}
                                </div>
                            </div>
                            <div className='stat'>
                                <div className='stat-figure text-secondary'>
                                    <FaUserFriends className='text-3xl md:text-5xl' />
                                </div>
                                <div className='stat-title pr-5'>Following</div>
                                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                    {following}
                                </div>
                            </div>
                            <div className='stat'>
                                <div className='stat-figure text-secondary'>
                                    <FaCode className='text-3xl md:text-5xl' />
                                </div>
                                <div className='stat-title pr-5'>
                                    Public Repos
                                </div>
                                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                    {public_repos}
                                </div>
                            </div>
                            <div className='stat'>
                                <div className='stat-figure text-secondary'>
                                    <FaStore className='text-3xl md:text-5xl' />
                                </div>
                                <div className='stat-title pr-5'>
                                    Public Gist
                                </div>
                                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                    {public_gists}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {repos ? <RepoList repos={repos} /> : <></>}
            </>
        );
    }
};

export default User;
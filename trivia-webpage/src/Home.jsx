import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import './Home.css';
import profile from './images/profile.jpg';

const supabase = createClient("https://oxwswcbraxegyjpdkzpm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94d3N3Y2JyYXhlZ3lqcGRrenBtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODAxMDkwMiwiZXhwIjoyMDEzNTg2OTAyfQ.7WMXpuc_gBQpO99zMDVVaUqdEc_ZF7mBP7r8Ir74TL4");


const Home = () => {

    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [leaderBoard, setLeaderboard] = useState({});

    useEffect(() => {
        getUserData();
        getLeaderboard();
    }, []);

    async function getUserData() {
        await supabase.auth.getUser().then((value) => {
            // value.data.user
            if (value.data?.user) {
                console.log(value.data.user);
                setUser(value.data.user)
                getUserInfo(value.data.user.id)
            }
        })
    }

    async function getUserInfo(id) {
        const { data } = await supabase
            .from("profiles")
            .select()
            .eq("id", id)
            .limit(1);

        if (data && data.length > 0) {
            console.log(data);
            setData(data)
        } else {
            console.log("No data found for the specified id");
        }
    }

    async function getLeaderboard() {
        const { data, error } = await supabase
            .from('profiles')
            .select() // Switched the order of attributes
            .order('total_points', { ascending: false })
            .limit(10);

        if (error) {
            console.error('Error fetching leaderboard:', error);
        } else {
            setLeaderboard(data); // Set all fetched data
            console.log(data); // Log all fetched data
        }
    }



        const leaderboardData = [
            { name: 'John', score: 100 },
            { name: 'Jane', score: 95 },
            { name: 'Bob', score: 90 },
            { name: 'Alice', score: 85 },
            { name: 'Eve', score: 80 },
            { name: 'Eve', score: 80 },
            { name: 'Eve', score: 80 },
    ];

        const [selectedTopic, setSelectedTopic] = useState(''); // Initialize the selected topic

        const handleTopicChange = (event) => {
            setSelectedTopic(event.target.value);
        };


        const correctQuestions = data?.[0]?.correct_questions || 0;
        const totalQuestions = data?.[0]?.total_questions || 0;
        const percentageCorrect = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;



        return (

            <div className="trivia-app">

                <div className="absolute stats stats-vertical shadow ml-20 top-40">
                    <div className="stat">
                        <div className="stat-title">Questions Answered</div>
                        <div className="stat-value">{totalQuestions}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>
                </div>

                <div className="absolute stats stats-vertical shadow ml-20 top-72 bg-[#ff5d6c] text-white">
                    <div className="stat">
                        <div className="stat-title text-white">Favorite Category</div>
                        <div className="stat-value">Fiction</div>
                    </div>
                </div>

                <div className="absolute stats stats-vertical shadow ml-20 top-96 mt-5 bg-[#646CFF]">
                    <div className="stat">
                        <div className="stat-title text-white">Percentage Correct</div>
                        <div className="radial-progress ml-5 mt-3 mb-3 text-white font-bold" style={{ "--value": `${percentageCorrect}`, "--size": "5rem", "--thickness": "10px" }}>{percentageCorrect}%</div>
                        <div className="stat-desc text-white"> {data?.[0]?.correct_questions || 0} /  {data?.[0]?.total_questions || 0}</div>
                    </div>
                </div>



                <div className="absolute top-40 right-10 w-1/4 p-4">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white p-4 rounded-lg">
                            Current Player Ranking
                        </h2>
                        <div className="mb-5 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                    </div>

                    {leaderBoard && leaderBoard.length > 0 && (
                        <div>
                            <div className="space-y-2">
                                {leaderBoard.map((user, index) => (
                                    <div key={index} className="flex items-center justify-end">
                                        <div
                                            className={`bg-${index % 2 === 0 ? '[#646CFF]' : '[#ff5d6c]'} rounded-lg flex items-center justify-between ${index < 3 ? `border-4` : ''
                                                } ${index === 0 ? 'border-[#FFD700]' : index === 1 ? 'border-[#C0C0C0]' : 'border-[#CD853F]'}  ${index < 3 ? 'w-full text-lg' : 'w-11/12 text-m'}`}
                                        >
                                            <div className={`p-${index < 3 ? '4' : '2'} flex items-center`}>
                                                <span className="font-bold text-[#283249] text-center mr-4">
                                                    #{index + 1}
                                                </span>
                                                <div className="avatar rounded-full">
                                                    <img src={profile} style={{ width: '35px', height: '35px' }} />
                                                </div>
                                                <span className="font-bold text-[#283249] text-center ml-4">
                                                    {user.screen_name}
                                                </span>
                                            </div>
                                            <span className={`${index < 3 ? 'text-2xl' : 'text-xl'} mr-3 font-bold text-[#283249] text-left p-${index < 3 ? '4' : '2'}`}>
                                                {user.total_points}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>





                <div className="flex flex-col items-center mt-80">
                    <div className="flex space-x-2">
                        <div className="w-24 h-28 relative">
                            <div className="absolute inset-0 bg-[#ff5d6c] rounded-3xl text-white font-retro text-5xl font-bold flex items-center justify-center">
                                Q
                            </div>
                            

                        </div>
                        <div className="w-24 h-28 relative">
                            <div className="absolute inset-0 bg-[#646CFF] rounded-3xl text-white font-retro text-5xl font-bold flex items-center justify-center">
                                U
                            </div>

                        </div>
                        <div className="w-24 h-28 relative">
                            <div className="absolute inset-0 bg-[#ff5d6c] rounded-3xl text-white font-retro text-5xl font-bold flex items-center justify-center">
                                I
                            </div>

                        </div>
                        <div className="w-24 h-28 relative">
                            <div className="absolute inset-0 bg-[#646CFF] rounded-3xl text-white font-retro text-5xl font-bold flex items-center justify-center">
                                Z
                            </div>

                        </div>
                    </div>
                    <div className="mt-5 h-1 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"></div>


                    <div className="flex flex-col items-center">

                            <NavLink to="/quiz">
                                <button className="btn btn-lg w-120 h-20 text-4xl mt-10 bg-[#F7C75E]">
                                    Start {selectedTopic ? selectedTopic : 'a'} quiz!
                                </button>
                            </NavLink>

                    </div>


                </div>

            </div>
        );
}
export default Home;

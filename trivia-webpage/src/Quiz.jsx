import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from "react-router-dom";

const supabase = createClient("https://oxwswcbraxegyjpdkzpm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94d3N3Y2JyYXhlZ3lqcGRrenBtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODAxMDkwMiwiZXhwIjoyMDEzNTg2OTAyfQ.7WMXpuc_gBQpO99zMDVVaUqdEc_ZF7mBP7r8Ir74TL4");


function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return the shuffled array
}


const Quiz = () => {
    const navigate = useNavigate();
    const questionCount = 10;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [data, setData] = useState({});
    const [updatedCorrectQuestions, setUpdatedCorrectQuestions] = useState(0);
    const { topic } = useParams();


    const [user, setUser] = useState({});
    useEffect(() => {
        console.log(topic);
        loadQuestions();
        getUserData();
    }, []);

    async function getUserData() {
        await supabase.auth.getUser().then((value) => {
            // value.data.user
            if (value.data?.user) {
                console.log(value.data.user);
                setUser(value.data.user)
                getProfile(value.data.user.id)
                getLeaderboard(value.data.user.id)
            }
        })
    }

    async function getLeaderboard(id) {
        const { data, error } = await supabase
            .from('profiles')
            .select('id', 'total_points')
            .order('total_points', { ascending: false })
            .limit(10)
    }

    async function getProfile(id) {
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

    async function updateTotalPoints(idnum, updatedPoints) {
        try {
            const { data, error } = await supabase.rpc('updateuserdatafromquiz', {
                points: updatedPoints,
                questions: questionCount,
                correct: updatedCorrectQuestions,
                row_id: idnum,
            });

            if (error) {
                console.error("Error updating total points:", error);
            } else {
                console.log("Total points updated successfully:", data);
            }

            let rpcName = '';

            // Determine the RPC name based on the topic
            switch (topic) {
                case 'entertainment':
                    rpcName = 'updateentertainmentpoints';
                    break;
                case 'history':
                    rpcName = 'updatehistorypoints';
                    break;
                case 'science':
                    rpcName = 'updatesciencepoints';
                    break;
                case 'geography':
                    rpcName = 'updategeographypoints';
                    break;
                case 'miscellaneous':
                default:
                    rpcName = 'updatemiscpoints';
                    break;
            }

            const { data2, error2 } = await supabase.rpc(rpcName, {
                questions: questionCount,
                correct: updatedCorrectQuestions,
                row_id: idnum,
            });

            if (error2) {
                console.error("Error updating total points with topic RPC:", error2);
            } else {
                console.log("Topic-specific points updated successfully:", data2);
            }
        } catch (err) {
            console.error("Error updating points:", err);
        }
    }



    async function loadQuestions() {

        const questionIndices = [];

        let tableName = '';
        let availableQuestion = 0;

        // Mapping between topics and table names
        const tableMappings = {
            entertainment: { tableName: 'ent_table', availableQuestion: 236 },
            history: { tableName: 'hist_table', availableQuestion: 31 },
            science: { tableName: 'sci_table', availableQuestion: 83 },
            geography: { tableName: 'geo_table', availableQuestion: 34 },
            miscellaneous: { tableName: 'misc_table', availableQuestion: 116 },
        };

        // Check if the topic has a corresponding table name in the mapping
        if (topic in tableMappings) {
            tableName = tableMappings[topic].tableName;
            availableQuestion = tableMappings[topic].availableQuestion;
        } else {
            // If no mapping is found, use a default table name or handle accordingly
            tableName = 'misc_table';
            availableQuestion = 116; // Set default available question count
        }

        while (questionIndices.length < questionCount) {
            const randomID = Math.floor(Math.random() * availableQuestion) + 1;
            if (!questionIndices.includes(randomID)) {
                questionIndices.push(randomID);
            }
        }

        const loadedQuestions = [];

        for (const randomID of questionIndices) {
            const { data } = await supabase
                .from(tableName)
                .select()
                .eq("qid", randomID)
                .limit(1);

            if (data.length > 0) {
                const correctAnswer = data[0].correct_answer;
                const incorrectAnswers = [
                    data[0].incorrect_answers_0,
                    data[0].incorrect_answers_1,
                    data[0].incorrect_answers_2,
                ].filter((answer) => answer !== null);


                const allAnswers = [correctAnswer, ...incorrectAnswers];
                console.log(allAnswers);
                shuffleArray(allAnswers);
                console.log(allAnswers);
                console.log(data);


                loadedQuestions.push({
                    question: data[0].question,
                    answers: allAnswers, // Shuffled answers
                    correct: correctAnswer,
                    type: data.type
                });
            }
        }

        setQuestions(loadedQuestions);
    }




    const currentQuestion = questions[currentQuestionIndex];

    function handleAnswerSelect(answer) {
        // Check if the selected answer is correct
        var updatedPoints = points;
        console.log(currentQuestion.correct);
        if (currentQuestion && currentQuestion.correct === answer) {
            // If correct, add 10 points
            updatedPoints = updatedPoints + 10;
            setPoints(updatedPoints);
            setUpdatedCorrectQuestions(prevCount => prevCount + 1);
        }

        // Increment the current question index
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Handle end of questions
            console.log("End of questions. Total Points: " + updatedPoints);
            updateTotalPoints(user.id, updatedPoints);
            navigate(`/score#${updatedPoints}`);
        }
    }


    // Array of unique colors
    const buttonColors = ['#ff5d6c', '#646CFF', '#D4A548', '#50C878'];

    // ... (existing code)

    return (
        <div className="quiz-container text-center flex flex-col justify-center items-center h-screen">
            {/* ... (existing code) */}
            <h2 className="quiz-question font-bold text-white text-4xl">
                {currentQuestion ? currentQuestion.question : 'Loading...'}
            </h2>

            <p className="text-white text-xl mt-4">
                Question {currentQuestionIndex + 1} of {questions.length}
            </p>

            <div className="quiz-options mt-4 space-y-4">
                {currentQuestion && (
                    <div className="quiz-row flex justify-center">
                        {/* Render buttons based on question type */}
                        {currentQuestion.answers.map((answer, index) => {
                            // Check if the type of answer is boolean
                            if (typeof answer === 'boolean') {
                                // Render two buttons for boolean answers
                                return (
                                    <React.Fragment key={index}>
                                        <button
                                            style={{ backgroundColor: buttonColors[0] }}
                                            className="quiz-option text-white text-3xl m-8 btn btn-xl w-96 h-48 font-bold rounded-lg"
                                            onClick={() => handleAnswerSelect(true)}
                                        >
                                            True
                                        </button>
                                        <button
                                            style={{ backgroundColor: buttonColors[1] }}
                                            className="quiz-option text-white text-3xl m-8 btn btn-xl w-96 h-48 font-bold rounded-lg"
                                            onClick={() => handleAnswerSelect(false)}
                                        >
                                            False
                                        </button>
                                    </React.Fragment>
                                );
                            } else {
                                // Render normal buttons for other types of answers
                                return (
                                    <button
                                        key={index}
                                        style={{ backgroundColor: buttonColors[index] }}
                                        className="quiz-option text-white text-3xl m-8 btn btn-xl w-96 h-48 font-bold rounded-lg"
                                        onClick={() => handleAnswerSelect(answer)}
                                    >
                                        {answer}
                                    </button>
                                );
                            }
                        })}
                    </div>
                )}
            </div>

            <p className="text-white text-xl mt-4">Points: {points}</p>
        </div>
    );

};

export default Quiz;
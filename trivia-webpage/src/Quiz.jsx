import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

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

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [data, setData] = useState({});
    const [updatedCorrectQuestions, setUpdatedCorrectQuestions] = useState(0);


    const [user, setUser] = useState({});
    useEffect(() => {
        loadQuestions();
        getUserData();
    }, []);

    async function getUserData() {
        await supabase.auth.getUser().then((value) => {
            // value.data.user
            if (value.data?.user) {
                console.log(value.data.user);
                setUser(value.data.user)
                test(value.data.user.id)
            }
        })
    }

    async function test(id) {
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
        const { data, error } = await supabase
            .rpc('updateuserdatafromquiz', { points: updatedPoints, questions: 5, correct: updatedCorrectQuestions,  row_id: idnum })

        if (error) {
            console.error("Error updating total points:", error);
        } else {
            console.log("Total points updated successfully:", data);
        }
    }

    async function loadQuestions() {
        const maxQuestions = 500;
        const questionCount = 5;
        const questionIndices = [];

        while (questionIndices.length < questionCount) {
            const randomID = Math.floor(Math.random() * maxQuestions) + 1;
            if (!questionIndices.includes(randomID)) {
                questionIndices.push(randomID);
            }
        }

        const loadedQuestions = [];

        for (const randomID of questionIndices) {
            const { data } = await supabase
                .from("Questions")
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


                loadedQuestions.push({
                    question: data[0].question,
                    answers: allAnswers, // Shuffled answers
                    correct: correctAnswer,
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

    return (

        <div className="quiz-container text-center flex flex-col justify-center items-center h-screen">
            <img tabIndex={0} src={user.user_metadata?.avatar_url} className="btn btn-ghost btn-circle avatar" alt="User Profile" />
            <div className="text-white"> TEST: {data?.[0]?.total_questions || 0} </div>
            <h2 className="quiz-question font-bold text-white text-4xl">
                {currentQuestion ? currentQuestion.question : 'Loading...'}
            </h2>

            <p className="text-white text-xl mt-4">
                Question {currentQuestionIndex + 1} of {questions.length}
            </p>

            <div className="quiz-options mt-4 space-y-4">
                {currentQuestion && (
                    <div className="quiz-row flex justify-center">
                        {currentQuestion.answers.map((answer, index) => (
                            <button
                                key={index}
                                style={{ backgroundColor: buttonColors[index] }}
                                className="quiz-option text-white text-3xl m-8 btn btn-xl w-96 h-48 font-bold rounded-lg"
                                onClick={() => handleAnswerSelect(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <p className="text-white text-xl mt-4">Points: {points}</p>
        </div>
    );
};

export default Quiz;
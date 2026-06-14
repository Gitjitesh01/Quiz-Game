import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '../../../context/userContext';
import { Paper } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.css'; // Assuming you have a styles.css file for custom styles
import axios from 'axios';
import { QUIZ, baseUrl, baseUrl1 } from '../../../constants/apiUrl';

// Initialize Supabase client
const supabaseUrl = "https://qhcpxbkmqeolnjplsmoi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoY3B4YmttcWVvbG5qcGxzbW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MDIwNjAsImV4cCI6MjAzODk3ODA2MH0.4_hlataQGgbDJP7wttzIwtXkqHIg1rc7zZR14odOnho";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ResponseData = ({}) => {

  const { currentuserdata } = useUser();
  const [quizzes, setQuizzes] = useState([]);
  const previousQuizzes = useRef([]); // Ref to store the previous quizzes
  const [quizData, setQuizData] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizReport, setQuizReport] = useState(null);
  const [Status, setStatus] = useState(quizData?.isActive);
  const [filterTerm, setFilterTerm] = useState(''); // New filter state

  useEffect(() => {
    const localId = currentuserdata;

    // Fetch quiz data using Axios
    axios
      .post(baseUrl + QUIZ.getQuizbyUser, { userid: localId.id }) 
      .then((response) => {
        setQuizData(response.data.allQuiz);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, [Status]);

  const getQuizzes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('quiz')
        .select('*')
        .eq('Created_by', currentuserdata.id);

      if (error) throw error;

      previousQuizzes.current = quizzes;
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error.message);
    }
  }, [currentuserdata.id, quizzes]);

  useEffect(() => {
    getQuizzes();

    const subscription = supabase
      .channel('public:quiz')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz' }, (payload) => {
        console.log('Change received:', payload);
        getQuizzes();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [getQuizzes]);

  const findChangeType = (quiz, index) => {
    const previousQuiz = previousQuizzes.current.find(q => q.id === quiz.id);
    if (!previousQuiz) return 'new';
    if (previousQuiz.total_score !== quiz.total_score) return 'update';
    if (index !== quizzes.findIndex(q => q.id === quiz.id)) return 'move';
    return 'none';
  };

  // Filter quizzes based on filter term
  const filteredQuizzes = quizzes.filter((quiz) => {
    return (
      quiz.quiz_name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      quiz.quiz_id.toString().includes(filterTerm)
    );
  });

  return (
    <Paper style={{ padding: '16px' }}>
 <select
  value={filterTerm}
  onChange={(e) => {setFilterTerm(e.target.value)
    console.log(e.target.value)}
  } // Update filter term based on selection
  style={{ marginBottom: '16px', padding: '8px', width: '100%' }}
>
  <option value="">All</option>
  {quizzes.map((quiz) => (
    <option key={quiz.id} value={quiz._id}>
      {quiz.quiz_id}
    </option>
  ))}
</select>

      <QuizList 
        quizzes={filteredQuizzes} // Pass filtered quizzes
        findChangeType={findChangeType} 
        Status={Status} 
        quizData={quizData} 
        setStatus={setStatus} 
        baseUrl1={baseUrl1} 
      />
    </Paper>
  );
};

const QuizList = ({ quizzes, findChangeType, setStatus, baseUrl1, quizData, Status }) => {

  const sendData = (id) => {
    axios.put(`${baseUrl1}/toggleActivityStatus/${id}`)
      .then(response => {
        console.log(response.data.quiz?.isActive);
        setStatus(response.data.quiz);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const sendscheduledata = (id) => {
    axios.put(`${baseUrl1}/toggleschedule/${id}`)
      .then(response => {
        console.log(response.data.quiz?.isActive);
        setStatus(response.data.quiz);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {}, [Status]);

  return (
    <div>
     
      <TransitionGroup>
        {quizzes.map((quiz, index) => {
          const changeType = findChangeType(quiz, index);
          return (
            <CSSTransition
              key={quiz.id}
              timeout={2000}
              classNames={changeType === 'new' ? 'fade' : changeType === 'update' ? 'flash' : 'move'}
            >
              <div
                style={{
                  padding: '16px',
                  marginBottom: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <h2>Quiz: {quiz.quiz_name}</h2>
                  <p>Quiz ID: {quiz.quiz_id}</p>
                  <p>Total Score: {quiz.total_score}</p>
                </div>
                <div className='flex justify-evenly text-center items-center w-full gap-3'>
                  <StudentRankingList students={quiz.student_info} />
                </div>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

const StudentRankingList = ({ students }) => {
  const elementsRef = useRef({});
  const prevElementsPositionRef = useRef({});

  useLayoutEffect(() => {
    const animateChanges = () => {
      const newPositions = Object.entries(elementsRef.current).reduce((acc, [key, element]) => {
        if (!element) return acc;
        const { top, left } = element.getBoundingClientRect();
        acc[key] = { top, left };

        if (prevElementsPositionRef.current[key]) {
          const deltaY = prevElementsPositionRef.current[key].top - top;
          const deltaX = prevElementsPositionRef.current[key].left - left;
          element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
          element.style.transition = 'transform 0s';
        }

        return acc;
      }, {});

      prevElementsPositionRef.current = newPositions;

      requestAnimationFrame(() => {
        Object.values(elementsRef.current).forEach((element) => {
          if (!element) return;
          element.style.transform = '';
          element.style.transition = 'transform 0.4s';
        });
      });
    };

    const id = requestAnimationFrame(animateChanges);
    return () => cancelAnimationFrame(id);
  }, [students]);

  return (
    <div className="ranking-container w-full justify-evenly items-start text-xl overflow-hidden">
      <div className="column">
        <p className="header">Rank</p>
        <TransitionGroup>
          {students?.sort((a, b) => b.student_score - a.student_score).map((student, index) => (
            <CSSTransition key={student.student_email} timeout={2000} classNames="rank-change">
              <div
                className="row"
                ref={(el) => {
                  elementsRef.current[`${student.student_email}-rank`] = el;
                }}
              >
                {index + 1}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div className="column w-[10%] overflow-hidden">
        <p className="header">Name</p>
        <TransitionGroup>
          {students.map((student) => (
            <CSSTransition key={student.student_email} timeout={2000} classNames="name-change">
              <div
                className="row"
                ref={(el) => {
                  elementsRef.current[`${student.student_email}-name`] = el;
                }}
              >
                {student.student_firstname}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div className="column w-[30%] overflow-hidden">
        <p className="header">Email</p>
        <TransitionGroup>
          {students?.map((student) => (
            <CSSTransition key={student.student_email} timeout={2000} classNames="email-change">
              <div
                className="row"
                ref={(el) => {
                  elementsRef.current[`${student.student_email}-email`] = el;
                }}
              >
                {student.student_email}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div className="column">
        <p className="header">Score</p>
        <TransitionGroup>
          {students?.map((student) => (
            <CSSTransition key={student.student_email} timeout={2000} classNames="score-change">
              <div
                className="row"
                ref={(el) => {
                  elementsRef.current[`${student.student_email}-score`] = el;
                }}
              >
                {student.student_score}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default ResponseData;

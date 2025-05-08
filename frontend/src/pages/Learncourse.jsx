import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const modulesData = {
  1: [
    {
      id: 'module1',
      title: 'Introduction to Full Stack Development',
      description: 'Learn the fundamentals of full stack development and web architecture',
      lessons: [
        { id: 'lesson1', title: 'What is Full Stack Development?', video: 'https://www.youtube.com/embed/Zftx68K-1D4', resource: '/resources/fullstack_intro.pdf', duration: '8:32' },
        { id: 'lesson2', title: 'Frontend vs Backend', video: 'https://www.youtube.com/embed/srvUrASNj0s', resource: '/resources/frontend_backend.pdf', duration: '10:15' },
        { id: 'lesson3', title: 'Client-Server Architecture', video: 'https://www.youtube.com/embed/1tRLveSyNz8', resource: '/resources/client_server.pdf', duration: '12:45' },
        { id: 'lesson4', title: 'How the Web Works', video: 'https://www.youtube.com/embed/DQh5zR_Ij5w', resource: '/resources/web_working.pdf', duration: '15:20' },
        { id: 'lesson5', title: 'HTTP Basics', video: 'https://www.youtube.com/embed/eesqK59rhGA', resource: '/resources/http_basics.pdf', duration: '9:50' },
      ],
      quiz: {
        title: 'Module 1 Quiz',
        questions: [
          {
            id: 1,
            question: 'What does full stack development refer to?',
            options: [
              'Only frontend development',
              'Only backend development',
              'Both frontend and backend development',
              'Database administration only'
            ],
            correctAnswer: 2
          },
          {
            id: 2,
            question: 'Which of these is NOT typically a frontend technology?',
            options: ['React', 'Angular', 'Express.js', 'Vue.js'],
            correctAnswer: 2
          },
          {
            id: 3,
            question: 'What protocol do web browsers primarily use to communicate with servers?',
            options: ['FTP', 'HTTP', 'SMTP', 'TCP'],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 'module2',
      title: 'Frontend Development',
      description: 'Master the core technologies for building modern web interfaces',
      lessons: [
        { id: 'lesson6', title: 'HTML & CSS Basics', video: 'https://www.youtube.com/embed/pQN-pnXPaVg', resource: '/resources/html_css.pdf', duration: '25:10' },
        { id: 'lesson7', title: 'JavaScript Fundamentals', video: 'https://www.youtube.com/embed/PkZNo7MFNFg', resource: '/resources/js_basics.pdf', duration: '45:30' },
        { id: 'lesson8', title: 'React Introduction', video: 'https://www.youtube.com/embed/bMknfKXIFA8', resource: '/resources/react_intro.pdf', duration: '32:15' },
        { id: 'lesson9', title: 'State and Props in React', video: 'https://www.youtube.com/embed/35lXWvCuM8o', resource: '/resources/state_props.pdf', duration: '18:45' },
        { id: 'lesson10', title: 'React Hooks Overview', video: 'https://www.youtube.com/embed/f687hBjwFcM', resource: '/resources/hooks_overview.pdf', duration: '22:50' },
      ],
      quiz: {
        title: 'Module 2 Quiz',
        questions: [
          {
            id: 1,
            question: 'What does CSS stand for?',
            options: [
              'Computer Style Sheets',
              'Creative Style Sheets',
              'Cascading Style Sheets',
              'Colorful Style Sheets'
            ],
            correctAnswer: 2
          },
          {
            id: 2,
            question: 'Which React hook is used for side effects?',
            options: ['useState', 'useEffect', 'useContext', 'useReducer'],
            correctAnswer: 1
          },
          {
            id: 3,
            question: 'What is the virtual DOM?',
            options: [
              'A lightweight copy of the real DOM',
              'A 3D rendering of web components',
              'A database for storing DOM elements',
              'A browser plugin for DOM manipulation'
            ],
            correctAnswer: 0
          }
        ]
      }
    },
    {
      id: 'module3',
      title: 'Backend Development',
      description: 'Learn to build robust server-side applications and APIs',
      lessons: [
        { id: 'lesson11', title: 'Node.js Basics', video: 'https://www.youtube.com/embed/TlB_eWDSMt4', resource: '/resources/nodejs_basics.pdf', duration: '28:20' },
        { id: 'lesson12', title: 'Express.js Introduction', video: 'https://www.youtube.com/embed/L72fhGm1tfE', resource: '/resources/express_intro.pdf', duration: '35:15' },
        { id: 'lesson13', title: 'REST API Concepts', video: 'https://www.youtube.com/embed/qZXt1Aom3Cs', resource: '/resources/rest_api.pdf', duration: '20:45' },
        { id: 'lesson14', title: 'MongoDB Basics', video: 'https://www.youtube.com/embed/oSIv-E60NiU', resource: '/resources/mongodb_basics.pdf', duration: '25:30' },
        { id: 'lesson15', title: 'Connecting Frontend with Backend', video: 'https://www.youtube.com/embed/0D5EEKH97NA', resource: '/resources/fullstack_connect.pdf', duration: '18:15' },
      ],
      quiz: {
        title: 'Module 3 Quiz',
        questions: [
          {
            id: 1,
            question: 'What is Node.js?',
            options: [
              'A frontend JavaScript framework',
              'A JavaScript runtime built on Chrome\'s V8 engine',
              'A database management system',
              'A CSS preprocessor'
            ],
            correctAnswer: 1
          },
          {
            id: 2,
            question: 'Which HTTP method is typically used for creating resources in REST?',
            options: ['GET', 'POST', 'PUT', 'DELETE'],
            correctAnswer: 1
          },
          {
            id: 3,
            question: 'MongoDB is what type of database?',
            options: ['Relational', 'Document', 'Graph', 'Key-value'],
            correctAnswer: 1
          }
        ]
      }
    },
  ],
};

const CourseLearning = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const modules = modulesData[id] || [];
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [completedQuizzes, setCompletedQuizzes] = useState(new Set());
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [activeTab, setActiveTab] = useState('lessons');
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState('');
  const [discussionPosts, setDiscussionPosts] = useState([
    { id: 1, author: 'John Doe', content: 'Has anyone completed the React hooks lesson? I have some questions.', date: '2023-05-15', replies: [] },
    { id: 2, author: 'Jane Smith', content: 'The REST API concepts were explained really well in this course!', date: '2023-05-10', replies: [] },
  ]);
  const [newPost, setNewPost] = useState('');

  const allLessons = modules.flatMap((mod) => mod.lessons);

  useEffect(() => {
    if (modules.length && modules[0].lessons.length) {
      setSelectedLesson(modules[0].lessons[0]);
    }
  }, [id]);

  const toggleCompletion = (lessonId) => {
    setCompletedLessons((prev) => {
      const updated = new Set(prev);
      if (updated.has(lessonId)) {
        updated.delete(lessonId);
      } else {
        updated.add(lessonId);
      }
      return updated;
    });
  };

  const handleQuizAnswer = (moduleId, questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [`${moduleId}-${questionId}`]: answerIndex
    }));
  };

  const submitQuiz = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    const results = module.quiz.questions.map(question => {
      const userAnswer = quizAnswers[`${moduleId}-${question.id}`];
      return {
        questionId: question.id,
        correct: userAnswer === question.correctAnswer,
        correctAnswer: question.correctAnswer,
        userAnswer
      };
    });

    const score = results.filter(r => r.correct).length;
    const passed = score >= module.quiz.questions.length * 0.7; // 70% to pass

    setQuizResults(prev => ({
      ...prev,
      [moduleId]: { results, score, total: module.quiz.questions.length, passed }
    }));

    if (passed) {
      setCompletedQuizzes(prev => new Set(prev).add(moduleId));
    }
  };

  const saveNote = () => {
    if (selectedLesson && currentNote.trim()) {
      setNotes(prev => ({
        ...prev,
        [selectedLesson.id]: [...(prev[selectedLesson.id] || []), {
          id: Date.now(),
          content: currentNote,
          date: new Date().toISOString()
        }]
      }));
      setCurrentNote('');
    }
  };

  const addDiscussionPost = () => {
    if (newPost.trim()) {
      setDiscussionPosts(prev => [
        {
          id: Date.now(),
          author: 'Current User',
          content: newPost,
          date: new Date().toISOString().split('T')[0],
          replies: []
        },
        ...prev
      ]);
      setNewPost('');
    }
  };

  const addReply = (postId, replyContent) => {
    if (replyContent.trim()) {
      setDiscussionPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: Date.now(),
                author: 'Current User',
                content: replyContent,
                date: new Date().toISOString().split('T')[0]
              }
            ]
          };
        }
        return post;
      }));
    }
  };

  const isCompleted = selectedLesson && completedLessons.has(selectedLesson.id);
  const isCourseCompleted = allLessons.length > 0 && completedLessons.size === allLessons.length;
  const allQuizzesCompleted = modules.every(module => completedQuizzes.has(module.id));
  const progressPercentage = allLessons.length > 0 ? Math.round((completedLessons.size / allLessons.length) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
   
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white p-4 border-r border-gray-200">
          <button
            onClick={() => navigate('/courses')}
            className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to Courses</span>
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Course Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-green-500 h-4 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {completedLessons.size} of {allLessons.length} lessons completed ({progressPercentage}%)
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Modules</h2>
            <div className="space-y-4">
              {modules.map((mod) => {
                const moduleLessons = mod.lessons;
                const completedModuleLessons = moduleLessons.filter(lesson => completedLessons.has(lesson.id)).length;
                const moduleProgress = moduleLessons.length > 0 ? Math.round((completedModuleLessons / moduleLessons.length) * 100) : 0;

                return (
                  <div key={mod.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-3 border-b">
                      <h3 className="font-semibold text-gray-800">{mod.title}</h3>
                      <p className="text-xs text-gray-500">{mod.description}</p>
                    </div>
                    <ul className="divide-y divide-gray-200">
                      {mod.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className={`p-3 cursor-pointer hover:bg-gray-50 transition ${
                            selectedLesson?.id === lesson.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                          }`}
                          onClick={() => {
                            setSelectedLesson(lesson);
                            setActiveTab('lessons');
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <span className={`${
                              selectedLesson?.id === lesson.id ? 'text-blue-600 font-medium' : 'text-gray-700'
                            }`}>
                              {lesson.title}
                            </span>
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div>
                          {completedLessons.has(lesson.id) && (
                            <span className="inline-flex items-center mt-1 text-xs text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Completed
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 bg-gray-50 border-t">
                      <button
                        onClick={() => {
                          const firstUncompleted = mod.lessons.find(lesson => !completedLessons.has(lesson.id)) || mod.lessons[0];
                          setSelectedLesson(firstUncompleted);
                          setActiveTab('quiz');
                        }}
                        className={`w-full py-2 px-3 rounded-md text-sm font-medium ${
                          completedQuizzes.has(mod.id)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                        }`}
                      >
                        {completedQuizzes.has(mod.id) ? 'Quiz Completed ✓' : 'Take Quiz'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Resources</h3>
            <ul className="space-y-2">
              {allLessons.map((lesson) => (
                <li key={lesson.id}>
                  <a
                    href={lesson.resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm p-2 hover:bg-blue-50 rounded"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {lesson.title} (PDF)
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Lesson Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'lessons'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lesson Content
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quiz'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Module Quiz
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Notes
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'discussion'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Discussion
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'lessons' && (
            <div>
              {selectedLesson ? (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{selectedLesson.title}</h2>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {selectedLesson.duration}
                      </span>
                    </div>

                    <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden bg-black">
                      <iframe
                        width="100%"
                        height="450"
                        src={selectedLesson.video}
                        title={selectedLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full"
                      ></iframe>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <a
                        href={selectedLesson.resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Resource
                      </a>
                      <button
                        onClick={() => toggleCompletion(selectedLesson.id)}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          isCompleted
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Unmark as Completed
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Mark as Completed
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Lesson Summary</h3>
                      <p className="text-gray-700">
                        This lesson covers the key concepts of {selectedLesson.title.toLowerCase()}. Make sure to download the resource PDF for additional reference material and examples.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No lesson selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Select a lesson from the sidebar to get started.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div>
              {selectedLesson ? (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.quiz.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Test your knowledge of the module concepts. You need to score at least 70% to pass.
                    </p>

                    {quizResults[modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id] ? (
                      <div className={`p-6 rounded-lg ${
                        quizResults[modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id].passed
                          ? 'bg-green-50 text-green-800'
                          : 'bg-red-50 text-red-800'
                      }`}>
                        <div className="flex items-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mr-2 ${
                            quizResults[modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id].passed
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`} viewBox="0 0 20 20" fill="currentColor">
                            {quizResults[modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id].passed ? (
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            ) : (
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            )}
                          </svg>
                          <h3 className="text-xl font-semibold">
                            {quizResults[modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id].passed
                              ? 'Quiz Passed!'
                              : 'Quiz Not Passed'}
                          </h3>
                        </div>
                        <p className="mb-4">
                          Your score: {quizResults[modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id].score} / {quizResults[modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id].total}
                        </p>
                        {quizResults[modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id].passed ? (
                          <p>Congratulations! You've demonstrated a good understanding of this module's concepts.</p>
                        ) : (
                          <p>Review the module lessons and try again. You need at least {Math.ceil(modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.quiz.questions.length * 0.7)} correct answers to pass.</p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.quiz.questions.map((question) => (
                          <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">{question.question}</h3>
                            <div className="space-y-2">
                              {question.options.map((option, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    id={`question-${question.id}-option-${index}`}
                                    name={`question-${question.id}`}
                                    type="radio"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    onChange={() => handleQuizAnswer(
                                      modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id,
                                      question.id,
                                      index
                                    )}
                                    checked={quizAnswers[`${modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id}-${question.id}`] === index}
                                  />
                                  <label
                                    htmlFor={`question-${question.id}-option-${index}`}
                                    className="ml-3 block text-sm font-medium text-gray-700"
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() => submitQuiz(modules.find(m => m.lessons.some(l => l.id === selectedLesson.id))?.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Submit Quiz
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No module selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Select a module from the sidebar to take its quiz.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Notes</h2>
                
                {selectedLesson ? (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Add Note for: {selectedLesson.title}</h3>
                      <textarea
                        rows={4}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Write your notes here..."
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                      />
                      <button
                        onClick={saveNote}
                        disabled={!currentNote.trim()}
                        className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Save Note
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Saved Notes</h3>
                      {notes[selectedLesson.id]?.length > 0 ? (
                        <div className="space-y-4">
                          {notes[selectedLesson.id].map((note) => (
                            <div key={note.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm text-gray-500">{new Date(note.date).toLocaleString()}</span>
                              </div>
                              <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No notes saved for this lesson yet.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No lesson selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a lesson to view or add notes.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Discussion</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">New Post</h3>
                  <textarea
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="What would you like to discuss?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <button
                    onClick={addDiscussionPost}
                    disabled={!newPost.trim()}
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post to Discussion
                  </button>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Recent Discussions</h3>
                  
                  {discussionPosts.length > 0 ? (
                    discussionPosts.map((post) => (
                      <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium text-gray-900">{post.author}</span>
                              <span className="text-sm text-gray-500 ml-2">{post.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                        </div>
                        <div className="p-4 bg-gray-50 border-t">
                          <div className="flex items-center space-x-4">
                            <button className="text-sm text-gray-500 hover:text-gray-700">Like</button>
                            <button className="text-sm text-gray-500 hover:text-gray-700">Reply</button>
                          </div>
                          
                          {post.replies.length > 0 && (
                            <div className="mt-4 space-y-3">
                              {post.replies.map((reply) => (
                                <div key={reply.id} className="pl-4 border-l-2 border-gray-200">
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-900">{reply.author}</span>
                                    <span className="text-gray-500 ml-2">{reply.date}</span>
                                  </div>
                                  <p className="text-gray-700 text-sm mt-1">{reply.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="mt-4">
                            <textarea
                              rows={2}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Write a reply..."
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  addReply(post.id, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No discussion posts yet. Be the first to start a conversation!</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Course Completion Modal */}
      {isCourseCompleted && allQuizzesCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-3 text-2xl font-medium text-gray-900">Course Completed!</h3>
            <div className="mt-2">
              <p className="text-lg text-gray-600">
                Congratulations on completing the Full Stack Development course!
              </p>
              <p className="text-gray-600 mt-2">
                You've successfully finished all lessons and passed all quizzes.
              </p>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Download Certificate
              </button>
              <button
                type="button"
                onClick={() => navigate('/courses')}
                className="ml-4 inline-flex justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLearning;
const AchievementsSection = () => {
    const [achievements, setAchievements] = useState([
      {
        id: 1,
        title: 'Fast Learner',
        description: 'Completed 3 courses in one month',
        earned: true,
        icon: '🏆',
        date: '2023-04-15'
      },
      // ... more achievements
    ]);
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Your Achievements</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(achievement => (
            <div 
              key={achievement.id}
              className={`border rounded-lg p-4 ${achievement.earned ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{achievement.icon}</span>
                <h3 className="font-medium">{achievement.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
              {achievement.earned ? (
                <p className="text-xs text-indigo-600">Earned on {achievement.date}</p>
              ) : (
                <p className="text-xs text-gray-500">Locked</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
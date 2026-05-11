export default function Tasks({ tasks = [] }) {
  return (
    <div className="page">
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task, i) => (
          <div key={i} className="card">
            {task.name} - <b>{task.status}</b>
          </div>
        ))
      )}
    </div>
  );
}
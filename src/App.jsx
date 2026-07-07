import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './index.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    setLoading(true)
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('inserted_at', { ascending: true })

    if (error) {
      setErrorMsg('할 일을 불러오지 못했어요. Supabase 설정을 확인해주세요.')
      console.error(error)
    } else {
      setTodos(data)
      setErrorMsg('')
    }
    setLoading(false)
  }

  async function addTodo(e) {
    e.preventDefault()
    const task = newTask.trim()
    if (!task) return

    const { data, error } = await supabase
      .from('todos')
      .insert([{ task, is_complete: false }])
      .select()

    if (error) {
      setErrorMsg('추가하지 못했어요. 다시 시도해주세요.')
      console.error(error)
      return
    }
    setTodos((prev) => [...prev, ...data])
    setNewTask('')
  }

  async function toggleTodo(id, current) {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !current })
      .eq('id', id)

    if (error) {
      setErrorMsg('상태를 변경하지 못했어요.')
      console.error(error)
      return
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_complete: !current } : t))
    )
  }

  async function deleteTodo(id) {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (error) {
      setErrorMsg('삭제하지 못했어요.')
      console.error(error)
      return
    }
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const remaining = todos.filter((t) => !t.is_complete).length

  return (
    <div className="page">
      <main className="ledger">
        <header className="ledger-header">
          <span className="eyebrow">DAILY RECORD</span>
          <h1>할 일 목록</h1>
          <div className="rule" />
        </header>

        <form className="add-row" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="새로운 항목을 적어보세요"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" aria-label="추가">
            + 기입
          </button>
        </form>

        {errorMsg && <p className="error">{errorMsg}</p>}

        {loading ? (
          <p className="status-text">불러오는 중...</p>
        ) : todos.length === 0 ? (
          <p className="status-text">아직 기록된 항목이 없어요. 위에서 첫 항목을 추가해보세요.</p>
        ) : (
          <ul className="entries">
            {todos.map((todo, idx) => (
              <li key={todo.id} className={todo.is_complete ? 'entry done' : 'entry'}>
                <span className="entry-index">{String(idx + 1).padStart(2, '0')}</span>
                <button
                  className="checkbox"
                  onClick={() => toggleTodo(todo.id, todo.is_complete)}
                  aria-label={todo.is_complete ? '완료 취소' : '완료 표시'}
                >
                  {todo.is_complete ? '✓' : ''}
                </button>
                <span className="entry-text">{todo.task}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="삭제"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer className="ledger-footer">
          <div className="rule" />
          <span>남은 항목 {remaining}개 · 총 {todos.length}개</span>
        </footer>
      </main>
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from './StudentService';

const App = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ id: '', name: '', age: '', email: '' });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const { data } = await getStudents();
        setStudents(data);
    };

    const handleSubmit = async () => {
        if (form.id) {
            await updateStudent(form.id, form);
        } else {
            await createStudent(form);
        }
        fetchStudents();
        setForm({ id: '', name: '', age: '', email: '' });
    };

    const handleDelete = async (id) => {
        await deleteStudent(id);
        fetchStudents();
    };

    return (
        <div>
            <h1>學生 CRUD 系統</h1>
            <form>
                <input placeholder="姓名" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input placeholder="年齡" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <button type="button" onClick={handleSubmit}>提交</button>
            </form>
            <ul>
                {students.map((s) => (
                    <li key={s.id}>
                        {s.name} ({s.age}) - {s.email}
                        <button onClick={() => setForm(s)}>編輯</button>
                        <button onClick={() => handleDelete(s.id)}>刪除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

// src/pages/Medications.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // ou './medications.css'

export default function Medications() {
  const [calendarId, setCalendarId] = useState(null); // usado apenas quando em modo edição
  const [nameMedic, setNameMedic] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [time3, setTime3] = useState('');
  const [time4, setTime4] = useState('');
  const [time5, setTime5] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState([
    { day: 'Dom', selected: false },
    { day: 'Seg', selected: false },
    { day: 'Ter', selected: false },
    { day: 'Qua', selected: false },
    { day: 'Qui', selected: false },
    { day: 'Sex', selected: false },
    { day: 'Sáb', selected: false },
  ]);
  const [meds, setMeds] = useState([]);        // lista de medicamentos
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const toggleDay = (index) => {
    const updated = [...daysOfWeek];
    updated[index].selected = !updated[index].selected;
    setDaysOfWeek(updated);
  };

  const maskTime = (value) => {
    const text = value.replace(/\D/g, '');
    let formatted = text;
    if (text.length > 2) formatted = text.slice(0, 2) + ':' + text.slice(2, 4);
    return formatted.slice(0, 5);
  };

  const handleTimeChange1 = (v) => setTime1(maskTime(v));
  const handleTimeChange2 = (v) => setTime2(maskTime(v));
  const handleTimeChange3 = (v) => setTime3(maskTime(v));
  const handleTimeChange4 = (v) => setTime4(maskTime(v));
  const handleTimeChange5 = (v) => setTime5(maskTime(v));

  const isValidTime = (text) => {
    if (!text) return true; // campos de hora são opcionais
    if (!/^\d{2}:\d{2}$/.test(text)) return false;
    const [hh, mm] = text.split(':');
    const h = parseInt(hh, 10), m = parseInt(mm, 10);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const toApiTime = (t) => (t && t.length === 5 ? `${t}:00` : t || null);

  const resetAll = useCallback(() => {
    setNameMedic('');
    setTime1(''); setTime2(''); setTime3(''); setTime4(''); setTime5('');
    setDaysOfWeek([
      { day: 'Dom', selected: false },
      { day: 'Seg', selected: false },
      { day: 'Ter', selected: false },
      { day: 'Qua', selected: false },
      { day: 'Qui', selected: false },
      { day: 'Sex', selected: false },
      { day: 'Sáb', selected: false },
    ]);
    setCalendarId(null); // sai do modo edição
  }, []);

  const fetchList = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/calendario/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeds(Array.isArray(res.data) ? res.data : []);
    } catch {
      setMeds([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) { resetAll(); return; }
    fetchList();
  }, [token, resetAll, fetchList]);

  const handleCreate = async () => {
    if (!token) { alert('Faça login para continuar.'); return; }
    if (![time1, time2, time3, time4, time5].every(isValidTime)) {
      alert('Hora inválida. Use o formato hh:mm.');
      return;
    }
    try {
      const payload = {
        nome: nameMedic,
        dom: daysOfWeek[0].selected,
        seg: daysOfWeek[1].selected,
        ter: daysOfWeek[2].selected,
        qua: daysOfWeek[3].selected,
        qui: daysOfWeek[4].selected,
        sex: daysOfWeek[5].selected,
        sab: daysOfWeek[6].selected,
        hora1: toApiTime(time1),
        hora2: toApiTime(time2),
        hora3: toApiTime(time3),
        hora4: toApiTime(time4),
        hora5: toApiTime(time5),
      };
      await axios.post('http://localhost:8000/api/calendario/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Medicamento cadastrado com sucesso!');
      resetAll();
      fetchList();
    } catch {
      alert('Falha ao cadastrar. Verifique os dados ou o login.');
    }
  };

  const startEdit = (item) => {
    setCalendarId(item.id);
    setNameMedic(item.nome || '');
    setTime1(item.hora1 ? item.hora1.slice(0,5) : '');
    setTime2(item.hora2 ? item.hora2.slice(0,5) : '');
    setTime3(item.hora3 ? item.hora3.slice(0,5) : '');
    setTime4(item.hora4 ? item.hora4.slice(0,5) : '');
    setTime5(item.hora5 ? item.hora5.slice(0,5) : '');
    setDaysOfWeek([
      { day: 'Dom', selected: !!item.dom },
      { day: 'Seg', selected: !!item.seg },
      { day: 'Ter', selected: !!item.ter },
      { day: 'Qua', selected: !!item.qua },
      { day: 'Qui', selected: !!item.qui },
      { day: 'Sex', selected: !!item.sex },
      { day: 'Sáb', selected: !!item.sab },
    ]);
  };

  const handleSaveEdit = async () => {
    if (!token || !calendarId) return;
    if (![time1, time2, time3, time4, time5].every(isValidTime)) {
      alert('Hora inválida. Use o formato hh:mm.');
      return;
    }
    try {
      const payload = {
        nome: nameMedic,
        dom: daysOfWeek[0].selected,
        seg: daysOfWeek[1].selected,
        ter: daysOfWeek[2].selected,
        qua: daysOfWeek[3].selected,
        qui: daysOfWeek[4].selected,
        sex: daysOfWeek[5].selected,
        sab: daysOfWeek[6].selected,
        hora1: toApiTime(time1),
        hora2: toApiTime(time2),
        hora3: toApiTime(time3),
        hora4: toApiTime(time4),
        hora5: toApiTime(time5),
      };
      await axios.put(`http://localhost:8000/api/calendario/${calendarId}/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Medicamento atualizado!');
      resetAll();
      fetchList();
    } catch {
      alert('Falha ao atualizar. Verifique os dados ou o login.');
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;
    if (!confirm('Excluir este medicamento?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/calendario/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchList();
    } catch {
      alert('Falha ao excluir. Tente novamente.');
    }
  };

  const handleBack = () => navigate('/home');
  const handleLogout = () => { localStorage.removeItem('token'); resetAll(); navigate('/initial'); };

  const dayShorts = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

  return (
    <div className="meds_wrapper">
      <div className="meds_container">
        <header className="header_bar">
          <button className="icon_button_med" onClick={handleBack} title="Voltar" aria-label="Voltar">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h1 className="title_meds">Medicamentos</h1>

          <button className="icon_button_med" onClick={handleLogout} title="Logout" aria-label="Logout">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M16 17l5-5-5-5M21 12H9M13 5v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"
                    stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        {/* Formulário */}
        <div className="meds_form">
          <input
            type="text"
            className="input_meds"
            placeholder="Nome do medicamento"
            value={nameMedic}
            onChange={(e) => setNameMedic(e.target.value)}
          />

          <h3 className="meds_label">Dias da semana</h3>
          <div className="days_grid">
            {daysOfWeek.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleDay(idx)}
                className={`day_box ${item.selected ? 'day_box_selected' : ''}`}
                aria-pressed={item.selected}
              >
                {item.day}
              </button>
            ))}
          </div>

          <h3 className="meds_label">Horários</h3>
          <div className="grid grid-2">
            <input type="text" className="input_meds" placeholder="1º Remédio (ex: 06:30)" value={time1} onChange={(e) => handleTimeChange1(e.target.value)} maxLength={5} inputMode="numeric" />
            <input type="text" className="input_meds" placeholder="2º Remédio (ex: 10:30)" value={time2} onChange={(e) => handleTimeChange2(e.target.value)} maxLength={5} inputMode="numeric" />
          </div>
          <div className="grid grid-3">
            <input type="text" className="input_meds" placeholder="3º Remédio (ex: 14:30)" value={time3} onChange={(e) => handleTimeChange3(e.target.value)} maxLength={5} inputMode="numeric" />
            <input type="text" className="input_meds" placeholder="4º Remédio (ex: 18:30)" value={time4} onChange={(e) => handleTimeChange4(e.target.value)} maxLength={5} inputMode="numeric" />
            <input type="text" className="input_meds" placeholder="5º Remédio (ex: 22:30)" value={time5} onChange={(e) => handleTimeChange5(e.target.value)} maxLength={5} inputMode="numeric" />
          </div>

          {/* Botões principais: Cadastrar vs Salvar alterações */}
          {calendarId ? (
            <div className="actions_row">
              <button className="button_meds" onClick={handleSaveEdit}>Salvar alterações</button>
              <button className="button_secondary" onClick={resetAll} type="button">Cancelar</button>
            </div>
          ) : (
            <button className="button_meds" onClick={handleCreate}>Cadastrar</button>
          )}

          <p className="meds_footer">Gerencie seus horários com facilidade</p>
        </div>

        {/* Lista de medicamentos */}
        <section className="meds_list">
          <h2 className="list_title">Meus medicamentos</h2>
          {loading ? (
            <div className="list_empty">Carregando...</div>
          ) : meds.length === 0 ? (
            <div className="list_empty">Nenhum medicamento cadastrado.</div>
          ) : (
            <ul className="cards">
              {meds.map((m) => (
                <li key={m.id} className="card">
                  <div className="card_head">
                    <span className="med_name">{m.nome || 'Sem nome'}</span>
                    <div className="card_actions">
                      <button className="icon_action" title="Editar" onClick={() => startEdit(m)} aria-label="Editar">
                        {/* lápis */}
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                        </svg>
                      </button>
                      <button className="icon_action danger" title="Excluir" onClick={() => handleDelete(m.id)} aria-label="Excluir">
                        {/* lixeira */}
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path d="M6 7h12m-9-2h6m-7 4v9m4-9v9m4-9v9M7 7l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="card_body">
                    <div className="chips_row">
                      {dayShorts.map((d, i) => (
                        <span key={d} className={`chip ${m[['dom','seg','ter','qua','qui','sex','sab'][i]] ? 'on' : ''}`}>
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="chips_row">
                      {[m.hora1, m.hora2, m.hora3, m.hora4, m.hora5]
                        .filter(Boolean)
                        .map((h, idx) => (
                          <span key={idx} className="chip time">{h.slice(0,5)}</span>
                        ))
                      }
                      {[m.hora1, m.hora2, m.hora3, m.hora4, m.hora5].every(h => !h) && (
                        <span className="chip off">Sem horários</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

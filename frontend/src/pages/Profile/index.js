import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower,FiTrash } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

export default function Profile(){
  const [incidents, setIncidents] = useState([])

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile',{
      headers:{
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`,{
        headers:{
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Failed delete');
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Welcome, {ongName}</span>

        <Link className="button" to="/incidents/new">Register new case</Link>
        <button onClick={handleLogout}type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Registered cases</h1>
      
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
          <strong>CASE:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIPTION:</strong>
          <p>{incident.description}n</p>

          <strong>Value</strong>
          <p>{Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(incident.value)}</p>

          <button onClick={() => handleDeleteIncident(incident.id)}type="button">
            <FiTrash size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}
      </ul>
    </div>
  )
}
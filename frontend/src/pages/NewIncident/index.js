import React,{useState}from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './styles.css';
import '../../services/api';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){

  const ongId = localStorage.getItem('ongId');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title, 
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    } catch (err){
      alert('Error')
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Register new case</h1>
          <p>Describe in details the case of finding a hero</p>

          <Link className="back-link"to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Back to Home
          </Link>

        </section>

        <form>
          <input 
            placeholder="Title of the case"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input 
            placeholder="Value($)"
            value={value}
            onChange={e => setValue(e.target.value)}
          />


          <button onClick={handleNewIncident} className="button" type>Register</button>
        </form>
      </div>
    </div>
  );
}

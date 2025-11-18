import React, { useState, useEffect } from 'react';
import './Modal.css';

// Função para formatar telefone
const formatPhone = (value) => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (!match) return value;
  
  let formatted = '';
  if (match[1]) formatted = `(${match[1]}`;
  if (match[2]) formatted += `) ${match[2]}`;
  if (match[3]) formatted += `-${match[3]}`;
  
  return formatted || value;
};

// Função para obter o rótulo correto da opção
const getOptionLabel = (value, fieldName) => {
  // Mapeamento de valores para rótulos legíveis
  const labelMap = {
    'on': 'Ativo',
    'off': 'Inativo',
    'admin': 'Admin',
    'user': 'Usuário'
  };
  return labelMap[value] || value;
};

export default function Modal({ isOpen, onClose, onSubmit, title, fields, initialData, onStoreChange }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Aplicar máscara de telefone se for campo de telefone
    let finalValue = value;
    if (name === 'phone_number') {
      finalValue = formatPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Notificar quando a loja for selecionada
    if (name === 'store_id' && onStoreChange) {
      onStoreChange(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {fields.map(field => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required !== false}
                >
                  <option value="">-- Selecione --</option>
                  {field.options?.map(option => {
                    // Suportar tanto strings simples como objetos com value e label
                    const isObject = typeof option === 'object';
                    const optionValue = isObject ? option.value : option;
                    const optionLabel = isObject ? option.label : getOptionLabel(option);
                    
                    return (
                      <option key={optionValue} value={optionValue}>
                        {optionLabel}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required !== false}
                />
              )}
            </div>
          ))}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

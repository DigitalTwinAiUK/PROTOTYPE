import React, { useState, useEffect } from 'react';
import './Settings.css';

function Settings({ onSave, initialSettings }) {
  const [personas, setPersonas] = useState(initialSettings.personas);
  const [machines, setMachines] = useState(initialSettings.machines);

  useEffect(() => {
    setPersonas(initialSettings.personas);
    setMachines(initialSettings.machines);
  }, [initialSettings]);
  const [activeTab, setActiveTab] = useState('personas');
  const [selectedPersona, setSelectedPersona] = useState(Object.keys(initialSettings.personas)[0] || 'Teacher');
  const [selectedMachine, setSelectedMachine] = useState('none');
  const [newMachineName, setNewMachineName] = useState('');
  const [newDocumentName, setNewDocumentName] = useState('');
  const [newDocumentContent, setNewDocumentContent] = useState('');
  const fileInputRef = React.useRef(null);
  const [newPersonaName, setNewPersonaName] = useState('');
  const [newPersonaPrompt, setNewPersonaPrompt] = useState('');

  const handlePersonaChange = (e) => {
    setPersonas({
      ...personas,
      [selectedPersona]: {
        ...personas[selectedPersona],
        prompt: e.target.value,
      },
    });
  };

  const handleAddPersona = (name, prompt) => {
    if (name.trim() && !personas[name.trim()]) {
      setPersonas({
        ...personas,
        [name.trim()]: {
          name: name.trim(),
          prompt: prompt || 'You are a helpful AI assistant.',
        },
      });
      setNewPersonaName('');
      setNewPersonaPrompt('');
    }
  };

  const handleRemovePersona = (name) => {
    if (Object.keys(personas).length > 1 && name !== 'Teacher' && name !== 'Engineer' && name !== 'Student') {
      const { [name]: removed, ...rest } = personas;
      setPersonas(rest);
      setSelectedPersona(Object.keys(rest)[0]);
    } else {
      alert('Cannot remove default or last remaining persona.');
    }
  };

  const handleAddMachine = () => {
    if (newMachineName.trim()) {
      const newMachine = {
        id: newMachineName.trim().toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, ''),
        name: newMachineName.trim(),
        documents: [],
      };
      if (machines.some(m => m.id === newMachine.id)) {
        alert(`Machine with ID "${newMachine.id}" already exists. Please choose a different name.`);
        return;
      }
      setMachines([...machines, newMachine]);
      setNewMachineName('');
    }
  };

  const handleRemoveMachine = (id) => {
    if (id === 'general' || id === 'none') {
      alert('The "General CNC Knowledge" and "None Selected" machines cannot be removed.');
      return;
    }
    if (window.confirm(`Are you sure you want to remove the machine "${machines.find(m => m.id === id)?.name}"?`)) {
      const updatedMachines = machines.filter(m => m.id !== id);
      setMachines(updatedMachines);
      setSelectedMachine('none'); // Fallback to none
    }
  };

  const handleRemoveDocument = (docIndex) => {
    setMachines(machines.map(machine => {
      if (machine.id === selectedMachine) {
        return {
          ...machine,
          documents: machine.documents.filter((_, index) => index !== docIndex),
        };
      }
      return machine;
    }));
  };

  const handleAddDocument = () => {
    if (newDocumentName.trim() && newDocumentContent.trim()) {
      setMachines(machines.map(machine => {
        if (machine.id === selectedMachine) {
          return {
            ...machine,
            documents: [...machine.documents, { name: newDocumentName.trim(), content: newDocumentContent.trim() }],
          };
        }
        return machine;
      }));
      setNewDocumentName('');
      setNewDocumentContent('');
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewDocumentContent(e.target.result);
        setNewDocumentName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    onSave({ personas, machines });
  };

  const currentMachine = machines.find(m => m.id === selectedMachine);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>AI Configuration Settings</h2>
        <button onClick={handleSave} className="save-button">Save Settings</button>
      </div>
      
      <div className="settings-tabs">
        <button 
          className={activeTab === 'personas' ? 'active' : ''} 
          onClick={() => setActiveTab('personas')}
        >
          AI Personas
        </button>
        <button 
          className={activeTab === 'machines' ? 'active' : ''} 
          onClick={() => setActiveTab('machines')}
        >
          Machine Contexts
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'personas' && (
          <div className="persona-settings">
	            <h3>Define AI Persona</h3>
	            <div className="persona-list-section">
	              <select 
	                value={selectedPersona} 
	                onChange={(e) => setSelectedPersona(e.target.value)}
	                className="persona-select"
	              >
	                {Object.keys(personas).map(key => (
	                  <option key={key} value={key}>{key}</option>
	                ))}
	              </select>
	              <button 
	                onClick={() => handleRemovePersona(selectedPersona)} 
	                className="remove-button"
	                disabled={['Teacher', 'Engineer', 'Student'].includes(selectedPersona)}
	              >
	                Remove Persona
	              </button>
	            </div>
	            
	            <label htmlFor="persona-prompt">System Prompt for {selectedPersona}:</label>
	            <textarea
	              id="persona-prompt"
	              value={personas[selectedPersona]?.prompt || ''}
	              onChange={handlePersonaChange}
	              rows="10"
	              placeholder="Define the AI's role, tone, and expertise..."
	            />
	            <p className="help-text">This prompt is prepended to the AI's system instructions.</p>

              <div className="add-persona-form">
                <h4>Add New Persona</h4>
                <input 
                  type="text" 
                  placeholder="New Persona Name (e.g., Expert)" 
                  value={newPersonaName}
                  onChange={(e) => setNewPersonaName(e.target.value)}
                />
                <textarea
                  placeholder="Default System Prompt for new persona..."
                  value={newPersonaPrompt}
                  onChange={(e) => setNewPersonaPrompt(e.target.value)}
                  rows="3"
                />
                <button onClick={() => handleAddPersona(newPersonaName, newPersonaPrompt)} className="add-button">Add Persona</button>
              </div>
	          </div>
        )}

        {activeTab === 'machines' && (
          <div className="machine-settings">
            <h3>Manage Machine Contexts</h3>
            
            <div className="machine-list-section">
              <select 
                value={selectedMachine} 
                onChange={(e) => setSelectedMachine(e.target.value)}
                className="machine-select"
              >
                {machines.map(machine => (
                  <option key={machine.id} value={machine.id}>{machine.name}</option>
                ))}
              </select>
              
              <div className="add-machine-input">
                <input 
                  type="text" 
                  placeholder="New Machine Name" 
                  value={newMachineName}
                  onChange={(e) => setNewMachineName(e.target.value)}
                />
                <button onClick={handleAddMachine} className="add-button">Add Machine</button>
              </div>
              <button 
                onClick={() => handleRemoveMachine(selectedMachine)} 
                className="remove-button"
                disabled={selectedMachine === 'general'}
              >
                Remove Selected Machine
              </button>
            </div>

            <div className="document-management">
              <h4>Reference Documents for {currentMachine?.name}</h4>
              
              <ul className="document-list">
                {currentMachine?.documents.length === 0 ? (
                  <li className="no-docs">No documents uploaded.</li>
                ) : (
                  currentMachine?.documents.map((doc, index) => (
                    <li key={index}>
                      {doc.name} ({doc.content.length} characters)
                      <button className="remove-doc-button" onClick={() => handleRemoveDocument(index)}>X</button>
                    </li>
                  ))
                )}
              </ul>

              <div className="add-document-form">
                <input 
                  type="text" 
                  placeholder="Document Title (e.g., SIMPLY 4 User Manual)" 
                  value={newDocumentName}
                  onChange={(e) => setNewDocumentName(e.target.value)}
                />
                <input
                  type="file"
                  accept=".txt,.md,.log"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="file-input"
                />
                <textarea
                  placeholder="File content will appear here, or paste text directly..."
                  value={newDocumentContent}
                  onChange={(e) => setNewDocumentContent(e.target.value)}
                  rows="5"
                />
                <button onClick={handleAddDocument} className="add-button" disabled={!newDocumentName.trim() || !newDocumentContent.trim()}>Add Document</button>
                <p className="help-text">The content of these documents will be sent to the AI as context when this machine is selected.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;

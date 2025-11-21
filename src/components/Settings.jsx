import React, { useState, useEffect, useCallback } from 'react';
import './Settings.css';

// --- Sub-Components for Tabs ---

// 1. Core Rules Tab
const CoreRulesTab = ({ coreRules, setCoreRules, handleSave }) => (
  <div className="core-rules-settings">
    <h3>Edit Core System Rules</h3>
    <p className="help-text">These rules define the AI's fundamental identity, security, and base behavior. They are applied before any persona instructions.</p>
    <textarea
      value={coreRules.rules}
      onChange={(e) => setCoreRules({ rules: e.target.value })}
      rows="15"
      placeholder="Enter core system rules here..."
    />
    <button onClick={handleSave} className="save-button">Save Core Rules</button>
  </div>
);

// 2. Personas Tab
const PersonasTab = ({ personas, setPersonas, selectedPersona, setSelectedPersona, newPersonaName, setNewPersonaName, newPersonaPrompt, setNewPersonaPrompt, handleAddPersona, handleRemovePersona, handleSave }) => (
  <div className="personas-settings">
    <h3>AI Personas Management</h3>
    <p className="help-text">Define different AI personalities and their instructions. The selected persona's prompt is injected into the system prompt.</p>

    <div className="persona-list">
      <h4>Existing Personas</h4>
      <select
        value={selectedPersona}
        onChange={(e) => setSelectedPersona(e.target.value)}
        size={Math.min(Object.keys(personas).length, 8)}
      >
        {Object.keys(personas).map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button 
        onClick={() => handleRemovePersona(selectedPersona)} 
        disabled={selectedPersona === 'Teacher' || selectedPersona === 'Engineer' || selectedPersona === 'Student'}
        className="delete-button"
      >
        Remove Selected Persona
      </button>
    </div>

    {selectedPersona && (
      <div className="persona-editor">
        <h4>Prompt for: {selectedPersona}</h4>
        <textarea
          value={personas[selectedPersona]?.prompt || ''}
          onChange={(e) => setPersonas(prev => ({
            ...prev,
            [selectedPersona]: {
              ...prev[selectedPersona],
              prompt: e.target.value,
            },
          }))}
          rows="10"
          placeholder="Enter detailed instructions for this persona..."
        />
      </div>
    )}

    <div className="add-persona">
      <h4>Add New Persona</h4>
      <input
        type="text"
        placeholder="New Persona Name (e.g., Expert Technician)"
        value={newPersonaName}
        onChange={(e) => setNewPersonaName(e.target.value)}
      />
      <textarea
        rows="5"
        placeholder="Initial Prompt (optional)"
        value={newPersonaPrompt}
        onChange={(e) => setNewPersonaPrompt(e.target.value)}
      />
      <button onClick={() => handleAddPersona(newPersonaName, newPersonaPrompt)}>Add Persona</button>
    </div>
    <button onClick={handleSave} className="save-button">Save Personas</button>
  </div>
);

// 3. Machines Tab
const MachinesTab = ({ machines, setMachines, selectedMachine, setSelectedMachine, newMachineName, setNewMachineName, newDocumentName, setNewDocumentName, newDocumentContent, setNewDocumentContent, fileInputRef, isDragging, handleAddMachine, handleRemoveMachine, handleRemoveDocument, handleDragOver, handleDragLeave, handleDrop, handleFileInputChange, handleAddDocument, handleSave }) => {
  const currentMachine = machines.find(m => m.id === selectedMachine);

  return (
    <div className="machines-settings">
      <h3>Machine Context Management</h3>
      <p className="help-text">Define machines and upload context documents (e.g., manuals, specs) for the AI to reference.</p>

      <div className="machine-list">
        <h4>Existing Machines</h4>
        <select
          value={selectedMachine}
          onChange={(e) => setSelectedMachine(e.target.value)}
          size={Math.min(machines.length, 8)}
        >
          {machines.map(machine => (
            <option key={machine.id} value={machine.id}>
              {machine.name}
            </option>
          ))}
        </select>
        <button 
          onClick={() => handleRemoveMachine(selectedMachine)} 
          disabled={selectedMachine === 'general' || selectedMachine === 'none'}
          className="delete-button"
        >
          Remove Selected Machine
        </button>
      </div>

      <div className="add-machine">
        <h4>Add New Machine</h4>
        <input
          type="text"
          placeholder="New Machine Name (e.g., SIMPLY 5)"
          value={newMachineName}
          onChange={(e) => setNewMachineName(e.target.value)}
        />
        <button onClick={handleAddMachine}>Add Machine</button>
      </div>

      {currentMachine && selectedMachine !== 'none' && (
        <div className="machine-documents">
          <h4>Context Documents for: {currentMachine.name}</h4>
          <ul className="document-list">
            {currentMachine.documents.map((doc, index) => (
              <li key={index}>
                {doc.name} 
                <button onClick={() => handleRemoveDocument(index)} className="delete-button-small">Remove</button>
              </li>
            ))}
          </ul>

          <div 
            className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <p>{isDragging ? 'Drop file here (.txt, .md, .log)' : 'Drag & Drop or Click to Upload Context Document (.txt, .md, .log)'}</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
              accept=".txt,.md,.log"
            />
          </div>

          {newDocumentContent && (
            <div className="document-preview">
              <input
                type="text"
                placeholder="Document Name"
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
              />
              <textarea
                rows="5"
                value={newDocumentContent}
                readOnly
                placeholder="Document Content Preview"
              />
              <button onClick={handleAddDocument}>Add Document to {currentMachine.name}</button>
            </div>
          )}
        </div>
      )}
      <button onClick={handleSave} className="save-button">Save Machines</button>
    </div>
  );
};

// 4. Colors Tab
const ColorsTab = ({ colors, setColors, themes, setThemes, selectedTheme, setSelectedTheme, newThemeName, setNewThemeName, handleRestoreColors, handleSaveTheme, handleUpdateTheme, handleDeleteTheme, handleSave }) => {
  
  const handleColorChange = (key, value) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  // When a theme is selected, apply its colors to the color picker state
  useEffect(() => {
    if (themes[selectedTheme]) {
      setColors(themes[selectedTheme]);
    }
  }, [selectedTheme, themes, setColors]);

  return (
    <div className="color-settings">
      <h3>Color Theme Management</h3>
      <p className="help-text">Customize the interface colors and save them as named themes.</p>

      <div className="theme-selector-section">
        <h4>Select Theme</h4>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          {Object.keys(themes).map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button onClick={() => handleRestoreColors('Default')} className="secondary-button">Restore Default Colors</button>
      </div>

      <div className="color-picker-grid">
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className="color-input-group">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)} Color</label>
            <input
              type="color"
              id={key}
              value={value}
              onChange={(e) => handleColorChange(key, e.target.value)}
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleColorChange(key, e.target.value)}
              placeholder="#RRGGBB"
            />
          </div>
        ))}
      </div>

      <div className="theme-actions">
        <h4>Theme Actions</h4>
        <div className="theme-save-group">
          <input
            type="text"
            placeholder="New Theme Name"
            value={newThemeName}
            onChange={(e) => setNewThemeName(e.target.value)}
          />
          <button onClick={handleSaveTheme} disabled={!newThemeName.trim()}>Save Current as New Theme</button>
        </div>
        <div className="theme-update-group">
          <button onClick={handleUpdateTheme} disabled={selectedTheme === 'Default'}>Update "{selectedTheme}"</button>
          <button onClick={handleDeleteTheme} disabled={selectedTheme === 'Default'} className="delete-button">Delete "{selectedTheme}"</button>
        </div>
      </div>
      <button onClick={handleSave} className="save-button">Save Color Settings</button>
    </div>
  );
};

// --- Main Settings Component ---
function Settings({ onSave, onUpdateSettings, initialSettings }) {
  const [personas, setPersonas] = useState(initialSettings.personas);
  const [machines, setMachines] = useState(initialSettings.machines);
  const [coreRules, setCoreRules] = useState(initialSettings.coreRules);
  const [colors, setColors] = useState(initialSettings.colors);
  const [themes, setThemes] = useState(initialSettings.themes);
  const [newThemeName, setNewThemeName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('Default');

  useEffect(() => {
    setPersonas(initialSettings.personas);
    setMachines(initialSettings.machines);
    setCoreRules(initialSettings.coreRules);
    setColors(initialSettings.colors);
    setThemes(initialSettings.themes);
  }, [initialSettings]);

  const [activeTab, setActiveTab] = useState('core');
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedPersona, setSelectedPersona] = useState(Object.keys(initialSettings.personas)[0] || 'Teacher');
  const [selectedMachine, setSelectedMachine] = useState('none');
  const [newMachineName, setNewMachineName] = useState('');
  const [newDocumentName, setNewDocumentName] = useState('');
  const [newDocumentContent, setNewDocumentContent] = useState('');
  const fileInputRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [newPersonaName, setNewPersonaName] = useState('');
  const [newPersonaPrompt, setNewPersonaPrompt] = useState('');

  // --- Utility Functions ---
  const showSaveMessage = useCallback((message) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 3000);
  }, []);

  // --- CRUD Handlers for Personas ---
  const handleAddPersona = (name, prompt) => {
    if (name.trim() && !personas[name.trim()]) {
      setPersonas(prev => ({
        ...prev,
        [name.trim()]: {
          name: name.trim(),
          prompt: prompt || 'You are a helpful AI assistant.',
        },
      }));
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

  // --- CRUD Handlers for Machines ---
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
      setMachines(prev => [...prev, newMachine]);
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
    setMachines(prev => prev.map(machine => {
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
      setMachines(prev => prev.map(machine => {
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

  // --- File Upload Handlers ---
  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewDocumentContent(e.target.result);
        setNewDocumentName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleFileInputChange = (event) => {
    handleFileChange(event.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  // --- Theme Management Handlers ---
  const handleRestoreColors = (themeName = 'Default') => {
    const defaultColors = themes[themeName] || themes['Default'];
    setColors(defaultColors);
  };

  const handleSaveTheme = () => {
    if (!newThemeName.trim()) {
      alert('Please enter a name for the new theme.');
      return;
    }
    if (themes[newThemeName.trim()]) {
      alert('A theme with this name already exists.');
      return;
    }
    const newThemes = {
      ...themes,
      [newThemeName.trim()]: colors,
    };
    setThemes(newThemes);
    setNewThemeName('');
    setSelectedTheme(newThemeName.trim());
    showSaveMessage(`Theme "${newThemeName.trim()}" saved!`);
  };

  const handleUpdateTheme = () => {
    if (selectedTheme === 'Default') {
      alert('Cannot edit the Default theme.');
      return;
    }
    const newThemes = {
      ...themes,
      [selectedTheme]: colors,
    };
    setThemes(newThemes);
    showSaveMessage(`Theme "${selectedTheme}" updated!`);
  };

  const handleDeleteTheme = () => {
    if (selectedTheme === 'Default') {
      alert('Cannot delete the Default theme.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the theme "${selectedTheme}"?`)) {
      const { [selectedTheme]: removed, ...rest } = themes;
      setThemes(rest);
      setSelectedTheme('Default');
      setColors(rest['Default']);
      showSaveMessage(`Theme "${selectedTheme}" deleted.`);
    }
  };

  // --- Per-Tab Save Handlers ---
  // Note: We pass the entire state object back to LiveAI to ensure all parts are persisted, 
  // but LiveAI only uses the parts it needs (coreRules, colors) for its own state.
  const handleSaveCore = () => {
    const newSettings = { ...initialSettings, coreRules, colors, themes, personas, machines };
    onUpdateSettings({ newSettings, newCoreRules: coreRules, newColors: colors });
    showSaveMessage('Core Rules saved successfully!');
  };

  const handleSavePersonas = () => {
    const newSettings = { ...initialSettings, personas, coreRules, colors, themes, machines };
    onUpdateSettings({ newSettings, newCoreRules: coreRules, newColors: colors });
    showSaveMessage('Personas saved successfully!');
  };

  const handleSaveMachines = () => {
    const newSettings = { ...initialSettings, machines, coreRules, colors, themes, personas };
    onUpdateSettings({ newSettings, newCoreRules: coreRules, newColors: colors });
    showSaveMessage('Machines saved successfully!');
  };

  const handleSaveColors = () => {
    const newSettings = { ...initialSettings, colors, themes, coreRules, personas, machines };
    onUpdateSettings({ newSettings, newCoreRules: colors, newColors: colors }); // newCoreRules is irrelevant here, but newColors is important
    showSaveMessage('Interface Colors and Themes saved successfully!');
  };

  const handleClose = () => {
    // This is the old global save, which we will keep for closing the modal, 
    // but it should now save the current state of all local settings.
    onSave({ personas, machines, coreRules, colors, themes });
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>AI Configuration Settings</h2>
        <button onClick={handleClose} className="save-button">Close Settings</button>
      </div>
      {saveMessage && <div className="save-message">{saveMessage}</div>}
  
      <div className="settings-tabs">
        <button 
          className={activeTab === 'core' ? 'active' : ''} 
          onClick={() => setActiveTab('core')}
        >
          Core Rules
        </button>
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
        <button 
          className={activeTab === 'colors' ? 'active' : ''} 
          onClick={() => setActiveTab('colors')}
        >
          Color Themes
        </button>
      </div>
  
      <div className="settings-content">
        {activeTab === 'core' && (
          <CoreRulesTab 
            coreRules={coreRules} 
            setCoreRules={setCoreRules} 
            handleSave={handleSaveCore} 
          />
        )}
        {activeTab === 'personas' && (
          <PersonasTab
            personas={personas}
            setPersonas={setPersonas}
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
            newPersonaName={newPersonaName}
            setNewPersonaName={setNewPersonaName}
            newPersonaPrompt={newPersonaPrompt}
            setNewPersonaPrompt={setNewPersonaPrompt}
            handleAddPersona={handleAddPersona}
            handleRemovePersona={handleRemovePersona}
            handleSave={handleSavePersonas}
          />
        )}
        {activeTab === 'machines' && (
          <MachinesTab
            machines={machines}
            setMachines={setMachines}
            selectedMachine={selectedMachine}
            setSelectedMachine={setSelectedMachine}
            newMachineName={newMachineName}
            setNewMachineName={setNewMachineName}
            newDocumentName={newDocumentName}
            setNewDocumentName={setNewDocumentName}
            newDocumentContent={newDocumentContent}
            setNewDocumentContent={setNewDocumentContent}
            fileInputRef={fileInputRef}
            isDragging={isDragging}
            handleAddMachine={handleAddMachine}
            handleRemoveMachine={handleRemoveMachine}
            handleRemoveDocument={handleRemoveDocument}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileInputChange={handleFileInputChange}
            handleAddDocument={handleAddDocument}
            handleSave={handleSaveMachines}
          />
        )}
        {activeTab === 'colors' && (
          <ColorsTab
            colors={colors}
            setColors={setColors}
            themes={themes}
            setThemes={setThemes}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            newThemeName={newThemeName}
            setNewThemeName={setNewThemeName}
            handleRestoreColors={handleRestoreColors}
            handleSaveTheme={handleSaveTheme}
            handleUpdateTheme={handleUpdateTheme}
            handleDeleteTheme={handleDeleteTheme}
            handleSave={handleSaveColors}
          />
        )}
      </div>
    </div>
  );
}

export default Settings

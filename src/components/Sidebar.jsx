import React, { useState } from 'react';
import { 
  VscTerminalCmd,
  VscMail,
  VscPulse,
  VscRuby,
  VscAdd,
  VscSettingsGear,
  VscTrash,
  VscClose,
  VscCheck 
} from 'react-icons/vsc';

function Sidebar() {
  const [isAddingCommand, setIsAddingCommand] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [customCommands, setCustomCommands] = useState([]);
  const [newCommand, setNewCommand] = useState({ name: '', command: '' });
  const [colors, setColors] = useState({
    accent: '#ff2d70',
    border: '#2a2a2a'
  });

  const defaultCommands = [
    { name: 'Mail', icon: <VscMail />, command: 'thunderbird' },
    { name: 'Terminal', icon: <VscTerminalCmd />, command: 'mate-terminal' },
    { name: 'System Monitor', icon: <VscPulse />, command: 'gnome-system-monitor' },
  ];

  const handleAddCommand = () => {
    if (newCommand.name && newCommand.command) {
      setCustomCommands([...customCommands, {
        ...newCommand,
        icon: <VscTerminalCmd />,
      }]);
      setNewCommand({ name: '', command: '' });
      setIsAddingCommand(false);
    }
  };

  const handleRemoveCommand = (index) => {
    const updatedCommands = [...customCommands];
    updatedCommands.splice(index, 1);
    setCustomCommands(updatedCommands);
  };

  const handleColorChange = (type, value) => {
    setColors(prev => ({
      ...prev,
      [type]: value
    }));
    // Update CSS variables
    document.documentElement.style.setProperty(`--accent-color`, value);
    document.documentElement.style.setProperty(`--border-color`, colors.border);
  };

  return (
    <div className="w-64 bg-[#141414] flex flex-col border-r" style={{ borderColor: colors.border }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: colors.border }}>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <VscRuby style={{ color: colors.accent }} />
          Ruby OS
        </h1>
      </div>

      {/* Preset Scripts */}
      <div className="flex-1 py-2">
        <div className="space-y-1">
          {[...defaultCommands, ...customCommands].map((item, index) => (
            <div key={item.name} className="group relative">
              <button
                onClick={() => !isRemoveMode && window.terminal?.openWithCommand(item.command)}
                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[#202020] transition-colors text-gray-300 hover:text-white ${
                  isRemoveMode ? 'cursor-pointer hover:bg-red-900/20' : ''
                }`}
              >
                <span style={{ color: colors.accent }}>{item.icon}</span>
                <span>{item.name}</span>
                {isRemoveMode && index >= defaultCommands.length && (
                  <button
                    onClick={() => handleRemoveCommand(index - defaultCommands.length)}
                    className="ml-auto p-1 bg-red-500/20 hover:bg-red-500/40 rounded"
                  >
                    <VscClose className="text-red-500" />
                  </button>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div className="p-4 border-t border-b" style={{ borderColor: colors.border }}>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Appearance Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Accent Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1 px-2 py-1 bg-[#1a1a1a] rounded text-sm text-gray-300 focus:outline-none focus:ring-1"
                  style={{ borderColor: colors.border }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Border Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={colors.border}
                  onChange={(e) => handleColorChange('border', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.border}
                  onChange={(e) => handleColorChange('border', e.target.value)}
                  className="flex-1 px-2 py-1 bg-[#1a1a1a] rounded text-sm text-gray-300 focus:outline-none focus:ring-1"
                  style={{ borderColor: colors.border }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Command Form */}
      {isAddingCommand && (
        <div className="p-4 border-t" style={{ borderColor: colors.border }}>
          <input
            type="text"
            placeholder="Button Name"
            value={newCommand.name}
            onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
            className="w-full px-2 py-1 bg-[#1a1a1a] rounded text-sm text-gray-300 focus:outline-none focus:ring-1"
            style={{ borderColor: colors.border }}
          />
          <input
            type="text"
            placeholder="Command (e.g., htop)"
            value={newCommand.command}
            onChange={(e) => setNewCommand({ ...newCommand, command: e.target.value })}
            className="w-full px-2 py-1 bg-[#1a1a1a] rounded text-sm text-gray-300 focus:outline-none focus:ring-1 mt-2"
            style={{ borderColor: colors.border }}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddCommand}
              className="flex-1 px-2 py-1 text-white rounded text-sm hover:opacity-90"
              style={{ backgroundColor: colors.accent }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingCommand(false);
                setNewCommand({ name: '', command: '' });
              }}
              className="flex-1 px-2 py-1 bg-[#2a2a2a] text-gray-300 rounded text-sm hover:bg-[#3a3a3a]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="p-2 border-t" style={{ borderColor: colors.border }}>
        <div className="flex items-center gap-2 px-2 py-1.5 bg-[#1a1a1a] rounded">
          <VscRuby style={{ color: colors.accent }} />
          <input
            type="text"
            placeholder="Ask Ruby..."
            className="bg-transparent w-full text-sm focus:outline-none text-gray-300"
          />
        </div>
        <div className="flex justify-between px-2 mt-2">
          <button 
            className={`p-1 hover:bg-[#202020] rounded ${isAddingCommand ? 'bg-[#202020]' : ''}`}
            onClick={() => {
              setIsAddingCommand(!isAddingCommand);
              setIsSettingsOpen(false);
              setIsRemoveMode(false);
            }}
          >
            <VscAdd className="text-gray-400" />
          </button>
          <button 
            className={`p-1 hover:bg-[#202020] rounded ${isSettingsOpen ? 'bg-[#202020]' : ''}`}
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setIsAddingCommand(false);
              setIsRemoveMode(false);
            }}
          >
            <VscSettingsGear className="text-gray-400" />
          </button>
          <button 
            className={`p-1 hover:bg-[#202020] rounded ${isRemoveMode ? 'bg-[#202020]' : ''}`}
            onClick={() => {
              setIsRemoveMode(!isRemoveMode);
              setIsAddingCommand(false);
              setIsSettingsOpen(false);
            }}
          >
            <VscTrash className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
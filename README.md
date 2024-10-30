# Mate Terminal Wrapper

A modern terminal wrapper with a sleek Ruby OS-inspired UI, built with React and Node.js.

## Prerequisites

```bash
sudo pacman -S mate-terminal nodejs npm
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mate-terminal-wrapper
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
mate-terminal-wrapper/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx    # Left panel with preset scripts
│   │   └── Terminal.jsx   # Terminal display area
│   ├── App.jsx           # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── index.html           # HTML entry point
├── mate-terminal.js     # Terminal wrapper implementation
├── index.js            # Node.js entry point
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Dependencies

### Production
- React
- React DOM
- React Icons
- child_process

### Development
- Vite
- @vitejs/plugin-react
- TailwindCSS
- PostCSS
- Autoprefixer

## Terminal API Reference

### `open(options)`

Opens a new terminal window with specified options:

- `title`: Window title
- `command`: Command to execute
- `workingDirectory`: Starting directory
- `profile`: Terminal profile name
- `geometry`: Window size (e.g., '80x24')
- `zoom`: Zoom level (e.g., 1.0)
- `fullscreen`: Boolean to start in fullscreen
- `maximize`: Boolean to start maximized

### Helper Methods

- `openWithCommand(command)`: Open terminal with specific command
- `openInDirectory(directory)`: Open terminal in specific directory
- `openFullscreen(command)`: Open terminal in fullscreen mode

## Usage Examples

```javascript
const MateTerminal = require('./mate-terminal.js');
const terminal = new MateTerminal();

// Open a basic terminal
terminal.open({
  title: 'My Terminal',
  command: 'ls -la',
  workingDirectory: process.cwd(),
  geometry: '80x24',
  zoom: 1.0
});

// Quick command execution
terminal.openWithCommand('htop');

// Open in specific directory
terminal.openInDirectory('/home/user');

// Open in fullscreen mode
terminal.openFullscreen('vim');
```

## Troubleshooting

1. If you get permission errors:
   ```bash
   # Check if mate-terminal is installed
   which mate-terminal
   
   # Verify executable permissions
   ls -l $(which mate-terminal)
   ```

2. If Node.js can't find the module:
   ```bash
   # Verify node_modules exists
   ls node_modules
   
   # Reinstall dependencies
   rm -rf node_modules
   npm install
   ```

3. If the UI doesn't load:
   ```bash
   # Check if all dependencies are installed
   npm install
   
   # Clear Vite cache
   rm -rf node_modules/.vite
   ```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
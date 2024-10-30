const MateTerminal = require('./mate-terminal.js');

// Example usage
const terminal = new MateTerminal();

// Simple example
console.log('Opening a basic terminal...');
try {
  terminal.open({
    title: 'My Terminal',
    command: 'ls -la',
    workingDirectory: process.cwd(),
    geometry: '80x24',
    zoom: 1.0
  });
} catch (error) {
  console.log('Note: This is a simulation. In a real Linux environment, this would open mate-terminal');
}

// Examples of helper methods
console.log('\nDemonstrating helper methods (simulated):');
terminal.openWithCommand('htop');
terminal.openInDirectory('/home/user');
terminal.openFullscreen('vim');
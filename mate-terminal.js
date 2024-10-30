const { spawn } = require('child_process');

class MateTerminal {
  constructor() {
    this.defaultProfile = 'Default';
  }

  open(options = {}) {
    const args = this._buildArgs(options);
    
    try {
      return spawn('mate-terminal', args, {
        stdio: 'inherit'
      });
    } catch (error) {
      console.error('Failed to open mate-terminal:', error.message);
      throw error;
    }
  }

  _buildArgs(options) {
    const args = [];

    if (options.title) {
      args.push('--title', options.title);
    }

    if (options.command) {
      args.push('-e', options.command);
    }

    if (options.workingDirectory) {
      args.push('--working-directory', options.workingDirectory);
    }

    if (options.profile) {
      args.push('--profile', options.profile);
    }

    if (options.geometry) {
      args.push('--geometry', options.geometry);
    }

    if (options.zoom) {
      args.push('--zoom', options.zoom.toString());
    }

    if (options.fullscreen) {
      args.push('--full-screen');
    }

    if (options.maximize) {
      args.push('--maximize');
    }

    return args;
  }

  // Helper methods for common operations
  openWithCommand(command) {
    return this.open({ command });
  }

  openInDirectory(directory) {
    return this.open({ workingDirectory: directory });
  }

  openFullscreen(command = null) {
    return this.open({ 
      command,
      fullscreen: true 
    });
  }
}

module.exports = MateTerminal;
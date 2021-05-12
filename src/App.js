import { useState } from 'react';
import styled from 'styled-components';

// TODO: lift these things into separate components
const $TerminalWindow = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  max-height: 100vh;
`;
const $TitleBar = styled.div`
  flex-grow: 0;
  order: -100;

  margin: 0;
  padding: 0;
  padding-left: 0.5rem;
  min-height: 1.25rem;

  background: #555555;
  color: #FFFFFF;
`;
const $Output = styled.div`
  flex-grow: 1;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  
  padding-left: 0.5rem;

  overflow: auto;
  pre {
    margin: 0;
    padding: 0;
    
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;
const $CommandLine = styled.div`
  flex-grow: 0;
  order: 100;

  display: flex;
  flex-flow: row nowrap;

  min-height: 1.25rem;
  margin: 0;
  padding: 0;
  padding-left: 0.5rem;

  background: #222222;
  font-family: inherit;
  font-size: inherit;
  color: cyan;

  .commandPrefix {
    flex-grow: 0;
    order: -100;
    
    color: inherit;
  }
  .commandLine {
    flex-grow: 1;
    order: 100;
    
    margin: 0;
    padding: 0;
    padding-left: 0.5rem;

    border: none;
    outline: none;
    &:focus {
      border: none;
      outline: none;
    }

    background: inherit;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }
  .enterButton {
    flex-grow: 0;
    order: 200;

    box-sizing: border-box;
    border: solid green;

    background-color: inherit;
    font-family: inherit;
    color: inherit;
  }
`;

const SPLASH_ASCII = `
                              __
                     /\\    .-" /
                    /  ; .'  .' 
                   :   :/  .'   
                    \\  ;-.'     
       .--""""--..__/     \`.    
     .'           .'    \`o  \\   
    /                    \`   ;  
   :                  \\      :  
 .-;        -.         \`.__.-'  
:  ;          \\     ,   ;       
'._:           ;   :   (        
    \\/  .__    ;    \\   \`-.     
 bug ;     "-,/_..--"\`-..__)    
     '""--.._:
     Art by Blazej Kozlowski

Welcome to cmitch.info!
Type \`help' to get started
`;

// TODO: refactor the entire config system
// TODO: rethink the command system

const config = {
  TERMINAL_TITLE: 'Terminal - cmitch.info',
  COMMAND_LINE_PREFIX: 'anon@cmitch.info: $ ',
  COMMANDS: {
    'help': [
      `CMITCH bash, version 0.1.0`,
      `¯\\(°_o)/¯ <( HELP! )`,
      `These shell commands are defined internally.  Type \`help' to see this list.`,
      `Thanks for visiting!`,
      '',
      '\tcontact',
      '\temail',
      '\tgithub',
      '\tlinkedin'
    ],
    'contact': [
      '****************************************************',
      '* Chris Mitchell                                   *',
      '* email:    cmitch419@gmail.com                    *',
      '* github:   https://github.com/cmitch419           *',
      '* linkedin: https://www.linkedin.com/in/cmitch419  *',
      '****************************************************'
    ],
    'idunnolol': ['¯\\(°_o)/¯']
  }
};

function App() {
  const [output, setOutput] = useState([...SPLASH_ASCII.split('\n')]);
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState('');
  const [historyIdx, setHistoryIdx] = useState(history.length);

  function handleCommandLineInput(ev) {
    setCommand(ev.target.value);
  }

  function openUrl(url) {
    const win = window.open(url, '_blank', 'noreferrer');
    if (win != null) {
      win.focus();
    }
  }

  // TODO: got a lot of cleaning to do, baby
  function sendCommandAndAddToHistory() {
    setHistory([...history, command]);
    let args = command.trim().split(' ');
    let cmd = args[0];
    let newOutput = [config.COMMAND_LINE_PREFIX + command];

    switch (cmd) {
      case 'clear':
        setOutput(['']);
        setCommand('');
        return;
      case 'email':
        openUrl('mailto:cmitch419+terminal@gmail.com?subject=[cmitch.info] Hey!');
        break;
      case 'github':
        openUrl('https://www.github.com/cmitch419');
        break;
      case 'linkedin':
        openUrl('https://www.linkedin.com/in/cmitch419');
        break;
      case 'instagram':
        openUrl('https://www.instagram.com/prof');
        break;
      case '':
        break;
      default:
        if (config.COMMANDS[cmd]) newOutput = [...newOutput, '', ...config.COMMANDS[cmd]];
        else newOutput = [...newOutput, '', `Command '${cmd}' not found.`];
        break;
    }
    setOutput([...output, ...newOutput, ''])
    setCommand('');
  }

  function changeHistoryIdx(diff) {
    if (0 <= historyIdx + diff && historyIdx + diff < history.length) {
      setHistoryIdx(historyIdx + diff);
      setCommand(history[historyIdx]);
    }
  };

  function handleArrowUp() {
    changeHistoryIdx(-1);
  }
  function handleArrowDown() {
    changeHistoryIdx(1);
  }

  function handleKeys(ev) {
    const key = ev.key;
    switch (key) {
      case 'Enter':
        sendCommandAndAddToHistory();
        break;
      default:
        break;
    }
  }

  return (
    <$TerminalWindow>
      <$TitleBar>{config.TERMINAL_TITLE}</$TitleBar>
      <$Output>
        {output && output.map((line) =>
          <pre>{line}<br /></pre>
        )}
      </$Output>
      <$CommandLine>
        <div className="commandPrefix">{config.COMMAND_LINE_PREFIX}</div>
        <input className="commandLine" type="text" value={command} onChange={handleCommandLineInput} onKeyDown={handleKeys} autoFocus />
        <button className="enterButton" onClick={sendCommandAndAddToHistory}>ENTER</button>
      </$CommandLine>
    </$TerminalWindow>
  );
}

export default App;

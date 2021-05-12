import { useState } from 'react';
import styled from 'styled-components';

const $Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
  font-size: 1rem;
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  color: lightgreen;
  display: flex;
  flex-direction: column;
  background: black;
`;

const $TopBar = styled.div`
  width: 100%;
  min-height: 1.5rem;
  padding-left: 0.5rem;
  box-sizing: border-box;
  color: white;
  background-color: darkgray;
`;

const $CommandLine = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  padding-left: 0.5rem;
  input {
    padding-left: 0.5rem;
    flex-grow: 1;
    font-size: 1rem;
    min-height: 1rem;
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    color: lightgreen;
    background-color: black;
    border: none;
    outline: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;

const $Output = styled.div`
  flex-grow: 1;
  margin: 0;
  padding: 0;
  padding-left: 0.5rem;
  // color: lightgreen;
  // font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  // font-size: 1rem;
  pre {
    flex-grow: 1;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
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

Welcome to cmitch.info
`;

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
      'contact',
      'help',
      'idunnolol'
    ],
    'contact': [
      'Chris Mitchell',
      'email:\tcmitch419@gmail.com',
      'github:\thttps://github.com/cmitch419',
      'linkedin:\thttps://www.linkedin.com/in/cmitch419'
    ],
    'idunnolol': ['¯\\(°_o)/¯']
  }
};

function App() {
  const [output, setOutput] = useState([...SPLASH_ASCII.split('\n')]);
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState();
  const [historyIdx, setHistoryIdx] = useState(history.length);

  function handleCommandLineInput(ev) {
    setCommand(ev.target.value);
  }

  function sendCommandAndAddToHistory() {

    setHistory([...history, command]);
    let args = command.trim().split(' ');
    let cmd = args[0];
    let newOutput = [config.COMMAND_LINE_PREFIX + command];

    switch (cmd) {
      case 'clear':
        setOutput(['']);
        break;
      case '':
        break;
      default:
        if (config.COMMANDS[cmd]) newOutput = [...newOutput, '', ...config.COMMANDS[cmd]];
        else newOutput = [...newOutput, '', `Command '${cmd}' not found.`];
        setOutput([...output, ...newOutput, ''])
    }
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
    const code = ev.code;
    switch (code) {
      case 'Enter':
        sendCommandAndAddToHistory();
        break;
      case 'ArrowUp':
        ev.preventDefault();
        break;
      default:
        break;
    }
  }

  return (
    <$Container>
      <$TopBar>{config.TERMINAL_TITLE}</$TopBar>
      <$Output>
        {output && output.map((line) =>
          <pre>{line}<br /></pre>
        )}
      </$Output>
      <$CommandLine>
        <div class="commandprefix">{config.COMMAND_LINE_PREFIX}</div>
        <input type="text" value={command} onChange={handleCommandLineInput} onKeyDown={handleKeys} autoFocus />
      </$CommandLine>
    </$Container>
  );
}

export default App;

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const $CommandLine = styled.input`
  width: 100%;
  padding-left: 0.5rem;
  min-height: 1.5rem;
  box-sizing: border-box;
  // border: solid grey;
  color: lightgreen;
  background-color: black;
  outline: none;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
  margin: 0;
  padding: 0;
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
  monospace;
`;

const COMMAND_LINE_STR = '> ';

const CommandLine = (props) => {
  const [text, setText] = useState(COMMAND_LINE_STR);
  const [command, setCommand] = useState([]);

  function handleChange(ev) {
    if (ev.target.value && ev.target.value.indexOf(COMMAND_LINE_STR) === 0) {
      setText(ev.target.value);
      ev.preventDefault();
    } else {
      setText(COMMAND_LINE_STR);
    }
  }

  useEffect(() => {
    
  }, []);

  return (
    <$CommandLine type="text" value={text} onChange={handleChange} autoFocus={true} />
  ); 
};

export default CommandLine;
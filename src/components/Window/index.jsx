import styled from 'styled-components';

const $Window = styled.div`
  width: 100%;
  flex-grow: 1;
  padding-left: 0.5rem;
  box-sizing: border-box;
  // border: solid grey;
  color: lightgreen;
`;

const Window = (props) => {
  return (
    <>
      <$Window>
        Something
      </$Window>
    </>
  ); 
};

export default Window;
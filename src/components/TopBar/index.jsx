import styled from 'styled-components';

const $TopBar = styled.div`
  width: 100%;
  min-height: 1.5rem;
  padding-left: 0.5rem;
  box-sizing: border-box;
  border: solid grey;
  color: white;
  background-color: darkgray;
`;

const TopBar = ({ title='Terminal' }) => {
  return (
    <>
      <$TopBar>
        {title}
      </$TopBar>
    </>
  ); 
};

export default TopBar;
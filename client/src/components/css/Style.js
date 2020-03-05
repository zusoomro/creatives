import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Style = {};

// Utility components

Style.row = styled.div`
  display: flex;
`;

Style.column = styled(Style.row)`
  flex-direction: column;
`;

Style.showcase = styled(Style.row)`
  justify-content: center;
  align-items: center;
`;

Style.Button = styled(Link)`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: blue;
  border-radius: 5px;
  border-style: none;
  text-decoration: none;
  color: #fff;
  display: inline-block;
`;

Style.container = styled.div`
  padding: 1rem 1rem;
  max-width: 1100px;
  margin: auto;
`;

// sections

Style.section = styled.div`
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
`;

Style.single_page = styled(Style.section)`
  height: calc(100vh - 66px);
`;

Style.section_dark = styled(Style.section)`
  background-color: #333;
`;

// Forms

Style.Form = styled.form`
  width: 600px;
  margin: auto;
  padding: 0.5rem;
  align-self: center;
  background-color: #333;
  border-radius: 5px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

Style.Input = styled.input`
  display: block;
  width: 100%;
  border-style: none;
  border-radius: 5px;
  height: 2.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

Style.Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export default Style;

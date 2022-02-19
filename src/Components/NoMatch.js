import React from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import Cookies from 'js-cookie'
const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
const loggeduser= Cookies.get("Nombre");
const loggedusev2= Cookies.get("Unidad");
function permisos(){
}
export const NoMatch = () => (
  <Wrapper>
    <button hidden onClick={permisos()}>
    </button>
  </Wrapper>
)
import styled from "styled-components/macro";
import { mobile } from "../../utils/breakpoints";

interface StyleProps {
  readonly size: number;
}
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: 100vh;
  padding: 0 5%;

  ${mobile} {
    padding: 0;
  }
}
`;

export const Display = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 3px solid #ffffff59;
  border-radius: 20px;
  padding: 2.5% 5%;

  ${mobile} {
    width: 75%;
  }
`;

export const Title = styled.h1`
  text-transform: uppercase;
  width: 10%;
`;

export const Score = styled.div``;

export const Options = styled.div<StyleProps>`
  ${(props) => `
    height: ${props.size}px;
    width: ${props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px;
`}
`;

<!DOCTYPE html>
<html>
<head>
<style> 
body {
	background: #232856;
    color: white;
}
.s {
	display: flex;
}

.c {
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%;
}

.d {
  animation-name: fade-in;
  animation-duration: 2s;
}

.a {
  align-items: center;
  justify-content: center;
  display: flex;
  
  width: 100px;
  height: 100px;
  
  animation-name: grow-n-fade-in;
  animation-delay: 2s;
  animation-duration: 2s;	
  animation-fill-mode: both;
  
}

.z {   
	position: relative; 

}
.z:after {
	    content: '';
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.05) 56%, rgba(255,255,255,0.025) 75%, rgba(255,255,255,0.0) 76%);
    position: absolute;
    border-radius: 50%;
    top: -100%;
    left: -100%;
    z-index: -1;
    
   
   animation: after-grow-n-fade-in 2s linear 3s infinite alternate;
  animation-fill-mode: both;

}

@keyframes fade-in {
  from {
  	opacity: 0;
  }
  to {
  	opacity: 1;
  }
}

@keyframes grow-n-fade-in {
  0%  {
   	width: 0;
  	height: 0;
  	opacity: 0;
  }
  25% {
   width: 100px;
   height: 100px;
   opacity: 0;
  }
  100% {
  	opacity: 1;
  }
}

@keyframes after-grow-n-fade-in {
   0% {
      background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0) 38%);
      opacity: 0;
  }
  25% {
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.025) 56%,  rgba(255,255,255,0) 56%);
    opacity: 0.25;
  }
 50% {
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.05) 56%,  rgba(255,255,255,0) 56%);
    opacity: 0.5;
  }
   75% {
     background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.025) 56%, rgba(255,255,255,0.012.5) 75%, rgba(255,255,255,0.0) 76%);
     opacity: 0.75;
  }
  100% {
     background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.05) 56%, rgba(255,255,255,0.025) 75%, rgba(255,255,255,0.0) 76%);
     opacity: 1;
  }
}

 
</style>
</head>
<body>

<h1>CSS Animation</h1>
<div class="s">
  <div class="c"></div>
  
  <div class="a">You lose</div>

  <div class="c d z"></div>
</div>


<p><b>Note:</b> When an animation is finished, it goes back to its original style.</p>

</body>
</html>



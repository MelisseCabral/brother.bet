import { keyframes } from 'styled-components'

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const pulsate = keyframes`
  0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
  50% {opacity: 1.0;}
  100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
`

export const fade = (primaryColor, secondaryColor) => keyframes`
  0% {
  fill:${primaryColor};
  }
  50% {
  fill:${secondaryColor};
  }
  100%{
    fill:${primaryColor};
  }
`

export const liquid = (finalPosition) => keyframes`
  0% {
    transition: all .1s cubic-bezier(0,-0.86, 0.98,-0.02);
  }
  50%{
    top: -7rem;
    transform: scale(1.05) rotate(-135deg);
    border-top-left-radius: 10%;
  }
  100%{
  background: linear-gradient(00deg, #50fa7b 0%, #00d58f 100%);
    top: ${finalPosition};
  }
`

export const pulse = keyframes`
0% {
  transform: scale(0);
  opacity: 1;
  transform-origin: center;
}
100% {
  transform: scale(4.5);
  opacity: 0;
  transform-origin: center;
}
`
export const slideBottom = keyframes`
 0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(1rem);
  }
`

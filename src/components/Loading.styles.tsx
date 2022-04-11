import styled from 'styled-components';
import GifLoading from '../images/LoadingGif.gif'
import GifError from '../images/ErrorGif.gif'

export const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ImageLoading = styled.img.attrs({
  src: `${GifLoading}`
})`
  width: 300px;
  height: 300px;
  border-radius: 100%;
`;

export const ImageError = styled.img.attrs({
  src: `${GifError}`
})`
  width: 500px;
  height: 500px;
  border-radius: 100%;
`;
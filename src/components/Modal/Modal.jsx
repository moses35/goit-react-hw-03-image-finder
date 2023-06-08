import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from 'components/Modal/Modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handaleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handaleKeyDown);
  }

  handaleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { imageUrl } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={imageUrl.img} alt={imageUrl.tags} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.object.isRequired,
};
